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

const ydtExamsHTML = getYdtSelectorHTML(YDT_EXAM_LIST, 'YDT Tam Denemeler');
const ydtTacticsHTML = getYdtTacticsHTML();

// Global register
window.ydtExamsHTML = ydtExamsHTML;
window.ydtTacticsHTML = ydtTacticsHTML;
window.YDT_EXAM_LIST = YDT_EXAM_LIST;
