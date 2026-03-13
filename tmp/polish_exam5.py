import json
import os
import re

file_path = r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam5.json'
with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for q in data['questions']:
    if q.get('question'):
        # Remove [Text as above]
        q['question'] = q['question'].replace('[Text as above] ', '').replace('[Text as above]', '').strip()
        
        # Standardize Boşluk prompts
        m = re.match(r'Boşluk (\d+) için en uygun seçeneği bulun.', q['question'])
        if m:
            blank_num = m.group(1)
            q['question'] = f"Choose the best option for blank ({blank_num})."

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4, ensure_ascii=False)
