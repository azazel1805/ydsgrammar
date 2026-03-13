import json
import re

files = [
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam11.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam12.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam13.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam14.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam15.json'
]

def clean_markers(text):
    m = [
        r'\(Paragraph \d+: .*?\)',
        r'\(Paragraph \d+: Continued\)',
        r'Text \d+: ',
        r'Passage: ',
        r'\(Continued\):?',
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
    
    passage_cont = {}
    
    # Heuristic for restoration from questions
    for q in data['questions']:
        if q.get('passage_id') and q.get('question'):
            txt = q['question']
            
            p_cont = ""
            actual_q = txt
            
            # Splitters for restoration
            splitters = ["According to", "The passage suggests", "It can be inferred", "Which of the following", "What ", "Why ", "How "]
            
            if len(txt) > 60:
                for s in splitters:
                    if s in txt and not txt.startswith(s):
                        parts = txt.split(s)
                        p_cont = parts[0].strip()
                        actual_q = (s + parts[1]).strip()
                        break
            
            if p_cont:
                p_id = q['passage_id']
                if p_id not in passage_cont:
                    passage_cont[p_id] = clean_markers(p_cont)
                q['question'] = clean_markers(actual_q)
            else:
                q['question'] = clean_markers(q['question'])

            # Clean prompts
            m_prompt = re.search(r'Boşluk (\d+) için en uygun seçeneği bulun.', q['question'])
            if m_prompt:
                q['question'] = f"Choose the best option for blank ({m_prompt.group(1)})."
            elif "Boşluk için en uygun seçeneği bulun." in q['question']:
                q['question'] = f"Choose the best option for blank ({q['id']})."

    # Handle empty questions by looking at the end of the passage
    for q in data['questions']:
        if q.get('passage_id') and not q.get('question'):
            for p in data['passages']:
                if p['id'] == q['passage_id']:
                    # Look for a question at the end of the passage text
                    m_q = re.search(r'([A-Z].*?\?)$', p['text'])
                    if m_q:
                        q['question'] = m_q.group(1)
                        p['text'] = p['text'].replace(m_q.group(1), '').strip()

    # Apply restorations and clean passages
    for p in data['passages']:
        if p['id'] in passage_cont:
            cont = passage_cont[p['id']]
            if cont.lower() not in p['text'].lower():
                p['text'] = (p['text'] + " " + cont).strip()
        
        # Another check: if the passage text itself ends with a question, move it (general case)
        m_q_end = re.search(r'([A-Z][^.!?]*?\?)$', p['text'])
        if m_q_end:
            question_text = m_q_end.group(1)
            # Find the first question for this passage
            for q in data['questions']:
                if q.get('passage_id') == p['id'] and (not q.get('question') or q['question'].startswith("Choose")):
                    # Update it if it's empty or looks like a placeholder
                    if not q.get('question'):
                        q['question'] = question_text
                        p['text'] = p['text'].replace(question_text, '').strip()
                        break
        
        p['text'] = clean_markers(p['text'])
        p['text'] = deduplicate(p['text'])

    # Cloze numbering correction
    for p in data['passages']:
        if p['id'] == 'cloze_1':
            p['text'] = re.sub(r'\(1\)', '(17)', p['text'])
            p['text'] = re.sub(r'\(2\)', '(18)', p['text'])
            p['text'] = re.sub(r'\(3\)', '(19)', p['text'])
            p['text'] = re.sub(r'\(4\)', '(20)', p['text'])
            p['text'] = re.sub(r'\(5\)', '(21)', p['text'])
            p['text'] = re.sub(r'\(11\)', '(17)', p['text'])
            p['text'] = re.sub(r'\(12\)', '(18)', p['text'])
            p['text'] = re.sub(r'\(13\)', '(19)', p['text'])
            p['text'] = re.sub(r'\(14\)', '(20)', p['text'])
            p['text'] = re.sub(r'\(15\)', '(21)', p['text'])
        elif p['id'] == 'cloze_2':
            p['text'] = re.sub(r'\(6\)', '(22)', p['text'])
            p['text'] = re.sub(r'\(7\)', '(23)', p['text'])
            p['text'] = re.sub(r'\(8\)', '(24)', p['text'])
            p['text'] = re.sub(r'\(9\)', '(25)', p['text'])
            p['text'] = re.sub(r'\(10\)', '(26)', p['text'])
            p['text'] = re.sub(r'\(16\)', '(22)', p['text'])
            p['text'] = re.sub(r'\(17\)', '(23)', p['text'])
            p['text'] = re.sub(r'\(18\)', '(24)', p['text'])
            p['text'] = re.sub(r'\(19\)', '(25)', p['text'])
            p['text'] = re.sub(r'\(20\)', '(26)', p['text'])

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
