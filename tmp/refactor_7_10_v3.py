import json
import re

files = [
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam7.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam8.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam9.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam10.json'
]

def clean_markers(text):
    m = [
        r'\(Paragraph \d+: .*?\)',
        r'\(Paragraph \d+: Continued\)',
        r'Text \d+: ',
        r'Passage: ',
        r'\(Continued\):?',
        r'Question:?',
        r'\[Text as above\]',
        r'\[Same as above\]',
        r'Blank \(\d+\):',
        r'SORU \d+:'
    ]
    for pattern in m:
        text = re.sub(pattern, '', text)
    return text.strip()

def deduplicate(text):
    # Split by sentence
    sentences = re.split(r'(?<=[.!?]) +', text)
    unique = []
    for s in sentences:
        s = s.strip()
        if not s: continue
        # Check if this sentence is a subset of any existing or vice versa
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
    
    # Heuristic for restoration
    for q in data['questions']:
        if q.get('passage_id') and q.get('question'):
            txt = q['question']
            
            # If question starts with lowercase or has a comma at start, it's likely a continuation
            # OR if it's very long and contains a question-like ending
            p_cont = ""
            actual_q = txt
            
            if "Question:" in txt:
                parts = txt.split("Question:")
                p_cont = parts[0]
                actual_q = parts[1]
            elif "According to the passage" in txt and not txt.startswith("According"):
                parts = txt.split("According to the passage")
                p_cont = parts[0]
                actual_q = "According to the passage " + parts[1]
            elif txt[0:1].islower() and len(txt) > 50:
                # Likely a continuation
                # Try to find where the question starts
                # Often it ends with "---." or "?"
                m = re.search(r'(.*?[.?]) ([A-Z].*)', txt)
                if m:
                    p_cont = m.group(1)
                    actual_q = m.group(2)
                else:
                    # Fallback
                    p_cont = txt
                    actual_q = ""
            
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

    for p in data['passages']:
        if p['id'] in passage_cont:
            cont = passage_cont[p['id']]
            if cont.lower() not in p['text'].lower():
                # Check for "While" suffix and join
                if p['text'].endswith("While"):
                    p['text'] = p['text'] + " " + cont
                else:
                    p['text'] = p['text'] + " " + cont
        
        p['text'] = clean_markers(p['text'])
        p['text'] = deduplicate(p['text'])
        
        # Specific fixes from previous step overlapping
        if "fullexam9" in file_path:
             if p['id'] == 'cloze_1': p['text'] = "The Industrial Revolution was a period of profound social and economic change. (17) ____ the late 18th century, traditional agrarian societies began to transform into industrial ones. This transition was (18) ____ driven by technological innovations in textile production and steam power. (19) ____ it led to significant economic growth, it also created harsh living conditions for the working class. Workers often had to endure long hours (20) ____ low wages. Today, many historians (21) ____ for a more nuanced understanding of this era's social impact."
             if p['id'] == 'cloze_2': p['text'] = "Ethics in artificial intelligence is a growing field of study. As AI systems become more autonomous, the need for (22) ____ frameworks becomes critical. The (23) ____ of bias in algorithms is a major concern (24) ____ developers must address. Ensuring that AI is (25) ____ transparent and accountable is essential (26) ____ it can be fully integrated into society."

    # Final cloze numbering check
    for p in data['passages']:
        if p['id'] == 'cloze_1':
            p['text'] = re.sub(r'\(1\)', '(17)', p['text'])
            p['text'] = re.sub(r'\(2\)', '(18)', p['text'])
            p['text'] = re.sub(r'\(11\)', '(17)', p['text'])
            p['text'] = re.sub(r'\(12\)', '(18)', p['text'])
            # etc... (already mostly done but being safe)

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
