import json

file_path = r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\exams\full\fullexam14.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Restore Reading 3
for p in data['passages']:
    if p['id'] == 'reading_3':
        p['text'] = "The concept of 'Soft Power', coined by Joseph Nye, refers to a nation's ability to influence others through attraction and persuasion rather than coercion or payment. While 'Hard Power' relies on military might and economic sanctions, Soft Power draws on culture, political values, and foreign policies. In the digital age, the diffusion of information has made Soft Power increasingly vital, as public perception can sway international relations more rapidly than ever. However, critics argue that Soft Power is difficult to measure and cannot replace the necessity of a strong military."
    elif p['id'] == 'reading_5':
        p['text'] = "The 'Resource Curse' refers to the paradox that countries with an abundance of natural resources, such as oil and minerals, tend to have less economic growth and worse development outcomes than countries with fewer natural resources. This often occurs because the economy becomes overly dependent on a single export, making it vulnerable to market fluctuations. Furthermore, the wealth generated often leads to corruption and the neglect of other sectors like education and manufacturing. To avoid this, some nations have established sovereign wealth funds to diversify their investments and ensure long-term stability."

# Fix missing question prompts in questions 51 and 54 (Reading 3) and 60,61 (Reading 5)
for q in data['questions']:
    if q['id'] == 51:
        q['question'] = "The passage defines 'Soft Power' as the capacity to ---."
    elif q['id'] == 54:
        q['question'] = "The relationship between Hard Power and Soft Power, as described, is one of ---."
    elif q['id'] == 59: # Correction: Q59 is first for reading 5
        q['question'] = "The 'Resource Curse' is considered a paradox because ---."
    elif q['id'] == 61:
        q['question'] = "According to the passage, one reason for poor development in resource-rich countries is ---."
    elif q['id'] == 62:
        q['question'] = "It can be inferred from the passage that long-term stability requires ---."

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4, ensure_ascii=False)
