import json
import os
import re

def clean_cloze_text(text):
    # Remove "- Question X" at the end
    text = re.sub(r'\s*-\s*Question\s*\d+\s*$', '', text, flags=re.IGNORECASE)
    # Replace (11) Word or (11) _____ with (___)
    # We want to match (11) and any sequence of underscores or the next word if it's filled
    text = re.sub(r'\(\d+\)\s*([_\.\-]{2,})?', ' (___) ', text)
    # Replace (11) word (case where it's filled)
    text = re.sub(r'\(\d+\)\s+[a-zA-Z]+', ' (___) ', text)
    # Clean up multiple spaces
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def refactor_file(filepath):
    print(f"Processing {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
        except Exception as e:
            print(f"Error loading {filepath}: {e}")
            return
    
    exam_id = os.path.basename(filepath).replace('.json', '')
    questions = data.get('questions', [])
    
    new_passages = []
    
    # 1. Cloze Sections (17-21, 22-26)
    for start, end in [(17, 21), (22, 26)]:
        group = [q for q in questions if start <= q['id'] <= end]
        if not group: continue
        
        # Take the most complete version (usually the last one has more filled context)
        # But we want the BLANK version, so Q17 is best
        raw_text = group[0]['question']
        passage_text = clean_cloze_text(raw_text)
        
        p_id = f"p_cloze_{start}_{exam_id}"
        new_passages.append({
            "id": p_id,
            "title": f"Cloze Test {start}-{end}",
            "text": passage_text
        })
        
        for q in group:
            q['passage_id'] = p_id
            q['question'] = f"Boşluk {q['id']} için en uygun seçeneği bulun."

    # 2. Reading Sections (43-62)
    reading_groups = {}
    for q in questions:
        q_id = q.get('id', 0)
        if q.get('section_id') == 'reading' or (43 <= q_id <= 62):
            match = re.search(r'Passage\s*(\d+):', q['question'], re.IGNORECASE)
            p_num = match.group(1) if match else "unknown"
            block_id = (q_id - 43) // 4
            key = f"{p_num}_{block_id}"
            if key not in reading_groups: reading_groups[key] = []
            reading_groups[key].append(q)
    
    for key, group in reading_groups.items():
        if not group: continue
        full_raw = max(group, key=lambda q: len(q['question']))['question']
        p_text = re.sub(r'^Passage\s*\d+:\s*', '', full_raw, flags=re.IGNORECASE)
        
        split_patterns = [
            r"According to the passage", r"It can be inferred", r"What is the", r"The author", r"Based on", r"Which of",
            r"It is clear from", r"One can infer", r"According to the text", r"The main purpose"
        ]
        best_split = len(p_text)
        for pat in split_patterns:
            m = re.search(pat, p_text, re.IGNORECASE)
            if m and m.start() < best_split:
                best_split = m.start()
        
        p_final_text = p_text[:best_split].strip()
        if best_split == len(p_text) and '?' in p_text:
            last_sentence_start = p_text.rfind('. ', 0, p_text.find('?'))
            if last_sentence_start != -1: p_final_text = p_text[:last_sentence_start+1].strip()

        p_id = f"p_read_{group[0]['id']}_{exam_id}"
        new_passages.append({
            "id": p_id,
            "title": f"Reading {key.split('_')[0]}",
            "text": p_final_text
        })
        
        for q in group:
            q['passage_id'] = p_id
            q_text = q['question']
            q_text = re.sub(r'^Passage\s*\d+:\s*', '', q_text, flags=re.IGNORECASE)
            if "..." in q_text:
                q_text = re.sub(r'^.*?\.\.\.\s*', '', q_text)
            else:
                if q_text.startswith(p_final_text):
                    q_text = q_text[len(p_final_text):].strip()
            q['question'] = q_text

    data['passages'] = new_passages
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

# Main
base_dir = r"c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full"
for i in range(1, 17):
    path = os.path.join(base_dir, f"fullexam{i}.json")
    if os.path.exists(path):
        refactor_file(path)
