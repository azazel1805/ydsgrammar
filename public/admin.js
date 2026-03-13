/* =========================================
   ADMIN PANEL - CODE MANAGEMENT
  ========================================= */

const adminHTML = `
<div id="adminPanel" class="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    
    <div class="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col gap-6">
        <div class="flex items-center justify-between">
            <h2 class="text-3xl font-bold text-slate-900" style="font-family: 'Playfair Display', serif;">Admin Paneli</h2>
        <div class="flex items-center gap-4">
            <button onclick="seedNewCodes()" id="seedBtn" class="p-4 bg-red-800 text-white rounded-2xl hover:bg-black transition-all text-xs font-bold">
                <i class="fas fa-magic mr-2"></i> 15 Yeni Kod Üret
            </button>
            <button onclick="refreshAdminCodes()" class="p-4 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all">
                <i class="fas fa-sync-alt"></i> Yenile
            </button>
        </div>
        </div>
        
        <p class="text-slate-500 text-sm italic">Buradan kullanılmamış kodları görebilir veya doğrudan e-posta ile aktivasyon yapabilirsiniz.</p>
    </div>

    <!-- Quick Activation Section -->
    <div class="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
            <i class="fas fa-bolt text-amber-500"></i> Hızlı Aktivasyon (Kodsuz)
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="md:col-span-1">
                <label class="block text-xs font-bold text-slate-400 mb-2 ml-2 uppercase tracking-wide">Üye E-posta</label>
                <input type="email" id="activateEmail" placeholder="ornek@mail.com" class="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all">
            </div>
            <div class="md:col-span-1">
                <label class="block text-xs font-bold text-slate-400 mb-2 ml-2 uppercase tracking-wide">Paket Tipi</label>
                <select id="activatePackage" class="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all appearance-none">
                    <option value="monthly">Aylık (30 Gün)</option>
                    <option value="seasonal">Sezonluk (90 Gün)</option>
                    <option value="yearly" selected>Yıllık (365 Gün)</option>
                </select>
            </div>
            <div class="md:col-span-1 flex items-end">
                <button onclick="activateUserManually()" id="activateBtn" class="w-full p-4 bg-slate-900 text-white rounded-2xl hover:bg-red-800 transition-all font-bold">
                    <i class="fas fa-user-check mr-2"></i> Premium Tanımla
                </button>
            </div>
        </div>
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

    try {
        const res = await fetch("/api/getUnusedCodes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: window.currentUser.email })
        });

        if (!res.ok) {
            throw new Error(await res.text());
        }

        const codes = await res.json();

        renderCodesInList("codes-monthly", codes.filter(c => c.days === 30 || c.package === 'monthly'));
        renderCodesInList("codes-seasonal", codes.filter(c => c.days === 90 || c.package === 'seasonal'));
        renderCodesInList("codes-yearly", codes.filter(c => c.days === 365 || c.package === 'yearly' || (!c.days && !c.package))); // Default to yearly for legacy
    } catch (err) {
        console.error("Admin codes fetch error:", err);
        alert("Hata: Kodlar yüklenemedi. Yetki sorunu olabilir.");
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
            <div class="flex items-center gap-2">
                <i class="fas fa-copy text-[10px] text-slate-300 group-hover:text-red-800 transition-colors" title="Kopyala"></i>
                <button onclick="markAsSent(event, '${code.id}')" class="p-2 hover:bg-red-50 text-slate-200 hover:text-green-600 transition-all" title="Gönderildi İşaretle">
                    <i class="fas fa-check-circle text-xs"></i>
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

async function markAsSent(event, codeId) {
    if (event) event.stopPropagation();
    if (!confirm("Bu kodu 'Gönderildi' olarak işaretlemek ve listeden kaldırmak istiyor musunuz?")) return;

    try {
        const res = await fetch("/api/getUnusedCodes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                email: window.currentUser.email,
                action: "mark_sent",
                codeId: codeId
            })
        });

        if (!res.ok) throw new Error(await res.text());
        refreshAdminCodes();
    } catch (err) {
        console.error("Mark sent error:", err);
        alert("Hata: " + err.message);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Kod kopyalandı: " + text);
    });
}

async function seedNewCodes() {
    if (!confirm("15 yeni (5 her paketten) kod üretmek istediğinize emin misiniz?")) return;
    const btn = document.getElementById("seedBtn");
    btn.disabled = true;
    btn.innerText = "Üretiliyor...";

    try {
        const res = await fetch("/api/getUnusedCodes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                email: window.currentUser.email,
                action: "seed"
            })
        });

        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        alert(data.message);
        refreshAdminCodes();
    } catch (err) {
        console.error("Seed error:", err);
        alert("Üretim hatası: " + err.message);
    } finally {
        btn.disabled = false;
        btn.innerText = "15 Yeni Kod Üret";
    }
}

async function activateUserManually() {
    const emailInput = document.getElementById("activateEmail");
    const packageInput = document.getElementById("activatePackage");
    const btn = document.getElementById("activateBtn");

    const targetEmail = emailInput.value.trim();
    const packageType = packageInput.value;

    if (!targetEmail) {
        alert("Lütfen bir e-posta adresi girin.");
        return;
    }

    if (!confirm(`${targetEmail} kullanıcısına ${packageType} paketi tanımlamak istediğinize emin misiniz?`)) return;

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> İşleniyor...';

    try {
        const res = await fetch("/api/getUnusedCodes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                email: window.currentUser.email,
                action: "activate_user",
                targetEmail,
                packageType
            })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || data || "Bir hata oluştu");

        alert("Başarılı: " + data.message);
        emailInput.value = "";
    } catch (err) {
        console.error("Manual activation error:", err);
        alert("Hata: " + err.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-user-check mr-2"></i> Premium Tanımla';
    }
}

// Global initialization check
window.initAdminPanel = function() {
    refreshAdminCodes();
};
