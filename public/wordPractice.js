
/* =========================================
 KELİME ÇALIŞMASI (WORD PRACTICE) MODULE
========================================= */

const wordPracticeHTML = `
<div class="max-w-4xl mx-auto p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 mb-20">
    
    <div class="text-center space-y-4">
        <h2 class="text-5xl font-black text-slate-900 tracking-tighter italic" style="font-family: 'Playfair Display', serif;">
            🧠 Kelime Çalışması
        </h2>
        <p class="text-slate-500 italic max-w-xl mx-auto">
            Cümle içindeki boşlukları en uygun kelime ile doldurarak kelime dağarcığını geliştir.
        </p>
    </div>

    <div id="wp-game-container" class="relative">
        <!-- Loader -->
        <div id="wp-loader" class="flex flex-col items-center justify-center p-20 space-y-4">
            <div class="w-12 h-12 border-4 border-slate-100 border-t-red-800 rounded-full animate-spin"></div>
            <p class="text-sm font-bold text-red-800 animate-pulse uppercase tracking-widest">Yeni Soru Hazırlanıyor...</p>
        </div>

        <!-- Question Card -->
        <div id="wp-card" class="hidden bg-white rounded-[3rem] border border-slate-200 shadow-2xl p-10 md:p-16 space-y-12 relative overflow-hidden">
            <!-- Background Decorative Element -->
            <div class="absolute -top-20 -right-20 w-60 h-60 bg-red-50 rounded-full blur-[100px] opacity-60"></div>
            
            <div class="space-y-8 relative z-10">
                <div class="flex items-center gap-3">
                    <div class="h-px flex-1 bg-slate-100"></div>
                    <div class="px-5 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-xl">
                        YDS Practice
                    </div>
                    <div class="h-px flex-1 bg-slate-100"></div>
                </div>
                
                <h3 id="wp-template" class="text-2xl md:text-4xl font-medium leading-[1.4] text-slate-900 text-center" style="font-family: 'Lora', serif;">
                    <!-- Question text goes here -->
                </h3>
            </div>

            <div id="wp-options" class="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                <!-- Buttons go here -->
            </div>

            <div id="wp-feedback" class="hidden p-8 rounded-[2rem] border transition-all duration-500 relative z-10">
                <div class="flex flex-col md:flex-row items-center gap-6">
                    <div id="wp-feedback-icon" class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg transform rotate-3"></div>
                    <div class="text-center md:text-left flex-1">
                        <p id="wp-feedback-title" class="font-black text-2xl tracking-tight italic"></p>
                        <p id="wp-feedback-text" class="mt-2 text-slate-600 font-medium"></p>
                    </div>
                    <button onclick="nextWPQuestion()" class="w-full md:w-auto px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-black hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs shadow-2xl shadow-slate-900/20">
                        Sıradaki <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
@keyframes wp-shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
.wp-shake { animation: wp-shake 0.3s ease-in-out; }

.wp-opt-btn {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.wp-opt-btn:hover:not(:disabled) {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px -5px rgba(0,0,0,0.1);
}

.wp-opt-btn:active:not(:disabled) {
    transform: scale(0.98);
}
</style>
`;

let wpDictionary = [];
let currentWPQuestion = null;

async function initWordPractice() {
    const container = document.getElementById("tab-wordpractice");
    if (!container) return;

    // Only inject if empty
    if (container.innerHTML.trim() === "") {
        container.innerHTML = wordPracticeHTML;
    }

    if (wpDictionary.length === 0) {
        try {
            const res = await fetch("/data/dictionary_full.json");
            const data = await res.json();
            // Filter out items without examples or words
            wpDictionary = data.filter(item => item.word && item.examples && item.examples.length > 0);
        } catch (e) {
            console.error("WP Dictionary load fail", e);
            document.getElementById("wp-loader").innerHTML = `<p class="text-red-500 font-bold">Veri yüklenemedi. Lütfen sayfayı yenileyin.</p>`;
            return;
        }
    }

    if (!currentWPQuestion) {
        generateWPQuestion();
    }
}

function generateWPQuestion() {
    if (wpDictionary.length === 0) return;

    // UI Reset
    const loader = document.getElementById("wp-loader");
    const card = document.getElementById("wp-card");
    const feedback = document.getElementById("wp-feedback");

    if (loader) loader.classList.remove("hidden");
    if (card) card.classList.add("hidden");
    if (feedback) feedback.classList.add("hidden");

    // Logic
    const targetItem = wpDictionary[Math.floor(Math.random() * wpDictionary.length)];
    const word = targetItem.word;
    const example = targetItem.examples[0];
    const pos = targetItem.pos;

    // Synonyms and Antonyms exclusion list (Geliştirme Önerisi Uygulandı)
    const excluded = new Set([word.toLowerCase()]);
    if (targetItem.synonyms) targetItem.synonyms.forEach(s => excluded.add(s.toLowerCase()));
    if (targetItem.antonyms) targetItem.antonyms.forEach(a => excluded.add(a.toLowerCase()));

    // Create template
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const template = example.replace(regex, '__________');

    if (template === example) {
        // Retry if word not found exactly in example
        setTimeout(generateWPQuestion, 0);
        return;
    }

    // Get Distractors (Same POS but not synonyms/antonyms)
    const pool = wpDictionary.filter(item =>
        item.pos === pos &&
        !excluded.has(item.word.toLowerCase()) &&
        item.word.length > 2
    );

    let distractors = [];
    if (pool.length < 3) {
        // Fallback to any pos if too specific
        const generalPool = wpDictionary.filter(item => !excluded.has(item.word.toLowerCase()));
        distractors = wpPickRandom(generalPool, 3);
    } else {
        distractors = wpPickRandom(pool, 3);
    }

    const options = [...distractors.map(d => d.word), word].sort(() => Math.random() - 0.5);

    currentWPQuestion = {
        template: template,
        correct: word,
        pos: pos,
        meaning: targetItem.tr || null
    };

    // Render with subtle delay for "preparing" feel
    setTimeout(() => {
        const templateEl = document.getElementById("wp-template");
        const optContainer = document.getElementById("wp-options");

        if (templateEl) templateEl.innerText = template;
        if (optContainer) {
            optContainer.innerHTML = "";
            options.forEach(opt => {
                const btn = document.createElement("button");
                btn.className = "wp-opt-btn p-6 text-left rounded-[1.5rem] border border-slate-100 bg-white hover:border-red-200 hover:bg-slate-50 transition-all font-bold text-slate-800 shadow-sm flex justify-between items-center group";
                btn.innerHTML = `
                    <span class="text-xl tracking-tight">${opt}</span> 
                    <div class="h-8 w-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-red-800 group-hover:text-white transition-all">
                        <i class="fas fa-chevron-right text-xs"></i>
                    </div>
                `;
                btn.onclick = () => checkWPAnswer(opt, btn);
                optContainer.appendChild(btn);
            });
        }

        if (loader) loader.classList.add("hidden");
        if (card) card.classList.remove("hidden");
    }, 600);
}

function wpPickRandom(arr, n) {
    const result = [];
    const used = new Set();
    while (result.length < n && result.length < arr.length) {
        const idx = Math.floor(Math.random() * arr.length);
        if (!used.has(idx)) {
            result.push(arr[idx]);
            used.add(idx);
        }
    }
    return result;
}

function checkWPAnswer(selected, btn) {
    const isCorrect = selected.toLowerCase() === currentWPQuestion.correct.toLowerCase();

    // Disable all buttons and show correct
    document.querySelectorAll(".wp-opt-btn").forEach(b => {
        b.disabled = true;
        const bText = b.querySelector("span").innerText.trim().toLowerCase();
        if (bText === currentWPQuestion.correct.toLowerCase()) {
            b.classList.add("border-emerald-500", "bg-emerald-50", "text-emerald-800");
            b.querySelector("div").classList.add("bg-emerald-500", "text-white");
        }
    });

    const feedback = document.getElementById("wp-feedback");
    const fIcon = document.getElementById("wp-feedback-icon");
    const fTitle = document.getElementById("wp-feedback-title");
    const fText = document.getElementById("wp-feedback-text");

    if (!feedback) return;

    feedback.classList.remove("hidden");

    if (isCorrect) {
        fIcon.className = "w-16 h-16 rounded-2xl flex items-center justify-center bg-emerald-500 text-white shadow-lg shadow-emerald-200";
        fIcon.innerHTML = `<i class="fas fa-check"></i>`;
        fTitle.innerText = "Mükemmel Hamle!";
        fTitle.className = "font-black text-2xl text-emerald-900 tracking-tight italic";
        feedback.className = "p-8 rounded-[2rem] border border-emerald-100 bg-emerald-50/50 animate-in zoom-in duration-500";
    } else {
        btn.classList.add("border-red-500", "bg-red-50", "text-red-900");
        fIcon.className = "w-16 h-16 rounded-2xl flex items-center justify-center bg-red-600 text-white shadow-lg shadow-red-200";
        fIcon.innerHTML = `<i class="fas fa-times"></i>`;
        fTitle.innerText = "Hata Geliyorum Dermiş!";
        fTitle.className = "font-black text-2xl text-red-900 tracking-tight italic";
        feedback.className = "p-8 rounded-[2rem] border border-red-100 bg-red-50/50 wp-shake";
    }

    fText.innerText = `Kelime: ${currentWPQuestion.correct} (${currentWPQuestion.pos}) — ${currentWPQuestion.meaning || "Çeviri hazırlanıyor..."}`;

    // FIREBASE STATS (Veri Analizi ve İstatistik)
    if (typeof window.saveWPResultFirestore === "function") {
        window.saveWPResultFirestore(currentWPQuestion.correct, isCorrect).then(() => {
            // Update gamification on dashboard to reflect new XP
            if (typeof window.updateGamification === "function") {
                window.updateGamification();
            }
        }).catch(console.error);
    }
}

function nextWPQuestion() {
    generateWPQuestion();
}

window.initWordPractice = initWordPractice;
window.nextWPQuestion = nextWPQuestion;
