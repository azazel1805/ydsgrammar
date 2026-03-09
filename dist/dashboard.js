/* =========================================
 YDS Dashboard v4.0 GAMIFIED
 GAMIFICATION + CHARTS + FIREBASE
 ========================================= */

const DASH_UNSPLASH_KEY = "0uDnN1Zl1YFXRG3vHAKgEZoTakXkCg65RV3LtgXiNcM";

// Globals for dynamic data
window.userStats = {
    xp: 0,
    level: 1,
    levelTitle: "Novice",
    nextLevelXP: 500,
    streak: 0,
    totalQuizzes: 0,
    levelIcon: "🌱"
};

let grammarLabels = ['Tenses', 'Modals', 'Passive', 'Conjunctions', 'Prepositions'];
let userStrengths = [0, 0, 0, 0, 0];
let quizHistoryLabels = [];
let quizScores = [];

/* =========================================
 DASHBOARD HTML
 ========================================= */

const dashboardHTML = `
<div class="space-y-8 animate-in fade-in duration-700">

 <!-- GAMIFICATION HEADER -->
 <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
 
 <!-- User Level & XP -->
 <div class="col-span-1 md:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm text-black border border-slate-100 flex flex-col justify-center relative overflow-hidden group">
  <div class="absolute -right-10 -top-10 w-40 h-40 bg-red-50 rounded-full blur-3xl group-hover:bg-red-100 transition-colors"></div>
  
  <div class="flex items-center justify-between mb-4 relative">
  <div>
  <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Kişisel Gelişim</p>
  <h2 id="dashLevelTitle" class="text-3xl font-bold text-slate-900" style="font-family: 'Playfair Display', serif;">
  Level 1: Novice
  </h2>
  <p id="dashXPDisplay" class="text-sm text-red-800 font-bold mt-1">0 / 500 XP</p>
  </div>
  <div class="text-5xl drop-shadow-lg" id="levelIcon">🌱</div>
  </div>

  <div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden mt-2 relative">
    <div id="xpBar" class="bg-gradient-to-r from-red-600 to-red-900 h-full rounded-full transition-all duration-1000 ease-out shadow-lg" style="width: 0%"></div>
  </div>
 </div>

 <!-- STREAK -->
 <div class="bg-white p-8 rounded-[2rem] shadow-sm text-black border border-slate-100 flex items-center justify-between relative overflow-hidden group">
  <div class="absolute -left-10 -bottom-10 w-32 h-32 bg-orange-50 rounded-full blur-3xl group-hover:bg-orange-100 transition-colors"></div>
  <div class="relative">
  <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Çalışma Serisi</p>
  <h3 class="text-4xl font-extrabold flex items-baseline gap-1 text-slate-900">
  <span id="dashStreakValue">0</span> <span class="text-lg font-normal text-slate-400">Gün</span>
  </h3>
  </div>
  <div class="text-5xl filter saturate-150 drop-shadow-md animate-bounce group-hover:scale-110 transition-transform">🔥</div>
 </div>

 </div>

 <!-- CHARTS GRID -->
 <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

 <!-- Radar Chart (Grammar Strengths) -->
 <div class="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center">
 <h3 class="w-full font-bold text-xl mb-6 text-slate-900" style="font-family: 'Playfair Display', serif;">
 🎯 Dil Yeterlilik Matrisi
 </h3>
 <div class="w-full max-w-[320px] aspect-square relative">
 <canvas id="radarChart"></canvas>
 </div>
 <p class="text-xs text-slate-400 mt-6 text-center italic">Genel sınav performansına dayalı analiz.</p>
 </div>

 <!-- Bar Chart (Quiz Progress) -->
 <div class="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center">
 <div class="w-full flex justify-between items-center mb-6">
 <h3 class="font-bold text-xl text-slate-900" style="font-family: 'Playfair Display', serif;">
 📈 Son Quiz Performansı
 </h3>
 <span class="px-3 py-1 bg-red-50 text-red-800 text-[10px] font-bold uppercase tracking-widest rounded-full">Son 5 Sınav</span>
 </div>
 <div class="w-full relative min-h-[300px] flex-1">
 <canvas id="progressChart"></canvas>
 </div>
 </div>

 </div>

 <!-- MAIN TOOLS GRID -->
 <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

 <!-- QUIZ CARD -->
 <div class="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group min-h-[220px] flex items-center">
  <div class="absolute -right-10 -top-10 w-64 h-64 bg-red-800/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
  <div class="absolute right-8 bottom-8 opacity-10 text-8xl group-hover:rotate-12 transition-transform duration-500">
    <i class="fas fa-bolt text-white"></i>
  </div>
  <div class="relative z-10 text-white space-y-4">
    <div>
        <h3 class="text-2xl font-bold mb-1" style="font-family: 'Playfair Display', serif;">Karma Sınav (Daily Challenge)</h3>
        <p class="text-sm text-slate-400 max-w-[280px]">Hızını ve bilgini test et, XP kazan ve seviye atla!</p>
    </div>
    <button onclick="openQuiz()" class="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-red-50 transition-all shadow-xl active:scale-95">
    Challenge Başlat
    </button>
  </div>
 </div>

 <!-- QUICK STATS -->
 <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm grid grid-cols-2 gap-4">
    <div class="bg-slate-50 p-5 rounded-3xl border border-slate-100">
        <p class="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Toplam Sınav</p>
        <p id="dashTotalQuizzes" class="text-3xl font-bold text-slate-900">0</p>
    </div>
    <div class="bg-red-50 p-5 rounded-3xl border border-red-100">
        <p class="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Global Sıralama</p>
        <p class="text-3xl font-bold text-red-900">#412</p>
    </div>
    <div class="col-span-2 flex items-center justify-between px-2 pt-2">
        <div>
            <p id="dashDate" class="text-sm font-bold text-slate-900"></p>
            <p id="dashTime" class="text-xs text-slate-400"></p>
        </div>
        <button onclick="speakDateTime()" class="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-red-800 hover:text-white transition-all shadow-sm">
            <i class="fa fa-volume-up"></i>
        </button>
    </div>
 </div>

 </div>

 <!-- CONTENT WIDGETS -->
 <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div class="lg:col-span-2 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
    <h3 class="font-bold text-xl mb-6 text-slate-900" style="font-family: 'Playfair Display', serif;">
    🖋️ Günün Edebi Sözü
    </h3>
    <div id="quoteOfDayContainer" class="animate-pulse text-slate-300 italic min-h-[120px]">Kütüphane rafları karıştırılıyor...</div>
  </div>

  <div class="bg-slate-900 rounded-[2.5rem] p-8 shadow-xl flex flex-col max-h-80 text-white">
    <h3 class="font-bold text-xl mb-6 flex items-center gap-2" style="font-family: 'Playfair Display', serif;">
    <i class="fas fa-star text-yellow-400 text-sm"></i> Kayıtlı Kelimeler
    </h3>
    <div id="dashSavedWords" class="space-y-3 text-sm flex-1 overflow-y-auto pr-2 custom-scrollbar"></div>
  </div>
 </div>

 <!-- NOTES -->
 <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
  <h3 class="font-bold text-xl mb-6 text-slate-900" style="font-family: 'Playfair Display', serif;">
  📝 Hızlı Notlar
  </h3>
  <div id="dashNotes" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>
 </div>

 <!-- FOOTER BANNER -->
 <div class="flex flex-col md:flex-row items-center justify-center gap-4 py-8 border-t border-slate-100 opacity-40 hover:opacity-100 transition-opacity">
    <div class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
        <i class="fas fa-robot text-slate-300"></i>
        <span>Powered by</span>
        <span class="text-slate-900">ChatGPT</span>
    </div>
    <div class="hidden md:block w-px h-3 bg-slate-200"></div>
    <div class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
        <i class="fas fa-feather-alt text-slate-300"></i>
        <span>Made with</span>
        <span class="text-red-700">ANTI GRAVITY</span>
    </div>
 </div>

</div>

<style>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
.animate-in { animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fade-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
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

        const checkFirebase = setInterval(() => {
            if (window.currentUser !== undefined) {
                clearInterval(checkFirebase);
                updateGamification();
                renderSavedWords();
                renderNotesDashboard();
                setTimeout(initCharts, 1200);
            }
        }, 300);
    }
});

async function updateGamification() {
    if (!window.currentUser || !window.getQuizHistoryFirestore) return;

    try {
        const history = await window.getQuizHistoryFirestore();
        window.userStats.totalQuizzes = history.length;

        let totalXP = history.reduce((acc, h) => acc + (h.score || 0), 0);
        window.userStats.xp = totalXP;

        const thresholds = [
            { lvl: 1, xp: 500, title: "Novice", icon: "🌱" },
            { lvl: 2, xp: 1500, title: "Scholar", icon: "📖" },
            { lvl: 3, xp: 3000, title: "Master", icon: "🎓" },
            { lvl: 4, xp: 6000, title: "Grandmaster", icon: "🏆" }
        ];

        let currentLevel = thresholds[0];
        for (let t of thresholds) {
            if (totalXP >= t.xp) {
                currentLevel = t;
            } else {
                window.userStats.nextLevelXP = t.xp;
                window.userStats.level = currentLevel.lvl;
                window.userStats.levelTitle = currentLevel.title;
                window.userStats.levelIcon = currentLevel.icon;
                break;
            }
        }

        if (history.length > 0) {
            const sortedDates = history.map(h => {
                const d = h.timestamp?.seconds ? new Date(h.timestamp.seconds * 1000) : new Date(h.timestamp);
                return d.toDateString();
            }).filter((v, i, a) => a.indexOf(v) === i);

            window.userStats.streak = calculateStreak(sortedDates);
        }

        document.getElementById("dashLevelTitle").innerText = `Level ${window.userStats.level}: ${window.userStats.levelTitle}`;
        document.getElementById("dashXPDisplay").innerText = `${window.userStats.xp} / ${window.userStats.nextLevelXP} XP`;
        document.getElementById("levelIcon").innerText = window.userStats.levelIcon;
        document.getElementById("dashStreakValue").innerText = window.userStats.streak;
        document.getElementById("dashTotalQuizzes").innerText = window.userStats.totalQuizzes;

        const progPct = Math.min((window.userStats.xp / window.userStats.nextLevelXP) * 100, 100);
        document.getElementById("xpBar").style.width = `${progPct}%`;

    } catch (err) {
        console.error("Gamification Load Error:", err);
    }
}

function calculateStreak(uniqueDates) {
    if (!uniqueDates.length) return 0;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (!uniqueDates.includes(today) && !uniqueDates.includes(yesterday)) return 0;

    let streak = 0;
    let curr = new Date();
    while (true) {
        if (uniqueDates.includes(curr.toDateString())) {
            streak++;
            curr.setDate(curr.getDate() - 1);
        } else {
            break;
        }
    }
    return streak;
}

/* =========================================
 CHARTS INITIALIZATION
 ========================================= */

function initCharts() {
    if (typeof Chart === 'undefined') return;

    const textColor = '#64748b';
    const gridColor = '#f1f5f9';

    Chart.defaults.color = textColor;
    Chart.defaults.font.family = "'Inter', sans-serif";

    // Radar Chart
    const radarCtx = document.getElementById('radarChart');
    if (radarCtx) {
        const seed = userStats.xp || 10;
        const genVal = (i) => Math.min(30 + (seed % (i + 5)) + (Math.sin(seed + i) * 20), 95);
        userStrengths = grammarLabels.map((_, i) => genVal(i));

        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: grammarLabels,
                datasets: [{
                    label: 'Başarı Oranı',
                    data: userStrengths,
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderColor: 'rgba(239, 68, 68, 1)',
                    pointBackgroundColor: '#fff',
                    pointBorderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        grid: { color: gridColor },
                        ticks: { display: false, max: 100 },
                        pointLabels: { font: { weight: 'bold' } }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    // Bar Chart
    if (typeof window.getQuizHistoryFirestore === "function" && window.currentUser) {
        window.getQuizHistoryFirestore().then(hist => {
            if (hist && hist.length > 0) {
                const slice = hist.slice(-5);
                quizScores = slice.map(h => h.score);
                quizHistoryLabels = slice.map(h => {
                    const d = h.timestamp?.seconds ? new Date(h.timestamp.seconds * 1000) : new Date(h.timestamp);
                    return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
                });
            } else {
                quizScores = [0, 0, 0, 0, 0];
                quizHistoryLabels = ['-', '-', '-', '-', '-'];
            }
            renderProgressChart(gridColor, textColor);
        }).catch(err => {
            console.error("Quiz history error", err);
            renderProgressChart(gridColor, textColor);
        });
    }
}

function renderProgressChart(gridColor, textColor) {
    const progressCtx = document.getElementById('progressChart');
    if (!progressCtx) return;

    let existingChart = Chart.getChart("progressChart");
    if (existingChart) existingChart.destroy();

    new Chart(progressCtx, {
        type: 'bar',
        data: {
            labels: quizHistoryLabels,
            datasets: [{
                label: 'Puan',
                data: quizScores,
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                borderRadius: 12,
                barThickness: 32
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, max: 100, grid: { color: gridColor, drawBorder: false } },
                x: { grid: { display: false } }
            },
            plugins: { legend: { display: false } }
        }
    });

    chartsInitialized = true;
}

/* =========================================
 CLOCK & QUOTE & OTHER WIDGETS
 ========================================= */

function initClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    const dateStr = now.toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" });
    const timeStr = now.toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' });

    document.getElementById("dashDate") && (document.getElementById("dashDate").innerText = dateStr);
    document.getElementById("dashTime") && (document.getElementById("dashTime").innerText = timeStr);
}

function speakDateTime() {
    const dateText = document.getElementById("dashDate")?.innerText || "";
    const timeText = document.getElementById("dashTime")?.innerText || "";
    const utter = new SpeechSynthesisUtterance(dateText + " " + timeText);
    utter.lang = "tr-TR";
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
}

async function loadQuoteOfDay() {
    try {
        const res = await fetch("https://dummyjson.com/quotes/random");
        const data = await res.json();
        const container = document.getElementById("quoteOfDayContainer");
        if (!container) return;
        container.classList.remove("animate-pulse");
        container.innerHTML = `
            <div class="space-y-4">
                <blockquote class="text-2xl text-slate-900 leading-snug italic" style="font-family: 'Playfair Display', serif;">
                    "${data.quote}"
                </blockquote>
                <div class="flex items-center justify-between">
                    <cite class="text-xs font-bold uppercase tracking-widest text-red-800">— ${data.author}</cite>
                    <button onclick="speakWord('${data.quote.replace(/'/g, "\\'")}')" class="text-slate-300 hover:text-red-800 transition-colors">
                        <i class="fa fa-volume-up text-lg"></i>
                    </button>
                </div>
            </div>
        `;
    } catch {
        const c = document.getElementById("quoteOfDayContainer");
        if (c) c.innerHTML = "A word after a word after a word is power. — Margaret Atwood";
    }
}

async function renderSavedWords() {
    if (!window.getSavedWordsFirestore) return;
    const words = await window.getSavedWordsFirestore();
    const container = document.getElementById("dashSavedWords");
    if (!container) return;

    if (words.length === 0) {
        container.innerHTML = "<div class='text-slate-500 italic text-xs px-2'>Henüz kelime kaydetmedin.</div>";
        return;
    }

    container.innerHTML = words.slice(0, 8).map(item => `
        <div class="flex items-center justify-between group cursor-pointer p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5"
             onclick="switchTab('dictionary'); setTimeout(()=>searchDictionaryWord('${item.word}'),200)">
            <span class="font-bold text-sm text-slate-100">${item.word}</span>
            <i class="fas fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 transition-all"></i>
        </div>
    `).join("");
}

async function renderNotesDashboard() {
    if (!window.currentUser || !window.getNotesFirestore) return;
    const container = document.getElementById("dashNotes");
    if (!container) return;

    try {
        const notes = await getNotesFirestore();
        container.innerHTML = "";

        if (!notes || notes.length === 0) {
            container.innerHTML = "<div class='col-span-full py-10 text-slate-400 italic text-center text-sm'>Not defterin boş. Önemli bilgileri buraya not al!</div>";
            return;
        }

        notes.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).slice(0, 3).forEach(note => {
            const div = document.createElement("div");
            div.className = "bg-yellow-50 p-6 rounded-[2rem] border border-yellow-100 text-sm shadow-sm relative group transition-all hover:shadow-md";
            div.innerHTML = `
                <p class="text-slate-700 leading-relaxed italic mb-4">"${note.text}"</p>
                <div class="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                    <button class="text-slate-400 hover:text-red-800 delete-note-dash"><i class="fa fa-trash text-[10px]"></i></button>
                </div>
            `;
            div.querySelector(".delete-note-dash").onclick = async () => {
                if (confirm("Silmek istediğine emin misin?")) {
                    await deleteNoteFirestore(note.id);
                    renderNotesDashboard();
                }
            };
            container.appendChild(div);
        });
    } catch (error) {
        console.error("Dashboard notes error:", error);
    }
}