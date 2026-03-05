/* =========================================
   YDS Reading Intelligence Engine v5.0
   Sentence-Safe Truncation + Read More System
   ========================================= */

/* ================= GLOBALS ================= */

let fullArticleText = "";
let truncated = false;
const MAX_CHAR = 5000; // Maximum preview length

/* ================= CATEGORIES ================= */

const topicCategories = {

Environment: [
"Climate_change","Global_warming","Sustainability","Renewable_energy",
"Biodiversity","Deforestation","Water_scarcity","Ecosystem"
],

Technology: [
"Artificial_intelligence","Machine_learning","Automation",
"Cybersecurity","Big_data","Blockchain","Robotics","Cloud_computing"
],

Economics: [
"Economic_growth","Globalization","Inflation","Unemployment",
"Income_inequality","Sustainable_development","Public_policy","Circular_economy"
],

Psychology: [
"Psychology","Cognitive_bias","Mental_health","Human_behavior",
"Motivation","Decision-making","Behavioral_economics"
],

Education: [
"Education","Higher_education","Distance_education","Lifelong_learning",
"Educational_technology","STEM_education"
],

Health: [
"Public_health","Pandemic","Vaccination","Nutrition",
"Biotechnology","Medical_research","Aging_population"
]

};

/* ================= HTML ================= */

const readingHTML = `
<div class="space-y-8">

<div class="p-8 rounded-2xl shadow-sm
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-700">

<h2 class="text-xl font-bold mb-4
           text-purple-600 dark:text-purple-400">
📘 YDS Reading Intelligence Engine
</h2>

<div class="flex flex-wrap gap-2">

<select id="categorySelect" 
class="p-2 rounded text-sm
       bg-slate-100 dark:bg-slate-800
       text-slate-900 dark:text-slate-100
       border border-slate-300 dark:border-slate-600"
onchange="updateTopics()">
</select>

<select id="topicSelect" 
class="p-2 rounded text-sm
       bg-slate-100 dark:bg-slate-800
       text-slate-900 dark:text-slate-100
       border border-slate-300 dark:border-slate-600">
</select>

</div>

<div class="flex flex-wrap gap-2 mt-4">

<button onclick="loadReading()" 
class="bg-purple-600 hover:bg-purple-700
       px-4 py-2 rounded font-bold text-white transition">
Load Article
</button>

<button onclick="loadRandomArticle()" 
class="bg-slate-200 dark:bg-slate-700
       hover:bg-slate-300 dark:hover:bg-slate-600
       px-4 py-2 rounded font-bold
       text-slate-900 dark:text-slate-100 transition">
🔄 Change Article
</button>

</div>

<div id="readingStats" 
class="mt-4 text-sm
       text-slate-600 dark:text-slate-400">
</div>

<div id="readingText" 
class="mt-6 text-base leading-relaxed break-words
       text-slate-900 dark:text-slate-100">
</div>

</div>
</div>
`;
/* ================= INIT ================= */

function initReading(){

const categorySelect = document.getElementById("categorySelect");
if(!categorySelect) return;

categorySelect.innerHTML = "";

Object.keys(topicCategories).forEach(cat=>{
categorySelect.innerHTML += 
`<option value="${cat}">${cat}</option>`;
});

updateTopics();
}

function updateTopics(){

const categoryEl = document.getElementById("categorySelect");
const topicSelect = document.getElementById("topicSelect");

if(!categoryEl || !topicSelect) return;

const category = categoryEl.value;

topicSelect.innerHTML = "";

topicCategories[category].forEach(topic=>{
topicSelect.innerHTML += 
`<option value="${topic}">${topic.replace(/_/g," ")}</option>`;
});
}

/* ================= FETCH ================= */

async function loadReading(){
const topicEl = document.getElementById("topicSelect");
if(!topicEl) return;
fetchFullArticle(topicEl.value);
}

async function loadRandomArticle(){

const topicEl = document.getElementById("topicSelect");
if(!topicEl) return;

const topic = topicEl.value;

const searchUrl =
`https://simple.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(topic)}&format=json&origin=*`;

const searchRes = await fetch(searchUrl);
const searchData = await searchRes.json();

const results = searchData.query.search;

if(!results || results.length === 0){
document.getElementById("readingText").innerHTML =
"No related articles found.";
return;
}

// random article seç
const randomIndex = Math.floor(Math.random() * results.length);
const title = results[randomIndex].title;

// article fetch
const articleUrl =
`https://simple.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=true&titles=${encodeURIComponent(title)}&format=json&origin=*`;

const articleRes = await fetch(articleUrl);
const articleData = await articleRes.json();

const pages = articleData.query.pages;
const page = Object.values(pages)[0];

document.getElementById("readingText").innerText = page.extract;

}

fullArticleText = text;
truncated = false;

if(text.length > MAX_CHAR){

let cut = text.substring(0,MAX_CHAR);

let lastPeriod = cut.lastIndexOf(".");
let lastQuestion = cut.lastIndexOf("?");
let lastExclamation = cut.lastIndexOf("!");

let lastStop = Math.max(lastPeriod,lastQuestion,lastExclamation);

if(lastStop > 100){
cut = cut.substring(0,lastStop+1);
}

text = cut;
truncated = true;
}

analyzeText(text);
}

/* ================= ANALYSIS ================= */

function analyzeText(text){

if(!text) return;

let words = text.split(/\s+/);
let wordCount = words.length;
let readingTime = Math.ceil(wordCount / 200);

let academicCount = 0;

academicWords.forEach(word=>{
const regex = new RegExp("\\b"+word+"\\b","gi");
const matches = text.match(regex);
if(matches) academicCount += matches.length;
text = text.replace(regex,
`<span class="text-green-400 font-semibold">${word}</span>`);
});

const passiveMatches =
text.match(/\b(be|is|are|was|were|been|being)\s+\w+ed\b/gi) || [];

const passiveCount = passiveMatches.length;

text = text.replace(
/\b(be|is|are|was|were|been|being)\s+\w+ed\b/gi,
'<span class="text-red-400 font-bold">$&</span>'
);

const difficulty =
(Math.min(wordCount/50,10)
+ passiveCount*0.5
+ academicCount*1.2).toFixed(1);

const textContainer = document.getElementById("readingText");
const statsContainer = document.getElementById("readingStats");

if(textContainer) textContainer.innerHTML = text;

if(statsContainer) statsContainer.innerHTML = `
Words: ${wordCount} |
Reading Time: ~${readingTime} min |
Academic Words: ${academicCount} |
Passive: ${passiveCount} |
Difficulty: <span class="text-purple-400 font-bold">${difficulty}/20</span>
`;

if(truncated && textContainer){
textContainer.innerHTML += `
<div class="mt-6">
<button onclick="showFullArticle()" 
class="bg-purple-600 px-4 py-2 rounded font-bold">
Devamını Oku
</button>
</div>
`;
}
}

function showFullArticle(){
truncated = false;
analyzeText(fullArticleText);
}

/* ================= ACADEMIC WORD LIST ================= */

const academicWords = [
"significant","impact","analysis","theory","approach","method",
"evidence","economic","environmental","policy","development",
"research","data","global","factor","structure","function",
"process","concept","primary","secondary","effect","system",
"model","distribution","resource","strategy","establish","maintain",
"indicate","demonstrate","interpret","evaluate","assess","implement",
"generate","identify","require","involve","occur","contribute",
"achieve","obtain","respond","adapt","emerge","expand","decline",
"increase","reduce","enhance","facilitate","promote","restrict",
"influence","determine","define","highlight","emphasize",
"conclude","predict","estimate","measure","quantify",
"allocate","regulate","enforce","sustain","preserve",
"consume","produce","invest","finance","administer",
"authority","capacity","community","complex","component",
"consequence","consistent","construct","consumer","corporate",
"criteria","culture","debate","dimension","element",
"environment","equivalent","ethics","evolve","exceed",
"external","feature","framework","goal","hypothesis",
"incentive","income","index","individual","innovation",
"institution","integrate","interaction","intervention",
"investment","issue","labor","legal","legislation",
"mechanism","network","objective","option","output",
"participate","perspective","phenomenon","portion","potential",
"principle","procedure","professional","project","proportion",
"range","ratio","region","relevant","reliable",
"resource","response","restore","revenue","sector",
"sequence","shift","source","specific","stable",
"status","structure","sufficient","survey","target",
"technical","technology","transfer","trend","ultimate",
"valid","variable","vision","welfare","whereas","within"
];

/* ================= AUTO INIT ================= */

document.addEventListener("DOMContentLoaded",()=>{
if(typeof readingHTML!=="undefined"){
setTimeout(initReading,300);
}
});
