/* =====================================================
   IELTS MODULES & DATA
   ===================================================== */

const ieltsOverviewHTML = `
<div class="max-w-6xl mx-auto px-4 py-12">
    <!-- Action Bar (Print) -->
    <div class="flex justify-end mb-8 no-print">
        <button onclick="window.print()" class="print-btn flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-800 transition-all shadow-xl active:scale-95">
            <i class="fas fa-file-pdf"></i> PDF İndir / Yazdır
        </button>
    </div>

    <div class="text-center mb-16">
        <div class="inline-flex items-center gap-3 bg-indigo-50 text-indigo-700 px-5 py-2 rounded-full text-sm font-bold mb-4 border border-indigo-100 uppercase tracking-widest">
            <i class="fas fa-globe-americas"></i> IELTS International
        </div>
        <h1 class="text-4xl md:text-6xl font-black text-slate-900 mb-6" style="font-family: 'Playfair Display', serif;">
            IELTS <span class="text-indigo-600">Hazırlık Merkezi</span>
        </h1>
        <p class="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed italic">
            Dünyanın en prestijli dil sınavı için stratejik hazırlık rehberi, modüller ve interaktif araçlar.
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
            <div class="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-book-open"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">Reading</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6">Akademik ve Genel formatlarda okuma stratejileri, zaman yönetimi ve soru tipleri.</p>
            <button onclick="switchTab('ielts-reading')" class="text-blue-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                İncele <i class="fas fa-arrow-right text-xs"></i>
            </button>
        </div>

        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
            <div class="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-headphones"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">Listening</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6">Farklı aksanlara alışma, boşluk doldurma ve çoktan seçmeli sorularda hız teknikleri.</p>
            <button onclick="switchTab('ielts-listening')" class="text-purple-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                İncele <i class="fas fa-arrow-right text-xs"></i>
            </button>
        </div>

        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
            <div class="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-pen-nib"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">Writing</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6">Task 1 (Grafik/Mektup) ve Task 2 (Essay) için şablonlar ve akademik kelime grupları.</p>
            <button onclick="switchTab('ielts-writing')" class="text-orange-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                İncele <i class="fas fa-arrow-right text-xs"></i>
            </button>
        </div>

        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
            <div class="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-comments"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">Speaking</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6">Mülakat teknikleri, akıcılık geliştirme ve cue card bölümü için pratik ipuçları.</p>
            <button onclick="switchTab('ielts-speaking')" class="text-green-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                İncele <i class="fas fa-arrow-right text-xs"></i>
            </button>
        </div>
    </div>

    <!-- Info Section -->
    <div class="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white overflow-hidden relative">
        <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full"></div>
        <div class="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div class="flex-1">
                <h2 class="text-3xl font-bold mb-4">Hazırlık Süreci Başlıyor</h2>
                <p class="text-slate-400 leading-relaxed mb-8">
                    IELTS altyapımız şu an inşa aşamasındadır. Çok yakında her modül için yapay zeka destekli pratik araçları, 
                    essay değerlendirme sistemi ve gerçek zamanlı konuşma simülasyonları eklenecektir.
                </p>
                <div class="flex flex-wrap gap-4">
                    <div class="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-xs">
                        <i class="fas fa-check text-green-500"></i> Akademik & Genel Modül
                    </div>
                    <div class="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-xs">
                        <i class="fas fa-check text-green-500"></i> AI Essay Analizi
                    </div>
                    <div class="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-xs">
                        <i class="fas fa-check text-green-500"></i> Bant Skoru Tahmini
                    </div>
                </div>
            </div>
            <div class="w-full md:w-1/3 text-center">
                <div class="text-6xl font-black text-indigo-500 mb-2">7.5+</div>
                <div class="text-xs uppercase tracking-widest text-slate-500 font-bold">Hedef Bant Skoru</div>
            </div>
        </div>
    </div>
</div>
`;

const ieltsReadingHTML = `
<div class="max-w-6xl mx-auto px-4 py-12 text-center">
    <h1 class="text-3xl font-bold mb-4">IELTS Reading</h1>
    <p class="text-slate-500 italic">Bu bölüm yakında eklenecektir. Şu an altyapı çalışmaları sürmektedir.</p>
    <button onclick="switchTab('ielts-overview')" class="mt-8 text-indigo-600 font-bold">← Geri Dön</button>
</div>
`;

const ieltsListeningHTML = `
<div class="max-w-6xl mx-auto px-4 py-12 text-center">
    <h1 class="text-3xl font-bold mb-4">IELTS Listening</h1>
    <p class="text-slate-500 italic">Bu bölüm yakında eklenecektir. Şu an altyapı çalışmaları sürmektedir.</p>
    <button onclick="switchTab('ielts-overview')" class="mt-8 text-indigo-600 font-bold">← Geri Dön</button>
</div>
`;

const ieltsWritingHTML = `
<div class="max-w-6xl mx-auto px-4 py-12 text-center">
    <h1 class="text-3xl font-bold mb-4">IELTS Writing</h1>
    <p class="text-slate-500 italic">Bu bölüm yakında eklenecektir. Şu an altyapı çalışmaları sürmektedir.</p>
    <button onclick="switchTab('ielts-overview')" class="mt-8 text-indigo-600 font-bold">← Geri Dön</button>
</div>
`;

const ieltsSpeakingHTML = `
<div class="max-w-6xl mx-auto px-4 py-12 text-center">
    <h1 class="text-3xl font-bold mb-4">IELTS Speaking</h1>
    <p class="text-slate-500 italic">Bu bölüm yakında eklenecektir. Şu an altyapı çalışmaları sürmektedir.</p>
    <button onclick="switchTab('ielts-overview')" class="mt-8 text-indigo-600 font-bold">← Geri Dön</button>
</div>
`;
