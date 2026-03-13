import json
import re

# Restoration for fullexam9 Cloze 1
# Based on common industrial revolution texts and options: 17: Towards, 18: mostly, 19: While, 20: in exchange for, 21: advocate
cloze_9_1 = "The Industrial Revolution was a period of profound social and economic change. (17) ____ the late 18th century, traditional agrarian societies began to transform into industrial ones. This transition was (18) ____ driven by technological innovations in textile production and steam power. (19) ____ it led to significant economic growth, it also created harsh living conditions for the working class. Workers often had to endure long hours (20) ____ low wages. Today, many historians (21) ____ for a more nuanced understanding of this era's social impact."

# Restoration for fullexam9 Cloze 2
# Options: 22: regulatory, 23: presence, 24: which, 25: both, 26: before
cloze_9_2 = "Ethics in artificial intelligence is a growing field of study. As AI systems become more autonomous, the need for (22) ____ frameworks becomes critical. The (23) ____ of bias in algorithms is a major concern (24) ____ developers must address. Ensuring that AI is (25) ____ transparent and accountable is essential (26) ____ it can be fully integrated into society."

def deduplicate_text(text):
    # Split into sentences
    sentences = re.split(r'(?<=[.!?]) +', text)
    unique_sentences = []
    for s in sentences:
        s_clean = s.strip()
        if not s_clean: continue
        # If this sentence is already contained in another sentence or contains another sentence, handle it
        is_sub = False
        for existing in unique_sentences:
            if s_clean.lower() in existing.lower() or existing.lower() in s_clean.lower():
                is_sub = True
                # If the current sentence is longer, replace the existing one
                if len(s_clean) > len(existing):
                    unique_sentences[unique_sentences.index(existing)] = s_clean
                break
        if not is_sub:
            unique_sentences.append(s_clean)
    return " ".join(unique_sentences).strip()

def fix_exam(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    for p in data['passages']:
        # Manual fix for fullexam9
        if "fullexam9" in file_path:
            if p['id'] == 'cloze_1': p['text'] = cloze_9_1
            if p['id'] == 'cloze_2': p['text'] = cloze_9_2
        
        # Deduplicate
        p['text'] = deduplicate_text(p['text'])
        
        # Final cleanup of any lingering labels
        p['text'] = re.sub(r'\(Continued\):?', '', p['text']).strip()

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

fix_exam(r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam7.json')
fix_exam(r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam8.json')
fix_exam(r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam9.json')
fix_exam(r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam10.json')
