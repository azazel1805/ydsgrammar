import json
import re

files = [
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam11.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam12.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam13.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam14.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam15.json'
]

def clean_text(text):
    m = [
        r'\(Paragraph \d+: .*?\)',
        r'\(Paragraph \d+: Continued\)',
        r'Text \d+: ',
        r'Passage: ',
        r'\(Continued\):?',
        r'\[Continued\]',
        r'\(selection\):?',
        r'Question \(\d+\):',
        r'\[Text as above\]',
        r'\[Same as above\]',
        r'\[Blank \d+\]',
        r'Blank \(\d+\):'
    ]
    for pattern in m:
        text = re.sub(pattern, '', text)
    return text.strip()

def deduplicate(text):
    sentences = re.split(r'(?<=[.!?]) +', text)
    unique = []
    for s in sentences:
        s = s.strip()
        if not s: continue
        is_dup = False
        for i, existing in enumerate(unique):
            if s.lower() in existing.lower():
                is_dup = True
                break
            if existing.lower() in s.lower():
                unique[i] = s
                is_dup = True
                break
        if not is_dup:
            unique.append(s)
    return " ".join(unique)

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 1. First, find any text in questions that belongs to passages
    restorations = {}
    for q in data['questions']:
        if not q.get('passage_id'): continue
        txt = q.get('question', '')
        if len(txt) > 60:
            # Look for last sentence being a question
            m = re.search(r'^(.*?)(([A-Z][^.!?]*?\?))$', txt, re.DOTALL)
            if m:
                prefix = m.group(1).strip()
                actual_q = m.group(2).strip()
                if prefix:
                    p_id = q['passage_id']
                    if p_id not in restorations:
                        restorations[p_id] = []
                    restorations[p_id].append(prefix)
                    q['question'] = actual_q
            else:
                # If it's long and has no question mark at all, it might be ALL passage text
                if '?' not in txt:
                    p_id = q['passage_id']
                    if p_id not in restorations:
                        restorations[p_id] = []
                    restorations[p_id].append(txt)
                    q['question'] = ""

    # 2. Update passages
    for p in data['passages']:
        # If we have restorations, use them
        if p['id'] in restorations:
            # If the current text is just markers or very short, replace/append
            current = clean_text(p['text'])
            if len(current) < 50 or current.lower() == 'continued':
                p['text'] = " ".join(restorations[p['id']])
            else:
                for r in restorations[p['id']]:
                    if r.lower() not in p['text'].lower():
                        p['text'] += " " + r
        
        p['text'] = clean_text(p['text'])
        p['text'] = deduplicate(p['text'])

    # 3. Final cleanup of questions and cloze prompt standardization
    for q in data['questions']:
        q['question'] = clean_text(q.get('question', ''))
        
        m_prompt = re.search(r'Boşluk (\d+) için en uygun seçeneği bulun.', q['question'])
        if m_prompt:
            q['question'] = f"Choose the best option for blank ({m_prompt.group(1)})."
        elif "Boşluk için en uygun seçeneği bulun." in q['question']:
            q['question'] = f"Choose the best option for blank ({q['id']})."
        
        # If question is empty and it's a reading question, maybe the last sentence of passage is the question
        if not q['question'] and q.get('passage_id') and q['passage_id'].startswith('reading'):
            # Only do this if it's the FIRST question for this passage
            p_questions = [qu for qu in data['questions'] if qu.get('passage_id') == q['passage_id']]
            if q == p_questions[0]:
                for p in data['passages']:
                    if p['id'] == q['passage_id']:
                        m_q_end = re.search(r'([A-Z][^.!?]*?\?)$', p['text'])
                        if m_q_end:
                            q['question'] = m_q_end.group(1)
                            p['text'] = p['text'].replace(m_q_end.group(1), '').strip()

    # 4. Cloze numbering correction (ensure 17-21 and 22-26)
    # Using a more surgical approach: finding blanks like (1), (11), (22)
    for p in data['passages']:
        if p['id'] == 'cloze_1':
            # Map any (1-5) or (11-15) to (17-21)
            # Find all (X) or (XX)
            matches = re.findall(r'\((\d+)\)', p['text'])
            if matches:
                # If they are 1,2,3,4,5
                if '1' in matches and '5' in matches:
                    p['text'] = re.sub(r'\(1\)', '(17)', p['text'])
                    p['text'] = re.sub(r'\(2\)', '(18)', p['text'])
                    p['text'] = re.sub(r'\(3\)', '(19)', p['text'])
                    p['text'] = re.sub(r'\(4\)', '(20)', p['text'])
                    p['text'] = re.sub(r'\(5\)', '(21)', p['text'])
                # If they are 11,12,13,14,15
                elif '11' in matches and '15' in matches:
                    p['text'] = re.sub(r'\(11\)', '(17)', p['text'])
                    p['text'] = re.sub(r'\(12\)', '(18)', p['text'])
                    p['text'] = re.sub(r'\(13\)', '(19)', p['text'])
                    p['text'] = re.sub(r'\(14\)', '(20)', p['text'])
                    p['text'] = re.sub(r'\(15\)', '(21)', p['text'])
        elif p['id'] == 'cloze_2':
            matches = re.findall(r'\((\d+)\)', p['text'])
            if matches:
                if '6' in matches and '10' in matches:
                    p['text'] = re.sub(r'\(6\)', '(22)', p['text'])
                    p['text'] = re.sub(r'\(7\)', '(23)', p['text'])
                    p['text'] = re.sub(r'\(8\)', '(24)', p['text'])
                    p['text'] = re.sub(r'\(9\)', '(25)', p['text'])
                    p['text'] = re.sub(r'\(10\)', '(26)', p['text'])
                elif '16' in matches and '20' in matches:
                    p['text'] = re.sub(r'\(16\)', '(22)', p['text'])
                    p['text'] = re.sub(r'\(17\)', '(23)', p['text'])
                    p['text'] = re.sub(r'\(18\)', '(24)', p['text'])
                    p['text'] = re.sub(r'\(19\)', '(25)', p['text'])
                    p['text'] = re.sub(r'\(20\)', '(26)', p['text'])

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
