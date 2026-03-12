/* =========================================
   ADMIN PANEL - CODE MANAGEMENT
  ========================================= */

const adminHTML = `
<div id="adminPanel" class="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    
    <div class="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col gap-6">
        <div class="flex items-center justify-between">
            <h2 class="text-3xl font-bold text-slate-900" style="font-family: 'Playfair Display', serif;">Admin Paneli</h2>
            <button onclick="refreshAdminCodes()" class="p-4 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all">
                <i class="fas fa-sync-alt"></i> Yenile
            </button>
        </div>
        
        <p class="text-slate-500 text-sm italic">Buradan kullanılmamış kodları görebilir ve Shopier siparişlerine göre kullanıcılara gönderebilirsiniz.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Monthly Section -->
        <div class="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 class="font-bold text-red-800 uppercase tracking-widest text-xs flex items-center gap-2">
                <i class="fas fa-calendar-alt"></i> Aylık (30 Gün)
            </h3>
            <div id="codes-monthly" class="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <p class="text-xs text-slate-400 italic">Yükleniyor...</p>
            </div>
        </div>

        <!-- Seasonal Section -->
        <div class="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 class="font-bold text-blue-800 uppercase tracking-widest text-xs flex items-center gap-2">
                <i class="fas fa-snowflake"></i> Sezonluk (90 Gün)
            </h3>
            <div id="codes-seasonal" class="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <p class="text-xs text-slate-400 italic">Yükleniyor...</p>
            </div>
        </div>

        <!-- Yearly Section -->
        <div class="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 class="font-bold text-amber-600 uppercase tracking-widest text-xs flex items-center gap-2">
                <i class="fas fa-crown"></i> Yıllık (365 Gün)
            </h3>
            <div id="codes-yearly" class="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <p class="text-xs text-slate-400 italic">Yükleniyor...</p>
            </div>
        </div>
    </div>
</div>
`;

async function refreshAdminCodes() {
    if (!window.currentUser) return;
    
    // Safety check for admins
    const admins = ["onurtosuner@gmail.com", "hasanonurtosuner@gmail.com"];
    if (!admins.includes(window.currentUser.email)) {
        alert("Yetkisiz erişim.");
        switchTab('dashboard');
        return;
    }

    const db = window.firebaseExports.db;
    const codesRef = window.firebaseExports.collection(db, "promo_codes");
    const q = window.firebaseExports.query(codesRef, window.firebaseExports.where("used", "==", false));

    try {
        const snapshot = await window.firebaseExports.getDocs(q);
        const codes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        renderCodesInList("codes-monthly", codes.filter(c => c.days === 30 || c.package === 'monthly'));
        renderCodesInList("codes-seasonal", codes.filter(c => c.days === 90 || c.package === 'seasonal'));
        renderCodesInList("codes-yearly", codes.filter(c => c.days === 365 || c.package === 'yearly' || (!c.days && !c.package))); // Default to yearly for legacy
    } catch (err) {
        console.error("Admin codes fetch error:", err);
    }
}

function renderCodesInList(containerId, list) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = `<p class="text-[10px] text-slate-400 italic">Kullanılmamış kod kalmadı.</p>`;
        return;
    }

    container.innerHTML = "";
    list.sort((a,b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).forEach(code => {
        const div = document.createElement("div");
        div.className = "group flex items-center justify-between bg-slate-50 border border-slate-100 p-3 rounded-xl hover:bg-white hover:border-red-100 transition-all cursor-pointer";
        div.onclick = () => copyToClipboard(code.id);
        
        div.innerHTML = `
            <span class="text-xs font-mono font-bold text-slate-700">${code.id}</span>
            <i class="fas fa-copy text-[10px] text-slate-300 group-hover:text-red-800 transition-colors"></i>
        `;
        container.appendChild(div);
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Kod kopyalandı: " + text);
    });
}

// Global initialization check
window.initAdminPanel = function() {
    refreshAdminCodes();
};
