/* ============================================================
   focused-exams.js  –  Focused YDS Exams with Color Mapping
   ============================================================ */

const FOCUSED_EXAM_LIST = [
  { id: 'focused1', label: 'Odaklı Deneme 1', file: '/exams/focused/focused1.json' },
  { id: 'focused2', label: 'Odaklı Deneme 2', file: '/exams/focused/focused2.json' },
  { id: 'focused3', label: 'Odaklı Deneme 3', file: '/exams/focused/focused3.json' },
  { id: 'focused4', label: 'Odaklı Deneme 4', file: '/exams/focused/focused4.json' },
  { id: 'focused5', label: 'Odaklı Deneme 5', file: '/exams/focused/focused5.json' }
];

// Highlight Categories & Regex Patterns
const FOCUS_CATEGORIES = {
  conjunctions: {
    label: 'Bağlaçlar',
    color: 'bg-orange-200 text-orange-900 border-orange-300',
    patterns: [
      // 1. Concessive / Adversative / Contrast (zıtlık - beklenenin tersine rağmen)
      /\b(although|though|even though|while|whereas|but|however|nevertheless|nonetheless|yet|still|despite|in spite of|notwithstanding|albeit|on the other hand|conversely|instead|rather|by contrast|on the contrary|admittedly|granted that)\b/gi,

      // 2. Causal / Reason / Result (neden-sonuç)
      /\b(because|since|as|for|because of|due to|owing to|on account of|thanks to|so|therefore|thus|hence|consequently|as a result|accordingly|as a consequence|for this reason|that is why|in consequence|thereby|henceforth)\b/gi,

      // 3. Additive / Addition / Similarity (ekleme, benzerlik)
      /\b(and|moreover|furthermore|in addition|besides|also|not only|but also|as well as|likewise|similarly|equally|again|coupled with|together with|along with|further|what is more|on top of that)\b/gi,

      // 4. Conditional (koşul)
      /\b(if|unless|provided that|providing that|as long as|so long as|in case|whether|on condition that|supposing|suppose|given that|assuming that|in the event that|only if|even if)\b/gi,

      // 5. Temporal / Sequence / Time (zamanlama, sıralama)
      /\b(before|after|then|next|afterwards|subsequently|previously|earlier|later|meanwhile|simultaneously|at the same time|finally|eventually|first|second|third|lastly|soon|immediately|until|since|as soon as|once|whenever|while|during|in the meantime)\b/gi,

      // 6. Comparison / Similarity (karşılaştırma - benzerlik vurgusu)
      /\b(like|as|similar to|comparable to|in comparison with|in the same way|manner|fashion|equally|likewise|correspondingly|analogously|just as|in like manner)\b/gi
    ]
  },
  passives: {
    label: 'Edilgen Yapı (Passive)',
    color: 'bg-blue-200 text-blue-900 border-blue-300',
    patterns: [
        /\b(is|am|are|was|were|be|been|being)(\s+[a-z]+)?\s+([a-z]+ed|known|seen|found|made|taken|given|built|shown|kept|told|written|done|gone|broken|set|understood|held|meant|led|bought|brought|caught|thought|felt|said|read|paid|met|lost|won)\b/gi
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
let foLastImgQuestionId = null;
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
           <span><b>Görsel Hafıza:</b> Kelime sorularında kavramlara uygun görseller anlık olarak yüklenir.</span>
         </li>
         <li class="flex gap-3">
           <span class="w-6 h-6 rounded-full bg-indigo-200 flex items-center justify-center text-xs shrink-0">4</span>
           <span><b>Eş Anlamlı (Synonym):</b> Kelime sorularında şıklardaki kelimelerin üzerine tıklayarak anında eş anlamlılarını görebilirsiniz.</span>
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

  <div id="foExamScreen" class="hidden grid lg:grid-cols-12 gap-6 lg:gap-8 lg:h-[calc(100vh-250px)]">
    <!-- LEFT SIDEBAR: NAV & FOCUS CONTROLS -->
    <div class="order-2 lg:order-1 lg:col-span-3 space-y-6 lg:overflow-y-auto pr-0 lg:pr-2 custom-scrollbar">
       <div class="bg-slate-900 rounded-3xl p-5 lg:p-6 text-white shadow-xl">
          <div class="flex items-center justify-between mb-6">
            <span id="foQNum" class="text-xl lg:text-2xl font-black">1/80</span>
            <div class="bg-red-800/20 text-red-400 px-3 py-1 rounded-lg text-[10px] lg:text-xs font-bold border border-red-800/30">
              <i class="fas fa-clock mr-1"></i> <span id="foTimer">180:00</span>
            </div>
          </div>
          
          <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">Odak Filtreleri</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2 mb-8">
            ${Object.keys(FOCUS_CATEGORIES).map(k => `
              <label class="flex items-center justify-between p-2 lg:p-3 rounded-xl bg-slate-800/50 border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors">
                <span class="text-[10px] lg:text-xs font-semibold text-slate-300">${FOCUS_CATEGORIES[k].label}</span>
                <input type="checkbox" checked onchange="toggleFocusType('${k}')" class="w-4 h-4 accent-indigo-500">
              </label>
            `).join('')}
          </div>

          <button onclick="foFinishConfirm()" class="w-full py-3 lg:py-4 bg-red-800 text-white rounded-2xl font-black text-xs lg:text-sm uppercase tracking-widest hover:bg-red-700 transition-all">
            Sınavı Bitir
          </button>
       </div>

       <div id="foQuestionNav" class="grid grid-cols-10 lg:grid-cols-5 gap-1.5 lg:gap-2">
         <!-- Question Map injected here -->
       </div>
    </div>

    <!-- MAIN CONTENT: QUESTION & PASSAGE -->
    <div class="order-1 lg:order-2 lg:col-span-9 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden min-h-[400px]">
       <div id="foSectionHeader" class="px-5 lg:px-8 py-3 lg:py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <span id="foSectionTitle" class="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest">VOCABULARY</span>
          <div class="flex gap-2">
            <button onclick="foNavQuestion(-1)" class="w-7 h-7 lg:w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100"><i class="fas fa-chevron-left text-[10px] mr-0.5"></i></button>
            <button onclick="foNavQuestion(1)" class="w-7 h-7 lg:w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100"><i class="fas fa-chevron-right text-[10px] ml-0.5"></i></button>
          </div>
       </div>
       
       <div class="flex-1 lg:overflow-y-auto p-5 lg:p-10 custom-scrollbar">
          <div id="foContentArea" class="flex flex-col lg:flex-row gap-6 lg:gap-10">
             <div id="foPassagePane" class="hidden lg:w-1/2 bg-blue-50/30 p-5 lg:p-8 rounded-2xl lg:rounded-3xl border border-blue-100/50 text-slate-700 leading-relaxed text-sm overflow-y-auto max-h-[300px] lg:max-h-[500px]">
             </div>
             <div id="foQuestionPane" class="flex-1 space-y-6 lg:space-y-8">
                <div id="foVocabImage" class="hidden mb-6 lg:mb-8">
                  <div class="max-w-xs lg:max-w-md mx-auto relative group">
                    <div class="w-full h-48 lg:h-64 rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl border-4 border-white bg-slate-100 relative">
                       <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
                       <div id="foVocabImageContent" class="w-full h-full"> 
                         <div class="w-full h-full animate-pulse flex items-center justify-center text-slate-300">
                           <i class="fas fa-image text-3xl lg:text-4xl"></i>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
                <h3 id="foQuestionText" class="text-lg lg:text-xl font-bold text-slate-800 leading-tight">...</h3>
                <div id="foOptions" class="space-y-2.5 lg:space-y-3">
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

  <div id="foWordModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm hidden items-center justify-center z-[200] p-4 overflow-y-auto">
      <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
          <div class="p-8 lg:p-10 text-black">
              <div class="flex justify-between items-start mb-8">
                  <div>
                      <h2 id="foModalWord" class="text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tighter italic">WORD</h2>
                      <p id="foModalIpa" class="text-slate-400 font-mono mt-2 text-sm">// ... //</p>
                  </div>
                  <button onclick="foCloseWordModal()" class="w-10 h-10 lg:w-12 h-12 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">
                      <i class="fas fa-times"></i>
                  </button>
              </div>
              <div id="foModalContent" class="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  <!-- Word info cards injected here -->
              </div>
              <div class="mt-8">
                  <button onclick="foCloseWordModal()" class="w-full px-8 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-xs">KAPAT</button>
              </div>
          </div>
      </div>
  </div>

  <!-- Image Modal -->
  <div id="foImageModal" class="fixed inset-0 bg-black/90 backdrop-blur-md hidden items-center justify-center z-[300] p-4" onclick="foCloseImageModal()">
      <div class="relative max-w-4xl w-full">
          <button onclick="foCloseImageModal()" class="absolute -top-12 right-0 text-white text-3xl hover:text-red-500 transition-colors">
              <i class="fas fa-times"></i>
          </button>
          <img id="foModalFullImage" src="" class="w-full h-auto rounded-3xl shadow-2xl border-4 border-white/10 animate-in zoom-in duration-300">
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
  foLastImgQuestionId = null;
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
      passagePane.innerHTML = foClickableText(passage.text);
      passagePane.classList.remove('hidden');
    } else {
      passagePane.classList.add('hidden');
    }
  } else {
    passagePane.classList.add('hidden');
  }

  // Question Text with Highlights & Interactive Words
  questionText.innerHTML = foClickableText(q.question);

  // Vocabulary Image Logic
  const isVocab = q.section_id && q.section_id.toLowerCase().includes('vocab');
  if (isVocab) {
    vocabImage.classList.remove('hidden');
    fetchUnsplashImage(q.correct_word || q.options[q.correct], q.id);
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
    btn.className = `group w-full p-5 rounded-2xl border-2 text-left transition-all font-semibold relative overflow-hidden ${borderClass}`;
    
    // Check if we should show synonym lookup
    const isVocab = q.section_id && q.section_id.toLowerCase().includes('vocab');
    
    btn.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <span class="inline-block w-8 h-8 rounded-lg ${badgeClass} flex items-center justify-center mr-4 text-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">${key}</span> 
          <span class="${isVocab ? 'cursor-help hover:text-indigo-600 border-b border-transparent hover:border-indigo-300' : ''}" 
                onclick="${isVocab ? `foShowSynonym('${q.options[key].replace(/'/g, "\\'")}', event, '${q.id}-${key}')` : ''}">
            ${applyHighlights(q.options[key])}
          </span>
        </div>
        <div id="syn-${q.id}-${key}" class="hidden text-xs text-indigo-500 font-bold bg-indigo-50 px-3 py-1 rounded-full animate-in zoom-in duration-300"></div>
      </div>
    `;
    
    if (!foReviewMode) {
        btn.onclick = (e) => {
          // Prevent selection if user clicked the word for synonym
          if (e.target.closest('[onclick*="foShowSynonym"]')) return;
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

async function foShowSynonym(word, event, targetId) {
  if (event) event.stopPropagation();
  const target = document.getElementById(`syn-${targetId}`);
  if (!target) return;

  // Toggle if already visible
  if (!target.classList.contains('hidden')) {
    target.classList.add('hidden');
    return;
  }

  target.innerText = '...';
  target.classList.remove('hidden');

  try {
    const res = await fetch(`https://api.datamuse.com/words?rel_syn=${word.toLowerCase().trim()}&max=1`);
    const data = await res.json();
    if (data && data.length > 0) {
      target.innerText = `≈ ${data[0].word}`;
    } else {
      target.innerText = 'No synonym found';
      setTimeout(() => target.classList.add('hidden'), 2000);
    }
  } catch (err) {
    target.classList.add('hidden');
  }
}

function foClickableText(text) {
  if (!text) return "";
  
  // First apply semantic highlights
  let highlighted = applyHighlights(text);
  
  // Then wrap words in clickable spans, being careful not to break the HTML tags we just added
  const parts = highlighted.split(/(<[^>]+>|[\s,.!?;:()"]+)/);
  return parts.map(part => {
    if (part.startsWith('<') || /[\s,.!?;:()"]+/.test(part)) return part;
    if (part.trim().length === 0) return part;
    return `<span onclick="foShowWordDetails('${part.replace(/'/g, "\\'")}')" class="cursor-pointer hover:bg-yellow-200/50 hover:text-slate-900 rounded transition-colors">${part}</span>`;
  }).join('');
}

async function foShowWordDetails(word) {
  const modal = document.getElementById('foWordModal');
  const wordEl = document.getElementById('foModalWord');
  const ipaEl = document.getElementById('foModalIpa');
  const contentEl = document.getElementById('foModalContent');
  
  wordEl.innerText = word;
  ipaEl.innerText = "Sözlük aranıyor...";
  contentEl.innerHTML = '<div class="flex justify-center p-12"><i class="fas fa-spinner fa-spin text-3xl text-indigo-500"></i></div>';
  
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  
  try {
    // Attempt local API or Dictionary API
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
    if (res.ok) {
        const data = await res.json();
        const first = data[0];
        ipaEl.innerText = first.phonetic || '// ... //';
        
        contentEl.innerHTML = first.meanings.map(m => `
          <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <p class="text-[10px] uppercase font-black text-indigo-500 mb-2">${m.partOfSpeech}</p>
            <p class="text-slate-800 font-medium italic mb-2">${m.definitions[0].definition}</p>
            ${m.definitions[0].example ? `<p class="text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-100 mt-3 italic">"${m.definitions[0].example}"</p>` : ''}
          </div>
        `).join('');
    } else {
       ipaEl.innerText = "";
       contentEl.innerHTML = `<div class="p-8 text-center text-slate-400 italic">Sözlük verisi bulunamadı, ancak bu kelime kritik olabilir.</div>`;
    }
  } catch(e) {
    contentEl.innerHTML = "Bir hata oluştu.";
  }
}

function foCloseWordModal() {
  const modal = document.getElementById('foWordModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

window.foOpenImageModal = function(url) {
    const modal = document.getElementById('foImageModal');
    const img = document.getElementById('foModalFullImage');
    if (!modal || !img) return;
    img.src = url;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.foCloseImageModal = function() {
    const modal = document.getElementById('foImageModal');
    if (modal) modal.classList.add('hidden');
};


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

function getVisualSearchTerm(word) {
  const map = {
    'exacerbate': 'worsen',
    'mitigate': 'relief',
    'sustainability': 'nature',
    'sustainably': 'nature',
    'unprecedented': 'unusual',
    'deteriorate': 'broken',
    'deterioration': 'ruins',
    'postpone': 'delay',
    'implement': 'worker',
    'mandatory': 'rule',
    'neglect': 'trash',
    'negligence': 'accident',
    'abundance': 'plenty',
    'scarcity': 'empty',
    'profound': 'deep',
    'controversial': 'protest',
    'consensus': 'agreement',
    'adversary': 'enemy',
    'alleviate': 'medicine',
    'accelerate': 'fast',
    'finalize': 'done',
    'substantial': 'large',
    'inconclusive': 'mystery',
    'obsolete': 'old',
    'foster': 'help',
    'irreversible': 'broken',
    'biodiversity': 'jungle',
    'phenomena': 'nebula',
    'milestone': 'road',
    'integrity': 'shaking hands',
    'radically': 'extreme',
    'radical': 'extreme',
    'root': 'base',
    'dependence': 'chain',
    'dependency': 'chain',
    'lasting': 'eternal',
    'ultimately': 'finish line',
    'compelling': 'powerful',
    'ambiguous': 'confused',
    'prevalent': 'common',
    'negligible': 'small',
    'vague': 'fog',
    'aggravate': 'volcano',
    'jeopardize': 'danger',
    'adversely': 'bad weather',
    'scarcely': 'empty desert',
    'strategic': 'chess',
    'trivial': 'small object',
    'reluctantly': 'hesitate',
    'reluctant': 'hesitate',
    'precisely': 'arrow target',
    'inherently': 'organic',
    'subsequent': 'stairs',
    'verify': 'check mark',
    'modify': 'tools',
    'clarify': 'light bulb',
    'assess': 'grading',
    'enhance': 'sparkle',
    'advocate': 'megaphone',
    'bias': 'scale',
    'coherent': 'puzzle',
    'decline': 'graph down',
    'discrete': 'separate',
    'fluctuate': 'waves',
    'inhibit': 'shield',
    'persist': 'marathon',
    'robust': 'mountain',
    'versatile': 'swiss knife',
    'widespread': 'map',
    'initially': 'start line',
    'intervention': 'helping hand',
    'exhaustion': 'tired',
    'entirely': 'full circle',
    'approximately': 'calculator',
    'considerable': 'huge',
    'indispensable': 'heart',
    'irrelevant': 'trash can',
    'reliable': 'locked safe',
    'vaguely': 'mist',
    'partially': 'slice',
    'eventually': 'finish line',
    'finally': 'finish line',
    'commence': 'start rocket',
    'launch': 'rocket',
    'abandon': 'deserted',
    'yield': 'harvest',
    'utility': 'tools',
    'vulnerable': 'fragile',
    'utilize': 'use',
    'uphold': 'pillar',
    'undergo': 'process',
    'transform': 'butterfly',
    'thrive': 'healthy plant',
    'suspend': 'pause',
    'surveillance': 'camera',
    'surplus': 'extra',
    'stimulate': 'brain spark',
    'scrutinize': 'magnifying glass',
    'rupture': 'crack',
    'rigid': 'stone',
    'restrain': 'rope',
    'resilient': 'spring',
    'reconcile': 'handshake',
    'random': 'dice',
    'prosper': 'gold',
    'prohibit': 'stop sign',
    'preclude': 'block',
    'perceive': 'eye',
    'paradigm': 'model',
    'obstacle': 'wall',
    'nurture': 'baby plant',
    'noteworthy': 'star',
    'norm': 'average',
    'mutate': 'alien',
    'manifest': 'show',
    'lucrative': 'money bag'
  };
  const lower = word.toLowerCase().trim();
  return map[lower] || lower;
}

async function fetchUnsplashImage(word, qId) {
  if (foLastImgQuestionId === qId) return; 
  foLastImgQuestionId = qId;

  const container = document.getElementById('foVocabImage');
  const content = document.getElementById('foVocabImageContent');
  if (!content || !container) return;

  // Show loader while fetching
  content.innerHTML = `<div class="w-full h-full animate-pulse flex items-center justify-center text-slate-300 bg-slate-100"><i class="fas fa-image text-4xl"></i></div>`;

  const searchTerm = getVisualSearchTerm(word);
  const accessKey = '0uDnN1Zl1YFXRG3vHAKgEZoTakXkCg65RV3LtgXiNcM';
  
  try {
    // 1. Attempt with simplified synonym
    let res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&per_page=1&client_id=${accessKey}`);
    let data = await res.json();

    // 2. Fallback to original word if simplified search failed
    if ((!data.results || data.results.length === 0) && searchTerm !== word.toLowerCase().trim()) {
      res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(word)}&per_page=1&client_id=${accessKey}`);
      data = await res.json();
    }

    if (data.results && data.results[0]) {
      const imgUrl = data.results[0].urls.regular;
      container.classList.remove('hidden');
      content.innerHTML = `<img src="${imgUrl}" onclick="window.foOpenImageModal('${imgUrl}')" class="w-full h-full object-cover animate-in fade-in duration-500 cursor-zoom-in hover:scale-105 transition-transform" />`;
    } else {
      // Both attempts failed
      container.classList.add('hidden');
    }
  } catch (err) {
    console.error("Image error:", err);
    container.classList.add('hidden');
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
