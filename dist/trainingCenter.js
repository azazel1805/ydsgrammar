
/**
 * YDS TRAINING CENTER MODULE
 * Contains: Grammar Challenge, Irrelevant Sentence, Synonym Match
 */

const trainingCenterCommonHTML = (id, title, desc, icon) => `
<div class="max-w-3xl mx-auto p-4 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 mb-20">
    <div class="text-center space-y-2">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter italic" style="font-family: 'Playfair Display', serif;">
            ${icon} ${title}
        </h2>
        <p class="text-slate-500 text-sm italic max-w-xl mx-auto">${desc}</p>
    </div>

    <div id="${id}-container" class="relative">
        <div id="${id}-loader" class="flex flex-col items-center justify-center p-12 space-y-4">
            <div class="w-10 h-10 border-4 border-slate-100 border-t-red-800 rounded-full animate-spin"></div>
            <p class="text-[10px] font-bold text-red-800 animate-pulse uppercase tracking-widest">Hazırlanıyor...</p>
        </div>

        <div id="${id}-card" class="hidden bg-white rounded-[2rem] border border-slate-200 shadow-xl p-6 md:p-10 space-y-8 relative overflow-hidden">
            <div class="absolute -top-20 -right-20 w-40 h-40 bg-red-50 rounded-full blur-[100px] opacity-60"></div>
            
            <div class="space-y-6 relative z-10 text-center">
                <div id="${id}-template" class="text-xl md:text-2xl font-medium leading-[1.6] text-slate-900" style="font-family: 'Lora', serif;"></div>
            </div>

            <div id="${id}-options" class="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10"></div>

            <div id="${id}-feedback" class="hidden p-6 rounded-[1.5rem] border transition-all duration-500 relative z-10">
                <div class="flex flex-col md:flex-row items-center gap-4">
                    <div id="${id}-feedback-icon" class="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-md"></div>
                    <div class="text-center md:text-left flex-1">
                        <p id="${id}-feedback-title" class="font-black text-xl tracking-tight italic"></p>
                        <p id="${id}-feedback-text" class="mt-1 text-slate-600 font-medium text-sm"></p>
                    </div>
                    <button onclick="next${id}Question()" class="px-8 py-3 bg-slate-900 text-white font-black rounded-xl hover:bg-black transition-all shadow-lg text-xs uppercase tracking-widest">
                        Sıradaki <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
`;

/* =========================================
   1. GRAMMAR CHALLENGE (Conjunctions/Preps)
   ========================================= */

let grammarPool = [];

async function initGrammarChallenge() {
    const container = document.getElementById("tab-grammarchallenge");
    if (!container) return;
    if (container.innerHTML.trim() === "") container.innerHTML = trainingCenterCommonHTML("gc", "Bağlaç & Edat Canavarı", "Cümleyi en mantıklı bağlaç veya edat ile tamamla.", "⚡");

    if (grammarPool.length === 0) {
        const res = await fetch("/data/dictionary_full.json");
        const data = await res.json();
        grammarPool = data.filter(i => (i.pos === 'conjunction' || i.pos === 'preposition') && i.examples && i.examples.length > 0);
    }
    generateGCQuestion();
}

let currentGCQuestion = null;
function generateGCQuestion() {
    setupUIStatus("gc");
    const target = grammarPool[Math.floor(Math.random() * grammarPool.length)];
    const word = target.word;
    const example = target.examples[0];

    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const template = example.replace(regex, '__________');

    // Distractors from same POS
    const distractors = grammarPool.filter(i => i.pos === target.pos && i.word !== word).sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [...distractors.map(d => d.word), word].sort(() => 0.5 - Math.random());

    currentGCQuestion = { correct: word, meaning: target.tr };
    renderQuestion("gc", template, options, checkGCAnswer);
}

function checkGCAnswer(selected, btn) {
    const isCorrect = selected.toLowerCase() === currentGCQuestion.correct.toLowerCase();
    showFeedback("gc", isCorrect, btn, currentGCQuestion.correct, currentGCQuestion.meaning);
    if (typeof window.saveWPResultFirestore === "function") window.saveWPResultFirestore(`Grammar:${currentGCQuestion.correct}`, isCorrect);
}

window.nextgcQuestion = generateGCQuestion;

/* =========================================
   2. IRRELEVANT SENTENCE
   ========================================= */

async function initIrrelevant() {
    const container = document.getElementById("tab-irrelevant");
    if (!container) return;
    if (container.innerHTML.trim() === "") container.innerHTML = trainingCenterCommonHTML("ir", "Anlam Akışını Bozan Cümle", "Paragrafın anlam bütünlüğünü bozan (Irrelevant) cümleyi bul.", "🧩");
    generateIRQuestion();
}

async function generateIRQuestion() {
    setupUIStatus("ir");

    // Topics list
    const topics = ["Albert Einstein", "Industrial Revolution", "Global Warming", "Space Exploration", "Artificial Intelligence", "DNA", "Ancient Egypt", "Quantum Mechanics", "French Revolution", "Climate Change"];
    const topic = topics[Math.floor(Math.random() * topics.length)];

    try {
        // Fetch a longer extract to have enough sentences for "contextually related but out-of-flow" difficulty
        const wikiRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${encodeURIComponent(topic)}&explaintext=1&exchars=2000&origin=*`);
        const data = await wikiRes.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const extract = pages[pageId].extract;

        if (!extract) {
            generateIRQuestion();
            return;
        }

        // Split into sentences, clean up
        let sentences = extract.split(/[.!?]\s+/).filter(s => s.length > 30).map(s => s.trim() + ".");

        if (sentences.length < 12) {
            // Fallback to summary if extract is too short or retry
            generateIRQuestion();
            return;
        }

        // Pick 4 consecutive sentences for the main paragraph
        const startIdx = Math.floor(Math.random() * (sentences.length - 8));
        const baseSentences = sentences.slice(startIdx, startIdx + 4);

        // Pick an irrelevant sentence from at least 6 sentences away (same article)
        // This follows the user request "aynı makalede ki 10 cümle sonra"
        let irrevIdx = (startIdx + 8) % sentences.length;
        if (irrevIdx >= startIdx && irrevIdx < startIdx + 4) {
            irrevIdx = (startIdx + 5) % sentences.length;
        }
        const irrevPrompt = sentences[irrevIdx];

        const finalSet = [...baseSentences, irrevPrompt];
        const shuffled = finalSet.map((text, index) => ({ text, isCorrect: text === irrevPrompt }));
        shuffled.sort(() => 0.5 - Math.random());

        const template = shuffled.map((s, i) => `<div class="mb-2 text-left p-3 bg-slate-50/50 rounded-xl border border-slate-100 text-sm md:text-base"><span class="font-bold text-red-800 mr-2">(${i + 1})</span> ${s.text}</div>`).join("");

        const options = shuffled.map((s, i) => `Cümle ${i + 1}`);
        const correctIndex = shuffled.findIndex(s => s.isCorrect);

        currentIRQuestion = { correct: options[correctIndex], text: irrevPrompt };
        renderQuestion("ir", template, options, checkIRAnswer);

    } catch (e) {
        console.error("IR load fail", e);
        // Fallback to a simple placeholder if API fails
        setupUIStatus("ir");
        setTimeout(generateIRQuestion, 1000);
    }
}

function checkIRAnswer(selected, btn) {
    const isCorrect = selected === currentIRQuestion.correct;
    showFeedback("ir", isCorrect, btn, currentIRQuestion.correct, "Bu cümle paragrafın genel konusunun dışına çıkmaktadır.");
}

window.nextirQuestion = generateIRQuestion;

/* =========================================
   3. SYNONYM MATCH
   ========================================= */

let synonymPool = [];

async function initSynonymMatch() {
    const container = document.getElementById("tab-synonymmatch");
    if (!container) return;
    if (container.innerHTML.trim() === "") container.innerHTML = trainingCenterCommonHTML("sm", "Eş Anlamlı Eşleştirme", "Cümledeki hedef kelimenin yerine hangisi gelebilir?", "🔄");

    if (synonymPool.length === 0) {
        const res = await fetch("/data/dictionary_full.json");
        const data = await res.json();
        synonymPool = data.filter(i => i.synonyms && i.synonyms.length > 0 && i.examples && i.examples.length > 0);
    }
    generateSMQuestion();
}

let currentSMQuestion = null;
function generateSMQuestion() {
    setupUIStatus("sm");
    const target = synonymPool[Math.floor(Math.random() * synonymPool.length)];
    const word = target.word;
    const synonym = target.synonyms[0];
    const example = target.examples[0];

    const template = example.replace(new RegExp(`\\b${word}\\b`, 'gi'), `<span class="bg-yellow-100 px-2 rounded border-b-2 border-yellow-400 font-bold">${word}</span>`);

    // Distractors
    const pool = synonymPool.filter(i => i.pos === target.pos && i.word !== word && !target.synonyms.includes(i.word));
    const distractors = pool.sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [...distractors.map(d => d.word), synonym].sort(() => 0.5 - Math.random());

    currentSMQuestion = { correct: synonym, word: word };
    renderQuestion("sm", template, options, checkSMAnswer);
}

function checkSMAnswer(selected, btn) {
    const isCorrect = selected.toLowerCase() === currentSMQuestion.correct.toLowerCase();
    showFeedback("sm", isCorrect, btn, currentSMQuestion.correct, `${currentSMQuestion.word} kelimesinin en yakın eş anlamlısı ${currentSMQuestion.correct} kelimesidir.`);
}

window.nextsmQuestion = generateSMQuestion;

/* =========================================
   UTILS
   ========================================= */

function setupUIStatus(id) {
    const loader = document.getElementById(`${id}-loader`);
    const card = document.getElementById(`${id}-card`);
    const feedback = document.getElementById(`${id}-feedback`);
    if (loader) loader.classList.remove("hidden");
    if (card) card.classList.add("hidden");
    if (feedback) feedback.classList.add("hidden");
}

function renderQuestion(id, template, options, clickFn) {
    setTimeout(() => {
        const templateEl = document.getElementById(`${id}-template`);
        const optContainer = document.getElementById(`${id}-options`);

        if (templateEl) templateEl.innerHTML = template;
        if (optContainer) {
            optContainer.innerHTML = "";
            options.forEach(opt => {
                const btn = document.createElement("button");
                btn.className = "p-4 md:p-5 text-left rounded-2xl border border-slate-100 bg-white hover:border-red-200 hover:bg-slate-50 transition-all font-bold text-slate-800 shadow-sm flex justify-between items-center group";
                btn.innerHTML = `<span class="text-lg tracking-tight">${opt}</span><div class="h-6 w-6 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-red-800 group-hover:text-white transition-all"><i class="fas fa-chevron-right text-[10px]"></i></div>`;
                btn.onclick = () => clickFn(opt, btn);
                optContainer.appendChild(btn);
            });
        }
        document.getElementById(`${id}-loader`).classList.add("hidden");
        document.getElementById(`${id}-card`).classList.remove("hidden");
    }, 600);
}

function showFeedback(id, isCorrect, btn, correctVal, text) {
    document.querySelectorAll(`#${id}-options button`).forEach(b => {
        b.disabled = true;
        if (b.innerText.includes(correctVal)) b.classList.add("border-emerald-500", "bg-emerald-50", "text-emerald-800");
    });

    const feedback = document.getElementById(`${id}-feedback`);
    const fIcon = document.getElementById(`${id}-feedback-icon`);
    const fTitle = document.getElementById(`${id}-feedback-title`);
    const fText = document.getElementById(`${id}-feedback-text`);

    feedback.classList.remove("hidden");
    if (isCorrect) {
        fIcon.className = "w-16 h-16 rounded-2xl flex items-center justify-center bg-emerald-500 text-white shadow-lg";
        fIcon.innerHTML = `<i class="fas fa-check"></i>`;
        fTitle.innerText = "Doğru!";
        fTitle.className = "font-black text-2xl text-emerald-900 italic";
        feedback.className = "p-8 rounded-[2rem] border border-emerald-100 bg-emerald-50/50 animate-in zoom-in duration-500";
    } else {
        btn.classList.add("border-red-500", "bg-red-50", "text-red-900");
        fIcon.className = "w-16 h-16 rounded-2xl flex items-center justify-center bg-red-600 text-white shadow-lg";
        fIcon.innerHTML = `<i class="fas fa-times"></i>`;
        fTitle.innerText = "Yanlış!";
        fTitle.className = "font-black text-2xl text-red-900 italic";
        feedback.className = "p-8 rounded-[2rem] border border-red-100 bg-red-50/50";
    }
    fText.innerText = text;
}
