/* ============================================================
   tutor-exam.js  –  Guided AI Tutor Exam Mode
   ============================================================ */

let teExamData = null;
let teCurrentIdx = 0;
let teAnswers = {};
let teTimerRef = null;
let teSecondsLeft = 0;
let teIsExplaining = false;
let teQuestionTimerRef = null;
let teQuestionSeconds = 90; // 90 seconds per question default

const tutorExamHTML = `
<div class="max-w-5xl mx-auto px-4 py-12">
    <div class="text-center mb-12">
        <div class="inline-flex items-center gap-3 bg-gradient-to-r from-red-800 to-black text-white px-6 py-2.5 rounded-2xl shadow-xl mb-6">
            <i class="fas fa-graduation-cap text-red-500"></i>
            <span class="font-bold tracking-widest text-sm uppercase">AI Rehberli Deneme (Premium)</span>
        </div>
        <h2 class="text-4xl font-black text-slate-900 mb-6" style="font-family:'Playfair Display',serif;">Tutor Mode: Yapay Zeka ile Birlikte Çöz</h2>
        <p class="text-slate-500 max-w-2xl mx-auto">İster tam deneme, ister spesifik soru tipleri seçerek AI koçunuzla birlikte çalışın.</p>
    </div>

    <div id="teStartScreen">
        <!-- Tabs for Full vs Categorical -->
        <div class="flex justify-center gap-4 mb-10">
            <button onclick="teSwitchSource('categorical')" id="teSource-cat" class="te-source-btn px-6 py-2 rounded-xl font-bold transition-all bg-red-800 text-white shadow-lg">Soru Tipine Göre</button>
            <button onclick="teSwitchSource('full')" id="teSource-full" class="te-source-btn px-6 py-2 rounded-xl font-bold transition-all bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">Tam Denemeler</button>
        </div>

        <div id="teSelectionGrid" class="space-y-10">
            <!-- Content will be injected here -->
        </div>

        <div id="teSelectedInfo" class="hidden bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm mb-10 mt-10">
            <div class="flex flex-col md:flex-row items-center gap-8">
                <div class="w-20 h-20 rounded-full bg-red-800 flex items-center justify-center shrink-0 shadow-lg">
                    <i class="fas fa-robot text-white text-3xl"></i>
                </div>
                <div class="flex-1 text-center md:text-left">
                    <h3 class="text-2xl font-bold text-slate-800 mb-2">AI Koçunuz Hazır!</h3>
                    <p class="text-slate-500 mb-6">Bu modda her soru için 90 saniyeniz olacak. AI'dan ipucu alabilir veya yanlış yaptığınızda anında açıklama isteyebilirsiniz.</p>
                    
                    <div id="teCountSetting" class="mb-6 hidden">
                        <p class="font-bold text-slate-700 mb-3">Soru Sayısı:</p>
                        <div class="flex items-center justify-center md:justify-start gap-4">
                            <button onclick="teUpdateCount(-5)" class="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-red-800 hover:text-white transition-all font-bold">-</button>
                            <input type="number" id="teQuestionCount" value="15" min="5" max="40" class="w-20 bg-slate-50 border-2 border-slate-100 text-slate-800 text-center font-bold text-xl py-2 rounded-xl focus:border-red-800 outline-none">
                            <button onclick="teUpdateCount(5)" class="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-red-800 hover:text-white transition-all font-bold">+</button>
                        </div>
                    </div>

                    <button onclick="teStartExam()" class="px-12 py-4 bg-red-800 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-black transition-all">
                        REHBERLİ SINAVI BAŞLAT
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Exam Interface -->
    <div id="teExamScreen" class="hidden">
        <div class="grid lg:grid-cols-3 gap-8">
            <!-- Left: Question Area -->
            <div class="lg:col-span-2 space-y-6">
                <div class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm p-4 rounded-2xl mb-6 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <span id="teQNum" class="font-black text-red-800 text-xl">1 / 80</span>
                        <div class="h-4 w-px bg-slate-200"></div>
                        <div class="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg">
                            <i class="fas fa-clock text-red-600 text-xs"></i>
                            <span id="teQuestionTimer" class="font-mono font-bold text-slate-700">01:30</span>
                        </div>
                    </div>
                    <button onclick="teFinishConfirm()" class="text-xs font-bold text-slate-400 hover:text-red-800 uppercase tracking-widest transition-colors">Sınavı Kapat</button>
                </div>

                <div id="tePassageBox" class="hidden bg-blue-50/50 border-l-4 border-blue-400 rounded-3xl p-8 mb-6 text-slate-700 leading-relaxed text-sm max-h-[400px] overflow-y-auto shadow-sm"></div>
                
                <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                    <div id="teQuestion" class="text-xl font-bold text-slate-800 mb-8 leading-relaxed"></div>
                    <div id="teOptions" class="space-y-4"></div>
                    
                    <div id="teFeedbackArea" class="hidden mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom-5">
                       <!-- AI Feedback will be injected here -->
                    </div>

                    <div class="mt-10 flex gap-4">
                        <button id="teAiHintBtn" onclick="teGetAiHint()" class="flex-1 py-4 bg-orange-50 text-orange-700 border-2 border-orange-100 rounded-2xl font-bold hover:bg-orange-100 transition-all flex items-center justify-center gap-2">
                            <i class="fas fa-lightbulb"></i> AI'dan İpucu İste
                        </button>
                        <button id="teNextBtn" onclick="teNextQuestion()" class="hidden flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all">
                            Sonraki Soruya Geç
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right: AI Coach Sidebar -->
            <div class="lg:col-span-1">
                <div class="bg-slate-900 rounded-[2.5rem] p-8 text-white sticky top-24 shadow-2xl overflow-hidden">
                    <div class="absolute top-0 right-0 p-8 opacity-10">
                        <i class="fas fa-robot text-8xl rotate-12"></i>
                    </div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-4 mb-8">
                            <div class="w-12 h-12 rounded-xl bg-red-800 flex items-center justify-center shadow-lg">
                                <i class="fas fa-brain"></i>
                            </div>
                            <div>
                                <h4 class="font-black text-lg">AI Koçun</h4>
                                <p class="text-[10px] text-red-400 uppercase tracking-widest font-bold">Aktif Rehberlik</p>
                            </div>
                        </div>

                        <div id="teAiCoachMessage" class="space-y-4 text-sm text-slate-300 leading-relaxed italic">
                            "Hazırsan başlayalım. Her soruda yanındayım, takıldığın yerde çekinmeden 'İpucu İste' diyebilirsin!"
                        </div>
                        
                        <div id="teAiHintContent" class="hidden mt-8 p-4 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-400">
                             <!-- AI Hint text will appear here -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Results -->
    <div id="teResultScreen" class="hidden">
        <div class="bg-white rounded-[3rem] shadow-2xl p-12 text-center border border-slate-100">
            <div class="w-32 h-32 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-emerald-200/50">
                <i class="fas fa-check-double text-4xl"></i>
            </div>
            <h3 class="text-4xl font-black text-slate-900 mb-4" style="font-family:'Playfair Display',serif;">Rehberli Çalışma Bitti!</h3>
            <p class="text-slate-500 mb-10 max-w-lg mx-auto">AI koçunla birlikte toplam <span id="teTotalSolved" class="font-bold text-slate-800">--</span> soru çözdün. Akademik gelişim raporun profil sayfasına eklendi.</p>
            
            <div class="grid grid-cols-2 gap-6 mb-12 max-w-md mx-auto">
                <div class="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                    <p class="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Doğru</p>
                    <p id="teResCorrect" class="text-3xl font-black text-emerald-700">--</p>
                </div>
                <div class="p-6 bg-red-50 rounded-3xl border border-red-100">
                    <p class="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Yanlış</p>
                    <p id="teResWrong" class="text-3xl font-black text-red-700">--</p>
                </div>
            </div>

            <button onclick="teReset()" class="px-12 py-4 bg-slate-900 text-white rounded-2xl font-black transition-all hover:bg-red-800">Kapat ve Dön</button>
        </div>
    </div>

</div>
`;

function initTutorExam() {
  const container = document.getElementById('tab-tutor-exam');
  if (container) {
    container.innerHTML = tutorExamHTML;
    teSwitchSource('categorical');
  }
}

window.teSwitchSource = function(type) {
  document.querySelectorAll('.te-source-btn').forEach(btn => {
    btn.classList.remove('bg-red-800', 'text-white', 'shadow-lg');
    btn.classList.add('bg-white', 'border', 'border-slate-200', 'text-slate-600');
  });
  
  const active = type === 'categorical' ? 'teSource-cat' : 'teSource-full';
  const el = document.getElementById(active);
  el.classList.add('bg-red-800', 'text-white', 'shadow-lg');
  el.classList.remove('bg-white', 'border', 'border-slate-200', 'text-slate-600');
  
  renderTutorSelection(type);
  document.getElementById('teSelectedInfo').classList.add('hidden');
}

function renderTutorSelection(type) {
  const grid = document.getElementById('teSelectionGrid');
  if (!grid) return;
  
  if (type === 'full') {
    const list = [...(window.FULL_EXAM_LIST || []), ...(window.YDT_EXAM_LIST || [])];
    grid.innerHTML = `
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${list.map(exam => `
          <div onclick="teSelectExam('${exam.id}', this, 'full')" class="te-card group cursor-pointer bg-white border border-slate-100 p-6 rounded-[2rem] hover:border-red-500 hover:shadow-xl transition-all">
              <h4 class="font-black text-slate-800 mb-1">${exam.label}</h4>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">80 Soru • Karma</p>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    // Categorical from CATEGORICAL_MINI_LIST
    if (typeof CATEGORICAL_MINI_LIST === 'undefined') return;
    grid.innerHTML = CATEGORICAL_MINI_LIST.map(cat => `
      <div>
        <h5 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <i class="fas ${cat.icon} text-red-800"></i> ${cat.category}
        </h5>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          ${cat.exams.map(e => `
            <div onclick="teSelectExam('${e.id}', this, 'cat')" class="te-card cursor-pointer border border-slate-200 rounded-2xl p-4 hover:border-red-500 hover:bg-red-50/10 transition-all text-center group">
              <p class="text-sm font-bold text-slate-700 group-hover:text-red-800">${e.label}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }
}

window.teUpdateCount = function(delta) {
    const input = document.getElementById('teQuestionCount');
    if (input) {
        input.value = Math.max(5, Math.min(60, parseInt(input.value) + delta));
    }
}

function teSelectExam(id, card, type) {
  document.querySelectorAll('.te-card').forEach(c => c.classList.remove('border-red-500', 'bg-red-50/10'));
  card.classList.add('border-red-500', 'bg-red-50/10');
  
  const info = document.getElementById('teSelectedInfo');
  const countSet = document.getElementById('teCountSetting');

  info.classList.remove('hidden');
  if (type === 'cat') {
      countSet.classList.remove('hidden');
  } else {
      countSet.classList.add('hidden');
  }
  
  info.scrollIntoView({ behavior: 'smooth', block: 'center' });
  window.selectedTutorExamId = id;
  window.selectedTutorType = type;
}

async function teStartExam() {
  const id = window.selectedTutorExamId;
  const type = window.selectedTutorType;
  const count = parseInt(document.getElementById('teQuestionCount').value) || 15;

  let exam = null;
  if (type === 'full') {
      exam = (window.FULL_EXAM_LIST || []).find(e => e.id === id) || (window.YDT_EXAM_LIST || []).find(e => e.id === id);
  } else {
      if (typeof CATEGORICAL_MINI_LIST !== 'undefined') {
          for (const cat of CATEGORICAL_MINI_LIST) {
              exam = cat.exams.find(e => e.id === id);
              if (exam) break;
          }
      }
  }

  if (!exam) return;

  try {
    const res = await fetch(exam.file + "?v=" + new Date().getTime());
    const fullData = await res.json();
    
    let processedQuestions = fullData.questions;

    // Smarter Grouping for ALL exams (Tutor Mode - Full or Cat)
    let groups = [];
    let currentGroup = [];
    let lastPid = undefined;

    processedQuestions.forEach(q => {
        let pid = q.passage_id;
        let shouldStartNew = false;

        if (pid !== lastPid) {
            shouldStartNew = true;
        } else if (pid === null && currentGroup.length >= 5) {
            shouldStartNew = true;
        }

        if (shouldStartNew && currentGroup.length > 0) {
            groups.push(currentGroup);
            currentGroup = [];
        }
        currentGroup.push(q);
        lastPid = pid;
    });
    if (currentGroup.length > 0) groups.push(currentGroup);

    // Context Unification and Fragment Merging
    groups.forEach(group => {
        let groupLead = "";
        let groupPid = null;

        group.forEach(gq => {
            if (gq.passage_id) groupPid = gq.passage_id;
            if (gq.leading_text) groupLead = gq.leading_text;
        });

        // Detect if this group looks like a Cloze test
        const isClozeGroup = group.some(gq => 
            gq.section_id === 'cloze' || 
            gq.question.includes('Boşluk ') || 
            gq.question.includes('(Blank ')
        );

        if (isClozeGroup && !groupPid && !groupLead) {
            let textFragments = group
                .map(gq => gq.question)
                .filter(txt => !txt.startsWith("Boşluk ") && !txt.includes("için en uygun seçeneği bulun") && !txt.startsWith("(Blank "));
            
            if (textFragments.length > 0) {
                groupLead = textFragments.join(" ");
            }
        }

        group.forEach(gq => {
            if (groupPid && !gq.passage_id) gq.passage_id = groupPid;
            if (groupLead && !gq.leading_text) gq.leading_text = groupLead;
        });
    });

    if (type === 'cat' && !id.startsWith('mini_fixed')) {
        // Shuffle and take subset for dynamic categorical exams
        groups.sort(() => 0.5 - Math.random());
        let selectedQuestions = [];
        for (let group of groups) {
            if (selectedQuestions.length >= count) break;
            selectedQuestions.push(...group);
        }
        processedQuestions = selectedQuestions;
    } else {
        // Fixed or Full: maintain order
        processedQuestions = groups.flat();
    }

    teExamData = {
        meta: fullData.meta || { title: exam.label },
        passages: fullData.passages || [],
        questions: processedQuestions
    };

    teCurrentIdx = 0;
    teAnswers = {};
    teIsExplaining = false;
    
    document.getElementById('teStartScreen').classList.add('hidden');
    document.getElementById('teExamScreen').classList.remove('hidden');
    
    teRenderQuestion();
    teStartQuestionTimer();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    console.error(err);
    alert("Sınav yüklenemedi.");
  }
}

function teStartQuestionTimer() {
  if (teQuestionTimerRef) clearInterval(teQuestionTimerRef);
  teQuestionSeconds = 90;
  teUpdateQuestionTimerDisplay();
  
  teQuestionTimerRef = setInterval(() => {
    if (teIsExplaining) return; // Pause timer during explanation
    
    teQuestionSeconds--;
    teUpdateQuestionTimerDisplay();
    
    if (teQuestionSeconds <= 0) {
      clearInterval(teQuestionTimerRef);
      // Auto-finish/Time out logic? Let's just keep it at 0 for now
    }
  }, 1000);
}

function teUpdateQuestionTimerDisplay() {
  const m = Math.floor(teQuestionSeconds / 60);
  const s = teQuestionSeconds % 60;
  document.getElementById('teQuestionTimer').textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function teRenderQuestion() {
  const q = teExamData.questions[teCurrentIdx];
  const qNum = document.getElementById('teQNum');
  const passageBox = document.getElementById('tePassageBox');
  const qText = document.getElementById('teQuestion');
  const optBox = document.getElementById('teOptions');
  const feedback = document.getElementById('teFeedbackArea');
  const coach = document.getElementById('teAiCoachMessage');
  const hintBox = document.getElementById('teAiHintContent');
  const hintBtn = document.getElementById('teAiHintBtn');
  const nextBtn = document.getElementById('teNextBtn');

  teIsExplaining = false;
  qNum.textContent = `${teCurrentIdx + 1} / ${teExamData.questions.length}`;
  feedback.classList.add('hidden');
  hintBox.classList.add('hidden');
  hintBtn.classList.remove('hidden');
  nextBtn.classList.add('hidden');
  coach.innerHTML = `"Bu soruda ${teExamData.meta?.title || 'stratejik'} bir yaklaşım gerekiyor. Hazırsan seçenekleri inceleyelim."`;

  // Passage
  passageBox.classList.add('hidden');
  let pText = "";
  let pLabel = "METİN / PARAGRAF";
  
  // Detect Label
  const examId = window.selectedTutorExamId;
  if (examId === 'mini_cloze') pLabel = "CLOZE TEST PARÇASI";
  else if (examId === 'mini_read') pLabel = "OKUMA PARÇASI";
  else if (q.passage_id) pLabel = "OKUMA PARÇASI";

  if (q.passage_id) {
    const p = teExamData.passages.find(p => p.id === q.passage_id);
    if (p) pText = p.text;
  }
  
  if (pText || q.leading_text) {
    passageBox.innerHTML = `
        <div class="mb-4">
            <span class="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-100/50 px-3 py-1 rounded-full">${pLabel}</span>
        </div>
        <div class="text-slate-700 leading-loose">${(pText || q.leading_text).replace(/\n/g, '<br>')}</div>
    `;
    passageBox.classList.remove('hidden');
  }

  qText.innerHTML = q.question.replace(/\n/g, '<br>');

  optBox.innerHTML = '';
  Object.entries(q.options).forEach(([key, val]) => {
    const btn = document.createElement('button');
    btn.className = "te-opt-btn w-full text-left p-5 rounded-2xl border-2 border-slate-100 hover:border-red-200 hover:bg-red-50/30 transition-all flex items-center gap-4 group";
    btn.onclick = () => teCheckAnswer(key);
    btn.innerHTML = `
      <div class="w-10 h-10 rounded-xl border-2 border-slate-200 flex items-center justify-center font-black text-slate-400 group-hover:border-red-500 group-hover:text-red-800 transition-colors">${key}</div>
      <span class="text-slate-700 font-bold">${val}</span>
    `;
    optBox.appendChild(btn);
  });
}

async function teGetAiHint() {
  const q = teExamData.questions[teCurrentIdx];
  const hintBtn = document.getElementById('teAiHintBtn');
  const hintBox = document.getElementById('teAiHintContent');
  const coach = document.getElementById('teAiCoachMessage');

  hintBtn.disabled = true;
  hintBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> İpucu Alınıyor...';
  coach.innerHTML = `"Hemen bakıyorum... Sorunun yapısını analiz ediyorum."`;

  try {
    const res = await fetch("/.netlify/functions/tutor-ai", {
      method: "POST",
      body: JSON.stringify({
        mode: "help",
        question: q.question,
        context: q.leading_text || "",
        options: q.options
      })
    });
    
    const data = await res.json();
    hintBox.innerHTML = `
        <div class="space-y-3">
            <p><strong class="text-red-400">Gramer Odağı:</strong> ${data.question_analysis?.grammar_focus || data.grammar_focus}</p>
            <p><strong class="text-cyan-400">İpucu:</strong> ${data.question_analysis?.structural_clue || data.structural_clue}</p>
            <p><strong class="text-orange-400">Yol Haritası:</strong> ${data.question_analysis?.thinking_path || data.thinking_path}</p>
        </div>
    `;
    hintBox.classList.remove('hidden');
    coach.innerHTML = `"Sana birkaç ipucu hazırladım. Özellikle ${data.grammar_focus || 'yapıya'} dikkat et."`;
  } catch (err) {
    console.error(err);
    coach.innerHTML = `"Hata oluştu, tekrar dener misin?"`;
  } finally {
    hintBtn.disabled = false;
    hintBtn.innerHTML = '<i class="fas fa-lightbulb"></i> AI\'dan İpucu İste';
  }
}

async function teCheckAnswer(selectedKey) {
  if (teIsExplaining) return;
  
  const q = teExamData.questions[teCurrentIdx];
  const isCorrect = selectedKey === q.correct;
  teAnswers[teCurrentIdx] = selectedKey;
  teIsExplaining = true;

  const optBtns = document.querySelectorAll('.te-opt-btn');
  optBtns.forEach(btn => {
    btn.disabled = true;
    const key = btn.querySelector('div').innerText;
    if (key === q.correct) {
      btn.classList.add('border-emerald-500', 'bg-emerald-50');
    } else if (key === selectedKey && !isCorrect) {
      btn.classList.add('border-red-500', 'bg-red-50');
    }
  });

  const feedback = document.getElementById('teFeedbackArea');
  const nextBtn = document.getElementById('teNextBtn');
  const hintBtn = document.getElementById('teAiHintBtn');
  const coach = document.getElementById('teAiCoachMessage');

  hintBtn.classList.add('hidden');
  feedback.classList.remove('hidden');
  feedback.innerHTML = `
    <div class="flex items-center gap-2 mb-4">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}">
            <i class="fas ${isCorrect ? 'fa-check' : 'fa-times'}"></i>
        </div>
        <span class="font-black text-sm ${isCorrect ? 'text-emerald-700' : 'text-red-700'}">${isCorrect ? 'MÜKEMMEL!' : 'ÜZÜLME, ÖĞRENELİM'}</span>
    </div>
    <div id="teAiExplanation" class="text-sm text-slate-600 leading-relaxed italic">
        <i class="fas fa-spinner fa-spin mr-2"></i> AI analiz yapıyor...
    </div>
  `;

  nextBtn.classList.remove('hidden');
  coach.innerHTML = isCorrect ? `"Bravo! Tam isabet. Nedenini hemen açıklıyorum."` : `"Küçük bir hata, ama hiç sorun değil. Hemen mantığını kavrayalım."`;

  try {
    const res = await fetch("/.netlify/functions/tutor-ai", {
      method: "POST",
      body: JSON.stringify({
        mode: "explain",
        question: q.question,
        context: q.leading_text || "",
        options: q.options,
        userChoice: selectedKey,
        correctChoice: q.correct
      })
    });
    
    const data = await res.json();
    const explanationDiv = document.getElementById('teAiExplanation');
    explanationDiv.innerHTML = `
        <div class="space-y-4">
            <p><strong>Mantık:</strong> ${data.logic || data.logic_path}</p>
            <p><strong>Neden ${q.correct}?:</strong> ${data.why_correct}</p>
            ${!isCorrect ? `<p class="text-red-800"><strong>Senin Seçimin Neden Yanlıştı?:</strong> ${data.why_wrong}</p>` : ''}
            <div class="p-4 bg-red-800 text-white rounded-xl text-xs not-italic">
                <i class="fas fa-star mr-2"></i> <strong>VIP İpucu:</strong> ${data.exam_tip}
            </div>
        </div>
    `;
  } catch (err) {
    console.error(err);
    document.getElementById('teAiExplanation').innerHTML = "Açıklama yüklenirken bir hata oluştu.";
  }
}

function teNextQuestion() {
  teCurrentIdx++;
  if (teCurrentIdx < teExamData.questions.length) {
    teRenderQuestion();
    teStartQuestionTimer();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    teFinish();
  }
}

function teFinishConfirm() {
  if (confirm('Sınavı bitirmek ve sonuçları görmek istiyor musunuz?')) {
    teFinish();
  }
}

function teFinish() {
  teIsExplaining = true;
  if (teQuestionTimerRef) clearInterval(teQuestionTimerRef);
  
  let correct = 0;
  teExamData.questions.forEach((q, idx) => {
    if (teAnswers[idx] === q.correct) correct++;
  });
  
  const total = Object.keys(teAnswers).length;
  document.getElementById('teResCorrect').textContent = correct;
  document.getElementById('teResWrong').textContent = total - correct;
  document.getElementById('teTotalSolved').textContent = total;
  
  document.getElementById('teExamScreen').classList.add('hidden');
  document.getElementById('teResultScreen').classList.remove('hidden');
  
  // Save stats
  if (typeof window.saveQuizScoreFirestore === "function") {
      const xp = correct * 20;
      window.saveQuizScoreFirestore(100, xp, `Tutor Mode: ${teExamData.meta?.title || 'Exam'}`);
  }
}

function teReset() {
  document.getElementById('teResultScreen').classList.add('hidden');
  document.getElementById('teExamScreen').classList.add('hidden');
  document.getElementById('teStartScreen').classList.remove('hidden');
  document.getElementById('teSelectedInfo').classList.add('hidden');
  renderTutorSelection();
  
  // Switch to dashboard or profile maybe?
  window.switchTab('profile');
}

window.initTutorExam = initTutorExam;
window.tutorExamHTML = tutorExamHTML;
window.teSelectExam = teSelectExam;
window.teStartExam = teStartExam;
window.teGetAiHint = teGetAiHint;
window.teCheckAnswer = teCheckAnswer;
window.teNextQuestion = teNextQuestion;
window.teFinishConfirm = teFinishConfirm;
window.teReset = teReset;
