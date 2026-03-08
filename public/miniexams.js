/* =========================================
 MINI EXAMS ENGINE
========================================= */

let miniExamDataPool = [];
let miniExamQuestions = [];
let miniCurrent = 0;
let miniScore = 0;
let miniExamResults = [];

document.addEventListener("DOMContentLoaded", () => {
    injectMiniExamHTML();
});

function injectMiniExamHTML() {

    const container = document.getElementById("tab-miniexams");

    container.innerHTML = `
 <div class="max-w-4xl mx-auto mt-10 space-y-8">

 <h2 class="text-4xl font-bold text-center text-red-800 mb-2" style="font-family: 'Playfair Display', serif;">
 Mini Exams
 </h2>

 <div id="miniStartBox"
 class="p-6 rounded-2xl shadow-sm
 bg-white 
 border border-slate-200 
 space-y-4">

 <div class="flex gap-3 flex-wrap">
 <select id="miniType"
 class="p-2 rounded
 bg-slate-100 
 text-slate-900 
 border border-slate-300 ">
 <option value="tenses">Tenses</option>
 <option value="conjunctions">Conjunctions</option>
 <option value="modals">Modals</option>
 <option value="passives">Passives</option>
 <option value="ifclauses">If Clauses</option>
 <option value="relatives">Relatives</option>
 <option value="nounclauses">Noun Clauses</option>
 <option value="vocabulary">Vocabulary</option>
 <option value="irrelevant">Irrelevant Sentence</option>
 </select>

 <select id="miniCount"
 class="p-2 rounded
 bg-slate-100 
 text-slate-900 
 border border-slate-300 ">
 <option value="10">10 Questions</option>
 <option value="20">20 Questions</option>
 <option value="30">30 Questions</option>
 </select>
 </div>

 <button onclick="startMiniExam()"
 class="px-6 py-3 w-full rounded-xl font-bold
 bg-red-800 hover:bg-black
 text-white transition shadow-sm">
 Start Exam
 </button>

 </div>

 <div id="miniGameBox"
 class="hidden p-6 rounded-2xl shadow-sm
 bg-white 
 border border-slate-200 
 space-y-6">

 <div class="text-sm text-slate-600 ">
 Question <span id="miniQnum"></span>
 | Score: <span id="miniScore"></span>
 </div>

 <div id="miniQuestion"
 class="text-lg font-medium
 text-slate-900 ">
 </div>

 <div id="miniOptions" class="grid gap-3"></div>

 </div>

 <div id="miniResultBox" class="hidden"></div>

 </div>
 `;
}

/* =========================================
 LOAD JSON POOL
========================================= */

async function loadMiniExamData(type) {

    const indexRes = await fetch(`/exams/${type}/index.json`);
    const indexData = await indexRes.json();

    let allQuestions = [];

    for (let file of indexData.files) {
        const res = await fetch(`/exams/${type}/${file}`);
        const data = await res.json();
        allQuestions = allQuestions.concat(data.questions);
    }

    miniExamDataPool = allQuestions;
}


/* =========================================
 START EXAM
========================================= */

async function startMiniExam() {

    miniExamResults = [];

    const type = document.getElementById("miniType").value;
    const count = parseInt(document.getElementById("miniCount").value);

    await loadMiniExamData(type);

    miniExamQuestions = miniExamDataPool
        .sort(() => 0.5 - Math.random())
        .slice(0, count);

    miniCurrent = 0;
    miniScore = 0;

    document.getElementById("miniStartBox").classList.add("hidden");
    document.getElementById("miniResultBox").classList.add("hidden");
    document.getElementById("miniGameBox").classList.remove("hidden");

    renderMiniQuestion();
}


/* =========================================
 RENDER QUESTION
========================================= */

function renderMiniQuestion() {

    const q = miniExamQuestions[miniCurrent];

    document.getElementById("miniQnum").innerText =
        `${miniCurrent + 1} / ${miniExamQuestions.length}`;

    document.getElementById("miniScore").innerText = miniScore;

    const questionEl = document.getElementById("miniQuestion");

    // If question has a paragraf array → render sentences line by line
    if (q.paragraf && Array.isArray(q.paragraf)) {
        questionEl.innerHTML = q.paragraf.map(sentence =>
            `<div class="py-1 border-b border-slate-100 last:border-0 leading-relaxed">${sentence}</div>`
        ).join("");
    } else {
        questionEl.innerText = q.question;
    }

    const optionsBox = document.getElementById("miniOptions");
    optionsBox.innerHTML = "";

    Object.keys(q.options).forEach(key => {

        const btn = document.createElement("button");
        btn.className = `
p-3 rounded-xl text-left font-medium transition
bg-slate-100 
text-slate-900 
hover:bg-red-50 hover:border-red-200 hover:text-red-800
border border-slate-300 
`;
        btn.innerText = key + ") " + q.options[key];

        btn.onclick = () => checkMiniAnswer(key, q);

        optionsBox.appendChild(btn);
    });
}


/* =========================================
 CHECK ANSWER
========================================= */

function checkMiniAnswer(selected, questionObj) {

    const correct = questionObj.correct;
    const buttons = document.querySelectorAll("#miniOptions button");

    buttons.forEach(btn => {
        btn.disabled = true;

        if (btn.innerText.startsWith(correct + ")")) {
            btn.classList.add(
                "bg-green-600", "text-black", "border-green-600"
            );
        }
        else if (btn.innerText.startsWith(selected + ")")) {
            btn.classList.add(
                "bg-red-600", "text-black", "border-red-600"
            );
        }
    });

    const isCorrect = selected === correct;

    if (isCorrect) {
        miniScore++;
    }

    // RESULT ARRAY'E EKLE
    miniExamResults.push({
        question: questionObj.question,
        selectedKey: selected,
        selectedText: questionObj.options[selected],
        correctKey: correct,
        correctText: questionObj.options[correct],
        isCorrect: isCorrect
    });

    setTimeout(() => {

        miniCurrent++;

        if (miniCurrent < miniExamQuestions.length) {
            renderMiniQuestion();
        } else {
            showMiniResult();
        }

    }, 800);
}


/* =========================================
 RESULT SCREEN (FULL REVIEW)
========================================= */

function showMiniResult() {

    document.getElementById("miniGameBox").classList.add("hidden");
    const resultBox = document.getElementById("miniResultBox");

    let html = `
 <div class="text-center">
 <h3 class="text-xl font-bold mb-6">
 Final Score: ${miniScore} / ${miniExamQuestions.length}
 </h3>
 </div>
 <div class="space-y-4">
 `;

    miniExamResults.forEach((r, index) => {

        html += `
 <div class="p-5 rounded-xl
 bg-white 
 border border-slate-200 ">
 <div class="font-semibold mb-2">
 ${index + 1}) ${r.question}
 </div>

 <div class="${r.isCorrect ? 'text-green-600 ' : 'text-red-600 '}">
 Your answer: ${r.selectedKey}) ${r.selectedText}
</div>

${!r.isCorrect ? `
 <div class="text-green-400 mt-1">
 Correct answer: ${r.correctKey}) ${r.correctText}
 </div>
` : ''}
 </div>
 `;
    });

    html += `
 </div>
 <div class="flex gap-4 justify-center mt-8">

 <button onclick="startMiniExam()" 
 class="px-5 py-2 bg-red-800 text-white rounded hover:bg-black transition-colors font-semibold">
 🔁 Try Again
 </button>

 <button onclick="resetMiniExam()" 
 class="px-5 py-2 bg-gray-100 rounded hover:bg-slate-600">
 ⬅ Back to Test Selection
 </button>

</div>
 `;

    resultBox.innerHTML = html;
    resultBox.classList.remove("hidden");
}


function resetMiniExam() {

    miniExamQuestions = [];
    miniExamResults = [];
    miniCurrent = 0;
    miniScore = 0;

    document.getElementById("miniGameBox").classList.add("hidden");
    document.getElementById("miniResultBox").classList.add("hidden");
    document.getElementById("miniStartBox").classList.remove("hidden");
}