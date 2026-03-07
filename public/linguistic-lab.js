// ==========================================
// LINGUISTIC LAB — Editorial Edition
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    injectLinguisticLab();
});

let currentLabTab = "word";

function injectLinguisticLab() {

    const container = document.getElementById("tab-linguisticlab");
    if (!container) return;

    container.innerHTML = `
 <div class="min-h-screen flex flex-col md:flex-row bg-slate-50">

 <!-- SIDEBAR -->
 <aside class="w-full md:w-[200px] bg-white 
 border-b md:border-b-0 md:border-r border-slate-200 
 p-6 flex flex-col space-y-6 md:space-y-8">

 <div>
 <h1 class="font-serif text-xl tracking-wide
 text-slate-900 ">
 Linguistic Lab
 </h1>
 <p class="text-xs italic text-slate-500 mt-1">
 Where language reveals its architecture.
 </p>
 </div>

 <nav class="space-y-4 text-sm">

 <button onclick="switchLabTab('word')" 
 class="lab-tab w-full text-left transition
 ${tabClass("word")}">
 Word Intelligence
 </button>

 <button onclick="switchLabTab('sentence')" 
 class="lab-tab w-full text-left transition
 ${tabClass("sentence")}">
 Sentence Architecture
 </button>

 <button onclick="switchLabTab('paragraph')" 
 class="lab-tab w-full text-left transition
 ${tabClass("paragraph")}">
        Discourse Structure
 </button>

 </nav>

 </aside>

 <!-- CONTENT -->
        <main class="flex-1 p-6 md:p-12">

            <div id="labContent"
                class="max-w-6xl mx-auto space-y-8 md:space-y-12">
            </div>

        </main>

 </div>
        `;

    renderLabContent();
}

function tabClass(tab) {

    if (currentLabTab === tab) {
        return `
    text-slate-900
    border-l-2 border-red-800
    pl-3
        `;
    }

    return `
    text-slate-500
    hover:text-slate-900
    pl-4
        `;
}

function switchLabTab(tab) {
    currentLabTab = tab;
    injectLinguisticLab();
}

function renderLabContent() {

    const content = document.getElementById("labContent");

    if (currentLabTab === "word") {
        content.innerHTML = renderWordModule();
    }

    if (currentLabTab === "sentence") {
        content.innerHTML = renderSentenceModule();
    }

    if (currentLabTab === "paragraph") {
        content.innerHTML = renderParagraphModule();
    }
}

/* ===========================
 WORD MODULE
=========================== */

function renderWordModule() {

    return `
        <div class="space-y-10">

 <div>
 <h2 class="font-serif text-3xl text-slate-900 " style="font-family: 'Playfair Display', serif;">
 Word Intelligence
 </h2>
 <div class="h-[2px] w-16 bg-red-800 mt-3"></div>
 </div>

 <div class="flex gap-4">
 <input id="labWordInput"
 placeholder="Enter a word..."
 class="flex-1 px-4 py-3 rounded-lg
 bg-white 
 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-800
 text-slate-900 ">
 <button onclick="analyzeWord()"
 class="px-6 py-3 bg-red-800 text-white font-bold rounded-lg
 hover:bg-black transition shadow-sm">
 Analyze
 </button>
 </div>

 <div id="labWordOutput"
 class="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
 </div>

 </div>
        `;
}

/* ===========================
 SENTENCE MODULE
=========================== */

function renderSentenceModule() {

    return `
        <div class="space-y-10">

 <div>
 <h2 class="font-serif text-3xl text-slate-900 " style="font-family: 'Playfair Display', serif;">
 Sentence Architecture
 </h2>
 <div class="h-[2px] w-16 bg-red-800 mt-3"></div>
 </div>

 <textarea id="labSentenceInput"
 rows="4"
 placeholder="Enter a sentence..."
 class="w-full p-4 rounded-lg
 bg-white 
 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-800
 text-slate-900 ">
 </textarea>

 <button onclick="analyzeSentenceLab()"
 class="px-6 py-3 bg-red-800 text-white font-bold rounded-lg
 hover:bg-black transition shadow-sm">
 Analyze Structure
 </button>

 <div id="labSentenceOutput"
 class="space-y-8">
 </div>

 </div>
        `;
}

/* ===========================
 PARAGRAPH MODULE
=========================== */

function renderParagraphModule() {

    return `
        <div class="space-y-10">

 <div>
 <h2 class="font-serif text-3xl text-slate-900 " style="font-family: 'Playfair Display', serif;">
 Discourse Structure
 </h2>
 <div class="h-[2px] w-16 bg-red-800 mt-3"></div>
 </div>

 <textarea id="labParagraphInput"
 rows="6"
 placeholder="Enter a paragraph..."
 class="w-full p-4 rounded-lg
 bg-white 
 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-800
 text-slate-900 ">
 </textarea>

 <button onclick="analyzeParagraphLab()"
 class="px-6 py-3 bg-red-800 text-white font-bold rounded-lg
 hover:bg-black transition shadow-sm">
 Analyze Discourse
 </button>

 <div id="labParagraphOutput"
 class="space-y-8">
 </div>

 </div>
        `;
}

/* ===========================
 PLACEHOLDER FUNCTIONS
=========================== */

async function analyzeWord() {

    const word = document.getElementById("labWordInput").value.trim();
    if (!word) return;

    const output = document.getElementById("labWordOutput");
    output.innerHTML = "Analyzing...";

    const res = await fetch("/api/linguistic-lab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            mode: "word",
            input: word
        })
    });

    const data = await res.json();

    output.innerHTML = `
 ${labCard("Morphology", data.morphology)}
 ${labCard("Semantic Evolution", data.semantic_evolution)}
 ${labCard("Academic Register", data.register)}
 ${labListCard("Collocations", data.collocations)}
 ${labListCard("Derivations", data.derivations)}
 ${labCard("Passive Usage", data.passive_tendency)}
 ${labCard("YDS Trap Insight", data.yds_trap)}
 ${labCard("CEFR Level", data.cefr)}
 ${labCard("Turkish Explanation", data.turkish_explanation)}
    `;
}

function labCard(title, content) {

    return `
        < div class="p-6 rounded-xl bg-white 
 border border - slate - 200
    shadow - sm">

        < h3 class="font-serif text-lg text-slate-900 " style = "font-family: 'Playfair Display', serif;" >
            ${title}
 </h3 >

 <div class="h-[2px] w-10 bg-red-800 my-3"></div>

 <p class="text-slate-700 whitespace-pre-wrap">
 ${content || "-"}
 </p>

 </div >
        `;
}
function labListCard(title, list) {

    if (!Array.isArray(list)) list = [];

    return `
        < div class="p-6 rounded-xl bg-white 
 border border - slate - 200
    shadow - sm">

        < h3 class="font-serif text-lg text-slate-900 " style = "font-family: 'Playfair Display', serif;" >
            ${title}
 </h3 >

 <div class="h-[2px] w-10 bg-red-800 my-3"></div>

 <ul class="list-disc ml-5 space-y-1
 text-slate-700 ">
 ${list.map(i => `<li>${i}</li>`).join("")}
 </ul>

 </div >
        `;
}

async function analyzeSentenceLab() {

    const text = document.getElementById("labSentenceInput").value.trim();
    const output = document.getElementById("labSentenceOutput");

    if (!text) return;

    output.innerHTML = `
        < div class="p-6 bg-white rounded-xl shadow-sm" >
            <span class="text-amber-500">Analyzing structure...</span>
 </div >
        `;

    try {

        const res = await fetch("/.netlify/functions/linguistic-lab", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mode: "sentence",
                text: text
            })
        });

        const raw = await res.text();

        if (!res.ok) {
            output.innerHTML = `< p class="text-red-500" > Analysis failed.</p > `;
            return;
        }

        let data;
        try {
            data = JSON.parse(raw);
        } catch {
            output.innerHTML = `
        < div class="p-6 bg-red-50 rounded-xl" >
            <pre class="text-sm">${raw}</pre>
 </div >
        `;
            return;
        }

        output.innerHTML = `
        < div class="space-y-6" >

            ${renderCard("Clause Structure", data.clause_structure)}
 ${renderCard("Verb Analysis", data.verb_analysis)}
 ${renderCard("Tense & Voice", data.tense_voice)}
 ${renderCard("Complexity Level", data.complexity_level)}
 ${renderCard("Academic Density", data.academic_density)}
 ${renderCard("Exam Traps", data.exam_traps)}
 ${renderCard("Paraphrase Difficulty", data.paraphrase_difficulty)}
 ${renderCard("Turkish Explanation", data.turkish_explanation)}

 </div >
        `;

    } catch (err) {
        console.error(err);
        output.innerHTML = `< p class="text-red-500" > Server error.</p > `;
    }
}




async function analyzeParagraphLab() {

    const text = document.getElementById("labParagraphInput").value.trim();
    const output = document.getElementById("labParagraphOutput");

    if (!text) return;

    output.innerHTML = `
        < div class="p-6 bg-white rounded-xl shadow-sm" >
            <span class="text-amber-500">Analyzing discourse...</span>
 </div >
        `;

    try {

        const res = await fetch("/api/linguistic-lab", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mode: "discourse",
                text: text
            })
        });

        const raw = await res.text();

        if (!res.ok) {
            output.innerHTML = `< p class="text-red-500" > Analysis failed.</p > `;
            return;
        }

        let data;
        try {
            data = JSON.parse(raw);
        } catch {
            output.innerHTML = `
        < div class="p-6 bg-red-50 rounded-xl" >
            <pre class="text-sm">${raw}</pre>
 </div >
        `;
            return;
        }

        output.innerHTML = `
        < div class="space-y-6" >

            ${renderCard("Topic Sentence", data.topic_sentence)}
 ${renderCard("Logical Progression", data.logical_progression)}
 ${renderCard("Connectors", data.connectors)}
 ${renderCard("Argument Style", data.argument_style)}
 ${renderCard("Cohesion Devices", data.cohesion_devices)}
 ${renderCard("Academic Tone", data.academic_tone)}
 ${renderCard("Exam Prediction", data.exam_prediction)}
 ${renderCard("Paraphrase Level", data.paraphrase_level)}
 ${renderCard("Turkish Meta", data.turkish_meta)}

 </div >
        `;

    } catch (err) {
        console.error(err);
        output.innerHTML = `< p class="text-red-500" > Server error.</p > `;
    }
}

function renderCard(title, content) {

    if (!content) content = "-";

    return `
        < div class="p-6 bg-white 
 border border - slate - 200
    rounded - xl shadow - sm">

        < h3 class="font-semibold text-lg mb-2 text-slate-800 " >
            ${title}
 </h3 >

        <p class="text-slate-700 leading-relaxed">
            ${content}
        </p>

 </div >
        `;
}
