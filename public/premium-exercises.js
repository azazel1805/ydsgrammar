
let premiumExercisesData = [
    {
        id: 'ex1',
        title: 'Personality & Qualities',
        level: 'B1-B2',
        description: 'Read about personality traits and match them with their definitions.',
        passage: `
            Winning is the most important thing for me. I've always been <b class="text-red-700">competitive</b>, so I love my job. I think I'm a <b class="text-red-700">good leader</b>. It's important that all the players know what they're doing and it's my job to tell them. The decisions I make are important for the whole team, so I can't be <b class="text-red-700">indecisive</b>.
            I have classes of 80 to 100 children so I have to be <b class="text-red-700">hard-working</b>. I do my best, because education is so important for the children. You need to be a <b class="text-red-700">good communicator</b> in my job, so that you can get the children interested in what they have to learn. Often, we don't have very many resources, so we also need to be creative and be able to <b class="text-red-700">think outside the box</b>.
            I'm a <b class="text-red-700">risk taker</b>, so starting my own business wasn't difficult for me. I've always been very <b class="text-red-700">motivated</b> and <b class="text-red-700">ambitious</b>. I start work at 4.30 a.m. every day. I don't enjoy sleep. You can't afford to be lazy if you want to make money.
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
    },
    {
        id: 'ex2',
        title: 'Environmental Challenges',
        level: 'B2-C1',
        description: 'Focus on climate change terminology and ecological impacts.',
        passage: `
            The rapid <b class="text-red-700">deterioration</b> of our planet's ecosystem is a major concern. Scientist warn that the <b class="text-red-700">depletion</b> of natural resources will lead to an <b class="text-red-700">unprecedented</b> crisis. We must focus on <b class="text-red-700">sustainability</b> to ensure a future for the next generation. Governments need to <b class="text-red-700">implement</b> stricter laws against pollution. The <b class="text-red-700">vulnerability</b> of low-lying coastal areas to rising sea levels is a direct result of global warming. Many species face <b class="text-red-700">extinction</b> due to habitat loss. We need <b class="text-red-700">innovative</b> solutions to <b class="text-red-700">mitigate</b> these risks.
        `,
        definitions: [
            { id: 1, text: "the process of becoming progressively worse", answer: "deterioration" },
            { id: 2, text: "reduction in the number or quantity of something", answer: "depletion" },
            { id: 3, text: "never done or known before", answer: "unprecedented" },
            { id: 4, text: "the ability to be maintained at a certain rate or level", answer: "sustainability" },
            { id: 5, text: "put a decision, plan, or agreement into effect", answer: "implement" },
            { id: 6, text: "the quality or state of being exposed to the possibility of being attacked or harmed", answer: "vulnerability" },
            { id: 7, text: "the state or process of a species, family, or larger group being or becoming extinct", answer: "extinction" },
            { id: 8, text: "featuring new methods; advanced and original", answer: "innovative" },
            { id: 9, text: "make less severe, serious, or painful", answer: "mitigate" }
        ]
    },
    {
        id: 'ex3',
        title: 'Technology & AI',
        level: 'B2-C1',
        description: 'Matching exercise for modern tech and automation vocabulary.',
        passage: `
            The <b class="text-red-700">emergence</b> of artificial intelligence has revolutionized many industries. <b class="text-red-700">Automation</b> is replacing manual labor in many factories. However, there are <b class="text-red-700">ethical</b> concerns regarding privacy and security. AI systems are designed to <b class="text-red-700">simulate</b> human intelligence. They can <b class="text-red-700">analyze</b> vast amounts of data in seconds. The <b class="text-red-700">versatility</b> of these machines makes them useful in fields from medicine to finance. Some fear that AI will eventually <b class="text-red-700">surpass</b> human capabilities. It is <b class="text-red-700">imperative</b> that we develop regulations to control its growth.
        `,
        definitions: [
            { id: 1, text: "the process of coming into view or becoming exposed after being concealed", answer: "emergence" },
            { id: 2, text: "the use of largely automatic equipment in a system of manufacturing or other production process", answer: "automation" },
            { id: 3, text: "relating to moral principles or the branch of knowledge dealing with these", answer: "ethical" },
            { id: 4, text: "imitate the appearance or character of", answer: "simulate" },
            { id: 5, text: "examine methodically and in detail the constitution or structure of something", answer: "analyze" },
            { id: 6, text: "ability to adapt or be adapted to many different functions or activities", answer: "versatility" },
            { id: 7, text: "be greater than; exceed", answer: "surpass" },
            { id: 8, text: "of vital importance; crucial", answer: "imperative" }
        ]
    },
    {
        id: 'ex4',
        title: 'Health & Lifespan',
        level: 'B1-B2',
        description: 'Explore words related to well-being, nutrition, and medical science.',
        passage: `
            A healthy lifestyle is <b class="text-red-700">essential</b> for a long life. Proper <b class="text-red-700">nutrition</b> provides the body with the necessary fuel. Regular exercise help to <b class="text-red-700">enhance</b> muscle strength. We should avoid a <b class="text-red-700">sedentary</b> lifestyle which can lead to obesity. Modern medicine has significantly increased life <b class="text-red-700">expectancy</b>. Genetic <b class="text-red-700">predisposition</b> can affect our health, but lifestyle choices are often more important. We must be <b class="text-red-700">consistent</b> in our healthy habits. Preventive care is better than treating <b class="text-red-700">chronic</b> diseases later.
        `,
        definitions: [
            { id: 1, text: "extremely important; absolutely necessary", answer: "essential" },
            { id: 2, text: "the process of providing or obtaining the food necessary for health and growth", answer: "nutrition" },
            { id: 3, text: "intensify, increase, or further improve the quality, value, or extent of", answer: "enhance" },
            { id: 4, text: "tending to spend much time seated; somewhat inactive", answer: "sedentary" },
            { id: 5, text: "the state of thinking or hoping that something, especially something pleasant, will happen or be the case", answer: "expectancy" },
            { id: 6, text: "a liability or tendency to suffer from a particular condition", answer: "predisposition" },
            { id: 7, text: "acting or done in the same way over time, especially so as to be fair or accurate", answer: "consistent" },
            { id: 8, text: "persisting for a long time or constantly recurring", answer: "chronic" }
        ]
    },
    {
        id: 'ex5',
        title: 'History & Archaeology',
        level: 'B2',
        description: 'Vocabulary for describing ancient civilizations and historical findings.',
        passage: `
            Archaeologists work to <b class="text-red-700">uncover</b> the secrets of the past. They study <b class="text-red-700">artifacts</b> to understand how ancient people lived. The <b class="text-red-700">preservation</b> of these sites is crucial for historical research. Many civilizations left behind <b class="text-red-700">monumental</b> structures that still stand today. The <b class="text-red-700">legacy</b> of these cultures continues to influence our world. Historians <b class="text-red-700">interpret</b> found evidence to reconstruct the timeline of events. Sometimes, they find objects of <b class="text-red-700">obscure</b> origin that baffle experts.
        `,
        definitions: [
            { id: 1, text: "remove a cover or mask from", answer: "uncover" },
            { id: 2, text: "an object made by a human being, typically one of cultural or historical interest", answer: "artifacts" },
            { id: 3, text: "the action of preserving something", answer: "preservation" },
            { id: 4, text: "great in importance, extent, or size", answer: "monumental" },
            { id: 5, text: "something left or handed down by a predecessor", answer: "legacy" },
            { id: 6, text: "explain the meaning of information, words, or actions", answer: "interpret" },
            { id: 7, text: "not discovered or known about; uncertain", answer: "obscure" }
        ]
    },
    {
        id: 'ex6',
        title: 'Business & Economy',
        level: 'C1',
        description: 'Advanced business English and economic terminology matching.',
        passage: `
            Companies must <b class="text-red-700">diversify</b> their investments to minimize risk. Market <b class="text-red-700">fluctuations</b> can impact profit margins. A <b class="text-red-700">lucrative</b> deal can change the future of a small business. Entrepreneurs need to be <b class="text-red-700">resilient</b> in the face of failure. Effective <b class="text-red-700">management</b> is the key to corporate success. We are seeing a <b class="text-red-700">shift</b> towards digital currencies. Large <b class="text-red-700">conglomerates</b> often dominate the global market. Economic <b class="text-red-700">stagnation</b> is a threat to national stability.
        `,
        definitions: [
            { id: 1, text: "make or become more diverse or varied", answer: "diversify" },
            { id: 2, text: "an irregular rising and falling in number or amount; a variation", answer: "fluctuations" },
            { id: 3, text: "producing a great deal of profit", answer: "lucrative" },
            { id: 4, text: "able to withstand or recover quickly from difficult conditions", answer: "resilient" },
            { id: 5, text: "the process of dealing with or controlling things or people", answer: "management" },
            { id: 6, text: "a slight change in position, direction, or tendency", answer: "shift" },
            { id: 7, text: "a number of different things or parts that are put or grouped together to form a whole but remain distinct entities", answer: "conglomerates" },
            { id: 8, text: "the state of not flowing or moving; lack of activity, growth, or development", answer: "stagnation" }
        ]
    },
    {
        id: 'ex7',
        title: 'Education & Learning',
        level: 'B1-B2',
        description: 'Academic words for school, learning styles, and cognitive development.',
        passage: `
            Education is a <b class="text-red-700">lifelong</b> process. Students should be encouraged to be <b class="text-red-700">inquisitive</b> and ask questions. Critical thinking is a <b class="text-red-700">vital</b> skill in the modern world. Teachers aim to <b class="text-red-700">facilitate</b> the learning process. Classroom <b class="text-red-700">dynamics</b> can vary depending on the group of students. A <b class="text-red-700">comprehensive</b> curriculum covers all necessary topics. Continuous <b class="text-red-700">assessment</b> helps track progress. Motivation is a key <b class="text-red-700">factor</b> in academic achievement.
        `,
        definitions: [
            { id: 1, text: "lasting or remaining in a particular state throughout a person's life", answer: "lifelong" },
            { id: 2, text: "curious or inquiring", answer: "inquisitive" },
            { id: 3, text: "absolutely necessary or important; essential", answer: "vital" },
            { id: 4, text: "make an action or process easy or easier", answer: "facilitate" },
            { id: 5, text: "the forces or properties which stimulate growth, development, or change within a system or process", answer: "dynamics" },
            { id: 6, text: "complete; including all or nearly all elements or aspects of something", answer: "comprehensive" },
            { id: 7, text: "the evaluation or estimation of the nature, quality, or ability of someone or something", answer: "assessment" },
            { id: 8, text: "a circumstance, fact, or influence that contributes to a result or outcome", answer: "factor" }
        ]
    },
    {
        id: 'ex8',
        title: 'Space & Astronomy',
        level: 'B2',
        description: 'Explore words used to describe the cosmos and space exploration.',
        passage: `
            The <b class="text-red-700">vastness</b> of the universe is hard to imagine. Astronomers use telescopes to <b class="text-red-700">observe</b> distant galaxies. The <b class="text-red-700">exploration</b> of Mars is a major goal for NASA. Satellite technology is <b class="text-red-700">integral</b> to modern communication. Some planets have <b class="text-red-700">extreme</b> environments where life as we know it cannot exist. Black holes possess an <b class="text-red-700">immense</b> gravitational pull. Scientists seek to <b class="text-red-700">decipher</b> the signals from outer space.
        `,
        definitions: [
            { id: 1, text: "the quality of being very large in size or amount", answer: "vastness" },
            { id: 2, text: "notice or perceive something and register it as being significant", answer: "observe" },
            { id: 3, text: "the action of traveling in or through an unfamiliar area in order to learn about it", answer: "exploration" },
            { id: 4, text: "necessary to make a whole complete; essential or fundamental", answer: "integral" },
            { id: 5, text: "reaching a high or the highest degree; very great", answer: "extreme" },
            { id: 6, text: "extremely large or great, especially in scale or degree", answer: "immense" },
            { id: 7, text: "succeed in understanding, interpreting, or identifying something", answer: "decipher" }
        ]
    },
    {
        id: 'ex9',
        title: 'Art & Psychology',
        level: 'B2-C1',
        description: 'Match terms related to artistic expression and human perception.',
        passage: `
            Art is a form of <b class="text-red-700">individual</b> expression. Our <b class="text-red-700">perception</b> can be influenced by cultural background. Abstract art often uses <b class="text-red-700">subjective</b> imagery. Artists strive to <b class="text-red-700">evoke</b> strong emotions in their audience. The <b class="text-red-700">aesthetic</b> appeal of a work depends on various factors. Creative <b class="text-red-700">endeavors</b> require patience and dedication. Some masterpieces have a <b class="text-red-700">profound</b> impact on society. Art can be a tool for <b class="text-red-700">introspection</b>.
        `,
        definitions: [
            { id: 1, text: "single; separate", answer: "individual" },
            { id: 2, text: "the ability to see, hear, or become aware of something through the senses", answer: "perception" },
            { id: 3, text: "based on or influenced by personal feelings, tastes, or opinions", answer: "subjective" },
            { id: 4, text: "bring or recall to the conscious mind", answer: "evoke" },
            { id: 5, text: "concerned with beauty or the appreciation of beauty", answer: "aesthetic" },
            { id: 6, text: "an attempt to achieve a goal", answer: "endeavors" },
            { id: 7, text: "very great or intense", answer: "profound" },
            { id: 8, text: "the examination or observation of one's own mental and emotional processes", answer: "introspection" }
        ]
    },
    {
        id: 'ex10',
        title: 'Communication & Society',
        level: 'B1-B2',
        description: 'Vocabulary for social interaction and societal structures.',
        passage: `
            Effective communication is <b class="text-red-700">crucial</b> in a globalized society. Language is a <b class="text-red-700">barrier</b> that can be overcome with education. Social <b class="text-red-700">norms</b> guide our behavior in public. We must be <b class="text-red-700">respectful</b> of diverse opinions. Information spreads rapidly through <b class="text-red-700">digital</b> platforms. Public <b class="text-red-700">discourse</b> is necessary for a healthy democracy. We should <b class="text-red-700">collaborate</b> to solve global problems. Empathy is a <b class="text-red-700">fundamental</b> part of human connection.
        `,
        definitions: [
            { id: 1, text: "decisive or critical, especially in the success or failure of something", answer: "crucial" },
            { id: 2, text: "a circumstance or obstacle that keeps people or things apart or prevents communication or progress", answer: "barrier" },
            { id: 3, text: "something that is usual, typical, or standard", answer: "norms" },
            { id: 4, text: "feeling or showing deference and respect", answer: "respectful" },
            { id: 5, text: "involving or relating to the use of computer technology", answer: "digital" },
            { id: 6, text: "written or spoken communication or debate", answer: "discourse" },
            { id: 7, text: "work jointly on an activity, especially to produce or create something", answer: "collaborate" },
            { id: 8, text: "forming a necessary base or core; of central importance", answer: "fundamental" }
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
                    <h3 class="text-2xl font-black text-slate-800 mb-2" style="font-family:'Playfair Display',serif;">${ex.title}</h3>
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
