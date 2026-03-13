import json
import re

files = [
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam7.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam8.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam9.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam10.json'
]

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

def clean(text):
    text = re.sub(r'\(Continued\):?', '', text)
    text = re.sub(r'\[Text as above\]', '', text)
    text = re.sub(r'\[Same as above\]', '', text)
    text = re.sub(r'Passage: ', '', text)
    return text.strip()

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    restorations = {}
    for q in data['questions']:
        if q.get('passage_id') and q.get('question'):
            txt = q['question']
            
            # Very aggressive: split at common question endings
            # "According to the passage", "The passage suggests", "It can be inferred"
            splitters = ["According to the passage", "The passage suggests", "It can be inferred", "Which of the following", "What is", "Why "]
            
            p_cont = ""
            actual_q = txt
            
            # If the text is long and doesn't look like a direct question at the start
            if len(txt) > 80:
                for s in splitters:
                    if s in txt and not txt.startswith(s):
                        parts = txt.split(s)
                        p_cont = parts[0].strip()
                        actual_q = (s + parts[1]).strip()
                        break
                
                # If still no p_cont, but starts with lowercase
                if not p_cont and txt[0].islower():
                    p_cont = txt
                    actual_q = ""
                
            if p_cont:
                p_id = q['passage_id']
                if p_id not in restorations:
                    restorations[p_id] = clean(p_cont)
                q['question'] = clean(actual_q)

    for p in data['passages']:
        if p['id'] in restorations:
            cont = restorations[p['id']]
            if cont.lower() not in p['text'].lower():
                p['text'] = (p['text'] + " " + cont).strip()
        
        p['text'] = clean(p['text'])
        p['text'] = deduplicate(p['text'])

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
