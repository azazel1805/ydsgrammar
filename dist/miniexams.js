/* ============================================================
   miniexams.js  –  Categorical YDS Mini Exam Hub
   ============================================================ */
const CATEGORICAL_MINI_LIST = [
  {
    category: 'Kelime & Gramer',
    icon: 'fa-font',
    exams: [
      { id: 'mini_vocab', label: 'Kelime Soruları', file: '/exams/mini/special/master_vocab.json', info: '40 Soru (Dinamik)' },
      { id: 'mini_grammar', label: 'Gramer Soruları', file: '/exams/mini/special/master_grammar.json', info: '40 Soru (Dinamik)' },
      { id: 'mini_cloze', label: 'Cloze Test', file: '/exams/mini/special/master_cloze.json', info: '40 Soru (Dinamik)' },
    ]
  },
  {
    category: 'Kolay Seviye Mini YDS',
    icon: 'fa-leaf',
    exams: Array.from({ length: 5 }, (_, i) => ({
      id: `mini_easy_${i + 1}`,
      label: `Kolay Mini YDS ${i + 1}`,
      file: `/exams/mini/easy/mini_easy_${i + 1}.json`,
      info: '40 Soru Sabit'
    }))
  },
  {
    category: 'Orta Seviye Mini YDS',
    icon: 'fa-mountain',
    exams: Array.from({ length: 5 }, (_, i) => ({
      id: `mini_medium_${i + 1}`,
      label: `Orta Mini YDS ${i + 1}`,
      file: `/exams/mini/medium/mini_medium_${i + 1}.json`,
      info: '40 Soru Sabit'
    }))
  },
  {
    category: 'Zor Seviye Mini YDS',
    icon: 'fa-fire',
    exams: Array.from({ length: 5 }, (_, i) => ({
      id: `mini_hard_${i + 1}`,
      label: `Zor Mini YDS ${i + 1}`,
      file: `/exams/mini/hard/mini_hard_${i + 1}.json`,
      info: '40 Soru Sabit'
    }))
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
              <div onclick="window.meSelectExam('${e.id}')" id="meCard-${e.id}"
                class="me-exam-card cursor-pointer border border-slate-200 rounded-xl p-4 hover:border-red-300 hover:bg-red-50/30 transition-all text-center group">
                <p class="text-sm font-bold text-slate-700 group-hover:text-red-800 mb-1">${e.label}</p>
                <p class="text-[10px] text-slate-400 font-medium uppercase tracking-tight">${e.info}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Selection area removed as per user request (Direct Start) -->
    <div id="meSelectedInfo" class="hidden">
        <button id="meStartBtn" class="hidden" data-selected-id=""></button>
        <input type="hidden" id="meQuestionCount" value="40">
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
        <button onclick="window.meFinishConfirm()" class="bg-red-800 text-white text-xs font-bold px-4 py-2 rounded-xl">Bitir</button>
      </div>
    </div>

    <div class="flex-1 min-w-0">
      <div id="meSectionLabel" class="hidden bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-4 text-sm text-slate-600 font-medium"></div>
      <div id="mePassageBox" class="hidden bg-blue-50/50 border-l-4 border-blue-400 rounded-3xl p-8 mb-6 text-slate-700 leading-relaxed text-sm max-h-[400px] overflow-y-auto shadow-sm"></div>
      
      <div id="meQuestion" class="font-semibold text-slate-800 text-base md:text-lg leading-relaxed mb-6"></div>
      <div id="meOptions" class="space-y-3"></div>

      <div class="flex justify-between mt-8">
        <button onclick="window.meNavQuestion(-1)" class="flex items-center gap-2 px-5 py-3 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 font-medium font-sans">
          <i class="fas fa-arrow-left text-sm"></i> Önceki
        </button>
        <button onclick="window.meNavQuestion(1)" class="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors font-sans">
          Sonraki <i class="fas fa-arrow-right text-sm"></i>
        </button>
      </div>
    </div>
  </div>

  <!-- Results Screen -->
  <div id="meResultScreen" class="hidden">
      <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
          <div class="bg-slate-900 px-8 py-12 text-center text-white relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent"></div>
            <div class="relative z-10">
              <div class="w-24 h-24 rounded-full bg-red-800 mx-auto flex items-center justify-center mb-6 shadow-xl shadow-red-900/40">
                <i class="fas fa-trophy text-3xl"></i>
              </div>
              <h3 class="text-3xl font-black mb-2 tracking-tight">Sınav Tamamlandı!</h3>
              <div class="flex items-center justify-center gap-8 mt-8">
                <div class="text-center">
                  <p class="text-[10px] text-green-400 uppercase font-bold tracking-widest mb-1">Doğru</p>
                  <p id="resCorrect" class="text-2xl font-black text-green-400">--</p>
                </div>
                <div class="h-8 w-px bg-slate-700"></div>
                <div class="text-center">
                  <p class="text-[10px] text-red-400 uppercase font-bold tracking-widest mb-1">Yanlış</p>
                  <p id="resWrong" class="text-2xl font-black text-red-400">--</p>
                </div>
              </div>
            </div>
          </div>

          <div class="p-8">
            <div class="flex items-center justify-between mb-8">
              <h4 class="text-xl font-bold text-slate-800">Soru Detayları</h4>
              <button onclick="window.meResetExam()" class="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-red-800 transition-colors">Yeni Sınav Başlat</button>
            </div>
            
            <div id="meReviewList" class="space-y-6">
              <!-- Questions will be injected here -->
            </div>
          </div>
        </div>
      </div>
  </div>
</div>
`;

window.injectMiniExamHTML = function() {
  const container = document.getElementById('tab-miniexams');
  if (container) container.innerHTML = miniexamsHTML;
};

window.meSelectExam = async function(id) {
  const btn = document.getElementById('meStartBtn');
  if (btn) {
    btn.dataset.selectedId = id;
    window.meStartExam();
  }
};

function findExamById(id) {
    for (const cat of CATEGORICAL_MINI_LIST) {
        const found = cat.exams.find(e => e.id === id);
        if (found) return found;
    }
    return null;
}

window.meStartExam = async function() {
  const btn = document.getElementById('meStartBtn');
  const examId = btn.dataset.selectedId;
  const count = parseInt(document.getElementById('meQuestionCount').value) || 20;

  let exam = findExamById(examId);
  if (!exam) return;
  window.currentMiniExamId = examId;

  try {
    const res = await fetch(`${exam.file}?v=${new Date().getTime()}`);
    const fullData = await res.json();
    
    // Grouping Logic
    let processedQuestions = fullData.questions;
    let isFixed = exam.id.startsWith('mini_fixed') || exam.id.startsWith('mini_easy') || exam.id.startsWith('mini_medium') || exam.id.startsWith('mini_hard') || exam.id.startsWith('freemini');
    
    let groups = [];
    let currentGroup = [];
    let lastPid = undefined;
    let lastIsCloze = false;

    const isClozeQ = (q) => /[\(\[]?Blank \d+[\)\]]?|Boşluk \d+|\(\d+\)|\d+\)/.test(q.question) || q.section_id === 'cloze';

    processedQuestions.forEach(q => {
        let pid = q.passage_id;
        let isCloze = isClozeQ(q);
        let shouldStartNew = false;
        
        if (pid !== lastPid) {
            shouldStartNew = true;
        } else if (pid === null) {
            if (isCloze !== lastIsCloze) {
                shouldStartNew = true;
            } else if (!isCloze) {
                shouldStartNew = true;
            } else if (currentGroup.length >= 5) {
                shouldStartNew = true;
            }
        }

        if (shouldStartNew && currentGroup.length > 0) {
            groups.push(currentGroup);
            currentGroup = [];
        }
        currentGroup.push(q);
        lastPid = pid;
        lastIsCloze = isCloze;
    });
    if (currentGroup.length > 0) groups.push(currentGroup);

    groups.forEach(group => {
        let groupLead = "";
        let groupPid = null;

        group.forEach(gq => {
            if (gq.passage_id) groupPid = gq.passage_id;
            if (gq.leading_text) groupLead = gq.leading_text;
        });

        const isCSet = group.length > 1 && group.every(gq => isClozeQ(gq));

        if (isCSet && !groupPid && !groupLead) {
            let textFragments = group
                .map(gq => gq.question)
                .filter(txt => {
                    const isInstruction = /en uygun seçeneği bulun|best option for blank|Choose the best/i.test(txt);
                    const isBlankOnly = /^Boşluk \d+|^Blank \d+|^[\(\[]?\d+[\)\]]? \-\-\-\-/i.test(txt);
                    return !isInstruction && !isBlankOnly;
                });
            
            if (textFragments.length > 0) {
                groupLead = textFragments.join(" ");
            }
        }

        if (groupPid || groupLead) {
            group.forEach(gq => {
                if (groupPid && !gq.passage_id) gq.passage_id = groupPid;
                if (groupLead && !gq.leading_text) gq.leading_text = groupLead;
            });
        }
    });

    if (!isFixed) {
        groups.sort(() => 0.5 - Math.random());
        let selectedQuestions = [];
        for (let group of groups) {
            if (selectedQuestions.length >= 40) break;
            selectedQuestions.push(...group);
        }
        processedQuestions = selectedQuestions;
    } else {
        processedQuestions = groups.flat();
    }

    meExamData = {
        meta: { ...fullData.meta, total_questions: processedQuestions.length },
        passages: fullData.passages || [],
        questions: processedQuestions
    };
    
    meAnswers = {};
    meCurrentIdx = 0;
    meSecondsLeft = (meExamData.meta.duration_minutes || 90) * 60;
    meStarted = true;

    document.getElementById('meStartScreen').classList.add('hidden');
    document.getElementById('meExamScreen').classList.remove('hidden');

    window.meRenderQuestion();
    window.meStartTimer();

    const container = document.getElementById('tab-miniexams');
    if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (err) {
    console.error(err);
    alert('Sınav yüklenirken hata oluştu.');
  }
};

window.meStartTimer = function() {
  if (meTimerRef) clearInterval(meTimerRef);
  meTimerRef = setInterval(() => {
    meSecondsLeft--;
    window.meUpdateTimerDisplay();
    if (meSecondsLeft <= 0) {
      clearInterval(meTimerRef);
      window.meFinish();
    }
  }, 1000);
};

window.meUpdateTimerDisplay = function() {
  const m = Math.floor(meSecondsLeft / 60);
  const s = meSecondsLeft % 60;
  const el = document.getElementById('meTimer');
  if (el) el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

window.meNavQuestion = function(delta) {
  const newIdx = meCurrentIdx + delta;
  if (newIdx >= 0 && meExamData && newIdx < meExamData.questions.length) {
    meCurrentIdx = newIdx;
    window.meRenderQuestion();
    
    const container = document.getElementById('tab-miniexams');
    if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

window.meRenderQuestion = function() {
  if (!meExamData) return;
  const q = meExamData.questions[meCurrentIdx];
  const qNum = document.getElementById('meQNum');
  const passageBox = document.getElementById('mePassageBox');
  const qText = document.getElementById('meQuestion');
  const optBox = document.getElementById('meOptions');

  if (qNum) qNum.textContent = `${meCurrentIdx + 1} / ${meExamData.questions.length}`;
  
  if (passageBox) {
    passageBox.classList.add('hidden');
    let passageText = "";
    let pLabel = "METİN / PARAGRAF";

    const examId = window.currentMiniExamId;
    if (examId === 'mini_cloze') pLabel = "CLOZE TEST PARÇASI";
    else if (examId === 'mini_read') pLabel = "OKUMA PARÇASI";
    else if (q.passage_id) pLabel = "OKUMA PARÇASI";

    if (q.passage_id) {
        const p = meExamData.passages.find(p => p.id === q.passage_id);
        if (p) passageText = p.text;
    }
    
    const lead = q.leading_text || passageText;
    if (lead) {
        passageBox.innerHTML = `
          <div class="mb-4">
              <span class="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-100/50 px-3 py-1 rounded-full">${pLabel}</span>
          </div>
          <div class="text-slate-700 leading-loose">${lead.replace(/\n/g, '<br>')}</div>
        `;
        passageBox.classList.remove('hidden');
    }
  }

  if (qText) qText.innerHTML = q.question.replace(/\n/g, '<br>');

  if (optBox) {
    optBox.innerHTML = '';
    Object.entries(q.options).forEach(([key, val]) => {
      const isSelected = meAnswers[meCurrentIdx] === key;
      const btn = document.createElement('button');
      btn.className = `w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 group ${
        isSelected ? 'border-red-800 bg-red-50' : 'border-slate-100 hover:border-red-200 hover:bg-slate-50'
      }`;
      btn.onclick = () => {
        meAnswers[meCurrentIdx] = key;
        window.meRenderQuestion();
      };
      btn.innerHTML = `
        <div class="w-8 h-8 rounded-lg border-2 flex items-center justify-center font-bold shrink-0 ${
          isSelected ? 'bg-red-800 border-red-800 text-white' : 'border-slate-200 text-slate-400 group-hover:border-red-300'
        }">${key}</div>
        <span class="text-slate-700 font-medium">${val}</span>
      `;
      optBox.appendChild(btn);
    });
  }
};

window.meFinishConfirm = function() {
  if (confirm('Sınavı bitirmek istediğinize emin misiniz?')) {
    window.meFinish();
  }
};

window.meFinish = function() {
  try {
    meStarted = false;
    clearInterval(meTimerRef);
    
    if (!meExamData) return;

    let correct = 0;
    meExamData.questions.forEach((q, idx) => {
      if (meAnswers[idx] === q.correct) correct++;
    });

    const total = meExamData.questions.length;
    
    const resCorrectEl = document.getElementById('resCorrect');
    const resWrongEl = document.getElementById('resWrong');
    if (resCorrectEl) resCorrectEl.textContent = correct;
    if (resWrongEl) resWrongEl.textContent = total - correct;
    
    const examScreen = document.getElementById('meExamScreen');
    const resultScreen = document.getElementById('meResultScreen');
    if (examScreen) examScreen.classList.add('hidden');
    if (resultScreen) resultScreen.classList.remove('hidden');
    
    // Update Streak/Stats
    if (typeof window.saveQuizScoreFirestore === "function") {
      const pct = Math.round((correct / total) * 100);
      const xp = correct * 10;
      const topic = (meExamData && meExamData.meta) ? meExamData.meta.title : "Mini Exam";
      window.saveQuizScoreFirestore(pct, xp, topic).then(() => {
          if (typeof updateGamification === "function") updateGamification();
          if (typeof initCharts === "function") setTimeout(initCharts, 1000);
      }).catch(console.error);
    }

    window.meRenderReview();
  } catch (err) {
    console.error("Error in meFinish:", err);
  }
};

window.meRenderReview = function() {
  const list = document.getElementById('meReviewList');
  if (!list || !meExamData) return;
  list.innerHTML = '';
  
  meExamData.questions.forEach((q, idx) => {
    const userAns = meAnswers[idx];
    const isCorrect = userAns === q.correct;
    
    const div = document.createElement('div');
    div.className = `p-6 rounded-2xl border-2 ${isCorrect ? 'border-green-100 bg-green-50/30' : 'border-red-100 bg-red-50/30'}`;
    div.innerHTML = `
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xs font-black uppercase tracking-widest ${isCorrect ? 'text-green-600' : 'text-red-600'}">Soru ${idx+1}</span>
        <i class="fas ${isCorrect ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500'}"></i>
      </div>
      <p class="text-slate-800 font-bold mb-4">${q.question}</p>
      <div class="grid gap-2">
        ${Object.entries(q.options).map(([key, val]) => `
          <div class="flex items-center gap-3 text-sm p-3 rounded-xl border ${
            key === q.correct ? 'bg-green-100 border-green-200 text-green-800 font-bold' : 
            key === userAns ? 'bg-red-100 border-red-200 text-red-800' : 'bg-white border-slate-100 text-slate-500'
          }">
            <span class="w-6 h-6 rounded flex items-center justify-center border border-current opacity-60">${key}</span>
            <span>${val}</span>
          </div>
        `).join('')}
      </div>
    `;
    list.appendChild(div);
  });
};

window.meResetExam = function() {
  meStarted = false;
  meExamData = null;
  meAnswers = {};
  const resScreen = document.getElementById('meResultScreen');
  const startScreen = document.getElementById('meStartScreen');
  const selInfo = document.getElementById('meSelectedInfo');
  const startBtn = document.getElementById('meStartBtn');

  if (resScreen) resScreen.classList.add('hidden');
  if (startScreen) startScreen.classList.remove('hidden');
  if (selInfo) selInfo.classList.add('hidden');
  if (startBtn) startBtn.disabled = true;
};