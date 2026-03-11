/* ============================================================
   fullexam.js  –  YDS Full Practice Exam Engine
   ============================================================ */

const EXAM_LIST = [
  { id: 'mini1', label: 'Mini Deneme 1', file: '/exams/mini/miniexam1.json' },
  { id: 'mini2', label: 'Mini Deneme 2', file: '/exams/mini/miniexam2.json' },
  { id: 'mini3', label: 'Mini Deneme 3', file: '/exams/mini/miniexam3.json' },
  { id: 'mini4', label: 'Mini Deneme 4', file: '/exams/mini/miniexam4.json' },
  { id: 'mini5', label: 'Mini Deneme 5', file: '/exams/mini/miniexam5.json' },
  { id: 'mini6', label: 'Mini Deneme 6', file: '/exams/mini/miniexam6.json' },
  { id: 'mini7', label: 'Mini Deneme 7', file: '/exams/mini/miniexam7.json' },
  { id: 'mini8', label: 'Mini Deneme 8', file: '/exams/mini/miniexam8.json' },
  { id: 'mini9', label: 'Mini Deneme 9', file: '/exams/mini/miniexam9.json' },
  { id: 'mini10', label: 'Mini Deneme 10', file: '/exams/mini/miniexam10.json' },
  { id: 'mini11', label: 'Mini Deneme 11', file: '/exams/mini/miniexam11.json' },
  { id: 'mini12', label: 'Mini Deneme 12', file: '/exams/mini/miniexam12.json' },
  { id: 'mini13', label: 'Mini Deneme 13', file: '/exams/mini/miniexam13.json' },
  { id: 'mini14', label: 'Mini Deneme 14', file: '/exams/mini/miniexam14.json' },
  { id: 'mini15', label: 'Mini Deneme 15', file: '/exams/mini/miniexam15.json' },
  { id: 'mini16', label: 'Mini Deneme 16', file: '/exams/mini/miniexam16.json' },
  { id: 'mini17', label: 'Mini Deneme 17', file: '/exams/mini/miniexam17.json' },
  { id: 'mini18', label: 'Mini Deneme 18', file: '/exams/mini/miniexam18.json' },
  { id: 'mini19', label: 'Mini Deneme 19', file: '/exams/mini/miniexam19.json' },
  { id: 'mini20', label: 'Mini Deneme 20', file: '/exams/mini/miniexam20.json' },
  { id: 'mini21', label: 'Mini Deneme 21', file: '/exams/mini/miniexam21.json' },
  { id: 'mini22', label: 'Mini Deneme 22', file: '/exams/mini/miniexam22.json' },
  { id: 'mini23', label: 'Mini Deneme 23', file: '/exams/mini/miniexam23.json' },
  { id: 'mini24', label: 'Mini Deneme 24', file: '/exams/mini/miniexam24.json' },
  { id: 'mini25', label: 'Mini Deneme 25', file: '/exams/mini/miniexam25.json' }
];

// ── State ────────────────────────────────────────────────────
let feExamData = null;
let feAnswers = {};          // { questionId: 'A' }
let feTimerRef = null;
let feSecondsLeft = 0;
let feStarted = false;

// ── HTML injected into tab-fullexam ─────────────────────────
const fullExamHTML = /* html */`
<div class="max-w-5xl mx-auto px-4 py-10">

  <!-- Header card -->
  <div class="text-center mb-10">
    <div class="inline-flex items-center gap-3 bg-gradient-to-r from-red-800 to-red-900 text-white px-6 py-3 rounded-2xl shadow-xl mb-6">
      <i class="fas fa-bolt text-xl"></i>
      <span class="font-bold text-lg tracking-wide" style="font-family:'Playfair Display',serif;">YDS Mini Deneme</span>
    </div>
    <h2 class="text-3xl font-extrabold text-slate-800 mb-2" style="font-family:'Playfair Display',serif;">Mini YDS Deneme Sınavları</h2>
    <p class="text-slate-500 text-sm">40 soru · 90 dakika · Hızlı Pratik</p>
  </div>

  <!-- Exam selector -->
  <div id="feStartScreen" class="space-y-6">
    <div class="grid md:grid-cols-2 gap-4">
      ${EXAM_LIST.map(e => `
        <div onclick="feSelectExam('${e.id}')" id="feCard-${e.id}"
          class="fe-exam-card cursor-pointer border-2 border-slate-200 rounded-2xl p-6 hover:border-red-300 hover:shadow-lg transition-all group relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="relative z-10">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-800">
                <i class="fas fa-book-open"></i>
              </div>
              <div>
                <p class="font-bold text-slate-800">${e.label}</p>
                <p class="text-xs text-slate-400">40 Soru · 1.5 Saat</p>
              </div>
            </div>
            <div class="flex gap-2 flex-wrap text-xs text-slate-500">
              <span class="bg-slate-100 px-2 py-1 rounded-full">Kelime</span>
              <span class="bg-slate-100 px-2 py-1 rounded-full">Cümle Tamamlama</span>
              <span class="bg-slate-100 px-2 py-1 rounded-full">Okuma</span>
              <span class="bg-slate-100 px-2 py-1 rounded-full">Çeviri</span>
              <span class="bg-slate-100 px-2 py-1 rounded-full">Diyalog</span>
            </div>
          </div>
        </div>`).join('')}
    </div>

    <div id="feSelectedInfo" class="hidden bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
      <i class="fas fa-info-circle text-amber-600 mt-1 text-lg"></i>
      <div>
        <p class="font-semibold text-amber-800 mb-1">Sınav Bilgisi</p>
        <p class="text-sm text-amber-700">Sınav başladığında 90 dakikalık geri sayım başlar. Sınavı istediğiniz zaman teslim edebilirsiniz.</p>
      </div>
    </div>

    <div class="flex justify-center">
      <button id="feStartBtn" onclick="feStartExam()" disabled
        class="px-10 py-4 bg-gradient-to-r from-red-800 to-red-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-800/20 hover:shadow-red-800/40 hover:scale-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 flex items-center gap-3">
        <i class="fas fa-play"></i>
        Sınavı Başlat
      </button>
    </div>
  </div>

  <!-- Exam screen (hidden until started) -->
  <div id="feExamScreen" class="hidden">

    <!-- Sticky top bar -->
    <div class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm mb-6 rounded-xl">
      <div class="flex items-center justify-between px-4 py-3 gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:block">Soru</span>
          <span id="feQNum" class="font-extrabold text-red-800 text-lg">1/40</span>
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

        <!-- Passage/leading text (reading, dialogue, paragraph) -->
        <div id="fePassageBox" class="hidden bg-blue-50 border-l-4 border-blue-400 rounded-xl p-5 mb-4 text-sm text-slate-700 leading-relaxed"></div>

        <!-- Reading comprehension notice -->
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
          <div class="text-xs text-slate-400 font-semibold">/40</div>
        </div>
      </div>
      <h3 class="text-2xl font-extrabold text-slate-800 mb-1" style="font-family:'Playfair Display',serif;">Sonuçlarınız</h3>
      <p id="feScoreMsg" class="text-slate-500 text-sm"></p>
    </div>

    <!-- Section breakdown -->
    <div id="feSectionBreakdown" class="grid sm:grid-cols-2 gap-4 mb-8"></div>

    <!-- Buttons -->
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

// ─── Current question index ───────────────────────────────────
let feCurrentIdx = 0;

// ─── Init ────────────────────────────────────────────────────
function initFullExam() {
  const container = document.getElementById('tab-fullexam');
  if (!container) return;
  container.innerHTML = fullExamHTML;
}

// ─── Exam card selection ─────────────────────────────────────
async function feSelectExam(id) {
  document.querySelectorAll('.fe-exam-card').forEach(c => {
    c.classList.remove('border-red-500', 'shadow-lg', 'bg-red-50');
  });
  const card = document.getElementById(`feCard-${id}`);
  if (card) {
    card.classList.add('border-red-500', 'shadow-lg', 'bg-red-50');
  }
  document.getElementById('feSelectedInfo').classList.remove('hidden');
  document.getElementById('feStartBtn').disabled = false;
  document.getElementById('feStartBtn').dataset.selectedId = id;
}

// ─── Start exam ──────────────────────────────────────────────
async function feStartExam() {
  const btn = document.getElementById('feStartBtn');
  const examId = btn.dataset.selectedId;
  if (!examId) return;

  const exam = EXAM_LIST.find(e => e.id === examId);
  if (!exam) return;

  btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Yükleniyor...';
  btn.disabled = true;

  try {
    const res = await fetch(exam.file);
    feExamData = await res.json();
  } catch (err) {
    alert('Sınav yüklenirken hata oluştu.');
    btn.innerHTML = '<i class="fas fa-play"></i> Sınavı Başlat';
    btn.disabled = false;
    return;
  }

  feAnswers = {};
  feCurrentIdx = 0;
  feSecondsLeft = feExamData.meta.duration_minutes * 60;
  feStarted = true;

  document.getElementById('feStartScreen').classList.add('hidden');
  document.getElementById('feExamScreen').classList.remove('hidden');

  feRenderQGrid();
  feRenderQuestion();
  feStartTimer();
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
  }
}

// ─── Render question ─────────────────────────────────────────
function feRenderQuestion() {
  if (!feExamData) return;
  const q = feExamData.questions[feCurrentIdx];
  if (!q) return;

  // Qnum + progress
  document.getElementById('feQNum').textContent = `${feCurrentIdx + 1}/${feExamData.questions.length}`;
  const answered = Object.keys(feAnswers).length;
  document.getElementById('feAnsweredCount').textContent = `${answered} cevaplanmış`;
  document.getElementById('feProgressBar').style.width = `${(answered / feExamData.questions.length) * 100}%`;

  // Section label
  const section = feExamData.sections.find(s => s.id === q.section_id);
  document.getElementById('feSectionLabel').textContent = section ? section.label : '';

  // Passage / leading text / reading notice
  const passageBox = document.getElementById('fePassageBox');
  const readingNotice = document.getElementById('feReadingNotice');
  const passTitle = document.getElementById('fePassageTitle');

  passageBox.classList.add('hidden');
  readingNotice.classList.add('hidden');

  if (q.leading_text) {
    passageBox.textContent = q.leading_text;
    passageBox.classList.remove('hidden');
  } else if (q.passage_id) {
    const passage = feExamData.passages.find(p => p.id === q.passage_id);
    if (passage && passage.text) {
      passageBox.textContent = passage.text;
      passageBox.classList.remove('hidden');
    } else if (passage) {
      passTitle.textContent = `"${passage.title}"`;
      readingNotice.classList.remove('hidden');
    }
  }

  // Question text
  document.getElementById('feQuestion').textContent = q.question;

  // Options
  const optBox = document.getElementById('feOptions');
  optBox.innerHTML = '';
  const userAnswer = feAnswers[q.id];
  Object.entries(q.options).forEach(([key, val]) => {
    const isSelected = userAnswer === key;
    const btn = document.createElement('button');
    btn.id = `feOpt-${key}`;
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

  // Grid highlight
  feUpdateQGrid();
}

// ─── Select answer ───────────────────────────────────────────
function feSelectAnswer(qId, key) {
  feAnswers[qId] = key;
  feRenderQuestion();   // re-render with selection
}

// ─── Navigation ──────────────────────────────────────────────
function feNavQuestion(delta) {
  const newIdx = feCurrentIdx + delta;
  if (newIdx < 0 || newIdx >= feExamData.questions.length) return;
  feCurrentIdx = newIdx;
  feRenderQuestion();
  // Scroll to top of exam area
  document.getElementById('feExamScreen').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function feJumpQuestion(idx) {
  feCurrentIdx = idx;
  feRenderQuestion();
  document.getElementById('feExamScreen').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── Question grid ───────────────────────────────────────────
function feRenderQGrid() {
  if (!feExamData) return;
  const grid = document.getElementById('feQGrid');
  if (!grid) return;
  grid.innerHTML = '';

  feExamData.questions.forEach((q, idx) => {
    const btn = document.createElement('button');
    btn.id = `feGridBtn-${idx}`;
    btn.className = 'w-7 h-7 rounded text-xs font-bold transition-all';
    btn.textContent = q.id;
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

// ─── Finish confirmation ──────────────────────────────────────
function feFinishConfirm() {
  const unanswered = feExamData.questions.length - Object.keys(feAnswers).length;
  const msg = unanswered > 0
    ? `${unanswered} soru cevaplanmamış. Yine de teslim etmek istiyor musunuz?`
    : 'Sınavı teslim etmek istiyor musunuz?';
  if (confirm(msg)) feFinish();
}

// ─── Finish & show results ────────────────────────────────────
function feFinish() {
  if (feTimerRef) clearInterval(feTimerRef);
  feStarted = false;

  const questions = feExamData.questions;
  let total = 0;
  const sectionStats = {};

  // Init section stats
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
    if (feAnswers[q.id] === q.correct) {
      total++;
      if (sec) sec.correct++;
    }
  });

  document.getElementById('feExamScreen').classList.add('hidden');
  document.getElementById('feResultScreen').classList.remove('hidden');

  const pct = Math.round((total / questions.length) * 100);
  document.getElementById('feScoreNum').textContent = total;
  document.getElementById('feScoreCircle').style.background =
    `conic-gradient(#991b1b ${pct * 3.6}deg, #e5e7eb ${pct * 3.6}deg)`;

  let msg = '';
  if (pct >= 80) msg = '🏆 Mükemmel! Gerçek YDS\'ye hazırsınız.';
  else if (pct >= 65) msg = '👏 Çok İyi! Biraz daha pratikle sınava hazır olacaksınız.';
  else if (pct >= 50) msg = '📚 İyi! Zayıf bölümlere odaklanmaya devam edin.';
  else msg = '💪 Başlangıç için iyi! Düzenli çalışmayla gelişeceksiniz.';
  document.getElementById('feScoreMsg').textContent = `${pct}% — ${msg}`;

  // Section breakdown
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
}

// ─── Review mode ─────────────────────────────────────────────
function feReviewAnswers() {
  feCurrentIdx = 0;
  document.getElementById('feResultScreen').classList.add('hidden');
  document.getElementById('feExamScreen').classList.remove('hidden');
  feRenderReviewQuestion();
}

function feRenderReviewQuestion() {
  if (!feExamData) return;
  const q = feExamData.questions[feCurrentIdx];
  if (!q) return;

  // Basic info
  const section = feExamData.sections.find(s => s.id === q.section_id);
  document.getElementById('feSectionLabel').textContent = (section ? section.label : '') + ' [İNCELEME MODU]';
  document.getElementById('feQNum').textContent = `${feCurrentIdx + 1}/${feExamData.questions.length}`;

  const passageBox = document.getElementById('fePassageBox');
  const readingNotice = document.getElementById('feReadingNotice');
  const passTitle = document.getElementById('fePassageTitle');

  passageBox.classList.add('hidden');
  readingNotice.classList.add('hidden');

  if (q.leading_text) {
    passageBox.textContent = q.leading_text;
    passageBox.classList.remove('hidden');
  } else if (q.passage_id) {
    const passage = feExamData.passages.find(p => p.id === q.passage_id);
    if (passage && passage.text) {
      passageBox.textContent = passage.text;
      passageBox.classList.remove('hidden');
    } else if (passage) {
      passTitle.textContent = `"${passage.title}"`;
      readingNotice.classList.remove('hidden');
    }
  }

  document.getElementById('feQuestion').textContent = q.question;

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

  // Use nav buttons but rewire to review mode
  document.querySelector('button[onclick="feNavQuestion(-1)"]').onclick = () => { feCurrentIdx = Math.max(0, feCurrentIdx - 1); feRenderReviewQuestion(); };
  document.querySelector('button[onclick="feNavQuestion(1)"]').onclick = () => { feCurrentIdx = Math.min(feExamData.questions.length - 1, feCurrentIdx + 1); feRenderReviewQuestion(); };
}

// ─── Reset ───────────────────────────────────────────────────
function feResetExam() {
  if (feTimerRef) clearInterval(feTimerRef);
  feExamData = null;
  feAnswers = {};
  feStarted = false;
  feCurrentIdx = 0;

  document.getElementById('feResultScreen').classList.add('hidden');
  document.getElementById('feExamScreen').classList.add('hidden');
  document.getElementById('feStartScreen').classList.remove('hidden');
  document.getElementById('feSelectedInfo').classList.add('hidden');
  document.getElementById('feStartBtn').disabled = true;
  delete document.getElementById('feStartBtn').dataset.selectedId;
  document.querySelectorAll('.fe-exam-card').forEach(c =>
    c.classList.remove('border-red-500', 'shadow-lg', 'bg-red-50'));
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
