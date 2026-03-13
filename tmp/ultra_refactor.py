import json
import os
import re

def clean_cloze_text(text):
    if not text: return ""
    # Split by common separators
    parts = re.split(r'\s*-\s*Question\s*\d+\s*', text, flags=re.IGNORECASE)
    parts = re.split(r'\s*-\s*Soru\s*\d+\s*', parts[0], flags=re.IGNORECASE)
    parts = re.split(r'\s*Q\d+\s*:', parts[0], flags=re.IGNORECASE)
    
    clean = parts[0].strip()
    clean = re.sub(r'\(Cloze Test \d+ - Part \d+\)\s*', '', clean, flags=re.IGNORECASE)
    clean = re.sub(r'\(Q\d+ selection\):.*', '', clean, flags=re.IGNORECASE)
    clean = re.sub(r'\(\d+\)\s*[_.]+', ' (___) ', clean)
    return clean.strip()

def clean_reading_text(text):
    # Remove markers like Passage 1: or PASSAGE 2:
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
            
            if p_obj and (" - Question" in p_obj['text'] or " - Soru" in p_obj['text']):
                p_obj['text'] = clean_cloze_text(p_obj['text'])
                changed = True

            q_text = questions[idx].get('question', '')
            if "Boşluk" not in q_text and len(q_text) > 40:
                extracted = clean_cloze_text(q_text)
                if extracted:
                    if p_obj: p_obj['text'] = extracted
                    else:
                        p_obj = {"id": p_id, "title": f"Cloze Test {start_q}-{start_q+4}", "text": extracted}
                        passages.append(p_obj)
                    changed = True

            for offset in range(5):
                if idx + offset < len(questions):
                    tq = questions[idx + offset]
                    # Check both section_id and id range to be safe
                    if tq.get('section_id') == 'cloze' or (start_q <= tq.get('id', 0) <= start_q+4):
                        tq['passage_id'] = p_id
                        tq['question'] = f"Boşluk {tq['id']} için en uygun seçeneği bulun."
                        changed = True

    # 2. READING (43-62)
    # Using regex for patterns
    question_patterns = [
        r"According to the (passage|text)",
        r"As stated in the (passage|text)",
        r"It can be inferred",
        r"What (is|was|are|were) the primary",
        r"What (is|was|are|were) the main",
        r"The term \".*?\" (is|was)",
        r"Which of the following",
        r"It is clear from the",
        r"The author (mentions|suggests|states|argues)",
        r"Based on the (text|passage)",
        r"---",
        r"Lütfen yukarıdaki metne göre",
        r"Metne göre",
        r"How does the passage",
        r"In the passage,",
        r"What is the author's attitude"
    ]
    
    for start_q in [43, 47, 51, 55, 59]:
        idx = next((i for i, q in enumerate(questions) if q.get('id') == start_q), None)
        if idx is not None:
            q_lead = questions[idx]
            q_text = q_lead.get('question', '')
            p_id = f"p_read_{start_q}_{os.path.basename(filepath).replace('.json','')}"
            
            best_pos = -1
            if len(q_text) > 80:
                for pat in question_patterns:
                    match = re.search(pat, q_text, re.IGNORECASE)
                    if match:
                        pos = match.start()
                        if pos > 80:
                            if best_pos == -1 or pos < best_pos:
                                best_pos = pos

            actual_q = q_text
            if best_pos != -1:
                p_text = q_text[:best_pos].strip()
                actual_q = q_text[best_pos:].strip()
                
                if len(actual_q) < 15 and "---" in actual_q:
                    p_sents = re.split(r'(?<=[.!?])\s+', p_text)
                    if len(p_sents) > 1:
                        actual_q = p_sents[-1] + " " + actual_q
                        p_text = " ".join(p_sents[:-1])
                
                p_text = clean_reading_text(p_text)
                
                # Update/Create passage
                found = False
                for p in passages:
                    if p['id'] == p_id:
                        p['text'] = p_text
                        found = True
                        break
                if not found:
                    passages.append({"id": p_id, "title": f"Reading {start_q}", "text": p_text})
                changed = True
            
            p_obj = next((p for p in passages if p['id'] == p_id), None)
            if p_obj:
                for offset in range(4):
                    if idx + offset < len(questions):
                        tq = questions[idx + offset]
                        tq['passage_id'] = p_id
                        tq_text = tq.get('question', '')
                        
                        if offset == 0 and best_pos != -1:
                            tq['question'] = actual_q
                        else:
                            # Clean up redundant passage text in subsequent questions
                            p_text_to_strip = p_obj['text']
                            if p_text_to_strip and p_text_to_strip[:40] in tq_text:
                                f_m = False
                                for pat in question_patterns:
                                    m_m = re.search(pat, tq_text, re.IGNORECASE)
                                    if m_m:
                                        tq['question'] = tq_text[m_m.start():].strip()
                                        f_m = True
                                        break
                                if not f_m:
                                    tq['question'] = tq_text.replace(p_text_to_strip, "").strip()
                            
                            tq['question'] = clean_reading_text(tq['question'])
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
count = 0
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.json'):
            path = os.path.join(root, file)
            if refactor_file(path):
                print(f"Deep Refactored {path}")
                count += 1
print(f"Total updated: {count}")
