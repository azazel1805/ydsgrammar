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
    <div class="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
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
<div id="readingStats" class="mt-4 text-sm text-slate-600 "></div>
<div id="readingText" class="mt-6 text-base leading-relaxed break-words text-slate-900 "></div>
</div>
</div>
<!-- Modal -->
<div id="wordModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm hidden items-center justify-center z-[200] p-4">
    <div class="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
        <div class="p-8">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h2 id="modalWord" class="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">WORD</h2>
                    <p id="modalIpa" class="text-slate-400 font-mono mt-1 text-sm"></p>
                </div>
                <button onclick="closeWordModal()" class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 transition-colors">✖</button>
            </div>
            <div id="modalContent" class="space-y-4 max-h-[300px] overflow-y-auto pr-2"></div>
            <div class="mt-8 flex gap-3 text-black">
                <button id="modalSaveBtn" class="flex-1 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all">DEFTERE KAYDET</button>
                <button onclick="closeWordModal()" class="px-8 bg-slate-100 text-slate-600 font-bold rounded-2xl">KAPAT</button>
            </div>
        </div>
    </div>
</div>
<style>
.reading-word { border-bottom: 2px solid transparent; cursor: pointer; }
.reading-word:hover { background: #f1f5f9; border-bottom-color: currentColor; border-radius: 4px; }
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
    const parts = text.split(/(\b\w+\b)/g);
    let processedHtml = "";
    let wordCount = 0;
    let academicCount = 0;

    parts.forEach(part => {
        if (/^\w+$/.test(part)) {
            wordCount++;
            const wordInfo = dictionaryData.find(d => d.word.toLowerCase() === part.toLowerCase());
            let classes = "reading-word transition-all ";
            if (wordInfo) {
                const level = (wordInfo.level || "").toUpperCase();
                if (level.startsWith("A")) classes += "text-emerald-700 ";
                else if (level.startsWith("B")) classes += "text-blue-700 ";
                else if (level.startsWith("C")) classes += "text-rose-700 ";
                processedHtml += `<span onclick="showWordDetails('${part.replace(/'/g, "\\'")}')" class="${classes}">${part}</span>`;
            } else {
                if (academicWords.includes(part.toLowerCase())) {
                    academicCount++;
                    classes += "text-emerald-800 font-semibold ";
                }
                processedHtml += `<span class="${classes}">${part}</span>`;
            }
        } else {
            processedHtml += part;
        }
    });

    document.getElementById("readingText").innerHTML = processedHtml + (truncated ? `<div class="mt-8 flex justify-center"><button onclick="showFullArticle()" class="bg-slate-900 px-8 py-3 rounded-full font-bold text-white shadow-xl">Devamını Oku</button></div>` : "");
    document.getElementById("readingStats").innerHTML = `<div class="flex gap-4"><span>Kelimeler: ${wordCount}</span><span>Akademik: ${academicCount}</span></div>`;
}

function showWordDetails(word) {
    const wordInfo = dictionaryData.find(d => d.word.toLowerCase() === word.toLowerCase());
    if (!wordInfo) return;
    const modal = document.getElementById("wordModal");
    document.getElementById("modalWord").innerText = wordInfo.word;
    document.getElementById("modalIpa").innerText = wordInfo.ipa ? `// ${wordInfo.ipa} //` : "";
    let html = "";
    if (wordInfo.examples) {
        wordInfo.examples.forEach(ex => {
            html += `<div class="bg-slate-50 p-4 rounded-xl border border-slate-100"><p class="text-slate-800">${ex}</p></div>`;
        });
    }
    if (wordInfo.synonyms) {
        html += `<div class="bg-blue-50 p-4 rounded-xl text-blue-800 text-sm"><b>Eş Anlam:</b> ${wordInfo.synonyms.join(", ")}</div>`;
    }
    document.getElementById("modalContent").innerHTML = html || "Veri bulunamadı.";
    document.getElementById("modalSaveBtn").onclick = () => saveWord(wordInfo.word);
    modal.classList.remove("hidden");
    modal.classList.add("flex");
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
