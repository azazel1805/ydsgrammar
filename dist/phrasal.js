const PHRASAL_VERBS_DATA = [
  { phrasal: "Account for", meaning: "Açıklamak, karşılamak, tekabül etmek", example: "High tech companies account for 10% of the total exports.", category: "Business/Academic" },
  { phrasal: "Back up", meaning: "Desteklemek, yedeklemek", example: "The writer used statistics to back up his main argument.", category: "General" },
  { phrasal: "Break out", meaning: "Birdenbire başlamak (savaş, yangın vb.)", example: "World War II broke out in 1939.", category: "History/Conflict" },
  { phrasal: "Bring about", meaning: "Sebep olmak, neden olmak", example: "The new law brought about many changes.", category: "Cause/Effect" },
  { phrasal: "Bring up", meaning: "Çocuk yetiştirmek, bir konuyu açmak", example: "She brought up three children on her own.", category: "Personal" },
  { phrasal: "Call off", meaning: "İptal etmek", example: "The meeting was called off due to the storm.", category: "Business" },
  { phrasal: "Carry out", meaning: "Gerçekleştirmek, uygulamak", example: "Scientists are carrying out a new experiment.", category: "Science/Research" },
  { phrasal: "Catch up with", meaning: "Hızına yetişmek, aynı seviyeye gelmek", example: "Turkey is trying to catch up with developed nations.", category: "Growth" },
  { phrasal: "Check out", meaning: "Kontrol etmek, incelemek, ayrılmak (otel vb.)", example: "We need to check out the details before making a decision.", category: "General" },
  { phrasal: "Come across", meaning: "Karşılaşmak, rastlamak", example: "I came across an old friend in the library.", category: "General" },
  { phrasal: "Come up with", meaning: "Çözüm/fikir üretmek", example: "They came up with a great solution to the problem.", category: "Academic/Business" },
  { phrasal: "Cut down on", meaning: "Azaltmak, kesinti yapmak", example: "The doctor told him to cut down on sugar.", category: "Health" },
  { phrasal: "Deal with", meaning: "Uğraşmak, ele almak, çözmek", example: "The book deals with the problems of urban life.", category: "Academic" },
  { phrasal: "Do away with", meaning: "Yürürlükten kaldırmak, son vermek", example: "The government decided to do away with the old law.", category: "Politics" },
  { phrasal: "End up", meaning: "Kendini bir yerde bulmak, sonuçlanmak", example: "He started as a clerk and ended up as the CEO.", category: "Personal" },
  { phrasal: "Fall apart", meaning: "Parçalara ayrılmak, dağılmak", example: "The old building started to fall apart.", category: "Physical" },
  { phrasal: "Figure out", meaning: "Anlamak, çözmek", example: "I cannot figure out how to use this machine.", category: "General" },
  { phrasal: "Find out", meaning: "Öğrenmek, keşfetmek", example: "We need to find out the truth about the incident.", category: "Research" },
  { phrasal: "Get away with", meaning: "Bir suçtan ceza almadan kurtulmak", example: "The thief got away with the stolen money.", category: "Legal" },
  { phrasal: "Get over", meaning: "Atlatmak, iyileşmek", example: "It took her months to get over the flu.", category: "Health" },
  { phrasal: "Give up", meaning: "Bırakmak, vazgeçmek", example: "He decided to give up smoking.", category: "Habit" },
  { phrasal: "Go through", meaning: "Yaşamak, tecrübe etmek, incelemek", example: "The country went through a difficult period.", category: "Experience" },
  { phrasal: "Hold on", meaning: "Beklemek, tutunmak", example: "Hold on a minute, I'm almost ready.", category: "General" },
  { phrasal: "Keep on", meaning: "Devam etmek", example: "If you keep on working hard, you will succeed.", category: "Success" },
  { phrasal: "Look after", meaning: "Bakmak, ilgilenmek", example: "She looks after her elderly parents.", category: "Personal" },
  { phrasal: "Look down on", meaning: "Küçümsemek, hor görmek", example: "They look down on anyone who doesn't have a degree.", category: "Social" },
  { phrasal: "Look for", meaning: "Aramak", example: "I am looking for my keys.", category: "General" },
  { phrasal: "Look forward to", meaning: "Dört gözle beklemek", example: "I look forward to meeting you soon.", category: "Social" },
  { phrasal: "Look into", meaning: "İncelemek, araştırmak", example: "The police are looking into the cause of the accident.", category: "Inquiry" },
  { phrasal: "Look up to", meaning: "Hayranlık duymak, saygı duymak", example: "Children often look up to their teachers.", category: "Personal" },
  { phrasal: "Make up for", meaning: "Telafi etmek", example: "Nothing can make up for the loss of a loved one.", category: "Emotions" },
  { phrasal: "Pass away", meaning: "Vefat etmek", example: "His grandfather passed away last night.", category: "Personal" },
  { phrasal: "Pass out", meaning: "Bayılmak", example: "It was so hot that I almost passed out.", category: "Health" },
  { phrasal: "Pick up", meaning: "Öğrenmek (çaba sarf etmeden), birini bir yerden almak", example: "She picked up Spanish while living in Madrid.", category: "Learning" },
  { phrasal: "Put off", meaning: "Ertelenmek", example: "Never put off until tomorrow what you can do today.", category: "Time" },
  { phrasal: "Put out", meaning: "Söndürmek", example: "The firefighters managed to put out the fire.", category: "Safety" },
  { phrasal: "Put up with", meaning: "Tahammül etmek, katlanmak", example: "I can't put up with his constant complaining.", category: "Social" },
  { phrasal: "Run out of", meaning: "Bitmek, tükenmek", example: "We have run out of milk.", category: "General" },
  { phrasal: "Set up", meaning: "Kurmak", example: "They decided to set up a new business.", category: "Business" },
  { phrasal: "Take after", meaning: "Birine çekmek, benzemek", example: "He takes after his father.", category: "Family" },
  { phrasal: "Take off", meaning: "Kalkış yapmak (uçak), çıkarmak (giysi)", example: "The plane took off on time.", category: "Travel" },
  { phrasal: "Take over", meaning: "Devralmak, yönetimi ele almak", example: "The new manager will take over next month.", category: "Management" },
  { phrasal: "Turn down", meaning: "Reddetmek, sesini kısmak", example: "She turned down the job offer.", category: "Social" },
  { phrasal: "Turn out", meaning: "Belli olmak, sonuca varmak", example: "The party turned out to be a great success.", category: "Success" },
  { phrasal: "Watch out", meaning: "Dikkat etmek", example: "Watch out! There's a car coming.", category: "Safety" },
  { phrasal: "Work out", meaning: "Anlamak, çözmek, antrenman yapmak", example: "We need to work out a plan for the project.", category: "Inquiry" }
];

function getPhrasalHTML() {
  return `
  <div class="max-w-6xl mx-auto px-4 py-12">
    <!-- Header Section -->
    <div class="text-center mb-16 relative">
      <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      
      <div class="inline-flex items-center gap-3 bg-gradient-to-r from-red-800 to-red-900 text-white px-6 py-2.5 rounded-2xl shadow-xl mb-6 scale-hover transition-transform duration-500">
        <i class="fas fa-book-sparkles text-yellow-400"></i>
        <span class="font-bold tracking-widest text-sm uppercase">AI Kelime Motoru</span>
      </div>
      
      <h2 class="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight" style="font-family:'Playfair Display',serif;">
        Phrasal <span class="text-red-800">Dictionary</span>
      </h2>
      <p class="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
        Bir fiil girin, tüm edat kombinasyonlarını ve anlamlarını <span class="text-red-800 font-bold italic underline decoration-red-200">YDS/YDT odağında</span> anında listeleyelim.
      </p>
    </div>

    <!-- Search Section -->
    <div class="max-w-3xl mx-auto mb-16 relative">
      <div class="group relative bg-white rounded-[2.5rem] p-2 shadow-2xl shadow-red-900/10 border border-slate-100 focus-within:ring-4 focus-within:ring-red-50 transition-all duration-500">
        <div class="flex items-center px-6 py-4">
          <i class="fas fa-search text-slate-300 text-xl mr-4 group-focus-within:text-red-800 transition-colors"></i>
          <input type="text" id="phrasalSearchInput" 
            placeholder="Örn: Get, Take, Set, Look..." 
            class="flex-1 text-xl font-bold text-slate-800 bg-transparent border-none outline-none placeholder:text-slate-300"
            onkeydown="if(event.key==='Enter') searchPhrasalAI()">
          <button onclick="searchPhrasalAI()" 
            id="phrasalSearchBtn"
            class="ml-4 px-8 py-4 bg-red-800 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-red-900/20 flex items-center gap-2">
            <span>KEŞFET</span>
            <i class="fas fa-bolt text-yellow-400"></i>
          </button>
        </div>
      </div>
      
      <div class="flex flex-wrap justify-center gap-2 mt-6">
        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest py-2 px-3">Hızlı Aramalar:</span>
        ${['Get', 'Take', 'Look', 'Put', 'Bring', 'Go'].map(v => `
          <button onclick="document.getElementById('phrasalSearchInput').value='${v}'; searchPhrasalAI();" 
            class="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold text-slate-600 hover:bg-red-50 hover:text-red-800 hover:border-red-100 transition-all">
            ${v}
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Results Section -->
    <div id="phrasalResultsArea" class="space-y-12">
        <!-- Static List for initial view -->
        <div class="flex items-center gap-4 mb-10">
          <div class="h-8 w-1.5 bg-red-800 rounded-full"></div>
          <h3 class="text-2xl font-black text-slate-800" style="font-family:'Playfair Display',serif;">Popüler Phrasal Verb'ler</h3>
        </div>
        
        <div id="phrasalGrid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${PHRASAL_VERBS_DATA.slice(0, 15).map((p, idx) => `
            <div class="phrasal-card group perspective-1000">
              <div class="phrasal-card-inner relative w-full h-80 transition-transform duration-700 preserve-3d cursor-pointer hover:rotate-y-180" onclick="this.classList.toggle('rotate-y-180')">
                <!-- Front Face -->
                <div class="absolute inset-0 backface-hidden bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 flex flex-col items-center justify-center text-center">
                  <div class="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-800 mb-4 group-hover:scale-110 transition-transform">
                    <i class="fas fa-feather-pointed text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-black text-slate-900 mb-2">${p.phrasal}</h3>
                  <p class="text-red-800 font-bold text-sm mb-3">${p.meaning}</p>
                  <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest">${p.category}</p>
                  <div class="mt-4 text-[10px] text-slate-400 italic">Detaylar için tıkla</div>
                </div>
                <!-- Back Face -->
                <div class="absolute inset-0 backface-hidden bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl rotate-y-180 flex flex-col justify-center border-4 border-red-800/10">
                  <div class="mb-5 text-center">
                    <p class="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">TÜRKÇE ANLAMI</p>
                    <p class="text-xl font-bold text-white leading-tight">${p.meaning}</p>
                  </div>
                  <div class="pt-5 border-t border-white/10 text-center">
                    <p class="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">ÖRNEK CÜMLE</p>
                    <p class="text-sm italic text-slate-300 leading-relaxed font-serif">"${p.example}"</p>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
    </div>

    <div class="mt-24 text-center">
        <div class="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 inline-block max-w-2xl relative overflow-hidden group">
            <i class="fas fa-quote-right absolute -right-4 -bottom-4 text-9xl text-slate-100 -z-10"></i>
            <p class="text-slate-700 font-bold italic text-lg leading-relaxed">
              "YDS/YDT sınavlarında phrasal verb'ler sadece anlam sorusu olarak değil, okuma parçalarının anahtarını çözmek için de hayati önem taşır."
            </p>
        </div>
    </div>
  </div>

  <style>
    .perspective-1000 { perspective: 1000px; }
    .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
    .preserve-3d { transform-style: preserve-3d; }
    .rotate-y-180 { transform: rotateY(180deg); }
    .scale-hover:hover { transform: translateX(0) scale(1.05); }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-result { animation: slideUp 0.5s ease forwards; }
  </style>
  `;
}

async function searchPhrasalAI() {
  const input = document.getElementById('phrasalSearchInput');
  const verb = input.value.trim();
  const btn = document.getElementById('phrasalSearchBtn');
  const resultsArea = document.getElementById('phrasalResultsArea');

  if (!verb) {
    alert("Lütfen araştırmak istediğiniz ana fiili girin.");
    return;
  }

  btn.disabled = true;
  btn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> ANALİZ EDİLİYOR...`;
  
  // Show Loading Skeleton
  resultsArea.innerHTML = `
    <div class="flex flex-col items-center py-20 animate-pulse">
        <div class="w-20 h-20 bg-slate-100 rounded-full mb-6"></div>
        <div class="h-4 w-48 bg-slate-100 rounded mb-4"></div>
        <div class="h-3 w-32 bg-slate-50 rounded"></div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-16 px-4">
            ${Array(6).fill(0).map(() => `
                <div class="h-72 bg-slate-50 rounded-[2.5rem] border border-slate-100"></div>
            `).join('')}
        </div>
    </div>
  `;

  try {
    const res = await fetch("/.netlify/functions/phrasal-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verb })
    });
    
    if (!res.ok) throw new Error("AI hatası");
    
    const data = await res.json();
    renderPhrasalAIResults(verb, data);
  } catch (err) {
    resultsArea.innerHTML = `
      <div class="text-center py-20 bg-red-50 rounded-[3rem] border border-red-100 px-8">
        <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
        <p class="text-red-900 font-bold text-xl">Bir şeyler ters gitti.</p>
        <p class="text-red-700 mt-2 text-sm italic">Hata: ${err.message}. Lütfen biraz sonra tekrar deneyin.</p>
        <button onclick="location.reload()" class="mt-6 px-6 py-2 bg-red-800 text-white rounded-xl font-bold">Tekrar Dene</button>
      </div>
    `;
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<span>KEŞFET</span> <i class="fas fa-bolt text-yellow-400"></i>`;
  }
}

function renderPhrasalAIResults(rootVerb, items) {
  const resultsArea = document.getElementById('phrasalResultsArea');
  
  if (!items || items.length === 0) {
    resultsArea.innerHTML = `<p class="text-center py-20 text-slate-400 italic">"${rootVerb}" fiili için phrasal verb bulunamadı.</p>`;
    return;
  }

  resultsArea.innerHTML = `
    <div class="animate-result">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div class="flex items-center gap-6">
                <div class="w-20 h-20 bg-red-800 text-white rounded-3xl flex items-center justify-center text-4xl font-black shadow-xl shadow-red-900/20">
                    ${rootVerb[0].toUpperCase()}
                </div>
                <div>
                    <h3 class="text-3xl font-black text-slate-900 uppercase tracking-tight">${rootVerb} Phrasal Hub</h3>
                    <p class="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">${items.length} ÖZEL KOMBİNASYON BULUNDU</p>
                </div>
            </div>
            <button onclick="switchTab('phrasal');" class="text-slate-400 hover:text-red-800 font-bold text-xs uppercase underline underline-offset-8">Geri Dön</button>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${items.map((item, idx) => {
                const tr = item.meaning_tr || item.meaning || item.tr || "Anlam bulunamadı";
                const en = item.meaning_en || item.en_def || item.definition || "Definition not found";
                return `
                <div class="phrasal-card group perspective-1000" style="animation-delay: ${idx * 0.1}s">
                    <div class="phrasal-card-inner relative w-full h-[450px] transition-transform duration-700 preserve-3d cursor-pointer hover:rotate-y-180" onclick="this.classList.toggle('rotate-y-180')">
                        <!-- Front Face -->
                        <div class="absolute inset-0 backface-hidden bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm group-hover:shadow-2xl transition-all duration-500 flex flex-col">
                            <div class="mb-6 flex justify-between items-start">
                                <span class="bg-red-50 text-red-800 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter">PHRASAL VERB</span>
                                <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                                    <i class="fas fa-ellipsis-v text-xs"></i>
                                </div>
                            </div>
                            <h3 class="text-3xl font-black text-slate-900 mb-6 group-hover:text-red-800 transition-colors">${item.phrasal}</h3>
                            <div class="space-y-4">
                                <div>
                                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">TÜRKÇE ANLAMI</p>
                                    <p class="text-red-800 font-bold text-lg leading-tight">${tr}</p>
                                </div>
                                <div>
                                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">ENGLISH DEF.</p>
                                    <p class="text-slate-500 text-sm leading-tight italic font-serif">${en}</p>
                                </div>
                            </div>
                            <div class="mt-auto pt-6 flex items-center gap-2 text-[10px] font-black text-red-800/40">
                                <i class="fas fa-hand-pointer animate-bounce"></i>
                                DETAYLAR İÇİN TIKLA
                            </div>
                        </div>
                        <!-- Back Face -->
                        <div class="absolute inset-0 backface-hidden bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl rotate-y-180 flex flex-col border-4 border-red-800/10">
                            <div class="mb-6">
                                <p class="text-[10px] font-black text-red-400 uppercase tracking-widest mb-3">EXAMPLE SENTENCE</p>
                                <p class="text-lg italic text-white leading-relaxed font-serif">"${item.example}"</p>
                            </div>
                            <div class="mt-auto bg-white/5 p-5 rounded-2xl border border-white/10">
                                <p class="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <i class="fas fa-lightbulb"></i> STRATEJİ & NOT
                                </p>
                                <p class="text-slate-400 text-sm leading-relaxed">${item.usage_note}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `}).join('')}
        </div>
    </div>
  `;
}

// Global Exports
window.searchPhrasalAI = searchPhrasalAI;
window.phrasalHTML = getPhrasalHTML();

