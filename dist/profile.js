/* =========================================
   PROFILE TAB - MODERN & LITERARY DESIGN
========================================= */

const profileHTML = `
<div class="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    
    <!-- Profile Header Card -->
    <div class="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-red-50 rounded-full blur-3xl group-hover:bg-red-100 transition-colors duration-500"></div>
        
        <div class="relative">
            <div class="w-32 h-32 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white text-5xl font-serif shadow-xl shadow-red-900/20" id="profileInitials">
                Y
            </div>
            <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100">
                <i class="fas fa-crown text-yellow-500 text-sm"></i>
            </div>
        </div>

        <div class="flex-1 text-center md:text-left space-y-2 relative">
            <h2 class="text-3xl font-bold text-slate-900" style="font-family: 'Playfair Display', serif;" id="profileEmailDisplay">Kütüphane Üyesi</h2>
            <div class="flex flex-wrap justify-center md:justify-start gap-3">
                <span class="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-widest border border-slate-200 shadow-sm">Seviye 4: Scholar</span>
                <span id="vipBadge" class="px-4 py-1.5 bg-red-900 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-red-900/20 hidden">VIP Access</span>
            </div>
            <p class="text-slate-400 text-sm italic mt-2">"Language is the dress of thought." — Samuel Johnson</p>
        </div>

        <button onclick="logoutUser()" class="px-6 py-3 border border-red-100 text-red-700 rounded-xl text-sm font-bold hover:bg-red-50 transition-all active:scale-95 group relative overflow-hidden">
            <span class="relative z-10">Oturumu Kapat</span>
        </button>
    </div>

    <!-- AI Unlock & Progress Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- AI VIP Unlock -->
        <div class="bg-slate-900 rounded-[2rem] p-8 text-white space-y-6 shadow-2xl relative overflow-hidden group">
            <div class="absolute right-0 top-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <i class="fas fa-brain text-[8rem]"></i>
            </div>
            
            <div class="relative">
                <h3 class="text-xl font-bold flex items-center gap-2" style="font-family: 'Playfair Display', serif;">
                    <i class="fas fa-bolt text-yellow-500"></i> AI VIP Özellikleri
                </h3>
                <p class="text-slate-400 text-sm leading-relaxed mt-2">
                    Linguistic Lab ve Soru Analiz aracı gibi yapay zeka destekli modüllere erişmek için kodunuzu girin.
                </p>
            </div>

            <div class="flex gap-2 relative">
                <input id="analyzerCodeInput" type="password" placeholder="Kodunuzu buraya yazın..." 
                    class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-800 transition-all">
                <button onclick="checkAnalyzerAccess(document.getElementById('analyzerCodeInput').value)"
                    class="px-6 py-3 bg-red-800 hover:bg-red-700 text-white rounded-xl font-bold transition-all active:scale-95">
                    Kilidi Aç
                </button>
            </div>
            
            <p class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">VIP erişiminiz yoksa destekle iletişime geçin.</p>
        </div>

        <!-- Learning Stats -->
        <div class="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 class="text-xl font-bold text-slate-900" style="font-family: 'Playfair Display', serif;">Öğrenme İstatistikleri</h3>
            
            <div class="space-y-4">
                <div class="space-y-2">
                    <div class="flex justify-between text-xs font-bold uppercase tracking-tighter text-slate-500">
                        <span>XP Progress</span>
                        <span>1,250 / 2,000</span>
                    </div>
                    <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div class="bg-red-800 h-full rounded-full w-[62%] transition-all duration-1000"></div>
                    </div>
                </div>
                
                <div class="flex gap-4">
                    <div class="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p class="text-[10px] uppercase font-bold text-slate-400">Total Quiz</p>
                        <p class="text-2xl font-bold text-slate-800">42</p>
                    </div>
                    <div class="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p class="text-[10px] uppercase font-bold text-slate-400">Streak</p>
                        <p class="text-2xl font-bold text-slate-800">7 Gün</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Notebook Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Saved Words -->
        <div class="lg:col-span-1 bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col max-h-[500px]">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-slate-900" style="font-family: 'Playfair Display', serif;">Kelime Defterim</h3>
                <span class="text-[10px] bg-red-100 text-red-800 px-2 py-1 rounded-full font-bold uppercase" id="savedWordsCount">0</span>
            </div>
            <div id="profileNotebookList" class="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
                <!-- Words injected here -->
            </div>
        </div>

        <!-- Personal Notes -->
        <div class="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-slate-900" style="font-family: 'Playfair Display', serif;">Özel Notlarım</h3>
                <i class="fas fa-sticky-note text-slate-200 text-2xl"></i>
            </div>
            
            <div class="space-y-4 mb-6">
                <textarea id="noteInput" placeholder="Bugün ne öğrendin? Bir not bırak..." 
                    class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all h-28 resize-none"></textarea>
                <button onclick="addNoteFromProfile()"
                    class="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-all active:scale-95 flex items-center gap-2 self-start ml-auto">
                    Notu Kaydet <i class="fas fa-arrow-right text-xs"></i>
                </button>
            </div>

            <div id="notesList" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Notes injected here -->
            </div>
        </div>
    </div>
</div>

<style>
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes slide-in-bottom { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.animate-in { animation: slide-in-bottom 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
</style>
`;

/* =========================================
   CORE LOGIC - RENDER & AUTH
========================================= */

function observeAuthForProfile() {
    const interval = setInterval(() => {
        if (typeof window.currentUser !== "undefined") {
            clearInterval(interval);
            renderProfile();
        }
    }, 200);
}

async function renderProfile() {
    const emailDisplay = document.getElementById("profileEmailDisplay");
    const initialsDisplay = document.getElementById("profileInitials");
    const vipBadge = document.getElementById("vipBadge");

    if (!emailDisplay || !window.currentUser) return;

    // Update UI with User Data
    emailDisplay.innerText = window.currentUser.email;
    initialsDisplay.innerText = window.currentUser.email[0].toUpperCase();

    if (localStorage.getItem("analyzer_access") === "true") {
        vipBadge.classList.remove("hidden");
    }

    await renderSavedWords();
    await renderNotes();
}

/* =========================================
   SAVED WORDS LOGIC
========================================= */

async function renderSavedWords() {
    const container = document.getElementById("profileNotebookList");
    const countBadge = document.getElementById("savedWordsCount");
    if (!container) return;

    try {
        const words = await getSavedWordsFirestore();
        container.innerHTML = "";
        countBadge.innerText = words.length;

        if (!words || words.length === 0) {
            container.innerHTML = `
                <div class="text-center py-10 opacity-30">
                    <i class="fas fa-book-open text-4xl mb-2"></i>
                    <p class="text-xs font-bold uppercase tracking-widest">Defter Henüz Boş</p>
                </div>
            `;
            return;
        }

        words.forEach(item => {
            const div = document.createElement("div");
            div.className = "group flex justify-between items-center bg-slate-50 border border-slate-100 p-4 rounded-2xl hover:bg-white hover:border-red-100 transition-all cursor-pointer";

            div.innerHTML = `
                <div class="flex-1" onclick="switchTab('dictionary'); setTimeout(() => searchDictionaryWord('${item.word}'), 200)">
                    <span class="font-bold text-slate-800 group-hover:text-red-900 transition-colors">${item.word}</span>
                </div>
                <button class="text-slate-300 hover:text-red-600 transition-colors px-2">
                    <i class="fas fa-trash-alt text-xs"></i>
                </button>
            `;

            // Delete word
            div.querySelector("button").onclick = async (e) => {
                e.stopPropagation();
                if (!confirm("Bu kelimeyi silmek istediğine emin misin?")) return;
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
   NOTES LOGIC
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
        // Also update dashboard if possible
        if (typeof renderNotesDashboard === 'function') renderNotesDashboard();
    } catch (error) {
        console.error("Add note error:", error);
    }
};

async function renderNotes() {
    const container = document.getElementById("notesList");
    if (!container) return;

    try {
        const notes = await getNotesFirestore();
        container.innerHTML = "";

        if (!notes || notes.length === 0) {
            container.innerHTML = "<div class='col-span-2 text-center py-10 opacity-30 italic text-sm'>Henüz not eklenmedi.</div>";
            return;
        }

        // Sort by date
        notes.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

        notes.slice(0, 4).forEach(note => {
            const div = document.createElement("div");
            div.className = "bg-yellow-50/50 border border-yellow-100 p-5 rounded-3xl relative group h-full flex flex-col justify-between";
            div.innerHTML = `
                <p class="text-sm text-slate-700 leading-relaxed italic mb-4">"${note.text}"</p>
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-yellow-200/50">
                    <span class="text-[10px] text-yellow-600 font-bold uppercase tracking-widest">
                        ${note.createdAt ? new Date(note.createdAt.seconds * 1000).toLocaleDateString('tr-TR') : 'Bugün'}
                    </span>
                    <button class="text-yellow-600/30 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100">
                        <i class="fas fa-trash-alt text-[10px]"></i>
                    </button>
                </div>
            `;

            div.querySelector("button").onclick = async () => {
                if (!confirm("Notu silmek istiyor musunuz?")) return;
                await deleteNoteFirestore(note.id);
                renderNotes();
            };

            container.appendChild(div);
        });
    } catch (error) {
        console.error("Notes render error:", error);
    }
}

/* =========================================
   AI UNLOCK & UI HELPERS
========================================= */

function unlockAnalyzerUI() {
    document.querySelectorAll('[id*="analyzerNavBtn"], [id*="analyzerMobileBtn"], [id*="tab-analyzer"], [id*="testlabNavBtn"], [id*="testlabMobileBtn"], [id*="restatementNavBtn"], [id*="restatementMobileBtn"], [id*="tab-restatement"]')
        .forEach(el => el.classList.remove("hidden"));

    document.getElementById("aiToolsLockedMsg")?.classList.add("hidden");
    document.getElementById("aiToolsLockedMobile")?.classList.add("hidden");

    // Show VIP badge if profile is open
    document.getElementById("vipBadge")?.classList.remove("hidden");
}

async function checkAnalyzerAccess(code) {
    if (!code) {
        alert("Lütfen kodu girin.");
        return;
    }

    try {
        const res = await fetch("/.netlify/functions/verifyAccess", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code })
        });

        if (res.ok) {
            localStorage.setItem("analyzer_access", "true");
            unlockAnalyzerUI();
            alert("VIP Özellikler Açıldı! 🔓");
        } else {
            alert("Hatalı kod. Lütfen tekrar deneyin. ❌");
        }
    } catch (err) {
        console.error(err);
    }
}

// 🔥 INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("tab-profile");
    if (container) {
        container.innerHTML = profileHTML;
        observeAuthForProfile();
    }

    if (localStorage.getItem("analyzer_access") === "true") {
        unlockAnalyzerUI();
    }
});

window.forceProfileRender = function () {
    renderProfile();
};
