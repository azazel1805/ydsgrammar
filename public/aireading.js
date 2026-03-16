let currentReadingData = null;
let aiReadingAnswers = {};

function getAiReadingHTML() {
  return `
  <div class="max-w-5xl mx-auto px-4 py-12">
    <div class="text-center mb-12">
      <div class="inline-flex items-center gap-3 bg-gradient-to-r from-purple-800 to-indigo-900 text-white px-6 py-2.5 rounded-2xl shadow-xl mb-6">
        <i class="fas fa-brain text-purple-400"></i>
        <span class="font-bold tracking-widest text-sm uppercase">AI Reading Lab (Premium)</span>
      </div>
      <h2 class="text-4xl font-black text-slate-900 mb-6" style="font-family:'Playfair Display',serif;">Akıllı Okuma Parçası Oluşturucu</h2>
      <p class="text-slate-500 max-w-2xl mx-auto">İstediğiniz konuda, sınav zorluk seviyesinde özgün metinler ve sorular üreterek pratik yapın.</p>
    </div>

    <div id="aiReadingSetup" class="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm mb-10">
      <div class="grid md:grid-cols-2 gap-8 mb-10">
        <div>
          <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">KONU SEÇİMİ</label>
          <select id="aiTopic" class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-800 focus:border-purple-600 outline-none transition-all appearance-none cursor-pointer">
            <option value="Environmental Science">Çevre Bilimi</option>
            <option value="Artificial Intelligence">Yapay Zeka</option>
            <option value="Ancient History">Antik Tarih</option>
            <option value="Global Economy">Küresel Ekonomi</option>
            <option value="Space Exploration">Uzay Keşfi</option>
            <option value="Medical Advances">Tıbbi Gelişmeler</option>
            <option value="Psychology">Psikoloji</option>
            <option value="Literature">Edebiyat</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">ZORLUK SEVİYESİ</label>
          <div class="flex gap-4">
            <button onclick="selectAiDifficulty('YDT')" id="diff-YDT" class="ai-diff-btn flex-1 py-4 rounded-2xl border-2 border-purple-100 bg-purple-50 text-purple-800 font-bold transition-all">YDT</button>
            <button onclick="selectAiDifficulty('YDS')" id="diff-YDS" class="ai-diff-btn flex-1 py-4 rounded-2xl border-2 border-slate-100 text-slate-400 font-bold transition-all">YDS</button>
          </div>
          <input type="hidden" id="aiDifficulty" value="YDT">
        </div>
      </div>

      <div class="flex justify-center">
        <button id="generateBtn" onclick="generateAiReading()" class="px-12 py-4 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-purple-900 transition-all flex items-center gap-3">
          <i class="fas fa-magic"></i>
          PARÇA OLUŞTUR
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div id="aiLoading" class="hidden py-20 text-center">
      <div class="w-16 h-16 border-4 border-purple-100 border-t-purple-800 rounded-full animate-spin mx-auto mb-6"></div>
      <p class="font-serif italic text-slate-500 animate-pulse">Yapay zeka metni dokuyor ve soruları hazırlıyor...</p>
    </div>

    <!-- Content Area -->
    <div id="aiContent" class="hidden">
      <div class="grid lg:grid-cols-2 gap-10 items-start">
        <!-- Passage Section -->
        <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm sticky top-24">
            <h3 id="passageTitle" class="text-3xl font-black text-slate-900 mb-8" style="font-family:'Playfair Display',serif;"></h3>
            <div id="passageBody" class="text-slate-700 leading-loose text-lg space-y-4 font-normal" style="font-family: 'Lora', serif;">
              <!-- Passage text here -->
            </div>
            <div class="mt-10 pt-10 border-t border-slate-100">
                <div class="flex items-center gap-2 text-slate-400 text-sm italic">
                    <i class="fas fa-info-circle"></i>
                    <span>Metindeki bilinmeyen kelimelerin üzerine tıklayarak not alabilirsiniz.</span>
                </div>
            </div>
        </div>

        <!-- Questions Section -->
        <div class="space-y-6">
          <div id="aiQuestionsList">
            <!-- Questions here -->
          </div>
          
          <button id="finishAiBtn" onclick="finishAiReading()" class="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-xl shadow-xl hover:bg-emerald-700 transition-all mt-10">
            ÇALIŞMAYI TAMAMLA
          </button>
        </div>
      </div>
    </div>

    <!-- Word Modal (Copied from focused-exams for stability) -->
    <div id="aiWordModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm hidden items-center justify-center z-[200] p-4 overflow-y-auto">
        <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div class="p-8 lg:p-10 text-black">
                <div class="flex justify-between items-start mb-8">
                    <div>
                        <h2 id="aiModalWord" class="text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tighter italic">WORD</h2>
                        <p id="aiModalIpa" class="text-slate-400 font-mono mt-2 text-sm">// ... //</p>
                    </div>
                    <button onclick="closeAiWordModal()" class="w-10 h-10 lg:w-12 h-12 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div id="aiModalContent" class="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    <!-- Word info cards injected here -->
                </div>
                <div class="mt-8">
                    <button onclick="closeAiWordModal()" class="w-full px-8 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-xs">KAPAT</button>
                </div>
            </div>
        </div>
    </div>
  </div>
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
        <div class="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm mb-6">
            <div class="flex items-center gap-2 mb-4">
                <span class="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-sm">${idx + 1}</span>
                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">SORU</span>
            </div>
            <p class="text-slate-800 font-bold text-lg mb-6">${q.qText}</p>
            <div class="space-y-3" id="q-options-${idx}">
                ${Object.entries(q.options).map(([key, val]) => `
                    <button onclick="selectAiAnswer(${idx}, '${key}')" id="opt-${idx}-${key}" class="ai-opt-btn w-full text-left p-4 rounded-xl border-2 border-slate-50 hover:border-purple-200 transition-all text-slate-600 font-medium text-sm flex items-center gap-4">
                        <span class="w-6 h-6 rounded border border-slate-200 flex items-center justify-center font-bold text-[10px]">${key}</span>
                        <span>${val}</span>
                    </button>
                `).join('')}
            </div>
            <div id="explanation-${idx}" class="hidden mt-6 p-4 bg-emerald-50 border-l-4 border-emerald-400 rounded-xl text-sm italic text-emerald-800">
                <p class="font-bold mb-1">Çözüm Yolu:</p>
                <p>${q.explanation}</p>
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
        return `<span onclick="showAiWordDetails('${part.replace(/'/g, "\\'")}')" class="cursor-pointer hover:bg-purple-100 hover:text-purple-900 rounded transition-colors underline decoration-purple-100 underline-offset-4">${part}</span>`;
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
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
        if (res.ok) {
            const data = await res.json();
            const first = data[0];
            ipaEl.innerText = first.phonetic || '// ... //';
            
            contentEl.innerHTML = first.meanings.map(m => `
              <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <p class="text-[10px] uppercase font-black text-purple-500 mb-2">${m.partOfSpeech}</p>
                <p class="text-slate-800 font-medium italic mb-2">${m.definitions[0].definition}</p>
                ${m.definitions[0].example ? `<p class="text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-100 mt-3 italic">"${m.definitions[0].example}"</p>` : ''}
              </div>
            `).join('');
        } else {
           ipaEl.innerText = "";
           contentEl.innerHTML = `<div class="p-8 text-center text-slate-400 italic">Sözlük verisi bulunamadı, ancak bu kelime kritik olabilir.</div>`;
        }
    } catch(e) {
        contentEl.innerHTML = "Bir hata oluştu.";
    }
}

window.closeAiWordModal = function() {
    const modal = document.getElementById('aiWordModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

window.showAiWordDetails = showAiWordDetails;
