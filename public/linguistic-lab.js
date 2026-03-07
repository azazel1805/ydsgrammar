// ==========================================
// LINGUISTIC LAB — FIXED VERSION
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

<aside class="w-full md:w-[200px] bg-white border-b md:border-b-0 md:border-r border-slate-200 p-6">

<h1 class="font-serif text-xl text-slate-900">
Linguistic Lab
</h1>

<p class="text-xs italic text-slate-500 mt-1">
Where language reveals its architecture.
</p>

<nav class="mt-6 space-y-3 text-sm">

<button onclick="switchLabTab('word')" class="lab-tab w-full text-left ${tabClass("word")}">
Word Intelligence
</button>

<button onclick="switchLabTab('sentence')" class="lab-tab w-full text-left ${tabClass("sentence")}">
Sentence Architecture
</button>

<button onclick="switchLabTab('paragraph')" class="lab-tab w-full text-left ${tabClass("paragraph")}">
Discourse Structure
</button>

</nav>

</aside>

<main class="flex-1 p-8">
<div id="labContent"></div>
</main>

</div>
`;

    renderLabContent();
}

function tabClass(tab) {
    return currentLabTab === tab
        ? "text-slate-900 border-l-2 border-red-800 pl-3"
        : "text-slate-500 hover:text-slate-900 pl-4";
}

function switchLabTab(tab) {
    currentLabTab = tab;
    injectLinguisticLab();
}

function renderLabContent() {

    const content = document.getElementById("labContent");

    if (currentLabTab === "word") content.innerHTML = renderWordModule();
    if (currentLabTab === "sentence") content.innerHTML = renderSentenceModule();
    if (currentLabTab === "paragraph") content.innerHTML = renderParagraphModule();

}

function renderWordModule() {

return `
<div class="space-y-8">

<h2 class="font-serif text-3xl text-slate-900">Word Intelligence</h2>

<div class="flex gap-4">

<input id="labWordInput"
placeholder="Enter a word..."
class="flex-1 px-4 py-3 border border-slate-300 rounded-lg">

<button onclick="analyzeWord()"
class="px-6 py-3 bg-red-800 text-white rounded-lg">
Analyze
</button>

</div>

<div id="labWordOutput" class="grid md:grid-cols-2 xl:grid-cols-3 gap-6"></div>

</div>
`;
}

async function analyzeWord() {

const word = document.getElementById("labWordInput").value.trim();
if (!word) return;

const output = document.getElementById("labWordOutput");
output.innerHTML = "Analyzing...";

try {

const res = await fetch("/.netlify/functions/linguistic-lab", {
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({
mode:"word",
input:word
})
});

const text = await res.text();

if(!res.ok){
output.innerHTML = `<div class="text-red-500">Server error</div>`;
return;
}

let data;

try{
data = JSON.parse(text);
}catch{
output.innerHTML = `<pre>${text}</pre>`;
return;
}

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

}catch(err){

console.error(err);
output.innerHTML = `<div class="text-red-500">Server error</div>`;

}

}

function labCard(title, content){

return `
<div class="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">

<h3 class="font-serif text-lg text-slate-900">${title}</h3>

<div class="h-[2px] w-10 bg-red-800 my-3"></div>

<p class="text-slate-700 whitespace-pre-wrap">
${content || "-"}
</p>

</div>
`;
}

function labListCard(title,list){

if(!Array.isArray(list)) list=[];

return `
<div class="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">

<h3 class="font-serif text-lg text-slate-900">${title}</h3>

<div class="h-[2px] w-10 bg-red-800 my-3"></div>

<ul class="list-disc ml-5 space-y-1 text-slate-700">
${list.map(i=>`<li>${i}</li>`).join("")}
</ul>

</div>
`;
}
