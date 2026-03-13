import json
import os
import re

def clean_cloze_passage_text(text):
    if not text: return ""
    if "Boşluk" in text and "için en uygun" in text: return ""
    
    # Split by common question headers
    parts = re.split(r'\s*-\s*Question\s*\d+\s*', text, flags=re.IGNORECASE)
    parts = re.split(r'\s*-\s*Soru\s*\d+\s*', parts[0], flags=re.IGNORECASE)
    parts = re.split(r'\s*Q\d+\s*:', parts[0], flags=re.IGNORECASE)
    
    clean = parts[0].strip()
    clean = re.sub(r'\(Cloze Test \d+ - Part \d+\)\s*', '', clean, flags=re.IGNORECASE)
    clean = re.sub(r'\(Q\d+ selection\):.*', '', clean, flags=re.IGNORECASE)
    clean = re.sub(r'\(\d+\)\s*[_.]+', ' (___) ', clean)
    return clean.strip()

def clean_reading_passage_text(text):
    if not text: return ""
    if "Lütfen yukarıdaki metne göre" in text: return ""
    text = re.sub(r'^Passage\s+\d+:?\s*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'^.*?\(Cont\.\):?\s*', '', text, flags=re.IGNORECASE)
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
    changed = False

    # 1. CLOZE (17-21, 22-26)
    for start_q in [17, 22]:
        idx = next((i for i, q in enumerate(questions) if q.get('id') == start_q), None)
        if idx is not None:
            p_id = f"p_cloze_{start_q}_{os.path.basename(filepath).replace('.json','')}"
            p_obj = next((p for p in passages if p['id'] == p_id), None)
            
            q_first = questions[idx]
            q_text = q_first.get('question', '')
            
            extracted = clean_cloze_passage_text(q_text)
            
            if len(extracted) > 50:
                if p_obj: p_obj['text'] = extracted
                else: 
                    p_obj = {"id": p_id, "title": f"Cloze Test {start_q}-{start_q+4}", "text": extracted}
                    passages.append(p_obj)
                changed = True
            
            if p_obj and len(p_obj['text']) > 40:
                for offset in range(5):
                    if idx + offset < len(questions):
                        tq = questions[idx + offset]
                        tq['passage_id'] = p_id
                        tq['question'] = f"Boşluk {tq['id']} için en uygun seçeneği bulun."
                        changed = True

    # 2. READING (43-62)
    split_markers = [
        r"According to the", r"As stated in", r"It can be inferred",
        r"What is the (author's )?primary", r"What is the (author's )?main",
        r"The term \".*?\"", r"Which of the following", r"It is clear from",
        r"The author (mentions|suggests|states|argues|attitude)",
        r"Based on the", r"---", r"Metne göre", r"How does the passage",
        r"In the passage", r"Lütfen yukarıdaki metne göre"
    ]
    
    for start_q in [43, 47, 51, 55, 59]:
        idx = next((i for i, q in enumerate(questions) if q.get('id') == start_q), None)
        if idx is not None:
            p_id = f"p_read_{start_q}_{os.path.basename(filepath).replace('.json','')}"
            p_obj = next((p for p in passages if p['id'] == p_id), None)
            
            q_lead = questions[idx]
            q_text = q_lead.get('question', '')
            
            best_pos = -1
            actual_q = q_text
            
            if len(q_text) > 100:
                for pat in split_markers:
                    match = re.search(pat, q_text, re.IGNORECASE)
                    if match:
                        pos = match.start()
                        if pos > 80:
                            if best_pos == -1 or pos < best_pos:
                                best_pos = pos
            
            extracted_p = ""
            if best_pos != -1:
                extracted_p = clean_reading_passage_text(q_text[:best_pos].strip())
                actual_q = q_text[best_pos:].strip()
                if len(actual_q) < 20 and "---" in actual_q:
                    sents = re.split(r'(?<=[.!?])\s+', extracted_p)
                    if len(sents) > 1:
                        actual_q = sents[-1] + " " + actual_q
                        extracted_p = " ".join(sents[:-1])

            if len(extracted_p) > 50:
                if p_obj: p_obj['text'] = extracted_p
                else:
                    p_obj = {"id": p_id, "title": f"Reading {start_q}", "text": extracted_p}
                    passages.append(p_obj)
                changed = True
            
            if p_obj and len(p_obj['text']) > 40:
                for offset in range(4):
                    if idx + offset < len(questions):
                        tq = questions[idx + offset]
                        tq['passage_id'] = p_id
                        curr_q = tq.get('question', '')
                        
                        # Use the extracted actual_q for the first question
                        if offset == 0 and best_pos != -1:
                            tq['question'] = actual_q
                        else:
                            # Strip passage text if repeated
                            p_txt = p_obj['text']
                            if p_txt and p_txt[:40] in curr_q:
                                match_found = False
                                for pat in split_markers:
                                    m = re.search(pat, curr_q, re.IGNORECASE)
                                    if m:
                                        curr_q = curr_q[m.start():].strip()
                                        match_found = True
                                        break
                                if not match_found:
                                    curr_q = curr_q.replace(p_txt, "").strip()
                            
                            tq['question'] = clean_reading_passage_text(curr_q)
                            if not tq['question'] or len(tq['question']) < 5:
                                tq['question'] = "Lütfen yukarıdaki metne göre soruyu cevaplayınız."
                        changed = True

    if changed:
        data['passages'] = passages
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        return True
    return False

base_dir = r"c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams"
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.json'):
            refactor_file(os.path.join(root, file))
print("Final Optimized Refactor done from restored data.")
