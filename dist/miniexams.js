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
                <p class="text-[10px] text-slate-400 font-medium uppercase tracking-tight">${e.info}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <div id="meSelectedInfo" class="hidden bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      <div id="meCountSettings">
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
        <button onclick="meNavQuestion(-1)" class="px-5 py-3 border border-slate-300 rounded-xl">Önceki</button>
        <button onclick="meNavQuestion(1)" class="px-5 py-3 bg-slate-900 text-white rounded-xl">Sonraki</button>
      </div>
    </div>
  </div>

  <div id="meResultScreen" class="hidden">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
          <div class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 text-center text-white">
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-800/20 border-2 border-red-800/30 mb-6">
              <i class="fas fa-trophy text-4xl text-yellow-500"></i>
            </div>
            <h3 class="text-4xl font-black mb-2" style="font-family:'Playfair Display',serif;">Sınav Tamamlandı!</h3>
            <p class="text-slate-400 font-medium italic">Performans analizinizi aşağıda görebilirsiniz.</p>
            
            <div class="grid grid-cols-3 gap-4 mt-10">
              <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <p class="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Toplam Soru</p>
                <p id="resTotal" class="text-2xl font-black">--</p>
              </div>
              <div class="bg-green-500/10 backdrop-blur-sm rounded-2xl p-4 border border-green-500/20">
                <p class="text-[10px] text-green-400 uppercase font-bold tracking-widest mb-1">Doğru</p>
                <p id="resCorrect" class="text-2xl font-black text-green-400">--</p>
              </div>
              <div class="bg-red-500/10 backdrop-blur-sm rounded-2xl p-4 border border-red-500/20">
                <p class="text-[10px] text-red-400 uppercase font-bold tracking-widest mb-1">Yanlış</p>
                <p id="resWrong" class="text-2xl font-black text-red-400">--</p>
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
        // Fixed exams: just slice to count if necessary (though usually they are 40)
        // No shuffle for fixed exams to keep order
    }

    meExamData = {
        ...fullData,
        questions: processedQuestions
    };

    meAnswers = {};
    meCurrentIdx = 0;
    meSecondsLeft = Math.min(60, processedQuestions.length * 1.5) * 60;
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
  const total = meExamData.questions.length;
  document.getElementById('meQNum').textContent = `${meCurrentIdx + 1}/${total}`;
  
  const section = (meExamData.sections || []).find(s => s.id === q.section_id);
  const type = q.section_id || q.type || '';
  document.getElementById('meSectionLabel').textContent = section ? section.label : type;
  
  const pBox = document.getElementById('mePassageBox');
  pBox.classList.add('hidden');
  pBox.innerHTML = '';

  let isCloze = type.toLowerCase().includes('cloze');
  let isReading = type.toLowerCase().includes('read');

  if (isCloze) {
      // Reconstruct Cloze Passage from sister questions
      // Find the group of 5 (or less) this question belongs to in CURRENT meExamData
      let startIdx = meCurrentIdx - (meCurrentIdx % 5);
      let group = meExamData.questions.slice(startIdx, startIdx + 5);
      let fullText = group.map(g => g.question).join(" ");
      
      // Cleanup: sometimes questions repeat parts of sentences. 
      // For now, simple join works for most of our data.
      pBox.innerHTML = `<div class="font-bold mb-2 text-red-800"><i class="fas fa-file-alt mr-2"></i>CLOZE TEST PARÇASI</div>` + fullText.replace(/\n/g, '<br>');
      pBox.classList.remove('hidden');
      document.getElementById('meQuestion').innerHTML = `<span class="bg-red-800 text-white px-2 py-0.5 rounded text-sm mr-2">SORU ${meCurrentIdx + 1}</span> <b>Boşluk için en uygun seçeneği bulun.</b>`;
  } else if (isReading) {
      // Show passage
      let passageText = q.passage || q.passage_text || "";
      if (!passageText && q.passage_id && meExamData.passages) {
          let pObj = meExamData.passages.find(px => px.id === q.passage_id);
          if (pObj) passageText = pObj.text;
      }
      // If still no passage, maybe it's in the question itself (some old formats)
      if (!passageText && q.question.length > 200) {
          passageText = q.question; // The long part is usually the passage
      }

      if (passageText) {
          pBox.innerHTML = `<div class="font-bold mb-2 text-blue-800"><i class="fas fa-book-open mr-2"></i>OKUMA PARÇASI</div>` + passageText.replace(/\n/g, '<br>');
          pBox.classList.remove('hidden');
      }
      
      // If question was the passage, we need to extract the actual question part if it's at the end
      let displayQuestion = q.question;
      if (isReading && passageText === q.question) {
          // It's likely the question is "According to the passage..." at the end.
          // But our Reading JSON often puts the same passage in every question.
          displayQuestion = "Parçaya göre soruyu cevaplayınız.";
      }
      document.getElementById('meQuestion').innerHTML = displayQuestion.replace(/\n/g, '<br>');
  } else {
      // Normal questions
      document.getElementById('meQuestion').innerHTML = q.question.replace(/\n/g, '<br>');
  }

  const optBox = document.getElementById('meOptions');
  optBox.innerHTML = '';
  Object.entries(q.options).forEach(([k, v]) => {
    const b = document.createElement('button');
    b.className = `w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${meAnswers[q.id] === k ? 'border-red-600 bg-red-50 ring-2 ring-red-100' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`;
    b.innerHTML = `<span class="inline-block w-8 font-bold text-red-800">${k})</span> ${v}`;
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
  let correctCount = 0;
  let wrongCount = 0;
  const reviewList = document.getElementById('meReviewList');
  reviewList.innerHTML = '';

  meExamData.questions.forEach((q, idx) => {
    const userAns = meAnswers[q.id];
    const isCorrect = userAns === q.correct;
    if (isCorrect) correctCount++;
    else if (userAns) wrongCount++;

    const div = document.createElement('div');
    div.className = `p-6 rounded-2xl border-2 ${isCorrect ? 'border-green-100 bg-green-50/30' : (userAns ? 'border-red-100 bg-red-50/30' : 'border-slate-100 bg-slate-50/30')}`;
    
    let optionsHtml = '';
    Object.entries(q.options).forEach(([k, v]) => {
      let statusClass = 'text-slate-600';
      let icon = '';
      if (k === q.correct) {
        statusClass = 'text-green-700 font-bold';
        icon = '<i class="fas fa-check-circle mr-2"></i>';
      } else if (k === userAns) {
        statusClass = 'text-red-700 font-bold';
        icon = '<i class="fas fa-times-circle mr-2"></i>';
      }
      optionsHtml += `<div class="text-sm py-1 ${statusClass}">${icon}<strong>${k})</strong> ${v}</div>`;
    });

    div.innerHTML = `
      <div class="flex items-center gap-2 mb-3">
        <span class="w-8 h-8 rounded-lg ${isCorrect ? 'bg-green-600' : (userAns ? 'bg-red-600' : 'bg-slate-400')} text-white flex items-center justify-center font-bold text-xs">${idx + 1}</span>
        <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">${q.section_id || 'SORU'}</span>
      </div>
      <div class="text-sm text-slate-800 font-semibold mb-4 leading-relaxed">${q.question.replace(/\n/g, '<br>')}</div>
      <div class="space-y-1 bg-white/50 rounded-xl p-4 border border-white/80">${optionsHtml}</div>
    `;
    reviewList.appendChild(div);
  });

  document.getElementById('resTotal').textContent = meExamData.questions.length;
  document.getElementById('resCorrect').textContent = correctCount;
  document.getElementById('resWrong').textContent = meExamData.questions.length - correctCount;

  // FIREBASE SAVE
  if (typeof window.saveQuizScoreFirestore === 'function') {
      const total = meExamData.questions.length;
      const pct = Math.round((correctCount / total) * 100);
      const xp = correctCount * 10;
      const topic = meExamData.meta.title || "Mini Exam";
      
      window.saveQuizScoreFirestore(pct, xp, topic).then(() => {
          if (typeof updateGamification === 'function') updateGamification();
          if (typeof initCharts === 'function') setTimeout(initCharts, 1000);
      }).catch(console.error);
  }

  document.getElementById('meExamScreen').classList.add('hidden');
  document.getElementById('meResultScreen').classList.remove('hidden');
}

function meResetExam() {
  document.getElementById('meResultScreen').classList.add('hidden');
  document.getElementById('meStartScreen').classList.remove('hidden');
  document.getElementById('meStartBtn').disabled = true;
  document.getElementById('meSelectedInfo').classList.add('hidden');
}