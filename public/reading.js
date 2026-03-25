/* ================= CATEGORIES ================= */
const topicCategories = {
    Environment: ["Climate_change", "Global_warming", "Sustainability", "Renewable_energy", "Biodiversity", "Deforestation", "Water_scarcity", "Ecosystem", "Pollution", "Conservation_biology", "Ozone_depletion", "Natural_resource_management"],
    Technology: ["Artificial_intelligence", "Machine_learning", "Automation", "Cybersecurity", "Big_data", "Blockchain", "Robotics", "Cloud_computing", "Internet_of_things", "Virtual_reality", "Nanotechnology", "Quantum_computing"],
    Economics: ["Economic_growth", "Globalization", "Inflation", "Unemployment", "Income_inequality", "Sustainable_development", "Public_policy", "Circular_economy", "Macroeconomics", "Microeconomics", "Fiscal_policy", "International_trade"],
    Psychology: ["Psychology", "Cognitive_bias", "Mental_health", "Human_behavior", "Motivation", "Decision-making", "Behavioral_economics", "Developmental_psychology", "Social_psychology", "Personality_disorder", "Neuroscience"],
    Education: ["Education", "Higher_education", "Distance_education", "Lifelong_learning", "Educational_technology", "STEM_education", "Literacy", "Special_education", "Curriculum_development", "Standardized_test"],
    Health: ["Public_health", "Pandemic", "Vaccination", "Nutrition", "Biotechnology", "Medical_research", "Aging_population", "Mental_illness", "Epidemiology", "Chronic_condition", "Immunology"],
    History: ["Middle_Ages", "Renaissance", "Industrial_Revolution", "Ancient_Egypt", "Cold_War", "French_Revolution", "Roman_Empire", "World_War_II", "Age_of_Discovery", "Byzantine_Empire", "Ancient_Greece"],
    Science: ["Quantum_mechanics", "Evolution", "Genetic_engineering", "Neurobiology", "Particle_physics", "Astrophysics", "Organic_chemistry", "Plate_tectonics", "Thermodynamics", "Cell_biology"],
    Philosophy: ["Existentialism", "Stoicism", "Rationalism", "Empiricism", "Ethics", "Logic", "Epistemology", "Metaphysics", "Political_philosophy", "Phenomenology"],
    Astronomy: ["Black_hole", "Solar_System", "Galaxy", "Mars", "Exoplanet", "Supernova", "Cosmology", "Telescope", "Milky_Way", "Big_Bang"],
    Literature: ["English_literature", "Shakespeare", "Novel", "Poetry", "Drama", "Literary_criticism", "Romanticism", "Modernism", "Postmodernism"],
    International_Relations: ["United_Nations", "European_Union", "Diplomacy", "International_law", "Human_rights", "Conflict_resolution", "Geopolitics", "Foreign_policy"],
    Law: ["Constitutional_law", "Criminal_law", "Civil_law", "Justice", "Legal_system", "Jurisprudence", "Contract_law", "Intellectual_property"]
};

/* ================= GLOBALS ================= */
let fullArticleText = "";
let truncated = false;
let isSimpleWikipedia = false;
const MAX_CHAR = 5000;
let dictionaryData = [];

async function loadFullDictionary() {
    try {
        const res = await fetch("/data/dictionary_full.json");
        dictionaryData = await res.json();
    } catch (e) {
        console.error("Failed to load dictionary:", e);
    }
}
loadFullDictionary();

/* ================= HTML ================= */
const readingHTML = `
<div class="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-700">
  <!-- HEADER & SETUP -->
  <div class="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-slate-100 shadow-2xl shadow-indigo-500/5 relative overflow-hidden">
    <div class="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none rotate-12">
      <i class="fas fa-book-reader text-9xl"></i>
    </div>
    
    <div class="relative z-10">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
         <div>
            <div class="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase mb-4">
              <i class="fas fa-globe-americas"></i>
              <span>Reading Intelligence Lab</span>
            </div>
            <h2 class="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight" style="font-family:'Playfair Display',serif;">
              Reading <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Intelligence</span>
            </h2>
         </div>

         <div class="flex items-center gap-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-sm">
            <button id="toggleEnWiki" onclick="toggleWikiSource(false)" class="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl bg-white text-indigo-600 shadow-md transition-all">English</button>
            <button id="toggleSimpleWiki" onclick="toggleWikiSource(true)" class="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl text-slate-400 hover:text-slate-600 transition-all">Simple En</button>
         </div>
      </div>

      <div class="grid lg:grid-cols-12 gap-4 items-end">
         <div class="lg:col-span-4">
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">KATEGORİ</label>
            <select id="categorySelect" class="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-800 focus:bg-white focus:border-indigo-500 outline-none transition-all cursor-pointer appearance-none" onchange="updateTopics()"></select>
         </div>
         <div class="lg:col-span-4">
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">KONU</label>
            <select id="topicSelect" class="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-800 focus:bg-white focus:border-indigo-500 outline-none transition-all cursor-pointer appearance-none"></select>
         </div>
         <div class="lg:col-span-4 flex gap-2">
            <button onclick="loadReading()" class="flex-1 py-4.5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-indigo-600 hover:scale-[1.02] active:scale-95 transition-all">YÜKLE</button>
            <button onclick="loadRandomArticle()" class="w-14 h-[58px] bg-slate-50 text-slate-400 rounded-2xl border border-slate-100 hover:text-indigo-600 hover:bg-white hover:border-indigo-100 transition-all flex items-center justify-center">
              <i class="fas fa-random"></i>
            </button>
         </div>
      </div>
    </div>
  </div>

  <div id="readingContainer" class="hidden grid lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 duration-500">
     <!-- TEXT CONTENT -->
     <div class="lg:col-span-12 bg-white border border-slate-100 rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-slate-200/50">
        <div id="readingStats" class="flex flex-wrap gap-4 mb-8 pb-8 border-b border-slate-50"></div>
        <div id="readingText" class="text-slate-800 leading-[1.8] text-lg lg:text-xl selection:bg-indigo-100 font-medium" style="font-family:'Lora',serif;">
          <!-- Content here -->
        </div>
     </div>
  </div>
</div>

<!-- Premium Word Modal -->
<div id="wordModal" class="fixed inset-0 bg-slate-900/90 backdrop-blur-sm hidden items-center justify-center z-[200] p-4 animate-in fade-in duration-300">
    <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden scale-in-center">
        <div class="p-8 lg:p-10">
            <div class="flex justify-between items-start mb-8 text-black">
                <div>
                    <h2 id="modalWord" class="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter italic" style="font-family:'Playfair Display',serif;">WORD</h2>
                    <p id="modalIpa" class="text-indigo-500 font-black text-sm tracking-widest uppercase mt-2 opacity-60">// IPA //</p>
                </div>
                <button onclick="closeWordModal()" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100 hover:border-red-100">
                    <i class="fas fa-times text-lg"></i>
                </button>
            </div>
            
            <div id="modalContent" class="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar text-black">
                <!-- Cards injected here -->
            </div>

            <div class="mt-10">
                <button onclick="closeWordModal()" class="w-full py-4.5 bg-slate-50 text-slate-500 font-bold rounded-2xl hover:bg-slate-100 transition-all uppercase tracking-widest text-[10px] border border-slate-100">KAPAT</button>
            </div>
        </div>
    </div>
</div>

<style>
.reading-word { 
    display: inline-block;
    padding: 0 2px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: underline;
    text-decoration-color: #e2e8f0;
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
}
.reading-word:hover { 
    background-color: #4338ca !important; 
    color: #fff !important;
    text-decoration-color: transparent;
}
.academic-hilite { border-bottom: 2px solid #10b981; }
.passive-hilite { color: #f43f5e; font-weight: 900; }
.conjunction-hilite { border-bottom: 2px dashed #f59e0b; font-weight: 900; }

.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }

.word-info-card {
    background: #f8fafc;
    border: 1px solid #f1f5f9;
    border-radius: 1.5rem;
    padding: 1.5rem;
}
.tr-meaning {
    color: #4338ca;
    font-weight: 800;
    margin-top: 0.75rem;
    font-size: 1.125rem;
    font-style: italic;
}.scale-in-center { animation: scale-in-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; }
@keyframes scale-in-center {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
`;

function toggleWikiSource(isSimple) {
    isSimpleWikipedia = isSimple;
    const enBtn = document.getElementById("toggleEnWiki");
    const simpleBtn = document.getElementById("toggleSimpleWiki");
    if (isSimpleWikipedia) {
        simpleBtn.classList.add("bg-white", "text-slate-800", "shadow-sm");
        enBtn.classList.remove("bg-white", "text-slate-800", "shadow-sm");
    } else {
        enBtn.classList.add("bg-white", "text-slate-800", "shadow-sm");
        simpleBtn.classList.remove("bg-white", "text-slate-800", "shadow-sm");
    }
}

function initReading() {
    const categorySelect = document.getElementById("categorySelect");
    if (!categorySelect) return;
    categorySelect.innerHTML = "";
    Object.keys(topicCategories).forEach(cat => {
        categorySelect.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
    updateTopics();
}

function updateTopics() {
    const categoryEl = document.getElementById("categorySelect");
    const topicSelect = document.getElementById("topicSelect");
    if (!categoryEl || !topicSelect) return;
    const category = categoryEl.value;
    topicSelect.innerHTML = "";
    topicCategories[category].forEach(topic => {
        topicSelect.innerHTML += `<option value="${topic}">${topic.replace(/_/g, " ")}</option>`;
    });
}

async function loadReading() {
    const topicEl = document.getElementById("topicSelect");
    if (!topicEl) return;
    fetchFullArticle(topicEl.value);
}

async function loadRandomArticle() {
    const topicEl = document.getElementById("topicSelect");
    if (!topicEl) return;
    const topic = topicEl.value;
    const domain = isSimpleWikipedia ? "simple.wikipedia.org" : "en.wikipedia.org";
    try {
        const res = await fetch(`https://${domain}/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(topic)}&format=json&origin=*`);
        const data = await res.json();
        const results = data.query.search;
        if (!results || results.length === 0) return;
        fetchFullArticle(results[Math.floor(Math.random() * results.length)].title);
    } catch (e) {
        console.error("Random fetch fail:", e);
    }
}

async function fetchFullArticle(title) {
    const domain = isSimpleWikipedia ? "simple.wikipedia.org" : "en.wikipedia.org";
    try {
        const res = await fetch(`https://${domain}/w/api.php?action=query&prop=extracts&explaintext=true&titles=${encodeURIComponent(title)}&format=json&origin=*`);
        const data = await res.json();
        const pageId = Object.keys(data.query.pages)[0];
        let text = data.query.pages[pageId].extract;
        if (!text) return;
        fullArticleText = text;
        truncated = false;
        const words = text.trim().split(/\s+/);
        if (words.length > 1000) {
            let limit = 1000;
            let charIndex = 0;
            let count = 0;
            const spaceRegex = /\s+/g;
            let match;
            
            while ((match = spaceRegex.exec(text)) !== null) {
                count++;
                if (count >= limit) {
                    charIndex = match.index;
                    break;
                }
            }
            
            if (charIndex > 0) {
                let nextSentenceEnd = text.substring(charIndex).search(/[.!?](\s|$)/);
                if (nextSentenceEnd !== -1) {
                    text = text.substring(0, charIndex + nextSentenceEnd + 1);
                } else {
                    text = text.substring(0, charIndex);
                }
                truncated = true;
            }
        }
        analyzeText(text);
    } catch (e) {
        console.error("Article fetch fail:", e);
    }
}

function analyzeText(text) {
    if (!text) return;

    const passiveWords = ["be", "is", "are", "was", "were", "been", "being"];
    const targetConjunctions = ["however", "nevertheless", "nonetheless", "on the other hand", "conversely", "although", "even though", "despite", "therefore", "consequently", "moreover", "furthermore"];

    const parts = text.split(/(\b\w+\b)/g);
    let processedHtml = "";
    let wordCount = 0;
    let academicCount = 0;
    let passiveCount = 0;

    parts.forEach((part, index) => {
        if (/^\w+$/.test(part)) {
            wordCount++;
            let classes = "reading-word ";
            const lowerPart = part.toLowerCase();

            if (academicWords.includes(lowerPart)) {
                academicCount++;
                classes += "academic-hilite ";
            }

            if (passiveWords.includes(lowerPart)) {
                let nextPart = parts[index + 2];
                if (nextPart && (nextPart.endsWith("ed") || ["done", "gone", "seen", "taken", "known"].includes(nextPart.toLowerCase()))) {
                    classes += "passive-hilite ";
                    passiveCount++;
                }
            }

            if (targetConjunctions.includes(lowerPart)) {
                classes += "conjunction-hilite ";
            }

            processedHtml += `<span onclick="showWordDetails('${part.replace(/'/g, "\\'")}')" class="${classes}">${part}</span>`;
        } else {
            processedHtml += part;
        }
    });

    const textContainer = document.getElementById("readingText");
    const statsContainer = document.getElementById("readingStats");
    const container = document.getElementById("readingContainer");

    if (container) container.classList.remove("hidden");

    if (textContainer) {
        textContainer.innerHTML = processedHtml + (truncated ? `<div class="mt-12 flex justify-center"><button onclick="showFullArticle()" class="bg-slate-900 px-10 py-5 rounded-2xl font-black text-white shadow-2xl hover:bg-indigo-600 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-[11px]">DEVAMINI OKU</button></div>` : "");
    }

    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-2">
               <span class="text-[9px] font-black text-slate-400 uppercase">Words:</span>
               <span class="text-xs font-bold text-slate-700">${wordCount}</span>
            </div>
            <div class="px-5 py-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-2">
               <span class="text-[9px] font-black text-emerald-600 uppercase">Academic:</span>
               <span class="text-xs font-bold text-emerald-700">${academicCount}</span>
            </div>
            <div class="px-5 py-3 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-2">
               <span class="text-[9px] font-black text-rose-600 uppercase">Passive:</span>
               <span class="text-xs font-bold text-rose-700">${passiveCount}</span>
            </div>
        `;
    }
}

async function fetchTRMeaning(word) {
    try {
        const res = await fetch("/.netlify/functions/nlpAnalyze", {
            method: "POST",
            body: JSON.stringify({ text: word })
        });
        const data = await res.json();
        return data.translation || null;
    } catch (e) {
        return null;
    }
}

async function showWordDetails(word) {
    const modal = document.getElementById("wordModal");
    const modalWord = document.getElementById("modalWord");
    const modalIpa = document.getElementById("modalIpa");
    const modalContent = document.getElementById("modalContent");

    modalWord.innerText = word;
    modalIpa.innerText = "Sözlük aranıyor...";
    modalContent.innerHTML = `<div class="p-8 text-center text-slate-300 animate-pulse"><i class="fas fa-spinner fa-spin text-2xl"></i></div>`;

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    // Start Translator
    const trPromise = fetchTRMeaning(word);

    // Check Dictionary Data
    let wordInfo = dictionaryData.find(d => d.word.toLowerCase() === word.toLowerCase());

    // If not in local, check External API
    if (!wordInfo) {
        try {
            const apiRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
            if (apiRes.ok) {
                const apiData = await apiRes.json();
                const first = apiData[0];
                wordInfo = {
                    word: first.word,
                    ipa: first.phonetic || (first.phonetics?.find(p => p.text)?.text),
                    definitions: first.meanings.flatMap(m => m.definitions.map(d => d.definition)).filter(d => d),
                    synonyms: first.meanings[0].synonyms || [],
                    antonyms: first.meanings[0].antonyms || []
                };
            }
        } catch (e) { }
    }

    const trMeaning = await trPromise;

    let html = "";

    if (wordInfo) {
        modalIpa.innerText = wordInfo.ipa ? `// ${wordInfo.ipa} //` : "";

        // Combine and filter definitions with TR meaning
        let defs = (wordInfo.definitions || []).filter(d => d && d !== "undefined");
        if (defs.length === 0 && wordInfo.examples) {
            defs = (wordInfo.examples || []).filter(e => e && e !== "undefined");
        }
        if (defs.length === 0) defs = ["Tanım bulunamadı."];

        defs.slice(0, 2).forEach((def, i) => {
            html += `
                <div class="word-info-card">
                    <p class="text-slate-800 leading-snug">${def}</p>
                    ${(i === 0 && trMeaning) ? `<p class="tr-meaning">${trMeaning}</p>` : ""}
                </div>
            `;
        });

        if (wordInfo.synonyms?.length) {
            html += `<div class="word-info-card"><p class="text-slate-400 text-[10px] font-bold uppercase mb-2">Synonyms</p><p class="text-slate-600 font-medium">${wordInfo.synonyms.slice(0, 5).join(", ")}</p></div>`;
        }
        if (wordInfo.antonyms?.length) {
            html += `<div class="word-info-card"><p class="text-slate-400 text-[10px] font-bold uppercase mb-2">Antonyms</p><p class="text-slate-600 font-medium">${wordInfo.antonyms.slice(0, 5).join(", ")}</p></div>`;
        }
    } else {
        html = `
            <div class="word-info-card">
                <p class="text-slate-800 italic">Sözlük verisi bulunamadı.</p>
                ${trMeaning ? `<p class="tr-meaning">${trMeaning}</p>` : ""}
            </div>
        `;
        modalIpa.innerText = "";
    }

    modalContent.innerHTML = html;
}

function closeWordModal() {
    const modal = document.getElementById("wordModal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

window.onclick = function (event) {
    const modal = document.getElementById("wordModal");
    if (event.target == modal) {
        closeWordModal();
    }
}

function showFullArticle() {
    truncated = false;
    analyzeText(fullArticleText);
}

const academicWords = ["significant", "impact", "analysis", "theory", "approach", "method", "evidence", "economic", "environmental", "policy", "development", "research", "data", "global", "factor", "structure", "function", "process", "concept", "primary", "secondary", "effect", "system", "model", "distribution", "resource", "strategy", "establish", "maintain", "indicate", "demonstrate", "interpret", "evaluate", "assess", "implement", "generate", "identify", "require", "involve", "occur", "contribute", "achieve", "obtain", "respond", "adapt", "emerge", "expand", "decline", "increase", "reduce", "enhance", "facilitate", "promote", "restrict", "influence", "determine", "define", "highlight", "emphasize", "conclude", "predict", "estimate", "measure", "quantify", "allocate", "regulate", "enforce", "sustain", "preserve", "consume", "produce", "invest", "finance", "administer", "authority", "capacity", "community", "complex", "component", "consequence", "consistent", "construct", "consumer", "corporate", "criteria", "culture", "debate", "dimension", "element", "environment", "equivalent", "ethics", "evolve", "exceed", "external", "feature", "framework", "goal", "hypothesis", "incentive", "income", "index", "individual", "innovation", "institution", "integrate", "interaction", "intervention", "investment", "issue", "labor", "legal", "legislation", "mechanism", "network", "objective", "option", "output", "participate", "perspective", "phenomenon", "portion", "potential", "principle", "procedure", "professional", "project", "proportion", "range", "ratio", "region", "relevant", "reliable", "resource", "response", "restore", "revenue", "sector", "sequence", "shift", "source", "specific", "stable", "status", "structure", "sufficient", "survey", "target", "technical", "technology", "transfer", "trend", "ultimate", "valid", "variable", "vision", "welfare", "whereas", "within"];

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initReading, 300);
});
