import json
import os

def merge_files(file_list, output_name, title):
    all_questions = []
    current_id = 1
    
    # We'll take meta from the first file but update it
    first_meta = None
    
    for fname in file_list:
        path = os.path.join("public/exams/mini/special", fname)
        if not os.path.exists(path):
            # Fallback for old mini exams
            path = os.path.join("public/exams/mini", fname)
            
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                if first_meta is None:
                    first_meta = data.get("meta", {})
                
                for q in data.get("questions", []):
                    # Deep copy just in case
                    new_q = q.copy()
                    new_q["id"] = current_id
                    all_questions.append(new_q)
                    current_id += 1
        else:
            print(f"File not found: {path}")

    output_data = {
        "meta": {
            "title": title,
            "subtitle": f"{len(all_questions)} Soru Havuzu",
            "total_questions": len(all_questions),
            "duration_minutes": 60 # Default
        },
        "sections": [{ "id": "mixed", "label": title, "from": 1, "to": len(all_questions) }],
        "passages": [], # Passages are often inline or shared, but for mini exams we might need to handle them carefully if they exist.
        "questions": all_questions
    }
    
    # Extract passages if they exist (some read1.json etc might have passages list)
    # Actually most of them have passage text inside question or passage_id.
    # Let's check a reading file structure.
    
    with open(os.path.join("public/exams/mini/special", output_name), 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=4, ensure_ascii=False)
    print(f"Created {output_name} with {len(all_questions)} questions.")

groups = {
    "master_vocab.json": (["vocab1.json", "vocab2.json"], "Kelime Soruları"),
    "master_grammar.json": (["grammar1.json", "grammar1.json"], "Gramer Soruları"),
    "master_reading.json": (["read1.json", "read2.json", "read3.json", "read4.json", "read5.json"], "Okuma Parçaları"),
    "master_cloze.json": (["cloze1.json", "cloze2.json"], "Cloze Test"),
    "master_sencomp.json": (["sencomp1.json", "sencomp2.json"], "Cümle Tamamlama"),
    "master_paracom.json": (["paracom1.json", "paracom2.json"], "Paragraf Tamamlama"),
    "master_clomean.json": (["clomean1.json", "clomean2.json", "parap1.json", "parap2.json"], "Yakın Anlam / Paraphrase"),
    "master_irr.json": (["irr1.json", "irr2.json"], "Bozan Cümle"),
    "master_trans.json": (["trans1.json", "trans2.json", "trans3.json", "trans4.json", "trans5.json"], "Çeviri Soruları"),
    "master_dia.json": (["dia1.json", "dia2.json"], "Diyalog Tamamlama"),
    "master_karma.json": (["karma1.json"] + [f"../miniexam{i}.json" for i in range(1, 26)], "Karma Soru Havuzu")
}

for out, (files, title) in groups.items():
    merge_files(files, out, title)
