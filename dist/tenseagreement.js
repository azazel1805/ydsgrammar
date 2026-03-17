
const tenseAgreementHTML = `
<div class="max-w-5xl mx-auto px-4 py-10" id="tense-agreement-root">
  <!-- Action Bar (Print) -->
  <div class="flex justify-end mb-4 no-print">
      <button onclick="window.print()" class="print-btn flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg active:scale-95">
          <i class="fas fa-file-pdf"></i> PDF İndir / Yazdır
      </button>
  </div>

  <!-- HERO SECTION -->
  <div class="text-center mb-12">
    <div class="inline-flex items-center gap-3 bg-gradient-to-r from-blue-700 to-indigo-800 text-white px-8 py-4 rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-transform">
      <i class="fas fa-link text-2xl"></i>
      <span class="font-extrabold text-xl tracking-tight" style="font-family:'Playfair Display',serif;">Tense Agreement Mastery</span>
    </div>
    <h1 class="text-4xl font-extrabold text-slate-800 mb-4" style="font-family:'Playfair Display',serif;">Tense Uyumu & Zaman İlişkileri</h1>
    <p class="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed italic">
      "YDS & YDT sınavlarının en kritik noktası: Cümledeki zamanlar birbirine küsemez. İşte doğru eşleşmelerin matematiksel rehberi."
    </p>
  </div>

  <!-- CORE RULES GRID -->
  <div class="grid md:grid-cols-2 gap-8 mb-16">
    <!-- Basic Rule 1: Present Family -->
    <div class="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group">
      <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
      <div class="relative">
        <div class="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-200">
          <i class="fas fa-sun text-2xl"></i>
        </div>
        <h3 class="text-2xl font-bold text-slate-800 mb-4">Present/Future Grubu</h3>
        <p class="text-slate-600 mb-6 leading-relaxed">Present zamanlar (Simple, Cont, Perfect) genellikle birbirleriyle veya Future zamanlarla eşleşir.</p>
        <div class="space-y-3">
          <div class="flex items-center gap-3 bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
            <span class="font-bold text-emerald-800">Present</span>
            <i class="fas fa-arrows-left-right text-emerald-400"></i>
            <span class="font-bold text-emerald-800">Present / Future</span>
          </div>
          <div class="text-xs italic text-slate-500 mt-2">
            <div>I <span class="map-tag map-1">know</span> that he <span class="map-tag map-2">will come</span> tomorrow.</div>
            <div class="mt-1 opacity-70">Onun yarın <span class="map-tag map-2">geleceğini</span> <span class="map-tag map-1">biliyorum</span>.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Basic Rule 2: Past Family -->
    <div class="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group">
      <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
      <div class="relative">
        <div class="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-200">
          <i class="fas fa-moon text-2xl"></i>
        </div>
        <h3 class="text-2xl font-bold text-slate-800 mb-4">Past Grubu</h3>
        <p class="text-slate-600 mb-6 leading-relaxed">Cümle Past (V2) başladıysa, devamında %99 Past bir yapı (V2, was/were, had V3, would) gelmelidir.</p>
        <div class="space-y-3">
          <div class="flex items-center gap-3 bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
            <span class="font-bold text-indigo-800">Past (V2)</span>
            <i class="fas fa-arrows-left-right text-indigo-400"></i>
            <span class="font-bold text-indigo-800">Past / Would</span>
          </div>
          <div class="text-xs italic text-slate-500 mt-2">
            <div>She <span class="map-tag map-1">said</span> that she <span class="map-tag map-2">had finished</span> the work.</div>
            <div class="mt-1 opacity-70">İşi <span class="map-tag map-2">bitirmiş olduğunu</span> <span class="map-tag map-1">söyledi</span>.</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- TABLE: SYSTEMATIC AGREEMENT -->
  <div class="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden mb-16">
    <div class="bg-slate-900 px-8 py-6">
      <h3 class="text-white font-bold text-xl flex items-center gap-3">
        <i class="fas fa-table text-indigo-400"></i>
        Sistematik Zaman Tablosu (Matris)
      </h3>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-100">
            <th class="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Main Clause (Ana Cümle)</th>
            <th class="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">That / Noun Clause</th>
            <th class="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Uyumluluk</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="hover:bg-slate-50 transition-colors">
            <td class="px-8 py-6 font-bold text-slate-700">Present Simple / Perfect</td>
            <td class="px-8 py-6 text-slate-600">Any Present / Any Future</td>
            <td class="px-8 py-6"><span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">TAM UYUM</span></td>
          </tr>
          <tr class="hover:bg-slate-50 transition-colors">
            <td class="px-8 py-6 font-bold text-slate-700">Past Simple (V2)</td>
            <td class="px-8 py-6 text-slate-600">Past Simple / Past Perfect / Would</td>
            <td class="px-8 py-6"><span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">PAST UYUM</span></td>
          </tr>
          <tr class="hover:bg-slate-50 transition-colors bg-red-50/20">
            <td class="px-8 py-6 font-bold text-slate-700">Past Simple (V2)</td>
            <td class="px-8 py-6 text-red-600 font-medium">Present Simple / Will / Perfect</td>
            <td class="px-8 py-6"><span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">İSTİSNA DIŞI HATA</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- SECTION: TIME CLAUSES (THE CRITICAL PART) -->
  <div class="space-y-8 mb-16">
    <div class="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
      <i class="fas fa-hourglass-half text-amber-500 text-2xl"></i>
      <h2 class="text-3xl font-bold text-slate-800" style="font-family:'Playfair Display',serif;">Zaman Bağlaçlarında Uyum (Time Clauses)</h2>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Strategy: When/While -->
      <div class="bg-gradient-to-br from-slate-50 to-white p-6 rounded-3xl border border-slate-100 shadow-md">
        <h4 class="font-bold text-blue-700 mb-3 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-xs">01</span>
          When / While / As
        </h4>
        <p class="text-sm text-slate-600 mb-4">İki tarafın zamanı <b>aynı zaman diliminde</b> olmalıdır.</p>
        <div class="space-y-2 text-xs font-mono bg-white p-4 rounded-xl border border-slate-100">
          <p class="text-indigo-600">V2 + [When] + V2</p>
          <hr class="border-slate-50">
          <p class="text-indigo-600">was Ving + [While] + was Ving</p>
        </div>
      </div>

      <!-- Strategy: By the time -->
      <div class="bg-gradient-to-br from-slate-50 to-white p-6 rounded-3xl border border-slate-100 shadow-md">
        <h4 class="font-bold text-pink-700 mb-3 flex items-center gap-2">
          <span class="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-xs">02</span>
          By the Time (Altın Kural)
        </h4>
        <p class="text-sm text-slate-600 mb-4">Bir taraf <b>Perfect</b> olmalıdır. Zaman kayması vurgulanır.</p>
        <div class="space-y-2 text-xs font-mono bg-white p-4 rounded-xl border border-slate-100">
          <p class="text-pink-600">Had V3 + [By the time] + V2</p>
          <hr class="border-slate-50">
          <p class="text-pink-600">Will have V3 + [By the time] + V1</p>
        </div>
      </div>

      <!-- Strategy: Since -->
      <div class="bg-gradient-to-br from-slate-50 to-white p-6 rounded-3xl border border-slate-100 shadow-md">
        <h4 class="font-bold text-emerald-700 mb-3 flex items-center gap-2">
          <span class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-xs">03</span>
          Since (Tek İstisna)
        </h4>
        <p class="text-sm text-slate-600 mb-4">Since bağlacı Present ve Past'ı <b>birbirine bağlayan köprüdür.</b></p>
        <div class="space-y-2 text-xs font-mono bg-white p-4 rounded-xl border border-slate-100">
          <p class="text-emerald-600">Present Perfect + [SINCE] + V2</p>
        </div>
      </div>
    </div>
  </div>

  <!-- WARNING BOX: NO FUTURE IN TIME CLAUSES -->
  <div class="bg-red-900/10 border-l-8 border-red-600 p-8 rounded-3xl mb-16 flex items-start gap-6">
    <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shrink-0 shadow-xl">
      <i class="fas fa-exclamation-triangle text-2xl"></i>
    </div>
    <div>
      <h3 class="text-xl font-bold text-red-900 mb-2 underline decoration-red-200">Kritik YDS Tuzağı: Zaman Bağlacı İçinde Future!</h3>
      <p class="text-red-800 leading-relaxed">
        Zaman bağlaçlarının (When, While, Before, After, As soon as, By the time) bulunduğu <b>yan cümlecik içinde asla WILL / WOULD / GOING TO kullanılmaz.</b> 
        Sınavda bu seçenekleri direkt eleyebilirsiniz.
      </p>
      <div class="mt-4 bg-white/50 p-4 rounded-xl inline-block border border-red-100">
        <p class="text-sm font-bold text-red-900 italic">❌ After he <span class="bg-red-200 px-1">will arrive</span>... (YANLIŞ)</p>
        <p class="text-sm font-bold text-emerald-800 italic mt-1">✅ After he <span class="map-tag map-1">arrives</span>...</p>
        <div class="text-xs text-slate-500 mt-1 opacity-70">O <span class="map-tag map-1">vardıktan sonra</span>...</div>
      </div>
    </div>
  </div>

  <!-- QUIZ PRACTICE EXAMPLES (Hidden or visible, for the scraper) -->
  <div class="mb-16">
    <div class="flex items-center gap-4 border-b-2 border-slate-100 pb-4 mb-6">
      <i class="fas fa-edit text-indigo-500 text-2xl"></i>
      <h2 class="text-3xl font-bold text-slate-800" style="font-family:'Playfair Display',serif;">Quiz Hazırlık Örnekleri</h2>
    </div>
    <div class="grid md:grid-cols-2 gap-4">
      <div class="bg-white p-4 rounded-xl border border-slate-100 italic text-sm example-text">
        <div>I <span class="map-tag map-1">knew</span> that he <span class="map-tag map-2">had been working</span> there.</div>
        <div class="map-tr-sentence">Orada <span class="map-tag map-2">çalışmakta olduğunu</span> <span class="map-tag map-1">biliyordum</span>.</div>
      </div>
      <div class="bg-white p-4 rounded-xl border border-slate-100 italic text-sm example-text">
        <div>By the time they <span class="map-tag map-1">arrived</span>, the house <span class="map-tag map-2">had burnt</span> down.</div>
        <div class="map-tr-sentence">Onlar <span class="map-tag map-1">vardığında</span>, ev çoktan <span class="map-tag map-2">yanmıştı</span>.</div>
      </div>
      <div class="bg-white p-4 rounded-xl border border-slate-100 italic text-sm example-text">
        <div>She <span class="map-tag map-1">will have finished</span> by the time he <span class="map-tag map-2">comes</span>.</div>
        <div class="map-tr-sentence">O <span class="map-tag map-2">gelene kadar</span>, (kadın) <span class="map-tag map-1">bitirmiş olacak</span>.</div>
      </div>
      <div class="bg-white p-4 rounded-xl border border-slate-100 italic text-sm example-text">
        <div>He <span class="map-tag map-1">was playing</span> while she <span class="map-tag map-2">was cooking</span>.</div>
        <div class="map-tr-sentence">Kadın yemek <span class="map-tag map-2">yaparken</span>, o oyun <span class="map-tag map-1">oynuyordu</span>.</div>
      </div>
      <div class="bg-white p-4 rounded-xl border border-slate-100 italic text-sm example-text">
        <div>Since I <span class="map-tag map-1">moved</span>, I <span class="map-tag map-2">have made</span> many friends.</div>
        <div class="map-tr-sentence"><span class="map-tag map-1">Taşındığımdan beri</span> birçok arkadaş <span class="map-tag map-2">edindim</span>.</div>
      </div>
      <div class="bg-white p-4 rounded-xl border border-slate-100 italic text-sm example-text">
        <div>Scientists <span class="map-tag map-1">believe</span> that the climate <span class="map-tag map-2">will change</span>.</div>
        <div class="map-tr-sentence">Bilim insanları iklimin <span class="map-tag map-2">değişeceğine</span> <span class="map-tag map-1">inanıyorlar</span>.</div>
      </div>
      <div class="bg-white p-4 rounded-xl border border-slate-100 italic text-sm example-text">
        <div>If they <span class="map-tag map-1">had left</span> early, they <span class="map-tag map-2">would have caught</span> the train.</div>
        <div class="map-tr-sentence">Erken <span class="map-tag map-1">ayrılsalardı</span> treni <span class="map-tag map-2">yakalayabilirlerdi</span>.</div>
      </div>
      <div class="bg-white p-4 rounded-xl border border-slate-100 italic text-sm example-text">
        <div>While I <span class="map-tag map-1">was walking</span>, I <span class="map-tag map-2">saw</span> an old friend.</div>
        <div class="map-tr-sentence"><span class="map-tag map-1">Yürürken</span> eski bir arkadaşımı <span class="map-tag map-2">gördüm</span>.</div>
      </div>
    </div>
  </div>

  <!-- CONDITIONALS PREVIEW -->
  <div class="bg-indigo-900 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
    <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full"></div>
    <div class="relative z-10">
      <h2 class="text-3xl font-bold mb-6 flex items-center gap-4">
        <i class="fas fa-project-diagram text-indigo-400"></i>
        If Clauses (Koşul Cümleleri) Uyumu
      </h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
          <span class="text-indigo-300 font-bold block mb-1">Type 1</span>
          <p class="text-xs uppercase tracking-widest text-white/60 mb-2">Real Future</p>
          <p class="text-sm font-mono">V1 ↔ WILL</p>
        </div>
        <div class="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
          <span class="text-indigo-300 font-bold block mb-1">Type 2</span>
          <p class="text-xs uppercase tracking-widest text-white/60 mb-2">Unreal Present</p>
          <p class="text-sm font-mono">V2 ↔ WOULD</p>
        </div>
        <div class="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
          <span class="text-indigo-300 font-bold block mb-1">Type 3</span>
          <p class="text-xs uppercase tracking-widest text-white/60 mb-2">Unreal Past</p>
          <p class="text-sm font-mono">Had V3 ↔ Would have V3</p>
        </div>
        <div class="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
          <span class="text-indigo-300 font-bold block mb-1">Mixed</span>
          <p class="text-xs uppercase tracking-widest text-white/60 mb-2">Past Reason/Pres Result</p>
          <p class="text-sm font-mono">Had V3 ↔ WOULD (now)</p>
        </div>
      </div>
      <button onclick="switchTab('ifclauses')" class="mt-8 text-sm font-bold text-indigo-200 hover:text-white transition-colors flex items-center gap-2 no-print">
        If Clauses detaylı rehberine git <i class="fas fa-external-link-alt text-xs"></i>
      </button>
    </div>
  </div>

</div>
`;

window.tenseAgreementHTML = tenseAgreementHTML;
