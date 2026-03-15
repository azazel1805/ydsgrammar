/* ============================================================
   focused-exams.js  –  Focused YDS Exams with Color Mapping
   ============================================================ */

const FOCUSED_EXAM_LIST = [
  { id: 'focused1', label: 'Odaklı Deneme 1', file: '/exams/focused/focused1.json' },
  { id: 'focused2', label: 'Odaklı Deneme 2', file: '/exams/focused/focused2.json' }
];

// Highlight Categories & Regex Patterns
const FOCUS_CATEGORIES = {
  conjunctions: {
    label: 'Bağlaçlar',
    color: 'bg-orange-200 text-orange-900 border-orange-300',
    patterns: [
      /\b(although|though|even though|while|whereas|but|however|nevertheless|nonetheless|despite|in spite of|notwithstanding)\b/gi, // Concessive
      /\b(because|since|as|for|because of|due to|owing to|on account of|thanks to|so|therefore|thus|hence|consequently|as a result)\b/gi, // Causal/Result
      /\b(and|moreover|furthermore|in addition|besides|also|not only|but also)\b/gi, // Additive
      /\b(if|unless|provided that|providing that|as long as|so long as|in case|whether)\b/gi // Conditional
    ]
  },
  passives: {
    label: 'Edilgen Yapı (Passive)',
    color: 'bg-blue-200 text-blue-900 border-blue-300',
    patterns: [
        /\b(is|am|are|was|were|be|been|being)\s+([a-z]+ed|known|seen|found|made|taken|given|built|shown|kept|told|written|done|gone|broken|set)\b/gi
    ]
  },
  tenses: {
    label: 'Zaman İpuçları',
    color: 'bg-emerald-200 text-emerald-900 border-emerald-300',
    patterns: [
      /\b(since|for|ago|lately|recently|so far|until now|up to now|already|just|yet|yesterday|tomorrow|next|last|currently|now)\b/gi,
      /\b(by the time|as soon as|once|whenever|when|while|before|after)\b/gi
    ]
  }
};

// State
let foExamData = null;
let foAnswers = {};
let foTimerRef = null;
let foSecondsLeft = 0;
let foStarted = false;
let foCurrentIdx = 0;
let foReviewMode = false;
let activeHighlights = { conjunctions: true, passives: true, tenses: true };

// UI Templates
const focusedExamsHTML = `
<div class="max-w-6xl mx-auto px-4 py-10">
  <div class="text-center mb-10">
    <div class="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-800 to-indigo-900 text-white px-6 py-3 rounded-2xl shadow-xl mb-6">
      <i class="fas fa-bullseye text-xl text-yellow-500"></i>
      <span class="font-bold text-lg tracking-wide" style="font-family:'Playfair Display',serif;">Odaklı Deneme Merkezi</span>
    </div>
    <h2 class="text-3xl font-extrabold text-slate-800 mb-2" style="font-family:'Playfair Display',serif;">Akıllı Analiz ve Renk Haritası</h2>
    <p class="text-slate-500 text-sm max-w-2xl mx-auto">Soru çözerken metindeki kritik dil bilgisi yapılarını (bağlaçlar, edilgen yapılar vb.) renk haritası ile kolayca görün.</p>
  </div>

  <div id="foStartScreen" class="grid md:grid-cols-2 gap-6">
    <div class="space-y-4">
       <div class="flex items-center gap-3 mb-4">
          <div class="h-8 w-1 bg-indigo-700 rounded-full"></div>
          <h3 class="text-xl font-bold text-slate-800">Mevcut Denemeler</h3>
       </div>
       <div class="grid gap-3">
         ${FOCUSED_EXAM_LIST.map(e => `
           <div onclick="foSelectExam('${e.id}')" id="foCard-${e.id}"
             class="fo-exam-card cursor-pointer border-2 border-slate-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all bg-white">
             <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 shadow-sm">
                    <i class="fas fa-graduation-cap text-lg"></i>
                  </div>
                  <div>
                    <p class="font-bold text-slate-800 text-lg">${e.label}</p>
                    <p class="text-xs text-slate-400 font-semibold tracking-wide">80 SORU · 180 DAKİKA</p>
                  </div>
                </div>
                <i class="fas fa-chevron-right text-slate-300"></i>
             </div>
           </div>
         `).join('')}
       </div>
    </div>

    <div class="bg-indigo-50/50 border border-indigo-100 rounded-3xl p-8">
       <h4 class="font-bold text-indigo-900 mb-4 flex items-center gap-2">
         <i class="fas fa-info-circle"></i> Odaklı Mod Nasıl Çalışır?
       </h4>
       <ul class="space-y-4 text-sm text-indigo-800/80">
         <li class="flex gap-3">
           <span class="w-6 h-6 rounded-full bg-indigo-200 flex items-center justify-center text-xs shrink-0">1</span>
           <span><b>Sıralı Çözüm:</b> Sorular standart YDS/YDT formatında gelir.</span>
         </li>
         <li class="flex gap-3">
           <span class="w-6 h-6 rounded-full bg-indigo-200 flex items-center justify-center text-xs shrink-0">2</span>
           <span><b>Renk Haritası:</b> Metin içindeki bağlaçlar, tenseler ve pasif yapılar otomatik olarak işaretlenir.</span>
         </li>
         <li class="flex gap-3">
           <span class="w-6 h-6 rounded-full bg-indigo-200 flex items-center justify-center text-xs shrink-0">3</span>
           <span><b>Görsel Hafıza:</b> Kelime sorularında cevaplara uygun görseller anlık olarak yüklenir.</span>
         </li>
       </ul>
       <div class="mt-8 pt-8 border-t border-indigo-200/50">
          <p class="text-[10px] uppercase font-bold text-indigo-900/40 tracking-widest mb-4">Renk Haritası Lejantı</p>
          <div class="space-y-2">
            ${Object.keys(FOCUS_CATEGORIES).map(k => `
              <div class="flex items-center gap-3">
                <div class="w-4 h-4 rounded ${FOCUS_CATEGORIES[k].color}"></div>
                <span class="text-xs font-bold text-slate-600">${FOCUS_CATEGORIES[k].label}</span>
              </div>
            `).join('')}
          </div>
       </div>
    </div>
  </div>

  <div id="foExamScreen" class="hidden grid lg:grid-cols-12 gap-8 h-[calc(100vh-250px)]">
    <!-- LEFT SIDEBAR: NAV & FOCUS CONTROLS -->
    <div class="lg:col-span-3 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
       <div class="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
          <div class="flex items-center justify-between mb-6">
            <span id="foQNum" class="text-2xl font-black">1/80</span>
            <div class="bg-red-800/20 text-red-400 px-3 py-1 rounded-lg text-xs font-bold border border-red-800/30">
              <i class="fas fa-clock mr-1"></i> <span id="foTimer">180:00</span>
            </div>
          </div>
          
          <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">Odak Filtreleri</p>
          <div class="space-y-2 mb-8">
            ${Object.keys(FOCUS_CATEGORIES).map(k => `
              <label class="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors">
                <span class="text-xs font-semibold text-slate-300">${FOCUS_CATEGORIES[k].label}</span>
                <input type="checkbox" checked onchange="toggleFocusType('${k}')" class="w-4 h-4 accent-indigo-500">
              </label>
            `).join('')}
          </div>

          <button onclick="foFinishConfirm()" class="w-full py-4 bg-red-800 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-all">
            Sınavı Bitir
          </button>
       </div>

       <div id="foQuestionNav" class="grid grid-cols-5 gap-2">
         <!-- Question Map injected here -->
       </div>
    </div>

    <!-- MAIN CONTENT: QUESTION & PASSAGE -->
    <div class="lg:col-span-9 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
       <div id="foSectionHeader" class="px-8 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <span id="foSectionTitle" class="text-[10px] font-black text-slate-400 uppercase tracking-widest">VOCABULARY</span>
          <div class="flex gap-2">
            <button onclick="foNavQuestion(-1)" class="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100"><i class="fas fa-chevron-left text-xs"></i></button>
            <button onclick="foNavQuestion(1)" class="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100"><i class="fas fa-chevron-right text-xs"></i></button>
          </div>
       </div>
       
       <div class="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div id="foContentArea" class="flex flex-col md:flex-row gap-10">
             <div id="foPassagePane" class="hidden md:w-1/2 bg-blue-50/30 p-8 rounded-3xl border border-blue-100/50 text-slate-700 leading-relaxed text-sm overflow-y-auto max-h-[500px]">
             </div>
             <div id="foQuestionPane" class="flex-1 space-y-8">
                <div id="foVocabImage" class="hidden mb-6">
                  <div class="w-full h-48 rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center text-slate-300">
                    <i class="fas fa-image text-3xl"></i>
                  </div>
                </div>
                <h3 id="foQuestionText" class="text-xl font-bold text-slate-800 leading-tight">...</h3>
                <div id="foOptions" class="space-y-3">
                   <!-- Options here -->
                </div>
             </div>
          </div>
       </div>
    </div>
  </div>

  <div id="foResultScreen" class="hidden max-w-2xl mx-auto space-y-8">
    <div class="bg-indigo-900 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
       <div class="relative z-10">
          <div class="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="fas fa-check text-3xl"></i>
          </div>
          <h2 class="text-4xl font-black mb-10 tracking-tight">Sınav Tamamlandı</h2>
          <div class="grid grid-cols-3 gap-4 mb-10">
             <div class="bg-white/10 p-4 rounded-2xl"><p class="text-[10px] uppercase font-bold opacity-50 mb-1">Doğru</p><p id="foResCorrect" class="text-3xl font-black">--</p></div>
             <div class="bg-white/10 p-4 rounded-2xl"><p class="text-[10px] uppercase font-bold opacity-50 mb-1">Yanlış</p><p id="foResWrong" class="text-3xl font-black">--</p></div>
             <div class="bg-white/10 p-4 rounded-2xl"><p class="text-[10px] uppercase font-bold opacity-50 mb-1">Başarı %</p><p id="foResScore" class="text-3xl font-black">--</p></div>
          </div>
          <div class="flex flex-wrap justify-center gap-4">
             <button onclick="foReset()" class="px-10 py-4 bg-white text-indigo-900 rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 transition-all">Geri Dön</button>
             <button id="foReviewBtn" onclick="foStartReview()" class="px-10 py-4 bg-indigo-500 text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 transition-all">Cevapları İncele</button>
          </div>
       </div>
    </div>
  </div>
</div>
<style>
  .fo-highlight { border-bottom: 2px solid; padding-bottom: 2px; }
  .custom-scrollbar::-webkit-scrollbar { width: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
  .fo-nav-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; cursor: pointer; border: 1px solid #e2e8f0; transition: all 0.2s; }
  .fo-nav-dot.answered { background: #4f46e5; border-color: #4f46e5; }
  .fo-nav-dot.current { background: #ef4444; border-color: #ef4444; transform: scale(1.5); }
</style>
`;

// ── Core Engine ──────────────────────────────────────────────

function initFocusedExams() {
  const container = document.getElementById('tab-focused-exams');
  if (container) container.innerHTML = focusedExamsHTML;
  foReset();
}

async function foSelectExam(id) {
  const exam = FOCUSED_EXAM_LIST.find(e => e.id === id);
  if (!exam) return;

  try {
    const res = await fetch(`${exam.file}?v=${new Date().getTime()}`);
    foExamData = await res.json();
    foStart();
  } catch (err) {
    console.error("Exam load error:", err);
  }
}

function foStart() {
  foAnswers = {};
  foCurrentIdx = 0;
  foSecondsLeft = (foExamData.meta.duration_minutes || 180) * 60;
  foStarted = true;
  foReviewMode = false;

  document.getElementById('foStartScreen').classList.add('hidden');
  document.getElementById('foResultScreen').classList.add('hidden');
  document.getElementById('foExamScreen').classList.remove('hidden');

  foRenderQuestion();
  foUpdateNav();
  foStartTimer();
}

function foStartTimer() {
  if (foTimerRef) clearInterval(foTimerRef);
  foTimerRef = setInterval(() => {
    foSecondsLeft--;
    if (foSecondsLeft <= 0) {
      clearInterval(foTimerRef);
      foFinish();
    }
    const m = Math.floor(foSecondsLeft / 60);
    const s = foSecondsLeft % 60;
    const timerEl = document.getElementById('foTimer');
    if (timerEl) timerEl.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }, 1000);
}

function foReset() {
  if (foTimerRef) clearInterval(foTimerRef);
  foStarted = false;
  foReviewMode = false;
  foExamData = null;
  document.getElementById('foStartScreen')?.classList.remove('hidden');
  document.getElementById('foExamScreen')?.classList.add('hidden');
  document.getElementById('foResultScreen')?.classList.add('hidden');
}

function foNavQuestion(delta) {
  const newIdx = foCurrentIdx + delta;
  if (newIdx >= 0 && newIdx < foExamData.questions.length) {
    foCurrentIdx = newIdx;
    foRenderQuestion();
    foUpdateNav();
  }
}

function foJump(idx) {
  foCurrentIdx = idx;
  foRenderQuestion();
  foUpdateNav();
}

function foRenderQuestion() {
  if (!foExamData) return;
  const q = foExamData.questions[foCurrentIdx];
  const qNumEl = document.getElementById('foQNum');
  const passagePane = document.getElementById('foPassagePane');
  const sectionTitle = document.getElementById('foSectionTitle');
  const questionText = document.getElementById('foQuestionText');
  const foOptions = document.getElementById('foOptions');
  const vocabImage = document.getElementById('foVocabImage');

  if (qNumEl) qNumEl.textContent = `${foCurrentIdx + 1}/${foExamData.questions.length}`;
  if (sectionTitle) sectionTitle.textContent = q.section_id.toUpperCase().replace('_',' ');

  // Passage Display
  if (q.passage_id) {
    const passage = foExamData.passages.find(p => p.id === q.passage_id);
    if (passage) {
      passagePane.innerHTML = applyHighlights(passage.text);
      passagePane.classList.remove('hidden');
    } else {
      passagePane.classList.add('hidden');
    }
  } else {
    passagePane.classList.add('hidden');
  }

  // Question Text with Highlights
  questionText.innerHTML = applyHighlights(q.question);

  // Vocabulary Image Logic
  if (q.section_id === 'vocabulary' && foCurrentIdx < 10) {
    vocabImage.classList.remove('hidden');
    fetchUnsplashImage(q.correct_word || q.options[q.correct]);
  } else {
    vocabImage.classList.add('hidden');
  }

  // Options
  foOptions.innerHTML = '';
  Object.keys(q.options).forEach(key => {
    const isSelected = foAnswers[q.id] === key;
    const isCorrect = q.correct === key;
    
    let borderClass = 'border-slate-100 hover:border-indigo-100 hover:bg-slate-50 text-slate-700';
    let badgeClass = 'bg-slate-100 text-slate-500';

    if (foReviewMode) {
        if (isCorrect) {
            borderClass = 'border-green-500 bg-green-50 text-green-900 ring-4 ring-green-100';
            badgeClass = 'bg-green-600 text-white';
        } else if (isSelected && !isCorrect) {
            borderClass = 'border-red-500 bg-red-50 text-red-900';
            badgeClass = 'bg-red-600 text-white';
        }
    } else if (isSelected) {
        borderClass = 'border-indigo-600 bg-indigo-50 text-indigo-900';
        badgeClass = 'bg-indigo-600 text-white';
    }

    const btn = document.createElement('button');
    btn.className = `w-full p-5 rounded-2xl border-2 text-left transition-all font-semibold ${borderClass}`;
    btn.innerHTML = `<span class="inline-block w-8 h-8 rounded-lg ${badgeClass} flex items-center justify-center mr-4 text-xs group-hover:bg-indigo-600 group-hover:text-white">${key}</span> ${applyHighlights(q.options[key])}`;
    
    if (!foReviewMode) {
        btn.onclick = () => {
          foAnswers[q.id] = key;
          foRenderQuestion();
          foUpdateNav();
        };
    }
    foOptions.appendChild(btn);
  });

  // Review Info
  if (foReviewMode) {
    const infoBox = document.createElement('div');
    infoBox.className = "mt-6 p-5 rounded-2xl bg-slate-900 text-white shadow-xl animate-in slide-in-from-bottom-2 duration-300";
    const isCorrect = foAnswers[q.id] === q.correct;
    infoBox.innerHTML = `
      <div class="flex items-center justify-between">
         <div class="flex items-center gap-3">
           <div class="w-10 h-10 rounded-full ${isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'} flex items-center justify-center">
             <i class="fas ${isCorrect ? 'fa-check' : 'fa-times'}"></i>
           </div>
           <div>
             <p class="font-bold text-base">${isCorrect ? 'Doğru!' : 'Hatalı Cevap'}</p>
             <p class="text-xs opacity-60">${isCorrect ? 'Harika gidiyorsun.' : 'Bir dahaki sefere daha dikkatli ol.'}</p>
           </div>
         </div>
         <div class="text-right">
           <p class="text-[10px] uppercase font-bold opacity-40">Doğru Şık</p>
           <p class="text-2xl font-black text-indigo-400">${q.correct}</p>
         </div>
      </div>
    `;
    foOptions.appendChild(infoBox);
  }
}

function applyHighlights(text) {
  if (!text) return "";
  let highlighted = text;

  Object.keys(FOCUS_CATEGORIES).forEach(type => {
      if (activeHighlights[type]) {
          const cat = FOCUS_CATEGORIES[type];
          cat.patterns.forEach(pattern => {
              highlighted = highlighted.replace(pattern, (match) => {
                  return `<span class="fo-highlight ${cat.color} rounded px-0.5">${match}</span>`;
              });
          });
      }
  });

  return highlighted;
}

function toggleFocusType(type) {
  activeHighlights[type] = !activeHighlights[type];
  foRenderQuestion();
}

function foUpdateNav() {
  const nav = document.getElementById('foQuestionNav');
  if (!nav) return;
  nav.innerHTML = '';
  foExamData.questions.forEach((q, idx) => {
    const dot = document.createElement('div');
    dot.className = `fo-nav-dot ${foAnswers[q.id] ? 'answered' : ''} ${foCurrentIdx === idx ? 'current' : ''}`;
    dot.title = `Soru ${idx + 1}`;
    dot.onclick = () => foJump(idx);
    nav.appendChild(dot);
  });
}

async function fetchUnsplashImage(word) {
  const container = document.getElementById('foVocabImage');
  const accessKey = '0uDnN1Zl1YFXRG3vHAKgEZoTakXkCg65RV3LtgXiNcM';
  try {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${word}&per_page=1&client_id=${accessKey}`);
    const data = await res.json();
    if (data.results && data.results[0]) {
      container.innerHTML = `<img src="${data.results[0].urls.regular}" class="w-full h-48 object-cover rounded-2xl shadow-lg animate-in fade-in duration-500" />`;
    }
  } catch (err) {
    console.error("Image error:", err);
  }
}

function foFinishConfirm() {
  const unanswered = foExamData.questions.length - Object.keys(foAnswers).length;
  if (unanswered > 0) {
    if (!confirm(`${unanswered} soruyu cevaplamadınız. Sınavı bitirmek istediğinizden emin misiniz?`)) return;
  } else {
    if (!confirm("Sınavı bitirmek istediğinizden emin misiniz?")) return;
  }
  foFinish();
}

function foFinish() {
  if (foTimerRef) clearInterval(foTimerRef);
  let correctCount = 0;
  foExamData.questions.forEach(q => {
    if (foAnswers[q.id] === q.correct) correctCount++;
  });

  const total = foExamData.questions.length;
  document.getElementById('foResCorrect').textContent = correctCount;
  document.getElementById('foResWrong').textContent = total - correctCount;
  document.getElementById('foResScore').textContent = Math.round((correctCount / total) * 100);

  document.getElementById('foExamScreen').classList.add('hidden');
  document.getElementById('foResultScreen').classList.remove('hidden');
}

function foStartReview() {
  foReviewMode = true;
  document.getElementById('foResultScreen').classList.add('hidden');
  document.getElementById('foExamScreen').classList.remove('hidden');
  foJump(0);
}

// Global Exports
window.foSelectExam = foSelectExam;
window.foNavQuestion = foNavQuestion;
window.foFinishConfirm = foFinishConfirm;
window.foReset = foReset;
window.foJump = foJump;
window.toggleFocusType = toggleFocusType;
window.initFocusedExams = initFocusedExams;
window.foStartReview = foStartReview;
