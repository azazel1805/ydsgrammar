/* =========================================
 YDS Dashboard v4.0 GAMIFIED
 GAMIFICATION + CHARTS + FIREBASE
========================================= */

const DASH_UNSPLASH_KEY = "0uDnN1Zl1YFXRG3vHAKgEZoTakXkCg65RV3LtgXiNcM";

// Mock Data for Charts
const grammarLabels = ['Tenses', 'Modals', 'Passive', 'Conjunctions', 'Prepositions'];
const userStrengths = [80, 45, 90, 60, 75, 50, 65]; // Out of 100

// We will populate these dynamically from Firebase logic
let quizHistoryLabels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];
let quizScores = [0, 0, 0, 0, 0]; // Out of 100

/* =========================================
 DASHBOARD HTML
========================================= */

const dashboardHTML = `
<div class="space-y-8">

 <!-- GAMIFICATION HEADER -->
 <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
 
 <!-- User Level & XP -->
 <div class="col-span-1 md:col-span-2 bg-white p-6 rounded-2xl shadow-sm text-black border border-gray-200 flex flex-col justify-center">
 
 <div class="flex items-center justify-between mb-2">
 <div>
 <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-red-900" style="font-family: 'Playfair Display', serif;">
 Level 4: Scholar
 </h2>
 <p class="text-xs text-gray-500 mt-1">1,250 / 2,000 XP</p>
 </div>
 <div class="text-4xl">🎓</div>
 </div>

 <div class="w-full bg-gray-100 h-3 rounded-full overflow-hidden mt-3">
 <div class="bg-gradient-to-r from-red-600 to-red-800 h-full rounded-full transition-all duration-1000 ease-out" style="width: 62%"></div>
 </div>

 </div>

 <!-- STREAK -->
 <div class="bg-white p-6 rounded-2xl shadow-sm text-black flex items-center justify-between border border-gray-200">
 <div>
 <p class="text-sm font-semibold opacity-90 uppercase tracking-wider mb-1">Current Streak</p>
 <h3 class="text-4xl font-extrabold flex items-baseline gap-1">
 7 <span class="text-lg font-normal opacity-80">Days</span>
 </h3>
 </div>
 <div class="text-5xl opacity-80 animate-pulse">🔥</div>
 </div>

 </div>

 <!-- CHARTS GRID -->
 <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

 <!-- Radar Chart (Grammar Strengths) -->
 <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center">
 <h3 class="w-full font-bold text-lg mb-4 text-red-800" style="font-family: 'Playfair Display', serif;">
 🎯 Grammar Proficiency Matrix
 </h3>
 <div class="w-full max-w-[300px] aspect-square relative">
 <canvas id="radarChart"></canvas>
 </div>
 <p class="text-xs text-gray-500 mt-4 text-center">Analyze your strong and weak grammatical structures.</p>
 </div>

 <!-- Bar/Line Chart (Quiz Progress) -->
 <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center">
 <div class="w-full flex justify-between items-center mb-4">
 <h3 class="font-bold text-lg text-red-800" style="font-family: 'Playfair Display', serif;">
 📈 Recent Quiz Performance
 </h3>
 <span class="badge-nuance text-[10px] uppercase">Last 5 Quizzes</span>
 </div>
 <div class="w-full relative min-h-[250px] flex-1">
 <canvas id="progressChart"></canvas>
 </div>
 </div>

 </div>

 <!-- MAIN TOOLS GRID -->
 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

 <!-- QUIZ CARD -->
 <div class="bg-gradient-to-r from-red-800 to-red-900 p-6 rounded-2xl shadow-lg relative overflow-hidden group">
 <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
 <div class="relative z-10 text-white">
 <h3 class="text-xl font-bold mb-2 flex items-center gap-2" style="font-family: 'Playfair Display', serif;">
 ⚡ Ultimate Mix Quiz
 </h3>
 <p class="text-sm opacity-90 mb-6">Test your grammar reflex instantly covering all topics.</p>
 <button onclick="openQuiz()" class="bg-white text-red-900 px-6 py-2 rounded-xl font-bold hover:scale-105 transition-transform shadow-md">
 Start Challenge
 </button>
 </div>
 </div>

 <!-- CLOCK -->
 <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
 <div>
 <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Local Time</p>
 <div id="dashDate" class="text-lg font-bold text-slate-800 mb-1"></div>
 <div id="dashTime" class="text-sm text-slate-500 font-medium"></div>
 </div>
 <button onclick="speakDateTime()" class="w-12 h-12 rounded-full bg-slate-100 text-blue-500 flex items-center justify-center hover:scale-110 transition-transform hover:bg-blue-50 ">
 <i class="fa fa-volume-up text-xl"></i>
 </button>
 </div>

 </div>

 <!-- CONTENT WIDGETS -->
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

 <!-- LITERARY QUOTE OF THE DAY -->
 <div class="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
 <h3 class="font-bold text-lg mb-4 flex items-center gap-2 text-red-800" style="font-family: 'Playfair Display', serif;">
 🖋️ Daily Literary Quote
 </h3>
 <div id="quoteOfDayContainer" class="animate-pulse text-gray-400 italic">Consulting the archives...</div>
 </div>

 <!-- SAVED WORDS -->
 <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col max-h-80">
 <h3 class="font-bold text-lg mb-4 flex items-center gap-2 text-slate-800 ">
 📚 Saved Words
 </h3>
 <div id="dashSavedWords" class="space-y-3 text-sm flex-1 overflow-y-auto pr-2 custom-scrollbar"></div>
 </div>

 </div>

 <!-- NOTES -->
 <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
 <h3 class="font-bold text-lg mb-4 flex items-center gap-2 text-slate-800 ">
 📝 Quick Notes
 </h3>
 <div id="dashNotes" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>
 </div>

</div>

<style>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; }
</style>
`;

/* =========================================
 INIT
========================================= */

let chartsInitialized = false;

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("tab-dashboard");
    if (container) {
        container.innerHTML = dashboardHTML;
        initClock();
        loadQuoteOfDay();
        renderSavedWords();
        renderNotesDashboard();
    }
});

// Using an observer or waiting for the tab to become active to initialize charts robustly
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.id === 'tab-dashboard' && mutation.target.classList.contains('active')) {
            if (!chartsInitialized) {
                setTimeout(initCharts, 100);
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const dashTab = document.getElementById('tab-dashboard');
    if (dashTab) {
        observer.observe(dashTab, { attributes: true, attributeFilter: ['class'] });
        if (dashTab.classList.contains('active')) {
            setTimeout(initCharts, 300);
        }
    }
});


/* =========================================
 CHARTS INITIALIZATION
========================================= */

function initCharts() {
    if (typeof Chart === 'undefined') {
        console.warn("Chart.js not loaded.");
        return;
    }

    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#9ca3af' : '#475569';
    const gridColor = isDark ? '#334155' : '#e2e8f0';

    Chart.defaults.color = textColor;
    Chart.defaults.font.family = "'Inter', sans-serif";

    // 1. Radar Chart Setup
    const radarCtx = document.getElementById('radarChart');
    if (radarCtx) {
        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: grammarLabels,
                datasets: [{
                    label: 'Proficiency (%)',
                    data: userStrengths,
                    backgroundColor: 'rgba(168, 85, 247, 0.4)', // Purple-500 with opacity
                    borderColor: 'rgba(168, 85, 247, 1)',
                    pointBackgroundColor: '#fff',
                    pointBorderColor: 'rgba(168, 85, 247, 1)',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(168, 85, 247, 1)',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: gridColor },
                        grid: { color: gridColor },
                        pointLabels: {
                            font: { size: 11, weight: 'bold' },
                            color: textColor
                        },
                        ticks: { display: false, min: 0, max: 100 }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: isDark ? '#1e293b' : '#fff',
                        titleColor: isDark ? '#f8fafc' : '#0f172a',
                        bodyColor: isDark ? '#e2e8f0' : '#334155',
                        borderColor: gridColor,
                        borderWidth: 1,
                        padding: 10,
                        displayColors: false,
                        callbacks: {
                            label: function (context) {
                                return context.raw + '% Success';
                            }
                        }
                    }
                }
            }
        });
    }

    // 3. Simple gamification update (Placeholder logic for Stats grid)
    // Attempt to load Real Firebase gamification data first
    if (typeof window.getQuizHistoryFirestore === "function" && window.currentUser) {
        window.getQuizHistoryFirestore().then(hist => {
            if (hist && hist.length > 0) {
                // Get up to last 5
                const slice = hist.slice(-5);
                quizScores = slice.map(h => h.score);
                quizHistoryLabels = slice.map((_, i) => `Quiz ${i + 1}`);
            }
            renderProgressChart(gridColor, textColor, isDark);
        }).catch(err => {
            console.error("Failed to load quiz history", err);
            renderProgressChart(gridColor, textColor, isDark);
        });
    } else {
        // Fallback to mock/zeros if not logged in
        renderProgressChart(gridColor, textColor, isDark);
    }
}

function renderProgressChart(gridColor, textColor, isDark) {
    // 2. Bar Chart Setup
    const progressCtx = document.getElementById('progressChart');
    if (!progressCtx) return;

    // Destroy existing instance if it exists to allow re-render
    let existingChart = Chart.getChart("progressChart");
    if (existingChart) {
        existingChart.destroy();
    }

    new Chart(progressCtx, {
        type: 'bar',
        data: {
            labels: quizHistoryLabels,
            datasets: [{
                label: 'Score',
                data: quizScores,
                backgroundColor: 'rgba(16, 185, 129, 0.8)', // Emerald-500
                borderRadius: 6,
                borderWidth: 0,
                barThickness: 24
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: gridColor, drawBorder: false },
                    border: { display: false },
                    ticks: { stepSize: 20 }
                },
                x: {
                    grid: { display: false },
                    border: { display: false }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: isDark ? '#1e293b' : '#fff',
                    titleColor: isDark ? '#f8fafc' : '#0f172a',
                    bodyColor: isDark ? '#e2e8f0' : '#334155',
                    borderColor: gridColor,
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            return context.raw + ' pts';
                        }
                    }
                }
            }
        }
    });

    chartsInitialized = true;
}


/* =========================================
 CLOCK
========================================= */

function initClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    const timeStr = now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    document.getElementById("dashDate") && (document.getElementById("dashDate").innerText = dateStr);
    document.getElementById("dashTime") && (document.getElementById("dashTime").innerText = timeStr);
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
/* =========================================
 DAILY LITERARY QUOTE
========================================= */

async function loadQuoteOfDay() {
    try {
        // Using DummyJSON quotes API as a reliable alternative to Quotable
        const res = await fetch("https://dummyjson.com/quotes/random");
        const data = await res.json();

        const quote = data.quote || "To be or not to be, that is the question.";
        const author = data.author || "William Shakespeare";

        const container = document.getElementById("quoteOfDayContainer");
        if (!container) return;

        container.classList.remove("animate-pulse");

        container.innerHTML = `
 <div class="flex flex-col h-full justify-center px-4 md:px-8 py-2">
 <blockquote class="text-2xl md:text-3xl text-black leading-snug mb-4" style="font-family: 'Playfair Display', serif; font-style: italic;">
 "${quote}"
 </blockquote>
 <div class="flex items-center justify-between mt-auto">
 <cite class="text-sm md:text-base text-red-800 font-bold tracking-widest uppercase">
 — ${author}
 </cite>
 <button onclick="speakWord('${quote.replace(/'/g, "\\'")}')" class="text-gray-400 hover:text-red-800 transition-colors" title="Listen to Quote">
 <i class="fa fa-volume-up text-xl"></i>
 </button>
 </div>
 </div>
 `;
    } catch {
        const container = document.getElementById("quoteOfDayContainer");
        if (container) {
            container.classList.remove("animate-pulse");
            container.innerHTML = `
            <div class="flex flex-col h-full justify-center px-4 md:px-8 py-2">
            <blockquote class="text-2xl md:text-3xl text-black leading-snug mb-4" style="font-family: 'Playfair Display', serif; font-style: italic;">
            "A word after a word after a word is power."
            </blockquote>
            <cite class="text-sm md:text-base text-red-800 font-bold tracking-widest uppercase">
            — Margaret Atwood (Fallback)
            </cite>
            </div>`;
        }
    }
}

/* =========================================
 SAVED WORDS 
========================================= */

async function renderSavedWords() {
    const words = await getSavedWordsFirestore();
    const container = document.getElementById("dashSavedWords");
    if (!container) return;

    if (words.length === 0) {
        container.innerHTML = "<div class='text-gray-500 italic flex items-center gap-2'><i class='fa fa-info-circle'></i> No saved words yet.</div>";
        return;
    }

    container.innerHTML = "";
    words.slice(0, 12).forEach(item => {
        container.innerHTML += `
 <div class="flex items-center justify-between group cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 "
 onclick="switchTab('dictionary'); setTimeout(()=>searchDictionaryWord('${item.word}'),200)">
 <span class="font-medium text-slate-700 group-hover:text-black transition-colors">${item.word}</span>
 <span class="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">View ➔</span>
 </div>
 `;
    });
}

/* =========================================
 NOTES 
========================================= */

async function renderNotesDashboard() {
    if (!window.currentUser) return;
    const container = document.getElementById("dashNotes");
    if (!container) return;

    try {
        const notes = await getNotesFirestore();
        container.innerHTML = "";

        if (!notes || notes.length === 0) {
            container.innerHTML = "<div class='col-span-1 sm:col-span-2 md:col-span-3 text-gray-500 italic p-4 text-center border-2 border-dashed border-slate-200 rounded-xl'>No notes created yet. Keep your thoughts here.</div>";
            return;
        }

        notes.sort((a, b) => new Date(b.createdAt?.seconds * 1000 || b.createdAt) - new Date(a.createdAt?.seconds * 1000 || a.createdAt));

        notes.slice(0, 6).forEach(note => {
            const div = document.createElement("div");
            div.className = "bg-yellow-50 border border-yellow-200 p-4 rounded-xl text-sm flex flex-col justify-between shadow-sm relative group overflow-hidden";
            div.innerHTML = `
 <div class="absolute top-0 left-0 w-1 h-full bg-yellow-400"></div>
 <div class="note-text break-words text-slate-700 font-medium mb-4 pl-2 leading-relaxed">${note.text}</div>
 <div class="flex gap-4 text-xs font-bold justify-end opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
 <button class="edit text-gray-500 hover:text-blue-500 transition-colors"><i class="fa fa-pen"></i></button>
 <button class="delete text-gray-500 hover:text-red-500 transition-colors"><i class="fa fa-trash"></i></button>
 </div>
 `;

            // DELETE
            div.querySelector(".delete").onclick = async (e) => {
                e.stopPropagation();
                if (!confirm("Delete this note?")) return;
                await deleteNoteFirestore(note.id);
                renderNotesDashboard();
            };

            // EDIT
            div.querySelector(".edit").onclick = async (e) => {
                e.stopPropagation();
                const newText = prompt("Edit note:", note.text);
                if (!newText || newText.trim() === "") return;
                await updateNoteFirestore(note.id, newText.trim());
                renderNotesDashboard();
            };

            container.appendChild(div);
        });
    } catch (error) {
        console.error("Dashboard notes error:", error);
    }
}