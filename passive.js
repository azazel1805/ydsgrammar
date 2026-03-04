
const passiveHTML = `

<div class="mb-6 rounded-2xl border border-blue-500/30 bg-blue-900/20 p-5 backdrop-blur">

<button onclick="this.nextElementSibling.classList.toggle('hidden')" 
class="flex justify-between items-center w-full text-left">

<span class="font-bold text-blue-400 text-lg">
🛡 Passive Detection Algorithm (5 Saniye Kuralı)
</span>

<span class="text-xs text-blue-300">▼</span>
</button>

<div class="mt-4 space-y-4">

<div class="text-sm space-y-2">
<p>1️⃣ Özne işi yapıyor mu? → Active olabilir</p>
<p>2️⃣ Özne işi almıyor mu? → Passive olabilir</p>
<p>3️⃣ Be + V3 var mı? → %90 Passive</p>
<p>4️⃣ By phrase var mı? → Neredeyse kesin Passive</p>
<p>5️⃣ Zaman sorusunu çöz → Yapı doğru mu?</p>
</div>

<div class="mt-4">
<p class="text-xs mb-1 text-blue-300">Risk Level</p>
<div class="w-full bg-slate-800 rounded-full h-3">
<div class="bg-blue-500 h-3 rounded-full w-[80%]"></div>
</div>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mt-4">

<div class="bg-slate-800 p-3 rounded">
<p class="font-bold text-red-400">⚠ Trap</p>
<p>People say that → It is said that</p>
<p>Have done → Have been done</p>
</div>

<div class="bg-slate-800 p-3 rounded">
<p class="font-bold text-green-400">✔ Probability</p>
<p>Be + V3 = 90%</p>
<p>Get + V3 = Modern passive</p>
</div>

</div>

</div>
</div>
<!-- Local Search -->
<div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
    <div class="relative w-full">
        <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <input type="text" onkeyup="filterTab(this)" placeholder="Passive ara: being done, to be done, intransitive..." 
            class="block w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium">
    </div>
</div>


<!-- 1. Temel ve İleri Passive Tablosu -->
<section class="passive-section bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800 overflow-hidden mb-6">
    <div class="p-4 bg-orange-50 dark:bg-orange-900/20 border-b border-orange-100 dark:border-orange-900/30 flex items-center gap-3">
        <div class="w-10 h-10 rounded bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl"><i class="fa-solid fa-user-shield"></i></div>
        <div>
            <h2 class="text-xl font-bold text-orange-800 dark:text-orange-400">Master Passive Matrix</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400">Formül: <span class="font-mono bg-orange-200 dark:bg-orange-800 dark:text-white px-1 rounded">BE + V3</span> (Be fiili zamana göre çekimlenir)</p>
        </div>
    </div>
<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg mb-6">
    <h3 class="font-bold text-blue-700 dark:text-blue-400 mb-2">
        🔄 Active → Passive Conversion Algorithm
    </h3>
    <ol class="text-sm list-decimal pl-4 space-y-2">
        <li>Nesneyi bul.</li>
        <li>Fiilin zamanını belirle.</li>
        <li>Aynı zamanın BE formunu getir.</li>
        <li>Fiili V3 yap.</li>
        <li>İstersen "by + agent" ekle.</li>
    </ol>
</div>

    
    <table class="w-full text-left text-sm">
        <thead class="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500">
            <tr><th class="p-4 w-1/5">Tense / Structure</th><th class="p-4 w-1/4">Active Form</th><th class="p-4 w-1/4">Passive Form</th><th class="p-4">Example</th></tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Simple Present</td><td class="p-4 text-xs text-slate-500">do / does</td><td class="p-4 font-bold text-orange-600">am/is/are + V3</td><td class="p-4 italic">Reports <span class="highlight-verb">are written</span> daily.</td></tr>
            <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Simple Past</td><td class="p-4 text-xs text-slate-500">did (V2)</td><td class="p-4 font-bold text-orange-600">was/were + V3</td><td class="p-4 italic">The window <span class="highlight-verb">was broken</span> yesterday.</td></tr>
            <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Present Cont.</td><td class="p-4 text-xs text-slate-500">am/is/are Ving</td><td class="p-4 font-bold text-orange-600">am/is/are BEING + V3</td><td class="p-4 italic">The room <span class="highlight-verb">is being cleaned</span> now.</td></tr>
            <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Past Cont.</td><td class="p-4 text-xs text-slate-500">was/were Ving</td><td class="p-4 font-bold text-orange-600">was/were BEING + V3</td><td class="p-4 italic">The car <span class="highlight-verb">was being repaired</span> when I came.</td></tr>
            <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Present Perfect</td><td class="p-4 text-xs text-slate-500">have/has V3</td><td class="p-4 font-bold text-orange-600">have/has BEEN + V3</td><td class="p-4 italic">The project <span class="highlight-verb">has been finished</span>.</td></tr>
            <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Past Perfect</td><td class="p-4 text-xs text-slate-500">had V3</td><td class="p-4 font-bold text-orange-600">had BEEN + V3</td><td class="p-4 italic">It <span class="highlight-verb">had been done</span> before noon.</td></tr>
            <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Future (Will)</td><td class="p-4 text-xs text-slate-500">will V1</td><td class="p-4 font-bold text-orange-600">will BE + V3</td><td class="p-4 italic">It <span class="highlight-verb">will be solved</span> soon.</td></tr>
            <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Modals</td><td class="p-4 text-xs text-slate-500">can/must/should V1</td><td class="p-4 font-bold text-orange-600">Modal + BE + V3</td><td class="p-4 italic">Rules <span class="highlight-verb">must be followed</span>.</td></tr>
            <tr class="hover:bg-slate-50 bg-orange-50/50 dark:bg-orange-900/10"><td class="p-4 font-bold text-rose-600">Perfect Modals</td><td class="p-4 text-xs text-slate-500">must have V3</td><td class="p-4 font-bold text-rose-600">Modal + have BEEN + V3</td><td class="p-4 italic">The file <span class="highlight-verb">must have been deleted</span>.</td></tr>
            <tr class="hover:bg-slate-50 bg-blue-50/50 dark:bg-blue-900/10"><td class="p-4 font-bold text-blue-600">Infinitive</td><td class="p-4 text-xs text-slate-500">to V1</td><td class="p-4 font-bold text-blue-600">to BE + V3</td><td class="p-4 italic">I want <span class="highlight-verb">to be informed</span> immediately.</td></tr>
            <tr class="hover:bg-slate-50 bg-blue-50/50 dark:bg-blue-900/10"><td class="p-4 font-bold text-blue-600">Gerund</td><td class="p-4 text-xs text-slate-500">Ving</td><td class="p-4 font-bold text-blue-600">BEING + V3</td><td class="p-4 italic">I hate <span class="highlight-verb">being lied</span> to.</td></tr>
        </tbody>
    </table>
</section>

<!-- 2. Impersonal Passive (YDS Special) -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <section class="bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800 p-5">
        <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
            <span class="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs uppercase">Exam Core</span>
            Impersonal Passive
        </h3>
        <p class="text-sm text-slate-600 dark:text-slate-300 mb-4">
            Genel kanı bildiren fiillerle (think, believe, say, claim, allege) yapılır. İki yolu vardır:
        </p>
        
        <div class="space-y-4">
            <div class="border-l-4 border-purple-500 pl-4 bg-purple-50 dark:bg-purple-900/10 py-2">
                <div class="text-xs font-bold text-purple-600 mb-1">YÖNTEM 1: "It" ile başlama</div>
                <div class="font-mono text-sm">It is + V3 + that + Cümle</div>
                <div class="text-sm italic mt-1">Ex: <span class="font-bold">It is said that</span> he is rich.</div>
                <div class="text-xs text-slate-500">(Zenginin olduğu söyleniyor)</div>
            </div>

            <div class="border-l-4 border-rose-500 pl-4 bg-rose-50 dark:bg-rose-900/10 py-2">
                <div class="text-xs font-bold text-rose-600 mb-1">YÖNTEM 2: Özne ile başlama (ZOR)</div>
                <div class="font-mono text-sm">Subject + be + V3 + TO...</div>
                <div class="mt-2 space-y-2">
                    <div class="text-xs">
                        <span class="badge-str">to V1</span> (Eş zamanlı)<br>
                        Ex: He is said <span class="font-bold">to be</span> rich. (Şu an zengin)
                    </div>
                    <div class="text-xs">
                        <span class="badge-str">to have V3</span> (Geçmişe referans)<br>
                        Ex: He is said <span class="font-bold">to have stolen</span> the money. (Parayı geçmişte çaldığı söyleniyor)
                    </div>
                    <div class="text-xs">
                        <span class="badge-str">to be Ving</span> (Şu an devam eden)<br>
                        Ex: He is believed <span class="font-bold">to be hiding</span> now.
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 3. Causatives & Traps -->
    <div class="space-y-6">
        <!-- Causatives -->
        <section class="bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800 p-5">
            <h3 class="font-bold text-lg mb-3 text-teal-700 dark:text-teal-400">Causatives (Ettirgen)</h3>
            <table class="w-full text-xs">
                <tr class="border-b dark:border-slate-700"><td class="py-2 font-bold">Have s.o. DO</td><td class="py-2">I had the mechanic <span class="font-bold text-teal-600">fix</span> my car.</td></tr>
                <tr class="border-b dark:border-slate-700"><td class="py-2 font-bold">Get s.o. TO DO</td><td class="py-2">I got my brother <span class="font-bold text-teal-600">to help</span> me.</td></tr>
                <tr class="border-b dark:border-slate-700"><td class="py-2 font-bold">Make s.o. DO</td><td class="py-2">She made me <span class="font-bold text-teal-600">cry</span>.</td></tr>
                <tr class="bg-teal-50 dark:bg-teal-900/20"><td class="py-2 font-bold pl-2">PASSIVE FORM</td><td class="py-2">Have/Get something <span class="font-bold text-teal-600">V3 (DONE)</span><br><em>I had my hair cut.</em></td></tr>
            </table>
        </section>

        <!-- TRAP ALERT -->
        <section class="bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 p-5">
            <div class="flex items-center gap-2 mb-2 text-red-700 dark:text-red-400 font-bold">
                <i class="fa-solid fa-triangle-exclamation"></i> YDS TRAP: Intransitive Verbs
            </div>
            <p class="text-sm text-slate-700 dark:text-slate-300 mb-2">
                Nesne almayan (geçişsiz) fiiller asla Passive yapılamaz! Şıklarda "was happened", "is occurred" görürseniz <strong class="underline">anında eleyin.</strong>
            </p>
            <div class="flex flex-wrap gap-2">
                <span class="badge-noun line-through decoration-black">be happened</span>
                <span class="badge-noun line-through decoration-black">be occurred</span>
                <span class="badge-noun line-through decoration-black">be existed</span>
                <span class="badge-noun line-through decoration-black">be died</span>
                <span class="badge-noun line-through decoration-black">be seemed</span>
            </div>
        </section>
    </div>
</div>
`;
document.getElementById('tab-passive').innerHTML = passiveHTML;
