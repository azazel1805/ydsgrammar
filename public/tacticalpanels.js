
const tacticalPanelsHTML = `
<div class="max-w-5xl mx-auto px-4 py-10" id="tactical-panels-root">

  <!-- HERO SECTION -->
  <div class="text-center mb-12">
    <div class="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-8 py-4 rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-transform">
      <i class="fas fa-bolt text-2xl"></i>
      <span class="font-extrabold text-xl tracking-tight" style="font-family:'Playfair Display',serif;">YDS Micro-Tactical Hub</span>
    </div>
    <h1 class="text-4xl font-extrabold text-slate-800 mb-4" style="font-family:'Playfair Display',serif;">Hızlı Taktik Panelleri</h1>
    <p class="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed italic">
      "Sınav anında hatırlaman gereken kritik 'Cheat Sheet'ler. Her konu için 5 saniyelik altın kurallar."
    </p>
  </div>

  <div class="space-y-10">
    
    <!-- 1. TENSES TACTICAL PANEL -->
    <div class="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white p-6 rounded-[2rem] shadow-xl overflow-hidden relative group">
      <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
      <div class="flex justify-between items-center cursor-pointer relative z-10" onclick="tpToggle('tense')">
        <h3 class="text-2xl font-bold flex items-center gap-3">
          <i class="fas fa-clock text-yellow-300"></i> 🕒 Tenses Tactical Panel
        </h3>
        <i id="tp-chv-tense" class="fas fa-chevron-down text-white/50 transition-transform"></i>
      </div>
      <div id="tp-content-tense" class="mt-8 space-y-6 hidden relative z-10">
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/10">
            <h4 class="font-bold text-yellow-300 mb-3 uppercase tracking-widest text-xs">🚀 5-Second Checklist</h4>
            <ul class="space-y-3 text-sm">
              <li class="flex items-start gap-2">
                <span class="bg-blue-400 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0">1</span>
                <span><b>Since + V2 / For</b> gördüğün an <b>Present Perfect (have V3)</b>'e saldır.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="bg-blue-400 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0">2</span>
                <span><b>By the time</b> varsa mutlaka taraflardan biri <b>Perfect</b> olmalı.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="bg-blue-400 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0">3</span>
                <span><b>When/While</b> varsa "Zaman Uyumu" %99 şarttır (Past-Past, Pres-Pres).</span>
              </li>
            </ul>
          </div>
          <div class="bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/10">
            <h4 class="font-bold text-yellow-300 mb-3 uppercase tracking-widest text-xs">⚠️ Danger Matrix (Hata Tuzağı)</h4>
            <div class="grid grid-cols-2 gap-2 text-[10px] font-bold">
              <div class="bg-red-500/40 p-3 rounded-lg border border-red-500/20">Will/Would in WHEN clause ❌</div>
              <div class="bg-emerald-500/40 p-3 rounded-lg border border-emerald-500/20">V1/V2 in WHEN clause ✅</div>
              <div class="bg-red-500/40 p-3 rounded-lg border border-red-500/20">Simple Past + SINCE + V2 ❌</div>
              <div class="bg-emerald-500/40 p-3 rounded-lg border border-emerald-500/20">Pres. Perf + SINCE + V2 ✅</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. MODALS TACTICAL PANEL -->
    <div class="bg-gradient-to-br from-blue-600 via-cyan-600 to-indigo-600 text-white p-6 rounded-[2rem] shadow-xl overflow-hidden relative group">
      <div class="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
      <div class="flex justify-between items-center cursor-pointer relative z-10" onclick="tpToggle('modal')">
        <h3 class="text-2xl font-bold flex items-center gap-3">
          <i class="fas fa-bolt text-yellow-300"></i> 🧩 Modals Tactical Panel
        </h3>
        <i id="tp-chv-modal" class="fas fa-chevron-down text-white/50 transition-transform"></i>
      </div>
      <div id="tp-content-modal" class="mt-8 space-y-6 hidden relative z-10">
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white/10 p-5 rounded-2xl border border-white/10">
            <h4 class="font-bold text-yellow-300 mb-3 uppercase tracking-widest text-xs">⏳ Past Regret vs Deduction</h4>
            <div class="space-y-4 text-sm">
              <div class="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                <span>Should have V3</span>
                <span class="text-[10px] bg-red-500 px-2 py-1 rounded">PİŞMANLIK</span>
              </div>
              <div class="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                <span>Must have V3</span>
                <span class="text-[10px] bg-emerald-500 px-2 py-1 rounded">ÇIKARIM (+95%)</span>
              </div>
              <div class="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                <span>Might have V3</span>
                <span class="text-[10px] bg-amber-500 px-2 py-1 rounded">OLASILIK (50%)</span>
              </div>
            </div>
          </div>
          <div class="bg-white/10 p-5 rounded-2xl border border-white/10">
             <h4 class="font-bold text-yellow-300 mb-3 uppercase tracking-widest text-xs">📊 Probability Bar</h4>
             <div class="space-y-4">
               <div>
                 <div class="flex justify-between text-[10px] mb-1"><span>Must (be) / Must have</span><span>95%</span></div>
                 <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden"><div class="h-full bg-emerald-400" style="width: 95%"></div></div>
               </div>
               <div>
                 <div class="flex justify-between text-[10px] mb-1"><span>May / Might / Could</span><span>50%</span></div>
                 <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden"><div class="h-full bg-amber-400" style="width: 50%"></div></div>
               </div>
               <div>
                 <div class="flex justify-between text-[10px] mb-1"><span>Can't (be) / Can't have</span><span>95% Negative</span></div>
                 <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden"><div class="h-full bg-red-400" style="width: 95%"></div></div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. IF CLAUSES TACTICAL PANEL -->
    <div class="bg-gradient-to-br from-violet-600 via-purple-700 to-fuchsia-600 text-white p-6 rounded-[2rem] shadow-xl overflow-hidden relative group">
      <div class="flex justify-between items-center cursor-pointer relative z-10" onclick="tpToggle('if')">
        <h3 class="text-2xl font-bold flex items-center gap-3">
          <i class="fas fa-random text-yellow-300"></i> 🔀 If Clauses Tactical Panel
        </h3>
        <i id="tp-chv-if" class="fas fa-chevron-down text-white/50 transition-transform"></i>
      </div>
      <div id="tp-content-if" class="mt-8 space-y-6 hidden relative z-10 text-sm">
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white/10 p-5 rounded-2xl border border-white/10">
            <h4 class="font-bold text-yellow-300 mb-3 uppercase tracking-widest text-xs">Inversion Matrix (Resmi Ters Cevrim)</h4>
            <div class="space-y-3">
              <div class="p-3 bg-white/5 rounded-xl">
                <span class="text-xs font-mono text-purple-200">SHOULD he come...</span>
                <p class="text-[10px] text-white/60 mt-1">(= If he comes) - Type 1</p>
              </div>
              <div class="p-3 bg-white/5 rounded-xl">
                <span class="text-xs font-mono text-purple-200">WERE I you...</span>
                <p class="text-[10px] text-white/60 mt-1">(= If I were you) - Type 2</p>
              </div>
              <div class="p-3 bg-white/5 rounded-xl">
                <span class="text-xs font-mono text-purple-200">HAD I known...</span>
                <p class="text-[10px] text-white/60 mt-1">(= If I had known) - Type 3</p>
              </div>
            </div>
          </div>
          <div class="bg-white/10 p-5 rounded-2xl border border-white/10">
            <h4 class="font-bold text-yellow-300 mb-3 uppercase tracking-widest text-xs">The "Unless" Trap</h4>
            <p class="text-xs mb-4"><b>Unless = If NO</b>. Bu yüzden arkasından gelen cümle anlam olarak "olumsuz" olsa da gramer olarak <b>OLUMLU</b> kalmalıdır.</p>
            <div class="bg-red-500/20 p-4 rounded-xl border border-red-500/30">
              <p class="italic text-[10px]">❌ Unless you <u>don't</u> study...</p>
              <p class="italic text-[10px] font-bold text-emerald-300">✅ Unless you study...</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. RELATIVE CLAUSES TACTICAL PANEL -->
    <div class="bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-600 text-white p-6 rounded-[2rem] shadow-xl overflow-hidden relative group">
      <div class="flex justify-between items-center cursor-pointer relative z-10" onclick="tpToggle('rel')">
        <h3 class="text-2xl font-bold flex items-center gap-3">
          <i class="fas fa-link text-yellow-300"></i> 🔗 Relative Clauses Tactical Panel
        </h3>
        <i id="tp-chv-rel" class="fas fa-chevron-down text-white/50 transition-transform"></i>
      </div>
      <div id="tp-content-rel" class="mt-8 space-y-6 hidden relative z-10 text-sm">
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white/10 p-5 rounded-2xl border border-white/10">
            <h4 class="font-bold text-cyan-300 mb-3 uppercase tracking-widest text-xs">Which vs Where Trap</h4>
            <div class="space-y-4">
              <div class="p-3 bg-white/5 rounded-xl">
                <p class="font-bold mb-1">WHERE</p>
                <p class="text-[10px] text-white/60">Arkasından özneli tam cümle gelmeli.<br>"The city <b>where</b> I was born."</p>
              </div>
              <div class="p-3 bg-white/5 rounded-xl">
                <p class="font-bold mb-1">WHICH (as where)</p>
                <p class="text-[10px] text-white/60">Arkasından direkt fiil geliyorsa Which seçilmeli.<br>"The city <b>which</b> is crowded."</p>
              </div>
            </div>
          </div>
          <div class="bg-white/10 p-5 rounded-2xl border border-white/10">
             <h4 class="font-bold text-cyan-300 mb-3 uppercase tracking-widest text-xs">Reduction (Kısaltma) 101</h4>
             <div class="grid grid-cols-2 gap-4">
               <div class="text-center p-3 bg-white/5 rounded-xl">
                 <p class="font-bold text-emerald-300">Ving</p>
                 <p class="text-[9px]">ACTIVE<br>(Yapan)</p>
               </div>
               <div class="text-center p-3 bg-white/5 rounded-xl">
                 <p class="font-bold text-emerald-300">V3</p>
                 <p class="text-[9px]">PASSIVE<br>(Yapılan)</p>
               </div>
               <div class="col-span-2 text-center p-3 bg-white/5 rounded-xl border border-cyan-400/30">
                 <p class="font-bold text-emerald-300">to V1</p>
                 <p class="text-[9px]">Superlative / Ordinal<br>(The first, The best...)</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. CONJUNCTIONS (BAĞLAÇLAR) TACTICAL PANEL -->
    <div class="bg-gradient-to-br from-red-600 via-rose-700 to-pink-600 text-white p-6 rounded-[2rem] shadow-xl overflow-hidden relative group">
      <div class="flex justify-between items-center cursor-pointer relative z-10" onclick="tpToggle('conj')">
        <h3 class="text-2xl font-bold flex items-center gap-3">
          <i class="fas fa-layer-group text-yellow-300"></i> 🔗 Bağlaçlar (Connectors) Tactical Panel
        </h3>
        <i id="tp-chv-conj" class="fas fa-chevron-down text-white/50 transition-transform"></i>
      </div>
      <div id="tp-content-conj" class="mt-8 space-y-6 hidden relative z-10 text-sm">
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white/10 p-5 rounded-2xl border border-white/10">
            <h4 class="font-bold text-yellow-300 mb-3 uppercase tracking-widest text-xs">Contrast (Zıtlık) Matrix</h4>
            <div class="space-y-3">
              <div class="p-3 bg-white/5 rounded-xl border-l-2 border-yellow-300">
                <span class="text-xs font-bold text-white">Group A: Although / Though / Even though</span>
                <p class="text-[10px] text-white/60 mt-1">Arkasından <u>TAM CÜMLE</u> gelir.</p>
              </div>
              <div class="p-3 bg-white/5 rounded-xl border-l-2 border-red-300">
                <span class="text-xs font-bold text-white">Group B: Despite / In spite of</span>
                <p class="text-[10px] text-white/60 mt-1">Arkasından <u>NOUN / Ving</u> gelir.</p>
              </div>
            </div>
          </div>
          <div class="bg-white/10 p-5 rounded-2xl border border-white/10">
            <h4 class="font-bold text-yellow-300 mb-3 uppercase tracking-widest text-xs">Cause & Effect (Sebep-Sonuç)</h4>
            <div class="space-y-3">
              <div class="p-3 bg-white/5 rounded-xl">
                 <span class="text-xs font-bold">Because of / Due to / Owing to</span>
                 <p class="text-[10px] text-white/60 mt-1">+ Noun (Nedeniyle)</p>
              </div>
              <div class="p-3 bg-white/5 rounded-xl">
                 <span class="text-xs font-bold">In order to / So as to</span>
                 <p class="text-[10px] text-white/60 mt-1">+ V1 (Mak/Mek için)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</div>

<style>
  #tactical-panels-root p, #tactical-panels-root h1, #tactical-panels-root h2, #tactical-panels-root h3, #tactical-panels-root h4 {
    font-family: 'Lora', serif;
  }
</style>
`;

function tpToggle(id) {
    const content = document.getElementById(`tp-content-${id}`);
    const chev = document.getElementById(`tp-chv-${id}`);
    if (!content) return;
    const isHidden = content.classList.contains('hidden');
    content.classList.toggle('hidden', !isHidden);
    if (chev) {
        chev.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0)';
    }
}

window.tpToggle = tpToggle;
