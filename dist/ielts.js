/* =====================================================
   IELTS MODULES & DATA ENGINE (ZEN EDITION)
   ===================================================== */

let currentIELTSExam = null;
let zenModeActive = false;

// Global placeholders for main.js mapping
const ieltsOverviewHTML = "Loading...";
const ieltsReadingHTML = "Loading...";
const ieltsListeningHTML = "Loading...";
const ieltsWritingHTML = "Loading...";
const ieltsSpeakingHTML = "Loading...";
const ieltsExamsHTML = "Loading...";

// Initialize specific exam data
async function initIELTS(examId = 'exam1') {
    // Only fetch if it's a different exam or not loaded yet
    if (!currentIELTSExam || currentIELTSExam._id !== examId) {
        try {
            const response = await fetch(`/data/ielts/${examId}.json`);
            currentIELTSExam = await response.json();
            currentIELTSExam._id = examId; // Tag for caching
            console.log(`IELTS Exam ${examId} Loaded:`, currentIELTSExam);
        } catch (error) {
            console.error(`Error loading IELTS exam ${examId}:`, error);
        }
    }
}

// Global toggle for Zen Mode
window.toggleZenMode = function(force) {
    zenModeActive = typeof force === 'boolean' ? force : !zenModeActive;
    if (zenModeActive) {
        document.body.classList.add('zen-mode');
    } else {
        document.body.classList.remove('zen-mode');
    }
    // Re-render current module to include/exclude zen controls
    const activeTab = document.querySelector('.tab-content.active');
    if(activeTab && activeTab.id.startsWith('tab-ielts-')) {
        renderIELTSModule(activeTab.id.replace('tab-', ''));
    }
}

window.goToIELTS = async function(subTab) {
    await initIELTS();
    if (typeof switchTab === 'function') {
        switchTab(subTab);
        renderIELTSModule(subTab);
    }
}

async function renderIELTSModule(tabName) {
    if (!currentIELTSExam) {
        await initIELTS();
    }
    if (!currentIELTSExam) return;

    const containerId = 'tab-' + tabName;
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    
    // Header for Zen Mode (Focused View)
    if (zenModeActive) {
        html += `
        <div class="fixed top-0 left-0 w-full bg-slate-900 text-white px-8 py-4 flex justify-between items-center z-[10000] border-b border-white/10 no-print">
            <div class="flex items-center gap-4">
                <span class="text-xs font-black uppercase tracking-[0.3em] text-indigo-400">IELTS ZEN MODE</span>
                <span class="h-4 w-px bg-white/20"></span>
                <span class="text-sm font-bold opacity-80">${tabName.replace('ielts-', '').toUpperCase()}</span>
            </div>
            <button onclick="toggleZenMode(false)" class="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
                <i class="fas fa-times"></i> Modu Kapat
            </button>
        </div>
        <div class="h-20 no-print"></div> <!-- Spacer -->
        `;
    }

    switch(tabName) {
        case 'ielts-overview': html += getIELTSOverviewHTML(); break;
        case 'ielts-reading': html += zenModeActive ? getIELTSReadingExamHTML() : getIELTSReadingStrategyHTML(); break;
        case 'ielts-listening': html += zenModeActive ? getIELTSListeningExamHTML() : getIELTSListeningStrategyHTML(); break;
        case 'ielts-writing': html += zenModeActive ? getIELTSWritingExamHTML() : getIELTSWritingStrategyHTML(); break;
        case 'ielts-speaking': html += zenModeActive ? getIELTSSpeakingExamHTML() : getIELTSSpeakingStrategyHTML(); break;
        case 'ielts-exams': html += getIELTSExamsListHTML(); break;
    }

    container.innerHTML = html;
    
    if(zenModeActive) {
        container.classList.add('exam-full-page');
    } else {
        container.classList.remove('exam-full-page');
    }
}

// ── STRATEGY & EXPLANATION CONTENT ─────────────────────────────

function getIELTSOverviewHTML() {
    return `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="text-center mb-16">
        <div class="inline-flex items-center gap-3 bg-indigo-50 text-indigo-700 px-5 py-2 rounded-full text-sm font-bold mb-4 border border-indigo-100 uppercase tracking-widest">
            <i class="fas fa-info-circle"></i> IELTS Guide
        </div>
        <h1 class="text-4xl md:text-6xl font-black text-slate-900 mb-6" style="font-family: 'Playfair Display', serif;">
            IELTS <span class="text-indigo-600">Rehberi</span>
        </h1>
        <p class="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed italic">
            Dünyanın en popüler İngilizce yeterlilik sınavı hakkında bilmeniz gereken her şey.
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
            <h3 class="text-2xl font-bold mb-4 text-slate-800">Sınav Formatı</h3>
            <ul class="space-y-4">
                <li class="flex items-start gap-3">
                    <i class="fas fa-check-circle text-indigo-500 mt-1"></i>
                    <p class="text-slate-600 font-medium"><strong>Reading:</strong> 60 dakika, 3 parça, 40 soru.</p>
                </li>
                <li class="flex items-start gap-3">
                    <i class="fas fa-check-circle text-indigo-500 mt-1"></i>
                    <p class="text-slate-600 font-medium"><strong>Listening:</strong> 30 dakika, 4 bölüm, 40 soru.</p>
                </li>
                <li class="flex items-start gap-3">
                    <i class="fas fa-check-circle text-indigo-500 mt-1"></i>
                    <p class="text-slate-600 font-medium"><strong>Writing:</strong> 60 dakika, 2 görev (Task 1 & Task 2).</p>
                </li>
                <li class="flex items-start gap-3">
                    <i class="fas fa-check-circle text-indigo-500 mt-1"></i>
                    <p class="text-slate-600 font-medium"><strong>Speaking:</strong> 11-14 dakika, 3 bölüm (Yüz yüze).</p>
                </li>
            </ul>
        </div>
        <div class="bg-indigo-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
             <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
             <h3 class="text-2xl font-bold mb-4">Skor Hesaplama</h3>
             <p class="text-indigo-100 mb-6 leading-relaxed">IELTS sonuçları 0 ile 9 arasında değişen bir bant skor sistemi (Band Score) ile değerlendirilir. Çoğu üniversite 6.5 veya 7.0 skorunu bekler.</p>
             <div class="grid grid-cols-2 gap-4">
                <div class="bg-white/10 p-4 rounded-2xl text-center">
                    <div class="text-3xl font-black">9.0</div>
                    <div class="text-[10px] uppercase font-bold opacity-60">Expert User</div>
                </div>
                <div class="bg-white/10 p-4 rounded-2xl text-center">
                    <div class="text-3xl font-black">7.0</div>
                    <div class="text-[10px] uppercase font-bold opacity-60">Good User</div>
                </div>
             </div>
        </div>
    </div>
</div>
`;
}

function getIELTSReadingStrategyHTML() {
    return `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="mb-12">
        <h1 class="text-4xl font-black text-slate-900 mb-4" style="font-family: 'Playfair Display', serif;">Reading Taktikleri</h1>
        <p class="text-indigo-600 font-bold">60 Dakika | Zaman Yönetimi Hayat Kurtarır</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div class="lg:col-span-2 space-y-8">
            <div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg">
                <h3 class="text-xl font-bold mb-6 flex items-center gap-3 text-indigo-700">
                    <i class="fas fa-search"></i> 1. Skimming & Scanning
                </h3>
                <p class="text-slate-600 leading-relaxed mb-4">Tüm metni okumaya çalışmak en büyük hatadır. Önce soruları okuyun, ardından metne hızlıca göz atarak (skimming) ana fikri anlayın ve spesifik bilgileri tarayın (scanning).</p>
                <div class="bg-indigo-50 p-4 rounded-xl border-l-4 border-indigo-500 italic text-sm text-indigo-900">
                    "Anahtar kelimelerin (isimler, tarihler, sayılar) altını çizmeyı ancak metni okurken durmamayı öğrenin."
                </div>
            </div>

            <div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg">
                <h3 class="text-xl font-bold mb-6 flex items-center gap-3 text-red-700">
                    <i class="fas fa-exclamation-triangle"></i> 2. Paraphrasing (Eş Anlamlılar)
                </h3>
                <p class="text-slate-600 leading-relaxed mb-4">Soru kökünde geçen kelimeler metinde nadiren aynı şekilde geçer. Metinde bu kelimelerin eş anlamlılarını veya benzer yapılarını bulmaya odaklanın.</p>
                <div class="p-4 bg-slate-50 rounded-xl flex items-center gap-6">
                    <div class="text-xs font-bold uppercase text-slate-400">Örnek:</div>
                    <div class="flex-1 flex justify-around text-sm font-medium">
                        <span class="text-red-600">Soru: Significant rise</span>
                        <i class="fas fa-arrow-right text-slate-300"></i>
                        <span class="text-green-600">Metin: Substantial increase</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="space-y-6">
            <div class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl">
                <h4 class="font-bold mb-4 uppercase text-xs tracking-widest text-indigo-400">Soru Türleri</h4>
                <ul class="text-sm space-y-3 opacity-80">
                    <li>• True / False / Not Given</li>
                    <li>• Matching Headings</li>
                    <li>• Multiple Choice</li>
                    <li>• Summary Completion</li>
                    <li>• Sentence Completion</li>
                </ul>
            </div>
            <button onclick="switchTab('ielts-exams')" class="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-bold shadow-2xl hover:bg-indigo-700 transition-all">
                Deneme Sınavına Git <i class="fas fa-arrow-right ml-2"></i>
            </button>
        </div>
    </div>
</div>
`;
}

function getIELTSListeningStrategyHTML() {
    return `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="mb-12 text-center">
        <h1 class="text-4xl font-black text-slate-900 mb-4" style="font-family: 'Playfair Display', serif;">Listening Taktikleri</h1>
        <p class="text-purple-600 font-bold tracking-widest uppercase text-xs">Aktif Dinleme ve Dikkat Yönetimi</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
            <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 text-xl">
                <i class="fas fa-clock"></i>
            </div>
            <h3 class="text-xl font-bold mb-4">Ön Okuma (Prediction)</h3>
            <p class="text-slate-600 text-sm leading-relaxed">Ses kaydı başlamadan önceki 30 saniyeyi soruları okumak ve boşluğa gelecek kelimenin türünü (isim, sayı, sıfat vb.) tahmin etmek için kullanın.</p>
        </div>

        <div class="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
            <div class="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-6 text-xl">
                <i class="fas fa-filter"></i>
            </div>
            <h3 class="text-xl font-bold mb-4">Distractors (Dikkat Dağıtıcılar)</h3>
            <p class="text-slate-600 text-sm leading-relaxed">Konuşmacı genelde bir bilgi verir ve hemen ardından "but" veya "actually" diyerek bunu düzeltir. İlk duyduğunuz cevaba hemen atlamayın.</p>
        </div>
    </div>
</div>
`;
}

function getIELTSWritingStrategyHTML() {
    return `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="mb-12">
        <h1 class="text-4xl font-black text-slate-900 mb-4" style="font-family: 'Playfair Display', serif;">Writing Yapısı</h1>
        <p class="text-orange-600 font-bold uppercase tracking-widest text-xs">Task 1 (Rapor) & Task 2 (Essay)</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div class="bg-white border-2 border-slate-50 p-8 rounded-[2.5rem] shadow-sm">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-slate-800">Task 1: Academic</h3>
                <span class="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-bold">20 Min</span>
            </div>
            <p class="text-sm text-slate-500 mb-8 leading-relaxed">Grafik, tablo veya süreç diyagramlarını analiz etmeniz istenir. En önemli kural: Kendi yorumunuzu katmayın, sadece veriyi aktarın.</p>
            <div class="space-y-3">
                 <div class="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                    <div class="w-8 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-xs font-bold italic">Int</div>
                    <span class="text-xs font-medium text-slate-700">Giriş & Overview (Özet)</span>
                 </div>
                 <div class="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                    <div class="w-8 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-xs font-bold italic">Det</div>
                    <span class="text-xs font-medium text-slate-700">Detaylı Veri Analizi</span>
                 </div>
            </div>
        </div>

        <div class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <h3 class="text-xl font-bold mb-6">Task 2: Essay</h3>
            <p class="text-slate-400 text-sm mb-8 leading-relaxed">Bir argüman veya problem üzerine 250 kelimelik akademik essay yazmanız beklenir. Puanın %60'ı buradan gelir.</p>
            <ul class="text-xs space-y-4">
                <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> Clear progression</li>
                <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> Lexical resource (Variety)</li>
                <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> Cohesion & Coherence</li>
            </ul>
        </div>
    </div>
</div>
`;
}

function getIELTSSpeakingStrategyHTML() {
    return `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="mb-12">
        <h1 class="text-4xl font-black text-slate-900 mb-4" style="font-family: 'Playfair Display', serif;">Speaking Simülasyonu</h1>
    </div>

    <div class="bg-green-50/50 p-10 rounded-[3rem] border border-green-100 mb-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
                <h4 class="font-bold text-green-800 mb-2">Part 1</h4>
                <p class="text-slate-500 text-xs leading-relaxed italic">Isınma turu. Ev, iş, hobiler hakkında kısa ve doğal yanıtlar.</p>
            </div>
            <div>
                <h4 class="font-bold text-green-800 mb-2">Part 2</h4>
                <p class="text-slate-500 text-xs leading-relaxed italic">Cue Card. Size verilen konu üzerine 2 dakika kesintisiz konuşma.</p>
            </div>
            <div>
                <h4 class="font-bold text-green-800 mb-2">Part 3</h4>
                <p class="text-slate-500 text-xs leading-relaxed italic">Derin tartışma. Part 2'deki konunun daha soyut ve genel boyutları.</p>
            </div>
        </div>
    </div>
</div>
`;
}

// ── EXAM LIST & ENGINE ──────────────────────────────────────────

function getIELTSExamsListHTML() {
    return `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="text-center mb-16">
        <h1 class="text-4xl font-black text-slate-900 mb-4" style="font-family: 'Playfair Display', serif;">IELTS Deneme Sınavları</h1>
        <p class="text-slate-500 italic">Gerçek sınav formatında, süre kısıtlı interaktif denemeler.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Exam Card 1 -->
        <div class="bg-white border border-slate-100 shadow-xl rounded-[2.5rem] p-8 hover:scale-[1.02] transition-all group overflow-hidden relative">
            <div class="absolute -right-10 -top-10 w-40 h-40 bg-indigo-50 rounded-full group-hover:scale-150 transition-transform"></div>
            <div class="relative z-10">
                <div class="flex justify-between items-start mb-6">
                    <span class="bg-indigo-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">Full Mock Test 01</span>
                    <span class="text-xs font-bold text-slate-300">#E101</span>
                </div>
                <h3 class="text-xl font-bold text-slate-800 mb-4">IELTS Academic Practice</h3>
                <div class="space-y-3 mb-8">
                    <div class="flex items-center gap-2 text-xs text-slate-500"><i class="fas fa-clock w-4"></i> 2 Saat 45 Dakika</div>
                    <div class="flex items-center gap-2 text-xs text-slate-500"><i class="fas fa-list w-4"></i> 4 Modül Tamamla</div>
                </div>
                <button onclick="startIELTSFullExam('exam1')" class="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2">
                    <i class="fas fa-play text-[10px]"></i> Sınavı Başlat
                </button>
            </div>
        </div>

        <!-- Exam Card 2 (NEW) -->
        <div class="bg-white border border-slate-100 shadow-xl rounded-[2.5rem] p-8 hover:scale-[1.02] transition-all group overflow-hidden relative">
            <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-50 rounded-full group-hover:scale-150 transition-transform"></div>
            <div class="relative z-10">
                <div class="flex justify-between items-start mb-6">
                    <span class="bg-purple-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">Full Mock Test 02</span>
                    <span class="text-xs font-bold text-slate-300">#E102</span>
                </div>
                <h3 class="text-xl font-bold text-slate-800 mb-4">IELTS De-extinction Focus</h3>
                <div class="space-y-3 mb-8">
                    <div class="flex items-center gap-2 text-xs text-slate-500"><i class="fas fa-microscope w-4"></i> Bilim ve Etik Odaklı</div>
                    <div class="flex items-center gap-2 text-xs text-slate-500"><i class="fas fa-list w-4"></i> 4 Modül Tamamla</div>
                </div>
                <button onclick="startIELTSFullExam('exam2')" class="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2">
                    <i class="fas fa-play text-[10px]"></i> Sınavı Başlat
                </button>
            </div>
        </div>
    </div>
</div>
`;
}

window.startIELTSFullExam = async function(examId) {
    await initIELTS(examId); 
    toggleZenMode(true);
    switchTab('ielts-reading'); 
    renderIELTSModule('ielts-reading');
}

// ── EXAM MODULE RENDERING (ZEN ONLY) ───────────────────────────

function getIELTSReadingExamHTML() {
    let html = `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="space-y-16">`;
    currentIELTSExam.modules.reading.forEach(passage => {
        html += `
        <div class="bg-white border border-slate-100 shadow-xl rounded-[2.5rem] overflow-hidden">
            <div class="bg-indigo-600 p-8 text-white flex justify-between items-center">
                <div>
                    <h3 class="text-2xl font-bold">${passage.title}</h3>
                    <p class="text-indigo-100 text-sm mt-2 italic">Reading Passage ${passage.passageId}</p>
                </div>
            </div>
            <div class="p-8 md:p-12">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div class="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm">
                        ${passage.content.split('\n\n').map(p => `<p class="mb-4">${p}</p>`).join('')}
                    </div>
                    <div class="space-y-8">
                        <h4 class="text-lg font-bold text-slate-900 border-b pb-4">Questions</h4>
                        ${passage.questions.map(q => `
                            <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <p class="font-bold text-slate-800 mb-4">${q.id}. ${q.question}</p>
                                <div class="grid gap-2">
                                    ${q.options.map(opt => `
                                        <button class="w-full text-left p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-500 transition-all text-xs font-medium"
                                            onclick="checkIELTSAnswer(this, '${q.answer.replace(/'/g, "\\'")}', '${q.explanation.replace(/'/g, "\\'")}')">
                                            ${opt}
                                        </button>
                                    `).join('')}
                                </div>
                                <div class="feedback hidden mt-4 p-4 rounded-xl text-xs"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    html += `
    <div class="flex justify-center mt-12 pb-20">
        <button onclick="goToIELTS('ielts-listening')" class="bg-slate-900 text-white px-10 py-5 rounded-3xl font-black shadow-2xl hover:bg-black transition-all flex items-center gap-3">
            Sonraki Modül: Listening <i class="fas fa-headphones"></i>
        </button>
    </div>
    </div></div>`;
    return html;
}

function getIELTSListeningExamHTML() {
    let html = `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="space-y-12">`;
    currentIELTSExam.modules.listening.forEach(section => {
        html += `
        <div class="bg-white border border-slate-100 shadow-xl rounded-[2.5rem] p-8">
            <div class="flex flex-col md:flex-row gap-10">
                <div class="w-full md:w-1/3">
                    <div class="bg-indigo-900 rounded-3xl p-6 text-white mb-6">
                        <h3 class="text-xl font-bold mb-2">Section ${section.section}</h3>
                        <div class="flex flex-col items-center gap-4 py-8">
                            <button onclick="playCloudTTS(this)" data-text="${section.transcript.replace(/"/g, '&quot;')}" 
                                class="w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group">
                                <i class="fas fa-play text-3xl group-hover:scale-125 transition-transform"></i>
                            </button>
                            <span class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Sesi Başlat</span>
                        </div>
                    </div>
                </div>
                <div class="flex-1 space-y-6">
                    ${section.questions.map(q => `
                        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <p class="font-bold text-slate-800 mb-4">${q.id}. ${q.question}</p>
                            <input type="text" class="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                placeholder="Cevabınızı yazın..." onkeydown="if(event.key === 'Enter') checkIELTSInputAnswer(this, '${q.answer}', '${q.explanation.replace(/'/g, "\\'")}')">
                            <div class="feedback hidden mt-4 p-4 rounded-xl text-xs"></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        `;
    });
    html += `
    <div class="flex justify-center mt-12 pb-20">
        <button onclick="goToIELTS('ielts-writing')" class="bg-slate-900 text-white px-10 py-5 rounded-3xl font-black shadow-2xl hover:bg-black transition-all flex items-center gap-3">
            Sonraki Modül: Writing <i class="fas fa-pen"></i>
        </button>
    </div>
    </div></div>`;
    return html;
}

function getIELTSWritingExamHTML() {
    const { writing } = currentIELTSExam.modules;
    return `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div class="bg-white border border-slate-100 shadow-xl rounded-[2.5rem] p-8">
            <h3 class="text-xl font-bold text-slate-900 mb-6 italic">${writing.task1.prompt}</h3>
            <textarea class="w-full h-64 p-6 bg-slate-50 rounded-3xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm" placeholder="Buraya yazın..."></textarea>
            <button onclick="this.nextElementSibling.classList.toggle('hidden')" class="w-full mt-4 py-4 bg-slate-900 text-white rounded-2xl font-bold">Model Cevabı Gör</button>
            <div class="hidden mt-6 p-8 bg-indigo-50 rounded-[2rem] text-sm leading-relaxed">${writing.task1.model_answer}</div>
        </div>
        <div class="bg-white border border-slate-100 shadow-xl rounded-[2.5rem] p-8">
            <h3 class="text-xl font-bold text-slate-900 mb-6 italic">${writing.task2.prompt}</h3>
            <textarea class="w-full h-64 p-6 bg-slate-50 rounded-3xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="Buraya yazın..."></textarea>
            <button onclick="this.nextElementSibling.classList.toggle('hidden')" class="w-full mt-4 py-4 bg-slate-900 text-white rounded-2xl font-bold">Model Cevabı Gör</button>
            <div class="hidden mt-6 p-8 bg-indigo-50 rounded-[2rem] text-sm leading-relaxed">${writing.task2.model_answer}</div>
        </div>
    </div>
    <div class="flex justify-center mt-12 pb-20">
        <button onclick="goToIELTS('ielts-speaking')" class="bg-slate-900 text-white px-10 py-5 rounded-3xl font-black shadow-2xl hover:bg-black transition-all flex items-center gap-3">
            Sonraki Modül: Speaking <i class="fas fa-comments"></i>
        </button>
    </div>
</div>
`;
}

function getIELTSSpeakingExamHTML() {
    const { speaking } = currentIELTSExam.modules;
    return `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="space-y-12">
        <div class="bg-white border border-slate-100 shadow-xl rounded-[3rem] p-10">
            <h3 class="font-bold text-lg mb-4">Part 1: Question Pool</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${speaking.part1.map(q => `
                    <div class="bg-slate-50 p-6 rounded-3xl flex items-center gap-4">
                        <button onclick="playCloudTTS(this)" data-text="${q}" class="w-10 h-10 bg-white rounded-xl shadow text-indigo-600 truncate"><i class="fas fa-volume-up"></i></button>
                        <p class="text-sm font-medium">${q}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="text-center pb-20">
            <button onclick="toggleZenMode(false); switchTab('ielts-exams')" class="bg-green-600 text-white px-10 py-5 rounded-3xl font-black shadow-2xl hover:bg-green-700 transition-all">
                Sınavı Bitir ve Sonuçları Gör
            </button>
        </div>
    </div>
</div>
`;
}

// ── UTILITIES (Answer Checking, TTS) ───────────────────────────

window.checkIELTSAnswer = function(btn, correctAns, explanation) {
    const parent = btn.parentElement;
    const allBtns = parent.querySelectorAll('button');
    const feedback = parent.nextElementSibling;
    allBtns.forEach(b => {
        b.disabled = true;
        if (b.innerText.trim() === correctAns || (b.innerText.trim().startsWith(correctAns))) {
            b.classList.add('bg-green-500', 'text-white', 'border-green-500');
        } else if (b === btn) {
            b.classList.add('bg-red-500', 'text-white', 'border-red-500');
        }
    });
    feedback.classList.remove('hidden');
    feedback.innerHTML = `<strong>Açıklama:</strong> ${explanation}`;
    feedback.className = "mt-4 p-4 rounded-xl text-xs bg-indigo-50 text-indigo-900 border border-indigo-100";
}

window.checkIELTSInputAnswer = function(input, correctAns, explanation) {
    const val = input.value.trim().toLowerCase();
    const result = correctAns.toLowerCase();
    const feedback = input.nextElementSibling;
    input.disabled = true;
    if (val === result) {
        input.classList.add('bg-green-500', 'text-white', 'border-green-500');
    } else {
        input.classList.add('bg-red-500', 'text-white', 'border-red-500');
        input.value = `${val} (Doğru: ${correctAns})`;
    }
    feedback.classList.remove('hidden');
    feedback.innerHTML = `<strong>Açıklama:</strong> ${explanation}`;
    feedback.className = "mt-4 p-4 rounded-xl text-xs bg-indigo-50 text-indigo-900 border border-indigo-100";
}

window.playCloudTTS = async function(btn) {
    const fullText = btn.getAttribute('data-text');
    const originalIcon = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    // Advanced dialog parsing (works with or without newlines)
    let segments = [];
    const speakerRegex = /([A-Z][a-z0-9\s]{1,20}):\s/g; // Matches "Name: "
    let match;
    let lastIndex = 0;

    while ((match = speakerRegex.exec(fullText)) !== null) {
        if (segments.length > 0) {
            segments[segments.length - 1].text = fullText.substring(lastIndex, match.index).trim();
        } else if (match.index > 0) {
            // Introductory text or SFX before first speaker
            segments.push({ speaker: "narrator", text: fullText.substring(0, match.index).trim() });
        }
        segments.push({ speaker: match[1].trim().toLowerCase(), text: "" });
        lastIndex = match.index + match[0].length;
    }

    if (segments.length > 0) {
        segments[segments.length - 1].text = fullText.substring(lastIndex).trim();
    } else {
        // No speaker tags found, treat as one narrator block
        segments.push({ speaker: "narrator", text: fullText });
    }

    try {
        for (const seg of segments) {
            if (!seg.text) continue;

            let voiceName = "en-GB-Standard-B"; // Default: Male
            const spk = seg.speaker;

            // Voice mapping
            if (spk.includes('woman') || spk.includes('girl') || spk.includes('female') || spk.includes('sarah') || spk.includes('receptionist') || spk.includes('emma')) {
                voiceName = "en-GB-Standard-A"; // Female
            } else if (spk.includes('narrator') || spk.includes('ranger') || spk.includes('announcer')) {
                voiceName = "en-GB-Standard-C"; // Alternative/Neutral
            }

            const response = await fetch('/.netlify/functions/speakPremium', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    text: seg.text,
                    voice: voiceName,
                    lang: "en-GB"
                })
            });

            const data = await response.json();

            if (data.audioContent) {
                const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
                await new Promise(res => {
                    audio.onended = res;
                    audio.onerror = res;
                    audio.play();
                });
            } else {
                throw new Error("Segment failed");
            }
        }
    } catch (e) {
        console.warn("Advanced TTS failed, falling back:", e);
        // Basic fallback
        const utterance = new SpeechSynthesisUtterance(fullText);
        utterance.lang = 'en-GB';
        window.speechSynthesis.speak(utterance);
    } finally {
        btn.innerHTML = originalIcon;
    }
}
