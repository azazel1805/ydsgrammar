
/* Strategy Lab Core Logic */

let strategyQuestions = [];
let currentCategory = '';
let currentQuestionIndex = 0;

async function loadCategory(category) {
    currentCategory = category;
    const path = `/exams/strategy/${category}.json`;
    
    showLoader();
    try {
        const response = await fetch(path);
        const data = await response.json();
        strategyQuestions = data.questions;
        currentQuestionIndex = 0;
        
        if (strategyQuestions.length === 0) {
            showEmptyCategory();
        } else {
            renderStrategyQuestion();
        }
    } catch (error) {
        console.error("Error loading strategy category:", error);
        alert("Üzgünüz, bu kategori şu an yüklenemedi.");
    } finally {
        hideLoader();
    }
}

function renderStrategyQuestion() {
    const container = document.getElementById('strategyContent');
    if (!strategyQuestions || strategyQuestions.length === 0) return;
    
    const q = strategyQuestions[currentQuestionIndex];
    
    // Clear previous state
    container.innerHTML = `
        <div class="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 bg-[#0a0a0c] p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/5">
            <!-- Navigation -->
            <div class="flex items-center justify-between text-slate-400 text-xs uppercase tracking-widest font-bold border-b border-white/5 pb-4">
                <button onclick="backToCategories()" class="hover:text-white transition-colors flex items-center gap-2">
                    <i class="fas fa-arrow-left"></i> Kategoriler
                </button>
                <span>Soru ${currentQuestionIndex + 1} / ${strategyQuestions.length}</span>
            </div>

            <!-- Question Card -->
            <div class="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <i class="fas fa-microchip text-4xl"></i>
                </div>
                
                <p class="text-xl md:text-2xl text-slate-100 leading-relaxed font-medium mb-10">
                    ${q.question}
                </p>

                <div id="optionsList" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${Object.entries(q.options).map(([key, value]) => `
                        <button onclick="checkStrategyAnswer('${key}')" 
                                class="option-btn text-left p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-4 group/btn relative overflow-hidden">
                            <span class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-bold text-slate-400 group-hover/btn:bg-red-600 group-hover/btn:text-white transition-colors">${key}</span>
                            <span class="text-slate-300 group-hover/btn:text-white transition-colors">${value}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center justify-center gap-4">
                <button onclick="previousStrategyQuestion()" class="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all">Geri</button>
                <button id="showAnalysisBtn" onclick="revealAnalysis()" class="px-10 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-800 text-white font-bold shadow-xl shadow-red-900/20 transform hover:scale-105 active:scale-95 transition-all">
                    <i class="fas fa-lightbulb mr-2"></i> Stratejik Analizi Gör
                </button>
                <button onclick="nextStrategyQuestion()" class="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all">İleri</button>
            </div>

            <!-- Analysis Panel (Hidden initially) -->
            <div id="analysisPanel" class="hidden animate-in zoom-in-95 fade-in duration-500 space-y-6">
                <div class="bg-gradient-to-br from-slate-900 to-black border border-red-500/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
                    
                    <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <span class="p-2 bg-red-600 rounded-lg text-sm"><i class="fas fa-robot"></i></span>
                        AI Strateji Analizi
                    </h3>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Left Side: Tactic & Logic -->
                        <div class="space-y-6">
                            <div class="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <h4 class="text-xs font-bold text-red-500 uppercase tracking-widest mb-3">🎯 İlk Bakılacak Yer (Clue)</h4>
                                <p class="text-slate-200 font-medium leading-relaxed" id="logicText">
                                    ${q.explanation?.logical_structure || "Soru kökündeki anahtar yapıyı belirleyin."}
                                </p>
                            </div>

                            <div class="space-y-4">
                                <h4 class="text-xs font-bold text-red-500 uppercase tracking-widest">🚀 Adım Adım Yol Haritası</h4>
                                <p class="text-slate-300 leading-relaxed text-lg" id="tacticText">
                                    ${q.explanation?.tactic || "Soru analiz ediliyor..."}
                                </p>
                            </div>
                        </div>

                        <!-- Right Side: Elimination & Tips -->
                        <div class="space-y-6">
                            <div class="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">🔍 Eleme Stratejisi</h4>
                                <p class="text-slate-200 text-sm leading-relaxed" id="eliminationText">
                                    ${q.explanation?.elimination || "Yanlış şıkları nasıl eleriz?"}
                                </p>
                            </div>

                            <div class="p-6 bg-red-900/10 rounded-2xl border border-red-900/20">
                                <h4 class="text-xs font-bold text-red-500 uppercase tracking-widest mb-3">⚠️ YDS Tuzağı / Sınav İpucu</h4>
                                <p class="text-slate-300 text-sm italic" id="trapText">
                                    ${q.explanation?.trap || "Dikkatli okuma gerektiren bir soru."}
                                </p>
                            </div>

                            <div class="p-4 border-t border-white/5 mt-4">
                                <h4 class="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Dilbilgisi Odağı</h4>
                                <p class="text-slate-400 text-xs mt-1 italic">${q.explanation?.grammar || "Academic Structure"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

async function revealAnalysis() {
    const q = strategyQuestions[currentQuestionIndex];
    const panel = document.getElementById('analysisPanel');
    const btn = document.getElementById('showAnalysisBtn');
    
    // If no pre-baked explanation, call AI
    if (!q.explanation || !q.explanation.tactic) {
        showLoader();
        btn.innerHTML = '<i class="fas fa-spinner animate-spin mr-2"></i> AI Analiz Ediyor...';
        btn.classList.add('opacity-50', 'pointer-events-none');

        try {
            const questionText = `${q.question}\n\nOptions:\nA) ${q.options.A}\nB) ${q.options.B}\nC) ${q.options.C}\nD) ${q.options.D}\nE) ${q.options.E}`;
            
            const response = await fetch("/.netlify/functions/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input: questionText })
            });

            const data = await response.json();
            
            if (data.question_analysis) {
                // Map AI response to Strategy Lab format
                q.explanation = {
                    tactic: data.question_analysis.why_correct || "Adım adım yol haritası hazırlanıyor...",
                    grammar: data.question_analysis.grammar_focus || "General Academic Grammar",
                    logical_structure: data.question_analysis.logical_structure || "Cümle yapısı ve anahtar sözcükler.",
                    elimination: data.yds_trap_engine.elimination_strategy || "Eleme stratejisi belirleniyor...",
                    trap: data.yds_trap_engine.exam_tip,
                    vocabulary: data.question_analysis.why_others_wrong ? [data.question_analysis.why_others_wrong[0]] : ["Academic"]
                };
                
                // Re-render only the analysis part to show data
                updateAnalysisUI(q);
            }
        } catch (error) {
            console.error("AI Analysis failed:", error);
            document.getElementById('tacticText').innerText = "AI analizi şu an yapılamadı. Lütfen daha sonra tekrar deneyin.";
        } finally {
            hideLoader();
            btn.innerHTML = '<i class="fas fa-lightbulb mr-2"></i> Stratejik Analiz Hazır';
        }
    }

    panel.classList.remove('hidden');
    btn.classList.add('opacity-50', 'pointer-events-none');
    
    // Scroll to analysis
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateAnalysisUI(q) {
    const tacticEl = document.getElementById('tacticText');
    const grammarEl = document.querySelector('#analysisPanel p.text-slate-200');
    const logicEl = document.getElementById('logicText');
    const eliminationEl = document.getElementById('eliminationText');
    const trapEl = document.getElementById('trapText');

    if (tacticEl) tacticEl.innerText = q.explanation.tactic;
    if (grammarEl) grammarEl.innerText = q.explanation.grammar;
    if (logicEl) logicEl.innerText = q.explanation.logical_structure || "Cümle geneline odaklanın.";
    if (eliminationEl) eliminationEl.innerText = q.explanation.elimination || "Uyumsuz şıkları eleyin.";
    if (trapEl) trapEl.innerText = q.explanation.trap || "Dikkatli okuma gerektiren bir soru.";
}

function checkStrategyAnswer(selected) {
    const q = strategyQuestions[currentQuestionIndex];
    const btns = document.querySelectorAll('.option-btn');
    
    btns.forEach(btn => {
        const key = btn.querySelector('span:first-child').innerText;
        if (key === q.correct) {
            btn.classList.add('bg-green-900/40', 'border-green-500/50');
            btn.querySelector('span:first-child').classList.add('bg-green-600', 'text-white');
            btn.querySelector('span:first-child').classList.remove('bg-white/5', 'text-slate-400');
        } else if (key === selected && selected !== q.correct) {
            btn.classList.add('bg-red-900/40', 'border-red-500/50');
            btn.querySelector('span:first-child').classList.add('bg-red-600', 'text-white');
            btn.querySelector('span:first-child').classList.remove('bg-white/5', 'text-slate-400');
        }
        btn.classList.add('pointer-events-none');
    });

    // Auto reveal analysis after answer
    setTimeout(revealAnalysis, 800);
}

function nextStrategyQuestion() {
    if (currentQuestionIndex < strategyQuestions.length - 1) {
        currentQuestionIndex++;
        renderStrategyQuestion();
    }
}

function previousStrategyQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderStrategyQuestion();
    }
}

function backToCategories() {
    renderStrategyCategories();
}

function renderStrategyCategories() {
    const container = document.getElementById('strategyContent');
    const categories = [
        { id: 'vocabulary', title: 'Kelime (Vocabulary)', icon: 'fa-book', desc: 'Akademik kelime ve eş anlamlılar.' },
        { id: 'grammar', title: 'Dilbilgisi (Grammar)', icon: 'fa-vial', desc: 'Tense, Modals ve Clause yapıları.' },
        { id: 'cloze_test', title: 'Cloze Test', icon: 'fa-fill-drip', desc: 'Metin akışı içinde doğruluk.' },
        { id: 'sentence_completion', title: 'Cümle Tamamlama', icon: 'fa-puzzle-piece', desc: 'Mantıksal bağlam ve yapı.' },
        { id: 'translation', title: 'Çeviri (Translation)', icon: 'fa-language', desc: 'İngilizce-Türkçe aktarım.' },
        { id: 'reading', title: 'Okuma (Reading)', icon: 'fa-glasses', desc: 'Derin anlama ve çıkarım.' },
        { id: 'dialogue', title: 'Diyalog (Dialogue)', icon: 'fa-comments', desc: 'Durumsal diyalog tamamlama.' },
        { id: 'restatement', title: 'Restatement', icon: 'fa-sync', desc: 'Anlamca en yakın cümle.' },
        { id: 'paragraph_completion', title: 'Paragraf Tamamlama', icon: 'fa-paragraph', desc: 'Metin bütünlüğü ve uyum.' },
        { id: 'irrelevant_sentence', title: 'Anlamı Bozan Cümle', icon: 'fa-unlink', desc: 'Akışı bozan yabancı cümle.' }
    ];

    container.innerHTML = `
        <div class="animate-in fade-in duration-700 bg-[#0a0a0c] p-8 md:p-16 rounded-[3rem] shadow-2xl border border-white/5 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-30"></div>
            
            <div class="text-center space-y-4 mb-16 relative z-10">
                <h2 class="text-4xl md:text-5xl font-black text-white" style="font-family: 'Playfair Display', serif;">Strategy Lab</h2>
                <p class="text-slate-400 text-lg max-w-2xl mx-auto italic">
                    Sadece soru çözmeyin; sorunun arkasındaki mantığı ve YDS taktiklerini uzman AI analizi ile öğrenin.
                </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                ${categories.map(c => `
                    <div onclick="loadCategory('${c.id}')" 
                         class="group relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden shadow-2xl">
                        <div class="absolute -top-10 -right-10 w-32 h-32 bg-red-600/10 blur-[50px] group-hover:bg-red-600/20 transition-all"></div>
                        <div class="w-16 h-16 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-red-900/20 transform group-hover:rotate-12 transition-transform">
                            <i class="fas ${c.icon} text-2xl text-white"></i>
                        </div>
                        <h3 class="text-lg font-bold text-white group-hover:text-red-500 transition-colors">${c.title}</h3>
                        <p class="text-slate-400 text-sm mt-2 leading-relaxed">${c.desc}</p>
                        <div class="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-800">
                            <span>Laboratuvara Gir</span>
                            <i class="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function showEmptyCategory() {
    const container = document.getElementById('strategyContent');
    container.innerHTML = `
        <div class="text-center py-20 animate-in fade-in zoom-in duration-500">
            <div class="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                <i class="fas fa-hourglass-half text-4xl text-slate-600 animate-pulse"></i>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Hazırlanıyor...</h3>
            <p class="text-slate-500 max-w-md mx-auto mb-8">Bu kategori için taktikler ve VIP soru havuzu şu an AI tarafından analiz ediliyor. Çok yakında burada olacak!</p>
            <button onclick="backToCategories()" class="px-8 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">Kategorilere Dön</button>
        </div>
    `;
}

function showLoader() {
    const loader = document.getElementById('strategyLoader');
    if (loader) loader.classList.remove('hidden');
}

function hideLoader() {
    const loader = document.getElementById('strategyLoader');
    if (loader) loader.classList.add('hidden');
}

// Initial Call
window.initStrategyLab = function() {
    renderStrategyCategories();
};
