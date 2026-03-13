import json
import re

files = [
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam11.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam12.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam13.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam14.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam15.json'
]

question_starters = [
    "According to the passage", "According to the text", "The passage suggests", 
    "It can be inferred", "Which of the following", "What ", "Why ", "How ",
    "The word ", "It is clear from the passage", "One can conclude", 
    "The author ", "Based on the passage", "The passage is primarily",
    "What does the passage", "The term ", "The relationship between"
]

def clean_passage_end(text):
    sentences = re.split(r'(?<=[.!?]) +', text)
    cleaned = []
    for s in sentences:
        is_q = False
        # If it ends with ? or --- or :
        if s.strip().endswith('?') or s.strip().endswith('---.') or s.strip().endswith('---') or s.strip().endswith(':'):
            # And starts with a question starter
            for starter in question_starters:
                if s.strip().startswith(starter):
                    is_q = True
                    break
        
        # Additional check: even if no ? or ---, if it starts with a classic question prompt and is at the end
        if not is_q and len(cleaned) > 2: # Only check if we have enough base text
             for starter in question_starters:
                if s.strip().startswith(starter) and (s.strip().endswith('.') or len(s) < 100):
                    # Riskier, but let's try
                    # Actually, let's stick to the ones with specific endings for now
                    pass

        if not is_q:
            cleaned.append(s)
    
    return " ".join(cleaned).strip()

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    for p in data['passages']:
        p['text'] = clean_passage_end(p['text'])
        # Also remove common markers that might have survived
        p['text'] = re.sub(r'\[Continued\]', '', p['text'])
        p['text'] = re.sub(r'\(Continued\)', '', p['text'])
        p['text'] = p['text'].strip()

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
