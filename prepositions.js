/* =========================================
   YDS PREPOSITION ENGINE v5.0
   Tab System + Modal Quiz
   ========================================= */

const prepositionsHTML = `
<div class="space-y-8">

<!-- ===================================== -->
<!-- YDS PREPOSITION TACTICAL PANEL -->
<!-- ===================================== -->

<div class="bg-gradient-to-br from-red-600 via-orange-600 to-pink-600 text-white p-6 rounded-2xl shadow-xl">

    <div class="flex justify-between items-center cursor-pointer"
         onclick="togglePrepTactics()">

        <h3 class="text-xl font-bold">
            🧠 YDS Preposition Tactical Panel
        </h3>

        <span id="prepTacticToggleIcon">▼</span>
    </div>

    <div id="prepTacticContent" class="mt-5 space-y-6 hidden text-sm">

        <!-- 1️⃣ 5 SECOND RULE -->
        <div class="bg-white/10 p-4 rounded-xl">
            <h4 class="font-bold text-yellow-300 mb-2">
                ⏳ 5-Second Rule
            </h4>
            <ul class="space-y-1">
                <li>• İlk 5 saniyede verb / noun / adjective türünü belirle</li>
                <li>• Pattern ezberini hızlıca kontrol et</li>
                <li>• Emin değilsen semantic eleme yap</li>
                <li>• 5 saniyede net değilse şıkları ele</li>
            </ul>
        </div>

        <!-- 2️⃣ İlk Bakılacak Noktalar -->
        <div class="bg-white/10 p-4 rounded-xl">
            <h4 class="font-bold text-yellow-300 mb-2">
                🔎 Soruda İlk Bakılacak Noktalar
            </h4>
            <ul class="space-y-1">
                <li>• Verb + Prep mi? (depend, result, insist)</li>
                <li>• Noun + Prep mi? (increase, reason, solution)</li>
                <li>• Adjective + Prep mi? (aware, responsible, similar)</li>
                <li>• Cause–Effect mi? → in / from kontrol et</li>
            </ul>
        </div>

        <!-- 3️⃣ Risk Bar -->
        <div class="bg-white/10 p-4 rounded-xl">
            <h4 class="font-bold text-yellow-300 mb-3">
                ⚠ Risk Intensity Scale
            </h4>

            <div class="space-y-2">

                <div>
                    VERY HIGH
                    <div class="w-full bg-gray-300 h-2 rounded">
                        <div class="bg-red-500 h-2 rounded w-[95%]"></div>
                    </div>
                </div>

                <div>
                    HIGH
                    <div class="w-full bg-gray-300 h-2 rounded">
                        <div class="bg-orange-500 h-2 rounded w-[70%]"></div>
                    </div>
                </div>

                <div>
                    MEDIUM
                    <div class="w-full bg-gray-300 h-2 rounded">
                        <div class="bg-yellow-400 h-2 rounded w-[40%]"></div>
                    </div>
                </div>

            </div>
        </div>

        <!-- 4️⃣ Mini Trap Matrix -->
        <div class="bg-white/10 p-4 rounded-xl">
            <h4 class="font-bold text-yellow-300 mb-3">
                🔥 Mini Trap Matrix
            </h4>

            <div class="grid grid-cols-2 gap-2 text-xs">

                <div class="bg-red-500/30 p-2 rounded">
                    depend ❌ from
                </div>

                <div class="bg-green-500/30 p-2 rounded">
                    depend ✅ on
                </div>

                <div class="bg-red-500/30 p-2 rounded">
                    increase ❌ of
                </div>

                <div class="bg-green-500/30 p-2 rounded">
                    increase ✅ in
                </div>

                <div class="bg-red-500/30 p-2 rounded">
                    married ❌ with
                </div>

                <div class="bg-green-500/30 p-2 rounded">
                    married ✅ to
                </div>

            </div>
        </div>

        <!-- 5️⃣ Probability Strength -->
        <div class="bg-white/10 p-4 rounded-xl">
            <h4 class="font-bold text-yellow-300 mb-3">
                📊 Probability Strength Table
            </h4>

            <div class="space-y-2 text-xs">

                <div class="flex justify-between">
                    <span>depend on</span>
                    <span class="text-red-300 font-bold">%95</span>
                </div>

                <div class="flex justify-between">
                    <span>increase in</span>
                    <span class="text-red-300 font-bold">%90</span>
                </div>

                <div class="flex justify-between">
                    <span>responsible for</span>
                    <span class="text-orange-300 font-bold">%80</span>
                </div>

                <div class="flex justify-between">
                    <span>similar to</span>
                    <span class="text-orange-300 font-bold">%75</span>
                </div>

            </div>
        </div>

        <!-- Final Strategy -->
        <div class="text-center text-yellow-200 font-semibold">
            🎯 Strateji: Önce yanlışları ele → Son kalan doğru olur.
        </div>

    </div>
</div>

<!-- HEADER -->
<div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
    <h2 class="text-2xl font-bold">YDS Preposition Intelligence Engine</h2>
    <p class="text-sm opacity-90">Verb • Adjective • Noun • Phrase Patterns</p>
</div>

<!-- QUIZ BUTTON (TOP) -->
<div class="text-right">
    <button onclick="openPrepQuiz()" 
        class="px-5 py-2 bg-emerald-600 text-white rounded-lg font-bold shadow hover:scale-105 transition">
        🎯 Start Preposition Quiz
    </button>
</div>

<!-- CATEGORY TABS -->
<div class="flex gap-3 flex-wrap border-b pb-3">
    <button onclick="switchPrepTab('verbs')" class="prep-tab active-tab">Verb + Prep</button>
    <button onclick="switchPrepTab('adjectives')" class="prep-tab">Adjective + Prep</button>
    <button onclick="switchPrepTab('nouns')" class="prep-tab">Noun + Prep</button>
    <button onclick="switchPrepTab('phrases')" class="prep-tab">Phrases</button>
</div>

<!-- CONTENT -->
<div id="prep-verbs"></div>
<div id="prep-adjectives" class="hidden"></div>
<div id="prep-nouns" class="hidden"></div>
<div id="prep-phrases" class="hidden"></div>

</div>

<!-- QUIZ MODAL -->
<div id="prepQuizModal" class="fixed inset-0 bg-black/80 hidden items-center justify-center z-[200]">
    <div class="bg-white dark:bg-slate-900 p-8 rounded-xl w-full max-w-xl shadow-2xl relative">
        <button onclick="closePrepQuiz()" class="absolute top-4 right-4 text-red-500 text-xl">✖</button>
        <h3 class="text-xl font-bold mb-4">Preposition Quiz</h3>
        <div id="prepQuizContainer"></div>
    </div>
</div>
`;

/* ================= INIT ================= */



/* ================= TAB SWITCH ================= */

function switchPrepTab(tab) {

    document.querySelectorAll("#prep-verbs,#prep-adjectives,#prep-nouns,#prep-phrases")
        .forEach(el => el.classList.add("hidden"));

    document.getElementById("prep-" + tab).classList.remove("hidden");

    document.querySelectorAll(".prep-tab").forEach(btn => btn.classList.remove("active-tab"));
    event.target.classList.add("active-tab");
}

/* ================= RENDER ================= */

function renderPrepCategory(category) {

    if(!PREP_DATA[category]) return;

    const container = document.getElementById("prep-" + category);
    if(!container) return;

    container.innerHTML = PREP_DATA[category].map((item, index) => {

        const riskColor =
            item.risk === "very-high" ? "text-red-500" :
            item.risk === "high" ? "text-orange-500" :
            "text-yellow-500";

        const trapHTML = item.trap && item.trap.length
            ? `<div class="text-red-400 text-sm mt-2">
                 ⚠ Trap: ${item.trap.join(", ")}
               </div>` : "";

        return `
        <div class="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg mb-4 shadow">

            <div class="flex justify-between items-center">
                <div class="font-bold text-lg">
                    ${item.pattern}
                </div>
                <div class="${riskColor} font-bold text-sm">
                    ${item.risk.toUpperCase()}
                </div>
            </div>

            <div class="text-sm text-slate-400 mt-1">
                Meaning: ${item.turkish || "-"}
            </div>

            <div class="text-sm text-slate-400">
                Type: ${item.type}
            </div>

            <div class="italic text-slate-300 mt-2 text-sm">
                Example: ${item.example || "-"}
            </div>

            <div class="text-yellow-400 text-sm mt-1">
                Pattern: ${item.patternNote || "-"}
            </div>

            ${trapHTML}

        </div>
        `;
    }).join("");
}

function togglePrepTactics(){
    document.getElementById("prepTacticContent")
        .classList.toggle("hidden");

    const icon = document.getElementById("prepTacticToggleIcon");
    icon.innerText = icon.innerText === "▼" ? "▲" : "▼";
}

/* ================= QUIZ SYSTEM ================= */

let prepQuizSet = [];
let prepCurrent = 0;
let prepScore = 0;

function openPrepQuiz() {
    document.getElementById("prepQuizModal").classList.remove("hidden");
    document.getElementById("prepQuizModal").classList.add("flex");
    startPrepQuiz();
}

function closePrepQuiz() {
    document.getElementById("prepQuizModal").classList.add("hidden");
    document.getElementById("prepQuizModal").classList.remove("flex");
}

function startPrepQuiz() {

    const allItems = [
        ...PREP_DATA.verbs,
        ...PREP_DATA.adjectives,
        ...PREP_DATA.nouns
    ];

    prepQuizSet = allItems.sort(() => 0.5 - Math.random()).slice(0, 10);
    prepCurrent = 0;
    prepScore = 0;

    showPrepQuestion();
}

function showPrepQuestion() {

    const container = document.getElementById("prepQuizContainer");
    const q = prepQuizSet[prepCurrent];

    const wrongOptions = prepQuizSet
        .filter(i => i.prep !== q.prep)
        .sort(() => 0.5 - Math.random())
        .slice(0,3)
        .map(i => i.prep);

    const options = [...wrongOptions, q.prep].sort(() => 0.5 - Math.random());

    container.innerHTML = `
        <div class="mb-4 font-bold">
            ${q.word} ______ ?
        </div>

        <div class="grid grid-cols-2 gap-3">
            ${options.map(opt =>
                `<button onclick="checkPrepAnswer('${opt}','${q.prep}')"
                    class="p-3 bg-slate-200 dark:bg-slate-700 rounded hover:bg-blue-400 hover:text-white transition">
                    ${opt}
                </button>`
            ).join("")}
        </div>

        <div class="mt-4 text-sm text-slate-400">
            Question ${prepCurrent+1} / 10
        </div>
    `;
}

function checkPrepAnswer(selected, correct) {

    const buttons = document.querySelectorAll("#prepQuizContainer button");

    // Tüm butonları disable et
    buttons.forEach(btn => btn.disabled = true);

    buttons.forEach(btn => {

        if(btn.innerText === correct){
            // DOĞRUYU YEŞİL YAP
            btn.classList.remove("bg-slate-200","dark:bg-slate-700");
            btn.classList.add("bg-emerald-500","text-white");
        }

        if(btn.innerText === selected && selected !== correct){
            // YANLIŞ SEÇİMİ KIRMIZI YAP
            btn.classList.remove("bg-slate-200","dark:bg-slate-700");
            btn.classList.add("bg-red-500","text-white");
        }

    });

    if(selected === correct) prepScore++;

    // 1.2 saniye sonra devam
    setTimeout(() => {

        prepCurrent++;

        if(prepCurrent < prepQuizSet.length){
            showPrepQuestion();
        } else {

            document.getElementById("prepQuizContainer").innerHTML = `
                <div class="text-center">
                    <h4 class="text-xl font-bold mb-4">Quiz Finished</h4>
                    <div class="text-2xl text-indigo-500 font-bold">
                        Score: ${prepScore} / ${prepQuizSet.length}
                    </div>
                </div>
            `;
        }

    }, 1200);
}


/* ================= INIT ================= */

window.initPrepositions = function(){

    // Varsayılan kategori
    renderPrepCategory("verbs");

    // İstersen diğerlerini de preload edebilirsin:
    renderPrepCategory("adjectives");
    renderPrepCategory("nouns");
    renderPrepCategory("phrases");
};