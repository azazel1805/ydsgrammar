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
    <div class="text-center mb-16">
      <div class="inline-flex items-center gap-3 bg-gradient-to-r from-red-800 to-red-900 text-white px-6 py-2.5 rounded-2xl shadow-xl mb-6">
        <i class="fas fa-crown text-yellow-500 animate-pulse"></i>
        <span class="font-bold tracking-widest text-sm uppercase">VIP Kelime Laboratuvarı</span>
      </div>
      <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-6" style="font-family:'Playfair Display',serif;">Phrasal Verbs Dictionary</h2>
      <p class="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">Sınavlarda en çok çıkan phrasal verb'leri örnek cümleleri ve Türkçe karşılıkları ile interaktif olarak keşfedin.</p>
    </div>

    <div class="mb-10 flex flex-wrap justify-center gap-3">
        <button onclick="filterPhrasal('all')" class="phrasal-filter-btn px-6 py-2 rounded-full border border-slate-200 font-bold text-sm bg-slate-900 text-white shadow-lg transition-all">Hepsi</button>
        ${[...new Set(PHRASAL_VERBS_DATA.map(p => p.category))].map(cat => `
            <button onclick="filterPhrasal('${cat}')" class="phrasal-filter-btn px-6 py-2 rounded-full border border-slate-200 font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all">${cat}</button>
        `).join('')}
    </div>

    <div id="phrasalGrid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${PHRASAL_VERBS_DATA.map((p, idx) => `
        <div class="phrasal-card group perspective-1000" data-category="${p.category}">
          <div class="phrasal-card-inner relative w-full h-64 transition-transform duration-700 preserve-3d cursor-pointer hover:rotate-y-180" onclick="this.classList.toggle('rotate-y-180')">
            <!-- Front Face -->
            <div class="absolute inset-0 backface-hidden bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm group-hover:shadow-xl transition-all flex flex-col items-center justify-center text-center">
              <span class="text-[10px] font-black text-red-600 uppercase tracking-widest mb-4 opacity-60">${p.category}</span>
              <h3 class="text-2xl font-black text-slate-800 mb-2">${p.phrasal}</h3>
              <div class="w-10 h-1 bg-red-100 rounded-full"></div>
              <p class="mt-6 text-slate-400 text-xs italic">Tıklayarak Anlamını Gör</p>
            </div>
            <!-- Back Face -->
            <div class="absolute inset-0 backface-hidden bg-slate-900 rounded-[2rem] p-8 shadow-xl rotate-y-180 flex flex-col justify-center">
              <div class="mb-4">
                <span class="text-xs font-bold text-red-400 uppercase tracking-tighter">ANLAM</span>
                <p class="text-xl font-bold text-white">${p.meaning}</p>
              </div>
              <div class="mt-4 pt-4 border-t border-white/10">
                <span class="text-xs font-bold text-cyan-400 uppercase tracking-tighter">ÖRNEK</span>
                <p class="text-sm italic text-slate-300 leading-relaxed">"${p.example}"</p>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="mt-16 text-center">
        <div class="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 inline-block">
            <p class="text-slate-500 font-medium italic">"Phrasal verbs çalışırken kelimeleri tek tek değil, cümle içindeki bağlamıyla öğrenmek kalıcılığı %80 artırır."</p>
        </div>
    </div>
  </div>

  <style>
    .perspective-1000 { perspective: 1000px; }
    .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
    .preserve-3d { transform-style: preserve-3d; }
    .rotate-y-180 { transform: rotateY(180deg); }
    .rotate-y-180-back { transform: rotateY(180deg); }
  </style>
  `;
}

window.filterPhrasal = function(category) {
    const cards = document.querySelectorAll('.phrasal-card');
    const btns = document.querySelectorAll('.phrasal-filter-btn');
    
    btns.forEach(btn => {
        if (btn.innerText.toLowerCase() === category.toLowerCase() || (category === 'all' && btn.innerText === 'Hepsi')) {
            btn.classList.add('bg-slate-900', 'text-white', 'shadow-lg');
            btn.classList.remove('text-slate-600');
        } else {
            btn.classList.remove('bg-slate-900', 'text-white', 'shadow-lg');
            btn.classList.add('text-slate-600');
        }
    });

    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
};

window.phrasalHTML = getPhrasalHTML();
