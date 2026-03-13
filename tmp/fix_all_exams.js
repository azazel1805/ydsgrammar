const fs = require('fs');
const path = require('path');

const baseDir = process.cwd();
const folders = [
    path.join(baseDir, 'public', 'exams', 'full'),
    path.join(baseDir, 'public', 'exams', 'mini')
];

folders.forEach(dir => {
    if (!fs.existsSync(dir)) {
        console.log(`Directory not found: ${dir}`);
        return;
    }
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

    files.forEach(file => {
        const filePath = path.join(dir, file);
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            let data = JSON.parse(content);
            let changed = false;

            if (data.passages && Array.isArray(data.passages)) {
                data.passages.forEach(p => {
                    if (p.text && p.text.includes('- Question')) {
                        const firstPart = p.text.split(/- Question\s+\d+/i)[0].trim();
                        if (firstPart && firstPart.length > 50) {
                            p.text = firstPart;
                            changed = true;
                        }
                    }
                });
            }
            
            if (data.questions && Array.isArray(data.questions)) {
                data.questions.forEach(q => {
                    if (q.question && q.question.includes('- Question')) {
                        const firstPart = q.question.split(/- Question\s+\d+/i)[0].trim();
                        if (firstPart) {
                            q.question = firstPart;
                            changed = true;
                        }
                    }
                    
                    // Specific fix for Reading questions that still have the whole passage in them
                    if (q.section_id === 'reading' && q.passage_id) {
                        const passage = data.passages.find(p => p.id === q.passage_id);
                        if (passage && passage.text) {
                            // If the question contains a large portion of the passage text at the start
                            if (q.question.startsWith(passage.text.substring(0, 50))) {
                                // Extract the part after the passage
                                // Usually it's Passage text + Question
                                const lastSentence = q.question.split('. ').pop();
                                if (lastSentence.includes('?')) {
                                     q.question = lastSentence;
                                     changed = true;
                                }
                            }
                        }
                    }
                });
            }

            if (changed) {
                fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
                console.log(`Fixed ${file}`);
            }
        } catch (e) {
            console.error(`Error processing ${file}: ${e.message}`);
        }
    });
});
