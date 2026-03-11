/* ============================================================
   miniexams.js  –  Categorical YDS Mini Exam Hub
   ============================================================ */

const CATEGORICAL_MINI_LIST = [
  {
    category: 'Kelime & Gramer',
    icon: 'fa-font',
    exams: [
      { id: 'mini_vocab1', label: 'Kelime Sınavı 1', file: '/exams/mini/special/vocab1.json', info: '53 Soru' },
      { id: 'mini_vocab2', label: 'Kelime Sınavı 2', file: '/exams/mini/special/vocab2.json', info: '50 Soru' },
      { id: 'mini_grammar1', label: 'Gramer Sınavı 1', file: '/exams/mini/special/grammar1.json', info: '50 Soru' },
      { id: 'mini_grammar2', label: 'Gramer Sınavı 2', file: '/exams/mini/special/grammar2.json', info: '50 Soru' },
    ]
  },
  {
    category: 'Okuma & Anlama',
    icon: 'fa-book-open',
    exams: [
      { id: 'mini_read1', label: 'Okuma Sınavı 1', file: '/exams/mini/special/read1.json', info: '26 Soru' },
      { id: 'mini_read2', label: 'Okuma Sınavı 2', file: '/exams/mini/special/read2.json', info: '20 Soru' },
      { id: 'mini_read3', label: 'Okuma Sınavı 3', file: '/exams/mini/special/read3.json', info: '20 Soru' },
      { id: 'mini_read4', label: 'Okuma Sınavı 4', file: '/exams/mini/special/read4.json', info: '20 Soru' },
      { id: 'mini_read5', label: 'Okuma Sınavı 5', file: '/exams/mini/special/read5.json', info: '20 Soru' },
    ]
  },
  {
    category: 'Cümle & Paragraf',
    icon: 'fa-align-left',
    exams: [
      { id: 'mini_sencomp1', label: 'Cümle Tamamlama 1', file: '/exams/mini/special/sencomp1.json', info: '54 Soru' },
      { id: 'mini_sencomp2', label: 'Cümle Tamamlama 2', file: '/exams/mini/special/sencomp2.json', info: '50 Soru' },
      { id: 'mini_cloze1', label: 'Cloze Test 1', file: '/exams/mini/special/cloze1.json', info: '55 Soru' },
      { id: 'mini_cloze2', label: 'Cloze Test 2', file: '/exams/mini/special/cloze2.json', info: '50 Soru' },
      { id: 'mini_paracom1', label: 'Paragraf Tamamlama 1', file: '/exams/mini/special/paracom1.json', info: '24 Soru' },
      { id: 'mini_paracom2', label: 'Paragraf Tamamlama 2', file: '/exams/mini/special/paracom2.json', info: '20 Soru' },
    ]
  },
  {
    category: 'Anlam & Akış',
    icon: 'fa-exchange-alt',
    exams: [
      { id: 'mini_clomean1', label: 'Yakın Anlam 1', file: '/exams/mini/special/clomean1.json', info: '23 Soru' },
      { id: 'mini_clomean2', label: 'Yakın Anlam 2', file: '/exams/mini/special/clomean2.json', info: '20 Soru' },
      { id: 'mini_parap1', label: 'Yakın Anlam 3', file: '/exams/mini/special/parap1.json', info: '24 Soru' },
      { id: 'mini_parap2', label: 'Yakın Anlam 4', file: '/exams/mini/special/parap2.json', info: '20 Soru' },
      { id: 'mini_irr1', label: 'Bozan Cümle 1', file: '/exams/mini/special/irr1.json', info: '23 Soru' },
      { id: 'mini_irr2', label: 'Bozan Cümle 2', file: '/exams/mini/special/irr2.json', info: '20 Soru' },
    ]
  },
  {
    category: 'Çeviri & Diyalog',
    icon: 'fa-language',
    exams: [
      { id: 'mini_trans1', label: 'Çeviri Sınavı 1', file: '/exams/mini/special/trans1.json', info: '24 Soru' },
      { id: 'mini_trans2', label: 'Çeviri Sınavı 2', file: '/exams/mini/special/trans2.json', info: '20 Soru' },
      { id: 'mini_trans3', label: 'Çeviri Sınavı 3', file: '/exams/mini/special/trans3.json', info: '20 Soru' },
      { id: 'mini_trans4', label: 'Çeviri Sınavı 4', file: '/exams/mini/special/trans4.json', info: '20 Soru' },
      { id: 'mini_trans5', label: 'Çeviri Sınavı 5', file: '/exams/mini/special/trans5.json', info: '20 Soru' },
      { id: 'mini_dia1', label: 'Diyalog Tamamlama 1', file: '/exams/mini/special/dia1.json', info: '24 Soru' },
      { id: 'mini_dia2', label: 'Diyalog Tamamlama 2', file: '/exams/mini/special/dia2.json', info: '20 Soru' },
    ]
  },
  {
    category: 'Karma Denemeler',
    icon: 'fa-random',
    exams: [
      { id: 'mini_karma1', label: 'Yeni Karma Mini 1', file: '/exams/mini/special/karma1.json', info: '40 Soru' },
      ...Array.from({ length: 25 }, (_, i) => ({
        id: `mini_old_${i + 1}`,
        label: `Karma Mini Deneme ${i + 1}`,
        file: `/exams/mini/miniexam${i + 1}.json`,
        info: '20 Soru'
      }))
    ]
  }
];

// State
let meExamData = null;
let meAnswers = {};
let meTimerRef = null;
let meSecondsLeft = 0;
let meStarted = false;
let meCurrentIdx = 0;

// UI Template
const miniexamsHTML = `
<div class="max-w-5xl mx-auto px-4 py-10">
  <div class="text-center mb-10">
    <div class="inline-flex items-center gap-3 bg-gradient-to-r from-red-800 to-red-900 text-white px-6 py-3 rounded-2xl shadow-xl mb-6">
      <i class="fas fa-bolt text-xl text-yellow-500"></i>
      <span class="font-bold text-lg tracking-wide" style="font-family:'Playfair Display',serif;">Özel Soru Paketi</span>
    </div>
    <h2 class="text-3xl font-extrabold text-slate-800 mb-2" style="font-family:'Playfair Display',serif;">Soru Tipine Özgü Uzmanlık Sınavları</h2>
    <p class="text-slate-500 text-sm italic">Zayıf olduğunuz bölümleri güçlendirmek için her soru tipine özel hazırlanmış setler.</p>
  </div>

  <div id="meStartScreen" class="space-y-12">
    <div class="space-y-10">
      ${CATEGORICAL_MINI_LIST.map(cat => `
        <div>
          <div class="flex items-center gap-2 mb-4 text-slate-500 font-bold uppercase tracking-widest text-xs">
            <i class="fas ${cat.icon} text-sm"></i>
            <span>${cat.category}</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            ${cat.exams.map(e => `
              <div onclick="meSelectExam('${e.id}')" id="meCard-${e.id}"
                class="me-exam-card cursor-pointer border border-slate-200 rounded-xl p-3 hover:border-red-300 hover:bg-red-50/30 transition-all text-center group">
                <p class="text-sm font-bold text-slate-700 group-hover:text-red-800 mb-1">${e.label}</p>
                <p class="text-[10px] text-slate-400 font-medium uppercase tracking-tight">${e.info}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <div id="meSelectedInfo" class="hidden bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-start gap-4 shadow-2xl">
      <div class="w-12 h-12 rounded-full bg-red-800 flex items-center justify-center shrink-0">
        <i class="fas fa-info-circle text-white text-xl"></i>
      </div>
      <div>
        <p class="font-bold text-white text-lg mb-1">Hazır mısınız?</p>
        <p class="text-slate-400 text-sm leading-relaxed">Sınav başladığında zamanlayıcı çalışmaya başlayacaktır.</p>
      </div>
    </div>

    <div class="flex justify-center pb-10">
      <button id="meStartBtn" onclick="meStartExam()" disabled
        class="px-12 py-5 bg-gradient-to-r from-red-800 to-red-700 text-white rounded-2xl font-black text-xl shadow-2xl shadow-red-900/40 hover:shadow-red-900/60 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
        SINAVI BAŞLAT
      </button>
    </div>
  </div>

  <div id="meExamScreen" class="hidden">
    <!-- Exam Interface (similar to fullexam) -->
    <div class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm mb-6 rounded-xl">
      <div class="flex items-center justify-between px-4 py-3 gap-3">
        <div class="flex items-center gap-3">
          <span id="meQNum" class="font-extrabold text-red-800 text-lg">---</span>
        </div>
        <div class="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl font-mono font-bold text-sm">
          <i class="fas fa-clock text-xs text-red-400"></i>
          <span id="meTimer">00:00</span>
        </div>
        <button onclick="meFinishConfirm()" class="bg-red-800 text-white text-xs font-bold px-4 py-2 rounded-xl">Bitir</button>
      </div>
    </div>

    <div class="flex-1 min-w-0">
      <div id="meSectionLabel" class="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-4 text-sm text-slate-600 font-medium"></div>
      <div id="mePassageBox" class="hidden bg-blue-50 border-l-4 border-blue-400 rounded-xl p-5 mb-4 text-sm text-slate-700 leading-relaxed"></div>
      <div id="meQuestion" class="font-semibold text-slate-800 text-base md:text-lg leading-relaxed mb-6"></div>
      <div id="meOptions" class="space-y-3"></div>
      <div class="flex justify-between mt-8">
        <button onclick="meNavQuestion(-1)" class="px-5 py-3 border border-slate-300 rounded-xl">Önceki</button>
        <button onclick="meNavQuestion(1)" class="px-5 py-3 bg-slate-900 text-white rounded-xl">Sonraki</button>
      </div>
    </div>
  </div>

  <div id="meResultScreen" class="hidden">
      <div class="text-center mb-10">
        <h3 class="text-3xl font-extrabold text-slate-800 mb-2">Sınav Sonucu</h3>
        <p id="meScoreMsg" class="text-xl font-bold text-red-800"></p>
        <div class="flex justify-center gap-4 mt-8">
            <button onclick="meResetExam()" class="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold">Yeni Sınav</button>
        </div>
      </div>
  </div>
</div>
`;

function injectMiniExamHTML() {
  const container = document.getElementById('tab-miniexams');
  if (container) container.innerHTML = miniexamsHTML;
}

// Initialized via main.js

function meSelectExam(id) {
  document.querySelectorAll('.me-exam-card').forEach(c => c.classList.remove('border-red-300', 'bg-red-50/30'));
  const card = document.getElementById(`meCard-${id}`);
  if (card) card.classList.add('border-red-300', 'bg-red-50/30');
  document.getElementById('meSelectedInfo').classList.remove('hidden');
  document.getElementById('meStartBtn').disabled = false;
  document.getElementById('meStartBtn').dataset.selectedId = id;
}

async function meStartExam() {
  const btn = document.getElementById('meStartBtn');
  const examId = btn.dataset.selectedId;
  let exam = null;
  for (const cat of CATEGORICAL_MINI_LIST) {
    exam = cat.exams.find(e => e.id === examId);
    if (exam) break;
  }
  if (!exam) return;

  try {
    const res = await fetch(exam.file);
    meExamData = await res.json();
    meAnswers = {};
    meCurrentIdx = 0;
    meSecondsLeft = (meExamData.meta.duration_minutes || 30) * 60;
    meStarted = true;
    document.getElementById('meStartScreen').classList.add('hidden');
    document.getElementById('meExamScreen').classList.remove('hidden');
    startMeTimer();
    meRenderQuestion();
  } catch (e) { alert("Yükleme hatası"); }
}

function startMeTimer() {
  if (meTimerRef) clearInterval(meTimerRef);
  meTimerRef = setInterval(() => {
    meSecondsLeft--;
    if (meSecondsLeft <= 0) meFinish();
    else {
      const m = Math.floor(meSecondsLeft / 60);
      const s = meSecondsLeft % 60;
      document.getElementById('meTimer').textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
    }
  }, 1000);
}

function meRenderQuestion() {
  const q = meExamData.questions[meCurrentIdx];
  document.getElementById('meQNum').textContent = `${meCurrentIdx + 1}/${meExamData.questions.length}`;
  const section = meExamData.sections.find(s => s.id === q.section_id);
  document.getElementById('meSectionLabel').textContent = section ? section.label : '';
  
  const pBox = document.getElementById('mePassageBox');
  pBox.classList.add('hidden');
  if (q.passage_id) {
    const p = meExamData.passages.find(px => px.id === q.passage_id);
    if (p) { pBox.textContent = p.text; pBox.classList.remove('hidden'); }
  }

  document.getElementById('meQuestion').textContent = q.question;
  const optBox = document.getElementById('meOptions');
  optBox.innerHTML = '';
  Object.entries(q.options).forEach(([k, v]) => {
    const b = document.createElement('button');
    b.className = `w-full text-left px-4 py-3 rounded-xl border-2 ${meAnswers[q.id] === k ? 'border-red-600 bg-red-50' : 'border-slate-200'}`;
    b.textContent = `${k}) ${v}`;
    b.onclick = () => { meAnswers[q.id] = k; meRenderQuestion(); };
    optBox.appendChild(b);
  });
}

function meNavQuestion(d) {
  const n = meCurrentIdx + d;
  if (n >= 0 && n < meExamData.questions.length) { meCurrentIdx = n; meRenderQuestion(); }
}

function meFinishConfirm() { if (confirm("Bitirmek istiyor musunuz?")) meFinish(); }

function meFinish() {
  clearInterval(meTimerRef);
  let score = 0;
  meExamData.questions.forEach(q => { if (meAnswers[q.id] === q.correct) score++; });
  document.getElementById('meExamScreen').classList.add('hidden');
  document.getElementById('meResultScreen').classList.remove('hidden');
  document.getElementById('meScoreMsg').textContent = `Skor: ${score} / ${meExamData.questions.length}`;
}

function meResetExam() {
  document.getElementById('meResultScreen').classList.add('hidden');
  document.getElementById('meStartScreen').classList.remove('hidden');
  document.getElementById('meStartBtn').disabled = true;
  document.getElementById('meSelectedInfo').classList.add('hidden');
}