/* =========================================
 YDS Vocabulary Engine v9.0
 CEFR + Frequency Heat
 Multi TR per Definition
 3 Unsplash Images
 Firestore Notebook
 ========================================= */

const UNSPLASH_ACCESS_KEY = "0uDnN1Zl1YFXRG3vHAKgEZoTakXkCg65RV3LtgXiNcM";

/* =========================================
 HTML TEMPLATE
 ========================================= */

const dictionaryHTML = `
<div class="space-y-10">

<div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">

<h2 class="text-2xl font-bold text-black mb-4">
YDS Vocabulary Engine
</h2>

<input id="dictWordInput" type="text"
placeholder="Enter a word..."
class="w-full px-4 py-3 rounded-lg border border-slate-200 
bg-slate-50 text-slate-900 
focus:ring-2 focus:ring-blue-500 font-medium">

<button onclick="searchDictionaryWord()" 
class="mt-3 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 
text-black rounded-lg font-bold shadow-md hover:scale-105 transition-all">
Search
</button>

<div id="dictOutput" class="mt-6 bg-slate-50 p-6 rounded-xl min-h-[150px]">
Enter a word to begin.
</div>

</div>

<div id="imagePopup" 
class="fixed inset-0 bg-black/80 hidden items-center justify-center z-50">
<div class="bg-white p-6 rounded-xl relative max-w-lg w-full">
<button onclick="closeImagePopup()" 
class="absolute top-2 right-3 text-red-500 text-xl">✖</button>
<img id="popupImage" class="w-full rounded-lg shadow-lg">
<div id="popupCredit" class="text-xs mt-3 text-slate-500"></div>
</div>
</div>

</div>
`;

/* =========================================
 CEFR
 ========================================= */

function getCEFR(score){
if(score >= 6.5) return "A1";
if(score >= 5.5) return "A2";
if(score >= 4.5) return "B1";
if(score >= 3.5) return "B2";
if(score >= 2.5) return "C1";
return "C2";
}

/* =========================================
 UNSPLASH
 ========================================= */

async function fetchUnsplashImages(word){
try{
const res = await fetch(
`https://api.unsplash.com/search/photos?query=${encodeURIComponent(word)}&per_page=3`,
{
headers:{
Authorization:`Client-ID ${UNSPLASH_ACCESS_KEY}`
}
}
);

const data = await res.json();

if(data.results){
return data.results.map(img => ({
thumb: img.urls.small,
full: img.urls.regular,
author: img.user.name,
authorLink: img.user.links.html
}));
}

return [];
}catch{
return [];
}
}

/* =========================================
 TRANSLATE
 ========================================= */

async function translateText(text){
try{
const res = await fetch(
`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|tr`
);
const data = await res.json();
return data.responseData?.translatedText || "";
}catch{
return "";
}
}

/* =========================================
 MAIN SEARCH
 ========================================= */

async function searchDictionaryWord(wordParam=null){

const input = document.getElementById("dictWordInput");
if(!input) return;

const word = (wordParam || input.value).toLowerCase().trim();
if(!word) return;

input.value = word;

const output = document.getElementById("dictOutput");
if(!output) return;

output.innerHTML = "Loading...";

try{

const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
if(!dictRes.ok) throw new Error();
const dictData = await dictRes.json();

const synData = await (await fetch(`https://api.datamuse.com/words?rel_syn=${word}`)).json();
const antData = await (await fetch(`https://api.datamuse.com/words?rel_ant=${word}`)).json();
const freqData = await (await fetch(`https://api.datamuse.com/words?sp=${word}&md=f`)).json();
const familyData = await (await fetch(`https://api.datamuse.com/words?ml=${word}&max=10`)).json();

const images = await fetchUnsplashImages(word);

let score = 0;
const freqTag = freqData[0]?.tags?.find(t => t.startsWith("f:"));
if(freqTag) score = parseFloat(freqTag.split(":")[1]);
score = Math.max(0, Math.min(score, 7));
const percent = (score/7)*100;
const cefr = getCEFR(score);

let html = "";
const entry = dictData[0];

/* HEADER */

html += `
<div class="flex items-center gap-4 flex-wrap">
<div class="text-3xl font-bold text-black">
${entry.word}
</div>
<button onclick="speakWord('${entry.word}')">🔊</button>
<button onclick="saveWord('${entry.word}')">⭐</button>
</div>
`;

/* CEFR */

html += `
<div class="mt-3 text-sm">
CEFR Level: <b>${cefr}</b>
</div>
<div class="mt-2 w-full bg-slate-200 h-3 rounded-full overflow-hidden">
<div class="h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
style="width:${percent}%"></div>
</div>
`;

/* DEFINITIONS */

for(const m of entry.meanings){

html += `<div class="mt-6"><b>${m.partOfSpeech}</b><ul class="list-disc ml-6 mt-3">`;

for(const d of m.definitions.slice(0,3)){

const trDef = await translateText(d.definition);

html += `
<li class="mb-3">
<div>${d.definition}</div>
${trDef ? `<div class="text-sm text-green-600 ">➜ ${trDef}</div>` : ""}
</li>
`;
}

html += `</ul></div>`;
}

/* IMAGES */

if(images.length){

html += `
<div class="mt-6">
<b>Visual Context:</b>
<div class="grid grid-cols-3 gap-3 mt-3">
`;

images.forEach(img=>{
html += `
<div onclick="openImagePopup('${img.full}','${img.author}','${img.authorLink}')"
class="cursor-pointer">
<img src="${img.thumb}" 
class="rounded-lg shadow hover:scale-105 transition object-cover h-28 w-full">
</div>
`;
});

html += `
</div>
</div>
`;
}

/* WORD FAMILY */

if(familyData.length){
html += `<div class="mt-6"><b>Word Family:</b><br>`;
familyData.slice(0,6).forEach(w=>{
html += `<span onclick="searchDictionaryWord('${w.word}')"
class="m-1 px-2 py-1 bg-purple-200 rounded cursor-pointer text-sm">
${w.word}
</span>`;
});
html += `</div>`;
}

/* SYNONYMS */

if(synData.length){
html += `<div class="mt-6"><b>Synonyms:</b><br>`;
synData.slice(0,5).forEach(w=>{
html += `<span onclick="searchDictionaryWord('${w.word}')"
class="m-1 px-2 py-1 bg-blue-200 rounded cursor-pointer text-sm">
${w.word}
</span>`;
});
html += `</div>`;
}

/* ANTONYMS */

if(antData.length){
html += `<div class="mt-6"><b>Antonyms:</b><br>`;
antData.slice(0,5).forEach(w=>{
html += `<span onclick="searchDictionaryWord('${w.word}')"
class="m-1 px-2 py-1 bg-red-200 rounded cursor-pointer text-sm">
${w.word}
</span>`;
});
html += `</div>`;
}

output.innerHTML = html;

}catch{
output.innerHTML = "Word not found.";
}
}

/* =========================================
 IMAGE POPUP
 ========================================= */

function openImagePopup(url, author, link){
const popup = document.getElementById("imagePopup");
const img = document.getElementById("popupImage");
const credit = document.getElementById("popupCredit");

img.src = url;
credit.innerHTML = `Photo by <a href="${link}" target="_blank" class="underline">${author}</a> on Unsplash`;

popup.classList.remove("hidden");
popup.classList.add("flex");
}

function closeImagePopup(){
document.getElementById("imagePopup").classList.add("hidden");
}

/* =========================================
 SPEECH
 ========================================= */

function speakWord(text){
const utter = new SpeechSynthesisUtterance(text);
utter.lang = "en-US";
speechSynthesis.cancel();
speechSynthesis.speak(utter);
}

/* =========================================
 FIRESTORE NOTEBOOK (SAFE VERSION)
========================================= */

async function saveWord(word){

 if(!word || typeof word !== "string") {
 console.error("Invalid word:", word);
 return;
 }

 if(!window.currentUser){
 alert("Please login first.");
 return;
 }

 try {

 // 🔍 Duplicate kontrolü
 const existing = await getSavedWordsFirestore();
 const alreadySaved = existing.some(item => item.word === word);

 if(alreadySaved){
 alert("Word already saved.");
 return;
 }

 // ✅ Firestore'a OBJECT gönderiyoruz
 await saveWordFirestore({
 word: word,
 createdAt: new Date()
 });

 alert("Word saved successfully!");
 renderNotebook();

 } catch(error){
 console.error("Save error:", error);
 alert("Error saving word.");
 }
}


/* =========================================
 RENDER NOTEBOOK
========================================= */

async function renderNotebook(){

 if(!window.currentUser) return;

 const container = document.getElementById("profileNotebookList");
 if(!container) return;

 try {

 const notebook = await getSavedWordsFirestore();

 container.innerHTML = "";

 if(!notebook || notebook.length === 0){
 container.innerHTML =
 "<p class='text-sm text-gray-500'>No saved words yet.</p>";
 return;
 }

 notebook.forEach(item => {

 const div = document.createElement("div");
 div.className =
 "flex justify-between items-center bg-slate-100 p-2 rounded mb-2 text-sm";

 div.innerHTML = `
 <span class="font-medium cursor-pointer text-black hover:underline">
 ${item.word}
 </span>

 <button class="text-red-400 hover:text-red-600 text-xs">
 Delete
 </button>
 `;

 // Word click
 div.querySelector("span").onclick = () => {
 switchTab('dictionary');
 setTimeout(() => searchDictionaryWord(item.word), 200);
 };

 // Delete click
 div.querySelector("button").onclick = async () => {

 if(!confirm("Delete this word?")) return;

 await deleteWordFirestore(item.id);
 renderNotebook();
 };

 container.appendChild(div);
 });

 } catch(error){
 console.error(error);
 }
}

/* =========================================
 AUTO LOAD AFTER LOGIN
========================================= */

document.addEventListener("DOMContentLoaded", () => {

 // Eğer auth state değişimini dinliyorsan,
 // en sağlıklısı oradan renderNotebook çağırmak.

 setTimeout(() => {
 renderNotebook();
 }, 500);

});