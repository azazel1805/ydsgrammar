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
        label: `Mini Deneme ${i + 1}`,
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
      \${CATEGORICAL_MINI_LIST.map(cat => `
        <div>
          <div class="flex items-center gap-2 mb-4 text-slate-500 font-bold uppercase tracking-widest text-xs">
            <i class="fas \${cat.icon} text-sm"></i>
            <span>\${cat.category}</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
            \${cat.exams.map(e => `
              <div onclick="meSelectExam('\${e.id}')" id="meCard-\${e.id}"
                class="me-exam-card cursor-pointer border border-slate-200 rounded-xl p-4 hover:border-red-300 hover:bg-red-50/30 transition-all text-center group">
                <p class="text-sm font-bold text-slate-700 group-hover:text-red-800 mb-1">\${e.label}</p>
                <p class="text-[10px] text-slate-400 font-medium uppercase tracking-tight">\${e.info}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <div id="meSelectedInfo" class="hidden bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      <div class="flex flex-col md:flex-row items-center gap-6">
          <div id="meCountSettings" class="flex-1 text-center md:text-left">
            <p class="font-bold text-white text-lg mb-2">Kaç soru çözmek istersiniz?</p>
            <div class="flex items-center justify-center md:justify-start gap-4">
                <button onclick="updateMeCount(-5)" class="w-10 h-10 rounded-full bg-slate-800 text-white hover:bg-red-800 transition-colors">-</button>
                <input type="number" id="meQuestionCount" value="20" min="5" max="100" class="w-20 bg-slate-800 border-2 border-slate-700 text-white text-center font-bold text-xl py-2 rounded-xl focus:border-red-800 outline-none">
                <button onclick="updateMeCount(5)" class="w-10 h-10 rounded-full bg-slate-800 text-white hover:bg-red-800 transition-colors">+</button>
            </div>
            <p id="meMaxInfo" class="text-[10px] text-slate-500 uppercase font-bold mt-2">Maksimum Soru: --</p>
          </div>
      </div>
      
      <div id="meFixedInfo" class="hidden flex items-start gap-4">
        <div class="w-12 h-12 rounded-full bg-red-800 flex items-center justify-center shrink-0">
          <i class="fas fa-check-circle text-white text-xl"></i>
        </div>
        <div>
          <p class="font-bold text-white text-lg mb-1">Sabit Deneme Seçildi</p>
          <p class="text-slate-400 text-sm leading-relaxed">Bu deneme orijinal 40 soruluk settir. Soru sırası ve sayısı sabittir.</p>
        </div>
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
        <button onclick="meNavQuestion(-1)" class="flex items-center gap-2 px-5 py-3 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 font-medium font-sans">
          <i class="fas fa-arrow-left text-sm"></i> Önceki
        </button>
        <button onclick="meNavQuestion(1)" class="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors font-sans">
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
              <button onclick="meResetExam()" class="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-red-800 transition-colors">Yeni Sınav Başlat</button>
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
  const isFixed = id.startsWith('mini_fixed');

  if (exam) {
      if (isFixed) {
          document.getElementById('meCountSettings').classList.add('hidden');
          document.getElementById('meFixedInfo').classList.remove('hidden');
      } else {
          document.getElementById('meCountSettings').classList.remove('hidden');
          document.getElementById('meFixedInfo').classList.add('hidden');
          try {
              const res = await fetch(`${exam.file}?v=${new Date().getTime()}`);
              const temp = await res.json();
              const totalQ = temp.questions.length;
              document.getElementById('meMaxInfo').textContent = `Maksimum Soru: ${totalQ}`;
              document.getElementById('meQuestionCount').max = totalQ;
              if (parseInt(document.getElementById('meQuestionCount').value) > totalQ) {
                  document.getElementById('meQuestionCount').value = totalQ;
              }
          } catch (e) {}
      }
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
    const res = await fetch(`${exam.file}?v=${new Date().getTime()}`);
    const fullData = await res.json();
    
    // Grouping Logic
    let processedQuestions = fullData.questions;
    let isFixed = exam.id.startsWith('mini_fixed');
    
    if (!isFixed) {
        // Dynamic: need to group to preserve context
        let groups = [];
        if (examId === 'mini_cloze') {
            // Group by 5s for Cloze
            for (let i = 0; i < processedQuestions.length; i += 5) {
                groups.push(processedQuestions.slice(i, i + 5));
            }
        } else if (examId === 'mini_read') {
            // Group by common passage prefix or passage_id
            let tempGroups = {};
            processedQuestions.forEach(q => {
                let key = q.passage_id || q.question.substring(0, 100);
                if (!tempGroups[key]) tempGroups[key] = [];
                tempGroups[key].push(q);
            });
            groups = Object.values(tempGroups);
        } else {
            // Others: single question sets
            groups = processedQuestions.map(q => [q]);
        }

        // Shuffle groups and pick
        groups.sort(() => 0.5 - Math.random());
        let selectedQuestions = [];
        for (let group of groups) {
            if (selectedQuestions.length >= count) break;
            selectedQuestions.push(...group);
        }
        processedQuestions = selectedQuestions;
    } else {
        // Fixed exams: just slice to count if necessary
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

    meRenderQuestion();
    meStartTimer();

  } catch (err) {
    console.error(err);
    alert('Sınav yüklenirken hata oluştu.');
  }
}

function meStartTimer() {
  if (meTimerRef) clearInterval(meTimerRef);
  meTimerRef = setInterval(() => {
    meSecondsLeft--;
    meUpdateTimerDisplay();
    if (meSecondsLeft <= 0) {
      clearInterval(meTimerRef);
      meFinish();
    }
  }, 1000);
}

function meUpdateTimerDisplay() {
  const m = Math.floor(meSecondsLeft / 60);
  const s = meSecondsLeft % 60;
  const el = document.getElementById('meTimer');
  if (el) el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function meNavQuestion(delta) {
  const newIdx = meCurrentIdx + delta;
  if (newIdx >= 0 && newIdx < meExamData.questions.length) {
    meCurrentIdx = newIdx;
    meRenderQuestion();
  }
}

function meRenderQuestion() {
  const q = meExamData.questions[meCurrentIdx];
  const qNum = document.getElementById('meQNum');
  const passageBox = document.getElementById('mePassageBox');
  const qText = document.getElementById('meQuestion');
  const optBox = document.getElementById('meOptions');

  qNum.textContent = `${meCurrentIdx + 1} / ${meExamData.questions.length}`;
  
  // Passage Logic
  passageBox.classList.add('hidden');
  let passageText = "";
  if (q.passage_id) {
      const p = meExamData.passages.find(p => p.id === q.passage_id);
      if (p) passageText = p.text;
  }
  
  if (passageText) {
      passageBox.innerHTML = passageText.replace(/\n/g, '<br>');
      passageBox.classList.remove('hidden');
  } else if (q.leading_text) {
      passageBox.innerHTML = q.leading_text.replace(/\n/g, '<br>');
      passageBox.classList.remove('hidden');
  }

  // Question Text
  qText.innerHTML = q.question.replace(/\n/g, '<br>');

  // Options
  optBox.innerHTML = '';
  Object.entries(q.options).forEach(([key, val]) => {
    const isSelected = meAnswers[meCurrentIdx] === key;
    const btn = document.createElement('button');
    btn.className = `w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 group ${
      isSelected ? 'border-red-800 bg-red-50' : 'border-slate-100 hover:border-red-200 hover:bg-slate-50'
    }`;
    btn.onclick = () => {
      meAnswers[meCurrentIdx] = key;
      meRenderQuestion();
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

function meFinishConfirm() {
  if (confirm('Sınavı bitirmek istediğinize emin misiniz?')) {
    meFinish();
  }
}

function meFinish() {
  feStarted = false;
  clearInterval(meTimerRef);
  
  let correct = 0;
  meExamData.questions.forEach((q, idx) => {
    if (meAnswers[idx] === q.correct) correct++;
  });

  const total = meExamData.questions.length;
  document.getElementById('resCorrect').textContent = correct;
  document.getElementById('resWrong').textContent = total - correct;
  
  document.getElementById('meExamScreen').classList.add('hidden');
  document.getElementById('meResultScreen').classList.remove('hidden');
  
  // Update Streak/Stats
  updateStreak();
  saveExamStat('mini', correct, total);

  meRenderReview();
}

function meRenderReview() {
  const list = document.getElementById('meReviewList');
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
}

function meResetExam() {
  meStarted = false;
  meExamData = null;
  meAnswers = {};
  document.getElementById('meResultScreen').classList.add('hidden');
  document.getElementById('meStartScreen').classList.remove('hidden');
  document.getElementById('meSelectedInfo').classList.add('hidden');
  document.getElementById('meStartBtn').disabled = true;
}