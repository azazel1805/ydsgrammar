
const nounHTML = `

<!-- Local Search -->
<div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
    <div class="relative w-full">
        <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <input type="text" onkeyup="filterTab(this)" placeholder="Noun Clause ara: subjunctive, what, fact that..." 
            class="block w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium">
    </div>
</div>
<div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg mb-6">
    <h3 class="font-bold text-yellow-700 dark:text-yellow-400 mb-2">
        🧠 Noun Clause Detection Algorithm (Sınavda 5 saniye kuralı)
    </h3>
    <ol class="text-sm space-y-2 list-decimal pl-4">
        <li>Connector'dan SONRA tam cümle var mı? (S + V)</li>
        <li>Connector bir isimden sonra mı geliyor? → Relative olabilir.</li>
        <li>Connector fiilden sonra mı geliyor? → Büyük ihtimal Noun Clause.</li>
        <li>Cümlede eksik nesne mi var? → WHAT</li>
        <li>"Olup olmadığı" anlamı mı var? → WHETHER</li>
    </ol>
</div>



<!-- 1. General Rules Table -->
<section class="noun-section bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800 overflow-hidden mb-6">
    <div class="p-4 bg-teal-50 dark:bg-teal-900/20 border-b border-teal-100 dark:border-teal-900/30 flex items-center gap-3">
        <div class="w-10 h-10 rounded bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-xl"><i class="fa-solid fa-cube"></i></div>
        <div>
            <h2 class="text-xl font-bold text-teal-800 dark:text-teal-400">Noun Clauses Ultimate Guide</h2>
            <p class="text-xs text-slate-500">Tanım: Cümle içinde <span class="font-bold">Özne</span> veya <span class="font-bold">Nesne</span> görevindeki cümlecikler.</p>
        </div>
    </div>
    
    <table class="w-full text-left text-sm">
        <thead class="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500">
            <tr><th class="p-4 w-1/5">Connector</th><th class="p-4 w-1/3">Function / Trick</th><th class="p-4">Example</th></tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr class="hover:bg-slate-50"><td class="p-4 font-bold text-teal-700">That</td><td class="p-4">Kesin yargılar, bilimsel gerçekler, fikirler. Cümle tamdır. Nesne ise atılabilir.</td><td class="p-4 italic">I know <span class="highlight-verb">(that)</span> the earth is round.</td></tr>
            <tr class="hover:bg-slate-50"><td class="p-4 font-bold text-teal-700">What</td><td class="p-4"><strong class="text-red-500">Crucial:</strong> "The thing that" anlamındadır. Cümlede özne veya nesne EKSİKTİR.</td><td class="p-4 italic">I don't know <span class="highlight-verb">what</span> you want. <br><span class="text-xs text-slate-400">(Want fiilinin nesnesi yok -> What oldu)</span></td></tr>
            <tr class="hover:bg-slate-50"><td class="p-4 font-bold text-teal-700">Whether / If</td><td class="p-4">"...olup olmadığı". Tereddüt, seçenek, belirsizlik bildirir. <br><span class="text-xs text-red-500">*If cümle başında veya prep sonrasında kullanılmaz.</span></td><td class="p-4 italic">I wonder <span class="highlight-verb">whether</span> she will come.</td></tr>
            <tr class="hover:bg-slate-50"><td class="p-4 font-bold text-teal-700">The fact that</td><td class="p-4">Preposition'dan sonra "That" gelemez. Bu yüzden "The fact that" kullanılır.</td><td class="p-4 italic">Despite <span class="highlight-verb">the fact that</span> he is rich...</td></tr>
            <tr class="hover:bg-slate-50"><td class="p-4 font-bold text-teal-700">Question Words</td><td class="p-4">Who, Where, When, Why, How. <br><strong>Kural:</strong> Asla soru devriği (Yardımcı fiil başa) yapılmaz. Düz cümle (S+V) olur.</td><td class="p-4 italic">Tell me <span class="highlight-verb">where you live</span>. <br><span class="text-xs line-through text-slate-400">Tell me where do you live.</span></td></tr>
            <tr class="hover:bg-slate-50 bg-teal-50/50 dark:bg-teal-900/10"><td class="p-4 font-bold text-purple-600">Subjunctive</td><td class="p-4">Gereklilik, önem, ısrar bildiren sıfat/fiillerden sonra (essential, suggest) gelen that cümlesinde fiil <strong class="underline">yalın (V1)</strong> kullanılır. (Should gizlidir).</td><td class="p-4 italic">It is essential that he <span class="highlight-verb">be</span> here on time. <br><span class="text-xs text-slate-500">(Not 'is', just 'be')</span></td></tr>
        </tbody>
    </table>
</section>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- 2. Noun Clause vs Relative Clause -->
    <section class="bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800 p-5">
        <h3 class="font-bold text-lg mb-3 text-slate-800 dark:text-white">VS: Noun Clause vs. Relative Clause</h3>
        <p class="text-sm text-slate-500 mb-4">"That" kelimesini görünce karıştırmamak için basit formül:</p>
        
        <div class="space-y-4">
            <div class="p-3 border border-teal-200 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                <div class="font-bold text-teal-800 dark:text-teal-400 mb-1">NOUN CLAUSE</div>
                <div class="font-mono text-sm mb-2">Verb + THAT...</div>
                <div class="text-sm text-slate-600 dark:text-slate-300">Fiilden veya sıfattan sonra gelir. Cümleyi tamamlar.</div>
                <div class="mt-2 text-xs italic bg-white dark:bg-slate-900 p-2 rounded">I <strong class="text-teal-600">think</strong> <u>that</u> he is good.</div>
            </div>

            <div class="p-3 border border-indigo-200 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <div class="font-bold text-indigo-800 dark:text-indigo-400 mb-1">RELATIVE CLAUSE</div>
                <div class="font-mono text-sm mb-2">Noun + THAT...</div>
                <div class="text-sm text-slate-600 dark:text-slate-300">İsimden sonra gelir. İsmi niteler.</div>
                <div class="mt-2 text-xs italic bg-white dark:bg-slate-900 p-2 rounded">The <strong class="text-indigo-600">news</strong> <u>that</u> he gave me was fake.</div>
            </div>
        </div>
    </section>

    <!-- 3. Reduction in Noun Clauses -->
    <section class="bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800 p-5">
        <h3 class="font-bold text-lg mb-3 text-teal-700 dark:text-teal-400">
            <i class="fa-solid fa-scissors"></i> Noun Clause Reduction
        </h3>
        <ul class="text-sm space-y-3 list-none pl-0">
            <li class="p-2 border-b dark:border-slate-800">
                <strong class="block text-slate-800 dark:text-white mb-1">Question Word + To V1</strong>
                Özneler aynıysa veya genel bir durumsa uygulanır.
                <div class="flex flex-col gap-1 mt-1 text-xs italic text-slate-500">
                    <span>I don't know <strong>what I should do</strong>.</span>
                    <span>➜ I don't know <strong class="text-teal-600">what to do</strong>.</span>
                </div>
            </li>
            <li class="p-2 border-b dark:border-slate-800">
                <strong class="block text-slate-800 dark:text-white mb-1">Whether + To V1</strong>
                <div class="flex flex-col gap-1 mt-1 text-xs italic text-slate-500">
                    <span>I am wondering <strong>whether I should stay</strong>.</span>
                    <span>➜ I am wondering <strong class="text-teal-600">whether to stay</strong>.</span>
                </div>
            </li>
            <li class="p-2 bg-rose-50 dark:bg-rose-900/10 rounded">
                <strong class="block text-rose-700 dark:text-rose-400 mb-1">⚠️ EXCEPTION</strong>
                <strong>"That"</strong> ve <strong>"If"</strong> bağlaçları ile "to V1" kısaltması YAPILAMAZ!
                <div class="text-xs mt-1"><s>I know that to do.</s> (YANLIŞ)</div>
            </li>
        </ul>
    </section>
</div>

<div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
    <h3 class="font-bold text-red-700 dark:text-red-400 mb-2">
        🚨 YDS Trap Matrix
    </h3>
    <ul class="text-sm space-y-2 list-disc pl-4">
        <li><strong>That</strong> asla preposition’dan sonra gelmez.</li>
        <li><strong>If</strong> cümle başında noun clause olarak kullanılmaz.</li>
        <li>Question word sonrası asla inversion yapılmaz.</li>
        <li>"What" kullanılan yerde "That" asla doğru olmaz.</li>
    </ul>
</div>
`;
document.getElementById('tab-noun').innerHTML = nounHTML;
