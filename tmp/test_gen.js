
import fs from 'fs';
import path from 'path';

const dictionaryPath = 'c:/Users/User/Desktop/Adai/yds/ydsgrammar/public/data/dictionary_full.json';

function generateQuestion() {
    try {
        const data = JSON.parse(fs.readFileSync(dictionaryPath, 'utf8'));

        // Filter words with examples and non-empty word
        const eligibleWords = data.filter(item => item.word && item.examples && item.examples.length > 0);

        if (eligibleWords.length === 0) {
            console.log("No eligible words found.");
            return;
        }

        // Pick a random word
        const targetItem = eligibleWords[Math.floor(Math.random() * eligibleWords.length)];
        const correctWord = targetItem.word;
        const example = targetItem.examples[0];
        const pos = targetItem.pos;

        // Create template
        // Use regex to replace the word case-insensitively
        const regex = new RegExp(`\\b${correctWord}\\b`, 'gi');
        const template = example.replace(regex, '____');

        // If the word wasn't found in the example (rare but possible if examples are bad)
        if (template === example) {
            // Try simple string replace if regex fails
            const simpleTemplate = example.replace(new RegExp(correctWord, 'i'), '____');
            if (simpleTemplate === example) {
                // Try again with another word
                return generateQuestion();
            }
        }

        // Pick distractors
        // We want words with same POS but different meanings
        const distractorPool = data.filter(item =>
            item.pos === pos &&
            item.word !== correctWord &&
            item.word.length > 2
        );

        const distractors = [];
        const usedDistractors = new Set();

        while (distractors.length < 4 && distractorPool.length > 0) {
            const d = distractorPool[Math.floor(Math.random() * distractorPool.length)].word;
            if (!usedDistractors.has(d)) {
                distractors.push(d);
                usedDistractors.add(d);
            }
        }

        const question = {
            template: template,
            correct: correctWord,
            distractors: distractors
        };

        console.log(JSON.stringify(question, null, 2));
    } catch (err) {
        console.error("Error generating question:", err);
    }
}

generateQuestion();
