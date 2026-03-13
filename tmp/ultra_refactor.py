import json
import os
import re

def clean_cloze_passage(text):
    # Remove selection markers like (Q17 selection):
    text = re.sub(r'\(Q\d+ selection\):.*', '', text, flags=re.IGNORECASE)
    # Remove Part headers
    text = re.sub(r'\(Cloze Test \d+ - Part \d+\)\s*', '', text, flags=re.IGNORECASE)
    # Remove question numbers like (17)___
    text = re.sub(r'\(\d+\)\s*[_.]+', ' (___) ', text)
    text = text.strip()
    return text

def clean_reading_passage(text):
    # Remove markers like PASSAGE 1:
    text = re.sub(r'^PASSAGE\s+\d+:?\s*', '', text, flags=re.IGNORECASE)
    return text.strip()

def refactor_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except:
        return False

    if 'questions' not in data:
        return False

    passages = data.get('passages', [])
    questions = data['questions']
    
    # ─── REFINE CLOZE SECTIONS (17-26) ───
    for start_q in [17, 22]:
        idx = next((i for i, q in enumerate(questions) if q['id'] == start_q), None)
        if idx is not None:
            full_p_text = ""
            for offset in range(5):
                if idx + offset < len(questions):
                    q_part = questions[idx + offset]
                    if q_part.get('section_id') != 'cloze': continue
                    
                    t = q_part.get('question', '')
                    if "Boşluk" in t and "için en uygun" in t:
                        continue # Already refactored, skip extraction
                    
                    # Remove "Part X" and "selection"
                    t = re.sub(r'\(Cloze Test \d+ - Part \d+\)\s*', '', t, flags=re.IGNORECASE)
                    t = re.sub(r'\(Q\d+ selection\):.*', '', t, flags=re.IGNORECASE)
                    
                    clean_t = t.strip()
                    if clean_t and clean_t not in full_p_text:
                        # If Part 1 already has the whole thing
                        if full_p_text and len(clean_t) > len(full_p_text) * 0.8 and full_p_text in clean_t:
                            full_p_text = clean_t
                        elif clean_t and clean_t in full_p_text:
                            pass
                        else:
                            if full_p_text: full_p_text += " "
                            full_p_text += clean_t
            
            if full_p_text and "Boşluk" not in full_p_text:
                p_text = clean_cloze_passage(full_p_text)
                if len(p_text) > 30:
                    p_id = f"p_cloze_{start_q}_{os.path.basename(filepath).replace('.json','')}"
                    # Update or create
                    exists = False
                    for p in passages:
                        if p['id'] == p_id:
                            p['text'] = p_text
                            exists = True
                            break
                    if not exists:
                        passages.append({
                            "id": p_id,
                            "title": f"Cloze Test {start_q}-{start_q+4}",
                            "text": p_text
                        })
                    
                    for offset in range(5):
                        if idx + offset < len(questions):
                            tq = questions[idx + offset]
                            if tq.get('section_id') == 'cloze':
                                tq['passage_id'] = p_id
                                tq['question'] = f"Boşluk {tq['id']} için en uygun seçeneği bulun."

    # ─── REFINE READING SECTIONS (43-62) ───
    for start_q in [43, 47, 51, 55, 59]:
        idx = next((i for i, q in enumerate(questions) if q['id'] == start_q), None)
        if idx is not None:
            q_lead = questions[idx]
            q_text = q_lead.get('question', '')
            
            split_markers = [
                "According to the passage", "As stated in the", "It can be inferred",
                "What is the primary", "What is the main", "The term", "Which of the following",
                "It is clear from", "The author", "---",
                "Lütfen yukarıdaki metne göre", "Hangisi parçaya göre", "Metne göre", "Parçadan anlaşılacağı üzere"
            ]
            
            best_pos = -1
            for m in split_markers:
                match = re.search(re.escape(m), q_text, re.IGNORECASE)
                if match:
                    pos = match.start()
                    if pos > 100:
                        if best_pos == -1 or pos < best_pos:
                            best_pos = pos
            
            if best_pos != -1:
                p_text = q_text[:best_pos].strip()
                actual_q = q_text[best_pos:].strip()
                
                if len(actual_q) < 15 and "---" in actual_q:
                    p_sentences = re.split(r'(?<=[.!?])\s+', p_text)
                    if len(p_sentences) > 1:
                        actual_q = p_sentences[-1] + " " + actual_q
                        p_text = " ".join(p_sentences[:-1])
                
                p_text = clean_reading_passage(p_text)
                p_id = f"p_read_{start_q}_{os.path.basename(filepath).replace('.json','')}"
                
                exists = False
                for p in passages:
                    if p['id'] == p_id:
                        p['text'] = p_text
                        exists = True
                        break
                if not exists:
                    passages.append({
                        "id": p_id,
                        "title": f"Reading {start_q}",
                        "text": p_text
                    })
                
                for offset in range(4):
                    if idx + offset < len(questions):
                        target_q = questions[idx + offset]
                        if target_q.get('section_id') == 'reading':
                            target_q['passage_id'] = p_id
                            t_text = target_q.get('question', '')
                            t_text = re.sub(r'^.*?\(Cont\.\):?\s*', '', t_text, flags=re.IGNORECASE)
                            t_text = re.sub(r'^.*?PASSAGE\s+\d+:?\s*', '', t_text, flags=re.IGNORECASE)
                            
                            if offset == 0:
                                target_q['question'] = actual_q
                            else:
                                if p_text and p_text[:30] in t_text:
                                    found = False
                                    for m in split_markers:
                                        m_match = re.search(re.escape(m), t_text, re.IGNORECASE)
                                        if m_match:
                                            target_q['question'] = t_text[m_match.start():].strip()
                                            found = True
                                            break
                                    if not found:
                                        target_q['question'] = t_text.replace(p_text, "").strip()
                                else:
                                    target_q['question'] = t_text.strip()
                            
                            if not target_q['question'] or len(target_q['question']) < 5:
                                target_q['question'] = "Lütfen yukarıdaki metne göre soruyu cevaplayınız."

    data['passages'] = passages
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    return True

base_dir = r"c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams"
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.json'):
            path = os.path.join(root, file)
            if refactor_file(path):
                print(f"Final Refactored {path}")
