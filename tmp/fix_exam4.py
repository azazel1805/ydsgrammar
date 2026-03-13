import json
import os

file_path = r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam4.json'
with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for q in data['questions']:
    if q.get('question'):
        q['question'] = q['question'].replace('[Same as above] ', '').replace('[Same as above]', '').strip()

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4, ensure_ascii=False)
