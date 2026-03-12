/* =========================================
   PROFILE TAB - MODERN & LITERARY DESIGN
 ========================================= */

const profileHTML = `
<div id="profileMainContainer" class="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 block" style="display: block !important; opacity: 1 !important; visibility: visible !important;">
    
    <!-- Profile Header Card -->
    <div class="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-red-50 rounded-full blur-3xl group-hover:bg-red-100 transition-colors duration-500"></div>
        
        <div class="relative group/avatar">
            <div id="profilePhotoContainer" class="w-32 h-32 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white text-5xl font-serif shadow-xl shadow-red-900/20 overflow-hidden">
                <span id="profileInitials">Y</span>
            </div>
            <button onclick="openProfileEditModal()" class="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest backdrop-blur-[2px]">
                <i class="fas fa-camera mr-2"></i> Düzenle
            </button>
            <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100">
                <i class="fas fa-crown text-yellow-500 text-sm"></i>
            </div>
        </div>

        <div class="flex-1 text-center md:text-left space-y-2 relative">
            <div class="flex items-center justify-center md:justify-start gap-4">
                <h2 class="text-3xl font-bold text-slate-900" style="font-family: 'Playfair Display', serif;" id="profileNameDisplay">Kütüphane Üyesi</h2>
                <button onclick="openProfileEditModal()" class="text-slate-300 hover:text-red-800 transition-colors">
                    <i class="fas fa-pen text-sm"></i>
                </button>
            </div>
            <p id="profileEmailDisplay" class="text-slate-400 text-sm font-medium italic"></p>
            <div class="flex flex-wrap justify-center md:justify-start gap-3 pt-1">
                <span class="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-200 shadow-sm">Seviye 4: Scholar</span>
                <span id="vipBadge" class="px-4 py-1.5 bg-red-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-red-900/20 hidden">VIP Access</span>
            </div>
        </div>

        <button onclick="logoutUser()" class="px-6 py-3 border border-red-100 text-red-700 rounded-xl text-xs font-bold hover:bg-red-50 transition-all active:scale-95 group relative overflow-hidden">
            <span class="relative z-10">Oturumu Kapat</span>
        </button>
    </div>

    <!-- Edit Profile Modal -->
    <div id="profileEditModal" class="fixed inset-0 bg-black/60 z-[300] hidden items-center justify-center p-4">
        <div class="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div class="p-8 border-b border-slate-50 flex items-center justify-between">
                <h3 class="text-xl font-bold text-slate-900" style="font-family: 'Playfair Display', serif;">Profili Düzenle</h3>
                <button onclick="closeProfileEditModal()" class="text-slate-300 hover:text-red-800 transition-colors"><i class="fas fa-times text-xl"></i></button>
            </div>
            <div class="p-8 space-y-6">
                <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Kullanıcı Adı</label>
                    <input id="editDisplayName" type="text" placeholder="Adınız Soyadınız" class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-red-800 outline-none text-sm transition-all">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Profil Resmi (URL)</label>
                    <input id="editPhotoURL" type="text" placeholder="https://resim-adresi.com/resim.jpg" class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-red-800 outline-none text-sm transition-all">
                    <p class="text-[10px] text-slate-400 mt-2 italic px-2">Not: Firebase Storage kotası dolduğu için şimdilik dış bağlantı (URL) kullanıyoruz.</p>
                </div>
                <button onclick="handleProfileUpdate()" id="saveProfileBtn" class="w-full py-4 bg-red-800 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-red-900/10 active:scale-95">
                    Değişiklikleri Kaydet
                </button>
            </div>
        </div>
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
                    <i class="fas fa-key text-yellow-500"></i> Aktivasyon Kodu
                </h3>
                <p class="text-slate-400 text-sm leading-relaxed mt-2">
                    Premium paket kodunuz varsa buraya girerek anında aktif edebilirsiniz.
                </p>
            </div>

            <div class="flex gap-2 relative">
                <input id="analyzerCodeInput" type="password" placeholder="Kodunuzu buraya yazın..." 
                    class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-800 transition-all">
                <button onclick="checkAnalyzerAccess(document.getElementById('analyzerCodeInput').value)"
                    class="px-6 py-3 bg-red-800 hover:bg-red-700 text-white rounded-xl font-bold transition-all active:scale-95">
                    Aç
                </button>
            </div>
        </div>

        <!-- Learning Stats (Mini) -->
        <div class="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 class="text-xl font-bold text-slate-900" style="font-family: 'Playfair Display', serif;">Hızlı Bakış</h3>
            <div class="flex gap-4">
                <div class="flex-1 bg-red-50 p-5 rounded-3xl border border-red-100">
                    <p class="text-[10px] uppercase font-bold text-red-800 tracking-widest mb-1">XP</p>
                    <p class="text-2xl font-bold text-red-900" id="profileXP">...</p>
                </div>
                <div class="flex-1 bg-slate-100 p-5 rounded-3xl border border-slate-200">
                    <p class="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Seri</p>
                    <p class="text-2xl font-bold text-slate-800" id="profileStreak">...</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Premium Advantages / Shopier Section -->
    <div id="premiumSection" class="bg-gradient-to-br from-slate-50 to-white rounded-[3rem] p-10 border border-slate-200 shadow-xl overflow-hidden relative">
        <div class="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <i class="fas fa-crown text-[15rem]"></i>
        </div>

        <div class="text-center space-y-4 mb-12 relative">
            <h2 class="text-4xl font-extrabold text-slate-900" style="font-family: 'Playfair Display', serif;">YDS Monster <span class="text-red-800">Premium</span></h2>
            <p class="text-slate-500 max-w-xl mx-auto italic">Tüm engelleri kaldırın, yapay zeka desteğiyle hedefinize ışık hızında ulaşın.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 relative">
            <!-- Feature 1 -->
            <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-red-50 text-red-700 rounded-2xl flex items-center justify-center mb-4">
                    <i class="fas fa-robot text-xl"></i>
                </div>
                <h4 class="font-bold text-slate-900 mb-2">AI Sınav Koçu</h4>
                <p class="text-xs text-slate-500 leading-relaxed">7/24 soru sorabileceğiniz, size özel strateji geliştiren mentorunuz.</p>
            </div>
            <!-- Feature 2 -->
            <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mb-4">
                    <i class="fas fa-microscope text-xl"></i>
                </div>
                <h4 class="font-bold text-slate-900 mb-2">Gelişmiş Analiz Araçları</h4>
                <p class="text-xs text-slate-500 leading-relaxed">Cümle analizci, soru çözücü ve restatement motoru ile derinlemesine öğrenme.</p>
            </div>
            <!-- Feature 3 -->
            <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-purple-50 text-purple-700 rounded-2xl flex items-center justify-center mb-4">
                    <i class="fas fa-file-alt text-xl"></i>
                </div>
                <h4 class="font-bold text-slate-900 mb-2">Full Denemeler</h4>
                <p class="text-xs text-slate-500 leading-relaxed">Tam kapsamlı, açıklamalı ve süreli deneme sınavlarıyla gerçek sınav deneyimi.</p>
            </div>
        </div>

        <!-- Pricing Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pb-8">
            <!-- Monthly -->
            <div class="bg-white rounded-[2.5rem] p-6 border border-slate-200 shadow-sm flex flex-col items-center space-y-6 hover:scale-[1.02] transition-transform cursor-pointer relative overflow-hidden border-2 border-slate-100">
                <div class="text-center">
                    <h5 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Aylık Erişim</h5>
                    <div class="flex items-baseline gap-1 justify-center">
                        <span class="text-3xl font-bold text-slate-900">₺250</span>
                        <span class="text-xs text-slate-400">/ay</span>
                    </div>
                </div>
                <ul class="w-full space-y-2 text-[10px] text-slate-600">
                    <li class="flex items-center gap-2"><i class="fas fa-check text-emerald-500"></i> Tüm AI Araçları Dahil</li>
                    <li class="flex items-center gap-2"><i class="fas fa-check text-emerald-500"></i> Sınav Koçu Mentorluğu</li>
                    <li class="flex items-center gap-2"><i class="fas fa-check text-emerald-500"></i> Sınırsız Soru Analizi</li>
                </ul>
                <button onclick="startShopierPayment('https://www.shopier.com/onurtosuner/45147673')" class="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all shadow-lg active:scale-95">
                    Hemen Başla
                </button>
            </div>

            <!-- 3 Months - Recommended -->
            <div class="bg-white rounded-[2.5rem] p-6 border-2 border-red-800 shadow-xl flex flex-col items-center space-y-6 scale-105 hover:scale-[1.07] transition-transform cursor-pointer relative overflow-hidden group">
                <div class="absolute top-0 right-0 bg-red-800 text-white px-3 py-1 rounded-bl-xl text-[8px] font-bold uppercase tracking-tighter">
                    En Popüler
                </div>
                <div class="text-center">
                    <h5 class="text-[10px] font-bold text-red-800 uppercase tracking-widest mb-1">Sezonluk (3 Ay)</h5>
                    <div class="flex items-baseline gap-1 justify-center">
                        <span class="text-3xl font-bold text-slate-900">₺600</span>
                        <span class="text-xs text-slate-400">/paket</span>
                    </div>
                </div>
                <ul class="w-full space-y-2 text-[10px] text-slate-600">
                    <li class="flex items-center gap-2"><i class="fas fa-check text-emerald-500"></i> Aylığa göre %20 Tasarruf</li>
                    <li class="flex items-center gap-2"><i class="fas fa-check text-emerald-500"></i> Full Deneme Havuzu</li>
                    <li class="flex items-center gap-2"><i class="fas fa-check text-emerald-500"></i> Öncelikli Destek</li>
                </ul>
                <button onclick="startShopierPayment('https://www.shopier.com/onurtosuner/45147695')" class="w-full py-3 bg-red-800 text-white rounded-xl text-sm font-bold hover:bg-black transition-all shadow-xl shadow-red-900/20 active:scale-95">
                    Hemen Başla
                </button>
            </div>

            <!-- Yearly -->
            <div class="bg-white rounded-[2.5rem] p-6 border border-slate-200 shadow-sm flex flex-col items-center space-y-6 hover:scale-[1.02] transition-transform cursor-pointer relative overflow-hidden border-2 border-slate-100">
                <div class="text-center">
                    <h5 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Yıllık (Master)</h5>
                    <div class="flex items-baseline gap-1 justify-center">
                        <span class="text-3xl font-bold text-slate-900">₺1500</span>
                        <span class="text-xs text-slate-400">/yıl</span>
                    </div>
                </div>
                <ul class="w-full space-y-2 text-[10px] text-slate-600">
                    <li class="flex items-center gap-2"><i class="fas fa-check text-emerald-500"></i> En İyi Fiyat Garantisi</li>
                    <li class="flex items-center gap-2"><i class="fas fa-star text-amber-500"></i> Tüm Gelecek Özellikler</li>
                    <li class="flex items-center gap-2"><i class="fas fa-check text-emerald-500"></i> Sınırsız Arşiv Erişimi</li>
                </ul>
                <button onclick="startShopierPayment('https://www.shopier.com/onurtosuner/45147714')" class="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all shadow-lg active:scale-95">
                    Hemen Başla
                </button>
            </div>
        </div>

        <div class="mt-12 text-center text-[10px] text-slate-400 uppercase tracking-widest font-semibold flex items-center justify-center gap-6">
            <span class="flex items-center gap-2"><i class="fas fa-shield-alt text-emerald-500"></i> Güvenli Ödeme (Shopier)</span>
            <span class="flex items-center gap-2"><i class="fas fa-bolt text-yellow-500"></i> Anında Aktivasyon</span>
        </div>
    </div>

    <!-- Notebook Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Saved Words -->
        <div class="lg:col-span-1 bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex flex-col max-h-[500px]">
            <div class="flex items-center justify-between mb-6 px-2">
                <h3 class="text-xl font-bold text-slate-900" style="font-family: 'Playfair Display', serif;">Kelimelerim</h3>
                <span class="text-[10px] bg-red-100 text-red-800 px-3 py-1 rounded-full font-bold uppercase" id="savedWordsCount">0</span>
            </div>
            <div id="profileNotebookList" class="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1"></div>
        </div>

        <!-- Personal Notes -->
        <div class="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex flex-col">
            <div class="flex items-center justify-between mb-6 px-2">
                <h3 class="text-xl font-bold text-slate-900" style="font-family: 'Playfair Display', serif;">Özel Notlarım</h3>
                <i class="fas fa-sticky-note text-slate-200 text-2xl"></i>
            </div>
            
            <div class="space-y-4 mb-8">
                <textarea id="noteInput" placeholder="Bugün ne öğrendin? Bir not bırak..." 
                    class="w-full bg-slate-50 border border-slate-100 rounded-[2rem] px-6 py-5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 transition-all h-28 resize-none"></textarea>
                <button onclick="addNoteFromProfile()"
                    class="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all active:scale-95 flex items-center gap-2 self-start ml-auto">
                    Kaydet <i class="fas fa-save text-xs ml-2"></i>
                </button>
            </div>

            <div id="notesList" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
        </div>
    </div>
</div>

<style>
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
        if (window.currentUser) {
            console.log("Profile observer: User ready, rendering...");
            clearInterval(interval);
            renderProfile();
        }
    }, 500);
}

async function renderProfile() {
    console.log("renderProfile() triggered");
    const nameDisplay = document.getElementById("profileNameDisplay");
    const emailDisplay = document.getElementById("profileEmailDisplay");
    const initialsDisplay = document.getElementById("profileInitials");
    const photoContainer = document.getElementById("profilePhotoContainer");
    const vipBadge = document.getElementById("vipBadge");

    if (!nameDisplay || !window.currentUser) {
        console.warn("Profile render aborted: nameDisplay or currentUser missing.");
        return;
    }

    // Update UI with User Data
    nameDisplay.innerText = window.currentUser.displayName || "Kütüphane Üyesi";
    emailDisplay.innerText = window.currentUser.email;

    if (window.currentUser.photoURL) {
        photoContainer.innerHTML = `<img src="${window.currentUser.photoURL}" class="w-full h-full object-cover">`;
    } else {
        photoContainer.innerHTML = `<span id="profileInitials">${(window.currentUser.displayName || window.currentUser.email)[0].toUpperCase()}</span>`;
    }

    if (localStorage.getItem("analyzer_access") === "true") {
        vipBadge.classList.remove("hidden");
        
        // Show expiration date if we can find it in Firestore
        window.firebaseExports.getDoc(window.firebaseExports.doc(window.firebaseExports.db, "users", window.currentUser.uid)).then(docSnap => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.premiumUntil) {
                    const expiry = data.premiumUntil.toDate();
                    const dateStr = expiry.toLocaleDateString('tr-TR');
                    vipBadge.innerText = `VIP (Bitiş: ${dateStr})`;
                }
            }
        });
    }

    // Sync gamification stats if available
    if (window.userStats) {
        document.getElementById("profileXP") && (document.getElementById("profileXP").innerText = window.userStats.xp + ' XP');
        document.getElementById("profileStreak") && (document.getElementById("profileStreak").innerText = window.userStats.streak + ' Gün');
    }

    console.log("Checking premiumSection visibility...");
    const premiumSec = document.getElementById("premiumSection");
    if (premiumSec) {
        premiumSec.classList.remove("hidden");
        console.log("premiumSection found and forced visible.");
    } else {
        console.warn("premiumSection NOT found in DOM!");
    }

    await renderProfileSavedWords();
    await renderProfileNotes();
}

/* =========================================
   PROFILE EDIT FUNCTIONS
 ========================================= */

window.openProfileEditModal = function () {
    const modal = document.getElementById("profileEditModal");
    if (!modal) return;

    document.getElementById("editDisplayName").value = window.currentUser.displayName || "";
    document.getElementById("editPhotoURL").value = window.currentUser.photoURL || "";

    modal.classList.replace("hidden", "flex");
};

window.closeProfileEditModal = function () {
    document.getElementById("profileEditModal").classList.replace("flex", "hidden");
};

window.handleProfileUpdate = async function () {
    const name = document.getElementById("editDisplayName").value.trim();
    const photo = document.getElementById("editPhotoURL").value.trim();
    const btn = document.getElementById("saveProfileBtn");

    if (!name) {
        alert("Lütfen bir isim girin.");
        return;
    }

    btn.disabled = true;
    btn.innerText = "Güncelleniyor...";

    try {
        const res = await window.updateUserProfile(name, photo);
        if (res.success) {
            alert("Profil başarıyla güncellendi!");
            closeProfileEditModal();
            renderProfile();
            // Refresh forum name if possible
            if (typeof startForumListener === 'function') startForumListener();
        } else {
            alert("Hata: " + res.error);
        }
    } catch (err) {
        alert("Bir hata oluştu.");
        console.error(err);
    } finally {
        btn.disabled = false;
        btn.innerText = "Değişiklikleri Kaydet";
    }
};

/* =========================================
   SAVED WORDS LOGIC
 ========================================= */

async function renderProfileSavedWords() {
    console.log("renderProfileSavedWords() triggered");
    const container = document.getElementById("profileNotebookList");
    const countBadge = document.getElementById("savedWordsCount");
    if (!container) {
        console.warn("profileNotebookList container not found");
        return;
    }

    try {
        const words = await window.getSavedWordsFirestore();
        console.log("Firestore words fetched:", words.length);
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

            div.querySelector("button").onclick = async (e) => {
                e.stopPropagation();
                if (!confirm("Bu kelimeyi silmek istediğine emin misin?")) return;
                await window.deleteWordFirestore(item.id);
                renderProfileSavedWords();
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
        await window.saveNoteFirestore(text);
        input.value = "";
        await renderProfileNotes();
        if (typeof renderDashboardNotes === 'function') renderDashboardNotes();
    } catch (error) {
        console.error("Add note error:", error);
    }
};

async function renderProfileNotes() {
    const container = document.getElementById("notesList");
    if (!container) return;

    try {
        const notesArr = await window.getNotesFirestore();
        container.innerHTML = "";

        if (notesArr.length === 0) {
            container.innerHTML = "<div class='col-span-2 text-center py-10 opacity-30 italic text-sm text-slate-400'>Henüz not eklenmedi.</div>";
            return;
        }

        notesArr.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).slice(0, 4).forEach(note => {
            const div = document.createElement("div");
            div.className = "bg-yellow-50/50 border border-yellow-100 p-5 rounded-3xl relative group h-full flex flex-col justify-between";
            div.innerHTML = `
                <p class="text-sm text-slate-700 leading-relaxed italic mb-4">"${note.text}"</p>
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-yellow-200/50">
                    <span class="text-[10px] text-yellow-600 font-bold uppercase tracking-widest">
                        ${note.createdAt?.seconds ? new Date(note.createdAt.seconds * 1000).toLocaleDateString('tr-TR') : 'Bugün'}
                    </span>
                    <button class="text-yellow-600/30 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100">
                        <i class="fas fa-trash-alt text-[10px]"></i>
                    </button>
                </div>
            `;
            div.querySelector("button").onclick = async () => {
                if (!confirm("Notu silmek istiyor musunuz?")) return;
                await window.deleteNoteFirestore(note.id);
                renderProfileNotes();
            };
            container.appendChild(div);
        });
    } catch (error) {
        console.error("Notes render error:", error);
    }
}

/* =========================================
   PREMIUM & SHOPIER HELPERS
 ========================================= */

window.startShopierPayment = function (url) {
    if (!window.currentUser) {
        alert("Ödeme yapmak için önce giriş yapmalısınız.");
        if (typeof window.openLoginModal === "function") window.openLoginModal();
        return;
    }

    // Shopier direct links don't pre-fill email easily via URL params 
    // without API integration, but we'll remind the user to use their registered email.
    
    const confirmMsg = `Satın alma sayfasına yönlendiriliyorsunuz.\n\nÖNEMLİ: VIP erişiminizin otomatik aktif olması için ödeme sayfasında "${window.currentUser.email}" e-posta adresinizi kullanmayı unutmayın.`;
    
    if (confirm(confirmMsg)) {
        window.open(url, '_blank');
    }
};

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
            if (typeof window.unlockAnalyzerUI === "function") window.unlockAnalyzerUI();
            alert("VIP Özellikler Açıldı! 🔓");
        } else {
            alert("Hatalı kod. Lütfen tekrar deneyin. ❌");
        }
    } catch (err) { console.error(err); }
}

// 🔥 INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("tab-profile");
    if (container) {
        container.innerHTML = profileHTML;
        observeAuthForProfile();
    }
    // AI access check removed from here, handled centrally in firebase-auth.js
});

window.forceProfileRender = function () {
    renderProfile();
};
