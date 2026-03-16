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
        <div class="fixed top-0 left-0 w-full bg-slate-900 text-white px-8 py-4 flex justify-between items-center z-[10000] border-b border-white/10">
            <div class="flex items-center gap-4">
                <span class="text-xs font-black uppercase tracking-[0.3em] text-indigo-400">IELTS ZEN MODE</span>
                <span class="h-4 w-px bg-white/20"></span>
                <span class="text-sm font-bold opacity-80">${tabName.replace('ielts-', '').toUpperCase()}</span>
            </div>
            <button onclick="toggleZenMode(false)" class="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
                <i class="fas fa-times"></i> Odaklı Modu Kapat
            </button>
        </div>
        <div class="h-20"></div> <!-- Spacer -->
        `;
    }

    switch(tabName) {
        case 'ielts-overview': html += getIELTSOverviewHTML(); break;
        case 'ielts-reading': html += getIELTSReadingHTML(); break;
        case 'ielts-listening': html += getIELTSListeningHTML(); break;
        case 'ielts-writing': html += getIELTSWritingHTML(); break;
        case 'ielts-speaking': html += getIELTSSpeakingHTML(); break;
    }

    container.innerHTML = html;
    
    // If zen mode is active, wrap high-level container classes if needed
    if(zenModeActive) {
        container.classList.add('exam-full-page');
    } else {
        container.classList.remove('exam-full-page');
    }
}

function getIELTSOverviewHTML() {
    return `
<div class="max-w-6xl mx-auto px-4 py-12">
    <!-- Action Bar -->
    <div class="flex justify-between items-center mb-12 no-print">
        <div class="flex gap-4">
             <button onclick="toggleZenMode(true)" class="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl active:scale-95">
                <i class="fas fa-expand"></i> Odaklı Sınav Modu
            </button>
        </div>
        <button onclick="window.print()" class="print-btn flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-800 transition-all shadow-xl active:scale-95">
            <i class="fas fa-file-pdf"></i> PDF İndir
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
</div>
`;
}

function getIELTSReadingHTML() {
    let html = `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="mb-12 flex justify-between items-start">
        <div>
            <button onclick="goToIELTS('ielts-overview')" class="text-indigo-600 font-bold mb-4 flex items-center gap-2">
                <i class="fas fa-arrow-left text-xs"></i> Overview
            </button>
            <h1 class="text-4xl font-black text-slate-900 mb-4" style="font-family: 'Playfair Display', serif;">IELTS Reading Practice</h1>
            <p class="text-slate-600">60 Dakika | 40 Soru | 3 Pasaj</p>
        </div>
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

    html += `</div></div>`;
    return html;
}

function getIELTSListeningHTML() {
    let html = `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="mb-12">
        <button onclick="goToIELTS('ielts-overview')" class="text-indigo-600 font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-arrow-left text-xs"></i> Overview
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
                        <p class="text-indigo-300 text-xs italic mb-8 uppercase tracking-widest font-black">Cloud Listening Modu 🌩️</p>
                        <div class="flex flex-col items-center gap-4">
                            <button onclick="playCloudTTS(this)" data-text="${section.transcript.replace(/"/g, '&quot;')}" 
                                class="w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group">
                                <i class="fas fa-play text-3xl group-hover:scale-125 transition-transform"></i>
                            </button>
                            <span class="text-[10px] text-indigo-400 font-bold">Gerçekçi AI Sesi</span>
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
                                placeholder="Cevabınızı yazın..." onkeydown="if(event.key === 'Enter') checkIELTSInputAnswer(this, '${q.answer}', '${q.explanation.replace(/'/g, "\\'")}')">
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
    const { writing } = currentIELTSExam.modules;
    return `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="mb-12">
        <button onclick="goToIELTS('ielts-overview')" class="text-indigo-600 font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-arrow-left text-xs"></i> Overview
        </button>
        <h1 class="text-4xl font-black text-slate-900 mb-4" style="font-family: 'Playfair Display', serif;">IELTS Writing Practice</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div class="bg-white border border-slate-100 shadow-xl rounded-[2.5rem] p-8">
            <h3 class="text-xl font-bold text-slate-900 mb-6 italic">${writing.task1.prompt}</h3>
            <textarea class="w-full h-64 p-6 bg-slate-50 rounded-3xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm" placeholder="Task 1..."></textarea>
            <button onclick="this.nextElementSibling.classList.toggle('hidden')" class="w-full mt-4 py-4 bg-slate-900 text-white rounded-2xl font-bold">Model Cevap</button>
            <div class="hidden mt-6 p-8 bg-indigo-50 rounded-[2rem] text-sm">${writing.task1.model_answer}</div>
        </div>
        <div class="bg-white border border-slate-100 shadow-xl rounded-[2.5rem] p-8">
            <h3 class="text-xl font-bold text-slate-900 mb-6 italic">${writing.task2.prompt}</h3>
            <textarea class="w-full h-64 p-6 bg-slate-50 rounded-3xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="Task 2..."></textarea>
            <button onclick="this.nextElementSibling.classList.toggle('hidden')" class="w-full mt-4 py-4 bg-slate-900 text-white rounded-2xl font-bold">Model Cevap</button>
            <div class="hidden mt-6 p-8 bg-indigo-50 rounded-[2rem] text-sm">${writing.task2.model_answer}</div>
        </div>
    </div>
</div>
`;
}

function getIELTSSpeakingHTML() {
    const { speaking } = currentIELTSExam.modules;
    return `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="mb-12">
        <button onclick="goToIELTS('ielts-overview')" class="text-indigo-600 font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-arrow-left text-xs"></i> Overview
        </button>
        <h1 class="text-4xl font-black text-slate-900 mb-4" style="font-family: 'Playfair Display', serif;">IELTS Speaking Simulation</h1>
    </div>
    <div class="space-y-12">
        <div class="bg-white border border-slate-100 shadow-xl rounded-[3rem] p-10">
            <h3 class="font-bold text-lg mb-4">Part 1: General Questions</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${speaking.part1.map(q => `
                    <div class="bg-slate-50 p-6 rounded-3xl flex items-center gap-4">
                        <button onclick="playCloudTTS(this)" data-text="${q}" class="w-10 h-10 bg-white rounded-xl shadow text-indigo-600"><i class="fas fa-volume-up"></i></button>
                        <p class="text-sm font-medium">${q}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
</div>
`;
}

// INTERACTIVITY
window.checkIELTSAnswer = function(btn, correctAns, explanation) {
    const parent = btn.parentElement;
    const allBtns = parent.querySelectorAll('button');
    const feedback = parent.nextElementSibling;
    allBtns.forEach(b => {
        b.disabled = true;
        if (b.innerText.trim() === correctAns || (b.innerText.trim().startsWith(correctAns))) {
            b.classList.add('bg-green-500', 'text-white');
        } else if (b === btn) {
            b.classList.add('bg-red-500', 'text-white');
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
        input.classList.add('bg-green-500', 'text-white');
    } else {
        input.classList.add('bg-red-500', 'text-white');
        input.value = `${val} (Doğru: ${correctAns})`;
    }
    feedback.classList.remove('hidden');
    feedback.innerHTML = `<strong>Açıklama:</strong> ${explanation}`;
    feedback.className = "mt-4 p-4 rounded-xl text-xs bg-indigo-50 text-indigo-900 border border-indigo-100";
}

// CLOUD TTS (Infrastructure for better voices)
window.playCloudTTS = async function(btn) {
    const text = btn.getAttribute('data-text');
    const originalIcon = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    try {
        // High Quality Cloud TTS Fallback (Google Translate unofficial API for better clarity than system voices)
        // Note: Real Google Cloud TTS or OpenAI TTS requires a server-side proxy for API keys.
        const chunks = text.match(/.{1,200}/g) || [text];
        for (const chunk of chunks) {
            const audio = new Audio(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunk)}&tl=en&client=tw-ob`);
            await new Promise(resolve => {
                audio.onended = resolve;
                audio.play();
            });
        }
    } catch (e) {
        console.error("Cloud TTS Error:", e);
        // Fallback to system voice if cloud fails
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    } finally {
        btn.innerHTML = originalIcon;
    }
}
