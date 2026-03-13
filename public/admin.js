/* =========================================
   ADMIN PANEL - QUICK ACTIVATION
   ========================================= */

const adminHTML = `
<div id="adminPanel" class="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    
    <div class="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col gap-6">
        <div class="flex items-center justify-between">
            <h2 class="text-3xl font-bold text-slate-900" style="font-family: 'Playfair Display', serif;">Admin Paneli</h2>
            <button onclick="window.location.reload()" class="p-4 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all">
                <i class="fas fa-sync-alt"></i> Yenile
            </button>
        </div>
        
        <p class="text-slate-500 text-sm italic">Buradan doğrudan e-posta adresi ile kullanıcıların Premium üyeliğini aktif edebilirsiniz.</p>
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
</div>
`;

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
    console.log("Admin panel initialized.");
};
