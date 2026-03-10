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
    <h2 class="text-xl font-bold text-red-800" style="font-family: 'Playfair Display', serif;">📘 Reading Intelligence</h2>
    <div class="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-black">
        <button id="toggleEnWiki" onclick="toggleWikiSource(false)" class="px-3 py-1 text-xs font-bold rounded-md bg-white text-slate-800 shadow-sm transition-all">English</button>
        <button id="toggleSimpleWiki" onclick="toggleWikiSource(true)" class="px-3 py-1 text-xs font-bold rounded-md text-slate-500 hover:text-slate-800 transition-all">Simple En</button>
    </div>
</div>
<div class="flex flex-wrap gap-2 text-black">
    <select id="categorySelect" class="p-2 rounded text-sm bg-slate-100 text-slate-900 border border-slate-300" onchange="updateTopics()"></select>
    <select id="topicSelect" class="p-2 rounded text-sm bg-slate-100 text-slate-900 border border-slate-300"></select>
</div>
<div class="flex flex-wrap gap-2 mt-4">
    <button onclick="loadReading()" class="bg-black hover:bg-slate-800 px-6 py-2 rounded-lg font-bold text-white transition shadow-lg">Makale Yükle</button>
    <button onclick="loadRandomArticle()" class="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg font-bold text-slate-900 transition border border-slate-200">🔄 Başka Konu</button>
</div>
<div id="readingStats" class="mt-4 text-[10px] uppercase tracking-widest font-bold text-slate-400 flex gap-4 border-t pt-4 border-slate-100"></div>
<div id="readingText" class="mt-6 text-xl leading-relaxed break-words text-slate-800 selection:bg-yellow-200"></div>
</div>
</div>

<!-- Premium Word Modal -->
<div id="wordModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm hidden items-center justify-center z-[200] p-4 overflow-y-auto">
    <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div class="p-10">
            <div class="flex justify-between items-start mb-8">
                <div>
                    <h2 id="modalWord" class="text-5xl font-black text-slate-900 uppercase tracking-tighter italic" style="font-family: 'Inter', sans-serif;">WORD</h2>
                    <p id="modalIpa" class="text-slate-400 font-mono mt-2 text-sm">// IPA //</p>
                </div>
                <button onclick="closeWordModal()" class="w-12 h-12 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div id="modalContent" class="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar text-black">
                <!-- Cards injected here -->
            </div>

            <div class="mt-10 flex gap-4">
                <button onclick="closeWordModal()" class="flex-1 px-8 py-4 bg-slate-100 text-slate-600 font-black rounded-3xl hover:bg-slate-200 transition-all uppercase tracking-widest text-xs">KAPAT</button>
            </div>
        </div>
    </div>
</div>

<style>
.reading-word { 
    display: inline-block;
    padding: 0 1px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
}
.reading-word:hover { 
    background-color: #fef08a !important; 
    color: #000 !important;
}
/* Legend Markings */
.academic-hilite { border-bottom: 2px solid #10b981; }
.passive-hilite { color: #f43f5e; font-weight: bold; }
.conjunction-hilite { border-bottom: 2px dashed #f59e0b; font-weight: bold; }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

.word-info-card {
    background: #fff;
    border: 1px solid #f1f5f9;
    border-radius: 1.5rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
}
.tr-meaning {
    color: #ef4444; /* Red-500 */
    font-weight: bold;
    margin-top: 0.5rem;
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
        if (text.length > MAX_CHAR) {
            text = text.substring(0, MAX_CHAR);
            let lastStop = Math.max(text.lastIndexOf("."), text.lastIndexOf("?"), text.lastIndexOf("!"));
            if (lastStop > 100) text = text.substring(0, lastStop + 1);
            truncated = true;
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

    if (textContainer) {
        textContainer.innerHTML = processedHtml + (truncated ? `<div class="mt-12 flex justify-center"><button onclick="showFullArticle()" class="bg-black px-10 py-4 rounded-2xl font-black text-white shadow-2xl hover:bg-slate-800 transition-all uppercase tracking-widest text-xs">Makaleyi Tamamla</button></div>` : "");
    }

    if (statsContainer) {
        statsContainer.innerHTML = `
            <span>Kelimeler: ${wordCount}</span>
            <span>Akademik: ${academicCount}</span>
            <span>Passive: ${passiveCount}</span>
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
                    definitions: first.meanings.map(m => m.definitions[0].definition),
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

        // Combine definitions with TR meaning
        const defs = wordInfo.definitions || (wordInfo.examples ? [wordInfo.examples[0]] : ["Tanım bulunamadı."]);

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
