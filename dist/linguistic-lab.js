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
Dilbilim Laboratuvarı
</h1>

<p class="text-xs italic text-slate-500 mt-1">
Dilin mimarisinin çözüldüğü yer.
</p>

<nav class="mt-6 space-y-3 text-sm">

<button onclick="switchLabTab('word')" class="lab-tab w-full text-left ${tabClass("word")}">
Kelime Zekası
</button>

<button onclick="switchLabTab('sentence')" class="lab-tab w-full text-left ${tabClass("sentence")}">
Cümle Mimarisi
</button>

<button onclick="switchLabTab('paragraph')" class="lab-tab w-full text-left ${tabClass("paragraph")}">
Söylem Yapısı
</button>

</nav>

</aside>

<main class="flex-1 p-8 notranslate">
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

<h2 class="font-serif text-3xl text-slate-900">Kelime Zekası</h2>

<div class="flex gap-4">

<input id="labWordInput"
placeholder="Bir kelime girin..."
class="flex-1 px-4 py-3 border border-slate-300 rounded-lg">

<button onclick="analyzeWord()"
class="px-6 py-3 bg-red-800 text-white rounded-lg">
Analiz Et
</button>

</div>

<div id="labWordOutput" class="grid md:grid-cols-2 xl:grid-cols-3 gap-6" translate="no"></div>

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
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mode: "word",
                input: word
            })
        });

        const text = await res.text();

        if (!res.ok) {
            output.innerHTML = `<div class="text-red-500">Server error</div>`;
            return;
        }

        let data;

        try {
            data = JSON.parse(text);
        } catch {
            output.innerHTML = `<pre>${text}</pre>`;
            return;
        }

        output.innerHTML = `
${labCard("Morfoloji", data.morphology)}
${labCard("Anlamsal Evrim", data.semantic_evolution)}
${labCard("Akademik Register", data.register)}
${labListCard("Eşdizimler (Collocations)", data.collocations)}
${labListCard("Türetmeler", data.derivations)}
${labCard("Edilgen (Passive) Eğilimi", data.passive_tendency)}
${labCard("YDS Tuzak Analizi", data.yds_trap)}
${labCard("CEFR Seviyesi", data.cefr)}
${labCard("Türkçe Açıklama", data.turkish_explanation)}
`;

    } catch (err) {

        console.error(err);
        output.innerHTML = `<div class="text-red-500">Server error</div>`;

    }

}

function labCard(title, content) {

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

function labListCard(title, list) {

    if (!Array.isArray(list)) list = [];

    return `
<div class="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">

<h3 class="font-serif text-lg text-slate-900">${title}</h3>

<div class="h-[2px] w-10 bg-red-800 my-3"></div>

<ul class="list-disc ml-5 space-y-1 text-slate-700">
${list.map(i => `<li>${i}</li>`).join("")}
</ul>

</div>
`;
}

// ==========================================
// SENTENCE ARCHITECTURE
// ==========================================

function renderSentenceModule() {
    return `
<div class="space-y-8">
    <h2 class="font-serif text-3xl text-slate-900">Cümle Mimarisi</h2>
    <div class="flex flex-col gap-4">
        <textarea id="labSentenceInput" 
            placeholder="Analiz edilecek İngilizce cümleyi girin..."
            class="w-full px-4 py-3 border border-slate-300 rounded-lg min-h-[100px]"></textarea>
        <button onclick="analyzeSentenceLab()"
            class="px-6 py-3 bg-red-800 text-white rounded-lg self-end">
            Analiz Et
        </button>
    </div>
    <div id="labSentenceOutput" class="grid md:grid-cols-2 xl:grid-cols-3 gap-6" translate="no"></div>
</div>
`;
}

async function analyzeSentenceLab() {
    const input = document.getElementById("labSentenceInput").value.trim();
    if (!input) return;

    const output = document.getElementById("labSentenceOutput");
    output.innerHTML = "Analiz ediliyor...";

    try {
        const res = await fetch("/.netlify/functions/linguistic-lab", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mode: "sentence", input })
        });

        const text = await res.text();
        if (!res.ok) {
            output.innerHTML = `<div class="text-red-500">Sunucu hatası</div>`;
            return;
        }

        const data = JSON.parse(text);
        output.innerHTML = `
            ${labCard("Yan Cümle Yapısı", data.clause_structure)}
            ${labCard("Fiil Analizi", data.verb_analysis)}
            ${labCard("Zaman ve Çatı", data.tense_voice)}
            ${labCard("Karmaşıklık Seviyesi", data.complexity_level)}
            ${labCard("Akademik Yoğunluk", data.academic_density)}
            ${labCard("Sınav Tuzakları", data.exam_traps)}
            ${labCard("Anlamdaşlık Zorluğu", data.paraphrase_difficulty)}
            ${labCard("Türkçe Açıklama", data.turkish_explanation)}
        `;
    } catch (err) {
        console.error(err);
        output.innerHTML = `<div class="text-red-500">Sunucu hatası</div>`;
    }
}

// ==========================================
// DISCOURSE STRUCTURE
// ==========================================

function renderParagraphModule() {
    return `
<div class="space-y-8">
    <h2 class="font-serif text-3xl text-slate-900">Söylem Yapısı</h2>
    <div class="flex flex-col gap-4">
        <textarea id="labParaInput" 
            placeholder="Analiz edilecek İngilizce paragrafı girin..."
            class="w-full px-4 py-3 border border-slate-300 rounded-lg min-h-[150px]"></textarea>
        <button onclick="analyzeParagraphLab()"
            class="px-6 py-3 bg-red-800 text-white rounded-lg self-end">
            Analiz Et
        </button>
    </div>
    <div id="labParaOutput" class="grid md:grid-cols-2 xl:grid-cols-3 gap-6" translate="no"></div>
</div>
`;
}

async function analyzeParagraphLab() {
    const input = document.getElementById("labParaInput").value.trim();
    if (!input) return;

    const output = document.getElementById("labParaOutput");
    output.innerHTML = "Analiz ediliyor...";

    try {
        const res = await fetch("/.netlify/functions/linguistic-lab", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mode: "paragraph", input })
        });

        const text = await res.text();
        if (!res.ok) {
            output.innerHTML = `<div class="text-red-500">Sunucu hatası</div>`;
            return;
        }

        const data = JSON.parse(text);
        output.innerHTML = `
            ${labCard("Ana Fikir Cümlesi", data.topic_sentence)}
            ${labCard("Mantıksal İlerleme", data.logical_progression)}
            ${labCard("Bağlaçlar", data.connectors)}
            ${labCard("Argüman Stili", data.argument_style)}
            ${labCard("Anlamsal Bağlantılar", data.cohesion_devices)}
            ${labCard("Akademik Ton", data.academic_tone)}
            ${labCard("Sınav Öngörüsü", data.exam_prediction)}
            ${labCard("Anlamdaşlık Seviyesi", data.paraphrase_level)}
            ${labCard("Türkçe Meta Bilgi", data.turkish_meta)}
        `;
    } catch (err) {
        console.error(err);
        output.innerHTML = `<div class="text-red-500">Sunucu hatası</div>`;
    }
}

