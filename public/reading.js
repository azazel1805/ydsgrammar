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
<div class="space-y-8">
<div class="p-8 rounded-2xl shadow-sm bg-white border border-slate-200 ">
<div class="flex items-center justify-between mb-4">
    <h2 class="text-xl font-bold text-red-800">📘 YDS Reading Intelligence Engine</h2>
    <div class="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-black">
        <button id="toggleEnWiki" onclick="toggleWikiSource(false)" class="px-3 py-1 text-xs font-bold rounded-md transition-all bg-white text-purple-600 shadow-sm">English</button>
        <button id="toggleSimpleWiki" onclick="toggleWikiSource(true)" class="px-3 py-1 text-xs font-bold rounded-md transition-all text-slate-500 hover:text-purple-600">Simple En</button>
    </div>
</div>
<div class="flex flex-wrap gap-2 text-black">
    <select id="categorySelect" class="p-2 rounded text-sm bg-slate-100 text-slate-900 border border-slate-300" onchange="updateTopics()"></select>
    <select id="topicSelect" class="p-2 rounded text-sm bg-slate-100 text-slate-900 border border-slate-300"></select>
</div>
<div class="flex flex-wrap gap-2 mt-4">
    <button onclick="loadReading()" class="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded font-bold text-white transition shadow-lg shadow-purple-200">Load Article</button>
    <button onclick="loadRandomArticle()" class="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded font-bold text-slate-900 transition">🔄 Change Topic</button>
</div>
<div id="readingStats" class="mt-4 text-sm text-slate-600 flex gap-4"></div>
<div id="readingText" class="mt-6 text-xl leading-relaxed break-words text-slate-900 selection:bg-yellow-200"></div>
</div>
</div>

<!-- Modal -->
<div id="wordModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm hidden items-center justify-center z-[200] p-4">
    <div class="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div class="p-8">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h2 id="modalWord" class="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">WORD</h2>
                    <p id="modalIpa" class="text-slate-400 font-mono mt-1 text-sm"></p>
                </div>
                <button onclick="closeWordModal()" class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 transition-colors">✖</button>
            </div>
            
            <div id="modalContent" class="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar text-black">
                <div id="modalTr" class="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 hidden">
                    <p class="text-emerald-800 font-bold text-lg mb-1">Türkçe Anlamı</p>
                    <p id="modalTrText" class="text-emerald-900"></p>
                </div>
                <div id="modalDef" class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p class="text-slate-400 text-xs font-bold uppercase mb-2">Definition</p>
                    <p id="modalDefText" class="text-slate-800 leading-snug"></p>
                </div>
                <div id="modalSyn" class="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 hidden">
                    <p class="text-blue-400 text-xs font-bold uppercase mb-2">Synonyms</p>
                    <p id="modalSynText" class="text-blue-800 text-sm"></p>
                </div>
                <div id="modalAnt" class="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 hidden">
                    <p class="text-rose-400 text-xs font-bold uppercase mb-2">Antonyms</p>
                    <p id="modalAntText" class="text-rose-800 text-sm"></p>
                </div>
            </div>

            <div class="mt-8 flex justify-end">
                <button onclick="closeWordModal()" class="px-10 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all">KAPAT</button>
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
}
.reading-word:hover { 
    background-color: #fef08a !important; /* Yellow-200 */
    color: #000 !important;
}
/* Legend Markings */
.academic-hilite { border-bottom: 2px solid #10b981; }
.passive-hilite { color: #f43f5e; font-weight: bold; }
.conjunction-hilite { border-bottom: 2px dashed #f59e0b; font-weight: bold; }

.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>
`;

function toggleWikiSource(isSimple) {
    isSimpleWikipedia = isSimple;
    const enBtn = document.getElementById("toggleEnWiki");
    const simpleBtn = document.getElementById("toggleSimpleWiki");
    if (isSimpleWikipedia) {
        simpleBtn.classList.add("bg-white", "text-purple-600", "shadow-sm");
        enBtn.classList.remove("bg-white", "text-purple-600", "shadow-sm");
    } else {
        enBtn.classList.add("bg-white", "text-purple-600", "shadow-sm");
        simpleBtn.classList.remove("bg-white", "text-purple-600", "shadow-sm");
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
    const res = await fetch(`https://${domain}/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(topic)}&format=json&origin=*`);
    const data = await res.json();
    const results = data.query.search;
    if (!results || results.length === 0) return;
    fetchFullArticle(results[Math.floor(Math.random() * results.length)].title);
}

async function fetchFullArticle(title) {
    const domain = isSimpleWikipedia ? "simple.wikipedia.org" : "en.wikipedia.org";
    const res = await fetch(`https://${domain}/w/api.php?action=query&prop=extracts&explaintext=true&titles=${encodeURIComponent(title)}&format=json&origin=*`);
    const data = await res.json();
    const pageId = Object.keys(data.query.pages)[0];
    let text = data.query.pages[pageId].extract;
    if (!text) return;
    fullArticleText = text;
    truncated = false;
    if (text.length > MAX_CHAR) {
        text = text.substring(0, MAX_CHAR);
        let lastStop = Math.max(text.lastIndexOf("."), text.lastIndexOf("?"), text.lastIndexOf("!"));
        if (lastStop > 100) text = text.substring(0, lastStop + 1);
        truncated = true;
    }
    analyzeText(text);
}

function analyzeText(text) {
    if (!text) return;

    // Passive regex
    const passiveWords = ["be", "is", "are", "was", "were", "been", "being"];

    // Conjunctions
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

            // Academic Highlight
            if (academicWords.includes(lowerPart)) {
                academicCount++;
                classes += "academic-hilite ";
            }

            // Passive Highlight (Checking be + V3 pattern)
            if (passiveWords.includes(lowerPart)) {
                let nextPart = parts[index + 2]; // parts[index+1] is whitespace
                if (nextPart && (nextPart.endsWith("ed") || ["done", "gone", "seen", "taken", "known"].includes(nextPart.toLowerCase()))) {
                    classes += "passive-hilite ";
                    passiveCount++;
                }
            }

            // Conjunction Highlight
            if (targetConjunctions.includes(lowerPart)) {
                classes += "conjunction-hilite ";
            }

            processedHtml += `<span onclick="showWordDetails('${part.replace(/'/g, "\\'")}')" class="${classes}">${part}</span>`;
        } else {
            processedHtml += part;
        }
    });

    document.getElementById("readingText").innerHTML = processedHtml + (truncated ? `<div class="mt-8 flex justify-center"><button onclick="showFullArticle()" class="bg-slate-900 px-8 py-3 rounded-full font-bold text-white shadow-xl">Devamını Oku</button></div>` : "");
    document.getElementById("readingStats").innerHTML = `
        <span class="bg-slate-100 px-3 py-1 rounded-full font-bold text-slate-700">Kelimeler: ${wordCount}</span>
        <span class="bg-emerald-50 px-3 py-1 rounded-full font-bold text-emerald-700">Akademik: ${academicCount}</span>
        <span class="bg-rose-50 px-3 py-1 rounded-full font-bold text-rose-700">Passive: ${passiveCount}</span>
    `;
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
        console.error("Translation fail:", e);
        return null;
    }
}

async function showWordDetails(word) {
    const modal = document.getElementById("wordModal");
    const modalWord = document.getElementById("modalWord");
    const modalIpa = document.getElementById("modalIpa");
    const modalTrText = document.getElementById("modalTrText");
    const modalDefText = document.getElementById("modalDefText");
    const modalSynText = document.getElementById("modalSynText");
    const modalAntText = document.getElementById("modalAntText");

    modalWord.innerText = word;
    modalIpa.innerText = "Yükleniyor...";
    modalDefText.innerText = "Searching meanings...";
    document.getElementById("modalTr").classList.add("hidden");
    document.getElementById("modalSyn").classList.add("hidden");
    document.getElementById("modalAnt").classList.add("hidden");

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    // TR Meaning fetch anyway
    fetchTRMeaning(word).then(tr => {
        if (tr) {
            modalTrText.innerText = tr;
            document.getElementById("modalTr").classList.remove("hidden");
        }
    });

    // Check Local
    let wordInfo = dictionaryData.find(d => d.word.toLowerCase() === word.toLowerCase());

    if (!wordInfo) {
        // Fallback to Free Dictionary API
        try {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (res.ok) {
                const data = await res.json();
                const first = data[0];
                wordInfo = {
                    word: first.word,
                    ipa: first.phonetic || (first.phonetics?.[1]?.text),
                    examples: first.meanings?.[0]?.definitions?.[0]?.definition ? [first.meanings[0].definitions[0].definition] : [],
                    synonyms: first.meanings?.[0]?.synonyms || [],
                    antonyms: first.meanings?.[0]?.antonyms || []
                };
            }
        } catch (e) { }
    }

    if (wordInfo) {
        modalWord.innerText = wordInfo.word;
        modalIpa.innerText = wordInfo.ipa ? `// ${wordInfo.ipa} //` : "";
        modalDefText.innerText = wordInfo.examples?.[0] || wordInfo.definition || "No definition found.";

        if (wordInfo.synonyms?.length) {
            modalSynText.innerText = wordInfo.synonyms.join(", ");
            document.getElementById("modalSyn").classList.remove("hidden");
        }
        if (wordInfo.antonyms?.length) {
            modalAntText.innerText = wordInfo.antonyms.join(", ");
            document.getElementById("modalAnt").classList.remove("hidden");
        }
    } else {
        modalDefText.innerText = "Detaylı açıklama bulunamadı.";
        modalIpa.innerText = "";
    }
}

function closeWordModal() {
    document.getElementById("wordModal").classList.add("hidden");
    document.getElementById("wordModal").classList.remove("flex");
}

function showFullArticle() {
    truncated = false;
    analyzeText(fullArticleText);
}

const academicWords = ["significant", "impact", "analysis", "theory", "approach", "method", "evidence", "economic", "environmental", "policy", "development", "research", "data", "global", "factor", "structure", "function", "process", "concept", "primary", "secondary", "effect", "system", "model", "distribution", "resource", "strategy", "establish", "maintain", "indicate", "demonstrate", "interpret", "evaluate", "assess", "implement", "generate", "identify", "require", "involve", "occur", "contribute", "achieve", "obtain", "respond", "adapt", "emerge", "expand", "decline", "increase", "reduce", "enhance", "facilitate", "promote", "restrict", "influence", "determine", "define", "highlight", "emphasize", "conclude", "predict", "estimate", "measure", "quantify", "allocate", "regulate", "enforce", "sustain", "preserve", "consume", "produce", "invest", "finance", "administer", "authority", "capacity", "community", "complex", "component", "consequence", "consistent", "construct", "consumer", "corporate", "criteria", "culture", "debate", "dimension", "element", "environment", "equivalent", "ethics", "evolve", "exceed", "external", "feature", "framework", "goal", "hypothesis", "incentive", "income", "index", "individual", "innovation", "institution", "integrate", "interaction", "intervention", "investment", "issue", "labor", "legal", "legislation", "mechanism", "network", "objective", "option", "output", "participate", "perspective", "phenomenon", "portion", "potential", "principle", "procedure", "professional", "project", "proportion", "range", "ratio", "region", "relevant", "reliable", "resource", "response", "restore", "revenue", "sector", "sequence", "shift", "source", "specific", "stable", "status", "structure", "sufficient", "survey", "target", "technical", "technology", "transfer", "trend", "ultimate", "valid", "variable", "vision", "welfare", "whereas", "within"];

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initReading, 300);
});
