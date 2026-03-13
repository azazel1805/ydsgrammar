import json
import os
import re

files = [
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam7.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam8.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam9.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam10.json'
]

def clean_text_markers(text):
    # Remove recurring markers
    markers = [
        r'\(Paragraph \d+: .*?\)',
        r'\(Paragraph \d+: Continued\)',
        r'Text \d+: ',
        r'Passage: ',
        r'\(Continued\):?',
        r'Question:.*$',
        r'Blank \(\d+\):.*$',
        r'\(\d+\):.*$',
        r'\[Text as above\]',
        r'\[Same as above\]'
    ]
    for m in markers:
        text = re.sub(m, '', text)
    return text.strip()

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 1. Map questions to passages for restoration
    passage_restorations = {}
    for q in data['questions']:
        if q.get('passage_id') and q.get('question'):
            raw_q = q['question']
            if "Question:" in raw_q:
                # In some files, the question itself contains the missing part of the passage
                parts = raw_q.split("Question:")
                restoration_text = parts[0].strip()
                # Clean the restoration text from markers
                restoration_text = clean_text_markers(restoration_text)
                
                p_id = q['passage_id']
                if p_id not in passage_restorations:
                    passage_restorations[p_id] = restoration_text
                
                q['question'] = parts[1].strip()
            
            q['question'] = clean_text_markers(q['question'])
            # Standardize Boşluk
            m = re.search(r'Boşluk (\d+) için en uygun seçeneği bulun.', q['question'])
            if m:
                q['question'] = f"Choose the best option for blank ({m.group(1)})."
            elif "Boşluk için en uygun seçeneği bulun." in q['question']:
                q['question'] = f"Choose the best option for blank ({q['id']})."

    # 2. Clean and restore passages
    for p in data['passages']:
        # Store original text for deduplication logic
        original_p_text = clean_text_markers(p['text'])
        
        # If we have restoration text, find a way to merge it without duplicates
        if p['id'] in passage_restorations:
            rest_text = passage_restorations[p['id']]
            if rest_text and rest_text.lower() not in original_p_text.lower():
                p['text'] = (original_p_text + " " + rest_text).strip()
            else:
                p['text'] = original_p_text
        else:
            p['text'] = original_p_text

    # 3. Handle duplicates (especially in fullexam9)
    for p in data['passages']:
        # Sometimes "Passage: ..." was appended as restoration but it's already there
        # Example: "Main Text. Passage: Main Text"
        text = p['text']
        if "Passage: " in text:
            # We already cleaned Passage: in step 2 if it was a standalone marker, 
            # but if it was part of rest_text, it might remain.
            text = clean_text_markers(text)
        
        # Simple deduplication: if the string can be split and half is roughly same as other half
        # Or more simply, if we see a sentence repeated
        sentences = re.split(r'(?<=[.!?]) +', text)
        seen = []
        unique_sentences = []
        for s in sentences:
            if s.lower().strip() not in seen:
                unique_sentences.append(s)
                seen.append(s.lower().strip())
        p['text'] = " ".join(unique_sentences).strip()

    # 4. Cloze numbering correction (identical for all files)
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
            # Use placeholders to avoid 17/18/19/20 overlapping issues
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

    # 5. Fix specific truncated clozes in fullexam9 and others if possible
    # We'll do this manually for the most obvious ones if they are still broken
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
