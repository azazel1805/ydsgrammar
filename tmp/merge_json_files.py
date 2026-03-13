import json
import os

def merge_json(src_files, target_file, merge_type='questions'):
    if not os.path.exists(target_file):
        print(f"Target file {target_file} not found. Skipping.")
        return

    with open(target_file, 'r', encoding='utf-8') as f:
        target_data = json.load(f)

    existing_questions = {q['question']: q for q in target_data.get('questions', [])}
    
    max_id = 0
    if target_data.get('questions'):
        max_id = max(q['id'] for q in target_data['questions'])

    new_questions = []
    
    # Track section IDs to avoid collision if necessary, but we'll mostly use target's sections
    target_sections = {s['id']: s for s in target_data.get('sections', [])}
    
    for src_file in src_files:
        if not os.path.exists(src_file):
            print(f"Source file {src_file} not found. Skipping.")
            continue
            
        with open(src_file, 'r', encoding='utf-8') as f:
            src_data = json.load(f)
            
        # Handle passages if any
        if 'passages' in src_data and 'passages' in target_data:
            existing_passages = {p['id']: p for p in target_data['passages']}
            for p in src_data['passages']:
                if p['id'] not in existing_passages:
                    target_data['passages'].append(p)

        for q in src_data.get('questions', []):
            if q['question'] not in existing_questions:
                max_id += 1
                q['id'] = max_id
                # Ensure section_id exists in target
                if q['section_id'] not in target_sections:
                    # Fallback to first section if possible
                    if target_data.get('sections'):
                        q['section_id'] = target_data['sections'][0]['id']
                
                new_questions.append(q)
                existing_questions[q['question']] = q

    target_data['questions'].extend(new_questions)
    target_data['meta']['total_questions'] = len(target_data['questions'])
    
    # Update sections range if there's only one section or we want to be simple
    if len(target_data['sections']) == 1:
        target_data['sections'][0]['to'] = len(target_data['questions'])

    with open(target_file, 'w', encoding='utf-8') as f:
        json.dump(target_data, f, indent=2, ensure_ascii=False)
    print(f"Merged {len(new_questions)} new questions into {target_file}")

base_path = r'c:\Users\User\Desktop\Adai\yds\ydsgrammar'
strategy_path = os.path.join(base_path, 'public', 'exams', 'strategy')

merges = [
    (['cloze.json'], 'cloze_test.json'),
    (['sentence_complete.json'], 'sentence_completion.json'),
    (['grammar.json'], 'grammar.json'),
    (['dialogue1.json', 'dialogue2.json'], 'dialogue.json'),
    (['irre1.json', 'irre2.json'], 'irrelevant.json'),
    (['paracomp1.json', 'paracomp2.json'], 'paragraph_completion.json'),
    (['parap1.json', 'parap2.json'], 'paraphrase.json'),
    (['reading1.json', 'reading2.json'], 'reading.json'),
    (['trans1.json', 'trans2.json'], 'translation.json'),
]

for src_names, target_name in merges:
    src_files = [os.path.join(base_path, name) for name in src_names]
    target_file = os.path.join(strategy_path, target_name)
    merge_json(src_files, target_file)

# Special case for restatement.json which was empty
restatement_target = os.path.join(strategy_path, 'restatement.json')
paraphrase_src = os.path.join(strategy_path, 'paraphrase.json')
if os.path.exists(paraphrase_src) and os.path.exists(restatement_target):
    with open(paraphrase_src, 'r', encoding='utf-8') as f:
        p_data = json.load(f)
    p_data['meta']['title'] = "Master Restatement Strategy"
    with open(restatement_target, 'w', encoding='utf-8') as f:
        json.dump(p_data, f, indent=2, ensure_ascii=False)
    print("Updated restatement.json from paraphrase.json")
