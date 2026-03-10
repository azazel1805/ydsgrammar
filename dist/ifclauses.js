/* ============================================================
   ifclauses.js  - Ingilizce Kosul Cumleleri Rehberi
   ============================================================ */

const IF_TYPES = [
    {
        id: 'zero',
        name: 'Zero Conditional',
        tr: 'Sifir Tip Kosul - Genel Gercekler',
        color: '#0369a1',
        light: '#f0f9ff',
        border: '#bae6fd',
        formula: 'If + Present Simple -> Present Simple',
        alt_formula: 'If it rains, the ground gets wet.',
        signal_words: ['always', 'generally', 'every time', 'whenever', 'if ever'],
        usages: [
            {
                tag: 'Doga Yasalari & Bilimsel Gercekler', color: '#0369a1',
                desc: 'Her zaman, kosulsuz olarak dogru olan gercekler.',
                examples: [
                    { en: 'If you heat water to 100\u00b0C, it boils.', tr: 'Suyu 100\u00b0C\'ye isitirsan kaynar.' },
                    { en: 'If plants don\'t get sunlight, they die.', tr: 'Bitkiler gunes isigi almazlarsa olurler.' },
                ]
            },
            {
                tag: 'Evrensel & Tekrarlayan Gercekler', color: '#16a34a',
                desc: 'Her seferinde ayni sonucu veren eylem/durum.',
                examples: [
                    { en: 'If she doesn\'t sleep well, she gets a headache.', tr: 'Uyku uyumazsa bas agrisi olur.' },
                    { en: 'If you press this button, the machine starts.', tr: 'Bu dugmeye basarsan makine baslar.' },
                ]
            },
        ],
        tip: '\u{1F4A1} "If" yerine "When/Whenever" kullanilabilir -- anlam degismez.',
        mistake: '\u274c "Zero Conditional = Gelecek" sanmak yanlis. Ikisi de Present Simple. Gercekler icin "will" GEREKMIYOR.',
        comparison: null,
    },
    {
        id: 'first',
        name: 'First Conditional',
        tr: 'Birinci Tip - Gercekci Gelecek',
        color: '#15803d',
        light: '#f0fdf4',
        border: '#bbf7d0',
        formula: 'If + Present Simple -> will + V1',
        alt_formula: 'If it rains, I will stay home.',
        signal_words: ['if', 'unless', 'provided (that)', 'as long as', 'if only', 'on condition that'],
        usages: [
            {
                tag: 'Gerceklesmesi Mumkun Kosul', color: '#15803d',
                desc: 'Gerceklesesebilir bir kosul ve olasi sonucu.',
                examples: [
                    { en: 'If you study hard, you will pass the exam.', tr: 'Siki calisirsan sinavi gececeksin.' },
                    { en: 'If it rains tomorrow, we won\'t go to the beach.', tr: 'Yarin yagmur yagarsa plaja gitmeyecegiz.' },
                ]
            },
            {
                tag: 'Uyari & Tehdit', color: '#dc2626',
                desc: 'Olasi bir olumsuz sonucu vurgulamak icin.',
                examples: [
                    { en: 'If you don\'t apologise, she will never speak to you again.', tr: 'Ozur dilemezsen seninle bir daha konusmaz.' },
                    { en: 'If you keep doing this, you\'ll get fired.', tr: 'Bunu yapmaya devam edersen kovulacaksin.' },
                ]
            },
            {
                tag: 'Teklif & Oneri', color: '#7c3aed',
                desc: 'Birinin bir seyi yapmasi halinde sunulan teklif.',
                examples: [
                    { en: 'If you need help, I\'ll be here.', tr: 'Yardima ihtiyacin olursa burada olacagim.' },
                    { en: 'If you\'re hungry, I\'ll make something.', tr: 'Acsan bir seyler yapayim.' },
                ]
            },
        ],
        tip: '\u{1F4A1} "will" yerine: can / may / might / must / should da kullanilabilir.\n"If you come, you can meet her."',
        mistake: '\u274c "If it will rain, I\'ll stay home." -> Kosul cumleciklerinde will KULLANILMAZ! If + Present Simple zorunlu.',
        comparison: null,
    },
    {
        id: 'second',
        name: 'Second Conditional',
        tr: 'Ikinci Tip - Gercekdisi / Hayal',
        color: '#7c3aed',
        light: '#f5f3ff',
        border: '#ddd6fe',
        formula: 'If + Past Simple -> would + V1',
        alt_formula: 'If I had more money, I would travel more.',
        signal_words: ['if only', 'I wish', 'imagine if', 'suppose', 'what if'],
        usages: [
            {
                tag: 'Su An Gercekdisi / Imkansiz', color: '#7c3aed',
                desc: 'Su an gercek olmayan ya da gerceklesmesi zor kosullar.',
                examples: [
                    { en: 'If I were you, I would apologise.', tr: 'Senin yerinde olsam ozur dilerdim.' },
                    { en: 'If she lived closer, we would meet more often.', tr: 'Daha yakinda yasasaydi daha sik bulusurduk.' },
                ]
            },
            {
                tag: 'Tavsiye (If I were you)', color: '#dc2626',
                desc: 'Birisine tavsiye vermenin en yaygin kalibi.',
                examples: [
                    { en: 'If I were you, I wouldn\'t trust him.', tr: 'Senin yerinde olsam ona guvenmezdim.' },
                    { en: 'If I were in your position, I\'d quit.', tr: 'Senin durumunda olsam birakirdim.' },
                ]
            },
            {
                tag: 'Hayal & Dilek', color: '#0891b2',
                desc: 'Gerceklesmesini istedigimiz ama olmayan durumlar.',
                examples: [
                    { en: 'If I were a bird, I would fly over the sea.', tr: 'Kus olsaydim denizin uzerinde ucardim.' },
                    { en: 'If I had more time, I would learn piano.', tr: 'Daha fazla zamanim olsaydi piyano ogrenirdim.' },
                ]
            },
        ],
        tip: '\u{1F4A1} "If I was" veya "If I were" -- Her ikisi de dogru, ancak resmi/yazili dilde "were" tercih edilir.\n"If I were" -> tum sahislar icin (I/he/she/it)',
        mistake: '\u274c "If I would have money..." -> If + Past Simple zorunlu, would kullanilmaz!\n\u274c "If I was rich, I will travel." -> Sonuc cumlesinde would sart.',
        comparison: {
            label: '1. vs 2. Tip Fark',
            rows: [
                { left: 'If it rains, I will stay. (olabilir!)', right: 'If it rained, I would stay. (pek ihtimal yok)' },
                { left: '1. Tip: gercekci olasilik', right: '2. Tip: hayal / gercekdisi' },
            ]
        },
    },
    {
        id: 'third',
        name: 'Third Conditional',
        tr: 'Ucuncu Tip - Gecmis Pismanlık',
        color: '#b45309',
        light: '#fffbeb',
        border: '#fde68a',
        formula: 'If + Past Perfect -> would have + V3',
        alt_formula: 'If I had studied, I would have passed.',
        signal_words: ['if only', 'I wish', 'had ... not', 'looking back'],
        usages: [
            {
                tag: 'Gecmiste Olmayanin Sonucu', color: '#b45309',
                desc: 'Gecmiste olmayan/yapilmayan seyin hayali sonucu.',
                examples: [
                    { en: 'If he had arrived on time, he wouldn\'t have missed the flight.', tr: 'Zamaninda gelseydi ucusu kacirmazdi.' },
                    { en: 'If she had taken the medicine, she would have recovered faster.', tr: 'Ilaci icseydi daha hizli iyilesirdi.' },
                ]
            },
            {
                tag: 'Pismanlık & Kesle', color: '#dc2626',
                desc: 'Gecmis kararlar/eylemler hakkinda pismanlık.',
                examples: [
                    { en: 'If I had listened to my parents, I wouldn\'t have made this mistake.', tr: 'Ailemi dinleseydim bu hatayı yapmazdım.' },
                    { en: 'If we had left earlier, we would have caught the train.', tr: 'Daha erken ciksaydik trene yetisirdik.' },
                ]
            },
            {
                tag: 'Suclama & Elestiri', color: '#6d28d9',
                desc: 'Birinin gecmisteki eylemini elesttirmek icin.',
                examples: [
                    { en: 'If you had told me, I could have helped.', tr: 'Soylesesydin yardim edebilirdim.' },
                    { en: 'If you had been more careful, this wouldn\'t have happened.', tr: 'Daha dikkatli olsaydın bu olmazdi.' },
                ]
            },
        ],
        tip: '\u{1F4A1} Kisaltma: "would\'ve" / "could\'ve" / "should\'ve" + V3\n"If I\'d known, I would\'ve told you."',
        mistake: '\u274c "If I would have studied..." -> If + Past Perfect zorunlu!\n\u274c "would have went" degil -> "would have GONE" (V3 kullan!)',
        comparison: null,
    },
    {
        id: 'mixed',
        name: 'Mixed Conditional',
        tr: 'Karma Kosul - Zaman Karisimi',
        color: '#0f766e',
        light: '#f0fdfa',
        border: '#99f6e4',
        formula: '',
        alt_formula: '',
        signal_words: [],
        usages: [
            {
                tag: 'Gecmis Neden -> Simdiki Sonuc', color: '#0f766e',
                desc: 'If + Past Perfect -> would + V1\nGecmiste olan bir sey su anki durumu etkiliyor.',
                examples: [
                    { en: 'If he had studied medicine, he would be a doctor now.', tr: 'Tıp okusaydi su an doktor olurdu.' },
                    { en: 'If she hadn\'t moved abroad, she would still be here.', tr: 'Yurt disına tasinmasaydi hala burada olurdu.' },
                ]
            },
            {
                tag: 'Simdiki Neden -> Gecmis Sonuc', color: '#7c3aed',
                desc: 'If + Past Simple -> would have + V3\nSu andaki gercekdisi bir ozellik gecmisi etkiler.',
                examples: [
                    { en: 'If I were braver, I would have spoken up at the meeting.', tr: 'Daha cesur olsaydim toplantida konusurdum.' },
                    { en: 'If she were more careful, she wouldn\'t have lost her passport.', tr: 'Daha dikkatli olsaydi pasaportunu kaybetmezdi.' },
                ]
            },
        ],
        tip: '\u{1F4A1} Iki zamani karistirdiginda Mixed Conditional! Anlam baglamina gore If cumleciklerinin zamanini sec.',
        mistake: '\u274c Mixed Conditional nadiren bilincsizcce kullanilir. Anlamina odaklan: hangi olay gecmiste, hangi sonuc simdi?',
        comparison: {
            label: 'Mixed Conditional Ozeti',
            rows: [
                { left: 'Gecmis -> Simdi:', right: 'If + Past Perf. -> would + V1' },
                { left: 'Simdi -> Gecmis:', right: 'If + Past Simple -> would have + V3' },
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
                tag: 'Unless = If not', color: '#be185d',
                desc: '"unless" = "if + not" anlamindadir. Olumlu cumle ile kullanilir.',
                examples: [
                    { en: 'Unless you hurry, you\'ll miss the bus.', tr: 'Acele etmezsen otobusu kacirirsin. (= If you don\'t hurry)' },
                    { en: 'She won\'t come unless she\'s invited.', tr: 'Davet edilmezse gelmeyecek.' },
                ]
            },
            {
                tag: 'Provided / As Long As = Yalnizca Eger', color: '#0369a1',
                desc: '"provided that" / "as long as" -> sart daha kisitlayici ve resmi.',
                examples: [
                    { en: 'You can borrow my car provided that you drive carefully.', tr: 'Dikkatli surdugun surece arabami odunc alabilirsin.' },
                    { en: 'As long as you behave, you can stay.', tr: 'Iyi davrandigin surece kalabilirsin.' },
                ]
            },
            {
                tag: 'In Case = Onlem Olarak', color: '#7c3aed',
                desc: '"in case" -> gelecekteki olasiliga karsi simdiden onlem alma.',
                examples: [
                    { en: 'Take an umbrella in case it rains.', tr: 'Yagmur yagarsa diye semsiye al. (= Simdi al, yagarsa diye)' },
                    { en: 'I\'ll save your number in case I need it later.', tr: 'Numarani kaydedeyim, ileride gerekirse diye.' },
                ]
            },
            {
                tag: 'Even If = Olursa Bile', color: '#dc2626',
                desc: '"Even if" -> kosul gerceklesse bile sonuc degismeyecek.',
                examples: [
                    { en: 'Even if you apologise, she won\'t forgive you.', tr: 'Ozur dilesen bile affetmeyecek.' },
                    { en: 'I wouldn\'t eat that even if I were starving.', tr: 'Acliktan olsem bile onu yemezdim.' },
                ]
            },
            {
                tag: 'Only If = Yalnizca Su Durumda', color: '#0891b2',
                desc: '"only if" -> cok kisitlayici, tek kosul.',
                examples: [
                    { en: 'I\'ll come only if you promise to behave.', tr: 'Yalnizca iyi davranacagina soz verirsen gelirim.' },
                    { en: 'Only if you apologise will she forgive you. (formal inversion)', tr: 'Yalnizca ozur dilersen affeder. (resmi ters cevrim)' },
                ]
            },
        ],
        tip: '\u{1F4A1} "In case" != "If"!\n"Take an umbrella if it rains." (yagarsa al)\n"Take an umbrella in case it rains." (yagarsa diye simdi al)',
        mistake: '\u274c "Unless you don\'t come..." -> unless zaten olumsuzluk icerir, cifte olumsuz YANLIS!\n-> "Unless you come..." \u2713',
        comparison: {
            label: 'In Case vs If',
            rows: [
                { left: '"If it rains, take an umbrella." (yagarsa al)', right: '"Take an umbrella in case it rains." (simdi al, belki yagar)' },
            ]
        },
    },
    {
        id: 'wish',
        name: 'Wish / If Only',
        tr: '"Keske" Ifadeleri',
        color: '#9333ea',
        light: '#faf5ff',
        border: '#e9d5ff',
        formula: '',
        alt_formula: '',
        signal_words: ['I wish', 'if only', 'I\'d rather', 'it\'s time', 'would rather'],
        usages: [
            {
                tag: 'Su An Icin Dilek (Past Simple)', color: '#9333ea',
                desc: 'Su an farkli olmasini istedigimiz durumlar.',
                examples: [
                    { en: 'I wish I were taller.', tr: 'Keske daha uzun olsaydim.' },
                    { en: 'I wish I had more free time.', tr: 'Keske daha fazla bos zamanim olsaydi.' },
                    { en: 'If only she lived closer!', tr: 'Keske daha yakinda yasasaydi!' },
                ]
            },
            {
                tag: 'Gecmis Icin Pismanlık (Past Perfect)', color: '#dc2626',
                desc: 'Gecmiste yapilmasini/yapilmamasini istedigimiz seyler.',
                examples: [
                    { en: 'I wish I had studied harder.', tr: 'Keske daha cok calismis olsaydim.' },
                    { en: 'If only I hadn\'t said that!', tr: 'Keske bunu soylememis olsaydim!' },
                    { en: 'I wish you had been there.', tr: 'Keske orada olmus olsaydin.' },
                ]
            },
            {
                tag: 'Birinin Davranisina Sikayet (would)', color: '#b45309',
                desc: 'Birinin aliskanligı/davranisi hakkinda sikayet veya talep -- arzu degil!',
                examples: [
                    { en: 'I wish you would stop interrupting me!', tr: 'Keske beni kesmeyi biraksan!' },
                    { en: 'I wish it would stop raining.', tr: 'Keske yagmur dursa.' },
                    { en: 'If only she would listen!', tr: 'Keske dinleseydi!' },
                ]
            },
            {
                tag: 'It\'s Time / I\'d Rather', color: '#0369a1',
                desc: '"Artik zamani" ve "tercih" icin benzer yapilar.',
                examples: [
                    { en: 'It\'s time you went to bed.', tr: 'Artik yatmanin zamani geldi.' },
                    { en: 'It\'s high time she made a decision.', tr: 'Karar vermesinin tam zamani.' },
                    { en: 'I\'d rather you didn\'t tell anyone.', tr: 'Kimseye soylememeni tercih ederdim.' },
                ]
            },
        ],
        tip: '\u{1F4A1} Zaman dilimi tablosu:\nWish + Past Simple -> su an\nWish + Past Perfect -> gecmis\nWish + would -> baskasina yonelik sikayet/istek',
        mistake: '\u274c "I wish I would be taller." -> Kendi hakkinda wish + would YANLIS!\n-> "I wish I were taller." \u2713\n\u274c "I wish I had more money yesterday." -> Gecmis ifadesiyle Past Perfect kullan!\n-> "I wish I had had more money then." \u2713',
        comparison: {
            label: 'Wish Zaman Tablosu',
            rows: [
                { left: 'Su an -> Wish + Past Simple', right: '"I wish I knew the answer."' },
                { left: 'Gecmis -> Wish + Past Perfect', right: '"I wish I had known the answer."' },
                { left: 'Sikayet -> Wish + would', right: '"I wish you would listen."' },
            ]
        },
    },
    {
        id: 'inversion',
        name: 'Formal Inversion',
        tr: 'Resmi Ters Cevrim (YDS\'de Siklikla!)',
        color: '#1d4ed8',
        light: '#eff6ff',
        border: '#bfdbfe',
        formula: '',
        alt_formula: '',
        signal_words: ['Were...to', 'Had...', 'Should...', 'formal writing'],
        usages: [
            {
                tag: 'Were + to (2. Tip Resmi)', color: '#1d4ed8',
                desc: '"If + were + to" -> resmi ve yazili dilde 2. tip conditional.',
                examples: [
                    { en: 'Were I to win the lottery, I would donate half.', tr: 'Piyangoyu kassaydim yarisini bagislardim.\n(= If I were to win...)' },
                    { en: 'Were she to resign, the company would struggle.', tr: 'Istifa etseydi sirket zorlanirdi.' },
                ]
            },
            {
                tag: 'Had + Subject (3. Tip Resmi)', color: '#7c3aed',
                desc: '"Had" one alinarak "If + Past Perfect" yerine kullanilir.',
                examples: [
                    { en: 'Had I known, I would have helped.', tr: 'Bilmis olsaydim yardim ederdim.\n(= If I had known...)' },
                    { en: 'Had they arrived earlier, they wouldn\'t have missed the show.', tr: 'Daha erken gelselerdi gosteriyyi kacirmazlardi.' },
                ]
            },
            {
                tag: 'Should + Subject (1. Tip Resmi)', color: '#16a34a',
                desc: '"Should" one alinarak 1. tip conditional\'i resmi kilar.',
                examples: [
                    { en: 'Should you need any help, don\'t hesitate to call.', tr: 'Herhangi bir yardima ihtiyacin olursa cekinme ara.\n(= If you should need...)' },
                    { en: 'Should there be any problems, contact HR.', tr: 'Herhangi bir sorun olursa IK ile iletisime gecin.' },
                ]
            },
        ],
        tip: '\u{1F4A1} YDS okuma parcalari ve ceviri sorularinda inversion siklikla cikar. "Had I known" gordugunzde -> 3. Tip Conditional!',
        mistake: '\u274c "Would I have known, I would have helped." -> Inversion\'da WOULD kullanilmaz! Had/Were/Should ile yapilir.',
        comparison: {
            label: 'Normal vs Inversion Karsilastirma',
            rows: [
                { left: 'If I had known -> Had I known', right: '3. Tip -- Gecmis pismanlık' },
                { left: 'If I were to try -> Were I to try', right: '2. Tip -- Resmi/yazili' },
                { left: 'If you should need -> Should you need', right: '1. Tip -- Resmi teklif/kosul' },
            ]
        },
    },
];

// -- HTML Builder ---------------------------------------------
function buildIfClausesHTML() {
    return `
<div class="max-w-4xl mx-auto px-4 py-10" id="ifc-root">
  <!-- Action Bar (Print) -->
  <div class="flex justify-end mb-4 no-print">
      <button onclick="window.print()" class="print-btn flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg active:scale-95">
          <i class="fas fa-file-pdf"></i> PDF İndir / Yazdır
      </button>
  </div>

  <!-- Hero -->
  <div class="text-center mb-10">
    <div class="inline-flex items-center gap-3 bg-gradient-to-r from-violet-800 to-violet-900 text-white px-6 py-3 rounded-2xl shadow-xl mb-5">
      <i class="fas fa-code-branch text-xl"></i>
      <span class="font-bold text-lg tracking-wide" style="font-family:'Playfair Display',serif;">If Clauses Rehberi</span>
    </div>
    <h2 class="text-3xl font-extrabold text-slate-800 mb-2" style="font-family:'Playfair Display',serif;">Kosul Cumleleri -- Tam Rehber</h2>
    <p class="text-slate-500 text-sm max-w-xl mx-auto">Sifir tipten karma kosullara, wish yapilarindan resmi inversion'a -- tum baglamlari, ornekleri ve hatalariyla.</p>
  </div>

  <!-- Type overview cards -->
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 no-print">
    ${[
            { label: 'Sifir Tip', sub: 'Genel Gercek', color: '#0369a1', id: 'zero' },
            { label: '1. Tip', sub: 'Gercekci Gelecek', color: '#15803d', id: 'first' },
            { label: '2. Tip', sub: 'Hayal / Gercekdisi', color: '#7c3aed', id: 'second' },
            { label: '3. Tip', sub: 'Gecmis Pismanlık', color: '#b45309', id: 'third' },
            { label: 'Mixed', sub: 'Karma Zaman', color: '#0f766e', id: 'mixed' },
            { label: 'Unless/As long as', sub: 'Alternatif Baglaclar', color: '#be185d', id: 'unless' },
            { label: 'Wish / If Only', sub: 'Keske / Dilek', color: '#9333ea', id: 'wish' },
            { label: 'Inversion', sub: 'Resmi Ters Cevrim', color: '#1d4ed8', id: 'inversion' },
        ].map(c => `
      <button onclick="ifcScrollTo('${c.id}')"
        class="rounded-xl border-2 p-3 text-left hover:shadow-md transition-all"
        style="border-color:${c.color}33; background:${c.color}0d;">
        <p class="font-extrabold text-sm" style="color:${c.color};">${c.label}</p>
        <p class="text-xs text-slate-400 mt-0.5">${c.sub}</p>
      </button>`).join('')}
  </div>

  <!-- Summary Formula Banner -->
  <div class="rounded-2xl border border-slate-200 bg-slate-900 text-white p-5 mb-10 overflow-x-auto">
    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Hizli Formul Ozeti</p>
    <table class="w-full text-sm min-w-[480px]">
      <thead><tr class="border-b border-slate-700">
        <th class="text-left py-2 text-slate-400 font-semibold">Tip</th>
        <th class="text-left py-2 text-slate-400 font-semibold">If Cumlesi</th>
        <th class="text-left py-2 text-slate-400 font-semibold">Sonuc Cumlesi</th>
        <th class="text-left py-2 text-slate-400 font-semibold">Kullanim</th>
      </tr></thead>
      <tbody class="divide-y divide-slate-800">
        ${[
            ['Sifir', 'Present Simple', 'Present Simple', 'Genel gercekler'],
            ['1. Tip', 'Present Simple', 'will + V1', 'Gercekci gelecek'],
            ['2. Tip', 'Past Simple', 'would + V1', 'Hayal / gercekdisi'],
            ['3. Tip', 'Past Perfect', 'would have + V3', 'Gecmis pismanlık'],
            ['Mixed (gecmis->simdi)', 'Past Perfect', 'would + V1', 'Gecmis neden -> simdiki sonuc'],
            ['Mixed (simdi->gecmis)', 'Past Simple', 'would have + V3', 'Simdiki neden -> gecmis sonuc'],
        ].map(r => `<tr>
          <td class="py-2 text-yellow-400 font-bold">${r[0]}</td>
          <td class="py-2"><code class="text-green-400 bg-slate-800 px-2 py-0.5 rounded text-xs">${r[1]}</code></td>
          <td class="py-2"><code class="text-blue-300 bg-slate-800 px-2 py-0.5 rounded text-xs">${r[2]}</code></td>
          <td class="py-2 text-slate-300 text-xs">${r[3]}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <!-- Type Cards -->
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
          <p class="ifc-tr">-> ${ex.tr}</p>
        </div>`).join('')}
    </div>`).join('');

    const formulaHTML = t.formula
        ? `<div class="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap">
        <span class="ifc-formula-chip">IF: ${t.formula.split('->')[0]}</span>
        <span class="text-slate-400 text-xs font-bold">-></span>
        <span class="ifc-formula-chip" style="background:#1a2e1a; color:#86efac;">${t.formula.split('->')[1] || ''}</span>
       </div>
       <p class="text-xs text-slate-400 italic mt-1">${t.alt_formula}</p>`
        : '';

    const signalsHTML = t.signal_words.length
        ? `<div class="mb-5">
        <p class="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2">Anahtar Baglaclar / Ifadeler</p>
        <div class="flex flex-wrap">${t.signal_words.map(w => `<span class="ifc-signal">${w}</span>`).join('')}</div>
       </div>`
        : '';

    const compHTML = t.comparison
        ? `<div class="mb-4">
        <p class="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2">${t.comparison.label}</p>
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
        <p class="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-3">Kullanim Alanlari</p>
        ${usagesHTML}
      </div>
      ${compHTML}
      <div class="grid sm:grid-cols-2 gap-3 mt-4">
        <div class="ifc-mistake"><p class="font-bold mb-1">Yaygin Hatalar</p>${t.mistake}</div>
        <div class="ifc-tip"><p class="font-bold mb-1">Aklda Kal</p>${t.tip}</div>
      </div>
    </div>
  </div>`;
}

// -- Controls -------------------------------------------------
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
