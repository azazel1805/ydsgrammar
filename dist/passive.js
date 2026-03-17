
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
<div class="w-full bg-gray-50 rounded-full h-3">
<div class="bg-black h-3 rounded-full w-[80%]"></div>
</div>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mt-4">

<div class="bg-gray-50 p-3 rounded">
<p class="font-bold text-red-400">⚠ Trap</p>
<p>People say that → It is said that</p>
<p>Have done → Have been done</p>
</div>

<div class="bg-gray-50 p-3 rounded">
<p class="font-bold text-green-400">✔ Probability</p>
<p>Be + V3 = 90%</p>
<p>Get + V3 = Modern passive</p>
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
 <input type="text" onkeyup="filterTab(this)" placeholder="Passive ara: being done, to be done, intransitive..." 
 class="block w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium">
 </div>
</div>


<!-- 1. Temel ve İleri Passive Tablosu -->
<section class="passive-section bg-white rounded-lg shadow border border-slate-200 overflow-hidden mb-6">
 <div class="p-4 bg-orange-50 border-b border-orange-100 flex items-center gap-3">
 <div class="w-10 h-10 rounded bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl"><i class="fa-solid fa-user-shield"></i></div>
 <div>
 <h2 class="text-xl font-bold text-orange-800 ">Master Passive Matrix</h2>
 <p class="text-xs text-slate-500 ">Formül: <span class="font-mono bg-orange-200 px-1 rounded">BE + V3</span> (Be fiili zamana göre çekimlenir)</p>
 </div>
 </div>
<div class="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
 <h3 class="font-bold text-blue-700 mb-2">
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
 <thead class="bg-slate-50 text-xs uppercase text-slate-500">
 <tr><th class="p-4 w-1/5">Tense / Structure</th><th class="p-4 w-1/4">Active Form</th><th class="p-4 w-1/4">Passive Form</th><th class="p-4">Example</th></tr>
 </thead>
 <tbody class="divide-y divide-slate-100 ">
 <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Simple Present</td><td class="p-4 text-xs text-slate-500">do / does</td><td class="p-4 font-bold text-orange-600">am/is/are + V3</td><td class="p-4">
    <div>Reports <span class="map-tag map-1">are written</span> daily.</div>
    <div class="map-tr-sentence">Raporlar günlük (olarak) <span class="map-tag map-1">yazılır</span>.</div>
</td></tr>
 <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Simple Past</td><td class="p-4 text-xs text-slate-500">did (V2)</td><td class="p-4 font-bold text-orange-600">was/were + V3</td><td class="p-4">
    <div>The window <span class="map-tag map-1">was broken</span> yesterday.</div>
    <div class="map-tr-sentence">Pencere dün <span class="map-tag map-1">kırıldı</span>.</div>
</td></tr>
 <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Present Cont.</td><td class="p-4 text-xs text-slate-500">am/is/are Ving</td><td class="p-4 font-bold text-orange-600">am/is/are BEING + V3</td><td class="p-4 italic">The room <span class="highlight-verb">is being cleaned</span> now.</td></tr>
 <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Past Cont.</td><td class="p-4 text-xs text-slate-500">was/were Ving</td><td class="p-4 font-bold text-orange-600">was/were BEING + V3</td><td class="p-4 italic">The car <span class="highlight-verb">was being repaired</span> when I came.</td></tr>
 <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Present Perfect</td><td class="p-4 text-xs text-slate-500">have/has V3</td><td class="p-4 font-bold text-orange-600">have/has BEEN + V3</td><td class="p-4">
    <div>The project <span class="map-tag map-1">has been finished</span>.</div>
    <div class="map-tr-sentence">Proje <span class="map-tag map-1">tamamlandı</span>.</div>
</td></tr>
 <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Past Perfect</td><td class="p-4 text-xs text-slate-500">had V3</td><td class="p-4 font-bold text-orange-600">had BEEN + V3</td><td class="p-4 italic">It <span class="highlight-verb">had been done</span> before noon.</td></tr>
 <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Future (Will)</td><td class="p-4 text-xs text-slate-500">will V1</td><td class="p-4 font-bold text-orange-600">will BE + V3</td><td class="p-4 italic">It <span class="highlight-verb">will be solved</span> soon.</td></tr>
 <tr class="hover:bg-slate-50"><td class="p-4 font-bold">Modals</td><td class="p-4 text-xs text-slate-500">can/must/should V1</td><td class="p-4 font-bold text-orange-600">Modal + BE + V3</td><td class="p-4">
    <div>Rules <span class="map-tag map-1">must be followed</span>.</div>
    <div class="map-tr-sentence">Kurallara <span class="map-tag map-1">UYULMALIDIR</span>.</div>
</td></tr>
 <tr class="hover:bg-slate-50 bg-orange-50/50 "><td class="p-4 font-bold text-rose-600">Perfect Modals</td><td class="p-4 text-xs text-slate-500">must have V3</td><td class="p-4 font-bold text-rose-600">Modal + have BEEN + V3</td><td class="p-4 italic">The file <span class="highlight-verb">must have been deleted</span>.</td></tr>
 <tr class="hover:bg-slate-50 bg-blue-50/50 "><td class="p-4 font-bold text-black">Infinitive</td><td class="p-4 text-xs text-slate-500">to V1</td><td class="p-4 font-bold text-black">to BE + V3</td><td class="p-4 italic">I want <span class="highlight-verb">to be informed</span> immediately.</td></tr>
 <tr class="hover:bg-slate-50 bg-blue-50/50 "><td class="p-4 font-bold text-black">Gerund</td><td class="p-4 text-xs text-slate-500">Ving</td><td class="p-4 font-bold text-black">BEING + V3</td><td class="p-4 italic">I hate <span class="highlight-verb">being lied</span> to.</td></tr>
 </tbody>
 </table>
</section>

<!-- 2. Impersonal Passive (YDS Special) -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <section class="bg-white rounded-lg shadow border border-slate-200 p-5">
 <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
 <span class="bg-purple-100 text-red-800 px-2 py-1 rounded text-xs uppercase">Exam Core</span>
 Impersonal Passive
 </h3>
 <p class="text-sm text-slate-600 mb-4">
 Genel kanı bildiren fiillerle (think, believe, say, claim, allege) yapılır. İki yolu vardır:
 </p>
 
 <div class="space-y-4">
 <div class="border-l-4 border-purple-500 pl-4 bg-purple-50 py-2">
 <div class="text-xs font-bold text-red-800 mb-1">YÖNTEM 1: "It" ile başlama</div>
 <div class="font-mono text-sm">It is + V3 + that + Cümle</div>
 <div class="text-sm italic mt-1">
    <div><span class="map-tag map-1">It is said that</span> he is rich.</div>
    <div class="map-tr-sentence">Onun zengin <span class="map-tag map-1">olduğu söyleniyor</span>.</div>
 </div>
 <div class="text-xs text-slate-500">(Zenginin olduğu söyleniyor)</div>
 </div>

 <div class="border-l-4 border-rose-500 pl-4 bg-rose-50 py-2">
 <div class="text-xs font-bold text-rose-600 mb-1">YÖNTEM 2: Özne ile başlama (ZOR)</div>
 <div class="font-mono text-sm">Subject + be + V3 + TO...</div>
 <div class="mt-2 space-y-2">
  <div class="text-xs">
  <span class="badge-str">to V1</span> (Eş zamanlı)<br>
  Ex: <span class="map-tag map-1">He is said</span> <span class="map-tag map-2">to be</span> rich.
  <div class="map-tr-sentence">Onun zengin <span class="map-tag map-2">olduğu</span> <span class="map-tag map-1">söyleniyor</span>.</div>
  </div>
  <div class="text-xs">
  <span class="badge-str">to have V3</span> (Geçmişe referans)<br>
  Ex: <span class="map-tag map-1">He is said</span> <span class="map-tag map-2">to have stolen</span> the money.
  <div class="map-tr-sentence">Parayı <span class="map-tag map-2">çalmış olduğu</span> <span class="map-tag map-1">söyleniyor</span>.</div>
  </div>
  <div class="text-xs">
  <span class="badge-str">to be Ving</span> (Şu an devam eden)<br>
  Ex: <span class="map-tag map-1">He is believed</span> <span class="map-tag map-2">to be hiding</span> now.
  <div class="map-tr-sentence">Onun şu an <span class="map-tag map-2">saklanmakta olduğu</span> <span class="map-tag map-1">inanılıyor</span>.</div>
  </div>
 </div>
 </div>
 </div>
 </section>

 <!-- 3. Causatives & Traps -->
 <div class="space-y-6">
 <!-- Causatives -->
 <section class="bg-white rounded-lg shadow border border-slate-200 p-5">
 <h3 class="font-bold text-lg mb-3 text-teal-700 ">Causatives (Ettirgen)</h3>
 <table class="w-full text-xs">
 <tr class="border-b "><td class="py-2 font-bold">Have s.o. DO</td><td class="py-2">I had the mechanic <span class="font-bold text-teal-600">fix</span> my car.</td></tr>
 <tr class="border-b "><td class="py-2 font-bold">Get s.o. TO DO</td><td class="py-2">I got my brother <span class="font-bold text-teal-600">to help</span> me.</td></tr>
 <tr class="border-b "><td class="py-2 font-bold">Make s.o. DO</td><td class="py-2">She made me <span class="font-bold text-teal-600">cry</span>.</td></tr>
 <tr class="bg-teal-50 "><td class="py-2 font-bold pl-2">PASSIVE FORM</td><td class="py-2">Have/Get something <span class="font-bold text-teal-600">V3 (DONE)</span><br><em>I had my hair cut.</em></td></tr>
 </table>
 </section>

 <!-- TRAP ALERT -->
 <section class="bg-red-50 rounded-lg border border-red-200 p-5">
 <div class="flex items-center gap-2 mb-2 text-red-700 font-bold">
 <i class="fa-solid fa-triangle-exclamation"></i> YDS TRAP: Intransitive Verbs
 </div>
 <p class="text-sm text-slate-700 mb-2">
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
