import os
import json
import re

def clean_and_extract(data, folder_name):
    changed = False
    
    # Ensure passages array exists
    if 'passages' not in data:
        data['passages'] = []

    # 1. Handle Cloze blocks
    if 'questions' in data:
        cloze_questions = [q for q in data.get('questions', []) if q.get('section_id') == 'cloze']
        
        # Group by 5
        for i in range(0, len(cloze_questions), 5):
            block = cloze_questions[i:i+5]
            if not block: continue
            
            passage_text = ""
            # Look for a question that has the full text
            for q in block:
                q_text = q.get('question', '')
                if "CLOZE TEST PASSAGE:" in q_text:
                    parts = q_text.split("CLOZE TEST PASSAGE:")
                    if len(parts) > 1:
                        # Extract the text until "Question" or "\n\n"
                        p_part = parts[1].split("Question")[0].split("(See above)")[0].strip()
                        if len(p_part) > len(passage_text):
                            passage_text = p_part
            
            # If we found a passage text, create/link it
            if passage_text:
                pid = f"p_cloze_{block[0]['id']}"
                # Update or Add passage
                found = False
                for p in data['passages']:
                    if p['id'] == pid:
                        p['text'] = passage_text
                        found = True
                        break
                if not found:
                    data['passages'].append({"id": pid, "title": "Cloze Test", "text": passage_text})
                
                # Link questions and clean them
                for q in block:
                    q['passage_id'] = pid
                    # Clean question text
                    clean_q = q['question']
                    if "Question" in clean_q:
                        clean_q = clean_q.split("Question")[-1].replace(":", "").strip()
                    elif "(See above)" in clean_q:
                        clean_q = "Boşluk için en uygun seçeneği bulun."
                    q['question'] = clean_q
                    changed = True

    # 2. Handle Reading blocks
    if 'questions' in data:
        reading_questions = [q for q in data.get('questions', []) if q.get('section_id') == 'reading']
        for q in reading_questions:
            q_text = q.get('question', '')
            if "PASSAGE " in q_text and ":" in q_text:
                 # Try to extract the passage part
                 parts = q_text.split("PASSAGE")[1].split(":", 1)
                 if len(parts) > 1:
                     p_text = parts[1].strip()
                     # If it's "(See above)", we don't extract it but we should check previous questions
                     if "(See above)" not in p_text and len(p_text) > 50:
                         pid = f"p_read_{q['id']}"
                         data['passages'].append({"id": pid, "title": "Reading", "text": p_text})
                         q['passage_id'] = pid
                         # Clean question
                         q['question'] = q_text.split("\n\n")[-1].strip()
                         changed = True
                     elif "(See above)" in p_text:
                         # Link to previous question's passage if possible
                         # (This part is tricky, but let's at least clean the question)
                         q['question'] = q_text.split("\n\n")[-1].strip()
                         changed = True

    return changed

base_dir = r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams'
folders = ['full', 'mini']

for f_name in folders:
    folder = os.path.join(base_dir, f_name)
    if not os.path.exists(folder): continue
    for filename in os.listdir(folder):
        if filename.endswith('.json'):
            file_path = os.path.join(folder, filename)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                if clean_and_extract(data, f_name):
                    with open(file_path, 'w', encoding='utf-8') as f:
                        json.dump(data, f, indent=4, ensure_ascii=False)
                    print(f"Refactored {f_name}/{filename}")
            except:
                pass
