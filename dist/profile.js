/* =========================================
 PROFILE TAB - LOGIN AWARE CLEAN FINAL
========================================= */

const profileHTML = `
<div class="bg-white p-6 rounded-xl shadow space-y-8">

<h2 class="text-2xl font-bold text-red-800 ">
My Profile
</h2>
<div class="mt-6">
 <input id="analyzerCodeInput"
 type="password"
 placeholder="Enter AI access code"
 class="p-2 bg-gray-50 text-black rounded">

 <button onclick="checkAnalyzerAccess(
 document.getElementById('analyzerCodeInput').value
 )"
 class="px-3 py-1 bg-purple-600 text-black rounded">
 Unlock
 </button>
</div>

<!-- USER INFO -->
<div id="userInfoBox"
class="bg-slate-100 p-4 rounded-lg text-sm">
Loading user...
</div>

<!-- SAVED WORDS -->
<div>
<h3 class="font-bold mb-3">Saved Words</h3>
<div id="profileNotebookList" class="space-y-2 text-sm"></div>
</div>

<!-- NOTES -->
<div>
<h3 class="font-bold mb-3">My Notes</h3>

<textarea id="noteInput"
class="w-full h-24 p-3 rounded-lg border
border-slate-300 
bg-slate-50 text-sm"
placeholder="Write your note..."></textarea>

<button onclick="addNoteFromProfile()"
class="mt-3 bg-green-600 text-black py-2 px-4 rounded">
Add Note
</button>

<div id="notesList" class="mt-4 space-y-3"></div>
</div>

<!-- LOGOUT -->
<div id="logoutSection"
class="pt-4 border-t border-gray-200 hidden">
<button onclick="logoutUser()"
class="bg-red-600 text-black px-4 py-2 rounded">
Logout
</button>
</div>

</div>
`;

/* =========================================
 RENDER PROFILE TAB
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("tab-profile");
    if (!container) return;

    container.innerHTML = profileHTML;

    observeAuthForProfile();
});

/* =========================================
 AUTH OBSERVER
========================================= */

function observeAuthForProfile() {

    const interval = setInterval(() => {

        if (typeof window.currentUser !== "undefined") {

            clearInterval(interval);
            renderProfile();

        }

    }, 200);
}

/* =========================================
 MAIN RENDER
========================================= */

async function renderProfile() {

    const userBox = document.getElementById("userInfoBox");
    const logoutSection = document.getElementById("logoutSection");

    if (!userBox || !logoutSection) return;

    if (!window.currentUser) {

        userBox.innerHTML = "<span class='text-gray-500'>Not logged in.</span>";
        logoutSection.classList.add("hidden");
        return;
    }

    userBox.innerHTML = `
 <div class="text-sm">
 <strong>Email:</strong> ${window.currentUser.email}
 </div>
 `;

    logoutSection.classList.remove("hidden");

    await renderSavedWords();
    await renderNotesDashboard();

}

/* =========================================
 SAVED WORDS
========================================= */

async function renderSavedWords() {

    const container = document.getElementById("profileNotebookList");
    if (!container) return;

    try {

        const words = await getSavedWordsFirestore();

        container.innerHTML = "";

        if (!words || words.length === 0) {
            container.innerHTML =
                "<p class='text-sm text-gray-500'>No saved words yet.</p>";
            return;
        }

        words.forEach(item => {

            const div = document.createElement("div");
            div.className =
                "flex justify-between items-center bg-slate-200 p-2 rounded mb-2 text-sm";

            div.innerHTML = `
 <span class="cursor-pointer text-black hover:underline">
 ${item.word}
 </span>

 <button class="text-red-500 text-xs hover:text-red-700">
 Delete
 </button>
 `;

            // Dictionary jump
            div.querySelector("span").onclick = () => {
                switchTab('dictionary');
                setTimeout(() => searchDictionaryWord(item.word), 200);
            };

            // Delete word
            div.querySelector("button").onclick = async () => {

                if (!confirm("Delete this word?")) return;

                await deleteWordFirestore(item.id);
                renderSavedWords();
            };

            container.appendChild(div);
        });

    } catch (error) {
        console.error("Saved words render error:", error);
    }
}

/* =========================================
 SAVED WORDS
========================================= */

async function renderSavedWords() {

    const container = document.getElementById("profileNotebookList");
    if (!container) return;

    try {

        const words = await getSavedWordsFirestore();

        container.innerHTML = "";

        if (!words || words.length === 0) {
            container.innerHTML =
                "<p class='text-sm text-gray-500'>No saved words yet.</p>";
            return;
        }

        words.forEach(item => {

            const div = document.createElement("div");
            div.className =
                "flex justify-between items-center bg-slate-200 p-2 rounded mb-2 text-sm";

            div.innerHTML = `
 <span class="cursor-pointer text-black hover:underline">
 ${item.word}
 </span>

 <button class="text-red-500 text-xs hover:text-red-700">
 Delete
 </button>
 `;

            // Dictionary jump
            div.querySelector("span").onclick = () => {
                switchTab('dictionary');
                setTimeout(() => searchDictionaryWord(item.word), 200);
            };

            // Delete word
            div.querySelector("button").onclick = async () => {

                if (!confirm("Delete this word?")) return;

                await deleteWordFirestore(item.id);
                renderSavedWords();
            };

            container.appendChild(div);
        });

    } catch (error) {
        console.error("Saved words render error:", error);
    }
}
/* =========================================
 ADD NOTE
========================================= */

window.addNoteFromProfile = async function () {

    const input = document.getElementById("noteInput");
    if (!input) return;

    const text = input.value.trim();
    if (!text) return;

    try {

        await saveNoteFirestore(text);

        input.value = "";
        await renderNotes();


    } catch (error) {
        console.error("Add note error:", error);
    }
};

/* =========================================
 DARK MODE
========================================= */

window.toggleDarkMode = function () {

    const html = document.documentElement;

    if (html.classList.contains("dark")) {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
    } else {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }
};


// 🔥 AUTH CHANGE RE-RENDER
window.forceProfileRender = function () {
    renderProfile();
};

function unlockAnalyzerUI() {

    document.getElementById("analyzerNavBtn")?.classList.remove("hidden");
    document.getElementById("analyzerMobileBtn")?.classList.remove("hidden");
    document.getElementById("tab-analyzer")?.classList.remove("hidden");

    document.getElementById("testlabNavBtn")?.classList.remove("hidden");
    document.getElementById("testlabMobileBtn")?.classList.remove("hidden");

    document.getElementById("linguisticlabNavBtn")?.classList.remove("hidden");
    document.getElementById("linguisticlabMobileBtn")?.classList.remove("hidden");

    document.getElementById("aiToolsLockedMsg")?.classList.add("hidden");
    document.getElementById("aiToolsLockedMobile")?.classList.add("hidden");

}

async function checkAnalyzerAccess(code) {

    if (!code) {
        alert("Enter code");
        return;
    }

    const res = await fetch("/api/verifyAccess", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
    });

    if (res.ok) {
        localStorage.setItem("analyzer_access", "true");
        unlockAnalyzerUI();
        alert("AI unlocked 🔓");
    } else {
        alert("Wrong code ❌");
    }
}
document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("analyzer_access") === "true") {
        unlockAnalyzerUI();
    }

});