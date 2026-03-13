import json
import re

files = [
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam11.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam12.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam13.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam14.json',
    r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam15.json'
]

def final_clean(text):
    while True:
        # Match sentences ending with punctuation, allowing periods inside
        m = re.search(r'([A-Z][^!?]*?(\?|---|\:|\.\.\.|---.|---|--)\s*)$', text)
        if m:
            s = m.group(1).lower()
            if any(x in s for x in ["according to", "suggest", "infer", "what", "which", "why", "how", "the word", "refers to", "can be concluded", "true about", "is superior to", "defines", "considered a paradox"]):
                text = text[:m.start()].strip()
                continue
        break
    return text.strip()

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    for p in data['passages']:
        p['text'] = final_clean(p['text'])

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
