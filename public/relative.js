
const relativeHTML = `
<!-- Local Search -->
<div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
 <div class="relative w-full">
 <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
 <input type="text" onkeyup="filterTab(this)" placeholder="Relative ara: reduction, preposition, whom, whose..." 
 class="block w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium">
 </div>
</div>

<!-- 1. Pronoun Matrix -->
<section class="relative-section bg-white rounded-lg shadow border border-slate-200 overflow-hidden mb-6">
 <div class="p-4 bg-indigo-50 border-b border-indigo-100 flex items-center gap-3">
 <div class="w-10 h-10 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl"><i class="fa-solid fa-link"></i></div>
 <h2 class="text-xl font-bold text-indigo-800 ">Relative Pronouns & Rules</h2>
 </div>

<div class="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
 <h3 class="font-bold text-green-700 mb-2">
 🌳 Defining vs Non-Defining Decision Tree
 </h3>
 <ul class="text-sm list-disc pl-4 space-y-2">
 <li>Virgül varsa → Non-defining</li>
 <li>Non-defining’de THAT kullanılmaz</li>
 <li>Bilgi çıkarıldığında anlam değişiyor mu? → Defining</li>
 <li>Sadece ek bilgi mi veriyor? → Non-defining</li>
 </ul>
</div>
 <table class="w-full text-left text-sm">
 <thead class="bg-slate-50 text-xs uppercase text-slate-500">
 <tr><th class="p-4">Reference</th><th class="p-4">Subject Position</th><th class="p-4">Object Position</th><th class="p-4 hidden md:table-cell">Details / Tricks</th></tr>
 </thead>
 <tbody class="divide-y divide-slate-100 ">
 <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Person</td><td class="p-4"><span class="badge-str">Who / That</span></td><td class="p-4"><span class="badge-str">Who / Whom / That / Ø</span></td><td class="p-4 hidden md:table-cell text-xs italic">Nesne durumunda (arkasından özne geliyorsa) relative pronoun atılabilir (Ø).</td></tr>
 <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Thing/Animal</td><td class="p-4"><span class="badge-str">Which / That</span></td><td class="p-4"><span class="badge-str">Which / That / Ø</span></td><td class="p-4 hidden md:table-cell text-xs italic">Virgül varsa (Non-defining) asla "That" kullanılmaz.</td></tr>
 <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Possession</td><td class="p-4" colspan="2"><span class="badge-str">Whose</span></td><td class="p-4 hidden md:table-cell text-xs italic">Mutlaka <span class="font-bold">Whose + Noun</span> şeklinde kullanılır. (Whose car, Whose idea).</td></tr>
 <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Place</td><td class="p-4" colspan="2"><span class="badge-str">Where</span> (= in/at/on which)</td><td class="p-4 hidden md:table-cell text-xs italic">Arkasından TAM CÜMLE gelmeli. Eğer fiil geliyorsa "Which" kullanılır. <br>(The city <b>where I live</b> vs The city <b>which is</b> crowded).</td></tr>
 <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Time</td><td class="p-4" colspan="2"><span class="badge-str">When</span> (= in/at/on which)</td><td class="p-4 hidden md:table-cell text-xs italic">The day when we met...</td></tr>
 <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Reason</td><td class="p-4" colspan="2"><span class="badge-str">Why</span> (= for which)</td><td class="p-4 hidden md:table-cell text-xs italic">Genelde "The reason why..." kalıbı.</td></tr>
 </tbody>
 </table>
</section>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <!-- 2. REDUCTION RULES (The Most Important Part) -->
 <section class="bg-white rounded-lg shadow border border-slate-200 p-5">
 <h3 class="font-bold text-lg mb-3 flex items-center gap-2 text-indigo-700 ">
 <i class="fa-solid fa-scissors"></i> Reduction (Kısaltma)
 </h3>
 <p class="text-sm text-slate-500 mb-4">Relative Pronoun (Who, Which, That) cümleden atılarak yapılır.</p>
 
 <div class="space-y-4">
 <div class="flex gap-3 items-start p-3 bg-slate-50 rounded-lg">
 <span class="badge-str shrink-0">Ving</span>
 <div class="text-sm">
 <strong class="block text-slate-800 ">Active Reduction</strong>
 Zaman ne olursa olsun, fiil aktifse Ving yapılır.
 <div class="italic text-slate-500 mt-1 text-xs">The boy <s>who is running</s> -> The boy <span class="font-bold text-indigo-600">running</span>.</div>
 <div class="italic text-slate-500 text-xs">The people <s>who live</s> here -> The people <span class="font-bold text-indigo-600">living</span> here.</div>
 </div>
 </div>

 <div class="flex gap-3 items-start p-3 bg-slate-50 rounded-lg">
 <span class="badge-str shrink-0">V3</span>
 <div class="text-sm">
 <strong class="block text-slate-800 ">Passive Reduction</strong>
 Fiil pasifse sadece V3 (Past Participle) kalır.
 <div class="italic text-slate-500 mt-1 text-xs">The car <s>which was stolen</s> -> The car <span class="font-bold text-indigo-600">stolen</span> yesterday.</div>
 <div class="italic text-slate-500 text-xs">Products <s>which are made</s> in China -> Products <span class="font-bold text-indigo-600">made</span> in China.</div>
 </div>
 </div>

 <div class="flex gap-3 items-start p-3 bg-slate-50 rounded-lg border-l-4 border-indigo-400">
 <span class="badge-str shrink-0">To V1</span>
 <div class="text-sm">
 <strong class="block text-slate-800 ">Ordinal Numbers / Superlatives</strong>
 Nitelediği kelime "The first, the last, the best, the only, the next" ise "to infinitive" kullanılır.
 <div class="italic text-slate-500 mt-1 text-xs">He was the first man <span class="font-bold text-indigo-600">to go</span> to the moon.</div>
 <div class="italic text-slate-500 text-xs text-indigo-500">Passive hali: to be V3 (The only file <span class="font-bold">to be deleted</span>).</div>
 </div>
 </div>
 </div>
 </section>

 <!-- 3. Advanced & Prepositional -->
 <div class="space-y-6">
 <!-- Preposition + Relative -->
 <section class="bg-indigo-50 rounded-lg border border-indigo-100 p-5">
 <h3 class="font-bold text-lg mb-2 text-indigo-800 ">Preposition + Relative</h3>
 <ul class="text-sm space-y-2 list-disc pl-4 text-slate-700 ">
 <li>Sadece <strong>"whom"</strong> (insan) ve <strong>"which"</strong> (cansız) preposition alabilir. (with whom, in which, for which).</li>
 <li><strong>Who</strong> ve <strong>That</strong> asla başına preposition almaz! (<s>with who</s>, <s>in that</s>).</li>
 <li><strong>Quantifiers:</strong> <span class="font-mono">some of which, all of whom, neither of which</span>... (Virgülden sonra gelir).
 <br><em class="text-xs">I have 3 brothers, all of <span class="font-bold">whom</span> are doctors.</em>
 </li>
 </ul>
 </section>

 <!-- Sentence Modification -->
 <section class="bg-white rounded-lg border border-slate-200 p-5">
 <h3 class="font-bold text-lg mb-2">Sentence Modification (Tüm Cümleyi Niteleme)</h3>
 <p class="text-sm text-slate-600 mb-2">
 Bazen "Which", kendinden önceki kelimeyi değil, <span class="underline font-bold">tüm cümleyi</span> niteler. Bu durumda "ve bu durum..." anlamı katar.
 </p>
 <div class="text-sm italic border-l-4 border-slate-400 pl-3">
 He passed the exam with a high score, <span class="font-bold text-indigo-600">which</span> made his parents very happy.
 </div>
 <div class="text-xs text-gray-500 mt-1">(Ailesini mutlu eden şey sınavı geçmesi durumudur, sınavın kendisi değil.)</div>
 </section>
 </div>
</div>
`;
document.getElementById('tab-relative').innerHTML = relativeHTML;