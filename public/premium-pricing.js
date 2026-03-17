/* =========================================
   PREMIUM PRICING TAB - MODERN & LUXURY
  ========================================= */

const premiumPricingHTML = `
<div id="premiumMainContainer" class="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 p-4 md:p-8">
    
    <!-- Hero Section -->
    <div class="text-center space-y-4 mb-16 relative">
        <div class="inline-block px-4 py-1.5 bg-red-50 text-red-800 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-red-100 shadow-sm">
            YDS Monster VIP Kulübü
        </div>
        <h1 class="text-4xl md:text-6xl font-black text-slate-900 leading-tight" style="font-family: 'Playfair Display', serif;">
            YDS & YDT'ye <span class="text-red-800 italic">Monster</span> <br/> Gücüyle Hazırlanın
        </h1>
        <p class="text-slate-500 max-w-2xl mx-auto text-lg italic">Tüm engelleri kaldırın, yapay zeka desteğiyle hedefinize ışık hızında ulaşın.</p>
    </div>

    <!-- Feature Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 relative">
        <!-- Feature 1 -->
        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
            <div class="w-14 h-14 bg-red-50 text-red-700 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <i class="fas fa-robot text-2xl"></i>
            </div>
            <h4 class="text-xl font-bold text-slate-900 mb-3">AI Sınav Koçu</h4>
            <p class="text-sm text-slate-500 leading-relaxed font-medium">7/24 soru sorabileceğiniz, kelimeleri bağlamında açıklayan ve size özel strateji geliştiren mentorunuz.</p>
        </div>
        <!-- Feature 2 -->
        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
            <div class="w-14 h-14 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <i class="fas fa-microscope text-2xl"></i>
            </div>
            <h4 class="text-xl font-bold text-slate-900 mb-3">Gelişmiş Analiz Araçları</h4>
            <p class="text-sm text-slate-500 leading-relaxed font-medium">Cümle analizci, derinlemesine test lab ve restatement motoru ile dilin mimarisini keşfedin.</p>
        </div>
        <!-- Feature 3 -->
        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
            <div class="w-14 h-14 bg-purple-50 text-purple-700 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <i class="fas fa-file-alt text-2xl"></i>
            </div>
            <h4 class="text-xl font-bold text-slate-900 mb-3">Sınırsız Deneme Havuzu</h4>
            <p class="text-sm text-slate-500 leading-relaxed font-medium">Sadece premium üyelere özel fullexam denemeleri ve mini akıllı sınavlarla kendinizi test edin.</p>
        </div>
    </div>

    <!-- Pricing Cards -->
    <div id="pricingTable" class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pb-16 relative">
        <div class="absolute -top-20 -left-20 w-64 h-64 bg-red-50 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>
        <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-50 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>

        <!-- Monthly -->
        <div class="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm flex flex-col items-center space-y-8 hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden border-2 border-slate-50">
            <div class="text-center">
                <h5 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Aylık Erişim</h5>
                <div class="flex items-baseline gap-1 justify-center">
                    <span class="text-5xl font-black text-slate-900">₺250</span>
                    <span class="text-sm text-slate-400 font-bold">/ay</span>
                </div>
            </div>
            <ul class="w-full space-y-4 text-xs font-bold text-slate-600">
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-emerald-500 text-sm"></i> Tüm AI Araçları Dahil</li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-emerald-500 text-sm"></i> Sınav Koçu Mentorluğu</li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-emerald-500 text-sm"></i> Sınırsız Soru Analiz</li>
                <li class="flex items-center gap-3 opacity-20"><i class="fas fa-times-circle text-slate-300 text-sm"></i> İndirimli Paket Avantajı</li>
            </ul>
            <button onclick="startShopierPayment('https://www.shopier.com/onurtosuner/45165102')" class="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl active:scale-95">
                Hemen Başla
            </button>
        </div>

        <!-- 3 Months - Recommended -->
        <div class="bg-white rounded-[3rem] p-10 border-4 border-red-800 shadow-2xl flex flex-col items-center space-y-8 scale-110 hover:scale-[1.12] transition-all cursor-pointer relative overflow-hidden group z-10">
            <div class="absolute top-0 right-0 bg-red-800 text-white px-5 py-2 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest">
                En Popüler
            </div>
            <div class="text-center">
                <h5 class="text-xs font-black text-red-800 uppercase tracking-[0.2em] mb-2">Sezonluk (3 Ay)</h5>
                <div class="flex items-baseline gap-1 justify-center">
                    <span class="text-5xl font-black text-slate-900">₺600</span>
                    <span class="text-sm text-slate-400 font-bold">/paket</span>
                </div>
            </div>
            <ul class="w-full space-y-4 text-xs font-bold text-slate-600">
                <li class="flex items-center gap-3"><i class="fas fa-star text-amber-500 text-sm"></i> Aylığa göre %20 Tasarruf</li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-emerald-500 text-sm"></i> Full Deneme Havuzu</li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-emerald-500 text-sm"></i> Öncelikli Destek Hattı</li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-emerald-500 text-sm"></i> Tüm VIP Özellikler</li>
            </ul>
            <button onclick="startShopierPayment('https://www.shopier.com/onurtosuner/45165102')" class="w-full py-5 bg-red-800 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-2xl shadow-red-900/40 active:scale-95">
                Paketi Seç
            </button>
        </div>

        <!-- Yearly -->
        <div class="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm flex flex-col items-center space-y-8 hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden border-2 border-slate-50">
            <div class="text-center">
                <h5 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Yıllık (Master)</h5>
                <div class="flex items-baseline gap-1 justify-center">
                    <span class="text-5xl font-black text-slate-900">₺1500</span>
                    <span class="text-sm text-slate-400 font-bold">/yıl</span>
                </div>
            </div>
            <ul class="w-full space-y-4 text-xs font-bold text-slate-600">
                <li class="flex items-center gap-3"><i class="fas fa-crown text-amber-500 text-sm"></i> En İyi Fiyat Garantisi</li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-emerald-500 text-sm"></i> Tüm Gelecek Özellikler</li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-emerald-500 text-sm"></i> Sınırsız Arşiv Erişimi</li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-emerald-500 text-sm"></i> Monster Master Rozeti</li>
            </ul>
            <button onclick="startShopierPayment('https://www.shopier.com/onurtosuner/45165102')" class="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl active:scale-95">
                Hemen Başla
            </button>
        </div>
    </div>

    <!-- Activation Logic -->
    <div class="max-w-2xl mx-auto bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
        <div class="absolute right-0 top-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
            <i class="fas fa-key text-[10rem]"></i>
        </div>
        <div class="relative space-y-6">
            <div class="space-y-2">
                <h3 class="text-2xl font-black" style="font-family: 'Playfair Display', serif;">Aktivasyon Kodunuz mu var?</h3>
                <p class="text-slate-400 text-sm font-medium leading-relaxed italic">Ödeme sonrası size gönderilen kodu buraya girerek anında Monster VIP olabilirsiniz.</p>
            </div>
            <div class="flex gap-3">
                <input id="premiumTabCodeInput" type="password" placeholder="Kodunuzu buraya yazın..." 
                    class="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-800 transition-all font-mono">
                <button onclick="checkAnalyzerAccess(document.getElementById('premiumTabCodeInput').value)"
                    class="px-10 py-4 bg-red-800 hover:bg-red-700 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 shadow-lg shadow-red-900/20">
                    AKTİF ET
                </button>
            </div>
        </div>
    </div>

    <div class="text-center text-[10px] text-slate-400 uppercase tracking-widest font-black flex flex-wrap items-center justify-center gap-8 pt-8">
        <span class="flex items-center gap-2"><i class="fas fa-shield-alt text-emerald-500 text-sm"></i> 256-bit Güvenli Ödeme</span>
        <span class="flex items-center gap-2"><i class="fas fa-bolt text-yellow-500 text-sm"></i> Anında Teslimat</span>
        <span class="flex items-center gap-2"><i class="fas fa-headset text-blue-500 text-sm"></i> 7/24 Kesintisiz Destek</span>
    </div>
</div>
`;

function renderPremiumPricing() {
    const container = document.getElementById("tab-premium-pricing");
    if (container) {
        container.innerHTML = premiumPricingHTML;
    }
}

// 🔥 INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    renderPremiumPricing();
});
