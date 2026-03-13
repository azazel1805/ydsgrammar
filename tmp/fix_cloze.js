const fs = require('fs');
const path = require('path');

const examsDir = 'c:\\Users\\User\\Desktop\\Adai\\yds\\ydsgrammar\\public\\exams\\full';
const files = fs.readdirSync(examsDir).filter(f => f.endsWith('.json'));

function cleanQuestion(text) {
    return text.replace(/\(Cloze Test\s+\d+.*?\)/gi, '')
               .replace(/\(Paragraph\s+\d+.*?\)/gi, '')
               .replace(/\(Passage\s+\d+.*?\)/gi, '')
               .replace(/\[Text as above\]/gi, '')
               .replace(/- Question\s+\d+/gi, '')
               .trim();
}

function extractProperPassage(questions) {
    if (!questions || questions.length === 0) return '';
    
    // Find the longest cleaned question text
    const cleaned = questions.map(q => cleanQuestion(q.question));
    let longest = '';
    for (const t of cleaned) {
        if (t.length > longest.length) longest = t;
    }

    // Check if the longest contains most of the others
    // For Cloze, they often have the full text in one or all.
    // If they were fragments joined before, the "longest" might be the 5x joined one.
    // So we need to detect if it's already a 5x joined mess.
    
    if (longest.includes('- Question')) {
        // It's probably a joined mess. Split it and take one part.
        const parts = longest.split(/- Question\s+\d+/i);
        return parts[0].trim();
    }
    
    // If it has multiple blanks and looks like a full paragraph, it's good.
    // If it's a fragment but we joined it, we need to be careful.
    return longest;
}

files.forEach(file => {
    const filePath = path.join(examsDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let changed = false;

    // Fix cloze blocks
    const clozeSections = data.sections.filter(s => s.id === 'cloze');
    clozeSections.forEach(sec => {
        for (let i = sec.from; i <= sec.to; i += 5) {
            const block = data.questions.filter(q => q.id >= i && q.id < i + 5);
            if (block.length > 0) {
                const passageId = block[0].passage_id;
                if (passageId) {
                    const passIdx = data.passages.findIndex(p => p.id === passageId);
                    if (passIdx !== -1) {
                        const originalText = data.passages[passIdx].text;
                        // Better extraction logic:
                        // If the text contains "- Question", it's a messed up join.
                        if (originalText.includes('- Question')) {
                            const parts = originalText.split(/- Question\s+\d+/i);
                            data.passages[passIdx].text = parts[0].trim();
                            changed = true;
                        }
                    }
                }
            }
        }
    });

    if (changed) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
        console.log(`Fixed ${file}`);
    }
});
