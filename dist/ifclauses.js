/* ============================================================
   ifclauses.js  –  İngilizce Koşul Cümleleri Rehberi
   ============================================================ */

const IF_TYPES = [
    {
        id: 'zero',
        name: 'Zero Conditional',
        tr: 'Sıfır Tip Koşul — Genel Gerçekler',
        color: '#0369a1',
        light: '#f0f9ff',
        border: '#bae6fd',
        formula: 'If + Present Simple �' Present Simple',
        alt_formula: 'If it rains, the ground gets wet.',
        signal_words: ['always', 'generally', 'every time', 'whenever', 'if ever'],
        usages: [
            {
                tag: 'Doğa Yasaları & Bilimsel Gerçekler', color: '#0369a1',
                desc: 'Her zaman, koşulsuz olarak doğru olan gerçekler.',
                examples: [
                    { en: 'If you heat water to 100°C, it boils.', tr: 'Suyu 100°C\'ye ısıtırsan kaynar.' },
                    { en: 'If plants don\'t get sunlight, they die.', tr: 'Bitkiler güneş ışığı almazlarsa ölürler.' },
                ]
            },
            {
                tag: 'Evrensel & Tekrarlayan Gerçekler', color: '#16a34a',
                desc: 'Her seferinde aynı sonucu veren eylem/durum.',
                examples: [
                    { en: 'If she doesn\'t sleep well, she gets a headache.', tr: 'Uyku uyumazsa baş ağrısı olur.' },
                    { en: 'If you press this button, the machine starts.', tr: 'Bu düğmeye basarsan makine başlar.' },
                ]
            },
        ],
        tip: '�'� "If" yerine "When/Whenever" kullanılabilir — anlam değişmez.',
        mistake: '❌ "Zero Conditional = Gelecek" sanmak yanlış. İkisi de Present Simple. Gerçekler için "will" GEREKMİYOR.',
        comparison: null,
    },
    {
        id: 'first',
        name: 'First Conditional',
        tr: 'Birinci Tip — Gerçekçi Gelecek',
        color: '#15803d',
        light: '#f0fdf4',
        border: '#bbf7d0',
        formula: 'If + Present Simple �' will + V1',
        alt_formula: 'If it rains, I will stay home.',
        signal_words: ['if', 'unless', 'provided (that)', 'as long as', 'if only', 'on condition that'],
        usages: [
            {
                tag: 'Gerçekleşmesi Mümkün Koşul', color: '#15803d',
                desc: 'Gerçekleşebilir bir koşul ve olası sonucu.',
                examples: [
                    { en: 'If you study hard, you will pass the exam.', tr: 'Sıkı çalışırsan sınavı geçeceksin.' },
                    { en: 'If it rains tomorrow, we won\'t go to the beach.', tr: 'Yarın yağmur yağarsa plaja gitmeyeceğiz.' },
                ]
            },
            {
                tag: 'Uyarı & Tehdit', color: '#dc2626',
                desc: 'Olası bir olumsuz sonucu vurgulamak için.',
                examples: [
                    { en: 'If you don\'t apologise, she will never speak to you again.', tr: 'Özür dilemezsen seninle bir daha konuşmaz.' },
                    { en: 'If you keep doing this, you\'ll get fired.', tr: 'Bunu yapmaya devam edersen kovulacaksın.' },
                ]
            },
            {
                tag: 'Teklif & Öneri', color: '#7c3aed',
                desc: 'Birinin bir şeyi yapması halinde sunulan teklif.',
                examples: [
                    { en: 'If you need help, I\'ll be here.', tr: 'Yardıma ihtiyacın olursa burada olacağım.' },
                    { en: 'If you\'re hungry, I\'ll make something.', tr: 'Açsan bir şeyler yapayım.' },
                ]
            },
        ],
        tip: '�'� "will" yerine: can / may / might / must / should da kullanılabilir.\n"If you come, you can meet her."',
        mistake: '❌ "If it will rain, I\'ll stay home." �' Koşul cümleciklerinde will KULLANILMAZ! If + Present Simple zorunlu.',
        comparison: null,
    },
    {
        id: 'second',
        name: 'Second Conditional',
        tr: 'İkinci Tip — Gerçekdışı / Hayal',
        color: '#7c3aed',
        light: '#f5f3ff',
        border: '#ddd6fe',
        formula: 'If + Past Simple �' would + V1',
        alt_formula: 'If I had more money, I would travel more.',
        signal_words: ['if only', 'I wish', 'imagine if', 'suppose', 'what if'],
        usages: [
            {
                tag: 'Şu An Gerçekdışı / İmkânsız', color: '#7c3aed',
                desc: 'Şu an gerçek olmayan ya da gerçekleşmesi zor koşullar.',
                examples: [
                    { en: 'If I were you, I would apologise.', tr: 'Senin yerinde olsam özür dilerdim.' },
                    { en: 'If she lived closer, we would meet more often.', tr: 'Daha yakında yaşasaydı daha sık buluşurduk.' },
                ]
            },
            {
                tag: 'Tavsiye (If I were you)', color: '#dc2626',
                desc: 'Birisine tavsiye vermenin en yaygın kalıbı.',
                examples: [
                    { en: 'If I were you, I wouldn\'t trust him.', tr: 'Senin yerinde olsam ona güvenmezdim.' },
                    { en: 'If I were in your position, I\'d quit.', tr: 'Senin durumunda olsam bırakırdım.' },
                ]
            },
            {
                tag: 'Hayal & Dilek', color: '#0891b2',
                desc: 'Gerçekleşmesini istediğimiz ama olmayan durumlar.',
                examples: [
                    { en: 'If I were a bird, I would fly over the sea.', tr: 'Kuş olsaydım denizin üzerinde uçardım.' },
                    { en: 'If I had more time, I would learn piano.', tr: 'Daha fazla zamanım olsaydı piyano öğrenirdim.' },
                ]
            },
        ],
        tip: '�'� "If I was" veya "If I were" — Her ikisi de doğru, ancak resmi/yazılı dilde "were" tercih edilir.\n"If I were" �' tüm şahıslar için (I/he/she/it)',
        mistake: '❌ "If I would have money..." �' If + Past Simple zorunlu, would kullanılmaz!\n❌ "If I was rich, I will travel." �' Sonuç cümlesinde would şart.',
        comparison: {
            label: '1. vs 2. Tip Fark',
            rows: [
                { left: 'If it rains, I will stay. (olabilir!)', right: 'If it rained, I would stay. (pek ihtimal yok)' },
                { left: '1. Tip: gerçekçi olasılık', right: '2. Tip: hayal / gerçekdışı' },
            ]
        },
    },
    {
        id: 'third',
        name: 'Third Conditional',
        tr: 'Üçüncü Tip — Geçmiş Pişmanlık',
        color: '#b45309',
        light: '#fffbeb',
        border: '#fde68a',
        formula: 'If + Past Perfect �' would have + V3',
        alt_formula: 'If I had studied, I would have passed.',
        signal_words: ['if only', 'I wish', 'had ... not', 'looking back'],
        usages: [
            {
                tag: 'Geçmişte Olmayanın Sonucu', color: '#b45309',
                desc: 'Geçmişte olmayan/yapılmayan şeyin hayali sonucu.',
                examples: [
                    { en: 'If he had arrived on time, he wouldn\'t have missed the flight.', tr: 'Zamanında gelseydi uçuşu kaçırmazdı.' },
                    { en: 'If she had taken the medicine, she would have recovered faster.', tr: 'İlacı içseydi daha hızlı iyileşirdi.' },
                ]
            },
            {
                tag: 'Pişmanlık & "Keşke"', color: '#dc2626',
                desc: 'Geçmiş kararlar/eylemler hakkında pişmanlık.',
                examples: [
                    { en: 'If I had listened to my parents, I wouldn\'t have made this mistake.', tr: 'Ailemi dinleseyidm bu hatayı yapmazdım.' },
                    { en: 'If we had left earlier, we would have caught the train.', tr: 'Daha erken çıksaydık trene yetişirdik.' },
                ]
            },
            {
                tag: 'Suçlama & Eleştiri', color: '#6d28d9',
                desc: 'Birinin geçmişteki eylemini eleştirmek için.',
                examples: [
                    { en: 'If you had told me, I could have helped.', tr: 'Söyleseydin yardım edebilirdim.' },
                    { en: 'If you had been more careful, this wouldn\'t have happened.', tr: 'Daha dikkatli olsaydın bu olmazdı.' },
                ]
            },
        ],
        tip: '�'� Kısaltma: "would\'ve" / "could\'ve" / "should\'ve" + V3\n"If I\'d known, I would\'ve told you."',
        mistake: '❌ "If I would have studied..." �' If + Past Perfect zorunlu!\n❌ "would have went" değil �' "would have GONE" (V3 kullan!)',
        comparison: null,
    },
    {
        id: 'mixed',
        name: 'Mixed Conditional',
        tr: 'Karma Koşul — Zaman Karışımı',
        color: '#0f766e',
        light: '#f0fdfa',
        border: '#99f6e4',
        formula: '',
        alt_formula: '',
        signal_words: [],
        usages: [
            {
                tag: 'Geçmiş Neden �' Şimdiki Sonuç', color: '#0f766e',
                desc: 'If + Past Perfect �' would + V1\nGeçmişte olan bir şey şu anki durumu etkiliyor.',
                examples: [
                    { en: 'If he had studied medicine, he would be a doctor now.', tr: 'Tıp okusaydı şu an doktor olurdu.' },
                    { en: 'If she hadn\'t moved abroad, she would still be here.', tr: 'Yurt dışına taşınmasaydı hâlâ burada olurdu.' },
                ]
            },
            {
                tag: 'Şimdiki Neden �' Geçmiş Sonuç', color: '#7c3aed',
                desc: 'If + Past Simple �' would have + V3\nŞu andaki gerçekdışı bir özellik geçmişi etkiler.',
                examples: [
                    { en: 'If I were braver, I would have spoken up at the meeting.', tr: 'Daha cesur olsaydım toplantıda konuşurdum.' },
                    { en: 'If she were more careful, she wouldn\'t have lost her passport.', tr: 'Daha dikkatli olsaydı pasaportunu kaybetmezdi.' },
                ]
            },
        ],
        tip: '�'� İki zamanı karıştırdığında Mixed Conditional! Anlam bağlamına göre If cümleciklerinin zamanını seç.',
        mistake: '❌ Mixed Conditional nadiren bilinçsizce kullanılır. Anlamına odaklan: hangi olay geçmişte, hangi sonuç şimdi?',
        comparison: {
            label: 'Mixed Conditional Özeti',
            rows: [
                { left: 'Geçmiş �' Şimdi:', right: 'If + Past Perf. �' would + V1' },
                { left: 'Şimdi �' Geçmiş:', right: 'If + Past Simple �' would have + V3' },
            ]
        },
    },
    {
        id: 'unless',
        name: 'Unless / Provided / As Long As',
        tr: 'If Alternatifleri',
        color: '#be185d',
        light: '#fdf2f8',
        border: '#fbcfe8',
        formula: '',
        alt_formula: '',
        signal_words: ['unless', 'provided that', 'providing that', 'as long as', 'on condition that', 'supposing', 'even if', 'only if', 'in case'],
        usages: [
            {
                tag: 'Unless = If … not', color: '#be185d',
                desc: '"unless" = "if + not" anlamındadır. Olumlu cümle ile kullanılır.',
                examples: [
                    { en: 'Unless you hurry, you\'ll miss the bus.', tr: 'Acele etmezsen otobüsü kaçırırsın. (= If you don\'t hurry…)' },
                    { en: 'She won\'t come unless she\'s invited.', tr: 'Davet edilmezse gelmeyecek.' },
                ]
            },
            {
                tag: 'Provided / As Long As = Yalnızca Eğer', color: '#0369a1',
                desc: '"provided that" / "as long as" �' şart daha kısıtlayıcı ve resmi.',
                examples: [
                    { en: 'You can borrow my car provided that you drive carefully.', tr: 'Dikkatli sürdüğün sürece arabamı ödünç alabilirsin.' },
                    { en: 'As long as you behave, you can stay.', tr: 'İyi davrandığın sürece kalabilirsin.' },
                ]
            },
            {
                tag: 'In Case = Önlem Olarak', color: '#7c3aed',
                desc: '"in case" �' gelecekteki olasılığa karşı şimdiden önlem alma.',
                examples: [
                    { en: 'Take an umbrella in case it rains.', tr: 'Yağmur yağarsa diye şemsiye al. (= Şimdi al, yağarsa diye)' },
                    { en: 'I\'ll save your number in case I need it later.', tr: 'Numaranı kaydedeyim, ileride gerekirse diye.' },
                ]
            },
            {
                tag: 'Even If = Olursa Bile', color: '#dc2626',
                desc: ''Even if' �' koşul gerçekleşse bile sonuç değişmeyecek.',
                examples: [
                    { en: 'Even if you apologise, she won\'t forgive you.', tr: 'Özür dilesen bile affetmeyecek.' },
                    { en: 'I wouldn\'t eat that even if I were starving.', tr: 'Açlıktan ölsem bile onu yemezdim.' },
                ]
            },
            {
                tag: 'Only If = Yalnızca Şu Durumda', color: '#0891b2',
                desc: '"only if" �' çok kısıtlayıcı, tek koşul.',
                examples: [
                    { en: 'I\'ll come only if you promise to behave.', tr: 'Yalnızca iyi davranacağına söz verirsen gelirim.' },
                    { en: 'Only if you apologise will she forgive you. (formal inversion)', tr: 'Yalnızca özür dilersen affeder. (resmi ters çevrim)' },
                ]
            },
        ],
        tip: '�'� "In case" ≠ "If"! \n"Take an umbrella if it rains." (yağarsa al) \n"Take an umbrella in case it rains." (yağarsa diye şimdi al)',
        mistake: '❌ "Unless you don\'t come..." �' unless zaten olumsuzluk içerir, çifte olumsuz YANLIŞ!\n�' "Unless you come..." ✓',
        comparison: {
            label: 'In Case vs If',
            rows: [
                { left: '"If it rains, take an umbrella." (yağarsa al)', right: '"Take an umbrella in case it rains." (şimdi al, belki yağar)' },
            ]
        },
    },
    {
        id: 'wish',
        name: 'Wish / If Only',
        tr: '"Keşke" İfadeleri',
        color: '#9333ea',
        light: '#faf5ff',
        border: '#e9d5ff',
        formula: '',
        alt_formula: '',
        signal_words: ['I wish', 'if only', 'I\'d rather', 'it\'s time', 'would rather'],
        usages: [
            {
                tag: 'Şu An İçin Dilek (Past Simple)', color: '#9333ea',
                desc: 'Şu an farklı olmasını istediğimiz durumlar.',
                examples: [
                    { en: 'I wish I were taller.', tr: 'Keşke daha uzun olsaydım.' },
                    { en: 'I wish I had more free time.', tr: 'Keşke daha fazla boş zamanım olsaydı.' },
                    { en: 'If only she lived closer!', tr: 'Keşke daha yakında yaşasaydı!' },
                ]
            },
            {
                tag: 'Geçmiş İçin Pişmanlık (Past Perfect)', color: '#dc2626',
                desc: 'Geçmişte yapılmasını/yapılmamasını istediğimiz şeyler.',
                examples: [
                    { en: 'I wish I had studied harder.', tr: 'Keşke daha çok çalışmış olsaydım.' },
                    { en: 'If only I hadn\'t said that!', tr: 'Keşke bunu söylememiş olsaydım!' },
                    { en: 'I wish you had been there.', tr: 'Keşke orada olmuş olsaydın.' },
                ]
            },
            {
                tag: 'Birinin Davranışına Şikâyet (would)', color: '#b45309',
                desc: 'Birinin alışkanlığı/davranışı hakkında şikâyet veya talep — arzu değil!',
                examples: [
                    { en: 'I wish you would stop interrupting me!', tr: 'Keşke beni kesmeyi bıraksan!' },
                    { en: 'I wish it would stop raining.', tr: 'Keşke yağmur dursa.' },
                    { en: 'If only she would listen!', tr: 'Keşke dinleseydi!' },
                ]
            },
            {
                tag: 'It\'s Time / I\'d Rather', color: '#0369a1',
                desc: '"Artık zamanı" ve "tercih" için benzer yapılar.',
                examples: [
                    { en: 'It\'s time you went to bed.', tr: 'Artık yatmanın zamanı geldi.' },
                    { en: 'It\'s high time she made a decision.', tr: 'Karar vermesinin tam zamanı.' },
                    { en: 'I\'d rather you didn\'t tell anyone.', tr: 'Kimseye söylemeni tercih etmezdim.' },
                ]
            },
        ],
        tip: '�'� Zaman dilimi tablosu:\nWish + Past Simple �' şu an\nWish + Past Perfect �' geçmiş\nWish + would �' başkasına yönelik şikâyet/istek',
        mistake: '❌ "I wish I would be taller." �' Kendi hakkında wish + would YANLIŞ!\n�' "I wish I were taller." ✓\n❌ "I wish I had more money yesterday." �' Geçmiş zaman ifadesiyle Past Simple değil Past Perfect!\n�' "I wish I had had more money then." ✓',
        comparison: {
            label: 'Wish Zaman Tablosu',
            rows: [
                { left: 'Şu an �' Wish + Past Simple', right: '"I wish I knew the answer."' },
                { left: 'Geçmiş �' Wish + Past Perfect', right: '"I wish I had known the answer."' },
                { left: 'Şikâyet �' Wish + would', right: '"I wish you would listen."' },
            ]
        },
    },
    {
        id: 'inversion',
        name: 'Formal Inversion',
        tr: 'Resmi Ters Çevrim (YDS\'de Sıklıkla!)',
        color: '#1d4ed8',
        light: '#eff6ff',
        border: '#bfdbfe',
        formula: '',
        alt_formula: '',
        signal_words: ['Were...to', 'Had...', 'Should...', 'formal writing'],
        usages: [
            {
                tag: 'Were + to (2. Tip Resmi)', color: '#1d4ed8',
                desc: '"If + were + to" �' resmi ve yazılı dilde 2. tip conditional.',
                examples: [
                    { en: 'Were I to win the lottery, I would donate half.', tr: 'Piyangoyu kassaydım yarısını bağışlardım.\n(= If I were to win…)' },
                    { en: 'Were she to resign, the company would struggle.', tr: 'İstifa etseydi şirket zorlanırdı.' },
                ]
            },
            {
                tag: 'Had + Subject (3. Tip Resmi)', color: '#7c3aed',
                desc: '"Had" öne alınarak "If + Past Perfect" yerine kullanılır.',
                examples: [
                    { en: 'Had I known, I would have helped.', tr: 'Bilmiş olsaydım yardım ederdim.\n(= If I had known…)' },
                    { en: 'Had they arrived earlier, they wouldn\'t have missed the show.', tr: 'Daha erken gelselerdi gösteriyi kaçırmazlardı.' },
                ]
            },
            {
                tag: 'Should + Subject (1. Tip Resmi)', color: '#16a34a',
                desc: '"Should" öne alınarak 1. tip conditional\'ı resmi kılar.',
                examples: [
                    { en: 'Should you need any help, don\'t hesitate to call.', tr: 'Herhangi bir yardıma ihtiyacın olursa çekinme ara.\n(= If you should need…)' },
                    { en: 'Should there be any problems, contact HR.', tr: 'Herhangi bir sorun olursa İK ile iletişime geçin.' },
                ]
            },
        ],
        tip: '�'� YDS okuma parçaları ve çeviri sorularında inversion sıklıkla çıkar. "Had I known" gördüğünde �' 3. Tip Conditional!',
        mistake: '❌ "Would I have known, I would have helped." �' Inversion\'da WOULD kullanılmaz! Had/Were/Should ile yapılır.',
        comparison: {
            label: 'Normal vs Inversion Karşılaştırma',
            rows: [
                { left: 'If I had known �' Had I known', right: '3. Tip — Geçmiş pişmanlık' },
                { left: 'If I were to try �' Were I to try', right: '2. Tip — Resmi/yazılı' },
                { left: 'If you should need �' Should you need', right: '1. Tip — Resmi teklif/koşul' },
            ]
        },
    },
];

// ── HTML Builder ─────────────────────────────────────────────
function buildIfClausesHTML() {
    return `
<div class="max-w-4xl mx-auto px-4 py-10" id="ifc-root">

  <!-- Hero -->
  <div class="text-center mb-10">
    <div class="inline-flex items-center gap-3 bg-gradient-to-r from-violet-800 to-violet-900 text-white px-6 py-3 rounded-2xl shadow-xl mb-5">
      <i class="fas fa-code-branch text-xl"></i>
      <span class="font-bold text-lg tracking-wide" style="font-family:'Playfair Display',serif;">If Clauses Rehberi</span>
    </div>
    <h2 class="text-3xl font-extrabold text-slate-800 mb-2" style="font-family:'Playfair Display',serif;">Koşul Cümleleri — Tam Rehber</h2>
    <p class="text-slate-500 text-sm max-w-xl mx-auto">Sıfır tipten karma koşullara, wish yapılarından resmi inversion'a — tüm bağlamları, örnekleri ve hatalarıyla.</p>
  </div>

  <!-- Type overview cards -->
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
    ${[
            { label: 'Sıfır Tip', sub: 'Genel Gerçek', color: '#0369a1', id: 'zero' },
            { label: '1. Tip', sub: 'Gerçekçi Gelecek', color: '#15803d', id: 'first' },
            { label: '2. Tip', sub: 'Hayal / Gerçekdışı', color: '#7c3aed', id: 'second' },
            { label: '3. Tip', sub: 'Geçmiş Pişmanlık', color: '#b45309', id: 'third' },
            { label: 'Mixed', sub: 'Karma Zaman', color: '#0f766e', id: 'mixed' },
            { label: 'Unless/As long as', sub: 'Alternatif Bağlaçlar', color: '#be185d', id: 'unless' },
            { label: 'Wish / If Only', sub: 'Keşke / Dilek', color: '#9333ea', id: 'wish' },
            { label: 'Inversion', sub: 'Resmi Ters Çevrim', color: '#1d4ed8', id: 'inversion' },
        ].map(c => `
      <button onclick="ifcScrollTo('${c.id}')"
        class="rounded-xl border-2 p-3 text-left hover:shadow-md transition-all"
        style="border-color:${c.color}33; background:${c.color}0d;">
        <p class="font-extrabold text-sm" style="color:${c.color};">${c.label}</p>
        <p class="text-xs text-slate-400 mt-0.5">${c.sub}</p>
      </button>`).join('')}
  </div>

  <!-- ── Summary Formula Banner ── -->
  <div class="rounded-2xl border border-slate-200 bg-slate-900 text-white p-5 mb-10 overflow-x-auto">
    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">📋 Hızlı Formül Özeti</p>
    <table class="w-full text-sm min-w-[480px]">
      <thead><tr class="border-b border-slate-700">
        <th class="text-left py-2 text-slate-400 font-semibold">Tip</th>
        <th class="text-left py-2 text-slate-400 font-semibold">If Cümlesi</th>
        <th class="text-left py-2 text-slate-400 font-semibold">Sonuç Cümlesi</th>
        <th class="text-left py-2 text-slate-400 font-semibold">Kullanım</th>
      </tr></thead>
      <tbody class="divide-y divide-slate-800">
        ${[
            ['Sıfır', 'Present Simple', 'Present Simple', 'Genel gerçekler'],
            ['1. Tip', 'Present Simple', 'will + V1', 'Gerçekçi gelecek'],
            ['2. Tip', 'Past Simple', 'would + V1', 'Hayal / gerçekdışı'],
            ['3. Tip', 'Past Perfect', 'would have + V3', 'Geçmiş pişmanlık'],
            ['Mixed (geçmiş�'şimdi)', 'Past Perfect', 'would + V1', 'Geçmiş neden �' şimdiki sonuç'],
            ['Mixed (şimdi�'geçmiş)', 'Past Simple', 'would have + V3', 'Şimdiki neden �' geçmiş sonuç'],
        ].map(r => `<tr>
          <td class="py-2 text-yellow-400 font-bold">${r[0]}</td>
          <td class="py-2"><code class="text-green-400 bg-slate-800 px-2 py-0.5 rounded text-xs">${r[1]}</code></td>
          <td class="py-2"><code class="text-blue-300 bg-slate-800 px-2 py-0.5 rounded text-xs">${r[2]}</code></td>
          <td class="py-2 text-slate-300 text-xs">${r[3]}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <!-- ── Type Cards ── -->
  <div class="space-y-5" id="ifc-cards">
    ${IF_TYPES.map(t => buildIfCard(t)).join('')}
  </div>

</div>

<style>
.ifc-example { background:#f8fafc; border-left:3px solid #e2e8f0; border-radius:0 0.5rem 0.5rem 0; padding:0.5rem 0.75rem; margin-top:0.35rem; }
.ifc-en { font-style:italic; color:#1e293b; font-size:0.875rem; font-weight:600; white-space:pre-line; }
.ifc-tr { font-size:0.75rem; color:#64748b; margin-top:2px; white-space:pre-line; }
.ifc-formula-chip { display:inline-block; font-family:'Courier New',monospace; font-size:0.75rem; background:#1e293b; color:#e2e8f0; padding:3px 10px; border-radius:6px; }
.ifc-tag { display:inline-flex; align-items:center; font-size:0.7rem; font-weight:800; padding:2px 8px; border-radius:999px; }
.ifc-signal { font-size:0.7rem; font-weight:600; background:#f1f5f9; color:#475569; border-radius:999px; padding:2px 8px; margin:2px; display:inline-flex; }
.ifc-mistake { background:#fff1f2; border:1px solid #fecdd3; border-radius:0.75rem; padding:0.65rem 0.9rem; font-size:0.8rem; color:#881337; white-space:pre-line; }
.ifc-tip { background:#fefce8; border:1px solid #fde68a; border-radius:0.75rem; padding:0.65rem 0.9rem; font-size:0.8rem; color:#713f12; white-space:pre-line; }
.ifc-compare-table { width:100%; border-collapse:collapse; font-size:0.78rem; }
.ifc-compare-table td { padding:5px 10px; border-bottom:1px solid #e2e8f0; }
.ifc-compare-table td:first-child { color:#475569; width:50%; }
.ifc-compare-table td:last-child { color:#1e293b; font-weight:600; }
</style>`;
}

function buildIfCard(t) {
    const usagesHTML = t.usages.map(u => `
    <div class="mb-4">
      <div class="flex flex-wrap items-center gap-2 mb-2">
        <span class="ifc-tag" style="background:${u.color}18; color:${u.color};">${u.tag}</span>
        <span class="text-xs text-slate-400" style="white-space:pre-line;">${u.desc}</span>
      </div>
      ${u.examples.map(ex => `
        <div class="ifc-example" style="border-left-color:${u.color}55;">
          <p class="ifc-en">"${ex.en}"</p>
          <p class="ifc-tr">�' ${ex.tr}</p>
        </div>`).join('')}
    </div>`).join('');

    const formulaHTML = t.formula
        ? `<div class="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap">
        <span class="ifc-formula-chip">IF: ${t.formula.split('�'')[0]}</span>
        <span class="text-slate-400 text-xs font-bold">�'</span>
        <span class="ifc-formula-chip" style="background:#1a2e1a; color:#86efac;">${t.formula.split('�'')[1] || ''}</span>
       </div>
       <p class="text-xs text-slate-400 italic mt-1">${t.alt_formula}</p>`
        : '';

    const signalsHTML = t.signal_words.length
        ? `<div class="mb-5">
        <p class="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2">�' Anahtar Bağlaçlar / İfadeler</p>
        <div class="flex flex-wrap">${t.signal_words.map(w => `<span class="ifc-signal">${w}</span>`).join('')}</div>
       </div>`
        : '';

    const compHTML = t.comparison
        ? `<div class="mb-4">
        <p class="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2">⚖️ ${t.comparison.label}</p>
        <table class="ifc-compare-table">
          ${t.comparison.rows.map(r => `<tr><td>${r.left}</td><td>${r.right}</td></tr>`).join('')}
        </table>
       </div>`
        : '';

    return `
  <div id="${t.id}" class="rounded-2xl border-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
       style="border-color:${t.border};">
    <div class="flex items-center justify-between px-5 py-4 cursor-pointer flex-wrap gap-3"
         style="background:${t.light};" onclick="ifcToggle('ifcbody-${t.id}', 'ifcchv-${t.id}')">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-extrabold shadow-sm"
             style="background:${t.color};">IF</div>
        <div>
          <p class="font-extrabold text-slate-800">${t.name}</p>
          <p class="text-xs font-semibold" style="color:${t.color};">${t.tr}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        ${formulaHTML}
        <i id="ifcchv-${t.id}" class="fas fa-chevron-down text-slate-400 text-xs transition-transform duration-300 shrink-0"></i>
      </div>
    </div>

    <div id="ifcbody-${t.id}" class="hidden px-5 pb-5 pt-4 bg-white">
      ${signalsHTML}
      <div class="mb-5">
        <p class="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-3">🎯 Kullanım Alanları</p>
        ${usagesHTML}
      </div>
      ${compHTML}
      <div class="grid sm:grid-cols-2 gap-3 mt-4">
        <div class="ifc-mistake"><p class="font-bold mb-1">❌ Yaygın Hatalar</p>${t.mistake}</div>
        <div class="ifc-tip"><p class="font-bold mb-1">�'� Akılda Kal</p>${t.tip}</div>
      </div>
    </div>
  </div>`;
}

// ── Controls ─────────────────────────────────────────────────
function ifcToggle(bodyId, chevId) {
    const body = document.getElementById(bodyId);
    const chev = document.getElementById(chevId);
    if (!body) return;
    const hidden = body.classList.contains('hidden');
    body.classList.toggle('hidden', !hidden);
    if (chev) chev.style.transform = hidden ? 'rotate(180deg)' : 'rotate(0)';
}

function ifcScrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const body = document.getElementById(`ifcbody-${id}`);
    const chev = document.getElementById(`ifcchv-${id}`);
    if (body && body.classList.contains('hidden')) {
        body.classList.remove('hidden');
        if (chev) chev.style.transform = 'rotate(180deg)';
    }
}

function initIfClauses() {
    const container = document.getElementById('tab-ifclauses');
    if (!container) return;
    container.innerHTML = buildIfClausesHTML();
}

window.initIfClauses = initIfClauses;
window.ifcToggle = ifcToggle;
window.ifcScrollTo = ifcScrollTo;
