
/* =========================================
 KELİME ÇALIŞMASI (WORD PRACTICE) MODULE v2.0
 Premium AI & Gamified Edition
 ========================================= */

const wordPracticeHTML = `
<div class="max-w-5xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 mb-20">
    
    <!-- Top Stats Bar -->
    <div class="flex flex-wrap items-center justify-between gap-4 bg-white/40 backdrop-blur-xl border border-slate-200/50 p-6 rounded-[2.5rem] shadow-xl">
        <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
                <div class="w-10 h-10 bg-orange-100 flex items-center justify-center rounded-2xl text-orange-600 shadow-inner">
                    <i class="fas fa-fire text-xl animate-pulse"></i>
                </div>
                <div>
                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Seri (Streak)</p>
                    <p id="wp-streak" class="text-xl font-black text-slate-900">0</p>
                </div>
            </div>
            <div class="h-10 w-px bg-slate-200"></div>
            <div class="flex items-center gap-2">
                <div class="w-10 h-10 bg-indigo-100 flex items-center justify-center rounded-2xl text-indigo-600 shadow-inner">
                    <i class="fas fa-bolt text-xl"></i>
                </div>
                <div>
                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Monster XP</p>
                    <p id="wp-xp" class="text-xl font-black text-slate-900">0</p>
                </div>
            </div>
        </div>

        <div class="flex-1 max-w-xs hidden md:block">
            <div class="flex justify-between mb-2">
                <span id="wp-progress-label" class="text-[10px] font-black uppercase tracking-widest text-slate-500">Seviye İlerleyişi</span>
                <span id="wp-progress-percent" class="text-[10px] font-black text-slate-900">0%</span>
            </div>
            <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner">
                <div id="wp-progress-bar" class="h-full bg-gradient-to-r from-indigo-500 to-purple-600 w-0 transition-all duration-1000"></div>
            </div>
        </div>

        <div class="flex items-center gap-3">
             <button onclick="switchTab('profile')" class="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all">
                <i class="fas fa-user-circle text-slate-600"></i>
             </button>
        </div>
    </div>

    <!-- Main Game Section -->
    <div id="wp-game-container" class="relative group">
        <!-- Floating Back Element -->
        <div class="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-indigo-400/20 transition-all duration-1000"></div>
        <div class="absolute -bottom-20 -right-20 w-80 h-80 bg-rose-400/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-rose-400/10 transition-all duration-1000"></div>

        <!-- Loader -->
        <div id="wp-loader" class="flex flex-col items-center justify-center p-32 space-y-6">
            <div class="relative">
                <div class="w-20 h-20 border-4 border-slate-100 border-t-indigo-600 border-r-indigo-400 rounded-full animate-spin"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <i class="fas fa-brain text-indigo-600 animate-pulse text-xl"></i>
                </div>
            </div>
            <div class="text-center space-y-2">
                <p class="text-sm font-black text-slate-900 uppercase tracking-[0.3em]">AI Soru Üretiyor</p>
                <p class="text-xs text-slate-400 italic">Akademik havuzdan en uygun içerik seçiliyor...</p>
            </div>
        </div>

        <!-- Question Card -->
        <div id="wp-card" class="hidden bg-white/80 backdrop-blur-2xl rounded-[3.5rem] border border-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] p-8 md:p-20 space-y-12 relative overflow-hidden transition-all duration-700">
            
            <!-- Header Badge & Tip -->
            <div class="flex flex-col items-center gap-6">
                <div class="px-6 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full shadow-2xl shadow-slate-900/40">
                    Akademik Hazırlık
                </div>
                
                <!-- Interactive Sentence -->
                <div class="space-y-4 text-center">
                    <h3 id="wp-template" class="text-3xl md:text-5xl font-medium leading-[1.6] text-slate-900 leading-relaxed tracking-tight" style="font-family: 'Lora', serif;">
                        <!-- Question text goes here -->
                    </h3>
                    <p class="text-xs text-slate-400 flex items-center justify-center gap-2">
                        <i class="fas fa-info-circle"></i> Kelimelerin üzerine tıklayarak anlamlarına bakabilirsiniz.
                    </p>
                </div>
            </div>

            <!-- Options Grid -->
            <div id="wp-options" class="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                <!-- Buttons go here -->
            </div>

            <!-- Action Area (Monster Tip) -->
            <div class="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-100">
                <button id="wp-tip-btn" onclick="askMonsterTip()" class="flex items-center gap-3 px-8 py-4 bg-slate-50 text-slate-700 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all font-black text-xs uppercase tracking-widest border border-slate-100 group relative overflow-hidden">
                    <span class="relative z-10 flex items-center gap-2">
                       <i class="fas fa-robot"></i> Monster Tip 
                       <span id="wp-premium-lock" class="hidden text-[8px] bg-indigo-600 text-white px-1.5 py-0.5 rounded ml-1">PREMIUM</span>
                    </span>
                </button>
                
                <div id="wp-tip-container" class="hidden flex-1 max-w-md p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-xs text-indigo-900 leading-relaxed italic animate-in slide-in-from-left-4">
                    <!-- Tip will appear here -->
                </div>
            </div>

            <!-- Feedback Area -->
            <div id="wp-feedback" class="hidden p-10 rounded-[2.5rem] border transition-all duration-700 relative z-10">
                <div class="flex flex-col md:flex-row items-center gap-8">
                    <div id="wp-feedback-icon" class="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl shadow-2xl transform rotate-6 animate-bounce"></div>
                    <div class="text-center md:text-left flex-1">
                        <p id="wp-feedback-title" class="font-black text-3xl tracking-tighter italic"></p>
                        <p id="wp-feedback-text" class="mt-3 text-slate-600 font-medium text-lg leading-relaxed"></p>
                    </div>
                </div>
                <div class="mt-10 flex flex-col md:flex-row gap-4">
                     <button onclick="nextWPQuestion()" class="flex-1 px-10 py-6 bg-slate-900 text-white font-black rounded-[1.5rem] hover:bg-black hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs shadow-2xl shadow-slate-900/30 flex items-center justify-center gap-3">
                        Gelişmeye Devam Et <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
@keyframes wp-shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
}
.wp-shake { animation: wp-shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }

.wp-opt-btn {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.wp-clickable-word {
    cursor: pointer;
    transition: all 0.2s;
    border-bottom: 2px solid transparent;
}
.wp-clickable-word:hover {
    color: #4f46e5;
    background: rgba(79, 70, 229, 0.05);
    border-bottom-color: #4f46e5;
}

.wp-opt-btn:hover:not(:disabled) {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1);
    background: white;
}

.wp-opt-btn:active:not(:disabled) {
    transform: scale(0.95);
}

#wp-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #4f46e5, #06b6d4, #4f46e5);
    background-size: 200% 100%;
    animation: wp-gradient-flow 3s linear infinite;
}

@keyframes wp-gradient-flow {
    0% { background-position: 100% 0%; }
    100% { background-position: -100% 0%; }
}
</style>
`;

let wpDictionary = [];
let currentWPQuestion = null;
let wpStreak = 0;
let wpXP = 0;
let wpSessionsTotal = 0;

async function initWordPractice() {
    const container = document.getElementById("tab-wordpractice");
    if (!container) return;

    // Only inject if empty
    if (container.innerHTML.trim() === "" || container.innerHTML.includes('Kelime Çalışması')) {
        container.innerHTML = wordPracticeHTML;
    }

    if (wpDictionary.length === 0) {
        try {
            const res = await fetch("/data/dictionary_full.json");
            const data = await res.json();
            wpDictionary = data.filter(item => item.word && item.examples && item.examples.length > 0);
        } catch (e) {
            console.error("WP Dictionary load fail", e);
            document.getElementById("wp-loader").innerHTML = `<p class="text-red-500 font-bold">Veri yüklenemedi. Lütfen sayfayı yenileyin.</p>`;
            return;
        }
    }

    checkPremiumWPUnderlay();
    
    if (!currentWPQuestion) {
        generateWPQuestion();
    }
}

function checkPremiumWPUnderlay() {
    const isVip = window.currentUser?.email === "onurtosuner@gmail.com" || localStorage.getItem("analyzer_access") === "true";
    const lock = document.getElementById("wp-premium-lock");
    if (lock) {
        if (isVip) lock.innerText = "PREMIUM ACTIVE";
        else lock.classList.remove("hidden");
    }
}

function generateWPQuestion() {
    if (wpDictionary.length === 0) return;

    // UI Reset
    const loader = document.getElementById("wp-loader");
    const card = document.getElementById("wp-card");
    const feedback = document.getElementById("wp-feedback");
    const tipContainer = document.getElementById("wp-tip-container");

    if (loader) loader.classList.remove("hidden");
    if (card) card.classList.add("hidden");
    if (feedback) feedback.classList.add("hidden");
    if (tipContainer) tipContainer.classList.add("hidden");

    // Logic
    const targetItem = wpDictionary[Math.floor(Math.random() * wpDictionary.length)];
    const word = targetItem.word;
    const example = targetItem.examples[0];
    const pos = targetItem.pos;

    // Synonyms and Antonyms exclusion list
    const excluded = new Set([word.toLowerCase()]);
    if (targetItem.synonyms) targetItem.synonyms.forEach(s => excluded.add(s.toLowerCase()));
    if (targetItem.antonyms) targetItem.antonyms.forEach(a => excluded.add(a.toLowerCase()));

    // Create template
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const template = example.replace(regex, '__________');

    if (template === example) {
        setTimeout(generateWPQuestion, 0);
        return;
    }

    // Get Distractors
    const pool = wpDictionary.filter(item =>
        item.pos === pos &&
        !excluded.has(item.word.toLowerCase()) &&
        item.word.length > 2
    );

    let distractors = [];
    if (pool.length < 3) {
        const generalPool = wpDictionary.filter(item => !excluded.has(item.word.toLowerCase()));
        distractors = wpPickRandom(generalPool, 3);
    } else {
        distractors = wpPickRandom(pool, 3);
    }

    const options = [...distractors.map(d => d.word), word].sort(() => Math.random() - 0.5);

    currentWPQuestion = {
        template: template,
        fullSentence: example,
        correct: word,
        pos: pos,
        meaning: targetItem.tr || null,
        data: targetItem
    };

    // Render with subtle delay
    setTimeout(() => {
        const templateEl = document.getElementById("wp-template");
        const optContainer = document.getElementById("wp-options");

        if (templateEl) {
            templateEl.innerHTML = renderClickableWords(template);
        }
        
        if (optContainer) {
            optContainer.innerHTML = "";
            options.forEach(opt => {
                const btn = document.createElement("button");
                btn.className = "wp-opt-btn p-8 text-left rounded-[2rem] border border-slate-100 bg-white hover:border-indigo-200 shadow-sm flex justify-between items-center group overflow-hidden";
                btn.innerHTML = `
                    <div class="relative z-10 flex flex-col">
                        <span class="text-xl font-black text-slate-900 tracking-tight">${opt}</span>
                    </div>
                    <div class="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-[15deg] transition-all duration-500">
                        <i class="fas fa-chevron-right text-xs"></i>
                    </div>
                `;
                btn.onclick = () => checkWPAnswer(opt, btn);
                optContainer.appendChild(btn);
            });
        }

        if (loader) loader.classList.add("hidden");
        if (card) card.classList.remove("hidden");
    }, 800);
}

function renderClickableWords(sentence) {
    if (!sentence) return "";
    return sentence.split(" ").map(word => {
        const clean = word.replace(/[.,!?;:()"]/g, "");
        if (clean.length < 2 || clean === "__________") return word;
        return `<span class="wp-clickable-word" onclick="handleWPWordClick(event, '${clean}')">${word}</span>`;
    }).join(" ");
}

function handleWPWordClick(e, word) {
    e.stopPropagation();
    // Use the global dictionary if available
    if (typeof searchDictionaryWord === "function") {
        switchTab('dictionary');
        setTimeout(() => searchDictionaryWord(word), 300);
    } else {
        alert(word + " için sözlük bulunamadı.");
    }
}

async function askMonsterTip() {
    const isVip = window.currentUser?.email === "onurtosuner@gmail.com" || localStorage.getItem("analyzer_access") === "true";
    const tipContainer = document.getElementById("wp-tip-container");
    const tipBtn = document.getElementById("wp-tip-btn");

    if (!isVip) {
        alert("Monster Tip (AI Rehberi) sadece Premium üyeler içindir. Lütfen profilinizden VIP kodunuzu aktifleştirin.");
        switchTab('profile');
        return;
    }

    if (!currentWPQuestion) return;

    tipBtn.disabled = true;
    tipBtn.innerHTML = `<i class="fas fa-circle-notch animate-spin"></i> Zihin Okunuyor...`;

    try {
        const prompt = `YDS/YDT Kelime Sorusu İpucu:
        Cümle: ${currentWPQuestion.template}
        Boşluğa gelecek kelime türü: ${currentWPQuestion.pos}
        Soru türü: Vocab Practice
        
        Kullanıcıya bu kelimeyi bulması için teknik bir YDS ipucu ver (kelimenin kendisini söyleme). Sadece 1-2 cümlelik profesyonel bir tüyo olsun.`;

        const res = await fetch("/.netlify/functions/analyze", {
            method: "POST",
            body: JSON.stringify({ input: prompt })
        });
        const data = await res.json();
        
        const tipText = data.yds_trap_engine?.exam_tip || data.question_analysis?.logical_structure || "Cümledeki ipuçlarını ve kelime türünü dikkatle analiz et.";

        tipContainer.innerText = tipText;
        tipContainer.classList.remove("hidden");
        
        tipBtn.innerHTML = `<i class="fas fa-robot"></i> Tip Verildi`;
    } catch (e) {
        tipContainer.innerText = "Şu an AI rehberine ulaşılamıyor. Cümledeki ipuçlarına odaklan!";
        tipContainer.classList.remove("hidden");
        tipBtn.innerHTML = `<i class="fas fa-robot"></i> Monster Tip`;
    } finally {
        tipBtn.disabled = false;
    }
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
            b.classList.add("border-emerald-500", "bg-emerald-50", "text-emerald-900", "ring-2", "ring-emerald-500/20");
            b.querySelector("div").classList.add("bg-emerald-500", "text-white");
            b.querySelector("i").className = "fas fa-check";
        }
    });

    const feedback = document.getElementById("wp-feedback");
    const fIcon = document.getElementById("wp-feedback-icon");
    const fTitle = document.getElementById("wp-feedback-title");
    const fText = document.getElementById("wp-feedback-text");

    if (!feedback) return;

    feedback.classList.remove("hidden");

    if (isCorrect) {
        wpStreak++;
        wpXP += 10;
        fIcon.className = "w-20 h-20 rounded-[2rem] flex items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-2xl shadow-emerald-200 animate-bounce";
        fIcon.innerHTML = `<i class="fas fa-check"></i>`;
        fTitle.innerText = "Efsanevi Doğruluk!";
        fTitle.className = "font-black text-3xl text-emerald-900 tracking-tighter italic";
        feedback.className = "p-10 rounded-[2.5rem] border border-emerald-100 bg-emerald-50/40 animate-in zoom-in-95 duration-700";
    } else {
        wpStreak = 0;
        btn.classList.add("border-rose-500", "bg-rose-50", "text-rose-900", "ring-2", "ring-rose-500/20");
        btn.querySelector("div").classList.add("bg-rose-500", "text-white");
        btn.querySelector("i").className = "fas fa-times";
        
        fIcon.className = "w-20 h-20 rounded-[2rem] flex items-center justify-center bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-2xl shadow-rose-200 wp-shake";
        fIcon.innerHTML = `<i class="fas fa-times"></i>`;
        fTitle.innerText = "Yine De Gelişiyorsun!";
        fTitle.className = "font-black text-3xl text-rose-900 tracking-tighter italic";
        feedback.className = "p-10 rounded-[2.5rem] border border-rose-100 bg-rose-50/40 animate-in fade-in slide-in-from-top-4";
    }

    if (!currentWPQuestion.meaning) {
        fetch(`/.netlify/functions/nlpAnalyze`, {
            method: "POST",
            body: JSON.stringify({ text: currentWPQuestion.correct })
        })
            .then(res => res.json())
            .then(data => {
                if (data.translation) {
                    currentWPQuestion.meaning = data.translation;
                    const meaningEl = document.querySelector("#wp-feedback-text p");
                    if (meaningEl) meaningEl.innerText = data.translation;
                }
            })
            .catch(() => { });
    }

    fText.innerHTML = `
        <div class="flex flex-col gap-2">
            <span class="font-black text-slate-900 text-2xl">${currentWPQuestion.correct}</span>
            <span class="text-slate-500 uppercase tracking-widest text-[10px] font-bold">${currentWPQuestion.pos}</span>
            <p class="text-slate-700 font-medium bg-white/50 p-4 rounded-xl border border-slate-100 mt-2">${currentWPQuestion.meaning || "Çeviri hazırlanıyor..."}</p>
        </div>
    `;

    updateWPStats();

    // FIREBASE STATS
    if (typeof window.saveWPResultFirestore === "function") {
        window.saveWPResultFirestore(currentWPQuestion.correct, isCorrect).then(() => {
            if (typeof window.updateGamification === "function") {
                window.updateGamification();
            }
        }).catch(console.error);
    }
}

function updateWPStats() {
    const streakEl = document.getElementById("wp-streak");
    const xpEl = document.getElementById("wp-xp");
    const barEl = document.getElementById("wp-progress-bar");
    const percentEl = document.getElementById("wp-progress-percent");

    if (streakEl) streakEl.innerText = wpStreak;
    if (xpEl) xpEl.innerText = wpXP;
    
    // Progress logic
    wpSessionsTotal++;
    const progress = Math.min(100, (wpSessionsTotal % 10) * 10);
    if (barEl) barEl.style.width = progress + "%";
    if (percentEl) percentEl.innerText = (progress || 0) + "%";
}

function nextWPQuestion() {
    generateWPQuestion();
}

window.initWordPractice = initWordPractice;
window.nextWPQuestion = nextWPQuestion;
window.askMonsterTip = askMonsterTip;
window.handleWPWordClick = handleWPWordClick;
