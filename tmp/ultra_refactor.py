import os
import json
import re

def clean_passage_junk(text):
    if not text: return text
    
    # 1. Clean the 'Q17: CLOZE TEST 1: Q18:...' style junk
    # This usually appears at the end.
    text = re.sub(r'Q\d+:\s*(CLOZE TEST|Reading|Passage).*?$', '', text, flags=re.IGNORECASE | re.MULTILINE)
    # Sometimes it's a long chain: Q17: ... Q18: ...
    text = re.sub(r'Q\d+:\s*[A-Z\s\d]+:?', '', text, flags=re.IGNORECASE)
    
    # 2. Clean 'CLOZE TEST 1:' or 'PASSAGE 1:' from the START
    text = re.sub(r'^(CLOZE TEST|PASSAGE|Reading)\s*\d+:\s*', '', text, flags=re.IGNORECASE)
    
    # 3. Clean '- Question 11' style junk at the end
    text = re.sub(r'\s*-\s*Question\s*\d+\s*$', '', text, flags=re.IGNORECASE)
    
    return text.strip()

def process_exam(data):
    changed = False
    if 'passages' not in data:
        data['passages'] = []
    
    # Track which passages we've already extracted to avoid duplicates
    existing_texts = {p['text'].strip() for p in data['passages'] if 'text' in p}
    
    questions = data.get('questions', [])
    for q in questions:
        q_text = q.get('question', '')
        section_id = q.get('section_id', '').lower()
        
        # We only care about Reading and Cloze for extraction
        if 'read' in section_id or 'cloze' in section_id:
            # If the question is long, it might HAVE the passage
            if len(q_text) > 200:
                # Try to separate passage from question
                # Pattern: Passage text... \n\n Question?
                parts = re.split(r'\n\n|\r\n\r\n', q_text)
                if len(parts) > 1:
                    p_candidate = parts[0].strip()
                    q_candidate = parts[-1].strip()
                    
                    # Clean the passage candidate
                    p_candidate = clean_passage_junk(p_candidate)
                    
                    if len(p_candidate) > 100:
                        # Extract this as a new passage if not already there
                        if p_candidate not in existing_texts:
                            pid = f"p_auto_{q['id']}"
                            data['passages'].append({
                                "id": pid,
                                "title": "Passage" if 'read' in section_id else "Cloze Test",
                                "text": p_candidate
                            })
                            existing_texts.add(p_candidate)
                            q['passage_id'] = pid
                        else:
                            # Link to existing
                            for p in data['passages']:
                                if p['text'].strip() == p_candidate:
                                    q['passage_id'] = p['id']
                                    break
                        
                        # Set the cleaned question
                        q['question'] = q_candidate
                        changed = True
    
    # Final pass on all passages and questions to clean remnants
    for p in data['passages']:
        if 'text' in p:
            old = p['text']
            p['text'] = clean_passage_junk(p['text'])
            if old != p['text']: changed = True
            
    for q in questions:
        if 'question' in q:
            old = q['question']
            q['question'] = clean_passage_junk(q['question'])
            # Special case for "See above"
            if "(See above)" in q['question'] or "See above" == q['question'].strip():
                if 'read' in q.get('section_id', ''):
                    q['question'] = "Parçaya göre soruyu cevaplayınız."
                else:
                    q['question'] = "Boşluk için en uygun seçeneği bulun."
            if old != q['question']: changed = True

    return changed

base_dir = r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams'
for sub in ['full', 'mini']:
    folder = os.path.join(base_dir, sub)
    if not os.path.exists(folder): continue
    for filename in os.listdir(folder):
        if filename.endswith('.json'):
            path = os.path.join(folder, filename)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                if process_exam(data):
                    with open(path, 'w', encoding='utf-8') as f:
                        json.dump(data, f, indent=4, ensure_ascii=False)
                    print(f"Fixed {sub}/{filename}")
            except Exception as e:
                print(f"Error {filename}: {e}")
