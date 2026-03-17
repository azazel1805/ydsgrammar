let currentReadingData = null;
let aiReadingAnswers = {};

function getAiReadingHTML() {
  return `
  <div class="max-w-[1400px] mx-auto px-4 py-8 lg:py-12 animate-in fade-in duration-700">
    <!-- HERO HEADER -->
    <div class="text-center mb-12 relative">
       <div class="absolute inset-0 -top-20 bg-gradient-to-b from-indigo-50/50 to-transparent blur-3xl pointer-events-none -z-10"></div>
       
       <div class="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 shadow-xl shadow-slate-200">
         <i class="fas fa-microchip text-indigo-400"></i>
         <span>AI Reading Intelligence</span>
       </div>
       
       <h2 class="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight" style="font-family:'Playfair Display',serif;">
         Reading <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Intelligence</span> Lab
       </h2>
       <p class="text-slate-500 max-w-xl mx-auto text-sm lg:text-base font-medium">Yapay zeka ile kişiselleştirilmiş okuma parçaları oluşturun, akademik becerilerinizi anında ölçün.</p>
    </div>

    <!-- SETUP AREA: COMPACT & ELEGANT -->
    <div id="aiReadingSetup" class="max-w-4xl mx-auto bg-white border border-slate-100 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl shadow-indigo-500/5 mb-12 relative overflow-hidden">
       <div class="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
         <i class="fas fa-brain text-8xl"></i>
       </div>

       <div class="grid lg:grid-cols-3 gap-6 items-end relative z-10">
         <div class="lg:col-span-1">
           <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">KONU SEÇİMİ</label>
           <div class="relative group">
             <i class="fas fa-list-ul absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"></i>
             <select id="aiTopic" class="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl pl-12 pr-6 py-4 font-bold text-slate-800 focus:bg-white focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer">
               <option value="Environmental Science">Çevre Bilimi</option>
               <option value="Artificial Intelligence">Yapay Zeka</option>
               <option value="Ancient History">Antik Tarih</option>
               <option value="Global Economy">Küresel Ekonomi</option>
               <option value="Space Exploration">Uzay Keşfi</option>
               <option value="Medical Advances">Tıbbi Gelişmeler</option>
               <option value="Psychology">Psikoloji</option>
               <option value="Literature">Edebiyat</option>
             </select>
             <i class="fas fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"></i>
           </div>
         </div>

         <div class="lg:col-span-1">
           <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">ZORLUK SEVİYESİ</label>
           <div class="flex p-1 bg-slate-50/80 rounded-2xl border-2 border-slate-100">
             <button onclick="selectAiDifficulty('YDT')" id="diff-YDT" class="ai-diff-btn flex-1 py-3 rounded-xl border-2 border-indigo-100 bg-indigo-50 text-indigo-700 font-black text-xs transition-all shadow-sm">YDT</button>
             <button onclick="selectAiDifficulty('YDS')" id="diff-YDS" class="ai-diff-btn flex-1 py-3 rounded-xl border-2 border-transparent text-slate-400 font-bold text-xs transition-all">YDS</button>
           </div>
           <input type="hidden" id="aiDifficulty" value="YDT">
         </div>

         <div class="lg:col-span-1">
           <button id="generateBtn" onclick="generateAiReading()" class="w-full py-4.5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-indigo-600 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 h-[58px]">
             <i class="fas fa-wand-magic-sparkles"></i>
             PARÇA OLUŞTUR
           </button>
         </div>
       </div>
    </div>

    <!-- LOADING STATE -->
    <div id="aiLoading" class="hidden py-16 text-center animate-in fade-in zoom-in duration-500">
       <div class="relative w-20 h-20 mx-auto mb-8">
          <div class="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
          <div class="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <div class="absolute inset-0 flex items-center justify-center text-indigo-600">
             <i class="fas fa-robot animate-bounce"></i>
          </div>
       </div>
       <h3 class="text-xl font-black text-slate-800 mb-2" style="font-family:'Playfair Display',serif;">Metin Dokunuyor...</h3>
       <p class="text-slate-400 text-sm font-medium animate-pulse uppercase tracking-[0.2em]">Yapay zeka soruları hazırlıyor</p>
    </div>

    <!-- CONTENT AREA: SIDE-BY-SIDE GRID -->
    <div id="aiContent" class="hidden">
      <div class="grid lg:grid-cols-12 gap-6 lg:items-start lg:h-[calc(100vh-200px)]">
        <!-- PASSAGE PANEL (Left) -->
        <div class="lg:col-span-7 bg-white border border-slate-100 rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-slate-200/50 flex flex-col h-full overflow-hidden">
            <div class="flex items-center gap-3 mb-6">
               <span class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest ring-1 ring-indigo-100">Reading Passage</span>
               <div class="h-px flex-1 bg-slate-50"></div>
            </div>
            
            <h3 id="passageTitle" class="text-3xl lg:text-4xl font-black text-slate-900 mb-8 leading-tight tracking-tight" style="font-family:'Playfair Display',serif;"></h3>
            
            <div id="passageBody" class="flex-1 overflow-y-auto pr-4 text-slate-700 leading-loose text-base lg:text-lg space-y-4 font-normal custom-scrollbar" style="font-family: 'Lora', serif;">
              <!-- Passage text here -->
            </div>

            <div class="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <div class="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-wider italic">
                    <i class="fas fa-lightbulb text-amber-500 animate-pulse"></i>
                    <span>Tıkla & Öğren aktif</span>
                </div>
                <div class="flex gap-2">
                   <button onclick="window.print()" class="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-white hover:text-indigo-600 transition-all flex items-center justify-center border border-transparent hover:border-indigo-100">
                     <i class="fas fa-print"></i>
                   </button>
                </div>
            </div>
        </div>

        <!-- QUESTIONS PANEL (Right) -->
        <div class="lg:col-span-5 flex flex-col h-full gap-6">
          <div id="aiQuestionsList" class="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-4">
            <!-- Questions injected here -->
          </div>
          
          <div class="bg-white border border-slate-100 rounded-3xl p-4 shadow-xl shadow-slate-200/50">
            <button id="finishAiBtn" onclick="finishAiReading()" class="w-full py-4.5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-3">
              <i class="fas fa-check-double"></i>
              ANALİZ ET & BİTİR
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- WORD MODAL (PREMIUM) -->
    <div id="aiWordModal" class="fixed inset-0 bg-slate-900/90 backdrop-blur-sm hidden items-center justify-center z-[200] p-4 animate-in fade-in duration-300">
        <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden scale-in-center overflow-y-auto max-h-[90vh]">
            <div class="p-8 lg:p-10">
                <div class="flex justify-between items-start mb-10">
                    <div>
                        <h2 id="aiModalWord" class="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter italic" style="font-family:'Playfair Display',serif;">WORD</h2>
                        <div id="aiModalIpa" class="text-indigo-500 font-black text-sm tracking-widest uppercase opacity-60 mt-2">// ... //</div>
                    </div>
                    <button onclick="closeAiWordModal()" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100 hover:border-red-100">
                        <i class="fas fa-times text-lg"></i>
                    </button>
                </div>
                
                <div id="aiModalContent" class="space-y-4 pr-2 custom-scrollbar">
                    <!-- Word info cards injected here -->
                </div>

                <div class="mt-10 grid grid-cols-2 gap-4">
                    <button id="aiSaveWordBtn" class="flex-1 px-8 py-4.5 bg-slate-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 shadow-xl shadow-slate-200">
                        <i class="far fa-star"></i> Not Al (Kaydet)
                    </button>
                    <button onclick="closeAiWordModal()" class="flex-1 px-8 py-4.5 bg-slate-50 text-slate-500 font-bold rounded-2xl hover:bg-slate-100 transition-all uppercase tracking-widest text-[10px] border border-slate-100">KAPAT</button>
                </div>
            </div>
        </div>
    </div>
  </div>
  <style>
    .custom-scrollbar::-webkit-scrollbar { width: 5px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
    .scale-in-center { animation: scale-in-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; }
    @keyframes scale-in-center {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    .ai-opt-btn.correct { @apply border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-100/50; }
    .ai-opt-btn.wrong { @apply border-red-500 bg-red-50 text-red-900 ring-2 ring-red-100/50; }
  </style>
  `;
}

window.selectAiDifficulty = function(diff) {
    document.querySelectorAll('.ai-diff-btn').forEach(btn => {
        btn.classList.replace('bg-purple-50', 'bg-white');
        btn.classList.replace('border-purple-100', 'border-slate-100');
        btn.classList.replace('text-purple-800', 'text-slate-400');
    });
    
    const target = document.getElementById('diff-' + diff);
    target.classList.replace('bg-white', 'bg-purple-50');
    target.classList.replace('border-slate-100', 'border-purple-100');
    target.classList.replace('text-slate-400', 'text-purple-800');
    
    document.getElementById('aiDifficulty').value = diff;
};

window.generateAiReading = async function() {
    const topic = document.getElementById('aiTopic').value;
    const difficulty = document.getElementById('aiDifficulty').value;
    const btn = document.getElementById('generateBtn');
    const loading = document.getElementById('aiLoading');
    const setup = document.getElementById('aiReadingSetup');
    const content = document.getElementById('aiContent');

    btn.disabled = true;
    setup.classList.add('opacity-50', 'pointer-events-none');
    loading.classList.remove('hidden');
    content.classList.add('hidden');

    try {
        const response = await fetch("/.netlify/functions/generate-reading", {
            method: "POST",
            body: JSON.stringify({ topic, difficulty })
        });

        if (!response.ok) throw new Error("Generation failed");

        const data = await response.json();
        currentReadingData = data;
        aiReadingAnswers = {};

        // Render UI
        document.getElementById('passageTitle').textContent = data.title;
        // Render UI
        document.getElementById('passageTitle').textContent = data.title;
        document.getElementById('passageBody').innerHTML = data.passage.split("\n").map(p => `<p class="mb-4">${aiMakeClickable(p)}</p>`).join("");
        
        renderAiQuestions(data.questions);

        loading.classList.add('hidden');
        content.classList.remove('hidden');
        
        setTimeout(() => content.scrollIntoView({ behavior: 'smooth' }), 100);

    } catch (err) {
        console.error(err);
        alert("Üretim sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
        btn.disabled = false;
        setup.classList.remove('opacity-50', 'pointer-events-none');
        loading.classList.add('hidden');
    }
};

function renderAiQuestions(questions) {
    const list = document.getElementById('aiQuestionsList');
    list.innerHTML = questions.map((q, idx) => `
        <div class="bg-white border border-slate-100 rounded-[2rem] p-6 lg:p-8 shadow-sm">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-[10px]">${idx + 1}</span>
                    <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Question</span>
                </div>
                <div class="text-[10px] font-bold text-slate-300 italic">Reading Comprehension</div>
            </div>
            
            <p class="text-slate-800 font-bold text-base lg:text-lg mb-6 leading-snug">${q.qText}</p>
            
            <div class="space-y-2.5" id="q-options-${idx}">
                ${Object.entries(q.options).map(([key, val]) => `
                    <button onclick="selectAiAnswer(${idx}, '${key}')" id="opt-${idx}-${key}" 
                      class="ai-opt-btn group w-full text-left p-4 rounded-2xl border-2 border-slate-50 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all flex items-center gap-4">
                        <span class="w-6 h-6 rounded-lg border border-slate-200 flex items-center justify-center font-black text-[10px] group-hover:bg-white transition-colors">${key}</span>
                        <span class="text-sm font-bold text-slate-600 group-hover:text-indigo-900 transition-colors">${val}</span>
                    </button>
                `).join('')}
            </div>
            
            <div id="explanation-${idx}" class="hidden mt-6 animate-in slide-in-from-top-2 duration-500">
               <div class="p-5 bg-emerald-50/50 border border-emerald-100 rounded-[1.5rem] relative overflow-hidden">
                  <div class="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                     <i class="fas fa-check-circle text-4xl text-emerald-600"></i>
                  </div>
                  <p class="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <i class="fas fa-lightbulb"></i> Çözüm Yolu & Analiz
                  </p>
                  <p class="text-sm text-emerald-800/80 leading-relaxed italic font-medium">${q.explanation}</p>
               </div>
            </div>
        </div>
    `).join('');
}

window.selectAiAnswer = function(qIdx, key) {
    aiReadingAnswers[qIdx] = key;
    
    // UI Update
    const container = document.getElementById(`q-options-${qIdx}`);
    container.querySelectorAll('.ai-opt-btn').forEach(btn => {
        btn.classList.remove('border-purple-600', 'bg-purple-50', 'text-purple-900');
    });
    
    const target = document.getElementById(`opt-${qIdx}-${key}`);
    target.classList.add('border-purple-600', 'bg-purple-50', 'text-purple-900');
};

window.finishAiReading = function() {
    if (Object.keys(aiReadingAnswers).length < currentReadingData.questions.length) {
        if (!confirm("Tüm soruları cevaplamadınız. Bitirmek istediğinize emin misiniz?")) return;
    }

    let correctCount = 0;
    currentReadingData.questions.forEach((q, idx) => {
        const userAns = aiReadingAnswers[idx];
        const isCorrect = userAns === q.correct;
        if (isCorrect) correctCount++;

        // Show feedback
        const container = document.getElementById(`q-options-${idx}`);
        const explanation = document.getElementById(`explanation-${idx}`);
        
        container.querySelectorAll('.ai-opt-btn').forEach(btn => {
            const btnKey = btn.id.split('-').pop();
            btn.disabled = true;
            if (btnKey === q.correct) {
                btn.classList.add('border-emerald-500', 'bg-emerald-50', 'text-emerald-900');
            } else if (btnKey === userAns && !isCorrect) {
                btn.classList.add('border-red-500', 'bg-red-50', 'text-red-900');
            }
        });
        
        explanation.classList.remove('hidden');
    });

    document.getElementById('finishAiBtn').classList.add('hidden');
    
    // Gamification
    if (typeof window.saveQuizScoreFirestore === "function") {
        const xp = correctCount * 50;
        window.saveQuizScoreFirestore(100, xp, `AI Reading: ${currentReadingData.title}`);
    }

    alert(`Çalışma bitti! ${correctCount} / ${currentReadingData.questions.length} doğru.`);
};

window.aiReadingHTML = getAiReadingHTML();

// Interactive Word Logic
function aiMakeClickable(text) {
    if (!text) return "";
    const parts = text.split(/([\s,.!?;:()"]+)/);
    return parts.map(part => {
        if (/[\s,.!?;:()"]+/.test(part)) return part;
        if (part.trim().length === 0) return part;
        return `<span onclick="window.showAiWordDetails('${part.replace(/'/g, "\\'")}')" class="cursor-pointer hover:bg-purple-100 hover:text-purple-900 rounded transition-colors underline decoration-purple-100 underline-offset-4">${part}</span>`;
    }).join('');
}

async function showAiWordDetails(word) {
    const modal = document.getElementById('aiWordModal');
    const wordEl = document.getElementById('aiModalWord');
    const ipaEl = document.getElementById('aiModalIpa');
    const contentEl = document.getElementById('aiModalContent');
    
    if (!modal) return;

    wordEl.innerText = word;
    ipaEl.innerText = "Sözlük aranıyor...";
    contentEl.innerHTML = '<div class="flex justify-center p-12"><i class="fas fa-spinner fa-spin text-3xl text-purple-500"></i></div>';
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    try {
        // Update Save Button State
        const saveBtn = document.getElementById('aiSaveWordBtn');
        const isAlreadySaved = typeof window.savedWordSet !== 'undefined' && window.savedWordSet.has(word);
        
        saveBtn.innerHTML = isAlreadySaved ? '<i class="fas fa-star text-yellow-500"></i> Kaydedildi' : '<i class="far fa-star"></i> Not Al (Kaydet)';
        saveBtn.onclick = () => window.toggleAiWordSave(word, saveBtn);

        // Fetch English Meanings
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
        
        // Fetch Turkish Meaning (NLP Analyze)
        let turkishMeaning = null;
        try {
            const trRes = await fetch("/.netlify/functions/nlpAnalyze", {
                method: "POST",
                body: JSON.stringify({ text: word })
            });
            const trData = await trRes.json();
            turkishMeaning = trData.translation;
        } catch(e) { console.error("TR Translate fail", e); }

        if (res.ok) {
            const data = await res.json();
            const first = data[0];
            ipaEl.innerText = first.phonetic || '// ... //';
            
            let html = "";
            
            // Add Turkish Highlight if available
            if (turkishMeaning) {
                html += `
                <div class="bg-red-50 p-5 rounded-2xl border border-red-100 mb-4">
                    <p class="text-[10px] uppercase font-black text-red-800 mb-1">TÜRKÇE ANLAMI</p>
                    <p class="text-xl font-bold text-red-900">${turkishMeaning}</p>
                </div>`;
            }

            html += first.meanings.map(m => `
              <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <p class="text-[10px] uppercase font-black text-purple-500 mb-2">${m.partOfSpeech}</p>
                <p class="text-slate-800 font-medium italic mb-2">${m.definitions[0].definition}</p>
                ${m.definitions[0].example ? `<p class="text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-100 mt-3 italic">"${m.definitions[0].example}"</p>` : ''}
              </div>
            `).join('');
            
            contentEl.innerHTML = html;
        } else {
           ipaEl.innerText = "";
           contentEl.innerHTML = `
                ${turkishMeaning ? `
                <div class="bg-red-50 p-5 rounded-2xl border border-red-100 mb-4">
                    <p class="text-[10px] uppercase font-black text-red-800 mb-1">TÜRKÇE ANLAMI</p>
                    <p class="text-xl font-bold text-red-900">${turkishMeaning}</p>
                </div>` : ''}
                <div class="p-8 text-center text-slate-400 italic">Detaylı sözlük verisi bulunamadı.</div>
           `;
        }
    } catch(e) {
        contentEl.innerHTML = "Bir hata oluştu.";
    }
}

window.toggleAiWordSave = async function(word, btn) {
    if (!window.currentUser) {
        if (typeof window.openLoginModal === "function") window.openLoginModal();
        return;
    }

    try {
        const isSaved = typeof window.savedWordSet !== 'undefined' && window.savedWordSet.has(word);
        
        if (isSaved) {
            await window.deleteWordFirestore(word);
            if (typeof window.savedWordSet !== 'undefined') window.savedWordSet.delete(word);
            btn.innerHTML = '<i class="far fa-star"></i> Not Al (Kaydet)';
        } else {
            const data = {
                word: word,
                source: "ai_reading",
                timestamp: new Date().getTime()
            };
            await window.saveWordFirestore(data);
            if (typeof window.savedWordSet !== 'undefined') window.savedWordSet.add(word);
            btn.innerHTML = '<i class="fas fa-star text-yellow-500"></i> Kaydedildi';
        }
    } catch (err) {
        console.error("Save error:", err);
    }
};

window.closeAiWordModal = function() {
    const modal = document.getElementById('aiWordModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

window.showAiWordDetails = showAiWordDetails;
