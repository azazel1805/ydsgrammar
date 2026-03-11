import json
import os

files = [
    'vocab1.json', 'vocab2.json', 'grammar1.json', 'grammar2.json',
    'cloze1.json', 'cloze2.json', 'sencomp1.json', 'sencomp2.json',
    'read1.json', 'read2.json', 'read3.json', 'read4.json', 'read5.json',
    'dia1.json', 'dia2.json', 'clomean1.json', 'clomean2.json',
    'paracom1.json', 'paracom2.json', 'irr1.json', 'irr2.json',
    'parap1.json', 'parap2.json', 'trans1.json', 'trans2.json', 
    'trans3.json', 'trans4.json', 'trans5.json'
]

results = {}
for f in files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as jf:
            data = json.load(jf)
            results[f] = len(data)

print(json.dumps(results, indent=2))
