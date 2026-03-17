
const tensesHTML = `

<!-- ===================================== -->
<!-- YDS TENSES TACTICAL PANEL -->
<!-- ===================================== -->

<!-- Action Bar (Print) -->
<div class="flex justify-end mb-4 no-print">
    <button onclick="window.print()" class="print-btn flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg active:scale-95">
        <i class="fas fa-file-pdf"></i> PDF İndir / Yazdır
    </button>
</div>

<div class="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-black p-6 rounded-2xl shadow-xl no-print">

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
<div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 no-print">
 <div class="relative w-full">
 <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
 <input type="text" onkeyup="filterTab(this)" placeholder="Tenses içinde ara: past perfect, by the time..." 
 class="block w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium">
 </div>
</div>

<section class="conj-section searchable-section" data-cat="Agreement">
 <div class="flex items-center gap-3 mb-4 border-b border-slate-200 pb-2">
 <div class="w-10 h-10 rounded bg-emerald-100 text-red-800 flex items-center justify-center text-xl font-bold">🔗</div>
 <h2 class="text-2xl font-bold text-slate-800 ">Tense Agreement & Conditionals</h2>
 </div>
 
 <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
 
 <!-- Time Clause Rules -->
 <div class="rule-card">
 <div class="rule-header bg-blue-soft"><i class="fa-solid fa-clock mr-2"></i> Time Clauses (Zaman Bağlaçları)</div>
 <div class="p-0">
 <!-- Rule A -->
 <div class="combo-row">
 <div class="font-bold text-right text-blue-700 ">Present (Simple/Perf)</div>
 <div class="arrow-icon"><i class="fa-solid fa-arrow-right-long text-blue-400"></i><br><span class="text-[10px] font-bold uppercase tracking-wider text-gray-500">when / after</span></div>
 <div class="font-bold text-green-600 ">Future (Will / Modal)</div>
 </div>
 <div class="px-4 pb-3 text-xs text-slate-500 italic border-b border-slate-100 ">
 Ex: When he <span class="font-bold">arrives</span>, we <span class="font-bold">will start</span> the meeting.
 </div>
 
 <!-- Rule B -->
 <div class="combo-row">
 <div class="font-bold text-right text-purple-700 ">Simple Past (V2)</div>
 <div class="arrow-icon"><i class="fa-solid fa-arrow-right-long text-red-700"></i><br><span class="text-[10px] font-bold uppercase tracking-wider text-gray-500">when</span></div>
 <div class="font-bold text-purple-700 ">Simple Past (V2)</div>
 </div>
 <div class="px-4 pb-3 text-xs text-slate-500 italic border-b border-slate-100 ">
 Ex: When he <span class="font-bold">came</span> home, he <span class="font-bold">turned</span> on the TV. (Sequence)
 </div>

 <!-- Rule C -->
 <div class="combo-row">
 <div class="font-bold text-right text-purple-700 ">Past Cont. (was Ving)</div>
 <div class="arrow-icon"><i class="fa-solid fa-arrow-right-long text-red-700"></i><br><span class="text-[10px] font-bold uppercase tracking-wider text-gray-500">while / as</span></div>
 <div class="font-bold text-purple-700 ">Simple Past (V2)</div>
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
 <div class="font-bold text-red-800">Simple Past (V2)</div>
 </div>
 <div class="px-4 pb-3 text-xs text-slate-500 italic border-b border-slate-100 ">
 Ex: I <span class="font-bold">haven't seen</span> him since he <span class="font-bold">moved</span> to London.
 </div>

 <!-- By the time (Past) -->
 <div class="combo-row">
 <div class="font-bold text-right text-indigo-600">Past Perfect (Had V3)</div>
 <div class="arrow-icon"><i class="fa-solid fa-arrow-left-long text-gray-500"></i><br><span class="text-[10px] font-bold uppercase tracking-wider text-gray-500">by the time</span></div>
 <div class="font-bold text-red-800">Simple Past (V2)</div>
 </div>
 <div class="px-4 pb-3 text-xs text-slate-500 italic border-b border-slate-100 ">
 Ex: By the time we <span class="font-bold">arrived</span>, the movie <span class="font-bold">had started</span>.
 </div>

 <!-- By the time (Future) -->
 <div class="combo-row">
 <div class="font-bold text-right text-teal-600">Future Perfect</div>
 <div class="arrow-icon"><i class="fa-solid fa-arrow-left-long text-gray-500"></i><br><span class="text-[10px] font-bold uppercase tracking-wider text-gray-500">by the time</span></div>
 <div class="font-bold text-black">Simple Present (V1)</div>
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
 <table class="grammar-table w-full text-left text-sm">
 <thead class="bg-slate-50 text-xs uppercase font-bold text-slate-500">
 <tr>
 <th class="p-4 w-24">Type</th>
 <th class="p-4">Meaning (Anlam)</th>
 <th class="p-4">IF Clause Structure</th>
 <th class="p-4">Main Clause Structure</th>
 <th class="p-4">Example</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-slate-100 ">
 <!-- Type 0 -->
 <tr class="hover:bg-amber-50/50 ">
 <td class="p-4 font-bold text-amber-600">Type 0</td>
 <td class="p-4 text-xs font-medium">Genel Geçer / Bilimsel (Fact)</td>
 <td class="p-4"><span class="badge-str text-xs">Simple Present (V1)</span></td>
 <td class="p-4"><span class="badge-str text-xs">Simple Present (V1)</span></td>
 <td class="p-4 text-xs italic text-slate-600 "><div>If you <span class="map-tag map-1">heat</span> ice, it <span class="map-tag map-2">melts</span>.</div><div class="map-tr-sentence">Buzu <span class="map-tag map-1">ısıtırsan</span>, <span class="map-tag map-2">erir</span>.</div></td>
 </tr>
 <!-- Type 1 -->
 <tr class="hover:bg-amber-50/50 ">
 <td class="p-4 font-bold text-amber-600">Type 1</td>
 <td class="p-4 text-xs font-medium">Gelecek İhtimali (Real Future)</td>
 <td class="p-4"><span class="badge-str text-xs">Simple Present (V1)</span></td>
 <td class="p-4"><span class="badge-str text-xs">Will / Can / May + V1</span></td>
 <td class="p-4 text-xs italic text-slate-600 "><div>If it <span class="map-tag map-1">rains</span>, we <span class="map-tag map-2">will stay</span> home.</div><div class="map-tr-sentence">Yağmur <span class="map-tag map-1">yağarsa</span> evde <span class="map-tag map-2">kalacağız</span>.</div></td>
 </tr>
 <!-- Type 2 -->
 <tr class="hover:bg-amber-50/50 bg-amber-50/30">
 <td class="p-4 font-bold text-amber-700">Type 2</td>
 <td class="p-4 text-xs font-medium">Hayali Şimdiki Zaman (Unreal Present)</td>
 <td class="p-4"><span class="badge-str text-xs">Simple Past (V2)</span></td>
 <td class="p-4"><span class="badge-str text-xs">Would / Could + V1</span></td>
 <td class="p-4 text-xs italic text-slate-600 "><div>If I <span class="map-tag map-1">were</span> rich, I <span class="map-tag map-2">would buy</span> a boat.</div><div class="map-tr-sentence">Zengin <span class="map-tag map-1">olsaydım</span> bir tekne <span class="map-tag map-2">alır</span><span class="map-tag map-1">DIM</span>.</div></td>
 </tr>
 <!-- Type 3 -->
 <tr class="hover:bg-amber-50/50 bg-amber-50/30">
 <td class="p-4 font-bold text-amber-700">Type 3</td>
 <td class="p-4 text-xs font-medium">Geçmiş Pişmanlığı (Unreal Past)</td>
 <td class="p-4"><span class="badge-str text-xs">Past Perfect (Had V3)</span></td>
 <td class="p-4"><span class="badge-str text-xs">Would have + V3</span></td>
 <td class="p-4 text-xs italic text-slate-600 "><div>If I <span class="map-tag map-1">had known</span>, I <span class="map-tag map-2">would have come</span>.</div><div class="map-tr-sentence"><span class="map-tag map-1">Bilmiş olsaydım</span> <span class="map-tag map-2">gelirdim</span>.</div></td>
 </tr>
 <!-- Mixed -->
 <tr class="hover:bg-amber-50/50 border-l-4 border-l-amber-500">
 <td class="p-4 font-bold text-amber-800">Mixed</td>
 <td class="p-4 text-xs font-medium">Geçmiş Sebep ➜ Şimdiki Sonuç</td>
 <td class="p-4"><span class="badge-str text-xs">Past Perfect (Had V3)</span></td>
 <td class="p-4"><span class="badge-str text-xs">Would + V1 (now)</span></td>
 <td class="p-4 text-xs italic text-slate-600 "><div>If I <span class="map-tag map-1">hadn't spent</span> all my money, I <span class="map-tag map-2">would be</span> rich <u>now</u>.</div><div class="map-tr-sentence">Tüm paramı <span class="map-tag map-1">harcamasaydım</span> şu an zengin <span class="map-tag map-2">olurdum</span>.</div></td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>
 </div>
</section>

<!-- 2. PRESENT TENSES (DETAILED) -->
<section class="conj-section searchable-section" data-cat="Present">
 <div class="flex items-center gap-3 mb-3 border-b border-slate-200 pb-2">
 <div class="w-10 h-10 rounded bg-amber-100 text-amber-600 flex items-center justify-center text-xl font-bold">☀️</div>
 <h2 class="text-2xl font-bold text-slate-800 ">Present Tenses</h2>
 </div>
 <div class="overflow-hidden bg-white rounded-lg shadow border border-slate-200 ">
 <table class="grammar-table w-full text-left border-collapse">
 <thead class="bg-slate-50 text-xs uppercase text-slate-500 font-semibold tracking-wider">
 <tr>
 <th class="p-4">Tense & Structure</th>
 <th class="p-4">Keywords (Time Exp)</th>
 <th class="p-4">Detailed Usage & Explanations</th>
 <th class="p-4">Examples</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-slate-100 text-sm">
 
 <!-- Simple Present -->
 <tr class="hover:bg-slate-50 align-top">
 <td class="p-4">
 <div class="font-bold text-lg text-slate-800 ">Simple Present</div>
 <span class="badge-str">S + V1 / Vs</span>
 <div class="mt-2 text-xs text-slate-500">Neg: do/does not + V1</div>
 </td>
 <td class="p-4">
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
 <td class="p-4">
 <div class="example-block">
 <div class="example-text"><div>Recent studies <span class="map-tag map-1">show</span> that global temperatures are rising.</div><div class="map-tr-sentence">Son çalışmalar küresel sıcaklıkların arttığını <span class="map-tag map-1">gösteriyor</span> (Genel Gerçek).</div></div>
 <div class="example-text"><div>The international conference <span class="map-tag map-1">commences</span> tomorrow at 9 AM.</div><div class="map-tr-sentence">Uluslararası konferans yarın sabah 9'da <span class="map-tag map-1">başlıyor</span> (Tarife).</div></div>
 <div class="example-text"><div>The author <span class="map-tag map-1">argues</span> that early intervention is crucial.</div><div class="map-tr-sentence">Yazar, erken müdahalenin hayati olduğunu <span class="map-tag map-1">savunuyor</span>.</div></div>
 </div>
 </td>
 </tr>

 <!-- Present Continuous -->
 <tr class="hover:bg-slate-50 align-top">
 <td class="p-4">
 <div class="font-bold text-lg text-slate-800 ">Present Cont.</div>
 <span class="badge-str">am/is/are + Ving</span>
 </td>
 <td class="p-4">
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
 <td class="p-4">
 <div class="example-block">
 <div class="example-text"><div>Currently, researchers <span class="map-tag map-1">are investigating</span> the long-term effects.</div><div class="map-tr-sentence">Şu anda araştırmacılar uzun vadeli etkileri <span class="map-tag map-1">inceliyorlar</span>.</div></div>
 <div class="example-text"><div>Urbanization <span class="map-tag map-1">is increasingly reshaping</span> the structure.</div><div class="map-tr-sentence">Kentleşme yapıyı <span class="map-tag map-1">giderek yeniden şekillendiriyor</span> (Trend).</div></div>
 <div class="example-text"><div>The industry <span class="map-tag map-1">is constantly evolving</span>.</div><div class="map-tr-sentence">Sektör <span class="map-tag map-1">sürekli evriliyor</span> (Değişim).</div></div>
 </div>
 </td>
 </tr>

 <!-- Present Perfect -->
 <tr class="hover:bg-slate-50 align-top">
 <td class="p-4">
 <div class="font-bold text-lg text-slate-800 ">Present Perfect</div>
 <span class="badge-str">Have/Has + V3</span>
 </td>
 <td class="p-4">
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
 <td class="p-4">
 <div class="example-block">
 <div class="example-text"><div>Scientists <span class="map-tag map-1">have recently discovered</span> a new species.</div><div class="map-tr-sentence">Bilim insanları son zamanlarda yeni bir tür <span class="map-tag map-1">keşfettiler</span>.</div></div>
 <div class="example-text"><div>The government <span class="map-tag map-1">has implemented</span> several new policies so far.</div><div class="map-tr-sentence">Hükümet şu ana kadar birkaç yeni politikayı <span class="map-tag map-1">uygulamaya koydu</span>.</div></div>
 <div class="example-text"><div>It is the first time such a study <span class="map-tag map-1">has been conducted</span>.</div><div class="map-tr-sentence">Böyle kapsamlı bir çalışma ilk kez <span class="map-tag map-1">yürütülüyor</span>.</div></div>
 </div>
 </td>
 </tr>

 <!-- Present Perfect Continuous -->
 <tr class="hover:bg-slate-50 align-top">
 <td class="p-4">
 <div class="font-bold text-lg text-slate-800 ">Pres. Perf. Cont.</div>
 <span class="badge-str">Have/Has been + Ving</span>
 </td>
 <td class="p-4">
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
 <td class="p-4">
 <div class="example-block">
 <div class="example-text"><div>The committee <span class="map-tag map-1">has been trying</span> to resolve the crisis.</div><div class="map-tr-sentence">Komite aylardır krizi çözmeye <span class="map-tag map-1">çalışıyor</span> (Süreç).</div></div>
 <div class="example-text"><div>Inflation <span class="map-tag map-1">has been rising</span> rapidly.</div><div class="map-tr-sentence">Enflasyon hızla <span class="map-tag map-1">yükseliyor</span>.</div></div>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
</section>

<!-- 3. PAST TENSES (DETAILED) -->
<section class="conj-section searchable-section" data-cat="Past">
 <div class="flex items-center gap-3 mb-3 border-b border-slate-200 pb-2">
 <div class="w-10 h-10 rounded bg-blue-100 text-black flex items-center justify-center text-xl font-bold">🕰️</div>
 <h2 class="text-2xl font-bold text-slate-800 ">Past Tenses</h2>
 </div>
 <div class="overflow-hidden bg-white rounded-lg shadow border border-slate-200 ">
 <table class="grammar-table w-full text-left border-collapse">
 <thead class="bg-slate-50 text-xs uppercase text-slate-500 font-semibold tracking-wider">
 <tr>
 <th class="p-4">Tense & Structure</th>
 <th class="p-4">Keywords (Time Exp)</th>
 <th class="p-4">Detailed Usage & Explanations</th>
 <th class="p-4">Examples</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-slate-100 text-sm">
 
 <!-- Simple Past -->
 <tr class="hover:bg-slate-50 align-top">
 <td class="p-4">
 <div class="font-bold text-lg text-slate-800 ">Simple Past</div>
 <span class="badge-str">V2 (did)</span>
 </td>
 <td class="p-4">
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
 <td class="p-4">
 <div class="example-block">
 <div class="example-text"><div>The Industrial Revolution <span class="map-tag map-1">transformed</span> economies in the 19th century.</div><div class="map-tr-sentence">Sanayi Devrimi 19. yüzyılda ekonomileri <span class="map-tag map-1">dönüştürdü</span>.</div></div>
 <div class="example-text"><div>The researchers <span class="map-tag map-1">analyzed</span> the data and <span class="map-tag map-2">published</span> findings.</div><div class="map-tr-sentence">Araştırmacılar verileri <span class="map-tag map-1">analiz ettiler</span> ve bulguları <span class="map-tag map-2">yayınladılar</span>.</div></div>
 <div class="example-text"><div>It is time governments <span class="map-tag map-1">took</span> decisive action.</div><div class="map-tr-sentence">Hükümetlerin kararlı adımlar <span class="map-tag map-1">atma</span> vakti geldi.</div></div>
 </div>
 </td>
 </tr>

 <!-- Past Continuous -->
 <tr class="hover:bg-slate-50 align-top">
 <td class="p-4">
 <div class="font-bold text-lg text-slate-800 ">Past Continuous</div>
 <span class="badge-str">Was/Were + Ving</span>
 </td>
 <td class="p-4">
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
 <td class="p-4">
 <div class="example-block">
 <div class="example-text"><div>The economy <span class="map-tag map-1">was recovering</span> when the pandemic struck.</div><div class="map-tr-sentence">Pandemi vurduğunda ekonomi <span class="map-tag map-1">toparlanıyordu</span> (Yarıda kesilme).</div></div>
 <div class="example-text"><div>While European powers <span class="map-tag map-1">were expanding</span>, cultures <span class="map-tag map-2">were declining</span>.</div><div class="map-tr-sentence">Avrupalı güçler <span class="map-tag map-1">yayılırken</span>, yerel kültürler <span class="map-tag map-2">geriliyordu</span>.</div></div>
 </div>
 </td>
 </tr>

 <!-- Past Perfect -->
 <tr class="hover:bg-slate-50 align-top">
 <td class="p-4">
 <div class="font-bold text-lg text-slate-800 ">Past Perfect</div>
 <span class="badge-str">Had + V3</span>
 </td>
 <td class="p-4">
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
 <td class="p-4">
 <div class="example-block">
 <div class="example-text"><div>By the time they arrived, survivors <span class="map-tag map-1">had already relocated</span>.</div><div class="map-tr-sentence">Onlar vardığında, hayatta kalanlar çoktan <span class="map-tag map-1">yer değiştirmişlerdi</span>.</div></div>
 <div class="example-text"><div>The project failed because management <span class="map-tag map-1">had ignored</span> warnings.</div><div class="map-tr-sentence">Proje başarısız oldu çünkü yönetim uyarıları <span class="map-tag map-1">görmezden gelmişti</span>.</div></div>
 <div class="example-text"><div>No sooner <span class="map-tag map-1">had the treaty been signed</span> than hostilities resumed.</div><div class="map-tr-sentence">Anlaşma <span class="map-tag map-1">imzalanır imzalanmaz</span> çatışmalar yeniden başladı.</div></div>
 </div>
 </td>
 </tr>

 <!-- Past Perfect Continuous -->
 <tr class="hover:bg-slate-50 align-top">
 <td class="p-4">
 <div class="font-bold text-lg text-slate-800 ">Past Perf. Cont.</div>
 <span class="badge-str">Had been + Ving</span>
 </td>
 <td class="p-4">
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
 <td class="p-4">
 <div class="example-block">
 <div class="example-text"><div>The roads were wet because it <span class="map-tag map-1">had been raining</span> all night.</div><div class="map-tr-sentence">Yollar ıslaktı çünkü bütün gece yağmur <span class="map-tag map-1">yağmaktaydı</span>.</div></div>
 <div class="example-text"><div>He <span class="map-tag map-1">had been working</span> for 10 years when he got promoted.</div><div class="map-tr-sentence">Terfi aldığında 10 yıldır <span class="map-tag map-1">çalışmaktaydı</span>.</div></div>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
</section>

<!-- 4. FUTURE TENSES (DETAILED) -->
<section class="conj-section searchable-section" data-cat="Future">
 <div class="flex items-center gap-3 mb-3 border-b border-slate-200 pb-2">
 <div class="w-10 h-10 rounded bg-violet-100 text-violet-600 flex items-center justify-center text-xl font-bold">🚀</div>
 <h2 class="text-2xl font-bold text-slate-800 ">Future Tenses</h2>
 </div>
 <div class="overflow-hidden bg-white rounded-lg shadow border border-slate-200 ">
 <table class="grammar-table w-full text-left border-collapse">
 <thead class="bg-slate-50 text-xs uppercase text-slate-500 font-semibold tracking-wider">
 <tr>
 <th class="p-4">Tense & Structure</th>
 <th class="p-4">Keywords (Time Exp)</th>
 <th class="p-4">Detailed Usage & Explanations</th>
 <th class="p-4">Examples</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-slate-100 text-sm">
 
 <!-- Future Simple (Will) -->
 <tr class="hover:bg-slate-50 align-top">
 <td class="p-4">
 <div class="font-bold text-lg text-slate-800 ">Future Simple</div>
 <span class="badge-str">Will + V1</span>
 </td>
 <td class="p-4">
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
 <td class="p-4">
 <div class="example-block">
 <div class="example-text"><div>I think humans <span class="map-tag map-1">will live</span> on Mars one day.</div><div class="map-tr-sentence">Bence insanlar bir gün Mars'ta <span class="map-tag map-1">yaşayacaklar</span>.</div></div>
 <div class="example-text"><div>Don't worry, I <span class="map-tag map-1">will help</span> you.</div><div class="map-tr-sentence">Korkma, sana <span class="map-tag map-1">yardım edeceğim</span> (Söz).</div></div>
 <div class="example-text"><div>Hold on, I <span class="map-tag map-1">will open</span> the door.</div><div class="map-tr-sentence">Bekle, kapıyı <span class="map-tag map-1">ben açarım</span> (Karar).</div></div>
 </div>
 </td>
 </tr>

 <!-- Be Going To -->
 <tr class="hover:bg-slate-50 align-top">
 <td class="p-4">
 <div class="font-bold text-lg text-slate-800 ">Be Going To</div>
 <span class="badge-str">am/is/are going to</span>
 </td>
 <td class="p-4">
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
 <td class="p-4">
 <div class="example-block">
 <div class="example-text"><div>We <span class="map-tag map-1">are going to visit</span> London next summer.</div><div class="map-tr-sentence">Gelecek yaz Londra'yı <span class="map-tag map-1">ziyaret edeceğiz</span> (Plan).</div></div>
 <div class="example-text"><div>Look at that car! It <span class="map-tag map-1">is going to crash</span>!</div><div class="map-tr-sentence">Şu arabaya bak! <span class="map-tag map-1">Kaza yapacak</span>! (Kanıt).</div></div>
 </div>
 </td>
 </tr>

 <!-- Future Continuous -->
 <tr class="hover:bg-slate-50 align-top">
 <td class="p-4">
 <div class="font-bold text-lg text-slate-800 ">Future Cont.</div>
 <span class="badge-str">Will be + Ving</span>
 </td>
 <td class="p-4">
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
 <td class="p-4">
 <div class="example-block">
 <div class="example-text"><div>Tomorrow, I <span class="map-tag map-1">will be sunbathing</span>.</div><div class="map-tr-sentence">Yarın bu saatlerde <span class="map-tag map-1">güneşleniyor olacağım</span>.</div></div>
 <div class="example-text"><div>Don't call me at 8. I <span class="map-tag map-1">will be having</span> dinner.</div><div class="map-tr-sentence">Beni 8'de arama. Yemek <span class="map-tag map-1">yiyor olacağım</span>.</div></div>
 </div>
 </td>
 </tr>

 <!-- Future Perfect -->
 <tr class="hover:bg-slate-50 align-top">
 <td class="p-4">
 <div class="font-bold text-lg text-slate-800 ">Future Perfect</div>
 <span class="badge-str">Will have + V3</span>
 </td>
 <td class="p-4">
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
 <td class="p-4">
 <div class="example-block">
 <div class="example-text"><div>By 2030, we <span class="map-tag map-1">will have consumed</span> half of resources.</div><div class="map-tr-sentence">2030'a kadar kaynakların yarısını <span class="map-tag map-1">tüketmiş olacağız</span>.</div></div>
 <div class="example-text"><div>I <span class="map-tag map-1">will have finished</span> the report by 5 PM.</div><div class="map-tr-sentence">Raporu saat 5'e kadar <span class="map-tag map-1">bitirmiş olacağım</span>.</div></div>
 </div>
 </td>
 </tr>

 <!-- Future Perfect Continuous -->
 <tr class="hover:bg-slate-50 align-top">
 <td class="p-4">
 <div class="font-bold text-lg text-slate-800 ">Fut. Perf. Cont.</div>
 <span class="badge-str">Will have been + Ving</span>
 </td>
 <td class="p-4">
 <span class="badge-time">By... for...</span>
 <span class="badge-time">By next year... for 10 years</span>
 </td>
 <td class="p-4">
 <ul class="usage-list">
 <li><strong>Duration in Future:</strong> Gelecekte bir noktaya gelindiğinde, bir işi ne kadar süredir yapıyor olacağımızı anlatır.</li>
 </ul>
 </td>
 <td class="p-4">
 <div class="example-block">
 <div class="example-text"><div>By next month, I <span class="map-tag map-1">will have been working</span> here for 10 years.</div><div class="map-tr-sentence">Gelecek ay buradaki 10. <span class="map-tag map-1">çalışma yılımı doldurmuş olacağım</span>.</div></div>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
</section>

<!-- 5. HABITUAL & PAST PLANS (DETAILED) -->
<section class="conj-section searchable-section" data-cat="Habitual">
 <div class="flex items-center gap-3 mb-3 border-b border-slate-200 pb-2">
 <div class="w-10 h-10 rounded bg-pink-100 text-pink-600 flex items-center justify-center text-xl font-bold">🔄</div>
 <h2 class="text-2xl font-bold text-slate-800 ">Habitual Past & Modals</h2>
 </div>
 <div class="overflow-hidden bg-white rounded-lg shadow border border-slate-200 ">
 <table class="grammar-table w-full text-left border-collapse">
 <thead class="bg-slate-50 text-xs uppercase text-slate-500 font-semibold tracking-wider">
 <tr>
 <th class="p-4">Structure</th>
 <th class="p-4">Keywords</th>
 <th class="p-4">Detailed Usage</th>
 <th class="p-4">Examples</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-slate-100 text-sm">
 
 <!-- Used to -->
 <tr class="hover:bg-slate-50 align-top">
 <td class="p-4">
 <div class="font-bold text-lg text-slate-800 ">Used to</div>
 <span class="badge-str">Used to + V1</span>
 </td>
 <td class="p-4">
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
 <td class="p-4">
 <div class="example-block">
 <div class="example-text"><div>I <span class="map-tag map-1">used to smoke</span> a lot, but I quit.</div><div class="map-tr-sentence">Eskiden çok <span class="map-tag map-1">sigara içerdim</span> ama bıraktım.</div></div>
 <div class="example-text"><div>There <span class="map-tag map-1">used to be</span> a park here.</div><div class="map-tr-sentence">Burada eskiden bir park <span class="map-tag map-1">vardı</span>.</div></div>
 </div>
 </td>
 </tr>

 <!-- Would (Past Habit) -->
 <tr class="hover:bg-slate-50 align-top">
 <td class="p-4">
 <div class="font-bold text-lg text-slate-800 ">Would (Habit)</div>
 <span class="badge-str">Would + V1</span>
 </td>
 <td class="p-4">
 <span class="badge-time">In those days</span>
 <span class="badge-time">Whenever...</span>
 </td>
 <td class="p-4">
 <ul class="usage-list">
 <li><strong>Repeated Actions:</strong> Geçmişte sıkça tekrarlanan rutinler (nostaljik anlatım).</li>
 <li><strong>Rule:</strong> "State Verbs" (sevmek, olmak, sahip olmak) ile KULLANILMAZ. Sadece aksiyon fiilleri.</li>
 </ul>
 </td>
 <td class="p-4">
 <div class="example-block">
 <div class="example-text"><div>My dad <span class="map-tag map-1">would take</span> us to the cinema.</div><div class="map-tr-sentence">Babam bizi her Cuma sinemaya <span class="map-tag map-1">götürürdü</span>.</div></div>
 </div>
 </td>
 </tr>

 <!-- Was Going To -->
 <tr class="hover:bg-slate-50 align-top">
 <td class="p-4">
 <div class="font-bold text-lg text-slate-800 ">Future in Past</div>
 <span class="badge-str">Was/Were going to</span>
 </td>
 <td class="p-4">
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
 <td class="p-4">
 <div class="example-block">
 <div class="example-text"><div>I <span class="map-tag map-1">was going to visit</span> you, but I got sick.</div><div class="map-tr-sentence">Seni <span class="map-tag map-1">ziyaret edecektim</span> ama hasta oldum.</div></div>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
</section>

<!-- 6. INTERACTIVE DRAG & DROP PRACTICE -->
<section class="mt-8 searchable-section no-print" data-cat="Practice">
 <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
 <h3 class="text-xl font-bold mb-2 flex items-center gap-2 text-indigo-700 ">
 <i class="fa-solid fa-puzzle-piece"></i> Interactive Practice (Drag & Drop)
 </h3>
 <p class="text-sm text-slate-600 mb-6">Sürükle bırak yöntemiyle uygun zaman ifadesini veya fiil çekimini boşluklara yerleştirin.</p>
 
 <!-- Draggable Items -->
 <div class="flex flex-wrap gap-3 mb-8" id="dd-options">
 <div class="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg cursor-grab font-bold shadow-sm select-none border border-indigo-200 hover:scale-105 transition-transform" draggable="true" ondragstart="dragQuiz(event)" id="opt1">had persistently ignored</div>
 <div class="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg cursor-grab font-bold shadow-sm select-none border border-indigo-200 hover:scale-105 transition-transform" draggable="true" ondragstart="dragQuiz(event)" id="opt2">have recently discovered</div>
 <div class="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg cursor-grab font-bold shadow-sm select-none border border-indigo-200 hover:scale-105 transition-transform" draggable="true" ondragstart="dragQuiz(event)" id="opt3">are investigating</div>
 </div>

 <!-- Questions -->
 <div class="space-y-6 text-slate-800 font-medium text-lg leading-loose" id="dd-questions">
 <div class="flex flex-wrap items-center gap-2">
 <span>1. Scientists</span>
 <div class="w-48 h-10 rounded border-2 border-dashed border-slate-300 bg-white/50 flex items-center justify-center transition-colors" 
 ondrop="dropQuiz(event, 'opt2')" ondragover="allowDropQuiz(event)"></div>
 <span>a new species in the Amazon.</span>
 </div>
 
 <div class="flex flex-wrap items-center gap-2">
 <span>2. Currently, researchers</span>
 <div class="w-48 h-10 rounded border-2 border-dashed border-slate-300 bg-white/50 flex items-center justify-center transition-colors" 
 ondrop="dropQuiz(event, 'opt3')" ondragover="allowDropQuiz(event)"></div>
 <span>the long-term effects.</span>
 </div>
 
 <div class="flex flex-wrap items-center gap-2">
 <span>3. The project failed because the management</span>
 <div class="w-48 h-10 rounded border-2 border-dashed border-slate-300 bg-white/50 flex items-center justify-center transition-colors" 
 ondrop="dropQuiz(event, 'opt1')" ondragover="allowDropQuiz(event)"></div>
 <span>the warnings.</span>
 </div>
 </div>
 </div>
</section>
`;

// Drag and Drop Global Functions
window.allowDropQuiz = function (ev) {
    ev.preventDefault();
}

window.dragQuiz = function (ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.classList.add("opacity-50");
}

window.dropQuiz = function (ev, correctId) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedEl = document.getElementById(data);
    if (draggedEl) draggedEl.classList.remove("opacity-50");

    if (data === correctId) {
        ev.target.appendChild(draggedEl);
        ev.target.classList.replace("border-slate-300", "border-emerald-500");
        ev.target.classList.replace("", "");
        ev.target.classList.replace("border-dashed", "border-solid");
        ev.target.classList.replace("bg-white/50", "bg-emerald-50");
        ev.target.classList.replace("", "");

        draggedEl.classList.replace("cursor-grab", "cursor-default");
        draggedEl.classList.replace("hover:scale-105", "hover:scale-100");
        draggedEl.classList.add("animate-pulse");
        setTimeout(() => draggedEl.classList.remove("animate-pulse"), 1000);
        draggedEl.setAttribute("draggable", "false");
    } else {
        ev.target.classList.replace("border-slate-300", "border-rose-500");
        ev.target.classList.replace("", "");
        setTimeout(() => {
            ev.target.classList.replace("border-rose-500", "border-slate-300");
            ev.target.classList.replace("", "");
        }, 500);
    }
}

document.addEventListener("dragend", function (ev) {
    if (ev.target && ev.target.classList) {
        ev.target.classList.remove("opacity-50");
    }
});
document.getElementById('tab-tenses').innerHTML = tensesHTML;
