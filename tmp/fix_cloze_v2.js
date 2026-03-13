const fs = require('fs');
const path = require('path');

const folders = [
    'c:\\Users\\User\\Desktop\\Adai\\yds\\ydsgrammar\\public\\exams\\full',
    'c:\\Users\\User\\Desktop\\Adai\\yds\\ydsgrammar\\public\\exams\\mini'
];

folders.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let data = JSON.parse(content);
        let changed = false;

        if (data.passages && Array.isArray(data.passages)) {
            data.passages.forEach(p => {
                // If text contains duplicated blocks separated by "- Question"
                if (p.text && p.text.includes('- Question')) {
                    const firstPart = p.text.split(/- Question\s+\d+/i)[0].trim();
                    if (firstPart && firstPart.length > 50) {
                        p.text = firstPart;
                        changed = true;
                    }
                }
            });
        }
        
        // Also clean the questions themselves if they have the same mess
        if (data.questions && Array.isArray(data.questions)) {
            data.questions.forEach(q => {
                if (q.question && q.question.includes('- Question')) {
                    const firstPart = q.question.split(/- Question\s+\d+/i)[0].trim();
                     // Actually for questions in Cloze, we want to clean them more aggressively
                     // But let's start with removing the "- Question" mess
                    if (firstPart) {
                        q.question = firstPart;
                        changed = true;
                    }
                }
                
                // If it's a Cloze question, we might want to clean the prompt further
                // to avoid showing the FULL text in the question field
                const section = data.sections ? data.sections.find(s => s.id === q.section_id) : null;
                const sectionType = section ? section.id.toLowerCase() : '';
                
                if (sectionType.includes('cloze')) {
                    // If the question still has the full text (contains multiple blanks or matches passage text)
                    // we should trim it.
                    // But for now, we rely on the JS to show "Soru X: Boşluk için..."
                }
            });
        }

        if (changed) {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
            console.log(`Fixed ${file} in ${dir}`);
        }
    });
});
