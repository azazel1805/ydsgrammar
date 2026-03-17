
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
 <table class="w-full text-left border-collapse">
 <tbody class="divide-y divide-slate-100 text-sm">
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 w-1/4">When</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 w-1/4">-dığı zaman</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">When</span> <span class="map-tag map-2">I saw him</span>, I smiled.</div><div class="map-tr-sentence"><span class="map-tag map-2">Onu gördüğüm</span> <span class="map-tag map-1">ZAMAN</span> gülümsedim.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">While / As</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-iken (süreç)</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">While</span> <span class="map-tag map-2">I was sleeping</span>, the phone rang.</div><div class="map-tr-sentence"><span class="map-tag map-2">Uyuyor</span><span class="map-tag map-1">KEN</span> telefon çaldı.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">Just as</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Tam ...iken</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Just as I was leaving, he arrived. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">After</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-den sonra</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">After I finished work, I went out. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">Before</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-den önce</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Before you speak, listen. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">Until / Till</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-e kadar</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Wait here until I come back. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">By the time</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-dığı zamana kadar</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">By the time we arrived, the movie had started. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">Since</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-den beri</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">I haven't eaten since I woke up. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">As soon as / Once</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">...ır ...maz / -ince</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">As soon as he saw me, he ran away. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">The moment / The instant</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">...dığı anda</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">The moment I saw it, I knew. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">Whenever</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Her ne zaman</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Whenever I go there, it rains. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">No sooner ... than</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">Inversion</span></td><td class="p-3 text-slate-600 ">...mesiyle ...mesi bir oldu</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">No sooner had I sat down than the bell rang. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-cyan-600 ">Hardly ... when</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">Inversion</span></td><td class="p-3 text-slate-600 ">Tam ...yordu ki</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Hardly had we started when the power went out. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <!-- Prepositional Time -->
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-gray-500 ">During</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">Sırasında / Boyunca</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He slept during the lesson. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-gray-500 ">Prior to</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">-den önce</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Prior to the meeting, we had coffee. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
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
 <table class="w-full text-left border-collapse">
 <tbody class="divide-y divide-slate-100 text-sm">
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 w-1/4">Although / Though</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 w-1/4">-e rağmen</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Although</span> <span class="map-tag map-2">he is old</span>, he runs fast.</div><div class="map-tr-sentence"><span class="map-tag map-2">Yaşlı olması</span><span class="map-tag map-1">NA RAĞMEN</span> hızlı koşar.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">Even though</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-sa bile (vurgulu)</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Even though I studied, I failed. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">While / Whereas</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Oysa, -iken</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Tom is rich, whereas Jack is poor. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">Much as</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Her ne kadar...ise de</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Much as I like him, I can't trust him. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">In spite of the fact that</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">...olduğu gerçeğine rağmen</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">In spite of the fact that he was ill, he came. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">Despite / In spite of</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">-e rağmen</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Despite</span> <span class="map-tag map-2">the rain</span>, we went out.</div><div class="map-tr-sentence"><span class="map-tag map-2">Yağmur</span><span class="map-tag map-1">A RAĞMEN</span> dışarı çıktık.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">Albeit</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">Adj/Adv</span></td><td class="p-3 text-slate-600 ">...olmasına rağmen</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He smiled, albeit sadly. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">Unlike</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">-in aksine</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Unlike his father, he is tall. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">Contrary to</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">-in tersine</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Contrary to popular belief, it is easy. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">Notwithstanding</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">-e rağmen (resmi)</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Notwithstanding the bad weather, they departed. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">However</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 ">Ancak, ama</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">It is hard; however, it is possible. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">Nevertheless / Nonetheless</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 ">Yine de, buna rağmen</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He made mistakes; nevertheless, he won. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">On the other hand</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 ">Öte yandan</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">City life is fast; on the other hand, it's noisy. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-rose-600 ">Conversely</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 ">Aksine</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">The North is rich; conversely, the South is poor. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
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
 <table class="w-full text-left border-collapse">
 <tbody class="divide-y divide-slate-100 text-sm">
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-amber-600 w-1/4">Because / As / Since</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 w-1/4">Çünkü, -dığı için</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)"><div>I left <span class="map-tag map-1">because</span> <span class="map-tag map-2">I was bored</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">Sıkıldığım</span> <span class="map-tag map-1">İÇİN</span> ayrıldım.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-amber-600 ">In that</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-mesi bakımından</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">It is a unique gas in that it is odorless. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-amber-600 ">Now that</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Mademki, artık ...dığına göre</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Now that exams are over, we can party. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-amber-600 ">Seeing that / Given that</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Mademki, göz önüne alınırsa</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Seeing that he is ill, we should help. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-amber-600 ">Inasmuch as</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-dığı için (resmi)</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Inasmuch as the budget is low, we can't buy it. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-amber-600 ">On the grounds that</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">...gerekçesiyle</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He was fired on the grounds that he was lazy. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-amber-600 ">Because of / Due to / Owing to</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">...nedeniyle</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Due to</span> <span class="map-tag map-2">the storm</span>, flights were cancelled.</div><div class="map-tr-sentence"><span class="map-tag map-2">Fırtına</span> <span class="map-tag map-1">NEDENİYLE</span> uçuşlar iptal edildi.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-amber-600 ">Thanks to</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">Sayesinde</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Thanks to your help, I passed. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-amber-600 ">As a result of</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">...sonucunda</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He died as a result of the crash. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
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
 <table class="w-full text-left border-collapse">
 <tbody class="divide-y divide-slate-100 text-sm">
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 w-1/4">If</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 w-1/4">Eğer</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">If</span> <span class="map-tag map-2">you study</span>, you pass.</div><div class="map-tr-sentence"><span class="map-tag map-2">Ders çalışırsan</span> (<span class="map-tag map-1">SE</span>), geçersin.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">Unless</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-medikçe (if not)</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)"><div><span class="map-tag map-1">Unless</span> <span class="map-tag map-2">you run</span>, you will be late.</div><div class="map-tr-sentence"><span class="map-tag map-2">Koş</span><span class="map-tag map-1">MADIKÇA</span> geç kalacaksın.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">Provided that / Providing</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">...şartıyla</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">I will go provided that you drive. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">As long as / So long as</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">...sürece</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">As long as you are honest, I trust you. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">In case</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">...olur diye (tedbir)</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Take a key in case I am out. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">Only if</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Ancak eğer</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Only if you ask, I will help. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">Suppose / Supposing / Assuming</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Varsayalım ki</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Supposing you won, what would you do? <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">Even if</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-sa bile</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Even if I run, I will be late. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">Whether or not</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Olsa da olmasa da</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">I will go whether you like it or not. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">Without</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">-siz / -sız</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">We cannot live without water. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-violet-600 ">But for</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">Olmasaydı</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">But for your help, I would have failed. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
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
 <table class="w-full text-left border-collapse">
 <tbody class="divide-y divide-slate-100 text-sm">
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-pink-600 w-1/4">So that / In order that</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 w-1/4">-sın diye</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)"><div>I work hard <span class="map-tag map-1">so that</span> <span class="map-tag map-2">I can retire early</span>.</div><div class="map-tr-sentence"><span class="map-tag map-2">Erken emekli olabilmek</span> <span class="map-tag map-1">İÇİN</span> (veya <span class="map-tag map-1">SIN DİYE</span>) sıkı çalışıyorum.</div></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-pink-600 ">Lest / For fear that</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">-mesin diye, korkusuyla</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He ran lest he be caught. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-pink-600 ">In order to / So as to / To</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+V1</span></td><td class="p-3 text-slate-600 ">-mek için</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He went to London to learn English. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-pink-600 ">With a view to / With the aim of</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Ving</span></td><td class="p-3 text-slate-600 ">...amacıyla</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He saves money with a view to buying a car. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
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
 <table class="w-full text-left border-collapse">
 <tbody class="divide-y divide-slate-100 text-sm">
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-black w-1/4">Therefore / Thus / Hence</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 w-1/4">Bu yüzden</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">I think; therefore, I am. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-black ">So</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">Conj</span></td><td class="p-3 text-slate-600 ">Bu yüzden</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">It was cold, so I wore a coat. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-black ">Consequently / As a result</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 ">Sonuç olarak</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He overslept; consequently, he was late. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-black ">Accordingly</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 ">Bu doğrultuda</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">The rules changed; accordingly, we adapted. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-black ">Thereby</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Ving</span></td><td class="p-3 text-slate-600 ">Böylece, dolayısıyla</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He signed the treaty, thereby ending the war. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
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
 <table class="w-full text-left border-collapse">
 <tbody class="divide-y divide-slate-100 text-sm">
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-red-800 w-1/4">Moreover / Furthermore</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 w-1/4">Dahası, ayrıca</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">The house is beautiful; moreover, it is cheap. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-red-800 ">In addition / Besides</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 ">Buna ek olarak</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">I am tired. In addition, I am hungry. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-red-800 ">Also</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 ">Ayrıca</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">She sings; she also plays piano. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-red-800 ">Not only...but also</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">Pair</span></td><td class="p-3 text-slate-600 ">Sadece...değil, aynı zamanda</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He is not only smart but also funny. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-red-800 ">In addition to / Besides</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">...nın yanısıra</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Besides English, he speaks French. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-red-800 ">As well as</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">...kadar / yanısıra</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">She invited Tom as well as John. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
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
 <table class="w-full text-left border-collapse">
 <tbody class="divide-y divide-slate-100 text-sm">
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-orange-600 w-1/4">As if / As though</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 w-1/4">Sanki ...mış gibi</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He talks as if he knows everything. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-orange-600 ">Just as</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Tıpkı ...gibi</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Just as I thought, he is late. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-orange-600 ">Where</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">...dığı yerde</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Stay where you are. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-orange-600 ">Wherever</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 ">Her nerede</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Wherever you go, I will find you. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
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
 <table class="w-full text-left border-collapse">
 <tbody class="divide-y divide-slate-100 text-sm">
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-slate-600 w-1/4">Regardless of</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 w-1/4">-e bakılmaksızın</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">We will go regardless of the cost. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-slate-600 ">In terms of</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">-açısından</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">It is good in terms of quality. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-slate-600 ">With regard to / As to</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">...ile ilgili olarak</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">With regard to your request, the answer is no. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-slate-600 ">Instead of</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">...yerine</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Use milk instead of water. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-slate-600 ">Apart from / Except for</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">...dışında, hariç</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Everyone came except for John. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 <tr class="hover:bg-slate-50 "><td class="p-3 font-bold text-slate-600 ">According to</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 ">-e göre</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">According to the news, it will snow. <i class="fa-solid fa-copy copy-icon ml-2 text-gray-500 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
 </tbody>
 </table>
 </div>
</section>
`;
document.getElementById('tab-conjunctions').innerHTML = conjunctionsHTML;