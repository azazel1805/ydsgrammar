/* ============================================================
   miniexams.js  –  Categorical YDS Mini Exam Hub
   ============================================================ */const CATEGORICAL_MINI_LIST = [
  {
    category: 'Kelime & Gramer',
    icon: 'fa-font',
    exams: [
      { id: 'mini_vocab', label: 'Kelime Soruları', file: '/exams/mini/special/master_vocab.json', info: 'Seçilebilir Soru Sayısı' },
      { id: 'mini_grammar', label: 'Gramer Soruları', file: '/exams/mini/special/master_grammar.json', info: 'Seçilebilir Soru Sayısı' },
      { id: 'mini_cloze', label: 'Cloze Test', file: '/exams/mini/special/master_cloze.json', info: 'Seçilebilir Soru Sayısı' },
    ]
  },
  {
    category: 'Okuma & Anlama',
    icon: 'fa-book-open',
    exams: [
      { id: 'mini_read', label: 'Okuma Parçaları', file: '/exams/mini/special/master_reading.json', info: 'Seçilebilir Soru Sayısı' },
    ]
  },
  {
    category: 'Cümle & Paragraf',
    icon: 'fa-align-left',
    exams: [
      { id: 'mini_sencomp', label: 'Cümle Tamamlama', file: '/exams/mini/special/master_sencomp.json', info: 'Seçilebilir Soru Sayısı' },
      { id: 'mini_paracom', label: 'Paragraf Tamamlama', file: '/exams/mini/special/master_paracom.json', info: 'Seçilebilir Soru Sayısı' },
    ]
  },
  {
    category: 'Anlam & Akış',
    icon: 'fa-exchange-alt',
    exams: [
      { id: 'mini_clomean', label: 'Yakın Anlam / Yakın Anlam', file: '/exams/mini/special/master_clomean.json', info: 'Seçilebilir Soru Sayısı' },
      { id: 'mini_irr', label: 'Bozan Cümle', file: '/exams/mini/special/master_irr.json', info: 'Seçilebilir Soru Sayısı' },
    ]
  },
  {
    category: 'Çeviri & Diyalog',
    icon: 'fa-language',
    exams: [
      { id: 'mini_trans', label: 'Çeviri Soruları', file: '/exams/mini/special/master_trans.json', info: 'Seçilebilir Soru Sayısı' },
      { id: 'mini_dia', label: 'Diyalog Tamamlama', file: '/exams/mini/special/master_dia.json', info: 'Seçilebilir Soru Sayısı' },
    ]
  },
  {
    category: 'Karma Denemeler',
    icon: 'fa-random',
    exams: [
      { id: 'mini_karma', label: 'Hepsinden Karışık (Dinamik)', file: '/exams/mini/special/master_karma.json', info: 'Sayı Seçlebilir' },
      ...Array.from({ length: 25 }, (_, i) => ({
        id: `mini_fixed_${i + 1}`,
        label: i === 0 ? `Yeni Karma Mini 1 (40 Soru)` : `Eski Karma Mini ${i}`, // The first one is that 40-q set you sent
        file: i === 0 ? '/exams/mini/special/karma1.json' : `/exams/mini/miniexam${i}.json`,
        info: '40 Soru Sabit'
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
    <p class="text-slate-500 text-sm italic">Her soru tipine özel dev havuzdan istediğiniz sayıda soru seçerek başlayın.</p>
  </div>

  <div id="meStartScreen" class="space-y-12">
    <div class="space-y-10">
      ${CATEGORICAL_MINI_LIST.map(cat => `
        <div>
          <div class="flex items-center gap-2 mb-4 text-slate-500 font-bold uppercase tracking-widest text-xs">
            <i class="fas ${cat.icon} text-sm"></i>
            <span>${cat.category}</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
            ${cat.exams.map(e => `
              <div onclick="meSelectExam('${e.id}')" id="meCard-${e.id}"
                class="me-exam-card cursor-pointer border border-slate-200 rounded-xl p-4 hover:border-red-300 hover:bg-red-50/30 transition-all text-center group">
                <p class="text-sm font-bold text-slate-700 group-hover:text-red-800 mb-1">${e.label}</p>
                <p class="text-[10px] text-slate-400 font-medium uppercase tracking-tight">Soru Havuzundan Seç</p>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <div id="meSelectedInfo" class="hidden bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      <div class="flex items-start gap-4 mb-6">
        <div class="w-12 h-12 rounded-full bg-red-800 flex items-center justify-center shrink-0">
          <i class="fas fa-sliders-h text-white text-xl"></i>
        </div>
        <div>
          <p class="font-bold text-white text-lg mb-1">Sınav Ayarları</p>
          <p class="text-slate-400 text-sm leading-relaxed">Kaç soru çözmek istediğinizi belirleyin. Sorular havuzdan rastgele seçilecektir.</p>
        </div>
      </div>
      
      <div class="max-w-xs mx-auto text-center space-y-4">
        <label class="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Kaç Soru Çözeceksiniz?</label>
        <div class="flex items-center justify-center gap-4">
            <button onclick="updateMeCount(-5)" class="w-10 h-10 rounded-full bg-slate-800 text-white hover:bg-red-800 transition-colors">-</button>
            <input type="number" id="meQuestionCount" value="20" min="5" max="100" class="w-20 bg-slate-800 border-2 border-slate-700 text-white text-center font-bold text-xl py-2 rounded-xl focus:border-red-800 outline-none">
            <button onclick="updateMeCount(5)" class="w-10 h-10 rounded-full bg-slate-800 text-white hover:bg-red-800 transition-colors">+</button>
        </div>
        <p id="meMaxInfo" class="text-[10px] text-slate-500 uppercase font-bold mt-2">Maksimum Soru: --</p>
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
      <div id="mePassageBox" class="hidden bg-blue-50 border-l-4 border-blue-400 rounded-xl p-5 mb-4 text-sm text-slate-700 leading-relaxed overflow-y-auto max-h-60"></div>
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

function updateMeCount(delta) {
    const input = document.getElementById('meQuestionCount');
    if (input) {
        input.value = Math.max(5, Math.min(100, parseInt(input.value) + delta));
    }
}

async function meSelectExam(id) {
  document.querySelectorAll('.me-exam-card').forEach(c => c.classList.remove('border-red-300', 'bg-red-50/30'));
  const card = document.getElementById(`meCard-${id}`);
  if (card) card.classList.add('border-red-300', 'bg-red-50/30');
  
  const exam = findExamById(id);
  if (exam) {
      try {
          const res = await fetch(exam.file);
          const temp = await res.json();
          const totalQ = temp.questions.length;
          document.getElementById('meMaxInfo').textContent = `Maksimum Soru: ${totalQ}`;
          document.getElementById('meQuestionCount').max = totalQ;
          if (parseInt(document.getElementById('meQuestionCount').value) > totalQ) {
              document.getElementById('meQuestionCount').value = totalQ;
          }
      } catch (e) {}
  }

  document.getElementById('meSelectedInfo').classList.remove('hidden');
  document.getElementById('meStartBtn').disabled = false;
  document.getElementById('meStartBtn').dataset.selectedId = id;
}

function findExamById(id) {
    for (const cat of CATEGORICAL_MINI_LIST) {
        const found = cat.exams.find(e => e.id === id);
        if (found) return found;
    }
    return null;
}

async function meStartExam() {
  const btn = document.getElementById('meStartBtn');
  const examId = btn.dataset.selectedId;
  const count = parseInt(document.getElementById('meQuestionCount').value) || 20;

  let exam = findExamById(examId);
  if (!exam) return;

  try {
    const res = await fetch(exam.file);
    const fullData = await res.json();
    
    // Shuffle and pick
    let questions = [...fullData.questions].sort(() => 0.5 - Math.random());
    questions = questions.slice(0, count);

    meExamData = {
        ...fullData,
        questions: questions
    };

    meAnswers = {};
    meCurrentIdx = 0;
    meSecondsLeft = Math.min(60, count * 1.5) * 60; // Dynamic duration
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
  const section = (meExamData.sections || []).find(s => s.id === q.section_id);
  document.getElementById('meSectionLabel').textContent = section ? section.label : (q.type || '');
  
  const pBox = document.getElementById('mePassageBox');
  pBox.classList.add('hidden');
  
  // Handle passage (some have passage_id, some have passage text in a field)
  if (q.passage_id && meExamData.passages) {
    const p = meExamData.passages.find(px => px.id === q.passage_id);
    if (p) { pBox.innerHTML = p.text.replace(/\n/g, '<br>'); pBox.classList.remove('hidden'); }
  } else if (q.passage) {
     pBox.innerHTML = q.passage.replace(/\n/g, '<br>'); pBox.classList.remove('hidden');
  }

  document.getElementById('meQuestion').innerHTML = q.question.replace(/\n/g, '<br>');
  const optBox = document.getElementById('meOptions');
  optBox.innerHTML = '';
  Object.entries(q.options).forEach(([k, v]) => {
    const b = document.createElement('button');
    b.className = `w-full text-left px-4 py-3 rounded-xl border-2 ${meAnswers[q.id] === k ? 'border-red-600 bg-red-50' : 'border-slate-200 hover:border-slate-300'}`;
    b.innerHTML = `<strong>${k})</strong> ${v}`;
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