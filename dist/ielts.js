/* =====================================================
   IELTS MODULES & DATA ENGINE
   ===================================================== */

let currentIELTSExam = null;

// Global placeholders for main.js mapping
const ieltsOverviewHTML = "Loading...";
const ieltsReadingHTML = "Loading...";
const ieltsListeningHTML = "Loading...";
const ieltsWritingHTML = "Loading...";
const ieltsSpeakingHTML = "Loading...";

// Initialize on first load
async function initIELTS() {
    if (!currentIELTSExam) {
        try {
            const response = await fetch('/data/ielts/exam1.json');
            currentIELTSExam = await response.json();
            console.log("IELTS Exam Data Loaded:", currentIELTSExam);
        } catch (error) {
            console.error("Error loading IELTS data:", error);
        }
    }
}

// Wrap switchTab to ensure data is loaded
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

    switch(tabName) {
        case 'ielts-overview':
            container.innerHTML = getIELTSOverviewHTML();
            break;
        case 'ielts-reading':
            container.innerHTML = getIELTSReadingHTML();
            break;
        case 'ielts-listening':
            container.innerHTML = getIELTSListeningHTML();
            break;
        case 'ielts-writing':
            container.innerHTML = getIELTSWritingHTML();
            break;
        case 'ielts-speaking':
            container.innerHTML = getIELTSSpeakingHTML();
            break;
    }
}

function getIELTSOverviewHTML() {
    return `
<div class="max-w-6xl mx-auto px-4 py-12">
    <!-- Action Bar -->
    <div class="flex justify-end mb-8 no-print">
        <button onclick="window.print()" class="print-btn flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-800 transition-all shadow-xl active:scale-95">
            <i class="fas fa-file-pdf"></i> PDF İndir / Yazdır
        </button>
    </div>

    <div class="text-center mb-16">
        <div class="inline-flex items-center gap-3 bg-indigo-50 text-indigo-700 px-5 py-2 rounded-full text-sm font-bold mb-4 border border-indigo-100 uppercase tracking-widest">
            <i class="fas fa-globe-americas"></i> IELTS International
        </div>
        <h1 class="text-4xl md:text-6xl font-black text-slate-900 mb-6" style="font-family: 'Playfair Display', serif;">
            IELTS <span class="text-indigo-600">Hazırlık Merkezi</span>
        </h1>
        <p class="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed italic">
            Akademik veya Genel Eğitim... Hedef bant skorunuza (7.0+) ulaşmanız için gereken her şey burada.
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
            <div class="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-book-open"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">Reading</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6">Skimming, Scanning ve anahtar kelime takibi ile 60 dakikada 3 makale yönetimi.</p>
            <button onclick="goToIELTS('ielts-reading')" class="text-blue-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                İncele <i class="fas fa-arrow-right text-xs"></i>
            </button>
        </div>

        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
            <div class="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-headphones"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">Listening</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6">4 farklı bölüm, 40 soru. Aksanlar, dikkat dağıtıcılar ve boşluk doldurma taktikleri.</p>
            <button onclick="goToIELTS('ielts-listening')" class="text-purple-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                İncele <i class="fas fa-arrow-right text-xs"></i>
            </button>
        </div>

        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
            <div class="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-pen-nib"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">Writing</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6">Task 1 Grafik ve Task 2 Essay için puan kazandıran yapılar ve bağlaçlar.</p>
            <button onclick="goToIELTS('ielts-writing')" class="text-orange-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                İncele <i class="fas fa-arrow-right text-xs"></i>
            </button>
        </div>

        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
            <div class="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-comments"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">Speaking</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6">Birebir mülakat simülasyonları, akıcılık geliştirme ve Part 2 stratejileri.</p>
            <button onclick="goToIELTS('ielts-speaking')" class="text-green-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                İncele <i class="fas fa-arrow-right text-xs"></i>
            </button>
        </div>
    </div>

    <!-- Info Section -->
    <div class="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white overflow-hidden relative">
        <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full"></div>
        <div class="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div class="flex-1">
                <h2 class="text-3xl font-bold mb-4">Hazırlık Süreci Başlıyor</h2>
                <p class="text-slate-400 leading-relaxed mb-8">
                    IELTS altyapımız şu an inşa aşamasındadır. Çok yakında her modül için yapay zeka destekli pratik araçları, 
                    essay değerlendirme sistemi ve gerçek zamanlı konuşma simülasyonları eklenecektir.
                </p>
                <div class="flex flex-wrap gap-4">
                    <div class="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-xs">
                        <i class="fas fa-check text-green-500"></i> Akademik & Genel Modül
                    </div>
                    <div class="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-xs">
                        <i class="fas fa-check text-green-500"></i> AI Essay Analizi
                    </div>
                    <div class="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-xs">
                        <i class="fas fa-check text-green-500"></i> Bant Skoru Tahmini
                    </div>
                </div>
            </div>
            <div class="w-full md:w-1/3 text-center">
                <div class="text-6xl font-black text-indigo-500 mb-2">8.0</div>
                <div class="text-xs uppercase tracking-widest text-slate-500 font-bold">Hedef Bant Skoru</div>
            </div>
        </div>
    </div>
</div>
`;
}

function getIELTSReadingHTML() {
    if (!currentIELTSExam) return "Yükleniyor...";
    
    let html = `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="mb-12">
        <button onclick="switchTab('ielts-overview')" class="text-indigo-600 font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-arrow-left text-xs"></i> IELTS Overview
        </button>
        <h1 class="text-4xl font-black text-slate-900 mb-4" style="font-family: 'Playfair Display', serif;">IELTS Reading Practice</h1>
        <p class="text-slate-600">60 Dakika | 40 Soru | 3 Pasaj</p>
    </div>

    <div class="space-y-16">`;

    currentIELTSExam.modules.reading.forEach(passage => {
        html += `
        <div class="bg-white border border-slate-100 shadow-xl rounded-[2.5rem] overflow-hidden">
            <div class="bg-indigo-600 p-8 text-white">
                <h3 class="text-2xl font-bold">${passage.title}</h3>
                <p class="text-indigo-100 text-sm mt-2 italic">Reading Passage ${passage.passageId}</p>
            </div>
            <div class="p-8 md:p-12">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <!-- Passage text -->
                    <div class="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm">
                        ${passage.content.split('\n\n').map(p => `<p class="mb-4">${p}</p>`).join('')}
                    </div>
                    <!-- Questions -->
                    <div class="space-y-8">
                        <h4 class="text-lg font-bold text-slate-900 border-b pb-4">Questions</h4>
                        ${passage.questions.map(q => `
                            <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <p class="font-bold text-slate-800 mb-4">${q.id}. ${q.question}</p>
                                <div class="grid gap-2">
                                    ${q.options.map(opt => `
                                        <button class="w-full text-left p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-500 transition-all text-xs font-medium"
                                            onclick="checkIELTSAnswer(this, '${q.answer}', '${q.explanation}')">
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

    html += `</div></div>`;
    return html;
}

function getIELTSListeningHTML() {
    if (!currentIELTSExam) return "Yükleniyor...";
    
    let html = `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="mb-12">
        <button onclick="switchTab('ielts-overview')" class="text-indigo-600 font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-arrow-left text-xs"></i> IELTS Overview
        </button>
        <h1 class="text-4xl font-black text-slate-900 mb-4" style="font-family: 'Playfair Display', serif;">IELTS Listening Practice</h1>
        <p class="text-slate-600">30 Dakika | 4 Bölüm | 40 Soru</p>
    </div>

    <div class="space-y-12">`;

    currentIELTSExam.modules.listening.forEach(section => {
        html += `
        <div class="bg-white border border-slate-100 shadow-xl rounded-[2.5rem] p-8">
            <div class="flex flex-col md:flex-row gap-10">
                <div class="w-full md:w-1/3">
                    <div class="bg-indigo-900 rounded-3xl p-6 text-white mb-6">
                        <h3 class="text-xl font-bold mb-2">Section ${section.section}</h3>
                        <p class="text-indigo-300 text-xs italic mb-8">Ses dosyasını dinleyin ve soruları yanıtlayın.</p>
                        <div class="flex justify-center">
                            <button onclick="playSoundFromTranscript(this)" data-text="${section.transcript.replace(/"/g, '&quot;')}" 
                                class="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                <i class="fas fa-play text-2xl"></i>
                            </button>
                        </div>
                    </div>
                    <div class="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <h4 class="text-xs font-black uppercase text-slate-400 mb-4 tracking-widest">Transcript (Gizli)</h4>
                      <button onclick="this.nextElementSibling.classList.toggle('hidden')" class="text-[10px] text-indigo-600 font-bold">Transkripti Göster/Gizle</button>
                      <div class="hidden mt-4 text-[10px] text-slate-500 leading-relaxed italic">
                        ${section.transcript.split('\n').map(l => `<p class="mb-2">${l}</p>`).join('')}
                      </div>
                    </div>
                </div>
                <div class="flex-1 space-y-6">
                    ${section.questions.map(q => `
                        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <p class="font-bold text-slate-800 mb-4">${q.id}. ${q.question}</p>
                            <input type="text" class="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                placeholder="Cevabınızı yazın..." onkeydown="if(event.key === 'Enter') checkIELTSInputAnswer(this, '${q.answer}', '${q.explanation}')">
                            <div class="feedback hidden mt-4 p-4 rounded-xl text-xs"></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        `;
    });

    html += `</div></div>`;
    return html;
}

function getIELTSWritingHTML() {
    if (!currentIELTSExam) return "Yükleniyor...";
    const { writing } = currentIELTSExam.modules;
    
    return `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="mb-12">
        <button onclick="switchTab('ielts-overview')" class="text-indigo-600 font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-arrow-left text-xs"></i> IELTS Overview
        </button>
        <h1 class="text-4xl font-black text-slate-900 mb-4" style="font-family: 'Playfair Display', serif;">IELTS Writing Practice</h1>
        <p class="text-slate-600">60 Dakika | 2 Task</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- Task 1 -->
        <div class="bg-white border border-slate-100 shadow-xl rounded-[2.5rem] p-8">
            <div class="flex items-center gap-2 mb-6">
                <span class="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Task 1</span>
                <span class="text-slate-400 text-[10px]">Min 150 Kelime</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-6 italic">${writing.task1.prompt}</h3>
            <textarea class="w-full h-64 p-6 bg-slate-50 rounded-3xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm leading-relaxed mb-6" 
                placeholder="Buraya yazmaya başlayın..."></textarea>
            
            <button onclick="this.nextElementSibling.classList.toggle('hidden')" class="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl">Model Cevabı Gör</button>
            <div class="hidden mt-6 p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100 italic text-slate-700 text-sm leading-relaxed">
                <h4 class="font-bold mb-4 text-indigo-900 not-italic">Sample Answer (Band 8.5+)</h4>
                ${writing.task1.model_answer.split('\n\n').map(p => `<p class="mb-4">${p}</p>`).join('')}
            </div>
        </div>

        <!-- Task 2 -->
        <div class="bg-white border border-slate-100 shadow-xl rounded-[2.5rem] p-8">
            <div class="flex items-center gap-2 mb-6">
                <span class="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Task 2</span>
                <span class="text-slate-400 text-[10px]">Min 250 Kelime</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-6 italic">${writing.task2.prompt}</h3>
            <textarea class="w-full h-64 p-6 bg-slate-50 rounded-3xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm leading-relaxed mb-6" 
                placeholder="Buraya yazmaya başlayın..."></textarea>
            
            <button onclick="this.nextElementSibling.classList.toggle('hidden')" class="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl">Model Cevabı Gör</button>
            <div class="hidden mt-6 p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100 italic text-slate-700 text-sm leading-relaxed">
                <h4 class="font-bold mb-4 text-indigo-900 not-italic">Sample Answer (Band 8.5+)</h4>
                ${writing.task2.model_answer.split('\n\n').map(p => `<p class="mb-4">${p}</p>`).join('')}
            </div>
        </div>
    </div>
</div>
`;
}

function getIELTSSpeakingHTML() {
    if (!currentIELTSExam) return "Yükleniyor...";
    const { speaking } = currentIELTSExam.modules;

    return `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="mb-12">
        <button onclick="switchTab('ielts-overview')" class="text-indigo-600 font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-arrow-left text-xs"></i> IELTS Overview
        </button>
        <h1 class="text-4xl font-black text-slate-900 mb-4" style="font-family: 'Playfair Display', serif;">IELTS Speaking Practice</h1>
        <p class="text-slate-600">11-14 Dakika | 3 Bölüm</p>
    </div>

    <div class="space-y-12">
        <!-- Part 1 -->
        <div class="bg-white border border-slate-100 shadow-xl rounded-[3rem] p-10">
            <div class="flex items-center gap-4 mb-8">
                <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl font-black">1</div>
                <div>
                    <h3 class="font-bold text-lg">Part 1: Introduction & General</h3>
                    <p class="text-xs text-slate-400 italic">Tanıdık konularda kısa yanıtlar verin.</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${speaking.part1.map(q => `
                    <div class="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
                        <button onclick="speakIELTSQuestion('${q}')" class="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-indigo-600 hover:scale-110 transition-transform">
                            <i class="fas fa-volume-up text-xs"></i>
                        </button>
                        <p class="text-sm font-medium text-slate-700">${q}</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Part 2 -->
        <div class="bg-indigo-900 text-white border border-slate-100 shadow-2xl rounded-[3rem] p-10 relative overflow-hidden">
            <div class="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full blur-[100px]"></div>
            <div class="relative z-10 flex flex-col md:flex-row gap-12">
                <div class="flex-1">
                    <div class="flex items-center gap-4 mb-8">
                        <div class="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center text-xl font-black">2</div>
                        <h3 class="font-bold text-lg text-white">Part 2: The Long Turn (Cue Card)</h3>
                    </div>
                    <div class="bg-white/10 p-8 rounded-[2rem] border border-white/10 shadow-inner">
                        <h4 class="text-xl font-bold mb-6 italic text-indigo-200">"${speaking.part2.cue_card}"</h4>
                        <p class="text-xs uppercase tracking-[0.2em] font-black opacity-50 mb-4">You should say:</p>
                        <ul class="space-y-3">
                            ${speaking.part2.bullet_points.map(bp => `
                                <li class="flex items-center gap-3 text-sm">
                                    <i class="fas fa-chevron-right text-[10px] text-indigo-400"></i> ${bp}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                <div class="w-full md:w-1/3 flex flex-col justify-center items-center text-center">
                    <div class="text-5xl font-black text-indigo-400 mb-2">2:00</div>
                    <p class="text-xs text-indigo-200 italic mb-8">Hazır olduğunuzda başlatın ve kesintisiz konuşun.</p>
                    <button class="w-20 h-20 bg-white text-indigo-900 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform font-bold">START</button>
                </div>
            </div>
        </div>

        <!-- Part 3 -->
        <div class="bg-white border border-slate-100 shadow-xl rounded-[3rem] p-10">
            <div class="flex items-center gap-4 mb-8">
                <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl font-black">3</div>
                <div>
                    <h3 class="font-bold text-lg">Part 3: Two-Way Discussion</h3>
                    <p class="text-xs text-slate-400 italic">Daha soyut ve geniş perspektifli sorular.</p>
                </div>
            </div>
            <div class="space-y-4">
                ${speaking.part3.map(q => `
                    <div class="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
                        <button onclick="speakIELTSQuestion('${q}')" class="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-indigo-600 hover:scale-110 transition-transform">
                            <i class="fas fa-volume-up text-xs"></i>
                        </button>
                        <p class="text-sm font-medium text-slate-700">${q}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
</div>
`;
}

// Interactivity Functions
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
    feedback.classList.add('bg-indigo-50', 'text-indigo-900', 'border', 'border-indigo-100');
    feedback.innerHTML = `<strong>Açıklama:</strong> ${explanation}`;
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
    feedback.classList.add('bg-indigo-50', 'text-indigo-900', 'border', 'border-indigo-100');
    feedback.innerHTML = `<strong>Açıklama:</strong> ${explanation}`;
}

window.playSoundFromTranscript = function(btn) {
    const text = btn.getAttribute('data-text');
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Üzgünüz, tarayıcınız seslendirme özelliğini desteklemiyor.");
    }
}

window.speakIELTSQuestion = function(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-GB';
        window.speechSynthesis.speak(utterance);
    }
}

// Ensure first page renders on load if user is already on ielts tab
document.addEventListener('DOMContentLoaded', () => {
  const activeTab = document.querySelector('.tab-content.active');
  if(activeTab && activeTab.id.startsWith('tab-ielts')) {
    initIELTS().then(() => renderIELTSModule(activeTab.id.replace('tab-', '')));
  }
});
