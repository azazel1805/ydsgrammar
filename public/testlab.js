// ===============================
// 🧠 AI SENTENCE VISUALIZER
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    injectVisualizerHTML();
});

const testlabHTML = `
<div class="max-w-4xl mx-auto p-8 space-y-8">

 <h2 class="text-4xl font-bold text-center text-red-800 mb-2" style="font-family: 'Playfair Display', serif;">
 🧠 Cümle Yapısı Çözümleyici
 </h2>

 <div class="space-y-4">
 <textarea id="sentenceInput"
 class="w-full p-4 rounded-xl
 bg-white 
 text-slate-900 
 border border-slate-300 
 focus:outline-none focus:ring-2 focus:ring-red-800"
 rows="4"
 placeholder="İngilizce cümlenizi buraya yapıştırın..."></textarea>

 <button onclick="analyzeSentence()"
 class="px-6 py-3 bg-red-800 hover:bg-black
 text-white rounded-xl font-bold transition shadow-sm">
 Cümleyi Analiz Et
 </button>
 </div>

 <div id="visualizerOutput" class="space-y-8" translate="no"></div>

 </div>
 `;

function injectVisualizerHTML() {
    const container = document.getElementById("tab-testlab");
    if (!container) return;
    container.innerHTML = testlabHTML;
}

async function analyzeSentence() {

    const sentence = document.getElementById("sentenceInput").value.trim();
    if (!sentence) return;

    const output = document.getElementById("visualizerOutput");
    output.innerHTML = `<div class="text-amber-500">Analyzing...</div>`;

    try {

        const response = await fetch("/.netlify/functions/testlab", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mode: "syntax_analyze",
                sentence: sentence
            })
        });

        const data = await response.json();

        renderSentence(data);
        renderExplanations(data);

    } catch (err) {
        output.innerHTML =
            `<div class="text-red-500">Error: ${err.message}</div>`;
    }
}

function roleColor(role) {

    const colors = {
        subject: "text-blue-700 bg-blue-50",
        main_verb: "text-red-700 bg-red-50",
        auxiliary: "text-red-600 bg-red-100",
        object: "text-emerald-700 bg-emerald-50",
        complement: "text-teal-700 bg-teal-50",
        adverbial_phrase: "text-amber-700 bg-amber-50",
        prepositional_phrase: "text-cyan-700 bg-cyan-50",
        relative_clause: "text-violet-700 bg-violet-50",
        noun_clause: "text-purple-700 bg-purple-50",
        participle_phrase: "text-indigo-700 bg-indigo-50",
        conjunction: "text-slate-700 bg-slate-100"
    };

    return colors[role] || "text-slate-800 bg-slate-100";
}

function renderSentence(data) {

    const output = document.getElementById("visualizerOutput");

    let sentenceHTML = `<div class="p-6 rounded-2xl shadow-sm
 bg-white 
 border border-slate-200 
 text-slate-900 ">`;

    data.parts.forEach(part => {
        sentenceHTML += `
 <span class="px-2 py-1 rounded-md font-medium mr-1 ${roleColor(part.role)}">
 ${part.text}
 </span>
 `;
    });

    sentenceHTML += `</div>`;

    output.innerHTML = sentenceHTML;
}

function renderExplanations(data) {

    const output = document.getElementById("visualizerOutput");

    let explanationHTML = `
 <div class="p-6 bg-white 
 text-slate-900 
 border border-slate-200 rounded-2xl border border-slate-200 shadow-sm space-y-4">
 <h3 class="text-xl font-semibold text-slate-800">
 Öğe Açıklamaları
 </h3>
 `;

    data.explanations.forEach(exp => {
        explanationHTML += `
 <div class="p-4 rounded-xl border border-slate-200 bg-slate-50">
 <div class="font-semibold text-slate-800 capitalize">
 ${exp.role.replace("_", " ")}
 </div>
 <div class="mt-1 text-sm text-slate-600 italic">
 "${exp.text}"
 </div>
 <div class="mt-2 text-slate-700">
 ${exp.explanation}
 </div>
 </div>
 `;
    });

    explanationHTML += `
 <div class="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
 <div class="font-semibold text-purple-800">
 Gramer Notları
 </div>
 <div class="mt-2 text-purple-900">
 ${data.grammar_notes && data.grammar_notes.trim() !== ""
            ? data.grammar_notes
            : "Bu cümle standart bir beyan yapısına sahiptir. Ek gelişmiş gramer özelliği tespit edilmedi."}
 </div>
 </div>
 </div>
 `;

    output.innerHTML += explanationHTML;
}
