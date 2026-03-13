const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'exams', 'full');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

files.forEach(file => {
    try {
        const filePath = path.join(dir, file);
        let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let changed = false;

        if (data.passages) {
            data.passages.forEach(p => {
                if (p.text && p.text.includes('- Question')) {
                    const parts = p.text.split(/- Question\s+\d+/i);
                    if (parts[0].length > 20) {
                        p.text = parts[0].trim();
                        changed = true;
                    }
                }
            });
        }
        
        if (changed) {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
            console.log(`Cleaned ${file}`);
        }
    } catch(e) {}
});
