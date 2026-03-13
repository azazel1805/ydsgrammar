import os
import json
import re

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
                        if 'text' in p and p['text'] and '- Question' in p['text']:
                            parts = re.split(r'- Question\s+\d+', p['text'], flags=re.IGNORECASE)
                            if len(parts) > 0 and len(parts[0]) > 20:
                                p['text'] = parts[0].strip()
                                changed = True
                
                if 'questions' in data and isinstance(data['questions'], list):
                    for q in data['questions']:
                        if 'question' in q and q['question'] and '- Question' in q['question']:
                            parts = re.split(r'- Question\s+\d+', q['question'], flags=re.IGNORECASE)
                            if len(parts) > 0:
                                q['question'] = parts[0].strip()
                                changed = True
                
                if changed:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        json.dump(data, f, indent=4, ensure_ascii=False)
                    print(f"Fixed {filename}")
            except Exception as e:
                print(f"Error {filename}: {str(e)}")
