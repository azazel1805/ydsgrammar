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
                    { en: '<span class="map-tag map-1">If</span> you <span class="map-tag map-2">heat water</span> to 100°C, <span class="map-tag map-3">it boils</span>.', tr: '<span class="map-tag map-2">Suyu</span> 100°C\'ye <span class="map-tag map-2">ısıtırsan</span> (<span class="map-tag map-1">SE</span>), <span class="map-tag map-3">kaynar</span>.' },
                    { en: '<span class="map-tag map-1">If</span> <span class="map-tag map-2">plants</span> <span class="map-tag map-3">don\'t get</span> sunlight, <span class="map-tag map-4">they die</span>.', tr: '<span class="map-tag map-2">Bitkiler</span> güneş ışığı <span class="map-tag map-3">almazlarsa</span> (<span class="map-tag map-1">SE</span>), <span class="map-tag map-4">ölürler</span>.' },
                ]
            },
            {
                tag: 'Evrensel & Tekrarlayan Gercekler', color: '#16a34a',
                desc: 'Her seferinde ayni sonucu veren eylem/durum.',
                examples: [
                    { en: '<span class="map-tag map-1">If</span> she <span class="map-tag map-2">doesn\'t sleep well</span>, she gets a headache.', tr: 'İyi <span class="map-tag map-2">uyuyamazsa</span> (<span class="map-tag map-1">SE</span>) başı ağrır.' },
                    { en: '<span class="map-tag map-1">If</span> you <span class="map-tag map-2">press this button</span>, the machine starts.', tr: 'Bu <span class="map-tag map-2">düğmeye basarsan</span> (<span class="map-tag map-1">SE</span>) makine çalışır.' },
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
                    { en: '<span class="map-tag map-1">If</span> you <span class="map-tag map-2">study hard</span>, you will pass the exam.', tr: '<span class="map-tag map-2">Sıkı çalışır</span><span class="map-tag map-1">SAN</span> sınavı geçeceksin.' },
                    { en: '<span class="map-tag map-1">If</span> it <span class="map-tag map-2">rains tomorrow</span>, we won\'t go to the beach.', tr: 'Yarın <span class="map-tag map-2">yağmur yağar</span><span class="map-tag map-1">SA</span> plaja gitmeyeceğiz.' },
                ]
            },
            {
                tag: 'Uyari & Tehdit', color: '#dc2626',
                desc: 'Olasi bir olumsuz sonucu vurgulamak icin.',
                examples: [
                    { en: '<span class="map-tag map-1">If</span> you <span class="map-tag map-2">don\'t apologise</span>, she will never speak to you again.', tr: '<span class="map-tag map-2">Özür dilemez</span><span class="map-tag map-1">SEN</span> seninle bir daha konuşmaz.' },
                    { en: '<span class="map-tag map-1">If</span> you <span class="map-tag map-2">keep doing this</span>, you\'ll get fired.', tr: '<span class="map-tag map-2">Bunu yapmaya devam eder</span><span class="map-tag map-1">SEN</span> kovulacaksın.' },
                ]
            },
            {
                tag: 'Teklif & Oneri', color: '#7c3aed',
                desc: 'Birinin bir seyi yapmasi halinde sunulan teklif.',
                examples: [
                    { en: '<span class="map-tag map-1">If</span> you <span class="map-tag map-2">need help</span>, I\'ll be here.', tr: '<span class="map-tag map-2">Yardıma ihtiyacın olur</span><span class="map-tag map-1">SA</span> burada olacağım.' },
                    { en: '<span class="map-tag map-1">If</span> you\'re <span class="map-tag map-2">hungry</span>, I\'ll make something.', tr: '<span class="map-tag map-2">Aç</span><span class="map-tag map-1">SAN</span> bir şeyler yapayım.' },
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
                    { en: `<span class="map-tag map-1">If I were</span> <span class="map-tag map-2">you</span>, I would apologise.`, tr: `<span class="map-tag map-2">Senin</span> <span class="map-tag map-1">yerinde olsam</span> özür dilerdim.` },
                    { en: 'If she lived closer, we would meet more often.', tr: 'Daha yakında yaşasaydı daha sık buluşurduk.' },
                ]
            },
            {
                tag: 'Tavsiye (If I were you)', color: '#dc2626',
                desc: 'Birisine tavsiye vermenin en yaygin kalibi.',
                examples: [
                    { en: '<span class="map-tag map-1">If I were</span> <span class="map-tag map-2">you</span>, I wouldn\'t trust him.', tr: '<span class="map-tag map-2">Senin</span> <span class="map-tag map-1">yerinde olsam</span> ona güvenmezdim.' },
                    { en: '<span class="map-tag map-1">If I were</span> in <span class="map-tag map-2">your position</span>, I\'d quit.', tr: '<span class="map-tag map-2">Senin durumunda</span> <span class="map-tag map-1">olsaydım</span> bırakırdım.' },
                ]
            },
            {
                tag: 'Hayal & Dilek', color: '#0891b2',
                desc: 'Gerceklesmesini istedigimiz ama olmayan durumlar.',
                examples: [
                    { en: '<span class="map-tag map-1">If I were</span> a <span class="map-tag map-2">bird</span>, I would fly over the sea.', tr: '<span class="map-tag map-2">Kuş</span> <span class="map-tag map-1">olsaydım</span> denizin üzerinde uçardım.' },
                    { en: '<span class="map-tag map-1">If</span> I <span class="map-tag map-2">had more time</span>, I would learn piano.', tr: 'Daha fazla <span class="map-tag map-2">zamanım olsaydı</span> (<span class="map-tag map-1">SE</span>) piyano öğrenirdim.' },
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
                    { en: '<span class="map-tag map-1">If he had arrived</span> <span class="map-tag map-2">on time</span>, he wouldn\'t <span class="map-tag map-3">have missed</span> the flight.', tr: '<span class="map-tag map-2">Zamanında</span> <span class="map-tag map-1">gelseydi</span> uçuşu <span class="map-tag map-3">kaçırmazdı</span>.' },
                    { en: '<span class="map-tag map-1">If</span> she <span class="map-tag map-2">had taken</span> the medicine, she <span class="map-tag map-3">would have recovered</span> faster.', tr: 'İlacı <span class="map-tag map-2">içseydi</span> (<span class="map-tag map-1">SE</span>) daha <span class="map-tag map-3">hızlı iyileşirdi</span>.' },
                ]
            },
            {
                tag: 'Pismanlık & Kesle', color: '#dc2626',
                desc: 'Gecmis kararlar/eylemler hakkinda pismanlık.',
                examples: [
                    { en: '<span class="map-tag map-1">If</span> I <span class="map-tag map-2">had listened</span> to my parents, I wouldn\'t have made this mistake.', tr: 'Ailemi <span class="map-tag map-2">dinleseydim</span> (<span class="map-tag map-1">SE</span>) bu hatayı yapmazdım.' },
                    { en: '<span class="map-tag map-1">If</span> we <span class="map-tag map-2">had left</span> earlier, we would have caught the train.', tr: 'Daha erken <span class="map-tag map-2">çıksaydık</span> (<span class="map-tag map-1">SE</span>) trene yetişirdik.' },
                ]
            },
            {
                tag: 'Suclama & Elestiri', color: '#6d28d9',
                desc: 'Birinin gecmisteki eylemini elesttirmek icin.',
                examples: [
                    { en: '<span class="map-tag map-1">If</span> you <span class="map-tag map-2">had told me</span>, I <span class="map-tag map-3">could have helped</span>.', tr: '<span class="map-tag map-2">Söyleseydin</span> (<span class="map-tag map-1">SE</span>) yardım <span class="map-tag map-3">edebilirdim</span>.' },
                    { en: '<span class="map-tag map-1">If</span> you <span class="map-tag map-2">had been</span> more careful, this wouldn\'t have happened.', tr: 'Daha <span class="map-tag map-2">dikkatli olsaydın</span> (<span class="map-tag map-1">SE</span>) bu olmazdı.' },
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
                    { en: '<span class="map-tag map-1">If</span> he <span class="map-tag map-2">had studied medicine</span>, he <span class="map-tag map-3">would be a doctor</span> now.', tr: 'Tıp <span class="map-tag map-2">okusaydı</span> (<span class="map-tag map-1">SE</span>) şu an <span class="map-tag map-3">doktor olurdu</span>.' },
                    { en: '<span class="map-tag map-1">If</span> she <span class="map-tag map-2">hadn\'t moved</span> abroad, she <span class="map-tag map-3">would still be</span> here.', tr: 'Yurt dışına <span class="map-tag map-2">taşınmasaydı</span> (<span class="map-tag map-1">SE</span>) hala burada <span class="map-tag map-3">olurdu</span>.' },
                ]
            },
            {
                tag: 'Simdiki Neden -> Gecmis Sonuc', color: '#7c3aed',
                desc: 'If + Past Simple -> would have + V3\nSu andaki gercekdisi bir ozellik gecmisi etkiler.',
                examples: [
                    { en: '<span class="map-tag map-1">If I were</span> braver, I <span class="map-tag map-2">would have spoken up</span> at the meeting.', tr: 'Daha <span class="map-tag map-1">cesur olsaydım</span>, toplantıda <span class="map-tag map-2">konuşurdum</span>.' },
                    { en: '<span class="map-tag map-1">If she were</span> more careful, she <span class="map-tag map-2">wouldn\'t have lost</span> her passport.', tr: 'Daha <span class="map-tag map-1">dikkatli olsaydı</span>, pasaportunu <span class="map-tag map-2">kaybetmezdi</span>.' },
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
                    { en: '<span class="map-tag map-1">Unless</span> <span class="map-tag map-2">you hurry</span>, you\'ll miss the bus.', tr: '<span class="map-tag map-2">Acele et</span><span class="map-tag map-1">MEZSEN</span> otobüsü kaçırırsın.' },
                    { en: 'She won\'t come <span class="map-tag map-1">unless</span> she\'s <span class="map-tag map-2">invited</span>.', tr: '<span class="map-tag map-2">Davet edil</span><span class="map-tag map-1">MEZSE</span> gelmeyecek.' },
                ]
            },
            {
                tag: 'Provided / As Long As = Yalnizca Eger', color: '#0369a1',
                desc: '"provided that" / "as long as" -> sart daha kisitlayici ve resmi.',
                examples: [
                    { en: 'You can borrow my car <span class="map-tag map-1">provided that</span> you <span class="map-tag map-2">drive carefully</span>.', tr: 'Dikkatli <span class="map-tag map-2">sürdüğün</span> <span class="map-tag map-1">SÜRECE</span> arabamı ödünç alabilirsin.' },
                    { en: '<span class="map-tag map-1">As long as</span> you <span class="map-tag map-2">behave</span>, you can stay.', tr: 'İyi <span class="map-tag map-2">davrandığın</span> <span class="map-tag map-1">SÜRECE</span> kalabilirsin.' },
                ]
            },
            {
                tag: 'In Case = Onlem Olarak', color: '#7c3aed',
                desc: '"in case" -> gelecekteki olasiliga karsi simdiden onlem alma.',
                examples: [
                    { en: 'Take an <span class="map-tag map-2">umbrella</span> <span class="map-tag map-1">in case</span> <span class="map-tag map-3">it rains</span>.', tr: '<span class="map-tag map-3">Yağmur yağarsa</span> <span class="map-tag map-1">DİYE</span> <span class="map-tag map-2">şemsiye</span> al.' },
                    { en: 'I\'ll save your <span class="map-tag map-2">number</span> <span class="map-tag map-1">in case</span> I <span class="map-tag map-3">need it later</span>.', tr: 'İleride <span class="map-tag map-3">lazım olursa</span> <span class="map-tag map-1">DİYE</span> <span class="map-tag map-2">numaranı</span> kaydedeyim.' },
                ]
            },
            {
                tag: 'Even If = Olursa Bile', color: '#dc2626',
                desc: '"Even if" -> kosul gerceklesse bile sonuc degismeyecek.',
                examples: [
                    { en: '<span class="map-tag map-1">Even if</span> you <span class="map-tag map-2">apologise</span>, she won\'t forgive you.', tr: '<span class="map-tag map-2">Özür dilesen</span> <span class="map-tag map-1">BİLE</span> seni affetmeyecek.' },
                    { en: 'I wouldn\'t eat that <span class="map-tag map-1">even if</span> I <span class="map-tag map-2">were starving</span>.', tr: 'Açlıktan <span class="map-tag map-2">ölsem</span> <span class="map-tag map-1">BİLE</span> onu yemezdim.' },
                ]
            },
            {
                tag: 'Only If = Yalnizca Su Durumda', color: '#0891b2',
                desc: '"only if" -> cok kisitlayici, tek kosul.',
                examples: [
                    { en: 'I\'ll come <span class="map-tag map-1">only if</span> you <span class="map-tag map-2">promise to behave</span>.', tr: '<span class="map-tag map-1">YALNIZCA</span> <span class="map-tag map-2">iyi davranacağına söz verirsen</span> gelirim.' },
                    { en: '<span class="map-tag map-1">Only if</span> you <span class="map-tag map-2">apologise</span> will she forgive you.', tr: '<span class="map-tag map-1">YALNIZCA</span> <span class="map-tag map-2">özür dilersen</span> seni affeder.' },
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
                    { en: 'I <span class="map-tag map-1">wish</span> I <span class="map-tag map-2">were</span> taller.', tr: '<span class="map-tag map-1">Keşke</span> daha uzun <span class="map-tag map-2">olsaydım</span>.' },
                    { en: 'I <span class="map-tag map-1">wish</span> I <span class="map-tag map-2">had</span> more free time.', tr: '<span class="map-tag map-1">Keşke</span> daha fazla boş zamanım <span class="map-tag map-2">olsaydı</span>.' },
                    { en: '<span class="map-tag map-1">If only</span> she <span class="map-tag map-2">lived</span> closer!', tr: '<span class="map-tag map-1">Keşke</span> daha yakında <span class="map-tag map-2">yaşasaydı</span>!' },
                ]
            },
            {
                tag: 'Gecmis Icin Pismanlık (Past Perfect)', color: '#dc2626',
                desc: 'Gecmiste yapilmasini/yapilmamasini istedigimiz seyler.',
                examples: [
                    { en: 'I <span class="map-tag map-1">wish</span> I <span class="map-tag map-2">had studied</span> harder.', tr: '<span class="map-tag map-1">Keşke</span> daha çok <span class="map-tag map-2">çalışmış olsaydım</span>.' },
                    { en: '<span class="map-tag map-1">If only</span> I <span class="map-tag map-2">hadn\'t said</span> that!', tr: '<span class="map-tag map-1">Keşke</span> bunu <span class="map-tag map-2">söylememiş olsaydım</span>!' },
                    { en: 'I <span class="map-tag map-1">wish</span> you <span class="map-tag map-2">had been</span> there.', tr: '<span class="map-tag map-1">Keşke</span> orada <span class="map-tag map-2">olmuş olsaydın</span>.' },
                ]
            },
            {
                tag: 'Birinin Davranisina Sikayet (would)', color: '#b45309',
                desc: 'Birinin aliskanligı/davranisi hakkinda sikayet veya talep -- arzu degil!',
                examples: [
                    { en: 'I <span class="map-tag map-1">wish</span> you <span class="map-tag map-2">would stop interrupting</span> me!', tr: '<span class="map-tag map-1">Keşke</span> beni bölmeyi <span class="map-tag map-2">bıraksan</span>!' },
                    { en: 'I <span class="map-tag map-1">wish</span> it <span class="map-tag map-2">would stop</span> raining.', tr: '<span class="map-tag map-1">Keşke</span> yağmur <span class="map-tag map-2">dursa</span> (durmasını dilerdim).' },
                    { en: '<span class="map-tag map-1">If only</span> she <span class="map-tag map-2">would listen</span>!', tr: '<span class="map-tag map-2">Dinleseydi</span> <span class="map-tag map-1">keşke</span>!' },
                ]
            },
            {
                tag: 'It\'s Time / I\'d Rather', color: '#0369a1',
                desc: '"Artik zamani" ve "tercih" icin benzer yapilar.',
                examples: [
                    { en: 'It\'s <span class="map-tag map-1">time</span> you <span class="map-tag map-2">went</span> to bed.', tr: 'Yatma <span class="map-tag map-1">zamanın</span> <span class="map-tag map-2">geldi</span> (geçiyor).' },
                    { en: 'It\'s high <span class="map-tag map-1">time</span> she <span class="map-tag map-2">made</span> a decision.', tr: 'Karar vermesinin <span class="map-tag map-1">tam zamanı</span> (çoktan <span class="map-tag map-2">yapmalıydı</span>).' },
                    { en: 'I\'d <span class="map-tag map-1">rather</span> you <span class="map-tag map-2">didn\'t tell</span> anyone.', tr: 'Kimseye <span class="map-tag map-2">söylememeni</span> <span class="map-tag map-1">tercih ederim</span>. ' },
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
                    { en: '<span class="map-tag map-1">Were I to win</span> the lottery, I would donate half.', tr: 'Piyangoyu <span class="map-tag map-1">kazansaydım</span> yarısını bağışlardım.' },
                    { en: '<span class="map-tag map-1">Were she to resign</span>, the company would struggle.', tr: '<span class="map-tag map-1">İstifa etseydi</span> şirket zorlanırdı.' },
                ]
            },
            {
                tag: 'Had + Subject (3. Tip Resmi)', color: '#7c3aed',
                desc: '"Had" one alinarak "If + Past Perfect" yerine kullanilir.',
                examples: [
                    { en: '<span class="map-tag map-1">Had I known</span>, I would have helped.', tr: '<span class="map-tag map-1">Bilmiş olsaydım</span> yardım ederdim.' },
                    { en: '<span class="map-tag map-1">Had they arrived</span> earlier, they wouldn\'t have missed the show.', tr: 'Daha erken <span class="map-tag map-1">gelselerdi</span> gösteriyi kaçırmazlardı.' },
                ]
            },
            {
                tag: 'Should + Subject (1. Tip Resmi)', color: '#16a34a',
                desc: '"Should" one alinarak 1. tip conditional\'i resmi kilar.',
                examples: [
                    { en: '<span class="map-tag map-1">Should you need</span> any help, don\'t hesitate to call.', tr: 'Herhangi bir yardıma <span class="map-tag map-1">ihtiyacın olursa</span> aramakta çekinme.' },
                    { en: '<span class="map-tag map-1">Should there be</span> any problems, contact HR.', tr: 'Herhangi bir sorun <span class="map-tag map-1">olursa</span> İK ile iletişime geçin.' },
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
    <table class="grammar-table w-full text-sm min-w-[480px]">
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
          <div class="ifc-en">${ex.en}</div>
          <div class="map-tr-sentence">${ex.tr}</div>
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
        <table class="grammar-table ifc-compare-table">
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
