
let premiumExercisesData = [
    {
        id: '1b',
        title: 'Personal Qualities',
        level: 'B1-B2',
        description: 'Read about personality traits and match them with their definitions.',
        passage: `
            <p class="mb-4">"Winning is the most important thing for me. I've always been <b class="text-red-700">competitive</b>, so I love my job. I think I'm a <b class="text-red-700">good leader</b>. It's important that all the players know what they're doing and it's my job to tell them. The decisions I make are important for the whole team, so I can't be <b class="text-red-700">indecisive</b>."</p>
            
            <p class="mb-4">"I have classes of 80 to 100 children so I have to be <b class="text-red-700">hard-working</b>. I do my best, because education is so important for the children. You need to be a <b class="text-red-700">good communicator</b> in my job, so that you can get the children interested in what they have to learn. Often, we don't have very many resources, so we also need to be creative and be able to <b class="text-red-700">think outside the box</b>."</p>
            
            <p class="mb-4">"I'm a <b class="text-red-700">risk taker</b>, so starting my own business wasn't difficult for me. I've always been very <b class="text-red-700">motivated</b> and <b class="text-red-700">ambitious</b>. I start work at 4.30 a.m. every day. I don't enjoy sleep. You can't afford to be lazy if you want to make money."</p>
        `,
        definitions: [
            { id: 1, text: "work with a lot of effort", answer: "hard-working" },
            { id: 2, text: "have problems making a decision", answer: "indecisive" },
            { id: 3, text: "think differently or in a new way", answer: "think outside the box" },
            { id: 4, text: "want to be more successful than others", answer: "competitive" },
            { id: 5, text: "want to be successful or powerful", answer: "ambitious" },
            { id: 6, text: "want to achieve something because it's interesting or exciting", answer: "motivated" },
            { id: 7, text: "person who does things which are dangerous", answer: "risk taker" },
            { id: 8, text: "person who has the qualities to manage a group of people", answer: "good leader" },
            { id: 9, text: "person who can express ideas or feelings clearly to others", answer: "good communicator" }
        ]
    }
];

let currentExercise = null;

function getPremiumExercisesHTML() {
    return `
    <div class="max-w-6xl mx-auto px-4 py-12">
        <div class="text-center mb-12">
            <div class="inline-flex items-center gap-3 bg-gradient-to-r from-red-800 to-red-950 text-white px-6 py-2.5 rounded-2xl shadow-xl mb-6">
                <i class="fas fa-crown text-yellow-500"></i>
                <span class="font-bold tracking-widest text-sm uppercase">Premium Practice Lab</span>
            </div>
            <h2 class="text-4xl font-black text-slate-900 mb-4" style="font-family:'Playfair Display',serif;">İnteraktif Alıştırmalar</h2>
            <p class="text-slate-500 max-w-2xl mx-auto italic font-medium">Metin bazlı kelime çalışmaları ve eşleştirme alıştırmaları ile dil becerilerinizi geliştirin.</p>
        </div>

        <!-- AI Setup Section -->
        <div id="exerciseAISetup" class="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm mb-12">
            <div class="flex items-center gap-3 mb-8">
                <div class="w-10 h-10 rounded-xl bg-red-800 flex items-center justify-center text-white">
                    <i class="fas fa-magic"></i>
                </div>
                <div>
                    <h3 class="text-xl font-bold text-slate-800">AI Alıştırma Oluşturucu</h3>
                    <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">Herhangi bir konuda eşleştirme egzersizi üretin</p>
                </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">KONU BAŞLIĞI</label>
                    <input type="text" id="exAiTopic" placeholder="Örn: Artificial Intelligence, Tourism, Climate Change..." 
                           class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-800 focus:border-red-600 outline-none transition-all appearance-none">
                </div>
                <div>
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">SEVİYE</label>
                    <select id="exAiDiff" class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-800 focus:border-red-600 outline-none transition-all appearance-none cursor-pointer">
                        <option value="YDT">YDT Seviyesi (Intermediate)</option>
                        <option value="YDS">YDS Seviyesi (Advanced)</option>
                    </select>
                </div>
            </div>
            
            <div class="flex justify-center">
                <button onclick="generateAiExercise()" id="exGenerateBtn" class="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl hover:bg-red-900 transition-all flex items-center gap-3 group">
                    <span>OLAĞANÜSTÜ ALIŞTIRMA ÜRET</span>
                    <i class="fas fa-sparkles text-yellow-400 group-hover:rotate-12 transition-transform"></i>
                </button>
            </div>
        </div>

        <!-- Loading State -->
        <div id="exLoading" class="hidden py-20 text-center animate-in fade-in duration-300">
            <div class="w-16 h-16 border-4 border-red-100 border-t-red-800 rounded-full animate-spin mx-auto mb-6"></div>
            <p class="font-serif italic text-slate-500 animate-pulse">Yapay zeka metni dokuyor ve kelime alıştırmasını tasarlıyor...</p>
        </div>

        <div id="exerciseList" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="md:col-span-2 lg:col-span-3 mb-4">
                <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Hazır Koleksiyon</h4>
            </div>
            ${premiumExercisesData.map(ex => `
                <div onclick="loadPremiumExercise('${ex.id}')" class="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-red-200 transition-all cursor-pointer group relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -mr-12 -mt-12 group-hover:bg-red-100 transition-colors"></div>
                    <span class="inline-block px-3 py-1 bg-red-50 text-red-700 text-[10px] font-black rounded-full mb-4 uppercase tracking-wider">${ex.level}</span>
                    <h3 class="text-2xl font-black text-slate-800 mb-2" style="font-family:'Playfair Display',serif;">${ex.id.toUpperCase()} ${ex.title}</h3>
                    <p class="text-slate-500 text-sm mb-6">${ex.description}</p>
                    <div class="flex items-center text-red-700 font-bold text-sm">
                        <span>Hemen Başla</span>
                        <i class="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
                    </div>
                </div>
            `).join('')}
        </div>

        <div id="exerciseStage" class="hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <!-- Content loaded here -->
        </div>
    </div>
    `;
}

window.generateAiExercise = async function() {
    const topic = document.getElementById('exAiTopic').value.trim();
    const difficulty = document.getElementById('exAiDiff').value;
    const setup = document.getElementById('exerciseAISetup');
    const loading = document.getElementById('exLoading');
    const list = document.getElementById('exerciseList');
    const btn = document.getElementById('exGenerateBtn');

    if (!topic) {
        alert("Lütfen bir konu başlığı giriniz.");
        return;
    }

    setup.classList.add('hidden');
    list.classList.add('hidden');
    loading.classList.remove('hidden');

    try {
        const res = await fetch("/.netlify/functions/generate-premium-exercise", {
            method: "POST",
            body: JSON.stringify({ topic, difficulty })
        });

        if (!res.ok) throw new Error("AI Generation failed");

        const data = await res.json();
        renderExerciseStage(data, difficulty);
        
    } catch (err) {
        console.error(err);
        alert("Alıştırma üretilirken bir hata oluştu. Lütfen tekrar deneyin.");
        setup.classList.remove('hidden');
        list.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }
};

window.loadPremiumExercise = function(id) {
    const ex = premiumExercisesData.find(e => e.id === id);
    if (!ex) return;
    renderExerciseStage(ex, ex.level);
};

function renderExerciseStage(ex, level) {
    currentExercise = ex;
    const list = document.getElementById('exerciseList');
    const stage = document.getElementById('exerciseStage');
    const setup = document.getElementById('exerciseAISetup');

    list.classList.add('hidden');
    setup.classList.add('hidden');
    stage.classList.remove('hidden');

    stage.innerHTML = `
        <div class="mb-8 flex items-center justify-between">
            <button onclick="backToExerciseList()" class="flex items-center gap-2 text-slate-500 hover:text-red-700 font-bold transition-colors">
                <i class="fas fa-arrow-left"></i>
                <span>Geri Dön</span>
            </button>
            <div class="text-right">
                <h3 class="text-2xl font-black text-slate-900" style="font-family:'Playfair Display',serif;">${ex.title}</h3>
                <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">${level} Vocabulary Matching</p>
            </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-10">
            <!-- Text Side -->
            <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm min-h-[400px]">
                <div class="flex items-center gap-3 mb-8">
                    <span class="w-10 h-10 rounded-2xl bg-red-800 text-white flex items-center justify-center font-black">A</span>
                    <p class="text-lg font-bold text-slate-800 italic">Read the passage below and note the highlighted words.</p>
                </div>
                <div class="text-slate-700 leading-loose text-lg space-y-6 font-medium selection:bg-red-100 italic" style="font-family: 'Lora', serif;">
                    ${ex.passage.includes('<p>') ? ex.passage : ex.passage.split('\n').map(p => `<p class="mb-4">${p}</p>`).join('')}
                </div>
                
                <div class="mt-12 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">HOT TIP 🔥</p>
                    <p class="text-sm text-slate-600">Metindeki <b class="text-red-800">renkli</b> kelimeler sağ taraftaki tanımlarla eşleşecek anahtar kelimelerdir. İmla hatalarına dikkat edin!</p>
                </div>
            </div>

            <!-- Matching Side -->
            <div class="space-y-6">
                <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
                    <div class="flex items-center gap-3 mb-8">
                        <span class="w-10 h-10 rounded-2xl bg-indigo-900 text-white flex items-center justify-center font-black">B</span>
                        <p class="text-lg font-bold text-slate-800 italic">Match the highlighted words with the definitions 1–${ex.definitions.length}.</p>
                    </div>

                    <div class="space-y-4">
                        ${ex.definitions.map(def => `
                            <div class="group flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-2xl border-2 border-slate-50 hover:border-red-100 transition-all bg-white relative">
                                <span class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-black text-xs group-hover:bg-red-800 group-hover:text-white transition-colors shrink-0">${def.id}</span>
                                <p class="flex-1 text-slate-700 font-medium text-sm md:text-base leading-tight">${def.text}</p>
                                <div class="relative min-w-[180px]">
                                    <input type="text" 
                                           id="ex-input-${def.id}" 
                                           data-answer="${def.answer.replace(/[<b><\/b>]/g, '')}"
                                           autocomplete="off"
                                           placeholder="..."
                                           class="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2 font-bold text-slate-800 focus:border-red-600 outline-none transition-all placeholder:text-slate-300">
                                    <div id="feedback-${def.id}" class="hidden absolute right-3 top-1/2 -translate-y-1/2">
                                        <i class="fas fa-check text-emerald-500"></i>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="mt-10 pt-8 border-t border-slate-100 flex gap-4">
                        <button onclick="checkPremiumExercise()" class="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-red-900 transition-all flex items-center justify-center gap-3">
                            <i class="fas fa-check-double"></i>
                            KONTROL ET
                        </button>
                        <button onclick="showExerciseAnswers()" class="px-6 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-sm hover:text-slate-600 transition-all">
                            CEVAPLAR
                        </button>
                    </div>
                </div>

                <div id="exerciseResult" class="hidden bg-emerald-600 rounded-3xl p-8 text-white shadow-xl animate-in zoom-in duration-300">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <i class="fas fa-star text-2xl"></i>
                        </div>
                        <div>
                            <h4 class="text-xl font-black">Harika İş!</h4>
                            <p class="opacity-90 font-medium">Tüm kelimeleri doğru eşleştirdiniz.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    stage.scrollIntoView({ behavior: 'smooth' });
}

window.backToExerciseList = function() {
    document.getElementById('exerciseList').classList.remove('hidden');
    document.getElementById('exerciseAISetup').classList.remove('hidden');
    document.getElementById('exerciseStage').classList.add('hidden');
    document.getElementById('exerciseResult').classList.add('hidden');
};

window.checkPremiumExercise = function() {
    const ex = currentExercise;
    if (!ex) return;
    
    let allCorrect = true;
    let score = 0;

    ex.definitions.forEach(def => {
        const input = document.getElementById(`ex-input-${def.id}`);
        const feedback = document.getElementById(`feedback-${def.id}`);
        const userValue = input.value.trim().toLowerCase().replace(/[.,!?;:]/g, '');
        const correctAnswer = def.answer.toLowerCase().replace(/[<b><\/b>]/g, '').trim();

        if (userValue === correctAnswer) {
            input.classList.remove('border-red-500', 'border-slate-200');
            input.classList.add('border-emerald-500', 'bg-emerald-50');
            feedback.innerHTML = '<i class="fas fa-check text-emerald-500"></i>';
            feedback.classList.remove('hidden');
            score++;
        } else if (userValue !== "") {
            input.classList.remove('border-emerald-500', 'border-slate-200');
            input.classList.add('border-red-500', 'bg-red-50');
            feedback.innerHTML = '<i class="fas fa-times text-red-500"></i>';
            feedback.classList.remove('hidden');
            allCorrect = false;
        } else {
            input.classList.remove('border-emerald-500', 'border-red-500');
            input.classList.add('border-slate-200');
            feedback.classList.add('hidden');
            allCorrect = false;
        }
    });

    if (allCorrect && score > 0) {
        document.getElementById('exerciseResult').classList.remove('hidden');
        if (typeof window.saveQuizScoreFirestore === "function") {
            window.saveQuizScoreFirestore(100, 150, `Premium Exercise: ${ex.title}`);
        }
    }
};

window.showExerciseAnswers = function() {
    const ex = currentExercise;
    if (!ex) return;
    ex.definitions.forEach(def => {
        const input = document.getElementById(`ex-input-${def.id}`);
        input.value = def.answer.replace(/[<b><\/b>]/g, '');
    });
};

window.premiumExercisesHTML = getPremiumExercisesHTML();
