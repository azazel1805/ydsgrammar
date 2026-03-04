/* =========================================
   GLOBAL STATE
========================================= */

let savedWordSet = new Set();
let masterWords = [];
let filteredWords = [];
let currentPage = 1;
let wordCache = {};
const wordsPerPage = 50;


/* =========================================
   INIT
========================================= */

document.addEventListener("DOMContentLoaded", async () => {
    injectVocabularyHTML();
    await loadWords();
    setupEvents();

    // Auth hazır olunca saved words yükle
    const waitAuth = setInterval(async () => {
        if (window.currentUser) {
            clearInterval(waitAuth);
            await loadSavedWords();
            applyFilters();
        }
    }, 200);
});


/* =========================================
   HTML INJECTION
========================================= */

function injectVocabularyHTML() {

    const container = document.getElementById("tab-vocabulary");

    container.innerHTML = `
        <div class="max-w-6xl mx-auto mt-10 space-y-6">

            <div class="flex flex-wrap gap-3">

                <select id="oxfordFilter"
                    class="p-2 rounded-xl
                           bg-slate-100 dark:bg-slate-800
                           text-slate-900 dark:text-slate-100
                           border border-slate-300 dark:border-slate-600">
                    <option value="all">All</option>
                    <option value="3000">Oxford 3000</option>
                    <option value="5000">Oxford 5000</option>
                </select>

                <select id="cefrFilter"
                    class="p-2 rounded-xl
                           bg-slate-100 dark:bg-slate-800
                           text-slate-900 dark:text-slate-100
                           border border-slate-300 dark:border-slate-600">
                    <option value="all">All Levels</option>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                </select>

                <input 
                    type="text"
                    id="searchInput"
                    placeholder="Search word..."
                    class="p-2 rounded-xl flex-1
                           bg-slate-100 dark:bg-slate-800
                           text-slate-900 dark:text-slate-100
                           border border-slate-300 dark:border-slate-600"
                >
            </div>

            <div id="vocabContainer" class="space-y-4"></div>

            <div class="flex justify-center gap-4 mt-8">
                <button id="prevPage"
                    class="px-4 py-2 rounded-xl
                           bg-slate-200 dark:bg-slate-700
                           hover:bg-slate-300 dark:hover:bg-slate-600
                           text-slate-900 dark:text-slate-100">
                    Prev
                </button>

                <span id="pageInfo"
                      class="px-4 py-2 text-slate-700 dark:text-slate-300">
                </span>

                <button id="nextPage"
                    class="px-4 py-2 rounded-xl
                           bg-slate-200 dark:bg-slate-700
                           hover:bg-slate-300 dark:hover:bg-slate-600
                           text-slate-900 dark:text-slate-100">
                    Next
                </button>
            </div>

        </div>
    `;
}

/* =========================================
   LOAD WORDS
========================================= */

async function loadWords() {

    const res = await fetch("/data/oxford_master_5000.json");
    masterWords = await res.json();

    masterWords = masterWords.map(w => ({
        ...w,
        level: w.level ? w.level.trim().toUpperCase() : "",
        oxford: w.oxford ?? null
    }));

    applyFilters();
}


/* =========================================
   EVENTS
========================================= */

function setupEvents() {

    document.getElementById("oxfordFilter")
        .addEventListener("change", applyFilters);

    document.getElementById("cefrFilter")
        .addEventListener("change", applyFilters);

    document.getElementById("searchInput")
        .addEventListener("input", applyFilters);

    document.getElementById("prevPage")
        .addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                renderPage();
            }
        });

    document.getElementById("nextPage")
        .addEventListener("click", () => {
            const totalPages = Math.ceil(filteredWords.length / wordsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderPage();
            }
        });
}


/* =========================================
   FILTER
========================================= */

function applyFilters() {

    const oxfordVal = document.getElementById("oxfordFilter").value;
    const cefrVal = document.getElementById("cefrFilter").value;
    const searchVal = document.getElementById("searchInput").value.toLowerCase();

    filteredWords = masterWords.filter(word => {

        const matchOxford =
            oxfordVal === "all" ||
            String(word.oxford) === oxfordVal;

        const matchCEFR =
            cefrVal === "all" ||
            word.level === cefrVal;

        const matchSearch =
            word.word.toLowerCase().includes(searchVal);

        return matchOxford && matchCEFR && matchSearch;
    });

    currentPage = 1;
    renderPage();
}


/* =========================================
   RENDER
========================================= */

function renderPage() {

    const container = document.getElementById("vocabContainer");
    container.innerHTML = "";

    if (!filteredWords.length) {
        document.getElementById("pageInfo").textContent = "No results";
        return;
    }

    const start = (currentPage - 1) * wordsPerPage;
    const pageWords = filteredWords.slice(start, start + wordsPerPage);

    pageWords.forEach(word => {
        container.innerHTML += createCard(word);
    });

    const totalPages = Math.ceil(filteredWords.length / wordsPerPage);

    document.getElementById("pageInfo").textContent =
        `Page ${currentPage} / ${totalPages}`;
}


function createCard(word) {

    const isSaved = savedWordSet.has(word.word);

    return `
        <div class="group p-5 rounded-2xl shadow-sm transition
                    bg-white dark:bg-slate-900
                    border border-slate-200 dark:border-slate-700
                    hover:shadow-md">

            <div class="flex justify-between items-center">

                <h3 class="text-xl font-semibold cursor-pointer
                           text-slate-900 dark:text-slate-100"
                    onclick="toggleDetails('${word.word}', this.closest('.group'))">
                    ${word.word}
                </h3>

                <div class="flex items-center gap-3">

                    <span class="px-3 py-1 rounded-full text-xs font-semibold
                                 ${getCEFRColor(word.level)}">
                        ${word.level || "-"}
                    </span>

                    <button 
                        onclick="event.stopPropagation(); handleSave(this)"
                        data-word="${word.word}"
                        data-level="${word.level || ""}"
                        data-oxford="${word.oxford ?? ""}"
                        class="text-xl transition
                               ${isSaved 
                                 ? "text-yellow-500" 
                                 : "text-slate-400 dark:text-slate-500 hover:text-yellow-500"}">
                        ${isSaved ? "★" : "☆"}
                    </button>

                </div>
            </div>

            <p class="text-sm mt-1
                      text-slate-500 dark:text-slate-400">
                Oxford ${word.oxford ?? "-"}
            </p>

            <div class="details mt-5 hidden"></div>
        </div>
    `;
}

function getCEFRColor(level) {
    switch(level) {
        case "A1": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300";
        case "A2": return "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300";
        case "B1": return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
        case "B2": return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300";
        case "C1": return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
        default: return "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300";
    }
}

/* =========================================
   DETAILS (GLOBAL SAFE)
========================================= */

async function toggleDetails(word, element) {

    const detailsDiv = element.querySelector(".details");

    if (!detailsDiv.classList.contains("hidden")) {
        detailsDiv.classList.add("hidden");
        return;
    }

    detailsDiv.classList.remove("hidden");

    if (wordCache[word]) {
        detailsDiv.innerHTML = wordCache[word];
        return;
    }

    detailsDiv.innerHTML = "Loading...";

    try {

        /* ---------- Merriam Definition + Example ---------- */

        let definition = "—";
        let example = "—";

        try {
            const dictRes = await fetch(
                `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=20944355-777d-4aaa-b173-e2305b915f29`
            );

            const dictData = await dictRes.json();

            if (Array.isArray(dictData) && dictData[0]) {

                if (dictData[0].shortdef) {
                    definition = dictData[0].shortdef[0] || "—";
                }

                if (dictData[0].def) {
                    outer:
                    for (let sense of dictData[0].def) {
                        for (let seq of sense.sseq) {
                            const dtArray = seq[0][1].dt;
                            for (let item of dtArray) {
                                if (item[0] === "vis") {
                                    example = item[1][0].t
                                        .replace(/\{.*?\}/g, "");
                                    break outer;
                                }
                            }
                        }
                    }
                }
            }
        } catch {}

        /* ---------- Synonyms ---------- */

        let synonyms = "—";
        try {
            const synRes = await fetch(
                `https://api.datamuse.com/words?rel_syn=${word}&max=5`
            );
            const synData = await synRes.json();
            synonyms = synData.map(w => w.word).join(", ") || "—";
        } catch {}

        /* ---------- Antonyms ---------- */

        let antonyms = "—";
        try {
            const antRes = await fetch(
                `https://api.datamuse.com/words?rel_ant=${word}&max=5`
            );
            const antData = await antRes.json();
            antonyms = antData.map(w => w.word).join(", ") || "—";
        } catch {}

        /* ---------- Turkish ---------- */

        let turkish = "—";
        try {
            const trRes = await fetch(
                `https://api.mymemory.translated.net/get?q=${word}&langpair=en|tr`
            );
            const trData = await trRes.json();
            turkish = trData.responseData?.translatedText || "—";
        } catch {}

        /* ---------- Image ---------- */

        let imgUrl = "";
        try {
            const imgRes = await fetch(
                `https://api.unsplash.com/photos/random?query=${word}&client_id=0uDnN1Zl1YFXRG3vHAKgEZoTakXkCg65RV3LtgXiNcM`
            );
            const imgData = await imgRes.json();
            imgUrl = imgData.urls?.regular || "";
        } catch {}

        /* ---------- FINAL HTML ---------- */

        const html = `
            <div class="space-y-4 text-sm text-slate-800 dark:text-slate-200">

                ${imgUrl ? `
                    <img src="${imgUrl}" 
                         class="rounded w-full h-48 object-cover"
                         onerror="this.style.display='none'"/>
                ` : ""}

                <div>
                    <strong>Definition:</strong>
                    <p>${definition}</p>
                </div>

                <div>
                    <strong>Example:</strong>
                    <p>${example}</p>
                </div>

                <div>
                    <strong>Turkish:</strong>
                    <p>${turkish}</p>
                </div>

                <div>
                    <strong>Synonyms:</strong>
                    <p>${synonyms}</p>
                </div>

                <div>
                    <strong>Antonyms:</strong>
                    <p>${antonyms}</p>
                </div>

                <button 
                    onclick="event.stopPropagation(); speakWord('${word}')"
                    class="text-blue-500 hover:text-blue-700 dark:text-blue-400">
                    🔊
                </button>

            </div>
        `;

        detailsDiv.innerHTML = html;
        wordCache[word] = html;

    } catch (err) {
        detailsDiv.innerHTML = "Error loading data.";
    }
}

/* =========================================
   SPEECH (GLOBAL SAFE)
========================================= */

function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}


/* =========================================
   SAVE SYSTEM (FULL SAFE)
========================================= */

function handleSave(btn) {

    const word = btn.dataset.word ?? "";
    const level = btn.dataset.level || null;
    const oxford = btn.dataset.oxford || null;

    toggleSaveWord(word, level, oxford, btn);
}


async function toggleSaveWord(word, level, oxford, buttonEl) {

    if (!window.currentUser) {
        alert("Please login first.");
        return;
    }

    const { doc, setDoc, deleteDoc } = window.firebaseExports;

    const wordRef = doc(
        window.db,
        "users",
        window.currentUser.uid,
        "savedWords",
        word
    );

    try {

        if (savedWordSet.has(word)) {

            await deleteDoc(wordRef);
            savedWordSet.delete(word);

            buttonEl.textContent = "☆";
            buttonEl.classList.remove("text-yellow-400");
            buttonEl.classList.add("text-slate-400");

        } else {

            const data = {
                word: word || "",
                level: level || null,
                oxford: oxford ? Number(oxford) : null,
                source: "vocabulary",
                savedAt: new Date()
            };

            await setDoc(wordRef, data);

            savedWordSet.add(word);

            buttonEl.textContent = "★";
            buttonEl.classList.remove("text-slate-400");
            buttonEl.classList.add("text-yellow-400");
        }

    } catch (err) {
        console.error("Save toggle error:", err);
    }
}


async function loadSavedWords() {

    if (!window.currentUser) return;

    try {

        const snapshot = await window.firebaseExports.getDocs(
            window.firebaseExports.collection(
                window.db,
                "users",
                window.currentUser.uid,
                "savedWords"
            )
        );

        savedWordSet.clear();

        snapshot.forEach(doc => {
            savedWordSet.add(doc.id);
        });

    } catch (err) {
        console.error("Saved words load error:", err);
    }
}


/* =========================================
   GLOBAL EXPORTS (CRITICAL FIX)
========================================= */

window.toggleDetails = toggleDetails;
window.speakWord = speakWord;
window.handleSave = handleSave;