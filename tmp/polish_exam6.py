import json
import os
import re

file_path = r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam6.json'
with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for q in data['questions']:
    if q.get('question'):
        # Remove [Text as above] or [Same as above]
        q['question'] = q['question'].replace('[Text as above] ', '').replace('[Text as above]', '').strip()
        q['question'] = q['question'].replace('[Same as above] ', '').replace('[Same as above]', '').strip()
        
        # Standardize Boşluk prompts
        # For cloze tests 17-21 and 22-26
        m = re.search(r'Boşluk (\d+) için en uygun seçeneği bulun.', q['question'])
        if m:
            blank_num = m.group(1)
            q['question'] = f"Choose the best option for blank ({blank_num})."
        elif "Boşluk için en uygun seçeneği bulun." in q['question']:
            # For cases like "SORU 17: Boşluk için en uygun seçeneği bulun."
            # Since the id is the real number
            q['question'] = f"Choose the best option for blank ({q['id']})."

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4, ensure_ascii=False)
