/* ============================================================
   ydt.js  –  YDT (High School English Exam) Section
   ============================================================ */

const YDT_EXAM_LIST = [
  { id: 'ydt1', label: 'YDT Deneme 1', file: '/exams/ydt/ydt1.json' },
  { id: 'ydt2', label: 'YDT Deneme 2', file: '/exams/ydt/ydt2.json' },
  { id: 'ydt3', label: 'YDT Deneme 3', file: '/exams/ydt/ydt3.json' },
  { id: 'ydt4', label: 'YDT Deneme 4', file: '/exams/ydt/ydt4.json' },
  { id: 'ydt5', label: 'YDT Deneme 5', file: '/exams/ydt/ydt5.json' }
];

const YDT_TACTICS = [
  { title: "Kelime Soruları", status: "Trick: Collocations", content: "Sadece kelime anlamı yetmez. Kelimenin yanına aldığı edata (preposition) veya hangi fiille kullanıldığına (collocation) bakın. Örneğin 'influence' kelimesi 'on' ile, 'depend' kelimesi 'on' ile kullanılır." },
  { title: "Gramer & Tense", status: "Trick: Zaman Zarfları", content: "Tense sorularında mutlaka zaman zarflarına (ago, since, by the time) odaklanın. Eğer 'for 10 years' varsa ve cümle hala devam ediyorsa Present Perfect önceliklidir." },
  { title: "Bağlaçlar", status: "Trick: +/- Dengesi", content: "Zıtlık bağlaçlarında (but, although, however) cümlenin bir tarafı olumluysa diğer tarafı olumsuz olmalıdır. Sebep-sonuç bağlaçlarında ise anlam akışı aynı yöndedir." },
  { title: "Cümle Tamamlama", status: "Trick: Referans Kelimeler", content: "Yan cümle ile ana cümle arasındaki 'they, this, such, those' gibi referans kelimelere dikkat edin. Boşluktaki özne, ana cümledeki bir unsura mutlaka işaret etmelidir." },
  { title: "Cloze Test", status: "Trick: Bütünsel Bakış", content: "Boşlukları tek tek değil, paragrafın tamamını anlayarak çözün. Özellikle bağlaç boşluklarında, boşluktan önceki ve sonraki cümleler arasındaki mantıksal ilişkiyi kurun." },
  { title: "Çeviri Soruları", status: "Trick: Ana Fiil (Yüklem)", content: "Cümlenin ana fiilini bulun. Türkçe-İngilizce çeviride yüklem sonda, İngilizce'de ise genellikle özneden hemen sonradır. Bu eşleşme seçeneklerin %90'ını eler." },
  { title: "Okuma Parçaları", status: "Trick: Zıtlık Odaklı", content: "Parçada 'but, however, yet, nevertheless' gibi zıtlık bağlaçlarından sonra gelen cümleler genellikle soru cevabıdır. Ayrıca 'most, only, never' gibi iddialı ifadeler içeren seçeneklere temkinli yaklaşın." },
  { title: "Diyalog Tamamlama", status: "Trick: Duygu Tonu", content: "Boşluktan bir önceki ve bir sonraki cümleye bakın. Cevap seçeneğindeki duygu tonu (şaşkınlık, onaylama, itiraz) diyalogla uyumlu olmalı. 'Actually' veya 'By the way' gibi geçişlere dikkat." },
  { title: "Anlamca En Yakın", status: "Trick: Miktar Zarfları", content: "Cümledeki zarflara (only, rarely, always, almost) ve miktar belirleyicilere dikkat edin. Orijinal cümlede 'nadiren' diyorsa, şıklarda 'hiçbir zaman' diyen seçeneği eleyin." },
  { title: "Durum Soruları", status: "Trick: Sosyal Statü", content: "Kiminle konuştuğunuza (arkadaş, patron, garson) bakın. Dilin tonu (resmi/samimi) belirleyicidir. Ayrıca 'en nazik olanı' değil, 'duruma en uygun olanı' seçin." },
  { title: "Paragraf Tamamlama", status: "Trick: Özne Takibi", content: "Boşluktan önceki cümlede geçen bir özne veya kavramın, boşluktan sonraki cümlede nasıl devam ettiğini (it, they, this) izleyin. Akışı bozan ani konu değişikliklerinden kaçının." },
  { title: "Anlamı Bozan Cümle", status: "Trick: Kapsam Hatası", content: "Paragrafın genel konusundan sapan veya aynı konuyu çok farklı bir boyuttan ele alan (örneğin genel eğitimden bahsedilirken aniden okulun boyasına geçilmesi) cümleyi bulun." }
];

// ── HTML Templates ───────────────────────────────────────────

function getYdtSelectorHTML(list, title) {
  return /* html */`
<div class="max-w-5xl mx-auto px-4 py-10">
  <div class="text-center mb-10">
    <div class="inline-flex items-center gap-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-3 rounded-2xl shadow-xl mb-6">
      <i class="fas fa-graduation-cap text-xl"></i>
      <span class="font-bold text-lg tracking-wide" style="font-family:'Playfair Display',serif;">YDT Hazırlık Merkezi</span>
    </div>
    <h2 class="text-3xl font-extrabold text-slate-800 mb-2" style="font-family:'Playfair Display',serif;">${title}</h2>
    <p class="text-slate-500 text-sm">Üniversite sınavına hazırlananlar için güncel YDT formatında denemeler.</p>
  </div>

  <div class="space-y-12">
    <section>
      <div class="flex items-center gap-3 mb-6">
        <div class="h-8 w-1 bg-blue-700 rounded-full"></div>
        <h3 class="text-xl font-bold text-slate-800">${title} (80 Soru)</h3>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        ${list.map(e => `
          <div onclick="feSelectExam('${e.id}', this)" id="feCard-${e.id}"
            class="fe-exam-card cursor-pointer border-2 border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative z-10">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-lg">
                  <i class="fas fa-file-alt text-lg"></i>
                </div>
                <div>
                  <p class="font-bold text-slate-800 text-lg">${e.label}</p>
                  <p class="text-xs text-slate-400 font-semibold tracking-wide">80 SORU · 120 DAKİKA</p>
                </div>
              </div>
              <div class="flex gap-2 flex-wrap text-xs text-slate-500">
                <span class="bg-blue-50 text-blue-700 font-bold px-2 py-1 rounded-md border border-blue-100 italic">YDT Formatı</span>
                <span class="bg-slate-100 px-2 py-1 rounded-md">Deneme</span>
              </div>
            </div>
          </div>`).join('')}
      </div>
    </section>

    <div class="feSelectedInfo hidden bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-start gap-4 shadow-2xl">
      <div class="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center shrink-0">
        <i class="fas fa-info-circle text-white text-xl"></i>
      </div>
      <div>
        <p class="font-bold text-white text-lg mb-1">Hazır mısınız?</p>
        <p class="text-slate-400 text-sm leading-relaxed">Sınav başladıktan sonra 120 dakika süreniz olacak. Başarılar dileriz!</p>
      </div>
    </div>

    <div class="flex justify-center pb-10">
      <button onclick="feStartExam(this)" disabled
        class="feStartBtn px-12 py-5 bg-gradient-to-r from-blue-800 to-blue-700 text-white rounded-2xl font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 flex items-center gap-4 shadow-blue-900/40">
        <i class="fas fa-play-circle text-2xl"></i>
        SINAVI BAŞLAT
      </button>
    </div>
  </div>
</div>
`;
}

function getYdtTacticsHTML() {
  return /* html */`
<div class="max-w-5xl mx-auto px-4 py-10">
  <div class="text-center mb-12">
    <h2 class="text-4xl font-black text-slate-900 mb-4" style="font-family:'Playfair Display',serif;">YDT Taktik Masası</h2>
    <p class="text-slate-500 max-w-2xl mx-auto">YDT İngilizce sınavında başarıya ulaşmak için bilmeniz gereken en önemli stratejiler ve ipuçları.</p>
  </div>

  <div class="grid md:grid-cols-3 gap-6">
    ${YDT_TACTICS.map(t => `
      <div class="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border-t-4 border-t-blue-600">
        <div class="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-4">${t.status}</div>
        <h3 class="text-xl font-bold text-slate-800 mb-4">${t.title}</h3>
        <p class="text-slate-600 text-sm leading-relaxed">${t.content}</p>
      </div>
    `).join('')}
  </div>

  <div class="mt-12 bg-blue-50 border border-blue-100 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-8">
    <div class="shrink-0 w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3">
        <i class="fas fa-lightbulb text-3xl"></i>
    </div>
    <div>
        <h4 class="text-xl font-bold text-blue-900 mb-2">Unutmayın!</h4>
        <p class="text-blue-800/70 text-sm leading-relaxed">YDT'de kelime bilgisi kadar okuduğunu anlama hızı da önemlidir. Buradaki denemeleri çözerek hızınızı artırabilirsiniz.</p>
    </div>
  </div>
</div>
`;
}

// ── YDT Score Calculator ──────────────────────────────────────────
function getYdtCalcHTML() {
  return /* html */`
<div class="max-w-4xl mx-auto px-4 py-10">
  <div class="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden">
    <div class="bg-gradient-to-r from-blue-700 to-indigo-800 p-10 text-white text-center">
      <h2 class="text-3xl font-black mb-2" style="font-family:'Playfair Display',serif;">YKS-Dil Puan Hesaplayıcı</h2>
      <p class="text-blue-100 opacity-80">TYT ve YDT netlerinizi girerek tahmini yerleştirme puanınızı hesaplayın.</p>
    </div>
    
    <div class="p-10 grid md:grid-cols-2 gap-10">
      <div class="space-y-6">
        <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
          <i class="fas fa-edit text-blue-600"></i> TYT Netleri
        </h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase">Türkçe (40)</label>
            <input type="number" id="calc-tr" value="30" class="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 focus:border-blue-500 outline-none transition-all">
          </div>
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase">Sosyal (20)</label>
            <input type="number" id="calc-soc" value="15" class="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 focus:border-blue-500 outline-none transition-all">
          </div>
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase">Matematik (40)</label>
            <input type="number" id="calc-mat" value="10" class="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 focus:border-blue-500 outline-none transition-all">
          </div>
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase">Fen (20)</label>
            <input type="number" id="calc-sci" value="5" class="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 focus:border-blue-500 outline-none transition-all">
          </div>
        </div>
        
        <div class="pt-6 border-t border-slate-50">
          <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
            <i class="fas fa-language text-blue-600"></i> YDT Neti
          </h3>
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase">YDT İngilizce (80)</label>
            <input type="number" id="calc-ydt" value="70" class="w-full bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-xl font-bold text-blue-900 focus:border-blue-500 outline-none transition-all">
          </div>
        </div>

        <div class="pt-6">
          <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
            <i class="fas fa-graduation-cap text-blue-600"></i> OBP (Okul Puanı)
          </h3>
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase">Diploma Notu (50-100)</label>
            <input type="number" id="calc-obp" value="85" class="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 focus:border-blue-500 outline-none transition-all">
          </div>
        </div>
      </div>

      <div class="bg-slate-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6">
        <div class="text-slate-400 uppercase text-xs font-black tracking-widest">Tahmini Yerleştirme Puanı</div>
        <div id="calc-result" class="text-7xl font-black text-blue-700 leading-none">---</div>
        <div class="text-slate-500 text-sm max-w-[200px]">Bu puan 2023-2024 YKS katsayıları baz alınarak hesaplanmıştır.</div>
        <button onclick="calculateYdtScore()" class="w-full py-5 bg-blue-700 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-blue-800 hover:scale-[1.02] transition-all">HESAPLA</button>
      </div>
    </div>
  </div>
</div>
`;
}

// ── YDT Vocab List ────────────────────────────────────────────────
function getYdtVocabHTML() {
  const words = [
    { w: "Ambiguous", m: "Belirsiz, iki anlamlı", e: "The ending of the movie was ambiguous." },
    { w: "Compelling", m: "İlgi uyandırıcı, ikna edici", e: "The evidence was compelling." },
    { w: "Drastic", m: "Sert, şiddetli, radikal", e: "We need to take drastic measures." },
    { w: "Feasible", m: "Mümkün, yapılabilir", e: "It's a feasible plan for the project." },
    { w: "Inevitably", m: "Kaçınılmaz bir şekilde", e: "Technological change inevitably leads to social change." },
    { w: "Obstacle", m: "Engel", e: "Lack of money is a major obstacle." },
    { w: "Prevalent", m: "Yaygın", e: "Smoking is prevalent among teenagers." },
    { w: "Resilience", m: "Dayanıklılık, kendini toplama gücü", e: "She showed great resilience after the tragedy." },
    { w: "Substantial", m: "Önemli, büyük miktarda", e: "There is a substantial difference between the two." },
    { w: "Undermine", m: "Zayıflatmak, baltalamak", e: "Constant criticism can undermine a person's confidence." },
    { w: "Abundant", m: "Bol, bereketli", e: "The region is famous for its abundant natural resources." },
    { w: "Acquire", m: "Edinmek, kazanmak", e: "She managed to acquire a new language in just six months." },
    { w: "Adverse", m: "Olumsuz, ters", e: "The medicine had some adverse side effects." },
    { w: "Advocate", m: "Savunmak, desteklemek", e: "He is a strong advocate of free speech." },
    { w: "Alleviate", m: "Hafifletmek, dindirmek", e: "The new drug helps to alleviate pain." },
    { w: "Coherent", m: "Tutarlı, uyumlu", e: "Her argument was not very coherent." },
    { w: "Comprehensive", m: "Kapsamlı, detaylı", e: "The report offers a comprehensive look at the issue." },
    { w: "Contradict", m: "Çelişmek, aksini söylemek", e: "The witness's statement contradicts the evidence." },
    { w: "Crucial", m: "Çok önemli, hayati", e: "Early diagnosis is crucial for successful treatment." },
    { w: "Depict", m: "Tasvir etmek, betimlemek", e: "The painting depicts a beautiful landscape." },
    { w: "Deteriorate", m: "Kötüleşmek, bozulmak", e: "His health began to deteriorate rapidly." },
    { w: "Diverse", m: "Çeşitli, farklı", e: "The city has a very diverse population." },
    { w: "Emphasize", m: "Vurgulamak", e: "The teacher emphasized the importance of hard work." },
    { w: "Enhance", m: "Geliştirmek, artırmak", e: "The new software will enhance the performance of the system." },
    { w: "Evaluate", m: "Değerlendirmek", e: "It's difficult to evaluate the success of the project." },
    { w: "Exacerbate", m: "Kötüleştirmek, şiddetlendirmek", e: "The cold weather exacerbated his cough." },
    { w: "Flourish", m: "Gelişmek, serpilmek", e: "The company began to flourish under new management." },
    { w: "Hinder", m: "Engellemek, aksatmak", e: "High winds hindered the rescue efforts." },
    { w: "Implement", m: "Uygulamak, yerine getirmek", e: "The government plans to implement new tax laws." },
    { w: "Incline", m: "Eğilimi olmak", e: "I am inclined to agree with your proposal." },
    { w: "Indigenous", m: "Yerli, bir bölgeye özgü", e: "Kangaroos are indigenous to Australia." },
    { w: "Inherent", m: "Doğasında olan, kalıtsal", e: "There are inherent risks in any investment." },
    { w: "Insulate", m: "Yalıtmak, korumak", e: "The house is well insulated against the cold." },
    { w: "Magnify", m: "Büyütmek, abartmak", e: "The microscope magnifies the image 100 times." },
    { w: "Objective", m: "Nesnel, tarafsız", e: "Scientists must remain objective during their research." },
    { w: "Plausible", m: "Makul, akla yatkın", e: "She gave a plausible explanation for her absence." },
    { w: "Profound", m: "Derin, köklü", e: "The experience had a profound effect on his life." },
    { w: "Reluctant", m: "İsteksiz, gönülsüz", e: "He was reluctant to talk about his past." },
    { w: "Scrutinize", m: "Dikkatle incelemek", e: "The lawyer scrutinized the document for any errors." },
    { w: "Thrive", m: "Gelişmek, çok başarılı olmak", e: "The business continues to thrive despite the economy." }
  ];

  return /* html */`
<div class="max-w-5xl mx-auto px-4 py-10">
  <div class="text-center mb-12">
    <h2 class="text-4xl font-black text-slate-900 mb-2" style="font-family:'Playfair Display',serif;">YDT Must-Know Vocabulary</h2>
    <p class="text-slate-500">Övünmek gibi olmasın ama, bu kelimeleri bilmeden sınava girmeyin!</p>
  </div>

  <div class="grid md:grid-cols-2 gap-6">
    ${words.map(item => `
      <div class="bg-white border-b-4 border-orange-500 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-2xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors">${item.w}</h3>
          <span class="text-[10px] bg-orange-50 text-orange-600 px-2 py-1 rounded-md font-bold uppercase">Academic</span>
        </div>
        <p class="text-slate-900 font-bold mb-2"> <i class="fas fa-arrow-right text-orange-400 mr-2"></i> ${item.m}</p>
        <p class="text-slate-500 text-sm italic">"${item.e}"</p>
      </div>
    `).join('')}
  </div>
  
  <div class="mt-12 text-center">
    <button onclick="switchTab('vocabulary')" class="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">Daha Fazla Kelime İçin Sözlüğe Git</button>
  </div>
</div>
`;
}

// ── Calculation Logic ─────────────────────────────────────────────
function calculateYdtScore() {
  const tr = parseFloat(document.getElementById('calc-tr').value) || 0;
  const soc = parseFloat(document.getElementById('calc-soc').value) || 0;
  const mat = parseFloat(document.getElementById('calc-mat').value) || 0;
  const sci = parseFloat(document.getElementById('calc-sci').value) || 0;
  const ydt = parseFloat(document.getElementById('calc-ydt').value) || 0;
  const obp = parseFloat(document.getElementById('calc-obp').value) || 0;

  // Standart YKS-Dil Katsayıları (Yaklaşık)
  // Ham Puan = (TYT Net Toplamı * 1.3) + (YDT Net * 3) + 100 (Taban)
  // Yerleştirme Puanı = Ham Puan + (OBP * 0.6)
  
  const tytTotal = tr + soc + mat + sci;
  const hamPuan = (tytTotal * 1.32) + (ydt * 3.0) + 100;
  const yerlPuan = hamPuan + (obp * 0.6);

  document.getElementById('calc-result').innerText = yerlPuan.toFixed(2);
}

// Global register functions
window.ydtExamsHTML = getYdtSelectorHTML(YDT_EXAM_LIST, 'YDT Tam Denemeler');
window.ydtTacticsHTML = getYdtTacticsHTML();
window.ydtCalcHTML = getYdtCalcHTML();
window.ydtVocabHTML = getYdtVocabHTML();
window.calculateYdtScore = calculateYdtScore;
window.YDT_EXAM_LIST = YDT_EXAM_LIST;
