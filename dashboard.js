/* =========================================
   YDS Dashboard v3.0 CLEAN
   Quiz Card + Word of the Day + Notes + Clock
   Firestore Integrated
   ========================================= */

const DASH_UNSPLASH_KEY = "0uDnN1Zl1YFXRG3vHAKgEZoTakXkCg65RV3LtgXiNcM";

/* =========================================
   DASHBOARD HTML
   ========================================= */

const dashboardHTML = `
<div class="space-y-10">

<h2 class="text-2xl font-bold text-purple-500">
📊 Dashboard
</h2>

<!-- QUIZ CARD -->
<div class="bg-gradient-to-r from-purple-600 to-fuchsia-600 
p-6 rounded-2xl shadow-xl text-white">

<div class="flex items-center justify-between flex-wrap gap-4">

<div>
<h3 class="text-xl font-bold">🔥 Ultimate Mix Quiz</h3>
<p class="text-sm opacity-80 mt-1">
Test your grammar reflex instantly.
</p>
</div>

<button onclick="openQuiz()"
class="bg-white text-purple-700 px-6 py-2 rounded-xl font-bold 
hover:scale-105 transition">
Start Now
</button>

</div>
</div>

<!-- CLOCK -->
<div class="bg-white dark:bg-slate-900
       text-slate-900 dark:text-slate-100
       border border-slate-200 dark:border-slate-700
       rounded-2xl p-6 shadow-sm">
<div class="flex items-center justify-between">
<div>
<div id="dashDate" class="text-lg font-semibold"></div>
<div id="dashTime" class="text-sm text-slate-400"></div>
</div>
<button onclick="speakDateTime()" 
class="text-xl text-blue-400 hover:scale-110 transition">
<i class="fa fa-volume-up"></i>
</button>
</div>
</div>

<!-- WORD OF THE DAY -->
<div class="bg-white dark:bg-slate-900
       text-slate-900 dark:text-slate-100
       border border-slate-200 dark:border-slate-700
       rounded-2xl p-6 shadow-sm">
<h3 class="font-bold text-lg mb-3">🌟 Word of the Day</h3>
<div id="wordOfDayContainer">Loading...</div>
</div>

<!-- SAVED WORDS -->
<div class="bg-white dark:bg-slate-900
       text-slate-900 dark:text-slate-100
       border border-slate-200 dark:border-slate-700
       rounded-2xl p-6 shadow-sm">
<h3 class="font-bold text-lg mb-3">📚 Saved Words</h3>
<div id="dashSavedWords" class="space-y-2 text-sm"></div>
</div>

<!-- NOTES -->
<div class="bg-white dark:bg-slate-900
       text-slate-900 dark:text-slate-100
       border border-slate-200 dark:border-slate-700
       rounded-2xl p-6 shadow-sm">
<h3 class="font-bold text-lg mb-3">📝 My Notes</h3>
<div id="dashNotes" class="space-y-2 text-xs"></div>
</div>

</div>
`;

/* =========================================
   INIT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("tab-dashboard");
    if (container) {
        container.innerHTML = dashboardHTML;
        initClock();
        loadWordOfDay();
        renderSavedWords();
        renderNotesDashboard();
    }
});

/* =========================================
   CLOCK
   ========================================= */

function initClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {

    const now = new Date();

    const dateStr = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const timeStr = now.toLocaleTimeString("en-US");

    const dateEl = document.getElementById("dashDate");
    const timeEl = document.getElementById("dashTime");

    if (dateEl) dateEl.innerText = dateStr;
    if (timeEl) timeEl.innerText = timeStr;
}

function speakDateTime() {

    const dateText = document.getElementById("dashDate")?.innerText || "";
    const timeText = document.getElementById("dashTime")?.innerText || "";

    const utter = new SpeechSynthesisUtterance(dateText + " " + timeText);
    utter.lang = "en-US";
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
}

/* =========================================
   WORD OF THE DAY
   ========================================= */

async function loadWordOfDay() {

    const academicWords = [
        "analyze","approach","benefit","concept","derive",
        "establish","impact","maintain","occur","require",
        "significant","structure","theory","valid","vary"
    ];

    const today = new Date();
    const index = today.getDate() % academicWords.length;
    const word = academicWords[index];

    try {

        const dictRes = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        const dictData = await dictRes.json();

        const definition =
            dictData[0]?.meanings[0]?.definitions[0]?.definition || "";

        let tr = "";
        try {
            const trRes = await fetch(
                `https://api.mymemory.translated.net/get?q=${word}&langpair=en|tr`
            );
            const trData = await trRes.json();
            tr = trData.responseData?.translatedText || "";
        } catch {}

        let imageURL = "";
        try {
            const imgRes = await fetch(
                `https://api.unsplash.com/search/photos?query=${word}&per_page=1`,
                {
                    headers: {
                        Authorization: `Client-ID ${DASH_UNSPLASH_KEY}`
                    }
                }
            );
            const imgData = await imgRes.json();
            imageURL = imgData.results?.[0]?.urls?.small || "";
        } catch {}

        const container = document.getElementById("wordOfDayContainer");
        if (!container) return;

        container.innerHTML = `
        <div class="flex gap-4 items-start">

        ${imageURL ? `
        <img src="${imageURL}" 
        class="w-24 h-24 rounded-lg object-cover shadow-md">
        ` : ""}

        <div class="flex-1">

        <div class="flex items-center gap-2">
        <div class="text-2xl font-bold text-blue-400 
        cursor-pointer hover:underline"
        onclick="switchTab('dictionary'); 
        setTimeout(()=>searchDictionaryWord('${word}'),200)">
        ${word}
        </div>

        <button onclick="speakWord('${word}')" 
        class="text-lg text-blue-300 hover:scale-110 transition">
        🔊
        </button>
        </div>

        <div class="mt-2 text-sm text-slate-300">
        ${definition}
        </div>

        ${tr ? `
        <div class="mt-2 text-xs text-green-400">
        TR: ${tr}
        </div>
        ` : ""}

        </div>
        </div>
        `;

    } catch {
        const container = document.getElementById("wordOfDayContainer");
        if (container) container.innerText = "Unable to load word.";
    }
}

/* =========================================
   SAVED WORDS (FIRESTORE)
   ========================================= */

async function renderSavedWords(){

    const words = await getSavedWordsFirestore();
    const container = document.getElementById("dashSavedWords");

    if(!container) return;

    if(words.length === 0){
        container.innerHTML = "<p class='text-slate-400'>No saved words yet.</p>";
        return;
    }

    container.innerHTML = "";

    words.slice(0,10).forEach(item=>{
        container.innerHTML += `
        <div class="cursor-pointer text-blue-400 hover:underline"
        onclick="switchTab('dictionary'); 
        setTimeout(()=>searchDictionaryWord('${item.word}'),200)">
        ${item.word}
        </div>
        `;
    });
}

/* =========================================
   NOTES (FIRESTORE SAFE VERSION)
========================================= */

async function renderNotesDashboard(){

    if(!window.currentUser) return;

    const container = document.getElementById("dashNotes");
    if(!container) return;

    try {

        const notes = await getNotesFirestore();

        container.innerHTML = "";

        if(!notes || notes.length === 0){
            container.innerHTML =
                "<p class='text-slate-400 text-sm'>No notes yet.</p>";
            return;
        }

        notes.sort((a,b) =>
            new Date(b.createdAt?.seconds * 1000 || b.createdAt) -
            new Date(a.createdAt?.seconds * 1000 || a.createdAt)
        );

        notes.slice(0,5).forEach(note => {

            const div = document.createElement("div");
            div.className =
                "bg-slate-800 p-3 rounded text-sm text-white space-y-2";

            div.innerHTML = `
                <div class="note-text break-words">${note.text}</div>

                <div class="flex gap-3 text-xs">
                    <button class="edit text-yellow-400 hover:text-yellow-600">
                        Edit
                    </button>
                    <button class="delete text-red-400 hover:text-red-600">
                        Delete
                    </button>
                </div>
            `;

            // DELETE
            div.querySelector(".delete").onclick = async () => {

                if(!confirm("Delete this note?")) return;

                await deleteNoteFirestore(note.id);
                renderNotesDashboard();
            };

            // EDIT
            div.querySelector(".edit").onclick = async () => {

                const newText = prompt("Edit note:", note.text);

                if(!newText || newText.trim() === "") return;

                await updateNoteFirestore(note.id, newText.trim());
                renderNotesDashboard();
            };

            container.appendChild(div);
        });

    } catch(error){
        console.error("Dashboard notes error:", error);
    }
}