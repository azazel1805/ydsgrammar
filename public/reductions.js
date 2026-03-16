/* ============================================================
   reductions.js  –  YDS/YDT Reduced Clauses (Kısaltmalar) Guide
   ============================================================ */

const REDUCTION_DATA = [
  {
    category: "Relative Clause Kısaltmaları (Sıfat Cümleciği)",
    description: "İsimleri niteleyen 'who/which/that' yapılarının kısaltılmasıdır.",
    items: [
      {
        title: "Active (Etken) Kısaltma: V-ing",
        rule: "Eylem aktif ise 'who/which/that + fiil' yerine sadece fiilin -ing hali kullanılır.",
        example: "The man who stands there -> The man standing there.",
        note: "Zaman farkı önemli değildir; genel veya anlık durumlar için kullanılır."
      },
      {
        title: "Passive (Edilgen) Kısaltma: V3",
        rule: "Eylem pasif ise 'who/which/that + be + V3' yerine sadece V3 kullanılır.",
        example: "The book which was written by him -> The book written by him.",
        note: "YDS'de en sık çıkan kısaltma türüdür."
      },
      {
        title: "To-Infinitive Kısaltması (to V1 / to be V3)",
        rule: "Nitelenen isimden önce 'the first, the last, the only, the best' veya süperlatif bir ifade varsa 'to' kullanılır.",
        example: "He was the first man who reached the moon -> ...the first man to reach the moon.",
        note: "Passive ise 'to be V3' olur: 'The first bridge to be built'."
      }
    ]
  },
  {
    category: "Adverbial Clause Kısaltmaları (Zarf Cümleciği)",
    description: "Zaman, sebep, zıtlık bildiren bağlaçlı cümlelerin (After, Because, Although vb.) kısaltılmasıdır.",
    items: [
      {
        title: "Aynı Anda Gerçekleşenler: V-ing / V3",
        rule: "İki cümledeki özne aynı olmak zorundadır.",
        example: "While he was walking, he saw her -> Walking home, he saw her.",
        note: "Passive olursa direkt V3 ile başlanır: 'Found in 1920, the artifact is priceless'."
      },
      {
        title: "Zaman Farkı Varsa: Having V3 / Having been V3",
        rule: "Eylemlerden biri diğerinden önce bitmişse 'Having' yapısı kullanılır.",
        example: "After he had finished his work, he left -> Having finished his work, he left.",
        note: "Sebep-sonuç ilişkisi (Because) için de sıkça kullanılır."
      },
      {
        title: "Zıtlık Kısaltmaları (Although / Though)",
        rule: "Bağlaç korunabilir, sadece özne ve 'be' fiili atılır.",
        example: "Although it is expensive, it is worth it -> Although expensive, it is worth it.",
        note: "Sıfat cümleciği gibi görünse de aslında bir zarf cümleciği kısaltmasıdır."
      }
    ]
  }
];

const REDUCTION_CHEATSHEET = [
  { focus: "Aktif", simple: "V-ing (doing)", perfect: "Having V3 (having done)" },
  { focus: "Pasif", simple: "V3 (done)", perfect: "Having been V3 (having been done)" },
  { focus: "Gelecek / Zorunluluk", simple: "To V1", perfect: "To have V3" }
];

function getReductionsHTML() {
  return /* html */`
<div class="max-w-6xl mx-auto px-4 py-12">
  <!-- Action Bar (Print) -->
  <div class="flex justify-end mb-8 no-print">
      <button onclick="window.print()" class="print-btn flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-800 transition-all shadow-xl active:scale-95">
          <i class="fas fa-file-pdf"></i> PDF İndir / Yazdır
      </button>
  </div>

  <div class="text-center mb-16">
    <div class="inline-flex items-center gap-3 bg-red-50 text-red-700 px-5 py-2 rounded-full text-sm font-bold mb-4 border border-red-100 uppercase tracking-widest">
      <i class="fas fa-scissors"></i> Clause Reductions
    </div>
    <h2 class="text-5xl font-black text-slate-900 mb-6" style="font-family:'Playfair Display',serif;">Kısaltmalar (Reduced Clauses) Rehberi</h2>
    <p class="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
      YDS ve YDT'nin en ileri seviye konusu. Cümleleri daha akıcı hale getirmek için kullanılan bu yapılar, sınavda genellikle 
      <span class="text-red-700 font-bold underline decoration-red-200">öznelerin ortak olduğu</span> durumlarda karşımıza çıkar.
    </p>
  </div>

  <!-- Cheat Sheet Table -->
  <div class="mb-20 bg-white rounded-[2rem] border-2 border-slate-100 shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all">
    <div class="bg-slate-900 p-6 flex items-center justify-between">
      <h3 class="text-white font-bold flex items-center gap-2 italic">
        <i class="fas fa-bolt text-yellow-500"></i> Hızlı Karar Tablosu (Cheat Sheet)
      </h3>
      <span class="bg-white/10 text-white/60 text-[10px] font-bold px-2 py-1 rounded">PRO TIP</span>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead class="bg-slate-50 border-b border-slate-100">
          <tr>
            <th class="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">DURUM</th>
            <th class="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">SIMPLE (Genel/Anlık)</th>
            <th class="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-indigo-600">PERFECT (Öncelik-Sonralık)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          ${REDUCTION_CHEATSHEET.map(row => `
            <tr class="hover:bg-slate-50 transition-colors">
              <td class="px-8 py-6 font-bold text-slate-700">${row.focus}</td>
              <td class="px-8 py-6 text-slate-600 font-mono text-sm">${row.simple}</td>
              <td class="px-8 py-6 text-indigo-600 font-mono text-sm font-bold bg-indigo-50/30">${row.perfect}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Detailed Categories -->
  <div class="grid md:grid-cols-2 gap-10">
    ${REDUCTION_DATA.map(cat => `
      <div class="space-y-6">
        <div class="flex items-center gap-4 mb-2">
           <div class="h-10 w-1 bg-red-600 rounded-full shadow-lg shadow-red-500/50"></div>
           <h3 class="text-2xl font-black text-slate-800" style="font-family:'Playfair Display',serif;">${cat.category}</h3>
        </div>
        <p class="text-slate-500 text-sm italic mb-8">${cat.description}</p>
        
        <div class="space-y-4">
          ${cat.items.map(item => `
            <div class="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all border-l-4 border-l-slate-800 group">
              <h4 class="text-lg font-bold text-slate-800 mb-2 group-hover:text-red-700 transition-colors">${item.title}</h4>
              <p class="text-sm text-slate-600 mb-4 leading-relaxed">${item.rule}</p>
              
              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-3">
                <span class="text-[10px] font-bold text-slate-400 uppercase block mb-1">Örnek:</span>
                <p class="text-sm font-medium text-slate-800 italic">${item.example}</p>
              </div>

              <div class="flex items-start gap-2 text-xs text-red-600/70 py-2">
                <i class="fas fa-exclamation-circle mt-0.5"></i>
                <span class="font-medium">${item.note}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('')}
  </div>

  <!-- Special Case: Passive Infinitive -->
  <div class="mt-16 bg-gradient-to-br from-indigo-900 via-slate-900 to-black rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
    <div class="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
        <i class="fas fa-star text-[15rem] rotate-12"></i>
    </div>
    <div class="relative z-10 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h3 class="text-3xl font-black mb-6" style="font-family:'Playfair Display',serif;">Özel Durum: Relative Clause + To V1</h3>
        <p class="text-slate-300 leading-relaxed mb-8">
          Sınavda bir ismin önünde <strong>the first, the last, the only</strong> gibi sıralama bildiren kelimeler veya 
          <strong>the best, the most interesting</strong> gibi süperlatifler varsa kısaltma mutlaka 
          <span class="text-yellow-400 font-bold">"TO"</span> ile yapılmalıdır.
        </p>
        <div class="space-y-4">
          <div class="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/5">
            <div class="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-slate-900 font-bold text-xs shrink-0">1</div>
            <p class="text-sm">Active: <strong>to V1</strong> (He was the first to arrive)</p>
          </div>
          <div class="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/5">
            <div class="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-slate-900 font-bold text-xs shrink-0">2</div>
            <p class="text-sm">Passive: <strong>to be V3</strong> (The first man to be cured)</p>
          </div>
        </div>
      </div>
      <div class="bg-white/5 p-8 rounded-[2rem] border border-white/10">
        <h4 class="font-bold text-yellow-500 mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
           <i class="fas fa-lightbulb"></i> YDS Stratejisi
        </h4>
        <p class="text-sm text-slate-200 leading-relaxed italic">
          "Cümle başında boşluk varsa ve virgülden sonraki özne o işi yapıyorsa (-ing), o işe maruz kalıyorsa (V3) seçilir. 
          Eğer iki eylem arasında belirgin bir zaman farkı varsa cevap büyük ihtimalle 'Having V3'dür."
        </p>
      </div>
    </div>
  </div>
</div>
`;
}

// Global register
window.reductionsHTML = getReductionsHTML();
