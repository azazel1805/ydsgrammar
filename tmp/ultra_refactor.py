import json
import os
import re

def clean_cloze_passage_text(text):
    if not text: return ""
    # 1. Remove trailing junk starting from " - Question" or " - Soru"
    parts = re.split(r'\s*-\s*(Question|Soru|Q)\s*\d+', text, flags=re.IGNORECASE)
    clean = parts[0].strip()
    
    # 2. Remove leading markers like "Cloze Test 1:"
    clean = re.sub(r'^(Cloze\s+Test|Part|Soru)\s*\d+\s*:?\s*', '', clean, flags=re.IGNORECASE)
    
    # 3. Standardize blanks: (17) ____ or (17) .... or (___)
    clean = re.sub(r'\(\d+\)\s*[_.]+', ' (___) ', clean)
    
    return clean.strip()

def clean_reading_passage_text(text):
    if not text: return ""
    # Remove markers like "Passage 1:" or "PASSAGE 1:"
    text = re.sub(r'^Passage\s+\d+:?\s*', '', text, flags=re.IGNORECASE)
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

    # A. CLOZE (17-21, 22-26)
    for start_q in [17, 22]:
        idx = next((i for i, q in enumerate(questions) if q.get('id') == start_q), None)
        if idx is not None:
            p_id = f"p_cloze_{start_q}_{os.path.basename(filepath).replace('.json','')}"
            q_first = questions[idx]
            q_text = q_first.get('question', '')
            
            p_text = clean_cloze_passage_text(q_text)
            
            if len(p_text) > 40:
                # Update/Create passage
                found = False
                for p in passages:
                    if p['id'] == p_id:
                        p['text'] = p_text
                        found = True
                        break
                if not found:
                    passages.append({
                        "id": p_id,
                        "title": f"Cloze Test {start_q}-{start_q+4}",
                        "text": p_text
                    })
                changed = True
                
                # Update questions in the range [start_q, start_q+4]
                for offset in range(5):
                    target_id = start_q + offset
                    t_idx = next((i for i, q in enumerate(questions) if q.get('id') == target_id), None)
                    if t_idx is not None:
                        tq = questions[t_idx]
                        tq['passage_id'] = p_id
                        tq['question'] = f"Boşluk {target_id} için en uygun seçeneği bulun."
                        changed = True

    # B. READING (43-62 in sets of 4)
    split_markers = [
        r"According to the (passage|text)",
        r"As stated in the (passage|text)",
        r"It can be inferred",
        r"What (is|was|are|were|represents) the primary",
        r"What (is|was|are|were|represents) the main",
        r"The term \".*?\" (is|was)",
        r"Which of the following",
        r"It is clear from the",
        r"The author (mentions|suggests|states|argues|attitude)",
        r"Based on the (text|passage)",
        r"How does the passage",
        r"In the passage,",
        r"---",
        r"Lütfen yukarıdaki metne göre"
    ]

    for start_q in [43, 47, 51, 55, 59]:
        idx = next((i for i, q in enumerate(questions) if q.get('id') == start_q), None)
        if idx is not None:
            p_id = f"p_read_{start_q}_{os.path.basename(filepath).replace('.json','')}"
            q_lead = questions[idx]
            q_text = q_lead.get('question', '')
            
            best_pos = -1
            actual_question = q_text
            
            if len(q_text) > 100:
                for pat in split_markers:
                    match = re.search(pat, q_text, re.IGNORECASE)
                    if match:
                        pos = match.start()
                        if pos > 80: # Min passage length
                            if best_pos == -1 or pos < best_pos:
                                best_pos = pos

            if best_pos != -1:
                p_text = clean_reading_passage_text(q_text[:best_pos].strip())
                actual_question = q_text[best_pos:].strip()
                
                # Move last sentence if question is just "---" or similar
                if len(actual_question) < 20 and "---" in actual_question:
                    sents = re.split(r'(?<=[.!?])\s+', p_text)
                    if len(sents) > 1:
                        actual_question = sents[-1] + " " + actual_question
                        p_text = " ".join(sents[:-1])
                
                # Update/Create passage
                found = False
                for p in passages:
                    if p['id'] == p_id:
                        p['text'] = p_text
                        found = True
                        break
                if not found:
                    passages.append({
                        "id": p_id,
                        "title": f"Reading {start_q}",
                        "text": p_text
                    })
                changed = True

                # Link set of 4 questions
                for offset in range(4):
                    target_id = start_q + offset
                    t_idx = next((i for i, q in enumerate(questions) if q.get('id') == target_id), None)
                    if t_idx is not None:
                        tq = questions[t_idx]
                        tq['passage_id'] = p_id
                        
                        if offset == 0:
                            tq['question'] = actual_question
                        else:
                            # Clean subsequent questions if they repeat passage
                            curr_q = tq.get('question', '')
                            if p_text[:50] in curr_q:
                                f_m = False
                                for pat in split_markers:
                                    m = re.search(pat, curr_q, re.IGNORECASE)
                                    if m:
                                        tq['question'] = curr_q[m.start():].strip()
                                        f_m = True
                                        break
                                if not f_m:
                                    tq['question'] = curr_q.replace(p_text, "").strip()
                            
                            tq['question'] = clean_reading_passage_text(tq['question'])
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
    for f in files:
        if f.endswith('.json'):
            refactor_file(os.path.join(root, f))
print("Fixed everything from clean base.")
