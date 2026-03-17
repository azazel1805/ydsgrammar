
const quantifiersHTML = `
<!-- Action Bar (Print) -->
<div class="flex justify-end mb-4 no-print relative z-50">
    <button onclick="window.print()" class="print-btn flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg active:scale-95">
        <i class="fas fa-file-pdf"></i> PDF İndir / Yazdır
    </button>
</div>

<div class="space-y-10 max-w-5xl mx-auto px-4 py-8">
    <!-- Header Section -->
    <div class="text-center space-y-4">
        <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900" style="font-family: 'Playfair Display', serif;">Quantifiers (Miktar Belirleyiciler)</h1>
        <p class="text-lg text-slate-500 max-w-2xl mx-auto italic">Nouns (İsimler) ile birlikte miktar bildiren tüm yapılar: Many, Much, Few, Little ve ötesi...</p>
        <div class="h-1 w-24 bg-red-800 mx-auto rounded-full"></div>
    </div>

    <!-- 1. THE FOUNDATION: COUNTABLE VS UNCOUNTABLE -->
    <section class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div class="bg-slate-900 p-6 text-white">
            <h2 class="text-2xl font-bold flex items-center gap-3">
                <i class="fas fa-layer-group text-emerald-400"></i> Temel Ayrım: Sayılabilen & Sayılamayan
            </h2>
        </div>
        <div class="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Countable -->
            <div class="space-y-4">
                <div class="flex items-center gap-3 text-emerald-700 font-bold text-lg border-b border-emerald-100 pb-2">
                    <i class="fas fa-check-circle"></i> Countable (Sayılabilen)
                </div>
                <p class="text-slate-600 text-sm">Tane tane sayabildiğimiz, sonuna -s takısı alıp çoğul olabilen isimler.</p>
                <div class="bg-emerald-50 rounded-xl p-4 flex flex-wrap gap-2 text-emerald-800 font-medium text-xs">
                    <span>Books</span> • <span>Cars</span> • <span>People</span> • <span>City</span> • <span>Idea</span>
                </div>
                <ul class="space-y-2 text-sm text-slate-700">
                    <li><strong class="text-red-800">• Many:</strong> Çok</li>
                    <li><strong class="text-red-800">• A few / Few:</strong> Birkaç / Az</li>
                    <li><strong class="text-red-800">• A number of:</strong> Birçok</li>
                </ul>
            </div>

            <!-- Uncountable -->
            <div class="space-y-4 border-t md:border-t-0 md:border-l border-slate-100 md:pl-8">
                <div class="flex items-center gap-3 text-amber-700 font-bold text-lg border-b border-amber-100 pb-2">
                    <i class="fas fa-tint"></i> Uncountable (Sayılamayan)
                </div>
                <p class="text-slate-600 text-sm">Sıvılar, kavramlar, kütleler veya -s takısı almayan, her zaman tekil fiil alan isimler.</p>
                <div class="bg-amber-50 rounded-xl p-4 flex flex-wrap gap-2 text-amber-800 font-medium text-xs">
                    <span>Water</span> • <span>Money</span> • <span>Knowledge</span> • <span>Advice</span> • <span>Homework</span>
                </div>
                <ul class="space-y-2 text-sm text-slate-700">
                    <li><strong class="text-red-800">• Much:</strong> Çok</li>
                    <li><strong class="text-red-800">• A little / Little:</strong> Biraz / Az</li>
                    <li><strong class="text-red-800">• An amount of:</strong> Bir miktar</li>
                </ul>
            </div>
        </div>
    </section>

    <!-- 2. TRAP ALERT: A FEW vs FEW / A LITTLE vs LITTLE -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-rose-50 border border-rose-200 rounded-3xl p-8 relative overflow-hidden group">
            <i class="fas fa-ghost absolute -right-4 -bottom-4 text-9xl text-rose-100 transition-transform group-hover:scale-110"></i>
            <h3 class="text-2xl font-bold text-rose-900 mb-6 flex items-center gap-2">
                <i class="fas fa-skull-crossbones"></i> YDS Sınav Tuzağı: "A" Farkı!
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div class="space-y-4">
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-rose-100">
                        <span class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase mb-2 inline-block">Olumlu (+)</span>
                        <h4 class="font-black text-xl text-slate-800 italic">A few / A little</h4>
                        <p class="text-sm text-slate-600">"Biraz var, bana yeter." (Az ama kafi)</p>
                        <div class="text-[11px] font-bold">
                            <div>Ex: I have <span class="map-tag map-1">a little</span> money.</div>
                            <div class="map-tr-sentence">(Kahve alabilirim; <span class="map-tag map-1">biraz</span> param var.)</div>
                        </div>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-rose-100 font-bold">
                        <span class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase mb-2 inline-block">Olumsuz (-)</span>
                        <h4 class="font-black text-xl text-slate-800 italic">Few / Little</h4>
                        <p class="text-sm text-slate-600">"Neredeyse hiç yok." (Yetersiz, olumsuz hava)</p>
                        <div class="text-[11px] font-bold">
                            <div>Ex: I have <span class="map-tag map-1">little</span> money.</div>
                            <div class="map-tr-sentence">(Aç kalacağım; <span class="map-tag map-1">neredeyse hiç</span> param yok.)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-center text-center">
            <div class="text-amber-400 text-4xl mb-4"><i class="fas fa-bolt"></i></div>
            <h3 class="text-xl font-bold mb-2 italic">Quick Tip</h3>
            <p class="text-slate-400 text-sm leading-relaxed">
                Her ikisine de uyum sağlayan "Bukalemun" yapılar:<br>
                <span class="text-emerald-400 font-bold italic text-lg">A lot of / Some / Any / Plenty of</span><br>
                Hem sayılan hem sayılamayanla kullanılır!
            </p>
        </div>
    </section>

    <!-- 3. DETAILED MATRIX -->
    <section class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div class="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <h2 class="text-xl font-bold text-slate-800">Quantifier Usage Matrix</h2>
            <div class="flex gap-2">
                <span class="w-3 h-3 rounded-full bg-red-400"></span>
                <span class="w-3 h-3 rounded-full bg-amber-400"></span>
                <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
            </div>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead class="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                    <tr>
                        <th class="p-6">Quantifier</th>
                        <th class="p-6">Count. Status</th>
                        <th class="p-6">Sentence Type</th>
                        <th class="p-6">Nuance / Rule</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-sm">
                    <!-- SOME -->
                    <tr class="hover:bg-slate-50 transition-colors">
                        <td class="p-6 font-bold text-slate-900 italic text-lg">Some</td>
                        <td class="p-6"><span class="bg-slate-100 px-2 py-1 rounded text-[10px]">C & U</span></td>
                        <td class="p-6"><span class="text-emerald-600 font-bold">Affirmative</span></td>
                        <td class="p-6 text-slate-500 italic">Soru içinde sadece "teklif/istek" (-Would you like some?-) ise gelir.</td>
                    </tr>
                    <!-- ANY -->
                    <tr class="hover:bg-slate-50 transition-colors">
                        <td class="p-6 font-bold text-slate-900 italic text-lg">Any</td>
                        <td class="p-6"><span class="bg-slate-100 px-2 py-1 rounded text-[10px]">C & U</span></td>
                        <td class="p-6"><span class="text-red-600 font-bold">Neg. / Question</span></td>
                        <td class="p-6 text-slate-500 italic">Olumlu cümlede "fark etmez / herhangi" (Pick any book) anlamındadır.</td>
                    </tr>
                    <!-- SEVERAL -->
                    <tr class="hover:bg-slate-50 transition-colors">
                        <td class="p-6 font-bold text-slate-900 italic text-lg">Several</td>
                        <td class="p-6 text-emerald-600 font-black">C only</td>
                        <td class="p-6 text-slate-400 font-medium italic">Affirmative</td>
                        <td class="p-6 text-slate-500 italic">"Birkaç tane." A few'dan bir tık daha fazla vurgusu yapar.</td>
                    </tr>
                    <!-- MUCH / MANY -->
                    <tr class="hover:bg-slate-50 transition-colors">
                        <td class="p-6 font-bold text-slate-900 italic text-lg">Much / Many</td>
                        <td class="p-6"><span class="text-emerald-600 font-bold">M:C</span> / <span class="text-amber-600 font-bold">Mu:U</span></td>
                        <td class="p-6 text-red-600 font-bold italic text-xs">Neg. / Interrog.</td>
                        <td class="p-6 text-slate-500 italic font-medium">Olumlu cümlede "A lot of" daha yaygındır ama akademik dilde kullanılır.</td>
                    </tr>
                    <!-- EACH / EVERY -->
                    <tr class="hover:bg-slate-50 transition-colors">
                        <td class="p-6 font-bold text-slate-900 italic text-lg">Each / Every</td>
                        <td class="p-6 text-emerald-600 font-black italic">C (Singular)</td>
                        <td class="p-6 text-slate-400 font-medium italic">General</td>
                        <td class="p-6 text-slate-500 italic font-medium">
                            <div>Her zaman TEKİL isim ve TEKİL fiil alırlar.</div>
                            <div class="font-bold underline">Wait for <span class="map-tag map-1">each</span> <span class="map-tag map-2">student</span>!</div>
                            <div class="map-tr-sentence"><span class="map-tag map-1">Her bir</span> <span class="map-tag map-2">öğrenci</span>yi bekle!</div>
                        </td>
                    </tr>
                     <!-- ENOUGH -->
                     <tr class="hover:bg-slate-50 transition-colors">
                        <td class="p-6 font-bold text-slate-900 italic text-lg">Enough</td>
                        <td class="p-6"><span class="bg-slate-100 px-2 py-1 rounded text-[10px]">C & U</span></td>
                        <td class="p-6 text-slate-400 font-medium italic italic">General</td>
                        <td class="p-6 text-slate-500 italic font-medium">İsimden önce (enough money), Sıfattan sonra (rich enough) gelir.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <!-- 4. COMPARATIVE QUANTIFIERS -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-slate-100 rounded-3xl p-8 border border-slate-200">
            <h3 class="text-xl font-black text-slate-900 mb-4 flex items-center gap-2 italic uppercase tracking-tighter">
                <i class="fas fa-balance-scale"></i> Miktar Karşılaştırması
            </h3>
            <div class="space-y-4 text-sm font-medium">
                <div class="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                    <span class="text-emerald-700">More (C & U)</span>
                    <span class="text-slate-400 italic">Daha fazla</span>
                </div>
                <div class="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm shadow-red-50">
                    <span class="text-red-700 font-black italic underline decoration-red-200">Fewer (C)</span>
                    <span class="text-slate-400 italic">Daha az (Sayılabilen)</span>
                </div>
                <div class="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm shadow-amber-50">
                    <span class="text-amber-700 font-black italic underline decoration-amber-200">Less (U)</span>
                    <span class="text-slate-400 italic">Daha az (Sayılamayan)</span>
                </div>
            </div>
            <div class="mt-6 p-4 bg-red-800 text-white rounded-2xl text-[10px] italic leading-tight uppercase font-bold tracking-widest">
                YDS Not: "Fewer" yerine konuşma dilinde "Less" kullanılsa da sınavda bu ayrım altın kuraldır.
            </div>
        </div>

        <!-- 5. PAIRS: BOTH, EITHER, NEITHER -->
        <div class="bg-indigo-950 rounded-3xl p-8 text-white relative h-full">
            <h3 class="text-xl font-bold mb-6 italic underline decoration-indigo-400 decoration-4">The Power of Pairs (İkililer)</h3>
            <div class="space-y-4">
                <div class="flex gap-4">
                    <div class="font-black text-indigo-400 text-lg">Both</div>
                    <div class="text-sm">Her ikisi de. (+) <br><span class="text-xs text-slate-400 italic">Take both books.</span></div>
                </div>
                <div class="flex gap-4">
                    <div class="font-black text-indigo-400 text-lg italic">Either</div>
                    <div class="text-sm">İkisinden biri. (Ya o ya o) <br><span class="text-xs text-slate-400 italic italic">Any either choice is fine.</span></div>
                </div>
                <div class="flex gap-4">
                    <div class="font-black text-indigo-300 text-lg italic line-through">Neither</div>
                    <div class="text-xs">
                        <div><span class="map-tag map-1">Neither</span> plan worked.</div>
                        <div class="map-tr-sentence"><span class="map-tag map-1">İki</span> plan <span class="map-tag map-1">da</span> <span class="map-tag map-1">işe yaramadı</span>.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

window.quantifiersHTML = quantifiersHTML;
