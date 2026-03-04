
const conjunctionsHTML = `

<div class="mb-6 rounded-2xl border border-purple-500/30 bg-purple-900/20 p-5 backdrop-blur">

<button onclick="this.nextElementSibling.classList.toggle('hidden')" 
class="flex justify-between items-center w-full text-left">

<span class="font-bold text-purple-400 text-lg">
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
<div class="w-full bg-slate-800 rounded-full h-3">
<div class="bg-purple-500 h-3 rounded-full w-[75%]"></div>
</div>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mt-4">

<div class="bg-slate-800 p-3 rounded">
<p class="font-bold text-red-400">⚠ Trap</p>
<p>Despite + noun</p>
<p>Although + clause</p>
<p>So vs So that</p>
</div>

<div class="bg-slate-800 p-3 rounded">
<p class="font-bold text-green-400">✔ Probability</p>
<p>Comma → Non-defining structure</p>
<p>Despite + gerund</p>
</div>

</div>

</div>
</div>
<!-- Local Search -->
<div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
    <div class="relative w-full">
        <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <input type="text" onkeyup="filterTab(this)" placeholder="Bağlaç ara: although, despite, so that..." 
            class="block w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium">
    </div>
</div>

<!-- 1. TIME (ZAMAN) -->
<section class="conj-section searchable-section" data-cat="Time">
    <div class="flex items-center gap-3 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div class="w-8 h-8 rounded bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-lg font-bold">⏰</div>
        <h2 class="text-xl font-bold text-slate-800 dark:text-white">Time (Zaman Bağlaçları)</h2>
    </div>
    <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse">
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-cyan-600 dark:text-cyan-400 w-1/4">When</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300 w-1/4">-dığı zaman</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">When I saw him, I smiled. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-cyan-600 dark:text-cyan-400">While / As</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-iken (süreç)</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">While I was sleeping, the phone rang. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-cyan-600 dark:text-cyan-400">Just as</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Tam ...iken</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Just as I was leaving, he arrived. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-cyan-600 dark:text-cyan-400">After</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-den sonra</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">After I finished work, I went out. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-cyan-600 dark:text-cyan-400">Before</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-den önce</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Before you speak, listen. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-cyan-600 dark:text-cyan-400">Until / Till</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-e kadar</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Wait here until I come back. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-cyan-600 dark:text-cyan-400">By the time</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-dığı zamana kadar</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">By the time we arrived, the movie had started. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-cyan-600 dark:text-cyan-400">Since</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-den beri</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">I haven't eaten since I woke up. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-cyan-600 dark:text-cyan-400">As soon as / Once</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">...ır ...maz / -ince</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">As soon as he saw me, he ran away. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-cyan-600 dark:text-cyan-400">The moment / The instant</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">...dığı anda</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">The moment I saw it, I knew. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-cyan-600 dark:text-cyan-400">Whenever</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Her ne zaman</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Whenever I go there, it rains. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-cyan-600 dark:text-cyan-400">No sooner ... than</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">Inversion</span></td><td class="p-3 text-slate-600 dark:text-slate-300">...mesiyle ...mesi bir oldu</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">No sooner had I sat down than the bell rang. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-cyan-600 dark:text-cyan-400">Hardly ... when</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">Inversion</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Tam ...yordu ki</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Hardly had we started when the power went out. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <!-- Prepositional Time -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-gray-500 dark:text-gray-400">During</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Sırasında / Boyunca</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He slept during the lesson. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-gray-500 dark:text-gray-400">Prior to</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-den önce</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Prior to the meeting, we had coffee. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
            </tbody>
        </table>
    </div>
</section>

<!-- 2. CONTRAST (ZITLIK) -->
<section class="conj-section searchable-section" data-cat="Contrast">
    <div class="flex items-center gap-3 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div class="w-8 h-8 rounded bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center text-lg font-bold">⚖️</div>
        <h2 class="text-xl font-bold text-slate-800 dark:text-white">Contrast (Zıtlık)</h2>
    </div>
    <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse">
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-rose-600 dark:text-rose-400 w-1/4">Although / Though</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300 w-1/4">-e rağmen</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Although he is old, he runs fast. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-rose-600 dark:text-rose-400">Even though</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-sa bile (vurgulu)</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Even though I studied, I failed. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-rose-600 dark:text-rose-400">While / Whereas</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Oysa, -iken</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Tom is rich, whereas Jack is poor. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-rose-600 dark:text-rose-400">Much as</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Her ne kadar...ise de</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Much as I like him, I can't trust him. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-rose-600 dark:text-rose-400">In spite of the fact that</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">...olduğu gerçeğine rağmen</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">In spite of the fact that he was ill, he came. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-rose-600 dark:text-rose-400">Despite / In spite of</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-e rağmen</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Despite the rain, we went out. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-rose-600 dark:text-rose-400">Albeit</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">Adj/Adv</span></td><td class="p-3 text-slate-600 dark:text-slate-300">...olmasına rağmen</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He smiled, albeit sadly. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-rose-600 dark:text-rose-400">Unlike</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-in aksine</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Unlike his father, he is tall. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-rose-600 dark:text-rose-400">Contrary to</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-in tersine</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Contrary to popular belief, it is easy. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-rose-600 dark:text-rose-400">Notwithstanding</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-e rağmen (resmi)</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Notwithstanding the bad weather, they departed. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-rose-600 dark:text-rose-400">However</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Ancak, ama</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">It is hard; however, it is possible. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-rose-600 dark:text-rose-400">Nevertheless / Nonetheless</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Yine de, buna rağmen</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He made mistakes; nevertheless, he won. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-rose-600 dark:text-rose-400">On the other hand</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Öte yandan</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">City life is fast; on the other hand, it's noisy. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-rose-600 dark:text-rose-400">Conversely</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Aksine</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">The North is rich; conversely, the South is poor. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
            </tbody>
        </table>
    </div>
</section>

<!-- 3. CAUSE (SEBEP) -->
<section class="conj-section searchable-section" data-cat="Cause">
    <div class="flex items-center gap-3 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div class="w-8 h-8 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center text-lg font-bold">❓</div>
        <h2 class="text-xl font-bold text-slate-800 dark:text-white">Cause & Reason (Sebep)</h2>
    </div>
    <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse">
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-amber-600 dark:text-amber-400 w-1/4">Because / As / Since</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300 w-1/4">Çünkü, -dığı için</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">I left because I was bored. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-amber-600 dark:text-amber-400">In that</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-mesi bakımından</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">It is a unique gas in that it is odorless. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-amber-600 dark:text-amber-400">Now that</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Mademki, artık ...dığına göre</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Now that exams are over, we can party. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-amber-600 dark:text-amber-400">Seeing that / Given that</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Mademki, göz önüne alınırsa</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Seeing that he is ill, we should help. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-amber-600 dark:text-amber-400">Inasmuch as</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-dığı için (resmi)</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Inasmuch as the budget is low, we can't buy it. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-amber-600 dark:text-amber-400">On the grounds that</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">...gerekçesiyle</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He was fired on the grounds that he was lazy. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-amber-600 dark:text-amber-400">Because of / Due to / Owing to</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300">...nedeniyle</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Due to the storm, flights were cancelled. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-amber-600 dark:text-amber-400">Thanks to</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Sayesinde</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Thanks to your help, I passed. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-amber-600 dark:text-amber-400">As a result of</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300">...sonucunda</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He died as a result of the crash. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
            </tbody>
        </table>
    </div>
</section>

 <!-- 4. CONDITION (KOŞUL) -->
 <section class="conj-section searchable-section" data-cat="Condition">
    <div class="flex items-center gap-3 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div class="w-8 h-8 rounded bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 flex items-center justify-center text-lg font-bold">🔀</div>
        <h2 class="text-xl font-bold text-slate-800 dark:text-white">Condition (Koşul)</h2>
    </div>
    <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse">
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-violet-600 dark:text-violet-400 w-1/4">If</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300 w-1/4">Eğer</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">If you study, you pass. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-violet-600 dark:text-violet-400">Unless</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-medikçe (if not)</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Unless you run, you will be late. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-violet-600 dark:text-violet-400">Provided that / Providing</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">...şartıyla</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">I will go provided that you drive. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-violet-600 dark:text-violet-400">As long as / So long as</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">...sürece</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">As long as you are honest, I trust you. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-violet-600 dark:text-violet-400">In case</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">...olur diye (tedbir)</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Take a key in case I am out. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-violet-600 dark:text-violet-400">Only if</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Ancak eğer</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Only if you ask, I will help. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-violet-600 dark:text-violet-400">Suppose / Supposing / Assuming</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Varsayalım ki</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Supposing you won, what would you do? <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-violet-600 dark:text-violet-400">Even if</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-sa bile</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Even if I run, I will be late. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-violet-600 dark:text-violet-400">Whether or not</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Olsa da olmasa da</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">I will go whether you like it or not. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-violet-600 dark:text-violet-400">Without</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-siz / -sız</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">We cannot live without water. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-violet-600 dark:text-violet-400">But for</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Olmasaydı</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">But for your help, I would have failed. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
            </tbody>
        </table>
    </div>
</section>

 <!-- 5. PURPOSE (AMAÇ) -->
 <section class="conj-section searchable-section" data-cat="Purpose">
    <div class="flex items-center gap-3 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div class="w-8 h-8 rounded bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 flex items-center justify-center text-lg font-bold">🎯</div>
        <h2 class="text-xl font-bold text-slate-800 dark:text-white">Purpose (Amaç)</h2>
    </div>
    <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse">
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-pink-600 dark:text-pink-400 w-1/4">So that / In order that</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300 w-1/4">-sın diye</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">I work hard so that I can retire early. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-pink-600 dark:text-pink-400">Lest / For fear that</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-mesin diye, korkusuyla</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He ran lest he be caught. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-pink-600 dark:text-pink-400">In order to / So as to / To</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+V1</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-mek için</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He went to London to learn English. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-pink-600 dark:text-pink-400">With a view to / With the aim of</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Ving</span></td><td class="p-3 text-slate-600 dark:text-slate-300">...amacıyla</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He saves money with a view to buying a car. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
            </tbody>
        </table>
    </div>
</section>

 <!-- 6. RESULT (SONUÇ) -->
 <section class="conj-section searchable-section" data-cat="Result">
    <div class="flex items-center gap-3 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div class="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg font-bold">➡️</div>
        <h2 class="text-xl font-bold text-slate-800 dark:text-white">Result (Sonuç)</h2>
    </div>
    <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse">
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-blue-600 dark:text-blue-400 w-1/4">Therefore / Thus / Hence</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 dark:text-slate-300 w-1/4">Bu yüzden</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">I think; therefore, I am. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-blue-600 dark:text-blue-400">So</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">Conj</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Bu yüzden</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">It was cold, so I wore a coat. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-blue-600 dark:text-blue-400">Consequently / As a result</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Sonuç olarak</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He overslept; consequently, he was late. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-blue-600 dark:text-blue-400">Accordingly</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Bu doğrultuda</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">The rules changed; accordingly, we adapted. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-blue-600 dark:text-blue-400">Thereby</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Ving</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Böylece, dolayısıyla</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He signed the treaty, thereby ending the war. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
            </tbody>
        </table>
    </div>
</section>

 <!-- 7. ADDITION (EKLEME) -->
 <section class="conj-section searchable-section" data-cat="Addition">
    <div class="flex items-center gap-3 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div class="w-8 h-8 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg font-bold">➕</div>
        <h2 class="text-xl font-bold text-slate-800 dark:text-white">Addition (Ekleme)</h2>
    </div>
    <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse">
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-emerald-600 dark:text-emerald-400 w-1/4">Moreover / Furthermore</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 dark:text-slate-300 w-1/4">Dahası, ayrıca</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">The house is beautiful; moreover, it is cheap. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-emerald-600 dark:text-emerald-400">In addition / Besides</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Buna ek olarak</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">I am tired. In addition, I am hungry. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-emerald-600 dark:text-emerald-400">Also</td><td class="p-3 sm:table-cell"><span class="badge badge-adv">Adv</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Ayrıca</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">She sings; she also plays piano. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-emerald-600 dark:text-emerald-400">Not only...but also</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">Pair</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Sadece...değil, aynı zamanda</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He is not only smart but also funny. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-emerald-600 dark:text-emerald-400">In addition to / Besides</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300">...nın yanısıra</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Besides English, he speaks French. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-emerald-600 dark:text-emerald-400">As well as</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300">...kadar / yanısıra</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">She invited Tom as well as John. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
            </tbody>
        </table>
    </div>
</section>

 <!-- 8. MANNER & PLACE (YENİ) -->
 <section class="conj-section searchable-section" data-cat="Manner">
    <div class="flex items-center gap-3 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div class="w-8 h-8 rounded bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 flex items-center justify-center text-lg font-bold">🎭</div>
        <h2 class="text-xl font-bold text-slate-800 dark:text-white">Manner & Place (Tarz & Yer)</h2>
    </div>
    <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse">
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-orange-600 dark:text-orange-400 w-1/4">As if / As though</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300 w-1/4">Sanki ...mış gibi</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">He talks as if he knows everything. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-orange-600 dark:text-orange-400">Just as</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Tıpkı ...gibi</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Just as I thought, he is late. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-orange-600 dark:text-orange-400">Where</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">...dığı yerde</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Stay where you are. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-orange-600 dark:text-orange-400">Wherever</td><td class="p-3 sm:table-cell"><span class="badge badge-sv">S+V</span></td><td class="p-3 text-slate-600 dark:text-slate-300">Her nerede</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Wherever you go, I will find you. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
            </tbody>
        </table>
    </div>
</section>

 <!-- 9. MISC -->
 <section class="conj-section searchable-section" data-cat="Misc">
    <div class="flex items-center gap-3 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div class="w-8 h-8 rounded bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center text-lg font-bold">📦</div>
        <h2 class="text-xl font-bold text-slate-800 dark:text-white">Misc / Prepositional Phrases</h2>
    </div>
    <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse">
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-slate-600 dark:text-slate-400 w-1/4">Regardless of</td><td class="p-3 w-20 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300 w-1/4">-e bakılmaksızın</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">We will go regardless of the cost. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-slate-600 dark:text-slate-400">In terms of</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-açısından</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">It is good in terms of quality. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-slate-600 dark:text-slate-400">With regard to / As to</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300">...ile ilgili olarak</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">With regard to your request, the answer is no. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-slate-600 dark:text-slate-400">Instead of</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300">...yerine</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Use milk instead of water. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-slate-600 dark:text-slate-400">Apart from / Except for</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300">...dışında, hariç</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">Everyone came except for John. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold text-slate-600 dark:text-slate-400">According to</td><td class="p-3 sm:table-cell"><span class="badge badge-noun">+Noun</span></td><td class="p-3 text-slate-600 dark:text-slate-300">-e göre</td><td class="p-3 hidden md:table-cell group cursor-pointer" onclick="speak(this)">According to the news, it will snow. <i class="fa-solid fa-copy copy-icon ml-2 text-slate-400 hover:text-blue-500" onclick="copyText(event, this)"></i></td></tr>
            </tbody>
        </table>
    </div>
</section>
`;
document.getElementById('tab-conjunctions').innerHTML = conjunctionsHTML;