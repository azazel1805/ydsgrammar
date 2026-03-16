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
            Akademik veya Genel Eğitim... Hedef bant skorunuza (7.0+) ulaşmanız için gereken her şey burada.
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
            <div class="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-book-open"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">Reading</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6">Skimming, Scanning ve anahtar kelime takibi ile 60 dakikada 3 makale yönetimi.</p>
            <button onclick="switchTab('ielts-reading')" class="text-blue-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                İncele <i class="fas fa-arrow-right text-xs"></i>
            </button>
        </div>

        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
            <div class="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-headphones"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">Listening</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6">4 farklı bölüm, 40 soru. Aksanlar, dikkat dağıtıcılar ve boşluk doldurma taktikleri.</p>
            <button onclick="switchTab('ielts-listening')" class="text-purple-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                İncele <i class="fas fa-arrow-right text-xs"></i>
            </button>
        </div>

        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
            <div class="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-pen-nib"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">Writing</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6">Task 1 Grafik ve Task 2 Essay için puan kazandıran yapılar ve bağlaçlar.</p>
            <button onclick="switchTab('ielts-writing')" class="text-orange-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                İncele <i class="fas fa-arrow-right text-xs"></i>
            </button>
        </div>

        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
            <div class="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-comments"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">Speaking</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6">Birebir mülakat simülasyonları, akıcılık geliştirme ve Part 2 stratejileri.</p>
            <button onclick="switchTab('ielts-speaking')" class="text-green-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                İncele <i class="fas fa-arrow-right text-xs"></i>
            </button>
        </div>
    </div>

    <!-- Stats & Scale -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div class="lg:col-span-2 bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white overflow-hidden relative">
            <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full"></div>
            <div class="relative z-10">
                <h2 class="text-3xl font-bold mb-6">Neden IELTS?</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="flex items-start gap-4">
                            <div class="bg-white/10 p-3 rounded-xl text-indigo-400">
                                <i class="fas fa-university"></i>
                            </div>
                            <div>
                                <h4 class="font-bold mb-1">Akademik Kabul</h4>
                                <p class="text-xs text-slate-400">Dünya çapında 11.000'den fazla kurum tarafından kabul edilir.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="bg-white/10 p-3 rounded-xl text-indigo-400">
                                <i class="fas fa-passport"></i>
                            </div>
                            <div>
                                <h4 class="font-bold mb-1">Göçmenlik</h4>
                                <p class="text-xs text-slate-400">Avustralya, Kanada ve İngiltere göçmenlik başvurularında altın standart.</p>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div class="flex items-start gap-4">
                            <div class="bg-white/10 p-3 rounded-xl text-indigo-400">
                                <i class="fas fa-laptop"></i>
                            </div>
                            <div>
                                <h4 class="font-bold mb-1">Kağıt veya Bilgisayar</h4>
                                <p class="text-xs text-slate-400">Kendi tercih ettiğiniz formatta sınava girme esnekliği.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="bg-white/10 p-3 rounded-xl text-indigo-400">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div>
                                <h4 class="font-bold mb-1">Hızlı Sonuç</h4>
                                <p class="text-xs text-slate-400">Bilgisayarlı sınavda 3-5 gün içinde puanınızı öğrenin.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white border border-slate-100 p-8 rounded-[3rem] shadow-xl flex flex-col justify-center text-center">
            <div class="text-sm uppercase tracking-[0.2em] font-black text-slate-400 mb-2">Hedef Bant</div>
            <div class="text-8xl font-black text-indigo-600 mb-4">8.0</div>
            <p class="text-slate-500 text-sm leading-relaxed italic">"Eksper kullanıcı seviyesine gidiş yolculuğunuz burada başlar."</p>
        </div>
    </div>
</div>
`;

const ieltsReadingHTML = `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="mb-12">
        <button onclick="switchTab('ielts-overview')" class="text-indigo-600 font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-arrow-left text-xs"></i> IELTS Overview
        </button>
        <h1 class="text-4xl font-black text-slate-900 mb-4" style="font-family: 'Playfair Display', serif;">IELTS Reading Stratejileri</h1>
        <p class="text-slate-600">60 Dakika | 40 Soru | 3 Pasaj</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg">
            <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <i class="fas fa-bolt"></i>
            </div>
            <h4 class="font-bold mb-2">Skimming</h4>
            <p class="text-xs text-slate-500 leading-relaxed">Metnin ana fikrini anlamak için hızlıca göz atma tekniği. Başlıklar ve ilk cümlelere odaklanın.</p>
        </div>
        <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg">
            <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <i class="fas fa-search"></i>
            </div>
            <h4 class="font-bold mb-2">Scanning</h4>
            <p class="text-xs text-slate-500 leading-relaxed">Tarihler, isimler veya özel terimler gibi belirli bilgileri metin içinde arama tekniği.</p>
        </div>
        <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg">
            <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <i class="fas fa-key"></i>
            </div>
            <h4 class="font-bold mb-2">Keyword Matching</h4>
            <p class="text-xs text-slate-500 leading-relaxed">Sorudaki anahtar kelimelerin metindeki eş anlamlılarını (synonyms) bulma yeteneği.</p>
        </div>
    </div>

    <div class="bg-slate-50 rounded-3xl p-8 border border-slate-200">
        <h3 class="text-xl font-bold mb-6 flex items-center gap-3">
            <i class="fas fa-list-check text-indigo-600"></i> En Yaygın Soru Tipleri
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-2xl flex items-center gap-4">
                <span class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">01</span>
                <span class="font-medium text-slate-800">True / False / Not Given</span>
            </div>
            <div class="bg-white p-4 rounded-2xl flex items-center gap-4">
                <span class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">02</span>
                <span class="font-medium text-slate-800">Matching Headings</span>
            </div>
            <div class="bg-white p-4 rounded-2xl flex items-center gap-4">
                <span class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">03</span>
                <span class="font-medium text-slate-800">Multiple Choice</span>
            </div>
            <div class="bg-white p-4 rounded-2xl flex items-center gap-4">
                <span class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">04</span>
                <span class="font-medium text-slate-800">Sentence Completion</span>
            </div>
        </div>
    </div>
</div>
`;

const ieltsWritingHTML = `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="mb-12">
        <button onclick="switchTab('ielts-overview')" class="text-indigo-600 font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-arrow-left text-xs"></i> IELTS Overview
        </button>
        <h1 class="text-4xl font-black text-slate-900 mb-4" style="font-family: 'Playfair Display', serif;">IELTS Writing Rehberi</h1>
        <p class="text-slate-600">60 Dakika | 2 Task | Akademik & Genel</p>
    </div>

    <div class="space-y-8">
        <!-- Task 1 -->
        <div class="bg-white border border-slate-100 shadow-xl rounded-[2.5rem] overflow-hidden">
            <div class="bg-orange-500 p-6 text-white flex justify-between items-center">
                <h3 class="text-xl font-bold italic">TASK 1 (Minimum 150 Kelime)</h3>
                <span class="bg-white/20 px-3 py-1 rounded-full text-xs">20 Dakika Önerilir</span>
            </div>
            <div class="p-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <h4 class="font-bold text-slate-900 mb-3 underline">Akademik: Veri Analizi</h4>
                        <p class="text-sm text-slate-500 mb-4 italic">Harita, Grafik, Tablo veya Süreç anlatımı.</p>
                        <ul class="text-xs space-y-2 text-slate-600">
                            <li><i class="fas fa-check text-green-500 mr-2"></i> <b>Introduction:</b> Soruyu başka kelimelerle ifade edin (paraphrase).</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i> <b>Overview:</b> En belirgin 2-3 trendi / ana özelliği belirtin.</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i> <b>Details:</b> Verileri karşılaştırarak detaylandırın.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-900 mb-3 underline">Genel: Mektup Yazımı</h4>
                        <p class="text-sm text-slate-500 mb-4 italic">Resmi, Yarı-Resmi veya Gayri-Resmi mektuplar.</p>
                        <ul class="text-xs space-y-2 text-slate-600">
                            <li><i class="fas fa-check text-green-500 mr-2"></i> <b>Salutation:</b> Uygun hitapla başlayın.</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i> <b>Purpose:</b> Neden yazdığınızı netleştirin.</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i> <b>Points:</b> Verilen 3 maddeyi de mutlaka kapsayın.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Task 2 -->
        <div class="bg-white border border-slate-100 shadow-xl rounded-[2.5rem] overflow-hidden">
            <div class="bg-indigo-600 p-6 text-white flex justify-between items-center">
                <h3 class="text-xl font-bold italic">TASK 2 (Minimum 250 Kelime)</h3>
                <span class="bg-white/20 px-3 py-1 rounded-full text-xs">40 Dakika Önerilir</span>
            </div>
            <div class="p-8">
                <h4 class="font-bold text-slate-900 mb-4 underline">Essay Yapısı</h4>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <div class="font-black text-indigo-600 mb-2">01</div>
                        <h5 class="font-bold text-xs mb-1">Introduction</h5>
                        <p class="text-[10px] text-slate-500">Paraphrase + Thesis Statement.</p>
                    </div>
                    <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <div class="font-black text-indigo-600 mb-2">02</div>
                        <h5 class="font-bold text-xs mb-1">Body Paragraph 1</h5>
                        <p class="text-[10px] text-slate-500">First main idea + Evidence.</p>
                    </div>
                    <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <div class="font-black text-indigo-600 mb-2">03</div>
                        <h5 class="font-bold text-xs mb-1">Body Paragraph 2</h5>
                        <p class="text-[10px] text-slate-500">Second main idea + Examples.</p>
                    </div>
                    <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <div class="font-black text-indigo-600 mb-2">04</div>
                        <h5 class="font-bold text-xs mb-1">Conclusion</h5>
                        <p class="text-[10px] text-slate-500">Summary of main points + Final thought.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

const ieltsListeningHTML = `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="mb-12">
        <button onclick="switchTab('ielts-overview')" class="text-indigo-600 font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-arrow-left text-xs"></i> IELTS Overview
        </button>
        <h1 class="text-4xl font-black text-slate-900 mb-4" style="font-family: 'Playfair Display', serif;">IELTS Listening İpuçları</h1>
        <p class="text-slate-600">30 Dakika (+10 dk Transfer) | 4 Bölüm | 40 Soru</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="bg-indigo-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden group">
            <div class="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform">
                <i class="fas fa-headphones text-9xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-4">Sınav Yapısı</h3>
            <ul class="space-y-4 text-sm text-indigo-200">
                <li><b class="text-white">Section 1:</b> Günlük hayattan iki kişi arası diyalog (örn: rezervasyon).</li>
                <li><b class="text-white">Section 2:</b> Günlük hayattan monolog (örn: müze rehberi).</li>
                <li><b class="text-white">Section 3:</b> Eğitim ortamında 2-4 kişi arası tartışma.</li>
                <li><b class="text-white">Section 4:</b> Akademik konulu ders/monolog.</li>
            </ul>
        </div>
        <div class="bg-white border border-slate-100 shadow-xl p-8 rounded-[2.5rem]">
            <h3 class="text-xl font-bold mb-6 italic">Monster Tips 🔥</h3>
            <div class="space-y-6">
                <div class="flex gap-4">
                    <div class="bg-red-50 text-red-600 p-2 rounded-lg h-fit"><i class="fas fa-spell-check text-xs"></i></div>
                    <div>
                        <h5 class="font-bold text-sm">Spelling Dikkat!</h5>
                        <p class="text-[11px] text-slate-500">Yanlış harf kullanımı soruyu tamamen yakar. İsimleri kodlarken (spelling) dikkatli dinleyin.</p>
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="bg-red-50 text-red-600 p-2 rounded-lg h-fit"><i class="fas fa-hand-pointer text-xs"></i></div>
                    <div>
                        <h5 class="font-bold text-sm">Distractors (Tuzaklar)</h5>
                        <p class="text-[11px] text-slate-500">Konuşmacı önce bir şey söyleyip sonra "Aslında hayır..." diyerek düzeltebilir. Son ana kadar bekleyin.</p>
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="bg-red-50 text-red-600 p-2 rounded-lg h-fit"><i class="fas fa-clock text-xs"></i></div>
                    <div>
                        <h5 class="font-bold text-sm">Ön Okuma (Prediction)</h5>
                        <p class="text-[11px] text-slate-500">Ses kaydı başlamadan önceki boşlukta soruları okuyun ve boşluğa gelmesi muhtemel kelime türünü (isim, sayı, tarih) tahmin edin.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

const ieltsSpeakingHTML = `
<div class="max-w-6xl mx-auto px-4 py-12">
    <div class="mb-12">
        <button onclick="switchTab('ielts-overview')" class="text-indigo-600 font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-arrow-left text-xs"></i> IELTS Overview
        </button>
        <h1 class="text-4xl font-black text-slate-900 mb-4" style="font-family: 'Playfair Display', serif;">IELTS Speaking Mülakatı</h1>
        <p class="text-slate-600">11 - 14 Dakika | 3 Bölüm | Birebir Canlı</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="bg-white p-8 border border-slate-100 rounded-3xl shadow-lg relative h-fit">
            <div class="text-4xl font-black text-indigo-50/50 absolute top-4 right-6">PART 1</div>
            <h4 class="font-bold text-indigo-900 mb-4">Introduction & General</h4>
            <p class="text-xs text-slate-500 leading-relaxed italic mb-4">Hakkında, işin, okulun veya hobilerin gibi tanıdık konularda kısa sorular.</p>
            <div class="bg-slate-50 p-4 rounded-xl text-[10px] text-slate-600 font-medium">
                "Örnek: Do you prefer to study in the morning or in the evening?"
            </div>
        </div>

        <div class="bg-indigo-600 p-8 border border-indigo-700 rounded-3xl shadow-xl relative text-white">
            <div class="text-4xl font-black text-white/10 absolute top-4 right-6">PART 2</div>
            <h4 class="font-bold mb-4">The Long Turn (Cue Card)</h4>
            <p class="text-xs text-indigo-100 leading-relaxed italic mb-6">Size bir konu kartı verilir. 1 dakika hazırlık süresinden sonra 2 dakika boyunca bu konuda konuşmanız istenir.</p>
            <div class="bg-white/10 p-4 rounded-xl text-[10px] space-y-2">
                <p class="font-bold uppercase tracking-widest text-[8px] opacity-60">Monster Stratejisi:</p>
                <p>Notlarınızı sadece anahtar kelimelerle alın. Bir hikaye anlatıyormuş gibi akıcı olun.</p>
            </div>
        </div>

        <div class="bg-white p-8 border border-slate-100 rounded-3xl shadow-lg relative h-fit">
            <div class="text-4xl font-black text-indigo-50/50 absolute top-4 right-6">PART 3</div>
            <h4 class="font-bold text-indigo-900 mb-4">Two-Way Discussion</h4>
            <p class="text-xs text-slate-500 leading-relaxed italic mb-4">Part 2 konusuyla ilgili daha soyut ve karmaşık tartışma soruları.</p>
            <div class="bg-slate-50 p-4 rounded-xl text-[10px] text-slate-600 font-medium">
                "Örnek: Why do you think some people prefer to live in urban areas instead of rural ones?"
            </div>
        </div>
    </div>
</div>
`;
