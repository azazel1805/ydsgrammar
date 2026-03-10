/* =========================================
 YDS Reading Intelligence Engine v5.0
 Sentence-Safe Truncation + Read More System
 ========================================= */


/* ================= CATEGORIES ================= */

const topicCategories = {

    Environment: [
        "Climate_change", "Global_warming", "Sustainability", "Renewable_energy",
        "Biodiversity", "Deforestation", "Water_scarcity", "Ecosystem",
        "Pollution", "Conservation_biology", "Ozone_depletion", "Natural_resource_management"
    ],

    Technology: [
        "Artificial_intelligence", "Machine_learning", "Automation",
        "Cybersecurity", "Big_data", "Blockchain", "Robotics", "Cloud_computing",
        "Internet_of_things", "Virtual_reality", "Nanotechnology", "Quantum_computing"
    ],

    Economics: [
        "Economic_growth", "Globalization", "Inflation", "Unemployment",
        "Income_inequality", "Sustainable_development", "Public_policy", "Circular_economy",
        "Macroeconomics", "Microeconomics", "Fiscal_policy", "International_trade"
    ],

    Psychology: [
        "Psychology", "Cognitive_bias", "Mental_health", "Human_behavior",
        "Motivation", "Decision-making", "Behavioral_economics",
        "Developmental_psychology", "Social_psychology", "Personality_disorder", "Neuroscience"
    ],

    Education: [
        "Education", "Higher_education", "Distance_education", "Lifelong_learning",
        "Educational_technology", "STEM_education", "Literacy", "Special_education",
        "Curriculum_development", "Standardized_test"
    ],

    Health: [
        "Public_health", "Pandemic", "Vaccination", "Nutrition",
        "Biotechnology", "Medical_research", "Aging_population",
        "Mental_illness", "Epidemiology", "Chronic_condition", "Immunology"
    ],

    History: [
        "Middle_Ages", "Renaissance", "Industrial_Revolution", "Ancient_Egypt",
        "Cold_War", "French_Revolution", "Roman_Empire", "World_War_II",
        "Age_of_Discovery", "Byzantine_Empire", "Ancient_Greece"
    ],

    Science: [
        "Quantum_mechanics", "Evolution", "Genetic_engineering", "Neurobiology",
        "Particle_physics", "Astrophysics", "Organic_chemistry", "Plate_tectonics",
        "Thermodynamics", "Cell_biology"
    ],

    Philosophy: [
        "Existentialism", "Stoicism", "Rationalism", "Empiricism", "Ethics",
        "Logic", "Epistemology", "Metaphysics", "Political_philosophy", "Phenomenology"
    ],

    Astronomy: [
        "Black_hole", "Solar_System", "Galaxy", "Mars", "Exoplanet",
        "Supernova", "Cosmology", "Telescope", "Milky_Way", "Big_Bang"
    ],

    Literature: [
        "English_literature", "Shakespeare", "Novel", "Poetry", "Drama",
        "Literary_criticism", "Romanticism", "Modernism", "Postmodernism"
    ],

    International_Relations: [
        "United_Nations", "European_Union", "Diplomacy", "International_law",
        "Human_rights", "Conflict_resolution", "Geopolitics", "Foreign_policy"
    ],

    Law: [
        "Constitutional_law", "Criminal_law", "Civil_law", "Justice",
        "Legal_system", "Jurisprudence", "Contract_law", "Intellectual_property"
    ]

};

/* ================= GLOBALS ================= */

let fullArticleText = "";
let truncated = false;
let isSimpleWikipedia = false;
const MAX_CHAR = 5000;
let dictionaryData = [];

// Load the full dictionary for hover info
async function loadFullDictionary() {
    try {
        const res = await fetch("/data/dictionary_full.json");
        dictionaryData = await res.json();
        console.log("Full dictionary loaded for reading tooltips:", dictionaryData.length, "words");
    } catch (e) {
        console.error("Failed to load full dictionary:", e);
    }
}
loadFullDictionary();

/* ================= HTML ================= */

const readingHTML = `
<div class="space-y-8">

<div class="p-8 rounded-2xl shadow-sm
 bg-white 
 border border-slate-200 ">

<div class="flex items-center justify-between mb-4">
    <h2 class="text-xl font-bold text-red-800">
    📘 YDS Reading Intelligence Engine
    </h2>
    <div class="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
        <button id="toggleEnWiki" onclick="toggleWikiSource(false)" 
                class="px-3 py-1 text-xs font-bold rounded-md transition-all bg-white text-purple-600 shadow-sm">
            English
        </button>
        <button id="toggleSimpleWiki" onclick="toggleWikiSource(true)" 
                class="px-3 py-1 text-xs font-bold rounded-md transition-all text-slate-500 hover:text-purple-600">
            Simple En
        </button>
    </div>
</div>

<div class="flex flex-wrap gap-2">

<select id="categorySelect" 
class="p-2 rounded text-sm
 bg-slate-100 
 text-slate-900 
 border border-slate-300 "
onchange="updateTopics()">
</select>

<select id="topicSelect" 
class="p-2 rounded text-sm
 bg-slate-100 
 text-slate-900 
 border border-slate-300 ">
</select>

</div>

<div class="flex flex-wrap gap-2 mt-4">

<button onclick="loadReading()" 
class="bg-purple-600 hover:bg-purple-700
 px-4 py-2 rounded font-bold text-white transition shadow-lg shadow-purple-200">
Load Article
</button>

<button onclick="loadRandomArticle()" 
class="bg-slate-200 
 hover:bg-slate-300 
 px-4 py-2 rounded font-bold
 text-slate-900 transition">
🔄 Change Topic
</button>

</div>

<div id="readingStats" 
class="mt-4 text-sm
 text-slate-600 ">
</div>

<div id="readingText" 
class="mt-6 text-base leading-relaxed break-words
 text-slate-900 ">
</div>

</div>
</div>
`;
function toggleWikiSource(isSimple) {
    isSimpleWikipedia = isSimple;
    const enBtn = document.getElementById("toggleEnWiki");
    const simpleBtn = document.getElementById("toggleSimpleWiki");

    if (isSimpleWikipedia) {
        simpleBtn.classList.add("bg-white", "text-purple-600", "shadow-sm");
        simpleBtn.classList.remove("text-slate-500", "hover:text-purple-600");
        enBtn.classList.remove("bg-white", "text-purple-600", "shadow-sm");
        enBtn.classList.add("text-slate-500", "hover:text-purple-600");
    } else {
        enBtn.classList.add("bg-white", "text-purple-600", "shadow-sm");
        enBtn.classList.remove("text-slate-500", "hover:text-purple-600");
        simpleBtn.classList.remove("bg-white", "text-purple-600", "shadow-sm");
        simpleBtn.classList.add("text-slate-500", "hover:text-purple-600");
    }
}

/* ================= INIT ================= */

function initReading() {

    const categorySelect = document.getElementById("categorySelect");
    if (!categorySelect) return;

    categorySelect.innerHTML = "";

    Object.keys(topicCategories).forEach(cat => {
        categorySelect.innerHTML +=
            `<option value="${cat}">${cat}</option>`;
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
        topicSelect.innerHTML +=
            `<option value="${topic}">${topic.replace(/_/g, " ")}</option>`;
    });
}

/* ================= FETCH ================= */

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

    const searchUrl =
        `https://${domain}/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(topic)}&format=json&origin=*`;

    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    const results = searchData.query.search;

    if (!results || results.length === 0) {
        document.getElementById("readingText").innerHTML =
            "No related articles found.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * results.length);
    fetchFullArticle(results[randomIndex].title);
}

async function fetchFullArticle(title) {

    const domain = isSimpleWikipedia ? "simple.wikipedia.org" : "en.wikipedia.org";
    const url =
        `https://${domain}/w/api.php?action=query&prop=extracts&explaintext=true&titles=${encodeURIComponent(title)}&format=json&origin=*`;

    const res = await fetch(url);
    const data = await res.json();

    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    let text = pages[pageId].extract;

    if (!text) {
        document.getElementById("readingText").innerHTML =
            "Content not found.";
        return;
    }

    fullArticleText = text;
    truncated = false;

    if (text.length > MAX_CHAR) {

        let cut = text.substring(0, MAX_CHAR);

        let lastPeriod = cut.lastIndexOf(".");
        let lastQuestion = cut.lastIndexOf("?");
        let lastExclamation = cut.lastIndexOf("!");

        let lastStop = Math.max(lastPeriod, lastQuestion, lastExclamation);

        if (lastStop > 100) {
            cut = cut.substring(0, lastStop + 1);
        }

        text = cut;
        truncated = true;
    }

    analyzeText(text);
}

/* ================= ANALYSIS ================= */

function analyzeText(text) {
    if (!text) return;

    // Split text into words while preserving punctuation and whitespace
    const parts = text.split(/(\b\w+\b)/g);

    let processedHtml = "";
    let wordCount = 0;
    let academicCount = 0;

    // Helper to find word in our dictionary
    const findWordInfo = (w) => {
        const lower = w.toLowerCase();
        return dictionaryData.find(d => d.word.toLowerCase() === lower);
    };

    parts.forEach(part => {
        if (/^\w+$/.test(part)) {
            // It's a word
            wordCount++;
            const wordInfo = findWordInfo(part);
            let classes = "reading-word transition-colors cursor-help border-b border-transparent hover:border-slate-400 ";
            let tooltipContent = "";

            if (wordInfo) {
                const level = (wordInfo.level || "??").toUpperCase();
                const pos = wordInfo.pos || "";
                const ipa = wordInfo.ipa || "";

                // Color by level
                if (level.startsWith("A")) classes += "text-emerald-700 ";
                else if (level.startsWith("B")) classes += "text-blue-700 ";
                else if (level.startsWith("C")) classes += "text-rose-700 ";

                tooltipContent = `
                    <div class='p-3 min-w-[220px] text-left whitespace-normal'>
                        <div class='flex justify-between items-center border-b border-slate-100 pb-1 mb-1'>
                            <span class='font-bold text-slate-800'>${part}</span>
                            <span class='text-[9px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600'>${level}</span>
                        </div>
                        <div class='text-[10px] text-slate-400 italic mb-1'>${pos} ${ipa}</div>
                        ${wordInfo.synonyms?.length ? `<div class='text-[10px] text-slate-600 leading-tight'><b>Eş Anlam:</b> ${wordInfo.synonyms.slice(0, 3).join(", ")}</div>` : ""}
                        ${wordInfo.examples?.length ? `<div class='text-[10px] mt-2 italic text-slate-500 line-clamp-2'>"${wordInfo.examples[0]}"</div>` : ""}
                    </div>
                `;
            }

            // Academic Word Highlight
            if (academicWords.includes(part.toLowerCase())) {
                academicCount++;
                if (!wordInfo) classes += "text-emerald-800 font-semibold ";
            }

            processedHtml += `
                <span class="group relative inline-block ${classes}">
                    ${part}
                    ${tooltipContent ? `
                    <div class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-[100] bg-white border border-slate-200 shadow-2xl rounded-xl">
                        ${tooltipContent}
                        <div class="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                    </div>` : ""}
                </span>`;
        } else {
            // It's whitespace or punctuation
            processedHtml += part;
        }
    });

    let readingTime = Math.ceil(wordCount / 200);

    const textContainer = document.getElementById("readingText");
    const statsContainer = document.getElementById("readingStats");

    if (textContainer) textContainer.innerHTML = processedHtml;

    if (statsContainer) statsContainer.innerHTML = `
        <div class="flex flex-wrap gap-4 items-center mb-4">
            <span class="px-2 py-1 bg-slate-100 rounded text-xs font-bold uppercase tracking-wider text-slate-500">Kelimeler: ${wordCount}</span>
            <span class="px-2 py-1 bg-slate-100 rounded text-xs font-bold uppercase tracking-wider text-slate-500">Süre: ~${readingTime} dk</span>
            <span class="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-bold uppercase tracking-wider">Akademik: ${academicCount}</span>
        </div>
    `;

    if (truncated && textContainer) {
        textContainer.innerHTML += `
<div class="mt-8 flex justify-center">
    <button onclick="showFullArticle()" 
    class="bg-slate-900 hover:bg-purple-900 px-8 py-3 rounded-full font-bold text-white transition-all transform hover:scale-105 shadow-xl">
    Devamını Oku & Çözümle
    </button>
</div>
`;
    }
}

function showFullArticle() {
    truncated = false;
    analyzeText(fullArticleText);
}

/* ================= ACADEMIC WORD LIST ================= */

const academicWords = [
    "significant", "impact", "analysis", "theory", "approach", "method",
    "evidence", "economic", "environmental", "policy", "development",
    "research", "data", "global", "factor", "structure", "function",
    "process", "concept", "primary", "secondary", "effect", "system",
    "model", "distribution", "resource", "strategy", "establish", "maintain",
    "indicate", "demonstrate", "interpret", "evaluate", "assess", "implement",
    "generate", "identify", "require", "involve", "occur", "contribute",
    "achieve", "obtain", "respond", "adapt", "emerge", "expand", "decline",
    "increase", "reduce", "enhance", "facilitate", "promote", "restrict",
    "influence", "determine", "define", "highlight", "emphasize",
    "conclude", "predict", "estimate", "measure", "quantify",
    "allocate", "regulate", "enforce", "sustain", "preserve",
    "consume", "produce", "invest", "finance", "administer",
    "authority", "capacity", "community", "complex", "component",
    "consequence", "consistent", "construct", "consumer", "corporate",
    "criteria", "culture", "debate", "dimension", "element",
    "environment", "equivalent", "ethics", "evolve", "exceed",
    "external", "feature", "framework", "goal", "hypothesis",
    "incentive", "income", "index", "individual", "innovation",
    "institution", "integrate", "interaction", "intervention",
    "investment", "issue", "labor", "legal", "legislation",
    "mechanism", "network", "objective", "option", "output",
    "participate", "perspective", "phenomenon", "portion", "potential",
    "principle", "procedure", "professional", "project", "proportion",
    "range", "ratio", "region", "relevant", "reliable",
    "resource", "response", "restore", "revenue", "sector",
    "sequence", "shift", "source", "specific", "stable",
    "status", "structure", "sufficient", "survey", "target",
    "technical", "technology", "transfer", "trend", "ultimate",
    "valid", "variable", "vision", "welfare", "whereas", "within"
];

/* ================= AUTO INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
    if (typeof readingHTML !== "undefined") {
        setTimeout(initReading, 300);
    }
});
