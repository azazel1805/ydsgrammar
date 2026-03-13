import os
import json
import re

def clean_cloze_text(text):
    if not text: return text
    # Pattern 1: Split by "- Question"
    if '- Question' in text:
        return re.split(r'- Question\s+\d+', text, flags=re.IGNORECASE)[0].strip()
    
    # Pattern 2: Detect exact repetition (sometimes it repeats without a label)
    # If the text is long and the first half is exactly (or nearly) the same as the second half
    if len(text) > 100:
        mid = len(text) // 2
        # Allow some wiggle room for whitespaces
        first_half = text[:mid].strip()
        second_half = text[mid:].strip()
        # Check if one is a prefix of the other or mostly identical
        if len(first_half) > 50 and (first_half in second_half or second_half in first_half):
            # It's likely a duplicate. Find the first occurrence of a logical end point
            # Or just take the shorter one if they are nearly identical
            return first_half if len(first_half) < len(second_half) else second_half

    return text

base_dir = r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams'
folders = [os.path.join(base_dir, 'full'), os.path.join(base_dir, 'mini')]

for folder in folders:
    if not os.path.exists(folder):
        continue
    for filename in os.listdir(folder):
        if filename.endswith('.json'):
            file_path = os.path.join(folder, filename)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                changed = False
                if 'passages' in data and isinstance(data['passages'], list):
                    for p in data['passages']:
                        if 'text' in p:
                            new_text = clean_cloze_text(p['text'])
                            if new_text != p['text']:
                                p['text'] = new_text
                                changed = True
                
                if 'questions' in data and isinstance(data['questions'], list):
                    for q in data['questions']:
                        if 'question' in q:
                            new_q = clean_cloze_text(q['question'])
                            if new_q != q['question']:
                                q['question'] = new_q
                                changed = True
                
                if changed:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        json.dump(data, f, indent=4, ensure_ascii=False)
                    print(f"Fixed {filename}")
            except Exception as e:
                 pass
