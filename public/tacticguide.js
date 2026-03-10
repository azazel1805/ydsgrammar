/* ============================================================
   tacticguide.js  –  YDS Taktik Rehberi
   ============================================================ */

const tacticGuideHTML = /* html */`
<div class="max-w-4xl mx-auto px-4 py-10" id="tg-root">
  <!-- Action Bar (Print) -->
  <div class="flex justify-end mb-4 no-print">
      <button onclick="window.print()" class="print-btn flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg active:scale-95">
          <i class="fas fa-file-pdf"></i> PDF İndir / Yazdır
      </button>
  </div>

  <!-- ── Hero ────────────────────────────────────────────── -->
  <div class="text-center mb-12">
    <div class="inline-flex items-center gap-3 bg-gradient-to-r from-red-800 to-red-900 text-white px-6 py-3 rounded-2xl shadow-xl mb-6">
      <i class="fas fa-chess text-xl"></i>
      <span class="font-bold text-lg tracking-wide" style="font-family:'Playfair Display',serif;">YDS Taktik Rehberi</span>
    </div>
    <h2 class="text-4xl font-extrabold text-slate-800 mb-3" style="font-family:'Playfair Display',serif;">Sınav Zaferi İçin Tam Rehber</h2>
    <p class="text-slate-500 max-w-xl mx-auto leading-relaxed">Sıfırdan başlayandan ileri seviyeye — soru tipine özel taktikler, çalışma planları ve puan artırma teknikleri.</p>
  </div>

  <!-- ── Level Selector ──────────────────────────────────── -->
  <div class="flex gap-3 justify-center mb-10 flex-wrap no-print">
    <button onclick="tgSetLevel('all')" id="tgBtn-all"
      class="tg-level-btn px-5 py-2.5 rounded-xl border-2 font-bold text-sm transition-all border-red-700 bg-red-700 text-white">
      <i class="fas fa-users mr-2"></i>Tümü
    </button>
    <button onclick="tgSetLevel('beginner')" id="tgBtn-beginner"
      class="tg-level-btn px-5 py-2.5 rounded-xl border-2 font-bold text-sm transition-all border-slate-200 text-slate-600 hover:border-emerald-400">
      <i class="fas fa-seedling mr-2 text-emerald-500"></i>Başlangıç (A2–B1)
    </button>
    <button onclick="tgSetLevel('advanced')" id="tgBtn-advanced"
      class="tg-level-btn px-5 py-2.5 rounded-xl border-2 font-bold text-sm transition-all border-slate-200 text-slate-600 hover:border-blue-400">
      <i class="fas fa-graduation-cap mr-2 text-blue-500"></i>İleri Seviye (B2–C1)
    </button>
  </div>

  <!-- ── STUDY PLAN SECTION ──────────────────────────────── -->
  <section class="mb-14">
    <h3 class="tg-section-title">📅 Çalışma Planı</h3>

    <!-- Beginner Plan -->
    <div class="tg-card tg-beginner">
      <div class="tg-card-header emerald">
        <i class="fas fa-seedling"></i>
        <span>Başlangıç Seviyesi — 6 Aylık Plan (A2 → 70+ puan hedefi)</span>
      </div>
      <div class="grid md:grid-cols-3 gap-4 p-5">
        <div class="tg-phase">
          <div class="tg-phase-label emerald">1. Ay–2. Ay: Temel Gramer</div>
          <ul class="tg-list">
            <li>Tüm tense'leri ezberle (Present → Past Perfect)</li>
            <li>Modal verbs (must, should, could, might) bitir</li>
            <li>Relative + Noun + Adverbial Clauses</li>
            <li>Günde 10 kelime kart (Anki / el yazısı)</li>
            <li>Her hafta 1 Vocabulary soru seti (25 soru)</li>
          </ul>
        </div>
        <div class="tg-phase">
          <div class="tg-phase-label emerald">3. Ay–4. Ay: Soru Tipleri</div>
          <ul class="tg-list">
            <li>Sentence Completion kalıplarını öğren</li>
            <li>Her gün 1 Reading passage oku (BBC / Guardian)</li>
            <li>Cümle Atma tekniğini öğren (thematic unity)</li>
            <li>Translation için paralel cümle yapısı çalışması</li>
            <li>Haftada 2 mini exam</li>
          </ul>
        </div>
        <div class="tg-phase">
          <div class="tg-phase-label emerald">5. Ay–6. Ay: Sınav Hazırlık</div>
          <ul class="tg-list">
            <li>Haftada 1 full deneme sınavı (180 dk)</li>
            <li>Yanlış soruları analiz et, kategorile</li>
            <li>Zayıf bölümlere 2x çalışma</li>
            <li>Son ay: sadece deneme + hata analizi</li>
            <li>Sınav öncesi hafta: yeni konu girme!</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Advanced Plan -->
    <div class="tg-card tg-advanced mt-6">
      <div class="tg-card-header blue">
        <i class="fas fa-graduation-cap"></i>
        <span>İleri Seviye — 3 Aylık Plan (B2 → 80+ puan hedefi)</span>
      </div>
      <div class="grid md:grid-cols-3 gap-4 p-5">
        <div class="tg-phase">
          <div class="tg-phase-label blue">1. Ay: Hata Haritası</div>
          <ul class="tg-list">
            <li>2 full deneme yap, sonuçları kategorile</li>
            <li>Bölüm bazlı hata oranı çıkar</li>
            <li>En zayıf 2 bölüme odaklan</li>
            <li>YDS'ye özel kelime listesi (akademik vocab)</li>
            <li>Real exam papers ile pratik</li>
          </ul>
        </div>
        <div class="tg-phase">
          <div class="tg-phase-label blue">2. Ay: Bölüm Güçlendirme</div>
          <ul class="tg-list">
            <li>Zayıf bölümler için kaynak çalışması</li>
            <li>Translation kalıplarını sistemleştir</li>
            <li>Okuma hızını artır (skimming/scanning)</li>
            <li>Cümle tamamlama mantığını geliştir</li>
            <li>Haftada 2 tam deneme</li>
          </ul>
        </div>
        <div class="tg-phase">
          <div class="tg-phase-label blue">3. Ay: Sınav Simülasyonu</div>
          <ul class="tg-list">
            <li>Haftada 3 full deneme (sınav şartlarında)</li>
            <li>Süre yönetimini optimize et</li>
            <li>Soru atlama + işaretleme stratejisi</li>
            <li>Son 2 hafta: koru, yeni konu ekleme</li>
            <li>Sınav öncesi gün: hafif tekrar, erken uyu</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- ── TIME MANAGEMENT ─────────────────────────────────── -->
  <section class="mb-14">
    <h3 class="tg-section-title">⏱️ Sınav Günü Zaman Yönetimi</h3>
    <div class="tg-card">
      <div class="p-5">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b-2 border-slate-200">
                <th class="text-left py-2 px-3 font-bold text-slate-700">Bölüm</th>
                <th class="text-center py-2 px-3 font-bold text-slate-700">Sorular</th>
                <th class="text-center py-2 px-3 font-bold text-slate-700">Önerilen Süre</th>
                <th class="text-center py-2 px-3 font-bold text-slate-700">Soru Başı</th>
                <th class="text-left py-2 px-3 font-bold text-slate-700">Not</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr class="hover:bg-slate-50"><td class="py-3 px-3 font-medium">Kelime / Gramer</td><td class="text-center px-3">1–25</td><td class="text-center px-3 font-bold text-emerald-600">35 dk</td><td class="text-center px-3 text-slate-500">~84 sn</td><td class="px-3 text-slate-500 text-xs">Biliyorsan hızlı geç</td></tr>
              <tr class="hover:bg-slate-50"><td class="py-3 px-3 font-medium">Cümle Tamamlama</td><td class="text-center px-3">26–33</td><td class="text-center px-3 font-bold text-emerald-600">12 dk</td><td class="text-center px-3 text-slate-500">~90 sn</td><td class="px-3 text-slate-500 text-xs">Bağlam bağlantısı ara</td></tr>
              <tr class="hover:bg-slate-50 bg-blue-50"><td class="py-3 px-3 font-medium text-blue-800">Okuma Parçaları</td><td class="text-center px-3">34–51</td><td class="text-center px-3 font-bold text-blue-600">45 dk</td><td class="text-center px-3 text-slate-500">~150 sn</td><td class="px-3 text-slate-500 text-xs">En uzun bölüm!</td></tr>
              <tr class="hover:bg-slate-50"><td class="py-3 px-3 font-medium">Türkçe → İngilizce</td><td class="text-center px-3">52–59</td><td class="text-center px-3 font-bold text-amber-600">18 dk</td><td class="text-center px-3 text-slate-500">~135 sn</td><td class="px-3 text-slate-500 text-xs">Anlam önce, form sonra</td></tr>
              <tr class="hover:bg-slate-50"><td class="py-3 px-3 font-medium">İngilizce → Türkçe</td><td class="text-center px-3">60–67</td><td class="text-center px-3 font-bold text-amber-600">18 dk</td><td class="text-center px-3 text-slate-500">~135 sn</td><td class="px-3 text-slate-500 text-xs">Birebir çeviri tuzağı</td></tr>
              <tr class="hover:bg-slate-50"><td class="py-3 px-3 font-medium">Paragraf Tamamlama</td><td class="text-center px-3">68–73</td><td class="text-center px-3 font-bold text-purple-600">15 dk</td><td class="text-center px-3 text-slate-500">~150 sn</td><td class="px-3 text-slate-500 text-xs">Akış mantığı</td></tr>
              <tr class="hover:bg-slate-50"><td class="py-3 px-3 font-medium">Diyalog / Durum</td><td class="text-center px-3">74–80</td><td class="text-center px-3 font-bold text-red-600">12 dk</td><td class="text-center px-3 text-slate-500">~102 sn</td><td class="px-3 text-slate-500 text-xs">Naziklik tonu dikkat</td></tr>
              <tr class="bg-slate-900 text-white"><td class="py-3 px-3 font-extrabold">TOPLAM</td><td class="text-center px-3 font-bold">80 soru</td><td class="text-center px-3 font-extrabold text-yellow-400">155 dk</td><td class="text-center px-3"></td><td class="px-3 text-slate-400 text-xs">25 dk yedek kalır</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
          <div class="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
            <p class="font-bold text-emerald-800 mb-1">✅ Doğru Strateji</p>
            <p class="text-emerald-700 text-xs">Bilmediğin soruyu işaretle ve geç. Geri dön. Zaman kaybetme.</p>
          </div>
          <div class="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <p class="font-bold text-amber-800 mb-1">⚠️ Dikkat</p>
            <p class="text-amber-700 text-xs">Reading bölümünde çok vakit harcama. Soruyu önce oku, sonra metne bak.</p>
          </div>
          <div class="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <p class="font-bold text-red-800 mb-1">❌ Yapma</p>
            <p class="text-red-700 text-xs">Sırayla gitme zorunluluğu yok. Güçlü bölümünle başla, morali koru.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── QUESTION TYPE TACTICS ───────────────────────────── -->
  <section class="mb-14">
    <h3 class="tg-section-title">🎯 Soru Tipi Taktikleri</h3>

    <!-- Q1-25 Vocabulary -->
    <div class="tg-tactic-card" onclick="tgToggle('vocab')">
      <div class="tg-tactic-header">
        <div class="flex items-center gap-3">
          <div class="tg-tactic-badge red">1–25</div>
          <div>
            <p class="font-bold text-slate-800">Kelime Bilgisi & Dilbilgisi</p>
            <p class="text-xs text-slate-400">Vocabulary & Grammar Fill-in-the-blank</p>
          </div>
        </div>
        <i class="fas fa-chevron-down tg-chevron" id="chevron-vocab"></i>
      </div>
      <div class="tg-tactic-body hidden" id="tg-vocab">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <p class="tg-sub-title">🔑 Temel Taktikler</p>
            <ul class="tg-list">
              <li><strong>Anlama bak, gramer değil:</strong> Cümlenin genel anlamını kavra, boşluğa gereken kavramı bul.</li>
              <li><strong>Elimination metodu:</strong> Anlamsız ya da bağlama uymayan 2-3 şıkkı hemen ele</li>
              <li><strong>Connector soruları:</strong> "however/therefore/moreover" türü sorularda cümle öncesi ve sonrasının ilişkisine bak (zıtlık mı, ek mi?).</li>
              <li><strong>Preposition soruları:</strong> "sensitive TO", "concentrate ON", "result IN" — kalıpları ezberle.</li>
              <li><strong>phrasal verb soruları:</strong> Turn up / turn down / turn off arasındaki anlam farkını bil.</li>
            </ul>
          </div>
          <div>
            <p class="tg-sub-title">⚡ Hızlı Çözüm Yolu</p>
            <ul class="tg-list">
              <li>Tense sorusunda: zaman zarfına bak (<em>yesterday, since, when, by 2025</em>).</li>
              <li>Modal sorusunda: kesinlik derecesini değerlendir (must &gt; should &gt; might).</li>
              <li>Vocabulary sorusunda: akademik İngilizce Word List çalış (AWL).</li>
              <li>İki boşluklu sorularda önce kolay boşluğu çöz, şık sayısını düşür.</li>
            </ul>
            <p class="tg-sub-title mt-3">🚫 Tuzaklar</p>
            <ul class="tg-list">
              <li>Benzer sesli ama farklı anlamlı kelimeler (affect/effect, lay/lie).</li>
              <li>Türkçe mantığıyla çeviri yapma — İngilizce deyimleri kalıp olarak öğren.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Q26-33 Sentence Completion -->
    <div class="tg-tactic-card" onclick="tgToggle('completion')">
      <div class="tg-tactic-header">
        <div class="flex items-center gap-3">
          <div class="tg-tactic-badge orange">26–33</div>
          <div>
            <p class="font-bold text-slate-800">Cümle Tamamlama</p>
            <p class="text-xs text-slate-400">Sentence Completion</p>
          </div>
        </div>
        <i class="fas fa-chevron-down tg-chevron" id="chevron-completion"></i>
      </div>
      <div class="tg-tactic-body hidden" id="tg-completion">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <p class="tg-sub-title">🔑 Temel Taktikler</p>
            <ul class="tg-list">
              <li><strong>Verilmiş kısmın öznesini bul:</strong> Özne kim? Özne ne yapıyor? Boşluğu bu soruların cevabı tamamlamalı.</li>
              <li><strong>Bağlaç-zaman uyumu:</strong> "Although/Though" → zıtlık; "Because/Since" → neden-sonuç; "When/After" → ardışıklık.</li>
              <li><strong>Başa boşluk:</strong> Şıkta verilen cümle kısmı bağımsız anlam taşımalı, köprü de olabilir.</li>
              <li><strong>Sona boşluk:</strong> Önceki kısmın sonucunu, karşıtını ya da devamını tamamla.</li>
            </ul>
          </div>
          <div>
            <p class="tg-sub-title">⚡ Pratik Yöntem</p>
            <ul class="tg-list">
              <li>Önce verilen kısmı oku → Mantıksal devamını zihninde kur → Şıklara bak.</li>
              <li>Gramer uyumunu kontrol et: özne-yüklem, zaman uyuşuyor mu?</li>
              <li>Anlam tutarlılığı: seçtiğin şık, tüm cümleyle bir bütün oluşturuyor mu?</li>
            </ul>
            <p class="tg-sub-title mt-3">💡 İpucu</p>
            <p class="text-sm text-slate-600 mt-1">Soru 26-33 arasındaki 8 soru genellikle 12 dakikaya sığdırılabilir. Cümle tamamlamayı hızlı çözebiliyorsan Reading'e daha fazla zaman ayırsın.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Q34-51 Reading -->
    <div class="tg-tactic-card" onclick="tgToggle('reading')">
      <div class="tg-tactic-header">
        <div class="flex items-center gap-3">
          <div class="tg-tactic-badge blue">34–51</div>
          <div>
            <p class="font-bold text-slate-800">Okuma Anlama Parçaları</p>
            <p class="text-xs text-slate-400">Reading Comprehension</p>
          </div>
        </div>
        <i class="fas fa-chevron-down tg-chevron" id="chevron-reading"></i>
      </div>
      <div class="tg-tactic-body hidden" id="tg-reading">
        <div class="tg-highlight-box blue mb-4">
          <i class="fas fa-star text-blue-600 shrink-0 mt-0.5"></i>
          <p>Reading, YDS'nin en çok puan ve en çok zaman alan bölümüdür (18 soru). Doğru teknikle bu bölüm puanının <strong>temel taşına</strong> dönüşür.</p>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <p class="tg-sub-title">🔑 Soru Önce Strateji (Önerilen)</p>
            <ul class="tg-list">
              <li><strong>1. Adım:</strong> Parçayı okumadan önce tüm soruları hızlıca oku.</li>
              <li><strong>2. Adım:</strong> Anahtar kelimeleri (proper noun, tarih, rakam) zihninde not et.</li>
              <li><strong>3. Adım:</strong> Parçayı oku, sorular aklında olduğu için ilgili kısımları daha hızlı bulursun.</li>
              <li><strong>4. Adım:</strong> Cevabı metinden bul, şıkla eşleştir — asla sadece hafızaya güvenme.</li>
            </ul>
            <p class="tg-sub-title mt-4">📋 Soru Tiplerine Göre Strateji</p>
            <ul class="tg-list">
              <li><strong>Main idea sorusu:</strong> ("The passage mainly deals with…") — İlk ve son paragrafa bak.</li>
              <li><strong>Detail sorusu:</strong> ("According to the passage…") — Metinden doğrudan bul.</li>
              <li><strong>Inference sorusu:</strong> ("It can be concluded/implied…") — Doğrudan yazılmayan, mantıksal çıkarım iste.</li>
              <li><strong>Author's attitude:</strong> ("The author believes/favours…") — Yazarın kullandığı sıfat/nitelendirme sözcükleri.</li>
            </ul>
          </div>
          <div>
            <p class="tg-sub-title">🚫 Sık Yapılan Hatalar</p>
            <ul class="tg-list">
              <li>Metinden ziyade genel bilgiye göre cevap vermek.</li>
              <li>Extreme cevaplar: "always", "never", "all" → genellikle yanlış.</li>
              <li>Sadece benzer kelimeler içerdiği için bir şıkkı seçmek (tuzak şık!).</li>
              <li>Parçanın tamamını kelime kelime okumak — zaman kaybı!</li>
            </ul>
            <p class="tg-sub-title mt-4">⚡ Okuma Hızı İpuçları</p>
            <ul class="tg-list">
              <li>Her paragrafın ilk cümlesini oku (topic sentence).</li>
              <li>Geçiş kelimeleri (however, furthermore, in contrast) akış haritanı gösterir.</li>
              <li>Detaylı okumayı sadece sorularda ima edilen paragraflara sakla.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Q52-59 TR→EN Translation -->
    <div class="tg-tactic-card" onclick="tgToggle('tr_to_en')">
      <div class="tg-tactic-header">
        <div class="flex items-center gap-3">
          <div class="tg-tactic-badge purple">52–59</div>
          <div>
            <p class="font-bold text-slate-800">Türkçe → İngilizce Çeviri</p>
            <p class="text-xs text-slate-400">Translation (Turkish → English)</p>
          </div>
        </div>
        <i class="fas fa-chevron-down tg-chevron" id="chevron-tr_to_en"></i>
      </div>
      <div class="tg-tactic-body hidden" id="tg-tr_to_en">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <p class="tg-sub-title">🔑 Çözüm Sırası</p>
            <ul class="tg-list">
              <li><strong>1. Türkçe cümlenin yapısını analiz et:</strong> Özne, nesne, zarf ne? Temel fiil ne zaman?</li>
              <li><strong>2. Zaman ekini tespit et:</strong> "-miştir, -mektedir, -acaktır" → tense belirler.</li>
              <li><strong>3. Önemli kavramı bul:</strong> Cümlede vurgulanan bilgi ne?</li>
              <li><strong>4. Şıkları karşılaştır:</strong> Anlam açısından en yakın şıkkı seç, birebir çeviri arama.</li>
            </ul>
            <p class="tg-sub-title mt-4">💡 Türkçe Yapılar → İngilizce Karşılıkları</p>
            <ul class="tg-list">
              <li>"-arak/-erek" → by + V-ing veya and</li>
              <li>"-dığından/-diği için" → because / since / as</li>
              <li>"-masına karşın/-e rağmen" → despite / although / even though</li>
              <li>"-diği takdirde" → if / provided that</li>
              <li>"Sahip olmak" → have / possess</li>
            </ul>
          </div>
          <div>
            <p class="tg-sub-title">🚫 Tuzaklar</p>
            <ul class="tg-list">
              <li><strong>Extra bilgi tuzağı:</strong> Bazı şıklar Türkçe cümlede olmayan bilgi ekler — bu yanlış!</li>
              <li><strong>Eksik bilgi tuzağı:</strong> Bazı şıklar önemli bir ayrıntıyı atlar — dikkat!</li>
              <li>Türkçedeki "de bile / sadece" gibi kısıtlayıcı ifadelerin İngilizceye taşınıp taşınmadığını kontrol et.</li>
            </ul>
            <p class="tg-sub-title mt-4">🎯 Eleme Tekniği</p>
            <p class="text-sm text-slate-600 mt-1">Türkçe cümlede sabit olan tarihi, rakamı, özel ismi tüm şıklarda ara. Bunu yanlış veren şıkkı direkt ele.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Q60-67 EN→TR Translation -->
    <div class="tg-tactic-card" onclick="tgToggle('en_to_tr')">
      <div class="tg-tactic-header">
        <div class="flex items-center gap-3">
          <div class="tg-tactic-badge indigo">60–67</div>
          <div>
            <p class="font-bold text-slate-800">İngilizce → Türkçe Çeviri</p>
            <p class="text-xs text-slate-400">Translation (English → Turkish)</p>
          </div>
        </div>
        <i class="fas fa-chevron-down tg-chevron" id="chevron-en_to_tr"></i>
      </div>
      <div class="tg-tactic-body hidden" id="tg-en_to_tr">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <p class="tg-sub-title">🔑 Temel Taktikler</p>
            <ul class="tg-list">
              <li><strong>İngilizcenin yapısını çöz:</strong> Participial phrases, relative clauses, embedded sentences var mı?</li>
              <li><strong>Yan cümle sırası:</strong> Türkçede fiil cümlenin sonuna gider — yapıyı yeniden kur.</li>
              <li><strong>Zaman uyumu:</strong> Past perfect → "yapmıştı", Used to → "yapardı / yapar(dı)".</li>
              <li><strong>"in part/partly":</strong> "kısmen" — ihmal edilirse anlamı çarpıtır.</li>
            </ul>
            <p class="tg-sub-title mt-4">⚡ Nüans Tespiti</p>
            <ul class="tg-list">
              <li>"owe to" → "-a borçlu olmak" (çok kullanılır, Türkçeye çeviri zor)</li>
              <li>"justify" → "haklı kılmak / meşrulaştırmak"</li>
              <li>"attributed to" → "-a atfedilmek / yorumlanmak"</li>
            </ul>
          </div>
          <div>
            <p class="tg-sub-title">🚫 Sık Hatalar</p>
            <ul class="tg-list">
              <li>İngilizce sözcüğü birebir Türkçeye aktarmak (especially → özellikle ✓, fakat "in particular" → özellikle de).</li>
              <li>Özne kaybı: Uzun İngilizce cümlelerde asıl özneyi Türkçede bulmak zor. Participial phrase'lerin öznesi genellikle ana cümlenin öznesiyle aynıdır.</li>
              <li>Gereksiz anlam ekleme: Şıklardaki extra yorumları tespit et.</li>
            </ul>
            <p class="tg-sub-title mt-4">🎯 Hızlı Eleme</p>
            <p class="text-sm text-slate-600 mt-1">İngilizce cümledeki sayısal veriyi (yıl, yüzde, ölçü) Türkçe şıkta yanlış verenler direkt elenebilir.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Q68-73 Paragraph Completion -->
    <div class="tg-tactic-card" onclick="tgToggle('para_comp')">
      <div class="tg-tactic-header">
        <div class="flex items-center gap-3">
          <div class="tg-tactic-badge teal">68–73</div>
          <div>
            <p class="font-bold text-slate-800">Paragraf Tamamlama</p>
            <p class="text-xs text-slate-400">Paragraph Completion (cloze style)</p>
          </div>
        </div>
        <i class="fas fa-chevron-down tg-chevron" id="chevron-para_comp"></i>
      </div>
      <div class="tg-tactic-body hidden" id="tg-para_comp">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <p class="tg-sub-title">🔑 Adım Adım Çözüm</p>
            <ul class="tg-list">
              <li><strong>1. Boşluğun yerini tes­pit et:</strong> Başta mı, ortada mı, sonda mı? Her konum farklı mantık gerektirir.</li>
              <li><strong>Başta boşluk:</strong> Parçanın konusunu ve tonunu kurar. Giriş/genel bilgi içermeli.</li>
              <li><strong>Ortada boşluk:</strong> Önceki ve sonraki cümleyle köprü kurmalı. "However / Moreover / Therefore" gibi bağlaç ipucu arar.</li>
              <li><strong>Sonda boşluk:</strong> Sonuç/özet/ileri adım içermeli. "Thus / This means / In conclusion" şıklarda aranacak.</li>
              <li><strong>2. Boşluktan önce ve sonraki cümlelerdeki zamirlere bak:</strong> "they/this/these/such" → önceki cümleyle uyumlu olmalı.</li>
            </ul>
          </div>
          <div>
            <p class="tg-sub-title">⚡ Tonal Uyum</p>
            <ul class="tg-list">
              <li>Parça bilimsel üslupta mı? → Şık da nesnel, olgusal olmalı.</li>
              <li>Parça anlatısal mı? → Şık da aynı zaman kipini kullanmalı.</li>
              <li>Parçada pozitif yaklaşım varsa → negatif ton taşıyan şık yanlıştır.</li>
            </ul>
            <p class="tg-sub-title mt-4">🚫 Tuzaklar</p>
            <ul class="tg-list">
              <li>Konuyla ilgili ama parçayla tematik bağı olmayan şıklar (konu değiştiren distractors).</li>
              <li>Parçanın sonuna çok spesifik detay getiren şıklar (yeni bilgi ekliyorsa şüpheli).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Q74-80 Dialogue -->
    <div class="tg-tactic-card" onclick="tgToggle('dialogue')">
      <div class="tg-tactic-header">
        <div class="flex items-center gap-3">
          <div class="tg-tactic-badge pink">74–80</div>
          <div>
            <p class="font-bold text-slate-800">Diyalog & Durum (Ne Dersiniz?)</p>
            <p class="text-xs text-slate-400">Dialogue Completion / Situational Expression</p>
          </div>
        </div>
        <i class="fas fa-chevron-down tg-chevron" id="chevron-dialogue"></i>
      </div>
      <div class="tg-tactic-body hidden" id="tg-dialogue">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <p class="tg-sub-title">🔑 Durum Analizi</p>
            <ul class="tg-list">
              <li><strong>Rol analizi:</strong> Sen kimsin? (müşteri, çalışan, arkadaş, komşu?) Sosyal rolün tonu belirler.</li>
              <li><strong>Amaç analizi:</strong> Ne yapmak istiyorsun? (özür dilemek, sınır çizmek, ince bir yorum yapmak?)</li>
              <li><strong>Kısıtlamalar:</strong> "kırmadan söyle", "gerçeği söyleme", "nazik ol" gibi kısıtlar metinde verilir — bu kısıtları karşılayan tek şık doğrudur.</li>
            </ul>
            <p class="tg-sub-title mt-4">💡 Sık Durum Türleri</p>
            <ul class="tg-list">
              <li>Nazik ret / bahane uydurma</li>
              <li>Özür + açıklama</li>
              <li>Tavsiye / uyarı verme</li>
              <li>Sınır koyma (ama kırmadan)</li>
              <li>İnce bir mesaj verme</li>
            </ul>
          </div>
          <div>
            <p class="tg-sub-title">🎯 Ton Tablosu</p>
            <div class="space-y-2 text-sm mt-1">
              <div class="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2">
                <span class="text-green-600 font-bold shrink-0">✅</span>
                <span class="text-green-800">Doğru ton: Nazik, diplomatik, hedefe yönelik</span>
              </div>
              <div class="flex items-center gap-2 bg-red-50 rounded-lg px-3 py-2">
                <span class="text-red-600 font-bold shrink-0">❌</span>
                <span class="text-red-800">Yanlış: Sert, suçlayıcı, alaycı (durumu gereğinden fazla sertleştirir)</span>
              </div>
              <div class="flex items-center gap-2 bg-red-50 rounded-lg px-3 py-2">
                <span class="text-red-600 font-bold shrink-0">❌</span>
                <span class="text-red-800">Yanlış: Anlamsız derecede uyuşmacı (soruyu çözmez)</span>
              </div>
              <div class="flex items-center gap-2 bg-amber-50 rounded-lg px-3 py-2">
                <span class="text-amber-600 font-bold shrink-0">⚠️</span>
                <span class="text-amber-800">Dikkat: Konudan sapan şıklar (mantıklı ama durumla alakasız)</span>
              </div>
            </div>
            <p class="tg-sub-title mt-4">🚀 Hız İpucu</p>
            <p class="text-sm text-slate-600">Bu bölüm genellikle hızlı çözülebilir. Reading'de harcadığın zamanı burada kazanabilirsin.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Irrelevant Sentence -->
    <div class="tg-tactic-card" onclick="tgToggle('irrelevant')">
      <div class="tg-tactic-header">
        <div class="flex items-center gap-3">
          <div class="tg-tactic-badge slate">Cümle Atma</div>
          <div>
            <p class="font-bold text-slate-800">Anlam Bütünlüğünü Bozan Cümle</p>
            <p class="text-xs text-slate-400">Irrelevant Sentence (Mini Exam & YDT)</p>
          </div>
        </div>
        <i class="fas fa-chevron-down tg-chevron" id="chevron-irrelevant"></i>
      </div>
      <div class="tg-tactic-body hidden" id="tg-irrelevant">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <p class="tg-sub-title">🔑 Nasıl Çözülür?</p>
            <ul class="tg-list">
              <li><strong>1. Ana konuyu belirle:</strong> Paragraf ne hakkında? İlk cümle genellikle bunu açıklar.</li>
              <li><strong>2. Her cümleyi test et:</strong> "Bu cümle ana konuya hizmet ediyor mu?"</li>
              <li><strong>3. Kaldırılabilir mi?</strong> Çıkardığında paragraf anlamlı ve akıcı mı devam ediyor?</li>
              <li><strong>4. Bağlantısız detay:</strong> Ana konuyla aynı alanda ama farklı bir alt konuya ait cümle = yanlış cümle.</li>
            </ul>
          </div>
          <div>
            <p class="tg-sub-title">⚡ Pratik Test</p>
            <p class="text-sm text-slate-600 mb-3">Her şık için şunu sor: <em>"Bu cümle olmasaydı paragraf eksik mi olurdu?"</em> Hayır ise → o cümle adaydır.</p>
            <p class="tg-sub-title">🚫 Dikkat Et</p>
            <ul class="tg-list">
              <li>Yanlış cümle genellikle konu ile superficially ilgili görünür ama odak noktası farklıdır.</li>
              <li>Transition word'ler (however, therefore) taşıyan cümleler genellikle bağlıdır — dikkatli ol.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </section>

  <!-- ── GENERAL TACTICS ─────────────────────────────────── -->
  <section class="mb-14">
    <h3 class="tg-section-title">🧠 Genel Sınav Taktikleri</h3>
    <div class="grid md:grid-cols-2 gap-5">

      <div class="tg-card p-5">
        <h4 class="font-bold text-slate-800 mb-3 flex items-center gap-2">
          <span class="w-8 h-8 bg-red-100 text-red-700 rounded-lg flex items-center justify-center text-sm font-extrabold">1</span>
          İşaretleme Sistemi Kur
        </h4>
        <ul class="tg-list">
          <li>Emin olduğun → direkt işaretle, geç.</li>
          <li>İkiye indirdiğin → işaretle, geç, geri dön.</li>
          <li>Hiç bilmediğin → tahminle işaretle (<strong>YDS'de negatif puan yok!</strong>)</li>
          <li>Boş bırakma — cezasız sistemde B ya da C genelde statistically güvenli.</li>
        </ul>
      </div>

      <div class="tg-card p-5">
        <h4 class="font-bold text-slate-800 mb-3 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm font-extrabold">2</span>
          Elimination (Eleme) Tekniği
        </h4>
        <ul class="tg-list">
          <li>Açıkça yanlış 2 şıkkı ele → kalan 3'te şans %33 → %50'ye yükselir.</li>
          <li>"Always / never / completely" içeren aşırı uç şıklar genellikle yanlıştır.</li>
          <li>Extreme karşıt 2 şık varsa cevap ikisinden biri olabilir — odaklan.</li>
        </ul>
      </div>

      <div class="tg-card p-5">
        <h4 class="font-bold text-slate-800 mb-3 flex items-center gap-2">
          <span class="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-extrabold">3</span>
          Psikolojik Hazırlık
        </h4>
        <ul class="tg-list">
          <li>Zor bir soruyu görünce paniklemek diğer soruları da etkiler — pas geç.</li>
          <li>Sınav öncesi gece: yeni konu çalışma, iyi uyu.</li>
          <li>Sınav sabahı: hafif atıştırmalık, su. Kan şekerini dengede tut.</li>
          <li>İlk 10 soru seni ısıtır — genellikle bu sürede 80-100 dakika var, koşma.</li>
        </ul>
      </div>

      <div class="tg-card p-5">
        <h4 class="font-bold text-slate-800 mb-3 flex items-center gap-2">
          <span class="w-8 h-8 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center text-sm font-extrabold">4</span>
          Hata Analizi Rutini
        </h4>
        <ul class="tg-list">
          <li>Her deneme sonrası: yanlışları 4 kategoriye ayır (bilmemek / dikkatsizlik / yanlış anlama / zaman baskısı).</li>
          <li>En büyük kategori neyse → oraya odaklan.</li>
          <li>Aynı hataları tekrar yapmak seni geriye götürür. Hata defteri tut.</li>
          <li>Doğru yaptığın sorular da kaynağını bil — şans mıydı?</li>
        </ul>
      </div>

    </div>
  </section>

  <!-- ── RESOURCE BOX ─────────────────────────────────────── -->
  <section class="mb-10">
    <h3 class="tg-section-title">📚 Tavsiye Edilen Kaynaklar</h3>
    <div class="tg-card p-6">
      <div class="grid sm:grid-cols-3 gap-5">
        <div>
          <p class="tg-sub-title">🇬🇧 Okuma & Kelime</p>
          <ul class="tg-list">
            <li>BBC Learning English</li>
            <li>The Guardian / The Economist (günlük)</li>
            <li>Academic Word List (AWL)</li>
            <li>Quizlet – YDS kelime setleri</li>
          </ul>
        </div>
        <div>
          <p class="tg-sub-title">📝 Gramer</p>
          <ul class="tg-list">
            <li>Murphy – English Grammar in Use (B2)</li>
            <li>Advanced English Grammar in Use (C1)</li>
            <li>Bu uygulamanın Tenses / Modals / Conjunctions bölümleri</li>
          </ul>
        </div>
        <div>
          <p class="tg-sub-title">🧩 Pratik</p>
          <ul class="tg-list">
            <li>YDS Ösym geçmiş yıl soruları (2010→)</li>
            <li>Bu uygulamanın Mini Exams bölümü</li>
            <li>Bu uygulamanın Full Deneme bölümü</li>
            <li>Anki (spaced repetition kelime kartları)</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

</div>

<style>
/* ── Tactic Guide Styles ─────────────────────────────── */
.tg-section-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f1f5f9;
  font-family: 'Playfair Display', serif;
}

.tg-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.tg-card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 1rem 1rem 0 0;
  font-weight: 700;
  font-size: 0.875rem;
}
.tg-card-header.emerald { background: #ecfdf5; color: #065f46; border-bottom: 1px solid #d1fae5; }
.tg-card-header.blue    { background: #eff6ff; color: #1e40af; border-bottom: 1px solid #dbeafe; }

.tg-phase { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 1rem; }
.tg-phase-label { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
.tg-phase-label.emerald { color: #065f46; }
.tg-phase-label.blue    { color: #1e40af; }

.tg-list { list-style: none; padding: 0; margin: 0; space-y: 0.25rem; }
.tg-list li { font-size: 0.8125rem; color: #475569; line-height: 1.5; padding: 0.2rem 0 0.2rem 1rem; position: relative; }
.tg-list li::before { content: "•"; position: absolute; left: 0; color: #94a3b8; }
.tg-list li strong { color: #1e293b; }

.tg-tactic-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  margin-bottom: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  transition: box-shadow 0.2s;
}
.tg-tactic-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); cursor: pointer; }
.tg-tactic-header { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; }
.tg-tactic-body { padding: 0 1.25rem 1.25rem; border-top: 1px solid #f1f5f9; }

.tg-badge-base { width: fit-content; padding: 0.25rem 0.6rem; border-radius: 0.5rem; font-size: 0.7rem; font-weight: 800; }
.tg-tactic-badge {
  padding: 0.25rem 0.6rem; border-radius: 0.5rem; font-size: 0.7rem; font-weight: 800; white-space: nowrap;
}
.tg-tactic-badge.red    { background: #fee2e2; color: #991b1b; }
.tg-tactic-badge.orange { background: #fff7ed; color: #9a3412; }
.tg-tactic-badge.blue   { background: #eff6ff; color: #1e40af; }
.tg-tactic-badge.purple { background: #f5f3ff; color: #6b21a8; }
.tg-tactic-badge.indigo { background: #eef2ff; color: #3730a3; }
.tg-tactic-badge.teal   { background: #f0fdfa; color: #115e59; }
.tg-tactic-badge.pink   { background: #fdf2f8; color: #9d174d; }
.tg-tactic-badge.slate  { background: #f1f5f9; color: #334155; }

.tg-chevron { color: #94a3b8; transition: transform 0.3s; font-size: 0.75rem; }
.tg-chevron.open { transform: rotate(180deg); }

.tg-sub-title { font-size: 0.8125rem; font-weight: 800; color: #374151; margin-bottom: 0.5rem; }

.tg-highlight-box { display: flex; gap: 0.75rem; padding: 0.875rem 1rem; border-radius: 0.75rem; font-size: 0.875rem; }
.tg-highlight-box.blue { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }

.tg-beginner.hidden, .tg-advanced.hidden { display: none !important; }
</style>
`;

// ─── Toggle accordion ────────────────────────────────────────
function tgToggle(id) {
  const body = document.getElementById(`tg-${id}`);
  const chevron = document.getElementById(`chevron-${id}`);
  if (!body) return;
  const isHidden = body.classList.contains('hidden');
  body.classList.toggle('hidden', !isHidden);
  if (chevron) chevron.classList.toggle('open', isHidden);
}

// ─── Level filter ────────────────────────────────────────────
function tgSetLevel(level) {
  document.querySelectorAll('.tg-level-btn').forEach(b => {
    b.classList.remove('border-red-700', 'bg-red-700', 'text-white');
    b.classList.add('border-slate-200', 'text-slate-600');
  });
  const active = document.getElementById(`tgBtn-${level}`);
  if (active) {
    active.classList.add('border-red-700', 'bg-red-700', 'text-white');
    active.classList.remove('border-slate-200', 'text-slate-600');
  }

  const beginnerCards = document.querySelectorAll('.tg-beginner');
  const advancedCards = document.querySelectorAll('.tg-advanced');

  beginnerCards.forEach(c => c.classList.toggle('hidden', level === 'advanced'));
  advancedCards.forEach(c => c.classList.toggle('hidden', level === 'beginner'));
}

// ─── Init ────────────────────────────────────────────────────
function initTacticGuide() {
  const container = document.getElementById('tab-tacticguide');
  if (!container) return;
  container.innerHTML = tacticGuideHTML;
}

window.initTacticGuide = initTacticGuide;
window.tgToggle = tgToggle;
window.tgSetLevel = tgSetLevel;
