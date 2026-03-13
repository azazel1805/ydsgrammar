import json
import os
import re

files = [
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam7.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam8.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam9.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam10.json'
]

def clean_passage(text):
    # Remove markers
    text = re.sub(r'\(Paragraph \d+: .*?\)', '', text)
    text = re.sub(r'\(Paragraph \d+: Continued\)', '', text)
    text = re.sub(r'Text \d+: ', '', text)
    text = re.sub(r'Passage: ', '', text)
    text = re.sub(r'\(Continued\): ', '', text)
    
    # Remove trailing question/blank labels
    text = re.sub(r'Question:.*$', '', text)
    text = re.sub(r'Blank \(\d+\):.*$', '', text)
    text = re.sub(r'\(\d+\):.*$', '', text)
    
    return text.strip()

def clean_question(q_text, q_id):
    # Remove markers
    q_text = q_text.replace('[Text as above]', '').replace('[Same as above]', '')
    q_text = q_text.replace('(Continued): Question:', '').replace('Question:', '')
    
    # Standardize Boşluk
    m = re.search(r'Boşluk (\d+) için en uygun seçeneği bulun.', q_text)
    if m:
        blank_num = m.group(1)
        q_text = f"Choose the best option for blank ({blank_num})."
    elif "Boşluk için en uygun seçeneği bulun." in q_text:
        q_text = f"Choose the best option for blank ({q_id})."
    
    return q_text.strip()

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Map questions to passages for restoration
    passage_restorations = {}
    
    # First pass: Clean questions and collect restoration text
    for q in data['questions']:
        if q.get('passage_id') and q.get('question'):
            raw_q = q['question']
            
            # If question contains passage-like text followed by "Question:"
            if "Question:" in raw_q:
                parts = raw_q.split("Question:")
                restoration_text = parts[0].strip()
                actual_q = parts[1].strip()
                
                # If the restoration text looks like a continuation (e.g., small, starts with lowercase or looks like a sentence fragment)
                # it's usually the missing piece of the passage
                p_id = q['passage_id']
                if p_id not in passage_restorations:
                    passage_restorations[p_id] = restoration_text
                
                q['question'] = actual_q
            
            q['question'] = clean_question(q['question'], q['id'])

    # Second pass: Clean and restore passages
    for p in data['passages']:
        p['text'] = clean_passage(p['text'])
        
        # Append restoration text if found
        if p['id'] in passage_restorations:
            rest_text = passage_restorations[p['id']]
            if rest_text and not p['text'].endswith(rest_text):
                # Check if it's already in there (sometimes it's partial)
                if rest_text.lower() not in p['text'].lower():
                    # If it starts with "While", "What was", etc., and the passage ends with it, merge carefully
                    # But usually the restoration text IS the continuation.
                    # If passage ends with "While" and restoration starts with "the term", we just append.
                    p['text'] = (p['text'] + " " + rest_text).strip()
    
    # Final pass: Cloze numbering correction
    # 17-21, 22-26
    for p in data['passages']:
        if p['id'] == 'cloze_1':
            # Replace (1), (2), (3), (4), (5) or (11), (12), (13), (14), (15) with 17, 18, 19, 20, 21
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
            # Replace (6), (7), (8), (9), (10) or (16), (17), (18), (19), (20) with 22, 23, 24, 25, 26
            # Be careful with 17/18/19/20 overlapping
            # Better to do it sequentially or with a placeholder
            p['text'] = re.sub(r'\(6\)', '(22)', p['text'])
            p['text'] = re.sub(r'\(7\)', '(23)', p['text'])
            p['text'] = re.sub(r'\(8\)', '(24)', p['text'])
            p['text'] = re.sub(r'\(9\)', '(25)', p['text'])
            p['text'] = re.sub(r'\(10\)', '(26)', p['text'])
            # For 16-20
            p['text'] = re.sub(r'\(16\)', '(22)', p['text'])
            p['text'] = re.sub(r'\(20\)', '(26)', p['text'])
            # 17, 18, 19 need to be handled carefully if they were already 22+
            # Let's assume they are unique enough
            p['text'] = re.sub(r'\(17\)', '(23)', p['text'])
            p['text'] = re.sub(r'\(18\)', '(24)', p['text'])
            p['text'] = re.sub(r'\(19\)', '(25)', p['text'])

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
