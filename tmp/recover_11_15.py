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
    text = re.sub(r'\[Continued\]', '', text)
    text = re.sub(r'\(Continued\)', '', text)
    return text.strip()

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    for p in data['passages']:
        p_id = p['id']
        # Find questions for this passage
        p_qs = [q for q in data['questions'] if q.get('passage_id') == p_id]
        if not p_qs: continue
        
        # Look at the first question
        q = p_qs[0]
        txt = q.get('question', '')
        
        # If the passage is too short or empty
        if len(p['text']) < 100:
            # If the question is long, it likely contains the passage text
            if len(txt) > 100:
                # Split at the last question prompt
                # Question prompts usually start with a capital but after a period
                sentences = re.split(r'(?<=[.!?]) +', txt)
                if len(sentences) > 1:
                    # Is the last sentence a question?
                    last = sentences[-1]
                    if '?' in last or '---' in last or '...' in last or ':' in last:
                        p['text'] = " ".join(sentences[:-1]).strip()
                        q['question'] = last.strip()
                    else:
                        # If no question mark in last, maybe the whole thing is the passage?
                        # Or it's a multiple-question-merged field
                        # For now, let's take all but the last
                        p['text'] = " ".join(sentences[:-1]).strip()
                        q['question'] = last.strip()

        # Final cleanup for punctuation
        p['text'] = clean_markers(p['text'])
        q['question'] = clean_markers(q['question'])

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
