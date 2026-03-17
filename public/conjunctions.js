
const conjunctionsHTML = `

<div class="mb-6 rounded-2xl border border-purple-500/30 bg-purple-900/20 p-5 backdrop-blur">

<button onclick="this.nextElementSibling.classList.toggle('hidden')" 
class="flex justify-between items-center w-full text-left">

<span class="font-bold text-red-700 text-lg">
🔗 Conjunction Elimination Trick
</span>

<span class="text-xs text-purple-300">▼</span>
</button>

<div class="mt-4 space-y-4">

<div class="text-sm space-y-2">
<p>1️⃣ Anlam mı bağlanıyor? → Coordinating</p>
<p>2️⃣ Sebep mi? → Because / Since</p>
<p>3️⃣ Zıtlık mı? → Although / Whereas</p>
<p>4️⃣ Amaç mı? → So that</p>
<p>5️⃣ Zaman mı? → When / While</p>
</div>

<div class="mt-4">
<p class="text-xs mb-1 text-purple-300">Trap Risk</p>
<div class="w-full bg-gray-50 rounded-full h-3">
<div class="bg-purple-500 h-3 rounded-full w-[75%]"></div>
</div>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mt-4">

<div class="bg-gray-50 p-3 rounded">
<p class="font-bold text-red-400">⚠ Trap</p>
<p>Despite + noun</p>
<p>Although + clause</p>
<p>So vs So that</p>
</div>

<div class="bg-gray-50 p-3 rounded">
<p class="font-bold text-green-400">✔ Probability</p>
<p>Comma → Non-defining structure</p>
<p>Despite + gerund</p>
</div>

</div>

</div>
</div>
<!-- Action Bar (Print) -->
<div class="flex justify-end mb-4 no-print">
    <button onclick="window.print()" class="print-btn flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg active:scale-95">
        <i class="fas fa-file-pdf"></i> PDF İndir / Yazdır
    </button>
</div>

<!-- Local Search -->
<div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 no-print">
 <div class="relative w-full">
 <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
 <input type="text" onkeyup="filterTab(this)" placeholder="Bağlaç ara: although, despite, so that..." 
 class="block w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium">
 </div>
</div>

<!-- 1. TIME (ZAMAN) -->
<section class="conj-section searchable-section" data-cat="Time">
 <div class="flex items-center gap-3 mb-3 border-b border-slate-200 pb-2">
 <div class="w-8 h-8 rounded bg-cyan-100 text-cyan-600 flex items-center justify-center text-lg font-bold">⏰</div>
 <h2 class="text-xl font-bold text-slate-800 ">Time (Zaman Bağlaçları)</h2>
 </div>
 <div class="overflow-hidden bg-white rounded-lg shadow border border-slate-200 ">
 <table class="grammar-table text-left">
 <tbody class="divide-y divide-slate-100 text-sm">
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600">When</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600">-dığı zaman</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">When</span> <span class="map-tag map-2">I saw him</span>, I smiled.</div><div class="map-tr-sentence"><span class="map-tag map-2">Onu gördüğüm</span> <span class="map-tag map-1">ZAMAN</span> gülümsedim.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">While / As</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-iken (süreç)</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">While</span> <span class="map-tag map-2">I was sleeping</span>, the phone rang.</div><div class="map-tr-sentence"><span class="map-tag map-2">Uyuyor</span><span class="map-tag map-1">KEN</span> telefon çaldı.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">Just as</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Tam ...iken</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Just as</span> <span class="map-tag map-2">I was leaving</span>, he arrived.</div><div class="map-tr-sentence">Tam ben <span class="map-tag map-2">çıkıyor</span><span class="map-tag map-1">KEN</span> o geldi.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">After</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-den sonra</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">After</span> <span class="map-tag map-2">I finished work</span>, I went out.</div><div class="map-tr-sentence">İşimi <span class="map-tag map-2">bitirdik</span><span class="map-tag map-1">TEN SONRA</span> dışarı çıktım.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">Before</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-den önce</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Before</span> <span class="map-tag map-2">you speak</span>, listen.</div><div class="map-tr-sentence"><span class="map-tag map-2">Konuşmadan</span> <span class="map-tag map-1">ÖNCE</span> dinle.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">Until / Till</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-e kadar</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>Wait here <span class="map-tag map-1">until</span> <span class="map-tag map-2">I come back</span>.</div><div class="map-tr-sentence">Ben <span class="map-tag map-2">geri gelene</span> <span class="map-tag map-1">KADAR</span> burada bekle.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">By the time</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-dığı zamana kadar</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">By the time</span> <span class="map-tag map-2">we arrived</span>, the movie had started.</div><div class="map-tr-sentence">Biz <span class="map-tag map-2">varıncaya</span> <span class="map-tag map-1">KADAR</span> film başlamıştı.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">Since</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-den beri</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>I haven't eaten <span class="map-tag map-1">since</span> <span class="map-tag map-2">I woke up</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">Uyandığımdan</span> <span class="map-tag map-1">BERİ</span> yemek yemedim.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">As soon as / Once</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">...ır ...maz / -ince</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">As soon as</span> <span class="map-tag map-2">he saw me</span>, he ran away.</div><div class="map-tr-sentence">Beni <span class="map-tag map-2">görür</span> <span class="map-tag map-1">GÖRMEZ</span> kaçtı.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">The moment / The instant</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">...dığı anda</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">The moment</span> <span class="map-tag map-2">I saw it</span>, I knew.</div><div class="map-tr-sentence"><span class="map-tag map-2">Onu gördüğüm</span> <span class="map-tag map-1">ANDA</span> anladım.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">Whenever</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Her ne zaman</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Whenever</span> <span class="map-tag map-2">I go there</span>, it rains.</div><div class="map-tr-sentence">Oraya <span class="map-tag map-2">ne zaman gitsem</span> (<span class="map-tag map-1">HER NE ZAMAN</span>), yağmur yağar.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">No sooner ... than</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">Inversion</span></td><td class="p-3 text-slate-600 ">...mesiyle ...mesi bir oldu</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">No sooner had I</span> <span class="map-tag map-2">sat down</span> <span class="map-tag map-1">than</span> the bell rang.</div><div class="map-tr-sentence"><span class="map-tag map-2">Oturmamla</span> zilin çalması <span class="map-tag map-1">BİR OLDU</span>.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">Hardly ... when</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">Inversion</span></td><td class="p-3 text-slate-600 ">Tam ...yordu ki</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Hardly had we</span> <span class="map-tag map-2">started</span> <span class="map-tag map-1">when</span> the power went out.</div><div class="map-tr-sentence">Tam <span class="map-tag map-2">başlamıştık ki</span> (<span class="map-tag map-1">ZOR BELA</span>) elektrikler kesildi.</div></td></tr>
 <!-- Prepositional Time -->
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-gray-500 ">During</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">Sırasında / Boyunca</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>He slept <span class="map-tag map-1">during</span> <span class="map-tag map-2">the lesson</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">Ders</span> <span class="map-tag map-1">SIRASINDA</span> uyudu.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-gray-500 ">Prior to</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">-den önce</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Prior to</span> <span class="map-tag map-2">the meeting</span>, we had coffee.</div><div class="map-tr-sentence"><span class="map-tag map-2">Toplantıdan</span> <span class="map-tag map-1">ÖNCE</span> kahve içtik.</div></td></tr>
 </tbody>
 </table>
 </div>
</section>

<!-- 2. CONTRAST (ZITLIK) -->
<section class="conj-section searchable-section" data-cat="Contrast">
 <div class="flex items-center gap-3 mb-3 border-b border-slate-200 pb-2">
 <div class="w-8 h-8 rounded bg-rose-100 text-rose-600 flex items-center justify-center text-lg font-bold">⚖️</div>
 <h2 class="text-xl font-bold text-slate-800 ">Contrast (Zıtlık)</h2>
 </div>
 <div class="overflow-hidden bg-white rounded-lg shadow border border-slate-200 ">
 <table class="grammar-table text-left">
 <tbody class="divide-y divide-slate-100 text-sm">
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600">Although / Though</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600">-e rağmen</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Although</span> <span class="map-tag map-2">he is old</span>, he runs fast.</div><div class="map-tr-sentence"><span class="map-tag map-2">Yaşlı olması</span><span class="map-tag map-1">NA RAĞMEN</span> hızlı koşar.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">Even though</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-sa bile (vurgulu)</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Even though</span> <span class="map-tag map-2">I studied</span>, I failed.</div><div class="map-tr-sentence"><span class="map-tag map-2">Ders çalıştıysam</span> <span class="map-tag map-1">BİLE</span>, başarısız oldum.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">While / Whereas</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Oysa, -iken</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-2">Tom is rich</span>, <span class="map-tag map-1">whereas</span> <span class="map-tag map-3">Jack is poor</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">Tom zengin</span><span class="map-tag map-1">KEN (OYSA)</span>, <span class="map-tag map-3">Jack fakirdir</span>.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">Much as</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Her ne kadar...ise de</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Much as</span> <span class="map-tag map-2">I like him</span>, I can't trust him.</div><div class="map-tr-sentence">Onu <span class="map-tag map-1">HER NE KADAR</span> <span class="map-tag map-2">sevsem de</span>, ona güvenemem.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">In spite of the fact that</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">...olduğu gerçeğine rağmen</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">In spite of the fact that</span> <span class="map-tag map-2">he was ill</span>, he came.</div><div class="map-tr-sentence"><span class="map-tag map-2">Hasta olduğu</span> <span class="map-tag map-1">GERÇEĞİNE RAĞMEN</span> geldi.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">Despite / In spite of</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">-e rağmen</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Despite</span> <span class="map-tag map-2">the rain</span>, we went out.</div><div class="map-tr-sentence"><span class="map-tag map-2">Yağmur</span><span class="map-tag map-1">A RAĞMEN</span> dışarı çıktık.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">Albeit</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">Adj/Adv</span></td><td class="p-3 text-slate-600 ">...olmasına rağmen</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>He smiled, <span class="map-tag map-1">albeit</span> <span class="map-tag map-2">sadly</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">Üzgün</span> <span class="map-tag map-1">OLMASINA RAĞMEN</span> gülümsedi.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">Unlike</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">-in aksine</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Unlike</span> <span class="map-tag map-2">his father</span>, he is tall.</div><div class="map-tr-sentence"><span class="map-tag map-2">Babasının</span> <span class="map-tag map-1">AKSİNE</span>, o uzundur.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">Contrary to</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">-in tersine</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Contrary to</span> <span class="map-tag map-2">popular belief</span>, it is easy.</div><div class="map-tr-sentence"><span class="map-tag map-2">Yaygın inanışın</span> <span class="map-tag map-1">TERSİNE</span>, bu kolaydır.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">Notwithstanding</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">-e rağmen (resmi)</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Notwithstanding</span> <span class="map-tag map-2">the bad weather</span>, they departed.</div><div class="map-tr-sentence"><span class="map-tag map-2">Kötü havaya</span> <span class="map-tag map-1">RAĞMEN</span> yola çıktılar.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">However</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 ">Ancak, ama</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>It is hard; <span class="map-tag map-1">however</span>, it is possible.</div><div class="map-tr-sentence">Zordur; <span class="map-tag map-1">ANCAK</span> mümkündür.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">Nevertheless / Nonetheless</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 ">Yine de, buna rağmen</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>He made mistakes; <span class="map-tag map-1">nevertheless</span>, he won.</div><div class="map-tr-sentence">Hatalar yaptı; <span class="map-tag map-1">YİNE DE</span> kazandı.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">On the other hand</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 ">Öte yandan</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>City life is fast; <span class="map-tag map-1">on the other hand</span>, it's noisy.</div><div class="map-tr-sentence">Şehir hayatı hızlıdır; <span class="map-tag map-1">ÖTE YANDAN</span> gürültülüdür.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">Conversely</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 ">Aksine</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>The North is rich; <span class="map-tag map-1">conversely</span>, the South is poor.</div><div class="map-tr-sentence">Kuzey zengindir; <span class="map-tag map-1">AKSİNE</span> Güney fakirdir.</div></td></tr>
 </tbody>
 </table>
 </div>
</section>

<!-- 3. CAUSE (SEBEP) -->
<section class="conj-section searchable-section" data-cat="Cause">
 <div class="flex items-center gap-3 mb-3 border-b border-slate-200 pb-2">
 <div class="w-8 h-8 rounded bg-amber-100 text-amber-600 flex items-center justify-center text-lg font-bold">❓</div>
 <h2 class="text-xl font-bold text-slate-800 ">Cause & Reason (Sebep)</h2>
 </div>
 <div class="overflow-hidden bg-white rounded-lg shadow border border-slate-200 ">
 <table class="grammar-table text-left">
 <tbody class="divide-y divide-slate-100 text-sm">
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-amber-600">Because / As / Since</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600">Çünkü, -dığı için</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>I left <span class="map-tag map-1">because</span> <span class="map-tag map-2">I was bored</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">Sıkıldığım</span> <span class="map-tag map-1">İÇİN</span> ayrıldım.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-amber-600 ">In that</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-mesi bakımından</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>It is a unique gas <span class="map-tag map-1">in that</span> <span class="map-tag map-2">it is odorless</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">Kokusuz olması</span> <span class="map-tag map-1">BAKIMINDAN</span> benzersiz bir gazdır.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-amber-600 ">Now that</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Mademki, artık ...dığına göre</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Now that</span> <span class="map-tag map-2">exams are over</span>, we can party.</div><div class="map-tr-sentence"><span class="map-tag map-1">Mademki</span> <span class="map-tag map-2">sınavlar bitti</span>, parti yapabiliriz.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-amber-600 ">Seeing that / Given that</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Mademki, göz önüne alınırsa</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Seeing that</span> <span class="map-tag map-2">he is ill</span>, we should help.</div><div class="map-tr-sentence"><span class="map-tag map-2">Hasta olduğu</span> <span class="map-tag map-1">GÖZ ÖNÜNE ALINIRSA</span>, yardım etmeliyiz.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-amber-600 ">Inasmuch as</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-dığı için (resmi)</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Inasmuch as</span> <span class="map-tag map-2">the budget is low</span>, we can't buy it.</div><div class="map-tr-sentence"><span class="map-tag map-2">Bütçe düşük olduğu</span> <span class="map-tag map-1">İÇİN</span> onu alamayız.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-amber-600 ">On the grounds that</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">...gerekçesiyle</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>He was fired <span class="map-tag map-1">on the grounds that</span> <span class="map-tag map-2">he was lazy</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">Tembel olduğu</span> <span class="map-tag map-1">GEREKÇESİYLE</span> kovuldu.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-amber-600 ">Because of / Due to / Owing to</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">...nedeniyle</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Due to</span> <span class="map-tag map-2">the storm</span>, flights were cancelled.</div><div class="map-tr-sentence"><span class="map-tag map-2">Fırtına</span> <span class="map-tag map-1">NEDENİYLE</span> uçuşlar iptal edildi.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-amber-600 ">Thanks to</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">Sayesinde</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Thanks to</span> <span class="map-tag map-2">your help</span>, I passed.</div><div class="map-tr-sentence"><span class="map-tag map-2">Yardımın</span> <span class="map-tag map-1">SAYESİNDE</span> geçtim.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-amber-600 ">As a result of</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">...sonucunda</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>He died <span class="map-tag map-1">as a result of</span> <span class="map-tag map-2">the crash</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">Kaza</span> <span class="map-tag map-1">SONUCUNDA</span> öldü.</div></td></tr>
 </tbody>
 </table>
 </div>
</section>

 <!-- 4. CONDITION (KOŞUL) -->
 <section class="conj-section searchable-section" data-cat="Condition">
 <div class="flex items-center gap-3 mb-3 border-b border-slate-200 pb-2">
 <div class="w-8 h-8 rounded bg-violet-100 text-violet-600 flex items-center justify-center text-lg font-bold">🔀</div>
 <h2 class="text-xl font-bold text-slate-800 ">Condition (Koşul)</h2>
 </div>
 <div class="overflow-hidden bg-white rounded-lg shadow border border-slate-200 ">
 <table class="grammar-table text-left">
 <tbody class="divide-y divide-slate-100 text-sm">
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600">If</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600">Eğer</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">If</span> <span class="map-tag map-2">you study</span>, you pass.</div><div class="map-tr-sentence"><span class="map-tag map-2">Ders çalışırsan</span> (<span class="map-tag map-1">SE</span>), geçersin.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">Unless</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-medikçe (if not)</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Unless</span> <span class="map-tag map-2">you run</span>, you will be late.</div><div class="map-tr-sentence"><span class="map-tag map-2">Koş</span><span class="map-tag map-1">MADIKÇA</span> geç kalacaksın.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">Provided that / Providing</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">...şartıyla</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>I will go <span class="map-tag map-1">provided that</span> <span class="map-tag map-2">you drive</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">Sen sürmen</span> <span class="map-tag map-1">ŞARTIYLA</span> gideceğim.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">As long as / So long as</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">...sürece</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">As long as</span> <span class="map-tag map-2">you are honest</span>, I trust you.</div><div class="map-tr-sentence"><span class="map-tag map-2">Dürüst olduğun</span> <span class="map-tag map-1">SÜRECE</span> sana güvenirim.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">In case</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">...olur diye (tedbir)</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>Take a key <span class="map-tag map-1">in case</span> <span class="map-tag map-2">I am out</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">Dışarıda olurum</span> <span class="map-tag map-1">DİYE</span> bir anahtar al.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">Only if</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Ancak eğer</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Only if</span> <span class="map-tag map-2">you ask</span>, I will help.</div><div class="map-tr-sentence"><span class="map-tag map-1">ANCAK EĞER</span> <span class="map-tag map-2">sorarsan</span> yardım ederim.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">Suppose / Supposing / Assuming</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Varsayalım ki</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Supposing</span> <span class="map-tag map-2">you won</span>, what would you do?</div><div class="map-tr-sentence"><span class="map-tag map-1">Varsayalım ki</span> <span class="map-tag map-2">kazandın</span>, ne yapardın?</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">Even if</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-sa bile</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Even if</span> <span class="map-tag map-2">I run</span>, I will be late.</div><div class="map-tr-sentence"><span class="map-tag map-2">Koşsam</span> <span class="map-tag map-1">BİLE</span> geç kalacağım.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">Whether or not</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Olsa da olmasa da</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>I will go <span class="map-tag map-1">whether</span> you like it <span class="map-tag map-1">or not</span>.</div><div class="map-tr-sentence">Hoşuna <span class="map-tag map-1">gitse de gitmese de</span> gideceğim.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">Without</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">-siz / -sız</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>We cannot live <span class="map-tag map-1">without</span> <span class="map-tag map-2">water</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">Su</span><span class="map-tag map-1">SUZ</span> yaşayamayız.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">But for</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">Olmasaydı</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">But for</span> <span class="map-tag map-2">your help</span>, I would have failed.</div><div class="map-tr-sentence"><span class="map-tag map-2">Yardımın</span> <span class="map-tag map-1">OLMASAYDI</span> başarısız olurdum.</div></td></tr>
 </tbody>
 </table>
 </div>
</section>

 <!-- 5. PURPOSE (AMAÇ) -->
 <section class="conj-section searchable-section" data-cat="Purpose">
 <div class="flex items-center gap-3 mb-3 border-b border-slate-200 pb-2">
 <div class="w-8 h-8 rounded bg-pink-100 text-pink-600 flex items-center justify-center text-lg font-bold">🎯</div>
 <h2 class="text-xl font-bold text-slate-800 ">Purpose (Amaç)</h2>
 </div>
 <div class="overflow-hidden bg-white rounded-lg shadow border border-slate-200 ">
 <table class="grammar-table text-left">
 <tbody class="divide-y divide-slate-100 text-sm">
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-pink-600">So that / In order that</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600">-sın diye</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>I work hard <span class="map-tag map-1">so that</span> <span class="map-tag map-2">I can retire early</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">Erken emekli olabilmek</span> <span class="map-tag map-1">İÇİN</span> (veya <span class="map-tag map-1">SIN DİYE</span>) sıkı çalışıyorum.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-pink-600 ">Lest / For fear that</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-mesin diye, korkusuyla</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>He ran <span class="map-tag map-1">lest</span> <span class="map-tag map-2">he be caught</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">Yakalanmasın</span> <span class="map-tag map-1">DİYE</span> koştu.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-pink-600 ">In order to / So as to / To</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+V1</span></td><td class="p-3 text-slate-600 ">-mek için</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>He went to London <span class="map-tag map-1">to</span> <span class="map-tag map-2">learn English</span>.</div><div class="map-tr-sentence">İngilizce <span class="map-tag map-2">öğrenmek</span> <span class="map-tag map-1">İÇİN</span> Londra'ya gitti.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-pink-600 ">With a view to / With the aim of</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Ving</span></td><td class="p-3 text-slate-600 ">...amacıyla</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>He saves money <span class="map-tag map-1">with a view to</span> <span class="map-tag map-2">buying a car</span>.</div><div class="map-tr-sentence">Araba <span class="map-tag map-2">satın alma</span> <span class="map-tag map-1">AMACIYLA</span> para biriktiriyor.</div></td></tr>
 </tbody>
 </table>
 </div>
</section>

 <!-- 6. RESULT (SONUÇ) -->
 <section class="conj-section searchable-section" data-cat="Result">
 <div class="flex items-center gap-3 mb-3 border-b border-slate-200 pb-2">
 <div class="w-8 h-8 rounded bg-blue-100 text-black flex items-center justify-center text-lg font-bold">➡️</div>
 <h2 class="text-xl font-bold text-slate-800 ">Result (Sonuç)</h2>
 </div>
 <div class="overflow-hidden bg-white rounded-lg shadow border border-slate-200 ">
 <table class="grammar-table text-left">
 <tbody class="divide-y divide-slate-100 text-sm">
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-black">Therefore / Thus / Hence</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600">Bu yüzden</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>I think; <span class="map-tag map-1">therefore</span>, I am.</div><div class="map-tr-sentence">Düşünüyorum; <span class="map-tag map-1">BU YÜZDEN</span> varım.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-black ">So</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">Conj</span></td><td class="p-3 text-slate-600 ">Bu yüzden</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>It was cold, <span class="map-tag map-1">so</span> I wore a coat.</div><div class="map-tr-sentence">Hava soğuktu, <span class="map-tag map-1">BU YÜZDEN</span> palto giydim.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-black ">Consequently / As a result</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 ">Sonuç olarak</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>He overslept; <span class="map-tag map-1">consequently</span>, he was late.</div><div class="map-tr-sentence">Fazla uyudu; <span class="map-tag map-1">SONUÇ OLARAK</span> geç kaldı.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-black ">Accordingly</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 ">Bu doğrultuda</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>The rules changed; <span class="map-tag map-1">accordingly</span>, we adapted.</div><div class="map-tr-sentence">Kurallar değişti; <span class="map-tag map-1">BU DOĞRULTUDA</span> uyum sağladık.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-black ">Thereby</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Ving</span></td><td class="p-3 text-slate-600 ">Böylece, dolayısıyla</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>He signed the treaty, <span class="map-tag map-1">thereby</span> <span class="map-tag map-2">ending the war</span>.</div><div class="map-tr-sentence">Anlaşmayı imzaladı, <span class="map-tag map-1">BÖYLECE</span> <span class="map-tag map-2">savaşı bitirdi</span>.</div></td></tr>
 </tbody>
 </table>
 </div>
</section>

 <!-- 7. ADDITION (EKLEME) -->
 <section class="conj-section searchable-section" data-cat="Addition">
 <div class="flex items-center gap-3 mb-3 border-b border-slate-200 pb-2">
 <div class="w-8 h-8 rounded bg-emerald-100 text-red-800 flex items-center justify-center text-lg font-bold">➕</div>
 <h2 class="text-xl font-bold text-slate-800 ">Addition (Ekleme)</h2>
 </div>
 <div class="overflow-hidden bg-white rounded-lg shadow border border-slate-200 ">
 <table class="grammar-table text-left">
 <tbody class="divide-y divide-slate-100 text-sm">
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-red-800">Moreover / Furthermore</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600">Dahası, ayrıca</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>The house is beautiful; <span class="map-tag map-1">moreover</span>, it is cheap.</div><div class="map-tr-sentence">Ev güzeldir; <span class="map-tag map-1">DAHASI</span> ucuzdur.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-red-800 ">In addition / Besides</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 ">Buna ek olarak</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>I am tired. <span class="map-tag map-1">In addition</span>, I am hungry.</div><div class="map-tr-sentence">Yorgunum. <span class="map-tag map-1">BUNA EK OLARAK</span> açım.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-red-800 ">Also</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 ">Ayrıca</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>She sings; she <span class="map-tag map-1">also</span> plays piano.</div><div class="map-tr-sentence">Şarkı söyler; <span class="map-tag map-1">AYRICA</span> piyano çalar.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-red-800 ">Not only...but also</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">Pair</span></td><td class="p-3 text-slate-600 ">Sadece...değil, aynı zamanda</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>He is <span class="map-tag map-1">not only</span> <span class="map-tag map-2">smart</span> <span class="map-tag map-1">but also</span> <span class="map-tag map-3">funny</span>.</div><div class="map-tr-sentence">O <span class="map-tag map-1">sadece</span> <span class="map-tag map-2">zeki</span> <span class="map-tag map-1">değil</span> <span class="map-tag map-1">aynı zamanda</span> <span class="map-tag map-3">komiktir</span>.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-red-800 ">In addition to / Besides</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">...nın yanısıra</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Besides</span> <span class="map-tag map-2">English</span>, he speaks French.</div><div class="map-tr-sentence"><span class="map-tag map-2">İngilizce</span><span class="map-tag map-1">'nin YANISIRA</span> Fransızca konuşur.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-red-800 ">As well as</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">...kadar / yanısıra</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>She invited Tom <span class="map-tag map-1">as well as</span> <span class="map-tag map-2">John</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">John</span><span class="map-tag map-1">'un YANISIRA</span> Tom'u da davet etti.</div></td></tr>
 </tbody>
 </table>
 </div>
</section>

 <!-- 8. MANNER & PLACE (YENİ) -->
 <section class="conj-section searchable-section" data-cat="Manner">
 <div class="flex items-center gap-3 mb-3 border-b border-slate-200 pb-2">
 <div class="w-8 h-8 rounded bg-orange-100 text-orange-600 flex items-center justify-center text-lg font-bold">🎭</div>
 <h2 class="text-xl font-bold text-slate-800 ">Manner & Place (Tarz & Yer)</h2>
 </div>
 <div class="overflow-hidden bg-white rounded-lg shadow border border-slate-200 ">
 <table class="grammar-table text-left">
 <tbody class="divide-y divide-slate-100 text-sm">
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-orange-600">As if / As though</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600">Sanki ...mış gibi</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>He talks <span class="map-tag map-1">as if</span> <span class="map-tag map-2">he knows</span> everything.</div><div class="map-tr-sentence">Her şeyi <span class="map-tag map-2">biliyor</span><span class="map-tag map-1">MUŞ GİBİ</span> konuşuyor.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-orange-600 ">Just as</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Tıpkı ...gibi</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Just as</span> <span class="map-tag map-2">I thought</span>, he is late.</div><div class="map-tr-sentence"><span class="map-tag map-1">Tıpkı</span> <span class="map-tag map-2">düşündüğüm gibi</span>, o geç kaldı.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-orange-600 ">Where</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">...dığı yerde</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>Stay <span class="map-tag map-1">where</span> <span class="map-tag map-2">you are</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">Olduğun</span> <span class="map-tag map-1">YERDE</span> kal.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-orange-600 ">Wherever</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Her nerede</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Wherever</span> <span class="map-tag map-2">you go</span>, I will find you.</div><div class="map-tr-sentence"><span class="map-tag map-2">Nereye gidersen</span> <span class="map-tag map-1">GİT (HER NEREYE)</span>, seni bulacağım.</div></td></tr>
 </tbody>
 </table>
 </div>
</section>

 <!-- 9. MISC -->
 <section class="conj-section searchable-section" data-cat="Misc">
 <div class="flex items-center gap-3 mb-3 border-b border-slate-200 pb-2">
 <div class="w-8 h-8 rounded bg-gray-200 text-gray-600 flex items-center justify-center text-lg font-bold">📦</div>
 <h2 class="text-xl font-bold text-slate-800 ">Misc / Prepositional Phrases</h2>
 </div>
 <div class="overflow-hidden bg-white rounded-lg shadow border border-slate-200 ">
 <table class="grammar-table text-left">
 <tbody class="divide-y divide-slate-100 text-sm">
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-slate-600">Regardless of</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600">-e bakılmaksızın</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>We will go <span class="map-tag map-1">regardless of</span> <span class="map-tag map-2">the cost</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">Maliyete</span> <span class="map-tag map-1">BAKILMAKSIZIN</span> gideceğiz.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-slate-600 ">In terms of</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">-açısından</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>It is good <span class="map-tag map-1">in terms of</span> <span class="map-tag map-2">quality</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">Kalite</span> <span class="map-tag map-1">AÇISINDAN</span> iyidir.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-slate-600 ">With regard to / As to</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">...ile ilgili olarak</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">With regard to</span> <span class="map-tag map-2">your request</span>, the answer is no.</div><div class="map-tr-sentence"><span class="map-tag map-2">İsteğiniz</span><span class="map-tag map-1">LE İLGİLİ OLARAK</span>, cevap hayır.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-slate-600 ">Instead of</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">...yerine</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>Use <span class="map-tag map-2">milk</span> <span class="map-tag map-1">instead of</span> water.</div><div class="map-tr-sentence">Su <span class="map-tag map-1">YERİNE</span> <span class="map-tag map-2">süt</span> kullanın.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-slate-600 ">Apart from / Except for</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">...dışında, hariç</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div>Everyone came <span class="map-tag map-1">except for</span> <span class="map-tag map-2">John</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">John</span> <span class="map-tag map-1">HARİÇ</span> herkes geldi.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-slate-600 ">According to</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">-e göre</td><td class="p-3 group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">According to</span> <span class="map-tag map-2">the news</span>, it will snow.</div><div class="map-tr-sentence"><span class="map-tag map-2">Haberlere</span> <span class="map-tag map-1">GÖRE</span> kar yağacak.</div></td></tr>
 </tbody>
 </table>
 </div>
</section>
`;
document.getElementById('tab-conjunctions').innerHTML = conjunctionsHTML;