
const modalsHTML = `

<!-- ===================================== -->
<!-- YDS MODALS TACTICAL PANEL -->
<!-- ===================================== -->

<div class="bg-gradient-to-br from-blue-600 via-cyan-600 to-indigo-600 text-white p-6 rounded-2xl shadow-xl">

    <div class="flex justify-between items-center cursor-pointer"
         onclick="toggleModalTactics()">

        <h3 class="text-xl font-bold">
            🧩 YDS Modal Tactical Panel
        </h3>

        <span id="modalTacticToggleIcon">▼</span>
    </div>

    <div id="modalTacticContent" class="mt-5 space-y-6 hidden text-sm">

        <!-- 5 SECOND RULE -->
        <div class="bg-white/10 p-4 rounded-xl">
            <h4 class="font-bold text-yellow-300 mb-2">⏳ 5-Second Rule</h4>
            <ul class="space-y-1">
                <li>• Past regret mi? → should have / could have</li>
                <li>• Logical deduction mi? → must / can’t</li>
                <li>• Permission mi? → may / might</li>
                <li>• Hypothetical mi? → would / could</li>
            </ul>
        </div>

        <!-- İlk Bakılacak -->
        <div class="bg-white/10 p-4 rounded-xl">
            <h4 class="font-bold text-yellow-300 mb-2">🔎 İlk Bakılacak Noktalar</h4>
            <ul class="space-y-1">
                <li>• have + V3 var mı?</li>
                <li>• Deduction context mi?</li>
                <li>• Regret yapısı mı?</li>
                <li>• If clause var mı?</li>
            </ul>
        </div>

        <!-- Risk Bar -->
        <div class="bg-white/10 p-4 rounded-xl">
            <h4 class="font-bold text-yellow-300 mb-3">⚠ Risk Intensity</h4>

            <div>
                Modal Perfect Forms
                <div class="w-full bg-gray-300 h-2 rounded">
                    <div class="bg-red-500 h-2 rounded w-[95%]"></div>
                </div>
            </div>

            <div class="mt-2">
                Deduction Modals
                <div class="w-full bg-gray-300 h-2 rounded">
                    <div class="bg-orange-500 h-2 rounded w-[80%]"></div>
                </div>
            </div>
        </div>

        <!-- Trap Matrix -->
        <div class="bg-white/10 p-4 rounded-xl">
            <h4 class="font-bold text-yellow-300 mb-3">🔥 Mini Trap Matrix</h4>

            <div class="grid grid-cols-2 gap-2 text-xs">

                <div class="bg-red-500/30 p-2 rounded">
                    must have (regret) ❌
                </div>

                <div class="bg-green-500/30 p-2 rounded">
                    should have (regret) ✅
                </div>

                <div class="bg-red-500/30 p-2 rounded">
                    can’t have (permission) ❌
                </div>

                <div class="bg-green-500/30 p-2 rounded">
                    may have (possibility) ✅
                </div>

            </div>
        </div>

        <!-- Probability -->
        <div class="bg-white/10 p-4 rounded-xl">
            <h4 class="font-bold text-yellow-300 mb-3">📊 Probability Strength</h4>

            <div class="space-y-2 text-xs">
                <div class="flex justify-between">
                    <span>Should have (regret)</span>
                    <span class="text-red-300 font-bold">%95</span>
                </div>
                <div class="flex justify-between">
                    <span>Must (logical deduction)</span>
                    <span class="text-orange-300 font-bold">%85</span>
                </div>
            </div>
        </div>

    </div>
</div>
<!-- Local Search -->
<div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
    <div class="relative w-full">
        <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <input type="text" onkeyup="filterTab(this)" placeholder="Modals içinde ara: must have v3, ability..." 
            class="block w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium">
    </div>
</div>

<section class="modal-section searchable-section">
    <div class="section-header">
        <div class="w-10 h-10 rounded bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 flex items-center justify-center text-xl font-bold">
            <i class="fa-solid fa-chart-simple"></i>
        </div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">
            Probability Strength Matrix
        </h2>
    </div>

    <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500">
                <tr>
                    <th class="p-4">Modal Structure</th>
                    <th class="p-4">Certainty Level</th>
                    <th class="p-4 hidden md:table-cell">Meaning</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                    <td class="p-4 font-bold text-green-600">Must (be / have V3)</td>
                    <td class="p-4">%95</td>
                    <td class="p-4 hidden md:table-cell">Kesin gibi (strong deduction)</td>
                </tr>
                <tr>
                    <td class="p-4 font-bold text-cyan-600">Be bound to</td>
                    <td class="p-4">%90</td>
                    <td class="p-4 hidden md:table-cell">Neredeyse kaçınılmaz</td>
                </tr>
                <tr>
                    <td class="p-4 font-bold text-indigo-600">Be likely to</td>
                    <td class="p-4">%75</td>
                    <td class="p-4 hidden md:table-cell">Oldukça muhtemel</td>
                </tr>
                <tr>
                    <td class="p-4 font-bold text-yellow-600">May / Might</td>
                    <td class="p-4">%50</td>
                    <td class="p-4 hidden md:table-cell">Olası</td>
                </tr>
                <tr>
                    <td class="p-4 font-bold text-red-600">Can't (be / have V3)</td>
                    <td class="p-4">%95 Negative</td>
                    <td class="p-4 hidden md:table-cell">Mümkün değil</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<!-- 1. ABILITY & POSSIBILITY -->
 <section class="modal-section searchable-section" data-cat="Ability">
    <div class="section-header">
        <div class="w-10 h-10 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl font-bold"><i class="fa-solid fa-dumbbell"></i></div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Ability & Possibility</h2>
    </div>
    
    <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse">
            <thead class="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                <tr>
                    <th class="p-4 w-1/4">Modal & Structure</th>
                    <th class="p-4 w-1/3">Detailed Usage & Nuances</th>
                    <th class="p-4 w-1/3 hidden md:table-cell">Examples</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                
                <!-- CAN -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-emerald-700 dark:text-emerald-400">Can</div>
                        <span class="badge-str">S + can + V1</span>
                        <div class="mt-2 text-xs text-slate-500">%90 Possibility / General Ability</div>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>General Ability:</strong> Her zaman yapabildiğimiz yetenekler.</li>
                            <li><strong>Theoretical Possibility:</strong> "Olabilir" (Genel geçer ihtimal).</li>
                            <li><strong>Permission:</strong> İzin isteme/verme (Informal).</li>
                            <li><strong>Prohibition:</strong> Yasaklama/men etme (Informal).</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">Smoking <span class="highlight-modal">can</span> cause cancer. (Theoretical)</div>
                            <div class="example-text">I <span class="highlight-modal">can</span> swim very well. (Ability)</div>
                            <div class="example-text">You <span class="highlight-modal">can't</span> pass. (Prohibition)</div>
                        </div>
                    </td>
                </tr>

                <!-- COULD -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-emerald-700 dark:text-emerald-400">Could</div>
                        <span class="badge-str">S + could + V1</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Past Ability:</strong> Geçmişteki genel yetenek.</li>
                            <li><strong>Polite Request:</strong> Çok kibar rica (Şimdiki zaman).</li>
                            <li><strong>Possibility:</strong> Şimdiki/Gelecek zaman ihtimali (%50).</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">My grandfather <span class="highlight-modal">could</span> speak 5 languages.</div>
                            <div class="example-text"><span class="highlight-modal">Could</span> you pass the salt, please?</div>
                        </div>
                    </td>
                </tr>

                <!-- BE ABLE TO -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-emerald-700 dark:text-emerald-400">Be able to</div>
                        <span class="badge-str">am/is/are/was/were able to</span>
                        <span class="badge-nuance">CRITICAL FOR EXAMS</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Specific Achievement (Past):</strong> Geçmişte zor bir durumun üstesinden gelip başarmak (Was able to = Managed to). <strong>"Could" bu anlamda kullanılmaz!</strong></li>
                            <li><strong>Future Ability:</strong> "Will be able to" (Can'in geleceği yoktur).</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">The fire was huge, but everyone <span class="highlight-modal">was able to</span> escape. (Not "could")</div>
                            <div class="example-text">I <span class="highlight-modal">will be able to</span> drive next year.</div>
                        </div>
                    </td>
                </tr>

                 <!-- MAY / MIGHT -->
                 <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-purple-700 dark:text-purple-400">May / Might</div>
                        <span class="badge-str">S + may/might + V1</span>
                        <div class="prob-bar w-24 bg-slate-200"><div class="prob-fill bg-purple-500" style="width: 50%"></div></div>
                        <div class="text-[10px] text-slate-400">%50 Probability</div>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Possibility:</strong> Şu an veya gelecek için ihtimal. "Might" bir tık daha düşük ihtimaldir.</li>
                            <li><strong>Formal Permission:</strong> "May I...?" (Çok resmi).</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">Take an umbrella, it <span class="highlight-modal">might</span> rain later.</div>
                            <div class="example-text"><span class="highlight-modal">May</span> I ask a question?</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<!-- 2. OBLIGATION, NECESSITY & ADVICE -->
<section class="modal-section searchable-section" data-cat="Obligation">
    <div class="section-header">
        <div class="w-10 h-10 rounded bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center text-xl font-bold"><i class="fa-solid fa-triangle-exclamation"></i></div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Obligation & Advice</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
         <!-- TRAP ALERT BOX -->
        <div class="col-span-1 md:col-span-2 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-lg p-4 flex gap-4 items-center">
            <i class="fa-solid fa-skull-crossbones text-2xl text-rose-500"></i>
            <div>
                <h3 class="font-bold text-rose-700 dark:text-rose-400 text-sm uppercase">Biggest Trap: Negative Forms</h3>
                <p class="text-sm text-slate-600 dark:text-slate-300">
                    <strong>Mustn't</strong> = YASAK (Don't do it!) <br>
                    <strong>Don't have to</strong> = GEREK YOK (Optional - yapmana gerek yok)
                </p>
            </div>
        </div>
    </div>
    
    <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse">
            <thead class="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                <tr>
                    <th class="p-4 w-1/4">Modal</th>
                    <th class="p-4 w-1/3">Usage</th>
                    <th class="p-4 w-1/3 hidden md:table-cell">Example</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                
                <!-- MUST -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-red-700 dark:text-red-400">Must</div>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Internal Obligation:</strong> Konuşmacının kendi kararı/otoritesi.</li>
                            <li><strong>Strong Advice:</strong> "Mutlaka yapmalısın" (Film harika, izlemelisin).</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-text">I <span class="highlight-modal">must</span> clean my house today. (My decision)</div>
                    </td>
                </tr>

                 <!-- HAVE TO -->
                 <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-red-700 dark:text-red-400">Have to</div>
                        <div class="text-xs text-slate-500">has to / had to</div>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>External Obligation:</strong> Kanunlar, kurallar, dış etkenler. Bizim elimizde değil.</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-text">You <span class="highlight-modal">have to</span> wear a seatbelt. (Law)</div>
                    </td>
                </tr>

                <!-- SHOULD / OUGHT TO -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-blue-600 dark:text-blue-400">Should / Ought to</div>
                        <span class="badge-str">Had better (Warning)</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Advice:</strong> Tavsiye, öğüt. (Should = Ought to).</li>
                            <li><strong>Had better:</strong> Tehditvari tavsiye. Yapmazsan kötü bir şey olur.</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">You <span class="highlight-modal">should</span> see a dentist.</div>
                            <div class="example-text">You <span class="highlight-modal">had better</span> hurry, or you will miss the bus.</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<!-- 3. DEDUCTION (TAHMİN) - PRESENT -->
<section class="modal-section searchable-section" data-cat="Deduction">
    <div class="section-header">
        <div class="w-10 h-10 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl font-bold"><i class="fa-solid fa-magnifying-glass"></i></div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Deduction (Present)</h2>
    </div>
    <p class="mb-4 text-sm text-slate-600 dark:text-slate-400">Dedektif gibi eldeki ipuçlarına bakarak <u>şu an</u> hakkında çıkarım yapma.</p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Strong Positive -->
        <div class="p-4 bg-white dark:bg-slate-900 border-l-4 border-green-500 shadow rounded-r-lg">
            <div class="font-bold text-lg text-slate-800 dark:text-white">Must be</div>
            <div class="prob-bar w-full bg-slate-200 mb-2"><div class="prob-fill bg-green-500" style="width: 95%"></div></div>
            <p class="text-xs text-slate-500">%95 Sure (True)</p>
            <p class="mt-2 text-sm">"Olmalı." (Kesin o)</p>
            <div class="example-text mt-2">Light is on. He <span class="highlight-modal">must be</span> at home.</div>
        </div>

        <!-- Possibility -->
        <div class="p-4 bg-white dark:bg-slate-900 border-l-4 border-yellow-500 shadow rounded-r-lg">
            <div class="font-bold text-lg text-slate-800 dark:text-white">May/Might/Could be</div>
            <div class="prob-bar w-full bg-slate-200 mb-2"><div class="prob-fill bg-yellow-500" style="width: 50%"></div></div>
            <p class="text-xs text-slate-500">%50 Possible</p>
            <p class="mt-2 text-sm">"Olabilir." (Belki)</p>
            <div class="example-text mt-2">He is not answering. He <span class="highlight-modal">might be</span> sleeping.</div>
        </div>

        <!-- Strong Negative -->
        <div class="p-4 bg-white dark:bg-slate-900 border-l-4 border-red-500 shadow rounded-r-lg">
            <div class="font-bold text-lg text-slate-800 dark:text-white">Can't be</div>
            <div class="prob-bar w-full bg-slate-200 mb-2"><div class="prob-fill bg-red-500" style="width: 95%"></div></div>
            <p class="text-xs text-slate-500">%95 Sure (Impossible)</p>
            <p class="mt-2 text-sm">"Olamaz." (Mümkün değil)</p>
            <div class="example-text mt-2">He just left. He <span class="highlight-modal">can't be</span> far away.</div>
        </div>
    </div>
</section>

<!-- 4. PERFECT MODALS (PAST) - EXAM CORE -->
<section class="modal-section searchable-section" data-cat="Perfect">
    <div class="section-header">
        <div class="w-10 h-10 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl font-bold"><i class="fa-solid fa-hourglass-half"></i></div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Perfect Modals (Past)</h2>
    </div>
    <p class="mb-4 text-sm font-semibold text-amber-600 dark:text-amber-400 border border-amber-200 bg-amber-50 dark:bg-amber-900/10 p-2 rounded">
        ⚠️ DİKKAT: Bütün Perfect Modals yapıları GEÇMİŞ ZAMAN (Past) anlatır. "Have" kelimesine aldanma!
    </p>

    <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse">
            <thead class="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                <tr>
                    <th class="p-4 w-1/4">Structure (Modal + Have V3)</th>
                    <th class="p-4 w-1/3">Meaning & Usage</th>
                    <th class="p-4 w-1/3 hidden md:table-cell">Example</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                
                <!-- MUST HAVE V3 -->
                <tr class="hover:bg-amber-50/50 dark:hover:bg-slate-800/50">
                    <td class="p-4 border-l-4 border-green-500">
                        <div class="font-bold text-lg">Must have V3</div>
                        <div class="text-[10px] uppercase font-bold text-green-600">Strong Deduction (+)</div>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Meaning:</strong> "...mış olmalı."</li>
                            <li>Geçmişe dair güçlü, olumlu tahmin. Kanıt var, sonuç kesin gibi.</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-text">The streets are wet. It <span class="highlight-modal">must have rained</span> last night.</div>
                    </td>
                </tr>

                <!-- CAN'T HAVE V3 -->
                <tr class="hover:bg-amber-50/50 dark:hover:bg-slate-800/50">
                    <td class="p-4 border-l-4 border-red-500">
                        <div class="font-bold text-lg">Can't / Couldn't have V3</div>
                        <div class="text-[10px] uppercase font-bold text-red-600">Strong Deduction (-)</div>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Meaning:</strong> "...mış olamaz."</li>
                            <li>Geçmişe dair güçlü, olumsuz tahmin. Mümkün değil.</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-text">He was with me. He <span class="highlight-modal">can't have stolen</span> the money.</div>
                    </td>
                </tr>

<tr class="hover:bg-amber-50/50 dark:hover:bg-slate-800/50">
<td class="p-4 border-l-4 border-indigo-500">
<div class="font-bold text-lg">Would have V3</div>
<div class="text-[10px] uppercase font-bold text-indigo-600">Hypothetical Past</div>
</td>
<td class="p-4">
<ul class="usage-list">
<li>Gerçekleşmemiş geçmiş sonuç.</li>
<li>Genellikle Type 3 Conditional içinde kullanılır.</li>
</ul>
</td>
<td class="p-4 hidden md:table-cell">
<div class="example-text">
I <span class="highlight-modal">would have helped</span> you if I had known.
</div>
</td>
</tr>

                                                     <!-- MAY/MIGHT/COULD HAVE V3 -->
<tr class="hover:bg-amber-50/50 dark:hover:bg-slate-800/50">
<td class="p-4 border-l-4 border-yellow-500">
<div class="font-bold text-lg">May / Might / Could have V3</div>
<div class="text-[10px] uppercase font-bold text-yellow-600">Possibility</div>
</td>
<td class="p-4">
<ul class="usage-list">
<li><strong>Meaning:</strong> "...mış olabilir."</li>
<li>%50 ihtimal (past possibility).</li>
</ul>
</td>
<td class="p-4 hidden md:table-cell">
<div class="example-text">
I can't find my wallet. I <span class="highlight-modal">might have dropped</span> it.
</div>
</td>
</tr>

<!-- NUANCE COMPARISON ROW (AYRI TR OLARAK) -->
<tr class="hover:bg-amber-50/50 dark:hover:bg-slate-800/50">
<td class="p-4 border-l-4 border-yellow-400">
<div class="font-bold text-lg">Nuance Comparison</div>
</td>
<td class="p-4">
<ul class="usage-list">
<li><strong>May have:</strong> En mantıklı olasılık.</li>
<li><strong>Might have:</strong> Daha zayıf ihtimal.</li>
<li><strong>Could have:</strong> Gerçekleşmemiş potansiyel / eleştiri.</li>
<li><strong>YDS Trap:</strong> "Could have" çoğu zaman gerçekleşmemiş fırsat anlamındadır.</li>
</ul>
</td>
<td class="p-4 hidden md:table-cell">
<div class="example-block">
<div class="example-text">
    You <span class="highlight-modal">could have told</span> me earlier!
</div>
<div class="example-text">
    She <span class="highlight-modal">may have forgotten</span> the meeting.
</div>
</div>
</td>
</tr>

                 <!-- SHOULD HAVE V3 -->
                 <tr class="hover:bg-amber-50/50 dark:hover:bg-slate-800/50 bg-rose-50/30">
                    <td class="p-4 border-l-4 border-blue-500">
                        <div class="font-bold text-lg text-rose-700 dark:text-rose-400">Should / Ought to have V3</div>
                        <div class="text-[10px] uppercase font-bold text-rose-500">Criticism / Regret</div>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Meaning:</strong> "...malıydın (ama yapmadın)."</li>
                            <li>Geçmişle ilgili eleştiri veya pişmanlık. Olay gerçekleşmedi.</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-text">You <span class="highlight-modal">should have studied</span> more for the exam. (You failed)</div>
                    </td>
                </tr>

                <!-- NEEDN'T HAVE V3 vs DIDN'T NEED TO -->
                <tr class="hover:bg-amber-50/50 dark:hover:bg-slate-800/50">
                    <td class="p-4 border-l-4 border-slate-400" colspan="3">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div class="font-bold text-lg text-purple-700">Needn't have V3</div>
                                <p class="text-xs text-slate-500 mb-2">"Yapmana gerek yoktu (ama yaptın)"</p>
                                <div class="example-text">I <span class="highlight-modal">needn't have bought</span> bread, we already had some. (Boşuna aldım)</div>
                            </div>
                            <div>
                                <div class="font-bold text-lg text-slate-700 dark:text-slate-300">Didn't need to V1</div>
                                <p class="text-xs text-slate-500 mb-2">"Gerek yoktu (ve muhtemelen yapmadım)"</p>
                                <div class="example-text">It was Sunday, so I <span class="highlight-modal">didn't need to get up</span> early. (Kalkmadım)</div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

 <!-- 5. PREFERENCE & HABITS -->
 <section class="modal-section searchable-section" data-cat="Preference">
    <div class="section-header">
        <div class="w-10 h-10 rounded bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 flex items-center justify-center text-xl font-bold"><i class="fa-solid fa-heart"></i></div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Preference & Habits</h2>
    </div>
    
    <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse">
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                
                <!-- WOULD RATHER -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4 w-1/4">
                        <div class="font-bold text-lg text-slate-800 dark:text-white">Would rather</div>
                        <span class="badge-str">would rather V1 than V1</span>
                    </td>
                    <td class="p-4 w-1/3">
                        <ul class="usage-list">
                            <li><strong>Meaning:</strong> Tercih etmek (Prefer gibidir ama "to" almaz).</li>
                            <li><strong>Same Subject:</strong> I would rather stay home.</li>
                            <li><strong>Different Subject:</strong> I would rather <u>you went</u> home. (Subjunctive - Past kullanılır!)</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-text">I <span class="highlight-modal">would rather drink</span> tea than coffee.</div>
                        <div class="example-text">I <span class="highlight-modal">would rather you didn't</span> smoke here.</div>
                    </td>
                </tr>
<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
<td class="p-4 w-1/4">
<div class="font-bold text-lg text-slate-800 dark:text-white">Would (Past Habit)</div>
<span class="badge-str">would + V1</span>
</td>
<td class="p-4 w-1/3">
<ul class="usage-list">
<li>Geçmişte tekrarlanan alışkanlık.</li>
<li>"Used to" gibi ama durum fiilleriyle kullanılmaz.</li>
</ul>
</td>
<td class="p-4 hidden md:table-cell">
<div class="example-text">
    When we were children, we <span class="highlight-modal">would play</span> outside.
</div>
</td>
</tr>

                <!-- USED TO TRIO -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4 w-1/4">
                        <div class="font-bold text-lg text-slate-800 dark:text-white">The "Used to" Trio</div>
                    </td>
                    <td class="p-4 w-2/3" colspan="2">
                        <div class="space-y-3">
                            <!-- Used to -->
                            <div class="flex flex-col md:flex-row gap-2 md:items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                                <span class="badge-str w-32 shrink-0">Used to + V1</span>
                                <span class="text-slate-600 dark:text-slate-400 text-sm">Eskiden yapardım (Artık yapmıyorum). Past Habit.</span>
                                <span class="text-xs italic text-slate-400 ml-auto">Ex: I <b>used to smoke</b>.</span>
                            </div>
                            <!-- Be used to -->
                            <div class="flex flex-col md:flex-row gap-2 md:items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                                <span class="badge-str w-32 shrink-0">Be used to + Ving</span>
                                <span class="text-slate-600 dark:text-slate-400 text-sm">Alışkın olmak (Durum).</span>
                                <span class="text-xs italic text-slate-400 ml-auto">Ex: I <b>am used to driving</b> in traffic.</span>
                            </div>
                            <!-- Get used to -->
                            <div class="flex flex-col md:flex-row gap-2 md:items-center">
                                <span class="badge-str w-32 shrink-0">Get used to + Ving</span>
                                <span class="text-slate-600 dark:text-slate-400 text-sm">Alışmak (Süreç).</span>
                                <span class="text-xs italic text-slate-400 ml-auto">Ex: I <b>got used to living</b> alone.</span>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<!-- 6. SEMI-MODALS & FORMAL STRUCTURES (CRITICAL FOR YDS) -->
    <section class="modal-section searchable-section" data-cat="Obligation">
        <div class="section-header">
            <div class="w-10 h-10 rounded bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-xl font-bold"><i class="fa-solid fa-user-tie"></i></div>
            <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Formal & Semi-Modals</h2>
        </div>
        
        <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
            <table class="w-full text-left border-collapse">
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                    
                    <!-- BE TO -->
                    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                        <td class="p-4 w-1/4">
                            <div class="font-bold text-lg text-slate-800 dark:text-white">Be to</div>
                            <span class="badge-str">am/is/are to + V1</span>
                        </td>
                        <td class="p-4 w-1/3">
                            <ul class="usage-list">
                                <li><strong>Formal Instruction:</strong> Resmi emir veya talimat (Must'ın çok resmi hali).</li>
                                <li><strong>Destiny (Past):</strong> "Was/Were to" ile kader anlatır. (Olacaktı...)</li>
                            </ul>
                        </td>
                        <td class="p-4 hidden md:table-cell">
                            <div class="example-text">No one <span class="highlight-modal">is to leave</span> this room. (Strict Order)</div>
                            <div class="example-text">They didn't know they <span class="highlight-modal">were never to see</span> each other again.</div>
                        </td>
                    </tr>

                    <!-- BE SUPPOSED TO -->
                    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                        <td class="p-4 w-1/4">
                            <div class="font-bold text-lg text-slate-800 dark:text-white">Be supposed to</div>
                            <span class="badge-str">is/are supposed to</span>
                        </td>
                        <td class="p-4 w-1/3">
                            <ul class="usage-list">
                                <li><strong>Expectation:</strong> Beklenti veya kural bildirir (Should gibi).</li>
                                <li><strong>Contrast:</strong> Genellikle "ama yapmadı/yapmıyor" anlamı verir.</li>
                            </ul>
                        </td>
                        <td class="p-4 hidden md:table-cell">
                            <div class="example-text">You <span class="highlight-modal">are supposed to be</span> at work now. (Why are you here?)</div>
                        </td>
                    </tr>

                    <!-- DARE -->
                    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                        <td class="p-4 w-1/4">
                            <div class="font-bold text-lg text-rose-700 dark:text-rose-400">Dare</div>
                            <span class="badge-str">Dare (to) V1</span>
                        </td>
                        <td class="p-4 w-1/3">
                            <ul class="usage-list">
                                <li><strong>Courage:</strong> Cesaret etmek.</li>
                                <li><strong>Semi-Modal:</strong> "I daren't go" (Modal gibi) veya "I don't dare to go" (Fiil gibi) kullanılabilir.</li>
                                <li><strong>Phrase:</strong> "How dare you!" (Ne cüretle!)</li>
                            </ul>
                        </td>
                        <td class="p-4 hidden md:table-cell">
                            <div class="example-text">I <span class="highlight-modal">daren't tell</span> him the truth.</div>
                            <div class="example-text">He <span class="highlight-modal">didn't dare to look</span> back.</div>
                        </td>
                    </tr>

                </tbody>
                <!-- BE BOUND TO / BE LIKELY TO / BE DUE TO -->
<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
<td class="p-4 w-1/4">
<span class="badge-nuance bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Kaçınılmazlık!</span>
<div class="font-bold text-lg text-cyan-700 dark:text-cyan-400">Be bound to</div>
<span class="badge-str">am/is/are bound to + V1</span>
<div class="text-xs text-slate-500 mt-1">Yüksek kesinlik</div>
</td>
<td class="p-4 w-1/3">
<ul class="usage-list">
    <li><strong>Çok yüksek ihtimal / kaçınılmazlık:</strong> "Mutlaka ...ecek", "kesin ...ecek" anlamı.</li>
    <li><strong>YDS'de sık çıkar:</strong> Gelecekte neredeyse kesin olan durumlar için.</li>
    <li>Not: "bound to" olumsuz hali çok nadirdir.</li>
</ul>
</td>
<td class="p-4 hidden md:table-cell">
<div class="example-text">He studies 10 hours a day. He <span class="highlight-modal">is bound to</span> pass the exam.</div>
<div class="example-text">If you keep driving so fast, you <span class="highlight-modal">are bound to</span> have an accident.</div>
</td>
</tr>

<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
<td class="p-4 w-1/4">
<div class="font-bold text-lg text-indigo-700 dark:text-indigo-400">Be likely to</div>
<span class="badge-str">am/is/are likely to + V1</span>
<div class="text-xs text-slate-500 mt-1">%70-80 ihtimal</div>
<div class="prob-bar w-24 bg-slate-200 mt-1"><div class="prob-fill bg-indigo-500" style="width: 75%"></div></div>
</td>
<td class="p-4 w-1/3">
<ul class="usage-list">
    <li><strong>Oldukça muhtemel:</strong> "Büyük ihtimalle ...ecek".</li>
    <li>May/Might'tan daha güçlü, ama must kadar kesin değil.</li>
    <li>Olumsuz: <strong>be unlikely to</strong></li>
</ul>
</td>
<td class="p-4 hidden md:table-cell">
<div class="example-text">She has trained hard. She <span class="highlight-modal">is likely to</span> win the gold medal.</div>
<div class="example-text">It <span class="highlight-modal">is unlikely to</span> rain this afternoon. (Yağmur yağması düşük ihtimal)</div>
</td>
</tr>

<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
<td class="p-4 w-1/4">
<div class="font-bold text-lg text-violet-700 dark:text-violet-400">Be due to</div>
<span class="badge-str">am/is/are due to + V1</span>
<div class="text-xs text-slate-500 mt-1">Planlanmış / beklenen</div>
</td>
<td class="p-4 w-1/3">
<ul class="usage-list">
    <li><strong>Planlanmış gelecek:</strong> Tren/uçak/ders vb. resmi başlangıç zamanı.</li>
    <li><strong>Sebep anlamında da kullanılır:</strong> ama burada gelecek zaman anlamı kastediliyor.</li>
    <li>YDS tuzağı: "due to" ile "because of" karıştırmamak.</li>
</ul>
</td>
<td class="p-4 hidden md:table-cell">
<div class="example-text">The train <span class="highlight-modal">is due to</span> arrive at 8:15. (Planlanmış saat)</div>
<div class="example-text">The meeting <span class="highlight-modal">is due to</span> start in ten minutes.</div>
</td>
</tr>

<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
<td class="p-4 w-1/4">
<div class="font-bold text-lg text-cyan-700 dark:text-cyan-400">Shall</div>
<span class="badge-str">shall + V1</span>
</td>
<td class="p-4 w-1/3">
<ul class="usage-list">
    <li>Formal / Legal English.</li>
    <li>Resmi sözleşmelerde zorunluluk bildirir.</li>
    <li>YDS Reading'de akademik metinlerde çıkar.</li>
</ul>
</td>
<td class="p-4 hidden md:table-cell">
<div class="example-text">
    The tenant <span class="highlight-modal">shall pay</span> the rent on time.
</div>
</td>
</tr>
            </table>
        </div>
    </section>

    <!-- 7. PREFERENCE MATRIX (WOULD RATHER vs PREFER) -->
    <section class="modal-section searchable-section" data-cat="Preference">
        <div class="section-header">
            <div class="w-10 h-10 rounded bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-600 dark:text-fuchsia-400 flex items-center justify-center text-xl font-bold"><i class="fa-solid fa-scale-unbalanced"></i></div>
            <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Preference Matrix</h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- General Preference -->
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                <h3 class="font-bold text-lg text-blue-600 dark:text-blue-400 mb-3">General Preference (Genel Tercih)</h3>
                <div class="space-y-4">
                    <div>
                        <span class="badge-str text-xs">Prefer Ving to Ving</span>
                        <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">Genel hobiler, alışkanlıklar.</p>
                        <div class="example-text mt-1">I <span class="highlight-modal">prefer walking</span> to running.</div>
                    </div>
                </div>
            </div>

            <!-- Specific Preference -->
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                <h3 class="font-bold text-lg text-fuchsia-600 dark:text-fuchsia-400 mb-3">Specific Choice (Şu anki Seçim)</h3>
                <div class="space-y-4">
                    <div>
                        <span class="badge-str text-xs">Would rather V1 than V1</span>
                        <div class="example-text mt-1">I <span class="highlight-modal">would rather stay</span> home than go out tonight.</div>
                    </div>
                    <div>
                        <span class="badge-str text-xs">Would prefer to V1 rather than V1</span>
                        <div class="example-text mt-1">I <span class="highlight-modal">would prefer to eat</span> salad rather than eat pasta.</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;
document.getElementById('tab-modals').innerHTML = modalsHTML;