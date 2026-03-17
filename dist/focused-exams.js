/* ============================================================
   focused-exams.js  –  Focused YDS Exams with Color Mapping
   ============================================================ */

const FOCUSED_EXAM_LIST = [
  { id: 'focused1', label: 'Odaklı Deneme 1', file: '/exams/focused/focused1.json' },
  { id: 'focused2', label: 'Odaklı Deneme 2', file: '/exams/focused/focused2.json' },
  { id: 'focused3', label: 'Odaklı Deneme 3', file: '/exams/focused/focused3.json' },
  { id: 'focused4', label: 'Odaklı Deneme 4', file: '/exams/focused/focused4.json' },
  { id: 'focused5', label: 'Odaklı Deneme 5', file: '/exams/focused/focused5.json' },
  { id: 'focused6', label: 'Odaklı Deneme 6', file: '/exams/focused/focused6.json' },
  { id: 'focused7', label: 'Odaklı Deneme 7', file: '/exams/focused/focused7.json' },
  { id: 'focused8', label: 'Odaklı Deneme 8', file: '/exams/focused/focused8.json' },
  { id: 'focused9', label: 'Odaklı Deneme 9', file: '/exams/focused/focused9.json' },
  { id: 'focused10', label: 'Odaklı Deneme 10', file: '/exams/focused/focused10.json' }
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
        /\b(is|am|are|was|were|be|been|being)(\s+\w+)?\s+(done|made|taken|given|known|seen|found|shown|told|built|kept|held|meant|led|read|paid|met|lost|won|said|felt|set|put|cut|hit|hurt|let|cost|spread|split|cast|shut|brought|bought|caught|taught|thought|sought|fought|sold|told|paid|laid|stood|understood|withstood|bound|found|ground|wound|written|driven|ridden|risen|grown|blown|thrown|drawn|shown|flown|known|spoken|broken|chosen|frozen|stolen|woven|beaten|eaten|fallen|forgotten|forgiven|given|hidden|ridden|shaken|taken|woken|worn|born|become|come|run|begun|sung|drunk|swum|shrunk|sprung|hung|dug|stuck|struck|stung|clung|flung|slung|slung|won|left|felt|slept|kept|wept|crept|dealt|dreamt|learnt|meant|spelt|smelt|built|lent|sent|spent|bent|torn|sworn|borne|forbidden|forgone|overcome|undergone|undone|overthrown|overgrown|misunderstood|rewritten|reduced|produced|developed|created|designed|established|considered|believed|thought|expected|required|allowed|caused|improved|changed|increased|decreased|determined|reported|described|suggested|identified|included|involved|measured|observed|recorded|recognized|related|revealed|selected|studied|supported|tested|treated|used|valued|viewed|worked|adopted|applied|approved|collected|combined|compared|completed|conducted|confirmed|constructed|controlled|converted|covered|defined|demonstrated|derived|detected|distributed|documented|evaluated|examined|expanded|explained|generated|implemented|indicated|introduced|investigated|located|maintained|managed|modified|monitored|noted|obtained|organized|performed|prepared|presented|produced|provided|published|recorded|replaced|represented|required|resolved|restored|reviewed|scheduled|separated|stored|summarized|supplied|transferred|transformed|updated|utilized|validated|verified|visited|analyzed|characterized|classified|correlated|differentiated|estimated|formulated|generalized|hypothesized|interpreted|modeled|predicted|quantified|simulated|synthesized)\b/gi
    ]
  },
  tenses: {
    label: 'Zaman İpuçları',
    color: 'bg-emerald-200 text-emerald-900 border-emerald-300',
    patterns: [
      /\b(since|for|ago|lately|recently|so far|until now|up to now|already|just|yet|yesterday|tomorrow|today|tonight|next|last|currently|now|still|soon|eventually|immediately|instantly|suddenly|gradually|finally|initially|originally|previously|formerly|earlier|later|presently|nowadays|these days|in recent years|in recent decades|in the past|in the future|at present|at the moment|from time to time|once in a while|every now and then|all of a sudden|in the meantime|meanwhile|for the time being|in the long run|in the short term|in the near future|in the distant future|over time|throughout history|throughout the years|during the last decade|during the past century|in the coming years|in the following years|in the upcoming years)\b/gi,
      /\b(by the time|as soon as|once|whenever|when|while|before|after|until|till|as long as|the moment|the minute|the instant|immediately after|shortly after|shortly before|long before|long after|no sooner than|hardly when|scarcely when|every time|each time|the first time|the last time|by the moment|by the time that|as soon as possible|as soon as possible after|just as|even as|now that)\b/gi
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
<div class="max-w-[1400px] mx-auto px-2 lg:px-6 py-4 lg:py-6">
  <!-- MINI HEADER (Visible during exam) -->
  <div id="foMiniHeader" class="hidden flex flex-wrap items-center justify-between bg-white border border-slate-200 rounded-2xl p-3 mb-4 shadow-sm animate-in fade-in duration-500">
    <div class="flex items-center gap-3">
       <div class="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
         <i class="fas fa-bullseye"></i>
       </div>
       <div>
         <h2 class="text-sm font-black text-slate-800 leading-none mb-1">ODAKLI DENEME</h2>
         <p id="foMiniExamLabel" class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">YDS Deneme Sınavı</p>
       </div>
    </div>
    <div class="flex items-center gap-4">
       <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
          <span id="foMiniQ" class="text-xs font-black text-slate-700">1/80</span>
       </div>
       <div class="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-100 rounded-lg text-red-600">
          <i class="fas fa-clock text-xs"></i>
          <span id="foMiniTimer" class="text-xs font-black tracking-tighter">180:00</span>
       </div>
       <button onclick="foFinishConfirm()" class="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-red-700 transition-colors">BİTİR</button>
    </div>
  </div>

  <div id="foStartScreen" class="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
    <div class="text-center mb-8">
      <div class="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-xs font-bold mb-4">
        <i class="fas fa-sparkles"></i>
        <span>AKILLI ANALİZ VE RENK HARİTASI</span>
      </div>
      <h1 class="text-3xl lg:text-4xl font-black text-slate-900 mb-3 tracking-tight" style="font-family:'Playfair Display',serif;">Odaklı Sınav Merkezi</h1>
      <p class="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">Metinleri analiz ederek dil bilgisi yapılarını otomatik olarak işaretler, görsel hafıza desteğiyle kelime öğrenimini hızlandırır.</p>
    </div>

    <div class="grid lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8 space-y-4">
         <div class="flex items-center justify-between px-2">
            <h3 class="font-black text-slate-800 uppercase tracking-widest text-xs">Mevcut Denemeler</h3>
            <span class="text-[10px] text-slate-400 font-bold">${FOCUSED_EXAM_LIST.length} TOPLAM</span>
         </div>
         <div class="grid sm:grid-cols-2 gap-3">
           ${FOCUSED_EXAM_LIST.map(e => `
             <div onclick="foSelectExam('${e.id}')" id="foCard-${e.id}"
               class="fo-exam-card group cursor-pointer bg-white border border-slate-200 rounded-2xl p-4 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all relative overflow-hidden">
               <div class="flex items-center gap-4 relative z-10">
                  <div class="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                    <i class="fas fa-file-alt"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-800 group-hover:text-indigo-900 transition-colors">${e.label}</h4>
                    <p class="text-[9px] text-slate-400 font-bold tracking-widest uppercase">80 Soru · 180 Dakika</p>
                  </div>
               </div>
               <div class="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                  <i class="fas fa-arrow-right text-indigo-500"></i>
               </div>
             </div>
           `).join('')}
         </div>
      </div>

      <div class="lg:col-span-4 bg-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden">
         <div class="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <i class="fas fa-lightbulb text-6xl"></i>
         </div>
         <h4 class="text-lg font-black mb-6 flex items-center gap-2">
           <span class="w-2 h-6 bg-indigo-500 rounded-full"></span> Nasıl Çalışır?
         </h4>
         <div class="space-y-6">
            <div class="flex gap-4">
               <div class="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-[10px] shrink-0 font-bold">1</div>
               <p class="text-xs text-slate-300 leading-relaxed"><b class="text-white block mb-1">Renk Haritası:</b> Metindeki bağlaçlar $(\\color{orange}{orange})$, pasifler $(\\color{blue}{blue})$ ve zamanlar $(\\color{green}{green})$ otomatik boyanır.</p>
            </div>
            <div class="flex gap-4">
               <div class="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-[10px] shrink-0 font-bold">2</div>
               <p class="text-xs text-slate-300 leading-relaxed"><b class="text-white block mb-1">Görsel Destek:</b> Kelime sorularında kelimenin anlamını çağrıştıran görseller anında yüklenir.</p>
            </div>
            <div class="flex gap-4">
               <div class="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-[10px] shrink-0 font-bold">3</div>
               <p class="text-xs text-slate-300 leading-relaxed"><b class="text-white block mb-1">İnteraktif Sözlük:</b> Bilmediğiniz kelimeye tıklayarak anında Türkçe karşılığını görebilirsiniz.</p>
            </div>
         </div>
      </div>
    </div>
  </div>

  <div id="foExamScreen" class="hidden grid lg:grid-cols-12 gap-4 lg:h-[calc(100vh-180px)]">
    <!-- SIDEPANEL: COMPACT -->
    <div class="lg:col-span-1 order-2 lg:order-1 lg:flex flex-col gap-3 py-2">
       <div id="foQuestionNav" class="grid grid-cols-10 lg:grid-cols-2 gap-1.5 p-2 bg-white border border-slate-200 rounded-2xl lg:overflow-y-auto custom-scrollbar flex-1 shadow-sm">
         <!-- Question Dots -->
       </div>
    </div>

    <!-- MAIN CONTEXT -->
    <div class="lg:col-span-11 order-1 lg:order-2 grid lg:grid-cols-12 gap-4 h-full">
       <!-- LEFT: PASSAGE (if exists) -->
       <div id="foPassagePane" class="hidden lg:col-span-5 bg-indigo-50/20 border border-slate-200 rounded-3xl p-6 lg:p-8 overflow-y-auto leading-relaxed text-sm lg:text-base text-slate-700 custom-scrollbar shadow-sm">
          <!-- Passage text -->
       </div>

       <!-- RIGHT: QUESTION -->
       <div id="foQuestionContainer" class="lg:col-span-12 flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm relative">
          <div class="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
             <div class="flex items-center gap-2">
                <span id="foSectionTitle" class="text-[10px] font-black text-slate-400 uppercase tracking-widest">VOCABULARY</span>
                <span id="foQIndicator" class="text-[10px] font-black bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">Q1</span>
             </div>
             
             <!-- COMPACT FILTERS -->
             <div class="flex items-center gap-4">
               ${Object.keys(FOCUS_CATEGORIES).map(k => `
                 <label class="flex items-center gap-1.5 cursor-pointer group">
                   <div class="w-2.5 h-2.5 rounded-full ${FOCUS_CATEGORIES[k].color} border border-black/5"></div>
                   <span class="text-[9px] font-black text-slate-400 group-hover:text-slate-600 transition-colors uppercase tracking-tight">${FOCUS_CATEGORIES[k].label.split(' ')[0]}</span>
                   <input type="checkbox" checked onchange="toggleFocusType('${k}')" class="hidden-checkbox sr-only">
                 </label>
               `).join('')}
             </div>

             <div class="flex gap-2">
               <button onclick="foNavQuestion(-1)" class="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm active:scale-95"><i class="fas fa-chevron-left text-xs"></i></button>
               <button onclick="foNavQuestion(1)" class="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm active:scale-95"><i class="fas fa-chevron-right text-xs"></i></button>
             </div>
          </div>

          <div class="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
             <div class="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
                <!-- Image Container (Only for Vocab) -->
                <div id="foVocabImage" class="hidden lg:w-1/3 shrink-0">
                   <div class="aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative group">
                      <div id="foVocabImageContent" class="w-full h-full"></div>
                      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none text-white">
                        <i class="fas fa-search-plus text-2xl"></i>
                      </div>
                   </div>
                </div>

                <div class="flex-1 space-y-6">
                   <h3 id="foQuestionText" class="text-base lg:text-lg font-bold text-slate-800 leading-snug">...</h3>
                   <div id="foOptions" class="grid gap-2">
                     <!-- Options -->
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  </div>

  <div id="foResultScreen" class="hidden max-w-4xl mx-auto py-10 animate-in zoom-in duration-500">
    <div class="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl">
       <div class="bg-slate-900 p-12 text-center text-white relative">
          <div class="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-lg shadow-indigo-500/20">
            <i class="fas fa-trophy text-2xl"></i>
          </div>
          <h2 class="text-3xl font-black mb-2 uppercase tracking-tight">Sınav Tamamlandı</h2>
          <p id="foFinalLabel" class="text-indigo-400 text-xs font-bold uppercase tracking-widest">Odaklı YDS Denemesi</p>
       </div>
       <div class="p-8 lg:p-12">
          <div class="grid grid-cols-3 gap-6 mb-10">
             <div class="bg-slate-50 border border-slate-100 p-6 rounded-3xl text-center">
                <p class="text-[10px] uppercase font-black text-slate-400 mb-2">DOĞRU</p>
                <p id="foResCorrect" class="text-3xl font-black text-emerald-600">--</p>
             </div>
             <div class="bg-slate-50 border border-slate-100 p-6 rounded-3xl text-center">
                <p class="text-[10px] uppercase font-black text-slate-400 mb-2">YANLIŞ</p>
                <p id="foResWrong" class="text-3xl font-black text-red-600">--</p>
             </div>
             <div class="bg-slate-50 border border-slate-100 p-6 rounded-3xl text-center">
                <p class="text-[10px] uppercase font-black text-slate-400 mb-2">BAŞARI</p>
                <p id="foResScore" class="text-3xl font-black text-indigo-600">%--</p>
             </div>
          </div>
          <div class="flex flex-wrap items-center justify-center gap-4">
             <button onclick="foReset()" class="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all">Ana Menü</button>
             <button id="foReviewBtn" onclick="foStartReview()" class="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-700 hover:scale-105 shadow-xl shadow-indigo-200 transition-all">Sonuçları İncele</button>
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

  const miniLabel = document.getElementById('foMiniExamLabel');
  if (miniLabel) miniLabel.textContent = exam.label;

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
  foLastImgQuestionId = null;
  foSecondsLeft = (foExamData.meta.duration_minutes || 180) * 60;
  foStarted = true;
  foReviewMode = false;

  document.getElementById('foStartScreen').classList.add('hidden');
  document.getElementById('foResultScreen').classList.add('hidden');
  document.getElementById('foExamScreen').classList.remove('hidden');
  document.getElementById('foMiniHeader')?.classList.remove('hidden');

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
    const timeStr = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    
    const timerEl = document.getElementById('foTimer');
    if (timerEl) timerEl.textContent = timeStr;
    const miniTimer = document.getElementById('foMiniTimer');
    if (miniTimer) miniTimer.textContent = timeStr;
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
  document.getElementById('foMiniHeader')?.classList.add('hidden');
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
  const qNumText = `${foCurrentIdx + 1}/${foExamData.questions.length}`;
  
  const miniQ = document.getElementById('foMiniQ');
  if (miniQ) miniQ.textContent = qNumText;
  
  const qIndicator = document.getElementById('foQIndicator');
  if (qIndicator) qIndicator.textContent = `Q${foCurrentIdx + 1}`;

  const passagePane = document.getElementById('foPassagePane');
  const sectionTitle = document.getElementById('foSectionTitle');
  const questionText = document.getElementById('foQuestionText');
  const foOptions = document.getElementById('foOptions');
  const vocabImage = document.getElementById('foVocabImage');
  const questionContainer = document.getElementById('foQuestionContainer');

  if (sectionTitle) sectionTitle.textContent = q.section_id.toUpperCase().replace('_',' ');

  // Passage Display
  if (q.passage_id) {
    const passage = foExamData.passages.find(p => p.id === q.passage_id);
    if (passage) {
      passagePane.innerHTML = foClickableText(passage.text);
      passagePane.classList.remove('hidden');
      if (questionContainer) {
          questionContainer.classList.remove('lg:col-span-12');
          questionContainer.classList.add('lg:col-span-7');
      }
    } else {
      passagePane.classList.add('hidden');
      if (questionContainer) {
          questionContainer.classList.add('lg:col-span-12');
          questionContainer.classList.remove('lg:col-span-7');
      }
    }
  } else {
    passagePane.classList.add('hidden');
    if (questionContainer) {
        questionContainer.classList.add('lg:col-span-12');
        questionContainer.classList.remove('lg:col-span-7');
    }
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

  if (!modal) {
    // If modal is not in DOM (first-time fail-safe), we can't show it.
    // But we will inject it globally later.
    console.warn("foWordModal not found in DOM.");
    return;
  }

  wordEl.innerText = word;
  ipaEl.innerText = "Yükleniyor...";
  contentEl.innerHTML = '<div class="flex justify-center p-12"><i class="fas fa-spinner fa-spin text-3xl text-indigo-500"></i></div>';

  modal.classList.remove('hidden');
  modal.classList.add('flex');

  try {
    // 1. NLP Analiz (Turkish Translation) - "nlp yi kullan" isteği için
    const nlpPromise = fetch(`/.netlify/functions/nlpAnalyze`, {
      method: "POST",
      body: JSON.stringify({ text: word })
    }).then(res => res.json()).catch(() => ({}));

    // 2. Dictionary API (English Definitions)
    const dictPromise = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
      .then(res => res.ok ? res.json() : null).catch(() => null);

    const [nlpData, dictData] = await Promise.all([nlpPromise, dictPromise]);

    let html = "";

    // Add Turkish Translation Header if available
    if (nlpData && nlpData.translation) {
      html += `
            <div class="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 mb-6 flex items-center gap-4 animate-in slide-in-from-top-2 duration-500">
                <div class="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-emerald-200">
                    <i class="fas fa-language"></i>
                </div>
                <div>
                   <p class="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Türkçe Karşılık</p>
                   <p class="text-2xl font-black text-emerald-900 tracking-tight italic">${nlpData.translation}</p>
                </div>
            </div>
        `;
    }

    if (dictData && dictData.length > 0) {
      const first = dictData[0];
      ipaEl.innerText = first.phonetic || '// ... //';

      html += first.meanings.map(m => `
          <div class="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 mb-4">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-widest">${m.partOfSpeech}</span>
            </div>
            <p class="text-slate-800 font-medium leading-relaxed">${m.definitions[0].definition}</p>
            ${m.definitions[0].example ? `<div class="mt-4 p-4 bg-white/60 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500 italic">"${m.definitions[0].example}"</div>` : ''}
          </div>
        `).join('');
      contentEl.innerHTML = html;
    } else {
      ipaEl.innerText = "";
      contentEl.innerHTML = html + `<div class="p-8 text-center text-slate-400 italic">İngilizce tanımlar bulunamadı, ancak Türkçe karşılığı yukarıda görebilirsiniz.</div>`;
    }
  } catch (e) {
    contentEl.innerHTML = "Bir hata oluştu.";
  }
}

function foCloseWordModal() {
  const modal = document.getElementById('foWordModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

window.foOpenImageModal = function (url) {
  const modal = document.getElementById('foImageModal');
  const img = document.getElementById('foModalFullImage');
  if (!modal || !img) return;
  img.src = url;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.foCloseImageModal = function () {
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
    dot.textContent = idx + 1;
    dot.title = `Soru ${idx + 1}`;
    dot.onclick = () => foJump(idx);
    nav.appendChild(dot);
  });
}

function getVisualSearchTerm(word) {
  const map = {
    'abandon': 'deserted',
    'abundance': 'plenty',
    'accelerate': 'fast',
    'adversary': 'enemy',
    'adversely': 'bad weather',
    'advocate': 'megaphone',
    'aggravate': 'volcano',
    'alleviate': 'medicine',
    'allocate': 'distribution',
    'allocation': 'budget',
    'alter': 'change',
    'amend': 'edit',
    'ambiguous': 'confused',
    'anticipate': 'forecast',
    'anticipation': 'expectation',
    'appreciate': 'gratitude',
    'approximate': 'estimate',
    'approximately': 'calculator',
    'assess': 'grading',
    'attain': 'achievement',
    'attainment': 'trophy',
    'attribute': 'cause',
    'authority': 'government',
    'authorize': 'official stamp',
    'backlash': 'protest crowd',
    'barrier': 'wall barrier',
    'bias': 'scale',
    'biodiversity': 'jungle',
    'boost': 'rocket boost',
    'burden': 'heavy load',
    'capacity': 'container full',
    'cease': 'stop sign',
    'clarify': 'light bulb',
    'coherent': 'puzzle',
    'coincide': 'overlap circles',
    'coincidence': 'chance meeting',
    'collapse': 'fallen building',
    'collide': 'car crash',
    'commence': 'start rocket',
    'commonly': 'crowd',
    'compelling': 'powerful',
    'compensate': 'money payment',
    'compile': 'documents stack',
    'comply': 'agreement handshake',
    'consensus': 'agreement',
    'considerable': 'huge',
    'constrain': 'chains',
    'constraint': 'barrier',
    'contaminate': 'polluted water',
    'contamination': 'toxic waste',
    'contemplate': 'thinking person',
    'contradict': 'argument',
    'controversial': 'protest',
    'controversy': 'debate',
    'conventional': 'traditional clothes',
    'convey': 'message',
    'correlate': 'graph connection',
    'correlation': 'data chart',
    'crucial': 'key',
    'cumulative': 'stack',
    'curtail': 'cut scissors',
    'debris': 'ruins',
    'decay': 'rotten fruit',
    'decline': 'graph down',
    'deduce': 'detective',
    'deficiency': 'empty container',
    'definitive': 'final decision',
    'degrade': 'pollution',
    'deliberate': 'thinking deeply',
    'demographic': 'population map',
    'denote': 'symbol',
    'dependence': 'chain',
    'dependency': 'chain',
    'deplete': 'empty tank',
    'deploy': 'soldiers',
    'derive': 'formula',
    'designate': 'official label',
    'deteriorate': 'broken',
    'deterioration': 'ruins',
    'diminish': 'shrinking',
    'discrete': 'separate',
    'disrupt': 'chaos',
    'disruption': 'traffic jam',
    'diverge': 'fork road',
    'diversity': 'different people',
    'dominate': 'leader',
    'drain': 'empty pipe',
    'eliminate': 'cross mark',
    'emerge': 'sunrise',
    'empirical': 'experiment',
    'enforce': 'police law',
    'enhance': 'sparkle',
    'enhancement': 'upgrade',
    'ensure': 'safety check',
    'entirely': 'full circle',
    'erode': 'eroding cliff',
    'escalate': 'rising graph',
    'evade': 'escape',
    'eventually': 'finish line',
    'evident': 'clear evidence',
    'evolve': 'evolution',
    'exacerbate': 'worsen',
    'exclude': 'no entry',
    'exhaustion': 'tired',
    'expel': 'throw out',
    'exploit': 'resource mining',
    'facilitate': 'helping hands',
    'feasible': 'possible path',
    'finalized': 'done',
    'finally': 'finish line',
    'flaw': 'crack',
    'fluctuate': 'waves',
    'formulate': 'equation',
    'foster': 'help',
    'fragment': 'broken pieces',
    'generate': 'energy plant',
    'hinder': 'obstacle',
    'illustrate': 'diagram',
    'implement': 'worker',
    'impose': 'law order',
    'incline': 'slope',
    'inconclusive': 'mystery',
    'indispensable': 'heart',
    'induce': 'cause effect',
    'inevitable': 'destiny',
    'infer': 'detective clue',
    'infrastructure': 'city roads',
    'inherently': 'organic',
    'inhibit': 'shield',
    'initially': 'start line',
    'initiate': 'start button',
    'innovative': 'light bulb idea',
    'insight': 'brain idea',
    'integrate': 'puzzle pieces',
    'integrity': 'shaking hands',
    'interfere': 'signal noise',
    'intervene': 'stop fight',
    'intervention': 'helping hand',
    'intrinsic': 'core',
    'invoke': 'call',
    'irrelevant': 'trash can',
    'irreversible': 'broken',
    'isolate': 'lonely island',
    'jeopardize': 'danger',
    'lasting': 'eternal',
    'launch': 'rocket',
    'legitimate': 'official stamp',
    'likelihood': 'probability chart',
    'lucrative': 'money bag',
    'maintain': 'repair tools',
    'manifest': 'show',
    'manipulate': 'puppet strings',
    'mandatory': 'rule',
    'mediate': 'peace negotiation',
    'merge': 'two rivers',
    'migrate': 'birds flying',
    'milestone': 'road',
    'minimize': 'small arrow',
    'mitigate': 'relief',
    'modify': 'tools',
    'monitor': 'computer screen',
    'mutate': 'alien',
    'neglect': 'trash',
    'negligence': 'accident',
    'negligible': 'small',
    'neutral': 'balance scale',
    'norm': 'average',
    'noteworthy': 'star',
    'notion': 'idea bubble',
    'notwithstanding': 'despite sign',
    'numerous': 'many dots',
    'objective': 'target',
    'obsolete': 'old',
    'obstacle': 'wall',
    'offset': 'balance scale',
    'ongoing': 'progress bar',
    'optimize': 'gear system',
    'outcome': 'result chart',
    'overlap': 'venn diagram',
    'overwhelm': 'huge wave',
    'paradigm': 'model',
    'paradox': 'impossible stairs',
    'parameter': 'settings slider',
    'partially': 'slice',
    'perceive': 'eye',
    'peripheral': 'outer circle',
    'perpetuate': 'infinity loop',
    'persist': 'marathon',
    'phenomena': 'nebula',
    'plausible': 'possible scenario',
    'pose': 'question mark',
    'postpone': 'delay',
    'precede': 'before arrow',
    'precipitate': 'sudden event',
    'precisely': 'arrow target',
    'preclude': 'block',
    'predominant': 'majority crowd',
    'preliminary': 'draft paper',
    'presume': 'guess',
    'prevalent': 'common',
    'prevail': 'victory',
    'profound': 'deep',
    'profoundly': 'deep ocean',
    'prohibit': 'stop sign',
    'prominent': 'spotlight',
    'proportion': 'ratio chart',
    'prosper': 'gold',
    'prospect': 'future road',
    'protocol': 'rules document',
    'provoke': 'angry crowd',
    'pursue': 'running chase',
    'radical': 'extreme',
    'radically': 'extreme',
    'random': 'dice',
    'rational': 'logic brain',
    'reconcile': 'handshake',
    'refine': 'polishing',
    'reinforce': 'steel support',
    'reliable': 'locked safe',
    'relieve': 'relax',
    'reluctant': 'hesitate',
    'reluctantly': 'hesitate',
    'render': 'result',
    'resemble': 'similar faces',
    'resilient': 'spring',
    'restore': 'repair',
    'restrain': 'rope',
    'retain': 'hold',
    'retrieve': 'search',
    'reveal': 'curtain opening',
    'rigid': 'stone',
    'rigorous': 'strict teacher',
    'robust': 'mountain',
    'root': 'base',
    'rupture': 'crack',
    'scarcity': 'empty',
    'scarcely': 'empty desert',
    'scope': 'telescope',
    'scrutinize': 'magnifying glass',
    'segment': 'pie chart',
    'shift': 'arrow change',
    'significant': 'exclamation mark',
    'simulate': 'virtual reality',
    'sole': 'single',
    'stabilize': 'balance',
    'stimulate': 'brain spark',
    'strategic': 'chess',
    'structure': 'building frame',
    'subsequent': 'stairs',
    'substantial': 'large',
    'substitute': 'replacement',
    'sufficient': 'enough',
    'surplus': 'extra',
    'surveillance': 'camera',
    'survive': 'survivor',
    'suspend': 'pause',
    'sustain': 'support',
    'sustainability': 'nature',
    'sustainably': 'nature',
    'synchronize': 'clocks',
    'tackle': 'problem solving',
    'terminate': 'stop button',
    'thrive': 'healthy plant',
    'transform': 'butterfly',
    'trigger': 'switch',
    'trivial': 'small object',
    'ultimately': 'finish line',
    'undergo': 'process',
    'underlying': 'foundation',
    'understand': 'brain',
    'undertake': 'construction',
    'unify': 'unity circle',
    'unprecedented': 'unusual',
    'uphold': 'pillar',
    'utility': 'tools',
    'utilize': 'use',
    'vague': 'fog',
    'vaguely': 'mist',
    'versatile': 'swiss knife',
    'verify': 'check mark',
    'viable': 'growing plant',
    'virtually': 'digital world',
    'vulnerable': 'fragile',
    'widespread': 'map',
    'withstand': 'strong wall',
    'yield': 'harvest'
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
