import json
import os

def convert_to_mini(flat_list, category_id, category_label, output_path, title, duration=30):
    passages = []
    p_map = {}
    questions = []
    
    for i, q in enumerate(flat_list):
        pid = None
        q_text = q.get("question", "")
        
        # Handle passages for reading comprehension or others if embedded
        if q.get("type") == "reading_comprehension" or "passage" in q:
            txt = q.get("passage", "")
            if not txt and "Passage" in q_text:
                 # Extract passage from question if needed (similar to full exam logic)
                 pass
            
            if txt:
                if txt not in p_map:
                    pid = f"p{len(passages)+1}"
                    p_map[txt] = pid
                    passages.append({"id": pid, "text": txt})
                else:
                    pid = p_map[txt]

        opts = {}
        letters = ["A", "B", "C", "D", "E"]
        correct_letter = ""
        choices = q.get("choices", [])
        answer = q.get("answer", "")
        
        for j, choice in enumerate(choices):
            if j < len(letters):
                l = letters[j]
                opts[l] = choice
                if choice == answer:
                    correct_letter = l
        
        questions.append({
            "id": i + 1,
            "section_id": category_id,
            "passage_id": pid,
            "question": q_text,
            "options": opts,
            "correct": correct_letter
        })

    data = {
        "meta": {
            "title": title,
            "subtitle": f"{len(questions)} Soru - {duration} Dakika",
            "total_questions": len(questions),
            "duration_minutes": duration
        },
        "sections": [
            {
                "id": category_id,
                "label": category_label,
                "from": 1,
                "to": len(questions)
            }
        ],
        "passages": passages,
        "questions": questions
    }
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print(f"Created {output_path}")

# Configuration
mapping = [
    ("vocab", "Kelime (Vocabulary)", "vocab", "Kelime Sınavı"),
    ("grammar", "Gramer (Grammar)", "grammar", "Gramer Sınavı"),
    ("cloze", "Cloze Test", "cloze", "Cloze Test Sınavı"),
    ("sencomp", "Cümle Tamamlama", "sencomp", "Cümle Tamamlama Sınavı"),
    ("read", "Okuma Parçaları", "reading", "Okuma Sınavı"),
    ("dia", "Diyalog Tamamlama", "dialogue", "Diyalog Sınavı"),
    ("clomean", "Yakın Anlam (Restatement)", "closest", "Yakın Anlam Sınavı"),
    ("parap", "Yakın Anlam (Restatement)", "closest", "Yakın Anlam Sınavı"),
    ("paracom", "Paragraf Tamamlama", "para_comp", "Paragraf Tamamlama Sınavı"),
    ("irr", "Anlamı Bozan Cümle", "irrelevant", "Anlamı Bozan Cümle Sınavı"),
    ("trans", "Çeviri (Translation)", "translation", "Çeviri Sınavı")
]

for prefix, label, sec_id, title_prefix in mapping:
    # Find all files with this prefix
    for i in range(1, 10):
        fname = f"{prefix}{i}.json"
        if os.path.exists(fname):
            with open(fname, 'r', encoding='utf-8') as f:
                content = json.load(f)
                out = f"public/exams/mini/special/{prefix}{i}.json"
                title = f"{title_prefix} {i}"
                dur = 30 if len(content) <= 20 else 60
                convert_to_mini(content, sec_id, label, out, title, dur)
