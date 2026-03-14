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



const YDT_VOCAB_DATA = [
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
  { w: "Plausible", m: "Makul, akla yatkın", e: "She gave a plausible explanation for her absence." },
  { w: "Profound", m: "Derin, köklü", e: "The experience had a profound effect on his life." },
  { w: "Reluctant", m: "İsteksiz, gönülsüz", e: "He was reluctant to talk about his past." },
  { w: "Scrutinize", m: "Dikkatle incelemek", e: "The lawyer scrutinized the document for any errors." },
  { w: "Thrive", m: "Gelişmek, çok başarılı olmak", e: "The business continues to thrive despite the economy." },
  { w: "Accumulate", m: "Biriktirmek", e: "Dust accumulated on the old books." },
  { w: "Adequate", m: "Yeterli", e: "The food supply was barely adequate." },
  { w: "Adjacent", m: "Bitişik, yanındaki", e: "The hotel is adjacent to the beach." },
  { w: "Allocate", m: "Tahsis etmek", e: "The budget was allocated to education." },
  { w: "Alternative", m: "Alternatif", e: "We need an alternative solution." },
  { w: "Arbitrary", m: "Keyfi", e: "The decision seemed arbitrary." },
  { w: "Attribute", m: "Atfetmek", e: "He attributes his success to hard work." },
  { w: "Bias", m: "Önyargı", e: "The study showed a bias in the data." },
  { w: "Capacity", m: "Kapasite", e: "The stadium has a seating capacity of 50,000." },
  { w: "Cognitive", m: "Bilişsel", e: "The research focuses on cognitive development." },
  { w: "Compatible", m: "Uyumlu", e: "The software is compatible with Windows." },
  { w: "Compile", m: "Derlemek", e: "The researcher compiled a list of sources." },
  { w: "Conceive", m: "Tasarlamak", e: "The idea was conceived during a meeting." },
  { w: "Constrain", m: "Kısıtlamak", e: "Financial problems constrained their plans." },
  { w: "Contemporary", m: "Çağdaş", e: "Contemporary art is often controversial." },
  { w: "Controversial", m: "Tartışmalı", e: "The topic remains controversial." },
  { w: "Conventional", m: "Geleneksel", e: "Conventional methods are still widely used." },
  { w: "Correlate", m: "İlişki göstermek", e: "The results correlate with previous studies." },
  { w: "Criteria", m: "Kriterler", e: "Admission criteria are very strict." },
  { w: "Cumulative", m: "Kümülatif", e: "The cumulative effect was significant." },
  { w: "Decline", m: "Azalmak", e: "The population has declined rapidly." },
  { w: "Deduce", m: "Sonuç çıkarmak", e: "Scientists deduced the cause of the disease." },
  { w: "Deficiency", m: "Eksiklik", e: "Iron deficiency can cause fatigue." },
  { w: "Demonstrate", m: "Göstermek, kanıtlamak", e: "The experiment demonstrates the theory." },
  { w: "Denote", m: "İfade etmek", e: "The symbol denotes equality." },
  { w: "Derive", m: "Elde etmek", e: "Many English words derive from Latin." },
  { w: "Detect", m: "Tespit etmek", e: "The test detects early signs of cancer." },
  { w: "Deviate", m: "Sapmak", e: "The plane deviated from its course." },
  { w: "Displace", m: "Yerinden etmek", e: "The earthquake displaced many people." },
  { w: "Distort", m: "Çarpıtmak", e: "The media can distort the facts." },
  { w: "Eliminate", m: "Ortadan kaldırmak", e: "The policy aims to eliminate poverty." },
  { w: "Emergent", m: "Ortaya çıkan", e: "Emergent technologies change industries." },
  { w: "Empirical", m: "Deneysel", e: "The theory lacks empirical evidence." },
  { w: "Endure", m: "Dayanmak", e: "The structure endured the earthquake." },
  { w: "Enormous", m: "Çok büyük", e: "The project required enormous effort." },
  { w: "Ensure", m: "Garanti etmek", e: "The measures ensure safety." },
  { w: "Establish", m: "Kurmak", e: "They established a new company." },
  { w: "Ethical", m: "Etik", e: "Ethical concerns were raised." },
  { w: "Exceed", m: "Aşmak", e: "The costs exceeded expectations." },
  { w: "Exclude", m: "Hariç tutmak", e: "The data excludes minor cases." },
  { w: "Facilitate", m: "Kolaylaştırmak", e: "Technology facilitates communication." },
  { w: "Factor", m: "Faktör", e: "Climate is a major factor." },
  { w: "Fundamental", m: "Temel", e: "Freedom is a fundamental right." },
  { w: "Generate", m: "Üretmek", e: "Solar panels generate electricity." },
  { w: "Hypothesis", m: "Hipotez", e: "The hypothesis needs testing." },
  { w: "Illustrate", m: "Örneklemek", e: "The diagram illustrates the process." },
  { w: "Impact", m: "Etki", e: "Climate change has a global impact." },
  { w: "Imply", m: "İma etmek", e: "His tone implied dissatisfaction." },
  { w: "Incorporate", m: "İçermek", e: "The design incorporates new features." },
  { w: "Indicate", m: "Göstermek", e: "The data indicates improvement." },
  { w: "Infer", m: "Sonuç çıkarmak", e: "We can infer the cause from the evidence." },
  { w: "Inhibit", m: "Engellemek", e: "The drug inhibits growth." },
  { w: "Initiate", m: "Başlatmak", e: "The government initiated reforms." },
  { w: "Innovative", m: "Yenilikçi", e: "The company introduced innovative products." },
  { w: "Integrate", m: "Entegre etmek", e: "Schools aim to integrate technology." },
  { w: "Intense", m: "Yoğun", e: "There was intense competition." },
  { w: "Interpret", m: "Yorumlamak", e: "Historians interpret events differently." },
  { w: "Isolate", m: "İzole etmek", e: "Researchers isolated the virus." },
  { w: "Justify", m: "Haklı göstermek", e: "The results justify the effort." },
  { w: "Maintain", m: "Sürdürmek", e: "It is hard to maintain balance." },
  { w: "Mechanism", m: "Mekanizma", e: "Scientists studied the mechanism." },
  { w: "Methodology", m: "Metodoloji", e: "The methodology was carefully designed." },
  { w: "Modify", m: "Değiştirmek", e: "They modified the experiment." },
  { w: "Monitor", m: "İzlemek", e: "Doctors monitor patients closely." },
  { w: "Neglect", m: "İhmal etmek", e: "The building suffered from neglect." },
  { w: "Neutral", m: "Tarafsız", e: "Journalists should remain neutral." },
  { w: "Notion", m: "Kavram", e: "The notion seems unrealistic." },
  { w: "Obtain", m: "Elde etmek", e: "Data was obtained from surveys." },
  { w: "Outcome", m: "Sonuç", e: "The outcome was unexpected." },
  { w: "Overcome", m: "Üstesinden gelmek", e: "She overcame many difficulties." },
  { w: "Persist", m: "Devam etmek", e: "The problem persists." },
  { w: "Perspective", m: "Bakış açısı", e: "History gives us perspective." },
  { w: "Phenomenon", m: "Olay, fenomen", e: "Global warming is a serious phenomenon." },
  { w: "Potential", m: "Potansiyel", e: "The region has great potential." },
  { w: "Predict", m: "Tahmin etmek", e: "Experts predict economic growth." },
  { w: "Primary", m: "Birincil", e: "The primary goal is safety." },
  { w: "Prior", m: "Önceki", e: "Prior experience is required." },
  { w: "Prohibit", m: "Yasaklamak", e: "Smoking is prohibited." },
  { w: "Prominent", m: "Önde gelen", e: "He is a prominent scientist." },
  { w: "Promote", m: "Teşvik etmek", e: "The program promotes education." },
  { w: "Prospect", m: "Olasılık", e: "The prospect of success motivated them." },
  { w: "Rational", m: "Mantıklı", e: "We need a rational approach." },
  { w: "Refine", m: "Geliştirmek", e: "The theory was refined." },
  { w: "Reinforce", m: "Güçlendirmek", e: "Steel reinforced the structure." },
  { w: "Reject", m: "Reddetmek", e: "The proposal was rejected." },
  { w: "Relevant", m: "İlgili", e: "The information is relevant." },
  { w: "Reliable", m: "Güvenilir", e: "The source is reliable." },
  { w: "Retain", m: "Korumak", e: "The company retained its staff." },
  { w: "Reveal", m: "Ortaya çıkarmak", e: "The report revealed corruption." },
  { w: "Sustain", m: "Sürdürmek", e: "The ecosystem must be sustained." },
  { w: "Access", m: "Erişim", e: "Students have access to online resources." },
  { w: "Accompany", m: "Eşlik etmek", e: "Rain often accompanies thunderstorms." },
  { w: "Accurate", m: "Doğru, kesin", e: "The report provides accurate information." },
  { w: "Achieve", m: "Başarmak", e: "She achieved great success." },
  { w: "Adapt", m: "Uyum sağlamak", e: "Animals adapt to their environments." },
  { w: "Administer", m: "Yönetmek", e: "The organization administers aid." },
  { w: "Adopt", m: "Benimsemek", e: "The company adopted a new policy." },
  { w: "Aggregate", m: "Toplam", e: "The aggregate results were impressive." },
  { w: "Aid", m: "Yardım etmek", e: "International organizations aid refugees." },
  { w: "Alter", m: "Değiştirmek", e: "The plan was altered slightly." },
  { w: "Analyse", m: "Analiz etmek", e: "Scientists analysed the data." },
  { w: "Annual", m: "Yıllık", e: "The annual meeting was held yesterday." },
  { w: "Anticipate", m: "Beklemek", e: "We anticipate difficulties." },
  { w: "Apparent", m: "Açık, belirgin", e: "The mistake became apparent." },
  { w: "Appreciate", m: "Takdir etmek", e: "I appreciate your help." },
  { w: "Approach", m: "Yaklaşım", e: "They used a new approach." },
  { w: "Approximate", m: "Yaklaşık", e: "The cost is approximate." },
  { w: "Arise", m: "Ortaya çıkmak", e: "Problems may arise." },
  { w: "Assess", m: "Değerlendirmek", e: "The teacher assessed the work." },
  { w: "Assign", m: "Atamak", e: "The task was assigned to her." },
  { w: "Assist", m: "Yardım etmek", e: "He assisted the professor." },
  { w: "Assume", m: "Varsaymak", e: "We assume the theory is correct." },
  { w: "Assure", m: "Garanti etmek", e: "The manager assured success." },
  { w: "Attach", m: "Eklemek", e: "Attach the document." },
  { w: "Attain", m: "Elde etmek", e: "They attained their goals." },
  { w: "Attitude", m: "Tutum", e: "She has a positive attitude." },
  { w: "Author", m: "Yazar", e: "The author published a new book." },
  { w: "Authority", m: "Yetki", e: "The government has authority." },
  { w: "Available", m: "Mevcut", e: "Resources are available." },
  { w: "Aware", m: "Farkında", e: "He is aware of the problem." },
  { w: "Benefit", m: "Fayda", e: "The policy benefits society." },
  { w: "Bond", m: "Bağ", e: "A strong bond formed." },
  { w: "Brief", m: "Kısa", e: "The speech was brief." },
  { w: "Capable", m: "Yetenekli", e: "She is capable of success." },
  { w: "Challenge", m: "Zorluk", e: "Climate change is a challenge." },
  { w: "Channel", m: "Kanal", e: "The river forms a channel." },
  { w: "Circumstance", m: "Durum", e: "Under these circumstances..." },
  { w: "Clarify", m: "Açıklığa kavuşturmak", e: "Please clarify the issue." },
  { w: "Classify", m: "Sınıflandırmak", e: "Scientists classify species." },
  { w: "Collaborate", m: "İşbirliği yapmak", e: "Researchers collaborated." },
  { w: "Combine", m: "Birleştirmek", e: "Combine the results." },
  { w: "Comment", m: "Yorum yapmak", e: "He commented on the issue." },
  { w: "Commission", m: "Komisyon", e: "The commission released a report." },
  { w: "Commit", m: "Adamak", e: "They committed to the project." },
  { w: "Communicate", m: "İletişim kurmak", e: "Humans communicate through language." },
  { w: "Community", m: "Topluluk", e: "The community supported the plan." },
  { w: "Complex", m: "Karmaşık", e: "The system is complex." },
  { w: "Component", m: "Bileşen", e: "Each component matters." },
  { w: "Concentrate", m: "Yoğunlaşmak", e: "She concentrated on the task." },
  { w: "Concept", m: "Kavram", e: "Freedom is an important concept." },
  { w: "Concern", m: "Endişe", e: "Environmental concerns are rising." },
  { w: "Conclude", m: "Sonuçlandırmak", e: "They concluded the study." },
  { w: "Conduct", m: "Yürütmek", e: "Researchers conducted experiments." },
  { w: "Confer", m: "Danışmak", e: "The doctors conferred." },
  { w: "Confirm", m: "Doğrulamak", e: "The test confirmed the result." },
  { w: "Conflict", m: "Çatışma", e: "Conflict arose." },
  { w: "Conform", m: "Uymak", e: "The rules must be conformed to." },
  { w: "Consensus", m: "Uzlaşma", e: "The group reached consensus." },
  { w: "Conserve", m: "Koruma", e: "We must conserve energy." },
  { w: "Considerable", m: "Önemli miktarda", e: "There is considerable evidence." },
  { w: "Consist", m: "Oluşmak", e: "The team consists of five members." },
  { w: "Constant", m: "Sabit", e: "Temperature remained constant." },
  { w: "Construct", m: "İnşa etmek", e: "They constructed a bridge." },
  { w: "Consume", m: "Tüketmek", e: "Cars consume fuel." },
  { w: "Contact", m: "Temas", e: "Please contact the office." },
  { w: "Context", m: "Bağlam", e: "Meaning depends on context." },
  { w: "Contract", m: "Sözleşme", e: "They signed a contract." },
  { w: "Contrast", m: "Karşılaştırma", e: "Contrast the two theories." },
  { w: "Contribute", m: "Katkıda bulunmak", e: "She contributed to the study." },
  { w: "Convert", m: "Dönüştürmek", e: "Energy converts into heat." },
  { w: "Convince", m: "İkna etmek", e: "He convinced the committee." },
  { w: "Core", m: "Öz", e: "Trust is the core value." },
  { w: "Corporate", m: "Kurumsal", e: "Corporate policies changed." },
  { w: "Correspond", m: "Karşılık gelmek", e: "The results correspond." },
  { w: "Create", m: "Yaratmak", e: "Technology creates opportunities." },
  { w: "Credit", m: "Kredi", e: "The bank provided credit." },
  { w: "Culture", m: "Kültür", e: "Culture shapes behavior." },
  { w: "Cycle", m: "Döngü", e: "Water follows a natural cycle." },
  { w: "Data", m: "Veri", e: "Scientists analyse data." },
  { w: "Debate", m: "Tartışma", e: "The issue sparked debate." },
  { w: "Define", m: "Tanımlamak", e: "The term is defined clearly." },
  { w: "Demonstration", m: "Gösterim", e: "The demonstration was effective." },
  { w: "Design", m: "Tasarım", e: "The experiment design matters." },
  { w: "Device", m: "Cihaz", e: "The device measures temperature." },
  { w: "Differentiate", m: "Ayırt etmek", e: "Students must differentiate ideas." },
  { w: "Dimension", m: "Boyut", e: "Time is another dimension." },
  { w: "Discrete", m: "Ayrık", e: "The data is discrete." },
  { w: "Display", m: "Göstermek", e: "The screen displays results." },
  { w: "Distribute", m: "Dağıtmak", e: "Food was distributed." },
  { w: "Domestic", m: "Yerel", e: "Domestic demand increased." },
  { w: "Draft", m: "Taslak", e: "The draft was revised." },
  { w: "Dynamic", m: "Dinamik", e: "The market is dynamic." },
  { w: "Economy", m: "Ekonomi", e: "The economy is growing." },
  { w: "Element", m: "Öğe", e: "Each element matters." },
  { w: "Emergence", m: "Ortaya çıkış", e: "The emergence of AI is notable." },
  { w: "Enable", m: "Olanak sağlamak", e: "Technology enables learning." },
  { w: "Encounter", m: "Karşılaşmak", e: "Explorers encountered storms." },
  { w: "Energy", m: "Enerji", e: "Solar energy is renewable." },
  { w: "Enforce", m: "Uygulamak", e: "The law was enforced." },
  { w: "Engage", m: "Katılmak", e: "Students engaged in discussion." },
  { w: "Environment", m: "Çevre", e: "We must protect the environment." },
  { w: "Estimation", m: "Tahmin", e: "The estimation was close." },
  { w: "Evolve", m: "Evrilmek", e: "Species evolve." },
  { w: "Expand", m: "Genişlemek", e: "The universe expands." },
  { w: "Expert", m: "Uzman", e: "An expert examined the data." },
  { w: "Explicit", m: "Açık", e: "The instructions are explicit." },
  { w: "Expose", m: "Ortaya çıkarmak", e: "The report exposed corruption." },
  { w: "Feature", m: "Özellik", e: "Speed is a key feature." },
  { w: "Focus", m: "Odak", e: "The focus is education." },
  { w: "Framework", m: "Çerçeve", e: "The theory provides a framework." },
  { w: "Function", m: "Fonksiyon", e: "Each organ has a function." },
  { w: "Fund", m: "Fon", e: "The project received funding." },
  { w: "Goal", m: "Hedef", e: "The goal is improvement." },
  { w: "Grant", m: "Hibe", e: "The university received a grant." },
  { w: "Guideline", m: "Yönerge", e: "Follow the guidelines." },
  { w: "Hierarchy", m: "Hiyerarşi", e: "The organization has a hierarchy." },
  { w: "Highlight", m: "Vurgulamak", e: "The report highlights risks." },
  { w: "Impactful", m: "Etkili", e: "The speech was impactful." },
  { w: "Implication", m: "Sonuç", e: "The implication is serious." },
  { w: "Improve", m: "Geliştirmek", e: "The method improved results." },
  { w: "Incentive", m: "Teşvik", e: "Money is an incentive." },
  { w: "Incorporation", m: "Dahil etme", e: "Incorporation improved design." },
  { w: "Index", m: "Endeks", e: "The index increased." },
  { w: "Indicator", m: "Gösterge", e: "GDP is an indicator." },
  { w: "Individual", m: "Birey", e: "Each individual matters." },
  { w: "Infrastructure", m: "Altyapı", e: "Infrastructure improved." },
  { w: "Innovation", m: "Yenilik", e: "Innovation drives growth." },
  { w: "Input", m: "Girdi", e: "The model needs input." },
  { w: "Insight", m: "İçgörü", e: "The study provides insight." },
  { w: "Institution", m: "Kurum", e: "The institution conducts research." },
  { w: "Instruction", m: "Talimat", e: "Follow instructions carefully." },
  { w: "Interaction", m: "Etkileşim", e: "Social interaction matters." },
  { w: "Internal", m: "İçsel", e: "Internal factors matter." },
  { w: "Interpretation", m: "Yorum", e: "Different interpretations exist." },
  { w: "Invest", m: "Yatırım yapmak", e: "They invest in education." },
  { w: "Investigation", m: "Araştırma", e: "The investigation continues." },
  { w: "Issue", m: "Sorun", e: "Climate is a global issue." },
  { w: "Layer", m: "Katman", e: "The earth has layers." },
  { w: "Legal", m: "Yasal", e: "The action is legal." },
  { w: "Legitimate", m: "Meşru", e: "The concern is legitimate." },
  { w: "Link", m: "Bağlantı", e: "There is a link between them." },
  { w: "Major", m: "Önemli", e: "This is a major problem." },
  { w: "Media", m: "Medya", e: "Media influences opinion." },
  { w: "Mental", m: "Zihinsel", e: "Mental health matters." },
  { w: "Method", m: "Yöntem", e: "This method works." },
  { w: "Migration", m: "Göç", e: "Migration increased." },
  { w: "Minimum", m: "Minimum", e: "Minimum effort required." },
  { w: "Mode", m: "Mod", e: "The device has several modes." },
  { w: "Motivate", m: "Motive etmek", e: "Teachers motivate students." },
  { w: "Network", m: "Ağ", e: "The network expanded." },
  { w: "Normal", m: "Normal", e: "This is normal." },
  { w: "Occur", m: "Meydana gelmek", e: "Earthquakes occur frequently." },
  { w: "Option", m: "Seçenek", e: "We have several options." },
  { w: "Output", m: "Çıktı", e: "The machine produces output." },
  { w: "Overall", m: "Genel", e: "Overall results improved." },
  { w: "Parameter", m: "Parametre", e: "Adjust the parameters." },
  { w: "Participate", m: "Katılmak", e: "Students participated." },
  { w: "Pattern", m: "Desen", e: "A pattern emerged." },
  { w: "Perceive", m: "Algılamak", e: "People perceive risk differently." },
  { w: "Period", m: "Dönem", e: "The period lasted decades." },
  { w: "Phase", m: "Aşama", e: "The project entered a new phase." },
  { w: "Policy", m: "Politika", e: "The policy changed." },
  { w: "Positive", m: "Olumlu", e: "The result is positive." },
  { w: "Principle", m: "Prensip", e: "The principle applies widely." },
  { w: "Priority", m: "Öncelik", e: "Education is a priority." },
  { w: "Procedure", m: "Prosedür", e: "Follow the procedure." },
  { w: "Process", m: "Süreç", e: "Learning is a process." },
  { w: "Produce", m: "Üretmek", e: "Factories produce goods." },
  { w: "Product", m: "Ürün", e: "The product sold well." },
  { w: "Professional", m: "Profesyonel", e: "Professional training helps." },
  { w: "Project", m: "Proje", e: "The project finished." },
  { w: "Proportion", m: "Oran", e: "A large proportion agreed." },
  { w: "Protocol", m: "Protokol", e: "The protocol was followed." },
  { w: "Psychological", m: "Psikolojik", e: "Psychological factors matter." },
  { w: "Publish", m: "Yayınlamak", e: "Scientists publish research." },
  { w: "Purpose", m: "Amaç", e: "The purpose is clear." },
  { w: "Range", m: "Aralık", e: "The range is wide." },
  { w: "Ratio", m: "Oran", e: "The ratio changed." },
  { w: "React", m: "Tepki vermek", e: "Cells react to stimuli." },
  { w: "Recover", m: "Toparlanmak", e: "The economy recovered." },
  { w: "Region", m: "Bölge", e: "The region is fertile." },
  { w: "Regulate", m: "Düzenlemek", e: "The government regulates markets." },
  { w: "Research", m: "Araştırma", e: "Research improves knowledge." },
  { w: "Resource", m: "Kaynak", e: "Water is a resource." },
  { w: "Respond", m: "Yanıt vermek", e: "People respond quickly." },
  { w: "Restore", m: "Geri getirmek", e: "The building was restored." },
  { w: "Result", m: "Sonuç", e: "The result surprised us." },
  { w: "Scheme", m: "Plan", e: "The scheme succeeded." },
  { w: "Sequence", m: "Sıra", e: "Events follow a sequence." },
  { w: "Significant", m: "Önemli", e: "The difference is significant." },
  { w: "Similar", m: "Benzer", e: "The two ideas are similar." },
  { w: "Source", m: "Kaynak", e: "The river is the source." },
  { w: "Specific", m: "Belirli", e: "The task is specific." },
  { w: "Stable", m: "Kararlı", e: "The system is stable." },
  { w: "Structure", m: "Yapı", e: "The structure collapsed." },
  { w: "Subsequent", m: "Sonraki", e: "Subsequent studies confirmed this." },
  { w: "Summary", m: "Özet", e: "The report includes a summary." },
  { w: "Survey", m: "Anket", e: "The survey involved 1000 people." },
  { w: "Target", m: "Hedef", e: "The target was achieved." },
  { w: "Technique", m: "Teknik", e: "A new technique was used." },
  { w: "Theory", m: "Teori", e: "Einstein proposed the theory." },
  { w: "Transfer", m: "Aktarmak", e: "Heat transfers energy." },
  { w: "Trend", m: "Trend", e: "The trend continues." },
  { w: "Unique", m: "Benzersiz", e: "Each culture is unique." },
  { w: "Utility", m: "Fayda", e: "The utility is high." },
  { w: "Valid", m: "Geçerli", e: "The argument is valid." },
  { w: "Variable", m: "Değişken", e: "Temperature is a variable." },
  { w: "Version", m: "Versiyon", e: "A new version appeared." },
  { w: "Volume", m: "Hacim", e: "The volume increased." },
  { w: "Welfare", m: "Refah", e: "Social welfare improved." },
  { w: "Widespread", m: "Yaygın", e: "The disease is widespread." }
];

const YDT_GRAMMAR_SHEETS = [
  {
    title: "Tense Uyumu (Zaman Uyumu)",
    icon: "fa-clock",
    color: "blue",
    content: [
      { subtitle: "Temel Kural", text: "Ana cümle 'Present' ise yan cümle 'Present' veya 'Future' olabilir. Ana cümle 'Past' ise yan cümle de 'Past' olmalıdır." },
      { subtitle: "İstisna", text: "General truths (Genel doğrular) her zaman Simple Present ile ifade edilir." },
      { subtitle: "İpucu", text: "Since + V2 kuralını unutmayın: 'Since'li cümle V2 (Past), ana cümle Present Perfect olur." }
    ]
  },
  {
    title: "If Clauses (Koşul Cümleleri)",
    icon: "fa-code-branch",
    color: "emerald",
    content: [
      { subtitle: "Type 0 & 1", text: "Gerçek ve olası durumlar. If + Present, ... Present/Will." },
      { subtitle: "Type 2", text: "Hayali/Mevcut durumun zıttı. If + Past (V2), ... Would + V1." },
      { subtitle: "Type 3", text: "Geçmişteki pişmanlıklar. If + Past Perfect (Had V3), ... Would Have V3." }
    ]
  },
  {
    title: "Bağlaçlar (Conjunctions)",
    icon: "fa-link",
    color: "purple",
    content: [
      { subtitle: "Zıtlık (Contrast)", text: "Although, Though, Even though (+ Cümle) | Despite, In spite of (+ Isım/Ving)" },
      { subtitle: "Sebep (Reason)", text: "Because, Since, As (+ Cümle) | Because of, Due to, Thanks to (+ Isım)" },
      { subtitle: "Sonuç (Result)", text: "Therefore, Thus, Hence, As a result (+ Cümle)" }
    ]
  },
  {
    title: "Relative Clauses",
    icon: "fa-user-tag",
    color: "amber",
    content: [
      { subtitle: "Who / Whom", text: "İnsanlar için kullanılır. Who (Özne), Whom (Nesne)." },
      { subtitle: "Which / That", text: "Nesneler ve hayvanlar için kullanılır. That her ikisinin yerine geçebilir." },
      { subtitle: "Whose", text: "Aitlik bildirir. İsim + Whose + İsim yapısı aranır." }
    ]
  }
];

// ── YDT Vocab List ────────────────────────────────────────────────
function getYdtVocabHTML() {
  return /* html */`
<div class="max-w-6xl mx-auto px-4 py-10">
  <div class="text-center mb-12">
    <h2 class="text-4xl font-black text-slate-900 mb-2" style="font-family:'Playfair Display',serif;">YDT Must-Know Vocabulary</h2>
    <p class="text-slate-500">YDT sınavında en çok çıkan akademik kelimeler listesi. Toplam ${YDT_VOCAB_DATA.length} kelime.</p>
  </div>

  <!-- Search Filter -->
  <div class="mb-10 max-w-md mx-auto relative group">
    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <i class="fas fa-search text-slate-400 group-focus-within:text-orange-500 transition-colors"></i>
    </div>
    <input type="text" id="vocabSearch" onkeyup="filterYdtVocab()" placeholder="Kelime veya anlam ara..." 
      class="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl shadow-sm focus:border-orange-500 outline-none transition-all text-slate-700">
  </div>

  <div id="vocabContainer" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    ${YDT_VOCAB_DATA.map(item => `
      <div class="vocab-card bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border-l-4 border-l-orange-500">
        <h3 class="text-xl font-bold text-slate-800 mb-1">${item.w}</h3>
        <p class="text-orange-600 font-bold text-sm mb-2">${item.m}</p>
        <p class="text-slate-500 text-xs italic leading-relaxed">"${item.e}"</p>
      </div>
    `).join('')}
  </div>
</div>
`;
}

function filterYdtVocab() {
    const q = document.getElementById('vocabSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.vocab-card');
    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(q) ? 'block' : 'none';
    });
}

function getYdtGrammarHTML() {
  return /* html */`
<div class="max-w-6xl mx-auto px-4 py-10">
  <div class="text-center mb-12">
    <h2 class="text-4xl font-black text-slate-900 mb-2" style="font-family:'Playfair Display',serif;">YDT Gramer Özetleri</h2>
    <p class="text-slate-500">Sınavda en çok karıştırılan konular için hızlı referans kartları.</p>
  </div>

  <div class="grid md:grid-cols-2 gap-8">
    ${YDT_GRAMMAR_SHEETS.map(sheet => `
      <div class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-32 h-32 bg-${sheet.color}-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
        
        <div class="relative z-10">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-14 h-14 rounded-2xl bg-${sheet.color}-600 flex items-center justify-center text-white shadow-lg shadow-${sheet.color}-900/20">
              <i class="fas ${sheet.icon} text-2xl"></i>
            </div>
            <h3 class="text-2xl font-black text-slate-800">${sheet.title}</h3>
          </div>

          <div class="space-y-6">
            ${sheet.content.map(c => `
              <div class="border-l-4 border-${sheet.color}-200 pl-4">
                <p class="text-[10px] font-bold text-${sheet.color}-600 uppercase tracking-widest mb-1">${c.subtitle}</p>
                <p class="text-slate-600 text-sm leading-relaxed">${c.text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('')}
  </div>

  <div class="mt-16 text-center">
    <div class="inline-block p-1 rounded-2xl bg-slate-100">
      <div class="bg-white px-8 py-4 rounded-xl shadow-sm border border-slate-200">
        <p class="text-slate-500 text-sm italic">"Daha detaylı konu anlatımı için üst menüdeki <b>Grammar</b> bölümünü ziyaret edebilirsiniz."</p>
      </div>
    </div>
  </div>
</div>
`;
}

// Global register functions
window.ydtExamsHTML = getYdtSelectorHTML(YDT_EXAM_LIST, 'YDT Tam Denemeler');
window.ydtTacticsHTML = getYdtTacticsHTML();
window.ydtVocabHTML = getYdtVocabHTML();
window.ydtGrammarHTML = getYdtGrammarHTML();
window.YDT_EXAM_LIST = YDT_EXAM_LIST;
