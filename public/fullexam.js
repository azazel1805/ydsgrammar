/* ============================================================
   fullexam.js  –  YDS Full Practice Exam Engine
   ============================================================ */

const FULL_EXAM_LIST = [
  { id: 'full1', label: 'Tam Deneme 1', file: '/exams/full/fullexam1.json' },
  { id: 'full2', label: 'Tam Deneme 2', file: '/exams/full/fullexam2.json' },
  { id: 'full3', label: 'Tam Deneme 3', file: '/exams/full/fullexam3.json' },
  { id: 'full4', label: 'Tam Deneme 4', file: '/exams/full/fullexam4.json' },
  { id: 'full5', label: 'Tam Deneme 5', file: '/exams/full/fullexam5.json' },
  { id: 'full6', label: 'Tam Deneme 6', file: '/exams/full/fullexam6.json' },
  { id: 'full7', label: 'Tam Deneme 7', file: '/exams/full/fullexam7.json' },
  { id: 'full8', label: 'Tam Deneme 8', file: '/exams/full/fullexam8.json' },
  { id: 'full9', label: 'Tam Deneme 9', file: '/exams/full/fullexam9.json' },
  { id: 'full10', label: 'Tam Deneme 10', file: '/exams/full/fullexam10.json' },
  { id: 'full11', label: 'Tam Deneme 11', file: '/exams/full/fullexam11.json' },
  { id: 'full12', label: 'Tam Deneme 12', file: '/exams/full/fullexam12.json' },
  { id: 'full13', label: 'Tam Deneme 13', file: '/exams/full/fullexam13.json' },
  { id: 'full14', label: 'Tam Deneme 14', file: '/exams/full/fullexam14.json' },
  { id: 'full15', label: 'Tam Deneme 15', file: '/exams/full/fullexam15.json' }
];

const FREE_EXAM_LIST = [
  { id: 'free1', label: 'Ücretsiz Deneme 1', file: '/exams/full/fullexam16.json' },
  { id: 'free2', label: 'Ücretsiz Deneme 2', file: '/exams/full/fullexam17.json' },
  { id: 'free3', label: 'Ücretsiz Deneme 3', file: '/exams/full/fullexam18.json' },
  { id: 'free4', label: 'Ücretsiz Deneme 4', file: '/exams/full/fullexam19.json' },
  { id: 'free5', label: 'Ücretsiz Deneme 5', file: '/exams/full/fullexam20.json' },
  { id: 'free6', label: 'Ücretsiz Deneme 6', file: '/exams/full/fullexam21.json' },
  { id: 'free7', label: 'Ücretsiz Deneme 7', file: '/exams/full/fullexam22.json' },
  { id: 'free8', label: 'Ücretsiz Deneme 8', file: '/exams/full/fullexam23.json' },
  { id: 'free9', label: 'Ücretsiz Deneme 9', file: '/exams/full/fullexam24.json' },
  { id: 'free10', label: 'Ücretsiz Deneme 10', file: '/exams/full/fullexam25.json' }
];

const FREE_MINI_EXAM_LIST = [
  { id: 'fmini1', label: 'Ücretsiz Mini 1', file: '/exams/mini/freemini1.json' },
  { id: 'fmini2', label: 'Ücretsiz Mini 2', file: '/exams/mini/freemini2.json' },
  { id: 'fmini3', label: 'Ücretsiz Mini 3', file: '/exams/mini/freemini3.json' },
  { id: 'fmini4', label: 'Ücretsiz Mini 4', file: '/exams/mini/freemini4.json' },
  { id: 'fmini5', label: 'Ücretsiz Mini 5', file: '/exams/mini/freemini5.json' }
];

// ── State ────────────────────────────────────────────────────
let feExamData = null;
let feAnswers = {};          // { questionId: 'A' }
let feTimerRef = null;
let feSecondsLeft = 0;
let feStarted = false;
let feCurrentIdx = 0;

// ── HTML Templates ───────────────────────────────────────────

function getSelectorHTML(sections, title, isPremium) {
  const icon = isPremium ? 'fa-crown text-yellow-500' : 'fa-gift text-green-500';
  const headerLabel = isPremium ? 'Premium Deneme Merkezi' : 'Ücretsiz Deneme Merkezi';
  const gradient = isPremium ? 'from-red-800 to-red-900' : 'from-green-700 to-green-800';
  const badgeClass = isPremium ? 'bg-red-800' : 'bg-green-700';
  const startBtnGradient = isPremium ? 'from-red-800 to-red-700 shadow-red-900/40' : 'from-green-700 to-green-600 shadow-green-900/40';

  // If sections is a simple list, normalize it to categorical format
  let categoricalSections = (Array.isArray(sections) && sections.length > 0 && sections[0].list) ? sections : [{ title: title, list: sections, qCount: 80, duration: 180 }];

  return /* html */`
<div class="max-w-5xl mx-auto px-4 py-10">
  <div class="text-center mb-10">
    <div class="inline-flex items-center gap-3 bg-gradient-to-r ${gradient} text-white px-6 py-3 rounded-2xl shadow-xl mb-6">
      <i class="fas ${icon} text-xl"></i>
      <span class="font-bold text-lg tracking-wide" style="font-family:'Playfair Display',serif;">${headerLabel}</span>
    </div>
    <h2 class="text-3xl font-extrabold text-slate-800 mb-2" style="font-family:'Playfair Display',serif;">${title}</h2>
    <p class="text-slate-500 text-sm">YDS ve YDT zorluk seviyesinde denemeler.</p>
  </div>

  <div class="space-y-12">
    ${categoricalSections.map(sec => `
    <section>
      <div class="flex items-center gap-3 mb-6">
        <div class="h-8 w-1 ${badgeClass} rounded-full"></div>
        <h3 class="text-xl font-bold text-slate-800">${sec.title} (${sec.qCount} Soru)</h3>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        ${sec.list.map(e => `
          <div onclick="feSelectExam('${e.id}', this)" id="feCard-${e.id}"
            class="fe-exam-card cursor-pointer border-2 border-slate-200 rounded-2xl p-6 hover:border-red-300 hover:shadow-lg transition-all group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative z-10">
              ${isPremium ? `
              <button onclick="event.stopPropagation(); feDownloadPDF('${e.id}')" 
                class="absolute top-0 right-0 p-2.5 bg-white border border-slate-100 rounded-xl text-red-800 hover:bg-red-800 hover:text-white transition-all shadow-sm z-20 group/pdf" 
                title="PDF Olarak İndir">
                <i class="fas fa-file-pdf"></i>
              </button>` : ''}
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 rounded-xl ${badgeClass} flex items-center justify-center text-white shadow-lg">
                  <i class="fas fa-file-alt text-lg"></i>
                </div>
                <div>
                  <p class="font-bold text-slate-800 text-lg">${e.label}</p>
                  <p class="text-xs text-slate-400 font-semibold tracking-wide">${sec.qCount} SORU · ${sec.duration} DAKİKA</p>
                </div>
              </div>
              <div class="flex gap-2 flex-wrap text-xs text-slate-500">
                <span class="bg-red-50 text-red-700 font-bold px-2 py-1 rounded-md border border-red-100 italic">Gerçek Sınav Formatı</span>
                <span class="bg-slate-100 px-2 py-1 rounded-md">Tüm Bölümler</span>
              </div>
            </div>
          </div>`).join('')}
      </div>
    </section>
    `).join('')}

    <div class="feSelectedInfo hidden bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-start gap-4 shadow-2xl">
      <div class="w-12 h-12 rounded-full ${badgeClass} flex items-center justify-center shrink-0">
        <i class="fas fa-info-circle text-white text-xl"></i>
      </div>
      <div>
        <p class="font-bold text-white text-lg mb-1">Hazır mısınız?</p>
        <p class="text-slate-400 text-sm leading-relaxed">Sınav başladığında zamanlayıcı çalışmaya başlayacaktır. Seçtiğiniz sınavın tüm bölümlerini bitirdiğinizden emin olun.</p>
      </div>
    </div>

    <div class="flex justify-center pb-10">
      <button onclick="feStartExam(this)" disabled
        class="feStartBtn px-12 py-5 bg-gradient-to-r ${startBtnGradient} text-white rounded-2xl font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 flex items-center gap-4">
        <i class="fas fa-play-circle text-2xl"></i>
        SINAVI BAŞLAT
      </button>
    </div>
  </div>
</div>
`;
}

const engineHTML = /* html */`
<div class="max-w-5xl mx-auto px-4 py-10">
  <!-- Exam screen (hidden until started) -->
  <div id="feExamScreen" class="">

    <!-- Sticky top bar -->
    <div class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm mb-6 rounded-xl">
      <div class="flex items-center justify-between px-4 py-3 gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:block">Soru</span>
          <span id="feQNum" class="font-extrabold text-red-800 text-lg">---</span>
          <div class="h-4 w-px bg-slate-200 hidden sm:block"></div>
          <span id="feAnsweredCount" class="text-xs text-slate-500 hidden sm:block">0 cevaplanmış</span>
        </div>
        <!-- Progress -->
        <div class="flex-1 max-w-xs hidden sm:block">
          <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div id="feProgressBar" class="h-full bg-gradient-to-r from-red-500 to-red-700 rounded-full transition-all" style="width:0%"></div>
          </div>
        </div>
        <!-- Timer -->
        <div class="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl font-mono font-bold text-sm shrink-0">
          <i class="fas fa-clock text-xs text-red-400"></i>
          <span id="feTimer">1:30:00</span>
        </div>
        <button onclick="feFinishConfirm()" class="bg-red-800 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-red-900 transition-colors shrink-0">
          Teslim Et
        </button>
      </div>
    </div>

    <!-- Two-column layout: question + nav grid -->
    <div class="flex gap-6 items-start">
      <!-- Question panel -->
      <div class="flex-1 min-w-0">
        <!-- Section label -->
        <div id="feSectionLabel" class="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-4 text-sm text-slate-600 font-medium leading-snug"></div>
        <!-- Passage/leading text -->
        <div id="fePassageBox" class="hidden bg-blue-50 border-l-4 border-blue-400 rounded-xl p-5 mb-4 text-sm text-slate-700 leading-relaxed overflow-y-auto max-h-[300px]"></div>
        <!-- Reading notice -->
        <div id="feReadingNotice" class="hidden bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 text-sm text-amber-700 flex items-center gap-2">
          <i class="fas fa-book text-amber-500"></i>
          <span>Bu soru için orijinal sınav kağıdındaki <strong id="fePassageTitle"></strong> metnini okuyunuz.</span>
        </div>
        <!-- Question -->
        <div id="feQuestion" class="font-semibold text-slate-800 text-base md:text-lg leading-relaxed mb-6"></div>
        <!-- Options -->
        <div id="feOptions" class="space-y-3"></div>
        <!-- Nav buttons -->
        <div class="flex justify-between mt-8">
          <button onclick="feNavQuestion(-1)" class="flex items-center gap-2 px-5 py-3 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 font-medium transition-colors">
            <i class="fas fa-arrow-left text-sm"></i> Önceki
          </button>
          <button onclick="feNavQuestion(1)" class="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors">
            Sonraki <i class="fas fa-arrow-right text-sm"></i>
          </button>
        </div>
      </div>
      <!-- Question grid sidebar -->
      <div class="w-48 shrink-0 hidden lg:block sticky top-28">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Sorular</p>
        <div id="feQGrid" class="grid grid-cols-5 gap-1.5"></div>
        <div class="mt-4 space-y-2 text-xs text-slate-500">
          <div class="flex items-center gap-2"><div class="w-4 h-4 rounded bg-green-500"></div><span>Cevaplanmış</span></div>
          <div class="flex items-center gap-2"><div class="w-4 h-4 rounded bg-red-800"></div><span>Aktif</span></div>
          <div class="flex items-center gap-2"><div class="w-4 h-4 rounded bg-slate-200"></div><span>Cevaplanmamış</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Results screen -->
  <div id="feResultScreen" class="hidden">
    <div class="text-center mb-10">
      <div class="w-40 h-40 rounded-full border-8 border-red-100 mx-auto flex flex-col items-center justify-center mb-6 relative">
        <div id="feScoreCircle" class="absolute inset-0 rounded-full" style="background: conic-gradient(#991b1b 0%, #e5e7eb 0%)"></div>
        <div class="relative z-10 text-center">
          <div id="feScoreNum" class="text-4xl font-extrabold text-red-800"></div>
          <div id="feScoreTotal" class="text-xs text-slate-400 font-semibold"></div>
        </div>
      </div>
      <h3 class="text-2xl font-extrabold text-slate-800 mb-1" style="font-family:'Playfair Display',serif;">Sonuçlarınız</h3>
      <p id="feScoreMsg" class="text-slate-500 text-sm"></p>
    </div>
    <div id="feSectionBreakdown" class="grid sm:grid-cols-2 gap-4 mb-8"></div>
    <div class="flex flex-wrap justify-center gap-4">
      <button onclick="feReviewAnswers()" class="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors flex items-center gap-2">
        <i class="fas fa-search"></i> Cevapları İncele
      </button>
      <button onclick="feResetExam()" class="px-8 py-3 border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center gap-2">
        <i class="fas fa-redo"></i> Yeni Deneme
      </button>
    </div>
  </div>
</div>
`;

const fullExamHTML = getSelectorHTML(FULL_EXAM_LIST, 'Özel Hazırlanmış Deneme Sınavları', true);
const freeExamsHTML = getSelectorHTML([
  { title: 'Full Denemeler', list: FREE_EXAM_LIST, qCount: 80, duration: 180 },
  { title: 'Mini Denemeler', list: FREE_MINI_EXAM_LIST, qCount: 40, duration: 90 }
], 'Ücretsiz Deneme Sınavları', false);

// ─── Init ────────────────────────────────────────────────────
function initFullExam() {
  const container = document.getElementById('tab-fullexam');
  if (container) {
    container.innerHTML = fullExamHTML;
  }
  
  const freeContainer = document.getElementById('tab-freeexams');
  if (freeContainer) {
    freeContainer.innerHTML = freeExamsHTML;
  }

  // Global engine injection (if not already there)
  const engineContainer = document.getElementById('globalFullExamContainer');
  if (engineContainer) {
    engineContainer.innerHTML = engineHTML;
  }
}

// ─── Exam card selection ─────────────────────────────────────
async function feSelectExam(id, cardEl) {
  // Clear all selections in both tabs
  document.querySelectorAll('.fe-exam-card').forEach(c => {
    c.classList.remove('border-red-500', 'shadow-lg', 'bg-red-50', 'border-red-300', 'bg-red-50/30', 'border-green-500', 'bg-green-50');
  });

  const isFree = id.startsWith('free');
  if (cardEl) {
    if (isFree) {
      cardEl.classList.add('border-green-500', 'shadow-lg', 'bg-green-50');
    } else {
      cardEl.classList.add('border-red-500', 'shadow-lg', 'bg-red-50');
    }
  }

  const parent = cardEl.closest('.tab-content');
  const info = parent.querySelector('.feSelectedInfo');
  const btn = parent.querySelector('.feStartBtn');

  if (info) info.classList.remove('hidden');
  if (btn) {
    btn.disabled = false;
    btn.dataset.selectedId = id;
  }
}

// ─── Start exam ──────────────────────────────────────────────
async function feStartExam(btn) {
  const examId = btn.dataset.selectedId;
  if (!examId) return;

  let exam = FULL_EXAM_LIST.find(e => e.id === examId) || 
             FREE_EXAM_LIST.find(e => e.id === examId) || 
             FREE_MINI_EXAM_LIST.find(e => e.id === examId) || 
             (typeof YDT_EXAM_LIST !== 'undefined' ? YDT_EXAM_LIST.find(e => e.id === examId) : null);
  if (!exam) {
    // Check miniexams if any
    if (typeof CATEGORICAL_MINI_LIST !== 'undefined') {
        for (const cat of CATEGORICAL_MINI_LIST) {
            exam = cat.exams.find(e => e.id === examId);
            if (exam) break;
        }
    }
  }
  if (!exam) return;

  const originalContent = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Yükleniyor...';
  btn.disabled = true;

  try {
    const res = await fetch(`${exam.file}?v=${new Date().getTime()}`);
    feExamData = await res.json();
  } catch (err) {
    alert('Sınav yüklenirken hata oluştu.');
    btn.innerHTML = originalContent;
    btn.disabled = false;
    return;
  }

  feAnswers = {};
  feCurrentIdx = 0;
  feSecondsLeft = feExamData.meta.duration_minutes * 60;
  feStarted = true;

  // Hide selector screen (all selectors)
  document.querySelectorAll('.tab-content').forEach(tc => {
      const selector = tc.querySelector('.max-w-5xl'); // This is the container we put in the tab
      if (selector) selector.classList.add('hidden');
  });

  // Show global engine
  document.getElementById('globalFullExamContainer').classList.remove('hidden');
  document.getElementById('feExamScreen').classList.remove('hidden');
  document.getElementById('feResultScreen').classList.add('hidden');

  feRenderQGrid();
  feRenderQuestion();
  feStartTimer();

  const container = document.getElementById('globalFullExamContainer');
  if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── Timer ───────────────────────────────────────────────────
function feStartTimer() {
  if (feTimerRef) clearInterval(feTimerRef);
  feTimerRef = setInterval(() => {
    feSecondsLeft--;
    feUpdateTimerDisplay();
    if (feSecondsLeft <= 0) {
      clearInterval(feTimerRef);
      feFinish();
    }
  }, 1000);
}

function feUpdateTimerDisplay() {
  const h = Math.floor(feSecondsLeft / 3600);
  const m = Math.floor((feSecondsLeft % 3600) / 60);
  const s = feSecondsLeft % 60;
  const el = document.getElementById('feTimer');
  if (!el) return;
  el.textContent = `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  if (feSecondsLeft < 600) {
    el.classList.add('text-red-400');
  } else {
    el.classList.remove('text-red-400');
  }
}

// ─── Render question ─────────────────────────────────────────
function feRenderQuestion() {
  if (!feExamData) return;
  const q = feExamData.questions[feCurrentIdx];
  if (!q) return;

  document.getElementById('feQNum').textContent = `${feCurrentIdx + 1}/${feExamData.questions.length}`;
  const answered = Object.keys(feAnswers).length;
  document.getElementById('feAnsweredCount').textContent = `${answered} cevaplanmış`;
  document.getElementById('feProgressBar').style.width = `${(answered / feExamData.questions.length) * 100}%`;

  const section = feExamData.sections.find(s => s.id === q.section_id);
  document.getElementById('feSectionLabel').textContent = section ? section.label : '';

  const passageBox = document.getElementById('fePassageBox');
  const readingNotice = document.getElementById('feReadingNotice');
  const passTitle = document.getElementById('fePassageTitle');

  passageBox.classList.add('hidden');
  readingNotice.classList.add('hidden');
  passageBox.innerHTML = '';

  const sectionType = (section ? section.id : '').toLowerCase();
  const isCloze = sectionType.includes('cloze');
  const isReading = sectionType.includes('reading');

  let passageText = "";
  if (q.passage_id && feExamData.passages) {
      const pObj = feExamData.passages.find(p => p.id === q.passage_id);
      if (pObj) passageText = pObj.text;
  }

  if (isCloze || isReading) {
      if (passageText) {
          const typeLabel = isCloze ? 'CLOZE TEST PARÇASI' : 'OKUMA PARÇASI';
          passageBox.innerHTML = `<div class="font-bold mb-2 text-blue-800 uppercase tracking-tighter text-xs">${typeLabel}</div>` + passageText.replace(/\n/g, '<br>');
          passageBox.classList.remove('hidden');
      }
  } else if (q.leading_text) {
      passageBox.innerHTML = q.leading_text.replace(/\n/g, '<br>');
      passageBox.classList.remove('hidden');
  }

  let qDisplay = q.question || "";
  if (isCloze) {
      qDisplay = `<b>SORU ${feCurrentIdx + 1}:</b> Boşluk için en uygun seçeneği bulun.`;
  } else if (isReading && passageText) {
      if (qDisplay.includes(passageText.substring(0, 50))) {
          qDisplay = qDisplay.replace(passageText.substring(0, 100), "").trim();
      }
      qDisplay = qDisplay.replace(/^PASSAGE\s+\d+:?\s*/i, '')
                         .replace(/^\(Cont\.\):?\s*/i, '')
                         .replace(/^Cont\.:?/i, '')
                         .replace(/\[Text as above\]/i, '')
                         .trim();
      
      if (!qDisplay || qDisplay.length < 3) {
          qDisplay = "Lütfen yukarıdaki metne göre soruyu cevaplayınız.";
      }
  }
  document.getElementById('feQuestion').innerHTML = qDisplay.replace(/\n/g, '<br>');

  const optBox = document.getElementById('feOptions');
  optBox.innerHTML = '';
  const userAnswer = feAnswers[q.id];
  Object.entries(q.options).forEach(([key, val]) => {
    const isSelected = userAnswer === key;
    const btn = document.createElement('button');
    btn.className = [
      'w-full text-left px-4 py-3 rounded-xl border-2 font-medium transition-all text-sm flex items-start gap-3 group',
      isSelected
        ? 'border-red-600 bg-red-50 text-red-800'
        : 'border-slate-200 bg-white hover:border-red-200 hover:bg-red-50 text-slate-700'
    ].join(' ');
    btn.innerHTML = `
          <span class="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold
            ${isSelected ? 'bg-red-700 border-red-700 text-white' : 'border-slate-300 text-slate-500 group-hover:border-red-400'}">${key}</span>
          <span class="leading-snug pt-0.5">${val}</span>`;
    btn.onclick = () => feSelectAnswer(q.id, key);
    optBox.appendChild(btn);
  });

  feUpdateQGrid();
}

function feSelectAnswer(qId, key) {
  feAnswers[qId] = key;
  feRenderQuestion();
}

function feNavQuestion(delta) {
  const newIdx = feCurrentIdx + delta;
  if (newIdx < 0 || newIdx >= feExamData.questions.length) return;
  feCurrentIdx = newIdx;
  
  if (!feStarted) feRenderReviewQuestion();
  else feRenderQuestion();

  const container = document.getElementById('globalFullExamContainer');
  if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function feJumpQuestion(idx) {
  feCurrentIdx = idx;
  
  if (!feStarted) feRenderReviewQuestion();
  else feRenderQuestion();

  const container = document.getElementById('globalFullExamContainer');
  if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function feRenderQGrid() {
  if (!feExamData) return;
  const grid = document.getElementById('feQGrid');
  if (!grid) return;
  grid.innerHTML = '';

  feExamData.questions.forEach((q, idx) => {
    const btn = document.createElement('button');
    btn.id = `feGridBtn-${idx}`;
    btn.className = 'w-7 h-7 rounded text-xs font-bold transition-all';
    btn.textContent = idx + 1;
    btn.onclick = () => feJumpQuestion(idx);
    grid.appendChild(btn);
  });
  feUpdateQGrid();
}

function feUpdateQGrid() {
  if (!feExamData) return;
  feExamData.questions.forEach((q, idx) => {
    const btn = document.getElementById(`feGridBtn-${idx}`);
    if (!btn) return;
    if (idx === feCurrentIdx) {
      btn.className = 'w-7 h-7 rounded text-xs font-bold bg-red-800 text-white';
    } else if (feAnswers[q.id]) {
      btn.className = 'w-7 h-7 rounded text-xs font-bold bg-green-500 text-white hover:bg-green-600';
    } else {
      btn.className = 'w-7 h-7 rounded text-xs font-bold bg-slate-200 text-slate-600 hover:bg-slate-300';
    }
  });
}

function feFinishConfirm() {
  const unanswered = feExamData.questions.length - Object.keys(feAnswers).length;
  const msg = unanswered > 0
    ? `${unanswered} soru cevaplanmamış. Yine de teslim etmek istiyor musunuz?`
    : 'Sınavı teslim etmek istiyor musunuz?';
  if (confirm(msg)) feFinish();
}

function feFinish() {
  if (feTimerRef) clearInterval(feTimerRef);
  feStarted = false;

  const questions = feExamData.questions;
  let total = 0;
  const sectionStats = {};

  feExamData.sections.forEach(s => {
    sectionStats[s.id] = {
      label: s.label.length > 55 ? s.label.substring(0, 52) + '...' : s.label,
      correct: 0,
      total: 0,
      from: s.from,
      to: s.to
    };
  });

  questions.forEach(q => {
    const sec = sectionStats[q.section_id];
    if (sec) sec.total++;
    if (String(feAnswers[q.id]) === String(q.correct)) {
      total++;
      if (sec) sec.correct++;
    }
  });

  document.getElementById('feExamScreen').classList.add('hidden');
  document.getElementById('feResultScreen').classList.remove('hidden');

  const qLen = questions.length;
  const pct = Math.round((total / qLen) * 100);
  document.getElementById('feScoreNum').textContent = total;
  document.getElementById('feScoreCircle').style.background =
    `conic-gradient(#991b1b ${pct * 3.6}deg, #e5e7eb ${pct * 3.6}deg)`;
  
  const scoreCircleSub = document.getElementById('feScoreTotal');
  if (scoreCircleSub) scoreCircleSub.textContent = `/${qLen}`;

  let msg = '';
  if (pct >= 80) msg = '🏆 Mükemmel! Gerçek YDS\'ye hazırsınız.';
  else if (pct >= 65) msg = '👏 Çok İyi! Biraz daha pratikle sınava hazır olacaksınız.';
  else if (pct >= 50) msg = '📚 İyi! Zayıf bölümlere odaklanmaya devam edin.';
  else msg = '💪 Başlangıç için iyi! Düzenli çalışmayla gelişeceksiniz.';
  document.getElementById('feScoreMsg').textContent = `${pct}% — ${msg}`;

  const breakdown = document.getElementById('feSectionBreakdown');
  breakdown.innerHTML = '';

  Object.entries(sectionStats).forEach(([id, s]) => {
    const sPct = s.total ? Math.round((s.correct / s.total) * 100) : 0;
    const color = sPct >= 70 ? 'bg-green-500' : sPct >= 50 ? 'bg-amber-400' : 'bg-red-500';
    breakdown.innerHTML += `
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs font-bold text-slate-600">${s.label} (${s.from}-${s.to})</span>
              <span class="text-sm font-extrabold ${sPct >= 70 ? 'text-green-600' : sPct >= 50 ? 'text-amber-600' : 'text-red-600'}">${s.correct}/${s.total}</span>
            </div>
            <div class="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div class="${color} h-full rounded-full transition-all" style="width:${sPct}%"></div>
            </div>
          </div>`;
  });

  if (typeof window.saveQuizScoreFirestore === "function") {
    const xp = total * 10;
    const topic = (feExamData && feExamData.meta) ? feExamData.meta.title : "Full Exam";
    window.saveQuizScoreFirestore(pct, xp, topic).then(() => {
        if (typeof updateGamification === "function") updateGamification();
        if (typeof initCharts === "function") setTimeout(initCharts, 1000);
    }).catch(console.error);
  }
}

function feReviewAnswers() {
  feCurrentIdx = 0;
  document.getElementById('feResultScreen').classList.add('hidden');
  document.getElementById('feExamScreen').classList.remove('hidden');
  feRenderReviewQuestion();

  const container = document.getElementById('globalFullExamContainer');
  if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function feRenderReviewQuestion() {
  if (!feExamData) return;
  const q = feExamData.questions[feCurrentIdx];
  if (!q) return;

  const section = feExamData.sections.find(s => s.id === q.section_id);
  document.getElementById('feSectionLabel').textContent = (section ? section.label : '') + ' [İNCELEME MODU]';
  document.getElementById('feQNum').textContent = `${feCurrentIdx + 1}/${feExamData.questions.length}`;

  const passageBox = document.getElementById('fePassageBox');
  const readingNotice = document.getElementById('feReadingNotice');
  const passTitle = document.getElementById('fePassageTitle');

  passageBox.classList.add('hidden');
  readingNotice.classList.add('hidden');

  if (q.leading_text) {
    passageBox.innerHTML = q.leading_text.replace(/\n/g, '<br>');
    passageBox.classList.remove('hidden');
  } else if (q.passage_id) {
    const passage = feExamData.passages.find(p => p.id === q.passage_id);
    if (passage && passage.text) {
      passageBox.innerHTML = passage.text.replace(/\n/g, '<br>');
      passageBox.classList.remove('hidden');
    } else if (passage) {
      passTitle.textContent = `"${passage.title}"`;
      readingNotice.classList.remove('hidden');
    }
  }

  document.getElementById('feQuestion').innerHTML = q.question.replace(/\n/g, '<br>');

  const optBox = document.getElementById('feOptions');
  optBox.innerHTML = '';
  const userAnswer = feAnswers[q.id];

  Object.entries(q.options).forEach(([key, val]) => {
    const isUser = userAnswer === key;
    const isCorrect = q.correct === key;
    let cls = 'w-full text-left px-4 py-3 rounded-xl border-2 font-medium text-sm flex items-start gap-3 ';
    if (isCorrect) cls += 'border-green-500 bg-green-50 text-green-800';
    else if (isUser) cls += 'border-red-400 bg-red-50 text-red-800';
    else cls += 'border-slate-200 bg-white text-slate-500';

    const icon = isCorrect ? '✓' : (isUser ? '✗' : key);
    const optEl = document.createElement('div');
    optEl.className = cls;
    optEl.innerHTML = `
          <span class="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold
            ${isCorrect ? 'bg-green-600 border-green-600 text-white' : isUser ? 'bg-red-500 border-red-500 text-white' : 'border-slate-300 text-slate-400'}">${icon}</span>
          <span class="leading-snug pt-0.5">${val}</span>`;
    optBox.appendChild(optEl);
  });
}

function feResetExam() {
  if (feTimerRef) clearInterval(feTimerRef);
  feExamData = null;
  feAnswers = {};
  feStarted = false;
  feCurrentIdx = 0;

  document.getElementById('globalFullExamContainer').classList.add('hidden');
  
  // Show all selectors again
  document.querySelectorAll('.tab-content').forEach(tc => {
      const selector = tc.querySelector('.max-w-5xl');
      if (selector) selector.classList.remove('hidden');
  });

  // Reset button states
  document.querySelectorAll('.feStartBtn').forEach(btn => {
      btn.disabled = true;
      delete btn.dataset.selectedId;
  });
  document.querySelectorAll('.feSelectedInfo').forEach(info => info.classList.add('hidden'));
  document.querySelectorAll('.fe-exam-card').forEach(c =>
    c.classList.remove('border-red-500', 'shadow-lg', 'bg-red-50', 'border-green-500', 'bg-green-50'));
}

// ─── PDF Generation ──────────────────────────────────────────
async function feDownloadPDF(id) {
  let exam = FULL_EXAM_LIST.find(e => e.id === id);
  if (!exam) return;

  const btn = event.currentTarget;
  const originalIcon = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  btn.disabled = true;

  try {
    const res = await fetch(`${exam.file}?v=${new Date().getTime()}`);
    const data = await res.json();

    const printWindow = window.open('', '_blank');
    let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>${data.meta.title} - yds.monster</title>
        <meta charset="UTF-8">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lora:ital,wght@0,400;0,700;1,400&display=swap');
            body { font-family: 'Lora', serif; padding: 40px; color: #1a1a1a; line-height: 1.6; background: #fff; position: relative; }
            
            /* Watermark */
            body::before {
                content: 'yds.monster';
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(-45deg);
                font-size: 150px;
                color: rgba(153, 27, 27, 0.03);
                z-index: -1;
                pointer-events: none;
                white-space: nowrap;
                font-family: 'Playfair Display', serif;
            }

            .header { text-align: center; border-bottom: 3px solid #991b1b; padding-bottom: 20px; margin-bottom: 40px; }
            .logo { font-family: 'Playfair Display', serif; font-size: 28px; color: #991b1b; font-weight: bold; }
            .exam-title { font-size: 22px; font-weight: bold; margin-top: 10px; color: #000; }
            .meta { font-size: 13px; color: #666; margin-top: 8px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
            
            .content { columns: 1; column-gap: 40px; }
            
            .section-title { 
                background: #f1f5f9; 
                border-left: 5px solid #991b1b; 
                padding: 12px 15px; 
                font-weight: bold; 
                margin: 40px 0 20px 0; 
                page-break-after: avoid;
                font-size: 16px;
                text-transform: uppercase;
            }
            
            .passage { 
                background: #f8fafc; 
                padding: 25px; 
                border: 1px solid #e2e8f0;
                border-radius: 4px; 
                margin-bottom: 25px; 
                font-size: 14px; 
                line-height: 1.8;
                page-break-inside: avoid;
                page-break-before: always; /* Force new page for passages */
                text-align: justify;
            }
            .passage-title { font-weight: bold; color: #991b1b; margin-bottom: 10px; font-size: 12px; }

            .question-item { margin-bottom: 30px; page-break-inside: avoid; border-bottom: 1px dashed #eee; padding-bottom: 15px; }
            .q-text { font-weight: bold; margin-bottom: 12px; font-size: 15px; }
            
            .options { display: block; }
            .option { font-size: 14px; margin-bottom: 6px; display: flex; gap: 10px; }
            .opt-key { font-weight: bold; min-width: 20px; }

            .answer-key-section { page-break-before: always; border-top: 2px solid #000; margin-top: 50px; padding-top: 30px; }
            .answer-key-title { font-family: 'Playfair Display', serif; font-size: 24px; text-align: center; margin-bottom: 30px; }
            .answer-grid { display: grid; grid-template-columns: repeat(10, 1fr); gap: 10px; text-align: center; font-size: 12px; }
            .answer-item { border: 1px solid #ddd; padding: 5px; }
            .answer-item b { color: #991b1b; }

            .footer { margin-top: 60px; text-align: center; font-size: 11px; color: #666; border-top: 1px solid #eee; padding-top: 20px; font-style: italic; }
            
            @media print {
                @page { margin: 1cm; }
                body { padding: 0; }
                .section-title { -webkit-print-color-adjust: exact; }
            }
        </style>
    </head>
    <body onafterprint="window.close()">
        <div class="header">
            <div class="logo">yds.monster</div>
            <div class="exam-title">${data.meta.title}</div>
            <div class="meta">${data.meta.total_questions} SORU | ${data.meta.duration_minutes} DAKİKA | ÖZGÜN DENEME SINAVI</div>
        </div>
        
        <div class="content">
            ${data.sections.map(section => {
              const questions = data.questions.filter(q => q.section_id === section.id);
              return `
                    <div class="section-title">${section.label} (Sorular ${section.from} - ${section.to})</div>
                    ${questions.map((q, qIndex) => {
                      let passageHtml = "";
                      if (q.passage_id) {
                        const prevQ = questions[qIndex - 1];
                        if (!prevQ || prevQ.passage_id !== q.passage_id) {
                          const passage = data.passages.find(p => p.id === q.passage_id);
                          if (passage) {
                            passageHtml = `
                                            <div class="passage">
                                                <div class="passage-title">OKUMA PARÇASI / CLOZE TEST</div>
                                                ${passage.text.replace(/\n/g, '<br>')}
                                            </div>`;
                          }
                        }
                      }

                      return `
                            ${passageHtml}
                            <div class="question-item">
                                <div class="q-text">${q.id}. ${q.question ? q.question.replace(/\n/g, '<br>') : "Boşluk için en uygun seçeneği bulunuz."}</div>
                                <div class="options">
                                    ${Object.entries(q.options).map(([key, val]) => `
                                        <div class="option">
                                            <span class="opt-key">${key})</span>
                                            <span>${val}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                `;
            }).join('')}
        </div>

        <div class="answer-key-section">
            <div class="answer-key-title">CEVAP ANAHTARI</div>
            <div class="answer-grid">
                ${data.questions.map(q => `
                    <div class="answer-item">
                        <span>${q.id}</span><br>
                        <b>${q.correct}</b>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="footer">
            Bu döküman yds.monster platformu tarafından Premium üyelerimize özel otomatik olarak oluşturulmuştur.<br>
            Ticari amaçla çoğaltılması ve paylaşılması yasaktır. &copy; 2026 yds.monster
        </div>
        
        <script>
            window.onload = function() {
                setTimeout(() => {
                    window.print();
                }, 1000);
            }
        </script>
    </body>
    </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();

  } catch (err) {
    console.error(err);
    alert('PDF oluşturulurken bir hata oluştu.');
  } finally {
    btn.innerHTML = originalIcon;
    btn.disabled = false;
  }
}

// Make everything global
window.initFullExam = initFullExam;
window.feSelectExam = feSelectExam;
window.feStartExam = feStartExam;
window.feNavQuestion = feNavQuestion;
window.feJumpQuestion = feJumpQuestion;
window.feFinishConfirm = feFinishConfirm;
window.feReviewAnswers = feReviewAnswers;
window.feResetExam = feResetExam;
window.feSelectAnswer = feSelectAnswer;
window.feDownloadPDF = feDownloadPDF;
