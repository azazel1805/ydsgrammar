
const tensesHTML = `

<!-- ===================================== -->
<!-- YDS TENSES TACTICAL PANEL -->
<!-- ===================================== -->

<div class="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white p-6 rounded-2xl shadow-xl">

    <div class="flex justify-between items-center cursor-pointer"
         onclick="toggleTenseTactics()">

        <h3 class="text-xl font-bold">
            🕒 YDS Tense Tactical Panel
        </h3>

        <span id="tenseTacticToggleIcon">▼</span>
    </div>

    <div id="tenseTacticContent" class="mt-5 space-y-6 hidden text-sm">

        <!-- 5 SECOND RULE -->
        <div class="bg-white/10 p-4 rounded-xl">
            <h4 class="font-bold text-yellow-300 mb-2">⏳ 5-Second Rule</h4>
            <ul class="space-y-1">
                <li>• Önce zaman zarfı var mı bak (since, for, by, when)</li>
                <li>• Clause type belirle (main vs. subordinate)</li>
                <li>• Passive mi active mi?</li>
                <li>• Continuous gerekli mi?</li>
            </ul>
        </div>

        <!-- İlk Bakılacak Noktalar -->
        <div class="bg-white/10 p-4 rounded-xl">
            <h4 class="font-bold text-yellow-300 mb-2">🔎 Soruda İlk Bakılacak Noktalar</h4>
            <ul class="space-y-1">
                <li>• Since / For → Perfect</li>
                <li>• By the time → Perfect</li>
                <li>• When / While → Past vs Past Continuous</li>
                <li>• If clause → tense shift kontrol</li>
            </ul>
        </div>

        <!-- Risk Bar -->
        <div class="bg-white/10 p-4 rounded-xl">
            <h4 class="font-bold text-yellow-300 mb-3">⚠ Risk Intensity</h4>

            <div>
                PERFECT TENSES
                <div class="w-full bg-gray-300 h-2 rounded">
                    <div class="bg-red-500 h-2 rounded w-[90%]"></div>
                </div>
            </div>

            <div class="mt-2">
                CONDITIONAL SHIFTS
                <div class="w-full bg-gray-300 h-2 rounded">
                    <div class="bg-orange-500 h-2 rounded w-[80%]"></div>
                </div>
            </div>

            <div class="mt-2">
                CONTINUOUS FORMS
                <div class="w-full bg-gray-300 h-2 rounded">
                    <div class="bg-yellow-400 h-2 rounded w-[50%]"></div>
                </div>
            </div>
        </div>

        <!-- Trap Matrix -->
        <div class="bg-white/10 p-4 rounded-xl">
            <h4 class="font-bold text-yellow-300 mb-3">🔥 Mini Trap Matrix</h4>

            <div class="grid grid-cols-2 gap-2 text-xs">

                <div class="bg-red-500/30 p-2 rounded">
                    Since + Past Simple ❌
                </div>

                <div class="bg-green-500/30 p-2 rounded">
                    Since + Present Perfect ✅
                </div>

                <div class="bg-red-500/30 p-2 rounded">
                    By the time + Past ❌
                </div>

                <div class="bg-green-500/30 p-2 rounded">
                    By the time + Perfect ✅
                </div>

            </div>
        </div>

        <!-- Probability -->
        <div class="bg-white/10 p-4 rounded-xl">
            <h4 class="font-bold text-yellow-300 mb-3">📊 Probability Strength</h4>

            <div class="space-y-2 text-xs">
                <div class="flex justify-between">
                    <span>Present Perfect (since/for)</span>
                    <span class="text-red-300 font-bold">%95</span>
                </div>
                <div class="flex justify-between">
                    <span>Past Perfect (by the time)</span>
                    <span class="text-red-300 font-bold">%90</span>
                </div>
                <div class="flex justify-between">
                    <span>Conditional Type 3</span>
                    <span class="text-orange-300 font-bold">%80</span>
                </div>
            </div>
        </div>

    </div>
</div>
<!-- Local Search -->
<div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
    <div class="relative w-full">
        <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <input type="text" onkeyup="filterTab(this)" placeholder="Tenses içinde ara: past perfect, by the time..." 
            class="block w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium">
    </div>
</div>

<section class="conj-section searchable-section" data-cat="Agreement">
    <div class="flex items-center gap-3 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div class="w-10 h-10 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl font-bold">🔗</div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Tense Agreement & Conditionals</h2>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- Time Clause Rules -->
        <div class="rule-card">
            <div class="rule-header bg-blue-soft"><i class="fa-solid fa-clock mr-2"></i> Time Clauses (Zaman Bağlaçları)</div>
            <div class="p-0">
                <!-- Rule A -->
                <div class="combo-row">
                    <div class="font-bold text-right text-blue-700 dark:text-blue-400">Present (Simple/Perf)</div>
                    <div class="arrow-icon"><i class="fa-solid fa-arrow-right-long text-blue-400"></i><br><span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">when / after</span></div>
                    <div class="font-bold text-green-600 dark:text-green-400">Future (Will / Modal)</div>
                </div>
                <div class="px-4 pb-3 text-xs text-slate-500 italic border-b border-slate-100 dark:border-slate-800">
                    Ex: When he <span class="font-bold">arrives</span>, we <span class="font-bold">will start</span> the meeting.
                </div>
                
                <!-- Rule B -->
                <div class="combo-row">
                    <div class="font-bold text-right text-purple-700 dark:text-purple-400">Simple Past (V2)</div>
                    <div class="arrow-icon"><i class="fa-solid fa-arrow-right-long text-purple-400"></i><br><span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">when</span></div>
                    <div class="font-bold text-purple-700 dark:text-purple-400">Simple Past (V2)</div>
                </div>
                <div class="px-4 pb-3 text-xs text-slate-500 italic border-b border-slate-100 dark:border-slate-800">
                    Ex: When he <span class="font-bold">came</span> home, he <span class="font-bold">turned</span> on the TV. (Sequence)
                </div>

                 <!-- Rule C -->
                 <div class="combo-row">
                    <div class="font-bold text-right text-purple-700 dark:text-purple-400">Past Cont. (was Ving)</div>
                    <div class="arrow-icon"><i class="fa-solid fa-arrow-right-long text-purple-400"></i><br><span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">while / as</span></div>
                    <div class="font-bold text-purple-700 dark:text-purple-400">Simple Past (V2)</div>
                </div>
                <div class="px-4 pb-3 text-xs text-slate-500 italic">
                    Ex: While I <span class="font-bold">was studying</span>, my phone <span class="font-bold">rang</span>. (Interruption)
                </div>
            </div>
        </div>

        <!-- Critical Exceptions -->
        <div class="rule-card">
            <div class="rule-header bg-rose-soft"><i class="fa-solid fa-triangle-exclamation mr-2"></i> Critical Traps (Özel Kurallar)</div>
            <div class="p-0">
                <!-- Since Rule -->
                <div class="combo-row">
                    <div class="font-bold text-right text-amber-600">Present Perfect</div>
                    <div class="arrow-icon"><i class="fa-solid fa-arrow-right-long text-rose-400"></i><br><span class="text-[10px] font-bold uppercase tracking-wider text-rose-500">SINCE</span></div>
                    <div class="font-bold text-purple-600">Simple Past (V2)</div>
                </div>
                <div class="px-4 pb-3 text-xs text-slate-500 italic border-b border-slate-100 dark:border-slate-800">
                    Ex: I <span class="font-bold">haven't seen</span> him since he <span class="font-bold">moved</span> to London.
                </div>

                <!-- By the time (Past) -->
                <div class="combo-row">
                    <div class="font-bold text-right text-indigo-600">Past Perfect (Had V3)</div>
                    <div class="arrow-icon"><i class="fa-solid fa-arrow-left-long text-slate-400"></i><br><span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">by the time</span></div>
                    <div class="font-bold text-purple-600">Simple Past (V2)</div>
                </div>
                <div class="px-4 pb-3 text-xs text-slate-500 italic border-b border-slate-100 dark:border-slate-800">
                    Ex: By the time we <span class="font-bold">arrived</span>, the movie <span class="font-bold">had started</span>.
                </div>

                 <!-- By the time (Future) -->
                 <div class="combo-row">
                    <div class="font-bold text-right text-teal-600">Future Perfect</div>
                    <div class="arrow-icon"><i class="fa-solid fa-arrow-left-long text-slate-400"></i><br><span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">by the time</span></div>
                    <div class="font-bold text-blue-600">Simple Present (V1)</div>
                </div>
                <div class="px-4 pb-3 text-xs text-slate-500 italic">
                    Ex: By the time you <span class="font-bold">arrive</span>, I <span class="font-bold">will have finished</span> my work.
                </div>
            </div>
        </div>

        <!-- IF CLAUSES MATRIX -->
        <div class="rule-card lg:col-span-2">
            <div class="rule-header bg-amber-soft"><i class="fa-solid fa-code-branch mr-2"></i> IF Clauses (Conditionals Matrix)</div>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead class="bg-slate-50 dark:bg-slate-800 text-xs uppercase font-bold text-slate-500">
                        <tr>
                            <th class="p-4 w-24">Type</th>
                            <th class="p-4">Meaning (Anlam)</th>
                            <th class="p-4 w-1/4">IF Clause Structure</th>
                            <th class="p-4 w-1/4">Main Clause Structure</th>
                            <th class="p-4 hidden sm:table-cell">Example</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                        <!-- Type 0 -->
                        <tr class="hover:bg-amber-50/50 dark:hover:bg-slate-800">
                            <td class="p-4 font-bold text-amber-600">Type 0</td>
                            <td class="p-4 text-xs font-medium">Genel Geçer / Bilimsel (Fact)</td>
                            <td class="p-4"><span class="badge-str text-xs">Simple Present (V1)</span></td>
                            <td class="p-4"><span class="badge-str text-xs">Simple Present (V1)</span></td>
                            <td class="p-4 hidden sm:table-cell text-xs italic text-slate-600 dark:text-slate-400">If you <b>heat</b> ice, it <b>melts</b>.</td>
                        </tr>
                        <!-- Type 1 -->
                        <tr class="hover:bg-amber-50/50 dark:hover:bg-slate-800">
                            <td class="p-4 font-bold text-amber-600">Type 1</td>
                            <td class="p-4 text-xs font-medium">Gelecek İhtimali (Real Future)</td>
                            <td class="p-4"><span class="badge-str text-xs">Simple Present (V1)</span></td>
                            <td class="p-4"><span class="badge-str text-xs">Will / Can / May + V1</span></td>
                            <td class="p-4 hidden sm:table-cell text-xs italic text-slate-600 dark:text-slate-400">If it <b>rains</b>, we <b>will stay</b> home.</td>
                        </tr>
                        <!-- Type 2 -->
                        <tr class="hover:bg-amber-50/50 dark:hover:bg-slate-800 bg-amber-50/30">
                            <td class="p-4 font-bold text-amber-700">Type 2</td>
                            <td class="p-4 text-xs font-medium">Hayali Şimdiki Zaman (Unreal Present)</td>
                            <td class="p-4"><span class="badge-str text-xs">Simple Past (V2)</span></td>
                            <td class="p-4"><span class="badge-str text-xs">Would / Could + V1</span></td>
                            <td class="p-4 hidden sm:table-cell text-xs italic text-slate-600 dark:text-slate-400">If I <b>were</b> rich, I <b>would buy</b> a boat.</td>
                        </tr>
                        <!-- Type 3 -->
                        <tr class="hover:bg-amber-50/50 dark:hover:bg-slate-800 bg-amber-50/30">
                            <td class="p-4 font-bold text-amber-700">Type 3</td>
                            <td class="p-4 text-xs font-medium">Geçmiş Pişmanlığı (Unreal Past)</td>
                            <td class="p-4"><span class="badge-str text-xs">Past Perfect (Had V3)</span></td>
                            <td class="p-4"><span class="badge-str text-xs">Would have + V3</span></td>
                            <td class="p-4 hidden sm:table-cell text-xs italic text-slate-600 dark:text-slate-400">If I <b>had known</b>, I <b>would have come</b>.</td>
                        </tr>
                        <!-- Mixed -->
                        <tr class="hover:bg-amber-50/50 dark:hover:bg-slate-800 border-l-4 border-l-amber-500">
                            <td class="p-4 font-bold text-amber-800">Mixed</td>
                            <td class="p-4 text-xs font-medium">Geçmiş Sebep ➜ Şimdiki Sonuç</td>
                            <td class="p-4"><span class="badge-str text-xs">Past Perfect (Had V3)</span></td>
                            <td class="p-4"><span class="badge-str text-xs">Would + V1 (now)</span></td>
                            <td class="p-4 hidden sm:table-cell text-xs italic text-slate-600 dark:text-slate-400">If I <b>hadn't spent</b> all my money, I <b>would be</b> rich <u>now</u>.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

<!-- 2. PRESENT TENSES (DETAILED) -->
<section class="conj-section searchable-section" data-cat="Present">
    <div class="flex items-center gap-3 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div class="w-10 h-10 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl font-bold">☀️</div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Present Tenses</h2>
    </div>
    <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse">
            <thead class="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                <tr>
                    <th class="p-4 w-1/5">Tense & Structure</th>
                    <th class="p-4 w-1/5 hidden sm:table-cell">Keywords (Time Exp)</th>
                    <th class="p-4 w-1/3">Detailed Usage & Explanations</th>
                    <th class="p-4 w-1/3 hidden md:table-cell">Examples</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                
                <!-- Simple Present -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-slate-800 dark:text-white">Simple Present</div>
                        <span class="badge-str">S + V1 / Vs</span>
                        <div class="mt-2 text-xs text-slate-500">Neg: do/does not + V1</div>
                    </td>
                    <td class="p-4 hidden sm:table-cell">
                        <span class="badge-time">Every day/year</span>
                        <span class="badge-time">Always/Usually</span>
                        <span class="badge-time">Generally</span>
                        <span class="badge-time">Ideally</span>
                        <span class="badge-time">Nowadays</span>
                        <span class="badge-time">On Sundays</span>
                        <span class="badge-time">From time to time</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>General Truths (Facts):</strong> Bilimsel doğrular, doğa yasaları. (Değişmez gerçekler).</li>
                            <li><strong>Habits & Routines:</strong> Düzenli yapılan işler.</li>
                            <li><strong>Schedules (Timetables):</strong> Gelecek zaman anlamı taşısa bile otobüs, uçak, ders programlarında kullanılır.</li>
                            <li><strong>Live Commentary:</strong> Maç spikerliği, hikaye anlatımı.</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">Water <span class="highlight-verb">boils</span> at 100°C. (Fact)</div>
                            <div class="example-text">The train <span class="highlight-verb">leaves</span> at 9 PM tonight. (Schedule)</div>
                            <div class="example-text">Messi <span class="highlight-verb">passes</span> the ball and <span class="highlight-verb">scores</span>! (Commentary)</div>
                        </div>
                    </td>
                </tr>

                <!-- Present Continuous -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-slate-800 dark:text-white">Present Cont.</div>
                        <span class="badge-str">am/is/are + Ving</span>
                    </td>
                    <td class="p-4 hidden sm:table-cell">
                        <span class="badge-time">Now / Right now</span>
                        <span class="badge-time">At the moment</span>
                        <span class="badge-time">Currently</span>
                        <span class="badge-time">These days</span>
                        <span class="badge-time">Look! / Listen!</span>
                        <span class="badge-time">At present</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Now:</strong> Konuşma anında gerçekleşen eylemler.</li>
                            <li><strong>Temporary Situations:</strong> "Bu aralar" yapılan ama kalıcı olmayan durumlar.</li>
                            <li><strong>Trends & Changes:</strong> Artış/azalış bildiren fiiller (increase, develop, get better).</li>
                            <li><strong>Annoyance:</strong> "Always/Constantly" ile birlikte sürekli yapılan rahatsız edici işler.</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">Listen! Someone <span class="highlight-verb">is playing</span> the piano.</div>
                            <div class="example-text">The climate <span class="highlight-verb">is getting</span> warmer. (Trend)</div>
                            <div class="example-text">He <span class="highlight-verb">is always complaining</span>! (Complaint)</div>
                        </div>
                    </td>
                </tr>

                <!-- Present Perfect -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-slate-800 dark:text-white">Present Perfect</div>
                        <span class="badge-str">Have/Has + V3</span>
                    </td>
                    <td class="p-4 hidden sm:table-cell">
                        <span class="badge-time">Since / For</span>
                        <span class="badge-time">Just / Already / Yet</span>
                        <span class="badge-time">Lately / Recently</span>
                        <span class="badge-time">So far / Up to now</span>
                        <span class="badge-time">Ever / Never</span>
                        <span class="badge-time">Over the years</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Unspecified Time:</strong> Olay geçmişte bitmiş ama zamanı verilmemiş veya önemsiz.</li>
                            <li><strong>Unfinished Action:</strong> Geçmişte başlayıp bugüne kadar devam eden (Since/For ile).</li>
                            <li><strong>Result Focus:</strong> Eylem bitmiş, etkisi/sonucu şu an göz önünde.</li>
                            <li><strong>Experience:</strong> Hayat tecrübesi (I have been to USA).</li>
                            <li><strong>Rule:</strong> "This is the first time..." yapısıyla kullanılır.</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">I <span class="highlight-verb">have lost</span> my keys. (I can't open the door now)</div>
                            <div class="example-text">She <span class="highlight-verb">has written</span> three books so far.</div>
                            <div class="example-text">It is the first time I <span class="highlight-verb">have eaten</span> sushi.</div>
                        </div>
                    </td>
                </tr>

                <!-- Present Perfect Continuous -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-slate-800 dark:text-white">Pres. Perf. Cont.</div>
                        <span class="badge-str">Have/Has been + Ving</span>
                    </td>
                    <td class="p-4 hidden sm:table-cell">
                        <span class="badge-time">For ... hours</span>
                        <span class="badge-time">Since morning</span>
                        <span class="badge-time">All day / All week</span>
                        <span class="badge-time">Lately</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Duration Focus:</strong> Geçmişte başlayıp hala devam eden eylemin <em>süresine</em> ve <em>yoğunluğuna</em> odaklanılır.</li>
                            <li><strong>Visible Side Effect:</strong> Eylem yeni bitmiş ama fiziksel belirtisi taze (Nefes nefese kalmak, ellerin kirli olması).</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">He <span class="highlight-verb">has been running</span> for 2 hours. (Still running)</div>
                            <div class="example-text">Why are you wet? I <span class="highlight-verb">have been walking</span> in the rain.</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<!-- 3. PAST TENSES (DETAILED) -->
<section class="conj-section searchable-section" data-cat="Past">
    <div class="flex items-center gap-3 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div class="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl font-bold">🕰️</div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Past Tenses</h2>
    </div>
    <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse">
             <thead class="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                <tr>
                    <th class="p-4 w-1/5">Tense & Structure</th>
                    <th class="p-4 w-1/5 hidden sm:table-cell">Keywords (Time Exp)</th>
                    <th class="p-4 w-1/3">Detailed Usage & Explanations</th>
                    <th class="p-4 w-1/3 hidden md:table-cell">Examples</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                
                <!-- Simple Past -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-slate-800 dark:text-white">Simple Past</div>
                        <span class="badge-str">V2 (did)</span>
                    </td>
                    <td class="p-4 hidden sm:table-cell">
                        <span class="badge-time">Yesterday</span>
                        <span class="badge-time">Last week/year</span>
                        <span class="badge-time">...ago</span>
                        <span class="badge-time">In 1990</span>
                        <span class="badge-time">When I was a child</span>
                        <span class="badge-time">Previously</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Definite Past:</strong> Zamanı net olarak belli olan, bitmiş eylemler.</li>
                            <li><strong>Sequential Actions:</strong> Hikayede ardı ardına olan olaylar (Geldi, gördü, yendi).</li>
                            <li><strong>Hypothetical:</strong> "It is high time...", "I would rather you...", "It is time..." yapılarında <em>anlam şimdiki zaman olsa da</em> Past kullanılır.</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">Atatürk <span class="highlight-verb">founded</span> the Republic in 1923.</div>
                            <div class="example-text">He <span class="highlight-verb">entered</span> the room and <span class="highlight-verb">turned</span> on the light.</div>
                            <div class="example-text">It is high time we <span class="highlight-verb">went</span> home. (Şimdi gitme vakti)</div>
                        </div>
                    </td>
                </tr>

                <!-- Past Continuous -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-slate-800 dark:text-white">Past Continuous</div>
                        <span class="badge-str">Was/Were + Ving</span>
                    </td>
                    <td class="p-4 hidden sm:table-cell">
                        <span class="badge-time">While / As / Just as</span>
                        <span class="badge-time">When (interruption)</span>
                        <span class="badge-time">At this time yesterday</span>
                        <span class="badge-time">All evening yesterday</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Process in Past:</strong> Geçmişte belli bir noktada devam etmekte olan iş.</li>
                            <li><strong>Interrupted Action:</strong> Uzun eylem (Past Cont) yapılırken kısa eylem (Simple Past) araya girer.</li>
                            <li><strong>Parallel Actions:</strong> "While" ile aynı anda yapılan iki uzun iş.</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">I <span class="highlight-verb">was sleeping</span> when the thief entered. (Interruption)</div>
                            <div class="example-text">While I <span class="highlight-verb">was studying</span>, my mom <span class="highlight-verb">was cooking</span>. (Parallel)</div>
                        </div>
                    </td>
                </tr>

                <!-- Past Perfect -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-slate-800 dark:text-white">Past Perfect</div>
                        <span class="badge-str">Had + V3</span>
                    </td>
                    <td class="p-4 hidden sm:table-cell">
                        <span class="badge-time">By the time</span>
                        <span class="badge-time">Before / After</span>
                        <span class="badge-time">Until / Till</span>
                        <span class="badge-time">Already (in past)</span>
                        <span class="badge-time">Hardly...when</span>
                        <span class="badge-time">No sooner...than</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Past of the Past:</strong> Geçmişte iki olaydan daha önce olanı vurgulamak için. (Önce: Past Perf, Sonra: Simple Past).</li>
                            <li><strong>Cause in Past:</strong> Geçmişteki bir durumun sebebi.</li>
                            <li><strong>Rule:</strong> <em>By the time + V2 -> Had V3</em> kalıbı YDS klasiğidir.</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">By the time the police arrived, the thieves <span class="highlight-verb">had escaped</span>.</div>
                            <div class="example-text">She failed because she <span class="highlight-verb">had not studied</span>.</div>
                            <div class="example-text">No sooner <span class="highlight-verb">had I arrived</span> than he called.</div>
                        </div>
                    </td>
                </tr>

                <!-- Past Perfect Continuous -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-slate-800 dark:text-white">Past Perf. Cont.</div>
                        <span class="badge-str">Had been + Ving</span>
                    </td>
                    <td class="p-4 hidden sm:table-cell">
                        <span class="badge-time">For ... hours (before V2)</span>
                        <span class="badge-time">Since</span>
                        <span class="badge-time">Prior to</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Duration before Past:</strong> Geçmişteki bir olaya kadar süregelen eylemin <em>süresini</em> ve <em>yoğunluğunu</em> anlatır.</li>
                            <li><strong>Note:</strong> Olayın ne kadar sürdüğü vurgulanır, sonunda başka bir geçmiş olay olur.</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">The roads were wet because it <span class="highlight-verb">had been raining</span> all night.</div>
                            <div class="example-text">He <span class="highlight-verb">had been working</span> for 10 years when he got promoted.</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<!-- 4. FUTURE TENSES (DETAILED) -->
<section class="conj-section searchable-section" data-cat="Future">
    <div class="flex items-center gap-3 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div class="w-10 h-10 rounded bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 flex items-center justify-center text-xl font-bold">🚀</div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Future Tenses</h2>
    </div>
    <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse">
            <thead class="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                <tr>
                    <th class="p-4 w-1/5">Tense & Structure</th>
                    <th class="p-4 w-1/5 hidden sm:table-cell">Keywords (Time Exp)</th>
                    <th class="p-4 w-1/3">Detailed Usage & Explanations</th>
                    <th class="p-4 w-1/3 hidden md:table-cell">Examples</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                
                <!-- Future Simple (Will) -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-slate-800 dark:text-white">Future Simple</div>
                        <span class="badge-str">Will + V1</span>
                    </td>
                    <td class="p-4 hidden sm:table-cell">
                        <span class="badge-time">Tomorrow / Next...</span>
                        <span class="badge-time">Soon / Shortly</span>
                        <span class="badge-time">In the future</span>
                        <span class="badge-time">I think / I hope</span>
                        <span class="badge-time">I promise</span>
                        <span class="badge-time">Probably</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Prediction:</strong> Veriye dayanmayan, şahsi tahmin ve görüşler (think, hope, believe).</li>
                            <li><strong>Instant Decision:</strong> Konuşma anında verilen kararlar (Telefon çalıyor, ben bakarım).</li>
                            <li><strong>Promise/Threat:</strong> Söz verme veya tehdit durumları.</li>
                            <li><strong>Future Fact:</strong> Gelecek gerçekleri (Gelecek yıl 30 olacağım).</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">I think humans <span class="highlight-verb">will live</span> on Mars one day.</div>
                            <div class="example-text">Don't worry, I <span class="highlight-verb">will help</span> you. (Promise)</div>
                            <div class="example-text">Hold on, I <span class="highlight-verb">will open</span> the door. (Decision)</div>
                        </div>
                    </td>
                </tr>

                <!-- Be Going To -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-slate-800 dark:text-white">Be Going To</div>
                        <span class="badge-str">am/is/are going to</span>
                    </td>
                    <td class="p-4 hidden sm:table-cell">
                        <span class="badge-time">Next week</span>
                        <span class="badge-time">Tonight</span>
                        <span class="badge-time">According to...</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Planned Action:</strong> Önceden karar verilmiş, tasarlanmış niyetler.</li>
                            <li><strong>Evidence-based Prediction:</strong> Güçlü bir kanıta dayalı tahmin (Bulutlar kara, yağmur yağacak).</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">We <span class="highlight-verb">are going to visit</span> London next summer. (Plan)</div>
                            <div class="example-text">Look at that car! It <span class="highlight-verb">is going to crash</span>! (Evidence)</div>
                        </div>
                    </td>
                </tr>

                <!-- Future Continuous -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-slate-800 dark:text-white">Future Cont.</div>
                        <span class="badge-str">Will be + Ving</span>
                    </td>
                    <td class="p-4 hidden sm:table-cell">
                        <span class="badge-time">This time tomorrow</span>
                        <span class="badge-time">At 10 AM next Monday</span>
                        <span class="badge-time">In two years' time</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Process in Future:</strong> Gelecekte belli bir anda yapıyor olacağımız işler.</li>
                            <li><strong>Polite Question:</strong> Birinin planını kibarca sormak için (Will you be using the car?).</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">This time tomorrow, I <span class="highlight-verb">will be sunbathing</span> in Antalya.</div>
                            <div class="example-text">Don't call me at 8. I <span class="highlight-verb">will be having</span> dinner.</div>
                        </div>
                    </td>
                </tr>

                <!-- Future Perfect -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-slate-800 dark:text-white">Future Perfect</div>
                        <span class="badge-str">Will have + V3</span>
                    </td>
                    <td class="p-4 hidden sm:table-cell">
                        <span class="badge-time">By / By the time</span>
                        <span class="badge-time">By 2050</span>
                        <span class="badge-time">By next week</span>
                        <span class="badge-time">In 5 years</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Completion in Future:</strong> Gelecekte belli bir tarihe gelindiğinde eylemin <em>bitmiş olacağını</em> bildirir.</li>
                            <li><strong>Exam Tip:</strong> "By + Gelecek Tarih" görürseniz %90 bu tense.</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">By 2030, we <span class="highlight-verb">will have consumed</span> half of the resources.</div>
                            <div class="example-text">I <span class="highlight-verb">will have finished</span> the report by 5 PM.</div>
                        </div>
                    </td>
                </tr>

                 <!-- Future Perfect Continuous -->
                 <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-slate-800 dark:text-white">Fut. Perf. Cont.</div>
                        <span class="badge-str">Will have been + Ving</span>
                    </td>
                    <td class="p-4 hidden sm:table-cell">
                        <span class="badge-time">By... for...</span>
                        <span class="badge-time">By next year... for 10 years</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Duration in Future:</strong> Gelecekte bir noktaya gelindiğinde, bir işi ne kadar süredir yapıyor olacağımızı anlatır.</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">By next month, I <span class="highlight-verb">will have been working</span> here for 10 years.</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<!-- 5. HABITUAL & PAST PLANS (DETAILED) -->
<section class="conj-section searchable-section" data-cat="Habitual">
    <div class="flex items-center gap-3 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div class="w-10 h-10 rounded bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 flex items-center justify-center text-xl font-bold">🔄</div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Habitual Past & Modals</h2>
    </div>
    <div class="overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse">
            <thead class="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                <tr>
                    <th class="p-4 w-1/5">Structure</th>
                    <th class="p-4 w-1/5 hidden sm:table-cell">Keywords</th>
                    <th class="p-4 w-1/3">Detailed Usage</th>
                    <th class="p-4 w-1/3 hidden md:table-cell">Examples</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                
                <!-- Used to -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-slate-800 dark:text-white">Used to</div>
                        <span class="badge-str">Used to + V1</span>
                    </td>
                    <td class="p-4 hidden sm:table-cell">
                        <span class="badge-time">In the past</span>
                        <span class="badge-time">When I was young</span>
                        <span class="badge-time">No longer / Anymore</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Past Habits:</strong> Eskiden yapılan ama artık yapılmayan eylemler.</li>
                            <li><strong>Past States:</strong> Eskiden geçerli olan gerçekler/durumlar (be, live, have).</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">I <span class="highlight-verb">used to smoke</span> a lot, but I quit.</div>
                            <div class="example-text">There <span class="highlight-verb">used to be</span> a park here.</div>
                        </div>
                    </td>
                </tr>

                <!-- Would (Past Habit) -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-slate-800 dark:text-white">Would (Habit)</div>
                        <span class="badge-str">Would + V1</span>
                    </td>
                    <td class="p-4 hidden sm:table-cell">
                        <span class="badge-time">In those days</span>
                        <span class="badge-time">Whenever...</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Repeated Actions:</strong> Geçmişte sıkça tekrarlanan rutinler (nostaljik anlatım).</li>
                            <li><strong>Rule:</strong> "State Verbs" (sevmek, olmak, sahip olmak) ile KULLANILMAZ. Sadece aksiyon fiilleri.</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">My dad <span class="highlight-verb">would take</span> us to the cinema every Friday.</div>
                        </div>
                    </td>
                </tr>

                <!-- Was Going To -->
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 align-top">
                    <td class="p-4">
                        <div class="font-bold text-lg text-slate-800 dark:text-white">Future in Past</div>
                        <span class="badge-str">Was/Were going to</span>
                    </td>
                    <td class="p-4 hidden sm:table-cell">
                        <span class="badge-time">But</span>
                        <span class="badge-time">However</span>
                        <span class="badge-time">Unfortunately</span>
                    </td>
                    <td class="p-4">
                        <ul class="usage-list">
                            <li><strong>Unfulfilled Plan:</strong> Geçmişte niyetlenilen ama çeşitli sebeplerle yapılamayan eylemler.</li>
                            <li>Genellikle "ama" ile devam eden bir mazeret cümlesi takip eder.</li>
                        </ul>
                    </td>
                    <td class="p-4 hidden md:table-cell">
                        <div class="example-block">
                            <div class="example-text">I <span class="highlight-verb">was going to visit</span> you, but I got sick.</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</section>
`;
document.getElementById('tab-tenses').innerHTML = tensesHTML;
