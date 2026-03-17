/* ============================================================
   tenseguide.js  –  İngilizce Tense Kullanım Rehberi
   ============================================================ */

const TENSES = [
    {
        id: 'present_simple',
        name: 'Present Simple',
        tr: 'Geniş Zaman',
        color: '#2563eb',
        light: '#eff6ff',
        border: '#bfdbfe',
        formula: 'S + V(s/es) / S + do/does + not + V',
        signal_words: ['always', 'usually', 'often', 'sometimes', 'rarely', 'never', 'every day/week', 'on Mondays', 'once a week'],
        usages: [
            {
                examples: [
                    { en: '<span class="map-tag map-2">She</span> <span class="map-tag map-1">drinks</span> coffee every morning.', tr: 'Her sabah kahve <span class="map-tag map-1">içer</span> (<span class="map-tag map-2">O</span>).' },
                    { en: '<span class="map-tag map-2">He</span> never <span class="map-tag map-1">eats</span> fast food.', tr: 'Hiç fast food <span class="map-tag map-1">yemez</span> (<span class="map-tag map-2">O</span>).' },
                ]
            },
            {
                tag: 'Genel Gerçekler & Doğa Yasaları', color: '#dc2626', desc: 'Değişmeyen gerçekler ve bilimsel yasalar.', examples: [
                    { en: '<span class="map-tag map-2">Water</span> <span class="map-tag map-1">boils</span> at 100°C.', tr: '<span class="map-tag map-2">Su</span> 100°C\'de <span class="map-tag map-1">kaynar</span>.' },
                    { en: 'The <span class="map-tag map-2">Earth</span> <span class="map-tag map-1">revolves</span> around the Sun.', tr: '<span class="map-tag map-2">Dünya</span> Güneş\'in etrafında <span class="map-tag map-1">döner</span>.' },
                ]
            },
            {
                tag: 'Program & Tarifeli Gelecek', color: '#7c3aed', desc: 'Resmi program ve tarifeler (uçuş, maç, taks vb.).', examples: [
                    { en: 'The <span class="map-tag map-2">train</span> <span class="map-tag map-1">leaves</span> at 9 AM.', tr: '<span class="map-tag map-2">Tren</span> sabah 9\'da <span class="map-tag map-1">kalkıyor</span>.' },
                    { en: 'The <span class="map-tag map-2">match</span> <span class="map-tag map-1">starts</span> at 8 PM tonight.', tr: '<span class="map-tag map-2">Maç</span> bu gece 20\'de <span class="map-tag map-1">başlıyor</span>.' },
                ]
            },
            {
                tag: 'Duygular & Düşünceler (Stative Verbs)', color: '#b45309', desc: 'Eylem değil, durum bildiren fiiller (like, know, want...).', examples: [
                    { en: 'I <span class="map-tag map-1">know</span> the <span class="map-tag map-2">answer</span>.', tr: '<span class="map-tag map-2">Cevabı</span> <span class="map-tag map-1">biliyorum</span>.' },
                    { en: '<span class="map-tag map-2">She</span> <span class="map-tag map-1">loves</span> classical music.', tr: 'Klasik müziği <span class="map-tag map-1">seviyor</span> (<span class="map-tag map-2">O</span>).' },
                ]
            },
        ],
        mistake: '❌ "I am knowing the answer." -> Stative verbs continuous yapılmaz!',
        tip: '💡 "s/es" son ek: He/She/It için unutma. "He go" değil "He goes".',
    },
    {
        id: 'present_continuous',
        name: 'Present Continuous',
        tr: 'Şimdiki Zaman',
        color: '#0891b2',
        light: '#ecfeff',
        border: '#a5f3fc',
        formula: 'S + am/is/are + V-ing',
        signal_words: ['now', 'right now', 'at the moment', 'currently', 'at present', 'look!', 'listen!', 'this week', 'today'],
        usages: [
            {
                tag: 'Şu An Olan Eylem', color: '#0891b2', desc: 'Tam konuşma anında devam eden eylemler.', examples: [
                    { en: '<span class="map-tag map-2">She</span> <span class="map-tag map-1">is reading</span> <span class="map-tag map-3">a book</span> right now.', tr: 'Şu anda <span class="map-tag map-2">bir kitab</span>ı <span class="map-tag map-1">okuyor</span> (<span class="map-tag map-2">O</span>).' },
                    { en: '<span class="map-tag map-2">They</span> <span class="map-tag map-1">are playing</span> football in the garden.', tr: 'Bahçede futbol <span class="map-tag map-1">oynuyorlar</span> (<span class="map-tag map-2">Onlar</span>).' },
                ]
            },
            {
                tag: 'Geçici Durum', color: '#7c3aed', desc: 'Kalıcı olmayan, geçici durumlar.', examples: [
                    { en: '<span class="map-tag map-2">I\'m staying</span> at my friend\'s place <span class="map-tag map-1">this week</span>.', tr: '<span class="map-tag map-1">Bu hafta</span> arkadaşımın evinde <span class="map-tag map-2">kalıyorum</span>.' },
                    { en: '<span class="map-tag map-2">She\'s working</span> from home <span class="map-tag map-1">these days</span>.', tr: '<span class="map-tag map-1">Bu günlerde</span> evden <span class="map-tag map-2">çalışıyor</span>.' },
                ]
            },
            {
                tag: 'Kesin Planlanmış Gelecek', color: '#16a34a', desc: 'Yakın gelecekte organize edilmiş planlar (bilet alınmış, saat ayarlanmış vb.).', examples: [
                    { en: '<span class="map-tag map-2">We\'re meeting</span> the client <span class="map-tag map-1">tomorrow afternoon</span>.', tr: '<span class="map-tag map-1">Yarın öğleden sonra</span> müşteriyle <span class="map-tag map-2">buluşuyoruz</span>.' },
                    { en: '<span class="map-tag map-2">I\'m flying</span> to London <span class="map-tag map-1">next Monday</span>.', tr: '<span class="map-tag map-1">Gelecek Pazartesi</span> Londra\'ya <span class="map-tag map-2">uçuyorum</span>.' },
                ]
            },
            {
                tag: 'Rahatsız Eden / Şikâyet', color: '#dc2626', desc: '"always" ile birlikte tekrarlayan ve sinir bozucu davranışlar.', examples: [
                    { en: '<span class="map-tag map-2">He\'s</span> <span class="map-tag map-1">always leaving</span> the lights on!', tr: 'Her zaman ışıkları açık <span class="map-tag map-1">bırakıyor</span> (<span class="map-tag map-2">O</span>)!' },
                    { en: '<span class="map-tag map-2">You\'re</span> <span class="map-tag map-1">always interrupting</span> me!', tr: 'Her zaman beni <span class="map-tag map-1">kesiyorsun</span> (<span class="map-tag map-2">Sen</span>)!' },
                ]
            },
        ],
        mistake: '❌ "I am wanting a coffee." -> want/know/love gibi stative verbs ile KULLANILMAZ.',
        tip: '💡 "right now" görürsen -> muhtemelen Present Continuous.',
    },
    {
        id: 'present_perfect',
        name: 'Present Perfect',
        tr: 'Geçmiş-Şimdi Bağlantısı',
        color: '#7c3aed',
        light: '#f5f3ff',
        border: '#ddd6fe',
        formula: 'S + have/has + V3 (past participle)',
        signal_words: ['just', 'already', 'yet', 'ever', 'never', 'since', 'for', 'recently', 'lately', 'so far', 'up to now', 'still not'],
        usages: [
            {
                tag: 'Yakın Geçmiş (just)', color: '#7c3aed', desc: 'Çok kısa süre önce tamamlanan eylemler.', examples: [
                    { en: '<span class="map-tag map-2">I</span> <span class="map-tag map-1">have just finished</span> the <span class="map-tag map-3">report</span>.', tr: '<span class="map-tag map-3">Raporu</span> az önce <span class="map-tag map-1">bitirdim</span> (<span class="map-tag map-2">Ben</span>).' },
                    { en: '<span class="map-tag map-2">She</span> <span class="map-tag map-1">has just arrived</span>.', tr: 'Az önce <span class="map-tag map-1">geldi</span> (<span class="map-tag map-2">O</span>).' },
                ]
            },
            {
                tag: 'Deneyim (ever/never)', color: '#dc2626', desc: 'Hayat boyu yaşanmış ya da yaşanmamış deneyimler.', examples: [
                    { en: '<span class="map-tag map-1">Have you ever been</span> to <span class="map-tag map-2">Japan</span>?', tr: 'Hiç <span class="map-tag map-2">Japonya</span>\'da <span class="map-tag map-1">bulundun mu</span>?' },
                    { en: '<span class="map-tag map-2">I\'ve never tried</span> <span class="map-tag map-3">sushi</span>.', tr: 'Hiç <span class="map-tag map-3">sushi</span> <span class="map-tag map-2">denemedim</span>.' },
                ]
            },
            {
                tag: 'Devam Eden Durum (since/for)', color: '#0891b2', desc: 'Geçmişte başlayıp hâlâ devam eden durumlar.', examples: [
                    { en: '<span class="map-tag map-2">She</span> <span class="map-tag map-1">has lived</span> here <span class="map-tag map-3">for ten years</span>.', tr: '<span class="map-tag map-3">On yıldır</span> burada <span class="map-tag map-1">yaşıyor</span> (<span class="map-tag map-2">O</span>).' },
                    { en: '<span class="map-tag map-2">I\'ve known</span> him <span class="map-tag map-3">since 2010</span>.', tr: '<span class="map-tag map-3">2010\'dan beri</span> onu <span class="map-tag map-2">tanıyorum</span>.' },
                ]
            },
            {
                tag: 'Sonucu Şimdi Önemli', color: '#16a34a', desc: 'Geçmişte oldu ama sonucu şu an önemli/görünür.', examples: [
                    { en: '<span class="map-tag map-2">I\'ve lost</span> my <span class="map-tag map-1">keys</span>.', tr: '<span class="map-tag map-1">Anahtarlarımı</span> <span class="map-tag map-2">kaybettim</span>.' },
                    { en: '<span class="map-tag map-2">She\'s broken</span> her <span class="map-tag map-1">leg</span>.', tr: '<span class="map-tag map-1">Bacağını</span> <span class="map-tag map-2">kırdı</span>.' },
                ]
            },
        ],
        mistake: '❌ "I have seen him yesterday." -> Kesin geçmiş zaman (yesterday/ago/last) ile KULLANILMAZ! -> "I saw him yesterday."',
        tip: '💡 since = başlangıç noktası (2010, Monday) / for = süre (3 years, a week)',
    },
    {
        id: 'present_perfect_cont',
        name: 'Present Perfect Continuous',
        tr: 'Süregelen Geçmiş-Şimdi',
        color: '#0d9488',
        light: '#f0fdfa',
        border: '#99f6e4',
        formula: 'S + have/has + been + V-ing',
        signal_words: ['for', 'since', 'how long', 'all day', 'all morning', 'lately', 'recently'],
        usages: [
            {
                tag: 'Süresi Vurgulanan Devam Eden Eylem', color: '#0d9488', desc: 'Geçmişte başladı, hâlâ devam ediyor — süreye vurgu.', examples: [
                    { en: '<span class="map-tag map-1">I\'ve been studying</span> <span class="map-tag map-2">for five hours</span>.', tr: '<span class="map-tag map-2">Beş saattir</span> <span class="map-tag map-1">çalışıyorum</span>.' },
                    { en: 'She <span class="map-tag map-1">has been waiting</span> <span class="map-tag map-2">since noon</span>.', tr: '<span class="map-tag map-2">Öğleden beri</span> <span class="map-tag map-1">bekliyor</span>.' },
                ]
            },
            {
                tag: 'Görünür Sonucu Olan Eylem', color: '#7c3aed', desc: 'Eylemin şu anki görünür etkisi/izi var.', examples: [
                    { en: 'Your <span class="map-tag map-2">eyes</span> are red. <span class="map-tag map-1">Have you been crying</span>?', tr: '<span class="map-tag map-2">Gözlerin</span> kırmızı. <span class="map-tag map-1">Ağlıyor muydun</span>?' },
                    { en: 'You\'re <span class="map-tag map-2">sweating</span>. <span class="map-tag map-1">Have you been running</span>?', tr: '<span class="map-tag map-2">Terlemişsin</span>. <span class="map-tag map-1">Koşuyor muydun</span>?' },
                ]
            },
        ],
        mistake: '❌ "I have been knowing her for years." -> Stative verbs burada da continuous yapılmaz. -> "I have known her for years."',
        tip: '💡 Perfect Simple: Kaç tane? / Perfect Continuous: Ne kadar süredir?',
    },
    {
        id: 'past_simple',
        name: 'Past Simple',
        tr: 'Geçmiş Zaman',
        color: '#b45309',
        light: '#fffbeb',
        border: '#fde68a',
        formula: 'S + V2 (past form) / S + did + not + V1',
        signal_words: ['yesterday', 'ago', 'last week/month/year', 'in 1999', 'when', 'in the past', 'once', 'then'],
        usages: [
            {
                tag: 'Tamamlanmış Geçmiş Eylem', color: '#b45309', desc: 'Kesin bir geçmiş zamanda başlayıp biten eylemler.', examples: [
                    { en: '<span class="map-tag map-2">She</span> <span class="map-tag map-1">graduated</span> in <span class="map-tag map-3">2015</span>.', tr: '<span class="map-tag map-3">2015\'te</span> <span class="map-tag map-1">mezun oldu</span> (<span class="map-tag map-2">O</span>).' },
                    { en: '<span class="map-tag map-2">He</span> <span class="map-tag map-1">called</span> me <span class="map-tag map-3">an hour ago</span>.', tr: '<span class="map-tag map-3">Bir saat önce</span> beni <span class="map-tag map-1">aradı</span> (<span class="map-tag map-2">O</span>).' },
                ]
            },
            {
                tag: 'Ardışık Geçmiş Eylemler', color: '#7c3aed', desc: 'Birbiri ardına gerçekleşen geçmiş olaylar.', examples: [
                    { en: 'She <span class="map-tag map-1">woke up</span>, <span class="map-tag map-2">had</span> breakfast, and <span class="map-tag map-3">left</span>.', tr: '<span class="map-tag map-1">Uyandı</span>, kahvaltı <span class="map-tag map-2">yaptı</span> ve <span class="map-tag map-3">ayrıldı</span>.' },
                ]
            },
            {
                tag: 'Geçmişteki Alışkanlık', color: '#dc2626', desc: 'Artık yapılmayan geçmiş alışkanlıklar ("used to" ile de ifade edilir).', examples: [
                    { en: 'As a child, I <span class="map-tag map-1">walked</span> to school <span class="map-tag map-2">every day</span>.', tr: 'Çocukken <span class="map-tag map-2">her gün</span> okula <span class="map-tag map-1">yürürdüm</span>.' },
                    { en: 'He <span class="map-tag map-1">played</span> guitar when he <span class="map-tag map-2">was young</span>.', tr: '<span class="map-tag map-2">Gençken</span> gitar <span class="map-tag map-1">çalardı</span>.' },
                ]
            },
        ],
        mistake: '❌ "I have seen him yesterday." -> "yesterday" kesin zaman = Past Simple zorunlu.',
        tip: '💡 Hikaye anlatırken ana fiil Past Simple, arkaplan Past Continuous olur.',
    },
    {
        id: 'past_continuous',
        name: 'Past Continuous',
        tr: 'Geçmişte Süregelen Eylem',
        color: '#0369a1',
        light: '#f0f9ff',
        border: '#bae6fd',
        formula: 'S + was/were + V-ing',
        signal_words: ['while', 'when', 'as', 'at that moment', 'at 8 o\'clock yesterday', 'all evening'],
        usages: [
            {
                tag: 'Arkaplan / Atmosfer', color: '#0369a1', desc: 'Başka bir eylem oluştuğunda devam etmekte olan eylem.', examples: [
                    { en: 'I <span class="map-tag map-1">was reading</span> <span class="map-tag map-2">when she called</span>.', tr: '<span class="map-tag map-2">O aradığında</span> kitap <span class="map-tag map-1">okuyordum</span>.' },
                    { en: 'It <span class="map-tag map-1">was raining</span> <span class="map-tag map-2">when we arrived</span>.', tr: '<span class="map-tag map-2">Geldiğimizde</span> yağmur <span class="map-tag map-1">yağıyordu</span>.' },
                ]
            },
            {
                tag: 'Eş Zamanlı Geçmiş Eylemler', color: '#16a34a', desc: 'İki eylem aynı anda devam ediyordu.', examples: [
                    { en: '<span class="map-tag map-1">While she was cooking</span>, <span class="map-tag map-2">he was setting</span> the table.', tr: '<span class="map-tag map-1">O yemek yaparken</span>, <span class="map-tag map-2">o masayı kuruyordu</span>.' },
                ]
            },
            {
                tag: 'Nazik İstek', color: '#7c3aed', desc: 'Kibarca bir şey sormak için.', examples: [
                    { en: 'I <span class="map-tag map-1">was wondering</span> if you <span class="map-tag map-2">could help</span> me.', tr: 'Bana <span class="map-tag map-2">yardım edip edemeyeceğini</span> <span class="map-tag map-1">merak ediyordum</span>.' },
                ]
            },
        ],
        mistake: '❌ when+Past Simple + while+Past Continuous -> birbirini karıştırma!\n"When I was sleeping" ✓ / "While I slept" ✗ (genellikle)',
        tip: '💡 "when" -> kısa, tamamlanan eylem (P.Simple) / "while" -> devam eden eylem (P.Continuous)',
    },
    {
        id: 'past_perfect',
        name: 'Past Perfect',
        tr: 'Geçmişin Geçmişi',
        color: '#6d28d9',
        light: '#f5f3ff',
        border: '#ddd6fe',
        formula: 'S + had + V3 (past participle)',
        signal_words: ['before', 'after', 'by the time', 'already', 'when', 'as soon as', 'until', 'no sooner...than', 'hardly/scarcely...when'],
        usages: [
            {
                tag: 'Daha Önce Tamamlanan Eylem', color: '#6d28d9', desc: 'Geçmişte iki olay: biri diğerinden önce tamamlanmış.', examples: [
                    { en: 'When I <span class="map-tag map-3">arrived</span>, the meeting <span class="map-tag map-1">had already started</span>.', tr: '<span class="map-tag map-3">Geldiğimde</span> toplantı çoktan <span class="map-tag map-1">başlamıştı</span>.' },
                    { en: 'She <span class="map-tag map-1">had left</span> <span class="map-tag map-2">before I called</span>.', tr: '<span class="map-tag map-2">Ben aramadan önce</span> <span class="map-tag map-1">ayrılmıştı</span>.' },
                ]
            },
            {
                tag: 'Koşul (3. Tip)', color: '#dc2626', desc: '3. Tip conditional cümlelerinde zorunlu kullanım.', examples: [
                    { en: 'If I <span class="map-tag map-1">had studied</span> harder, I <span class="map-tag map-2">would have passed</span>.', tr: 'Daha çok <span class="map-tag map-1">çalışmış olsaydım</span>, <span class="map-tag map-2">geçerdim</span>.' },
                ]
            },
            {
                tag: 'Wish (Pişmanlık)', color: '#b45309', desc: 'Geçmişe yönelik dilek ve pişmanlıklar.', examples: [
                    { en: 'I <span class="map-tag map-1">wish I had told</span> her the <span class="map-tag map-2">truth</span>.', tr: '<span class="map-tag map-1">Keşke</span> ona <span class="map-tag map-2">gerçeği söylemiş olsaydım</span>.' },
                    { en: 'I <span class="map-tag map-1">wish I hadn\'t eaten</span> <span class="map-tag map-2">so much</span>.', tr: '<span class="map-tag map-1">Keşke</span> <span class="map-tag map-2">bu kadar çok yemeseydim</span>.' },
                ]
            },
        ],
        mistake: '❌ Her zaman gerekli değil! Zaman zarfı (before/after) bağlamı netleştiriyorsa Past Simple yetebilir.',
        tip: '💡 Kronoloji: 1. Olay = Past Perfect / 2. Olay = Past Simple',
    },
    {
        id: 'past_perfect_cont',
        name: 'Past Perfect Continuous',
        tr: 'Geçmişin Devam Eden Geçmişi',
        color: '#0f766e',
        light: '#f0fdfa',
        border: '#99f6e4',
        formula: 'S + had + been + V-ing',
        signal_words: ['for', 'since', 'before', 'when', 'how long', 'all day'],
        usages: [
            {
                tag: 'Süresine Vurgu Yapılan Geçmiş Eylem', color: '#0f766e', desc: 'Bir geçmiş olaydan önce ne kadar süredir devam ettiği önemli.', examples: [
                    { en: '<span class="map-tag map-2">She</span> <span class="map-tag map-1">had been waiting</span> <span class="map-tag map-3">for two hours</span> <span class="map-tag map-4">when he finally arrived</span>.', tr: '<span class="map-tag map-4">O nihayet geldiğinde</span> <span class="map-tag map-3">iki saattir</span> <span class="map-tag map-1">beklemekteydi</span> (<span class="map-tag map-2">O</span>).' },
                    { en: '<span class="map-tag map-2">They</span> <span class="map-tag map-1">had been arguing</span> <span class="map-tag map-3">all morning</span>.', tr: '<span class="map-tag map-3">Tüm sabah</span> <span class="map-tag map-1">tartışmaktaydılar</span> (<span class="map-tag map-2">Onlar</span>).' },
                ]
            },
            {
                tag: 'Görünür Sonucun Nedeni', color: '#7c3aed', desc: 'Geçmişte bir noktadaki görünür durumun nedeni.', examples: [
                    { en: '<span class="map-tag map-2">He</span> was exhausted because he <span class="map-tag map-1">had been working</span> <span class="map-tag map-3">since dawn</span>.', tr: 'Yorgundu çünkü <span class="map-tag map-3">şafaktan beri</span> <span class="map-tag map-1">çalışmaktaydı</span> (<span class="map-tag map-2">He</span>).' },
                ]
            },
        ],
        mistake: '❌ Çok az kullanılır — sadece süreye gerçekten vurgu gerektiğinde tercih et.',
        tip: '💡 = Past Perfect\'in "Continuous" versiyonu. Süre + geçmişin geçmişi.',
    },
    {
        id: 'future_simple',
        name: 'Future Simple (will)',
        tr: 'Gelecek Zaman',
        color: '#15803d',
        light: '#f0fdf4',
        border: '#bbf7d0',
        formula: 'S + will + V1',
        signal_words: ['tomorrow', 'next week/year', 'soon', 'in the future', 'someday', 'one day', 'I think/believe/expect', 'probably', 'I\'m sure'],
        usages: [
            {
                tag: 'Anlık Karar', color: '#15803d', desc: 'Konuşma anında verilen ani, planlanmamış karar.', examples: [
                    { en: '"It\'s cold." – "<span class="map-tag map-2">I</span> <span class="map-tag map-1">\'ll close</span> the <span class="map-tag map-3">window</span>."', tr: '"Soğuk." – "<span class="map-tag map-3">Pencereyi</span> <span class="map-tag map-1">kapatayım</span> (<span class="map-tag map-2">Ben</span>)."' },
                    { en: '"<span class="map-tag map-2">I</span> <span class="map-tag map-1">\'ll have</span> the <span class="map-tag map-3">soup</span>, please."', tr: '"<span class="map-tag map-2">Ben</span> <span class="map-tag map-3">çorba</span> <span class="map-tag map-1">alacağım</span>, lütfen."' },
                ]
            },
            {
                tag: 'Tahmin & Öngörü', color: '#f59e0b', desc: 'Kanıta dayalı olmayan, kişisel tahminler.', examples: [
                    { en: 'I think <span class="map-tag map-2">it</span> <span class="map-tag map-1">will rain</span> <span class="map-tag map-3">tomorrow</span>.', tr: 'Sanırım <span class="map-tag map-3">yarın</span> <span class="map-tag map-2">yağmur</span> <span class="map-tag map-1">yağacak</span>.' },
                    { en: '<span class="map-tag map-2">She</span> <span class="map-tag map-1">\'ll probably be</span> late again.', tr: 'Muhtemelen yine <span class="map-tag map-1">geç kalacak</span> (<span class="map-tag map-2">O</span>).' },
                ]
            },
            {
                tag: 'Söz & Teklif & Tehdit', color: '#dc2626', desc: 'Vaatler, teklifler, tehditler ve ricalar.', examples: [
                    { en: 'I <span class="map-tag map-1">will always love</span> you.', tr: 'Seni her zaman <span class="map-tag map-1">seveceğim</span>.' },
                    { en: 'I <span class="map-tag map-1">\'ll help</span> you with <span class="map-tag map-2">that</span>.', tr: '<span class="map-tag map-2">Onunla</span> ilgili sana <span class="map-tag map-1">yardım edeceğim</span>.' },
                ]
            },
            {
                tag: 'Koşul Cümleleri (1. Tip)', color: '#7c3aed', desc: 'Gerçekleşmesi mümkün koşullar.', examples: [
                    { en: 'If it rains, <span class="map-tag map-2">I</span> <span class="map-tag map-1">will stay</span> <span class="map-tag map-3">home</span>.', tr: 'Yağmur yağarsa <span class="map-tag map-3">evde</span> <span class="map-tag map-1">kalacağım</span> (<span class="map-tag map-2">Ben</span>).' },
                    { en: 'Unless you hurry, <span class="map-tag map-2">you</span> <span class="map-tag map-1">\'ll miss</span> the <span class="map-tag map-3">bus</span>.', tr: 'Acele etmezsen <span class="map-tag map-3">otobüsü</span> <span class="map-tag map-1">kaçıran sensin</span> (<span class="map-tag map-2">Sen</span>).' },
                ]
            },
        ],
        mistake: '❌ "If it will rain, I\'ll stay home." -> Zaman/koşul yan cümleciklerinde will KULLANILMAZ!',
        tip: '💡 Will: Anlık karar + tahmin. Going to: Önceden planlanmış.',
    },
    {
        id: 'be_going_to',
        name: 'Be Going To',
        tr: 'Planlanmış Gelecek',
        color: '#059669',
        light: '#ecfdf5',
        border: '#a7f3d0',
        formula: 'S + am/is/are + going to + V1',
        signal_words: ['tonight', 'this weekend', 'next month', 'soon', 'I\'ve decided', 'our plan is', 'look!', 'I can see...'],
        usages: [
            {
                tag: 'Önceden Planlanmış Karar', color: '#059669', desc: 'Konuşmadan önce alınmış, düşünülmüş kararlar.', examples: [
                    { en: '<span class="map-tag map-2">We\'re going to buy</span> a <span class="map-tag map-1">new car</span> <span class="map-tag map-3">next month</span>.', tr: '<span class="map-tag map-3">Gelecek ay</span> <span class="map-tag map-1">yeni bir araba</span> <span class="map-tag map-2">alacağız</span>.' },
                    { en: '<span class="map-tag map-2">She\'s going to start</span> a <span class="map-tag map-1">diet</span> on <span class="map-tag map-3">Monday</span>.', tr: '<span class="map-tag map-3">Pazartesi</span> <span class="map-tag map-1">diyete</span> <span class="map-tag map-2">başlayacak</span>.' },
                ]
            },
            {
                tag: 'Kanıta Dayalı Tahmin', color: '#dc2626', desc: 'Görebildiğin bir kanıta dayanarak yapılan tahmin.', examples: [
                    { en: 'Look at those <span class="map-tag map-2">clouds</span>! It <span class="map-tag map-1">is going to rain</span>.', tr: 'Şu <span class="map-tag map-2">bulutlara</span> bak! Yağmur <span class="map-tag map-1">yağacak</span>.' },
                    { en: 'Be careful! <span class="map-tag map-2">You</span> <span class="map-tag map-1">are going to fall</span>!', tr: 'Dikkat et! <span class="map-tag map-1">Düşeceksin</span> (<span class="map-tag map-2">Sen</span>)!' },
                ]
            },
        ],
        mistake: '❌ "I\'m going to close the window" (anlık karar değil planlanmış olmalı) -> "I\'ll close it" daha doğal.',
        tip: '💡 Kanıt gözle görülebiliyorsa -> going to ✓ / "I think/believe" varsa -> will ✓',
    },
    {
        id: 'future_continuous',
        name: 'Future Continuous',
        tr: 'Gelecekte Süregelen Eylem',
        color: '#0284c7',
        light: '#f0f9ff',
        border: '#bae6fd',
        formula: 'S + will + be + V-ing',
        signal_words: ['at this time tomorrow', 'in two hours', 'this time next week', 'at 8 o\'clock tomorrow'],
        usages: [
            {
                tag: 'Belirli Bir Gelecek Anda Süregelen Eylem', color: '#0284c7', desc: 'Gelecekte belirtilen bir anda devam ediyor olacak.', examples: [
                    { en: '<span class="map-tag map-2">This time tomorrow</span>, <span class="map-tag map-1">I\'ll be flying</span> to <span class="map-tag map-3">Paris</span>.', tr: '<span class="map-tag map-2">Yarın bu vakitte</span> <span class="map-tag map-3">Paris</span>\'e <span class="map-tag map-1">uçuyor olacağım</span>.' },
                    { en: '<span class="map-tag map-2">At 8 PM tonight</span>, <span class="map-tag map-1">she\'ll be performing</span> on <span class="map-tag map-3">stage</span>.', tr: '<span class="map-tag map-2">Bu gece 20:00\'de</span> <span class="map-tag map-3">sahnede</span> performans <span class="map-tag map-1">sergiliyor olacak</span>.' },
                ]
            },
            {
                tag: 'Doğal Gelecek Planı', color: '#7c3aed', desc: 'Zaten planlanmış, akışa göre gerçekleşecek eylem.', examples: [
                    { en: '<span class="map-tag map-2">I\'ll be seeing</span> the <span class="map-tag map-1">doctor</span> <span class="map-tag map-3">anyway</span>.', tr: '<span class="map-tag map-3">Zaten</span> <span class="map-tag map-1">doktoru</span> <span class="map-tag map-2">görüyor olacağım</span> (akış gereği).' },
                ]
            },
            {
                tag: 'Nazik Soru', color: '#16a34a', desc: 'Birinin planlarını kibarca öğrenmek için.', examples: [
                    { en: '<span class="map-tag map-1">Will you be using</span> the <span class="map-tag map-2">car</span> tonight?', tr: 'Bu gece <span class="map-tag map-2">arabayı</span> <span class="map-tag map-1">kullanıyor olacak mısın</span>?' },
                    { en: '<span class="map-tag map-1">Will you be needing</span> any <span class="map-tag map-2">help</span>?', tr: 'Hiç <span class="map-tag map-2">yardıma</span> <span class="map-tag map-1">ihtiyacın olacak mı</span>?' },
                ]
            },
        ],
        mistake: '❌ Çok sık kullanmak Türkçe konuşanlar için zorlayıcı. Sadece süreye/ana vurgu gerektiğinde tercih et.',
        tip: '💡 "at this time tomorrow" gördüğünde Future Continuous\'u düşün.',
    },
    {
        id: 'future_perfect',
        name: 'Future Perfect',
        tr: 'Gelecekte Tamamlanacak Eylem',
        color: '#7e22ce',
        light: '#faf5ff',
        border: '#e9d5ff',
        formula: 'S + will + have + V3',
        signal_words: ['by then', 'by tomorrow', 'by the end of', 'by the time', 'before', 'in two weeks'],
        usages: [
            {
                tag: 'Belirli Bir Gelecek Zamana Kadar Tamamlanacak', color: '#7e22ce', desc: 'Belirtilen bir gelecek an geldiğinde eylem tamamlanmış olacak.', examples: [
                    { en: '<span class="map-tag map-3">By 2030</span>, <span class="map-tag map-2">she</span> <span class="map-tag map-1">will have finished</span> her degree.', tr: '<span class="map-tag map-3">2030\'a gelindiğinde</span> diplomasını <span class="map-tag map-1">almış olacak</span> (<span class="map-tag map-2">O</span>).' },
                    { en: '<span class="map-tag map-3">By the time</span> you arrive, <span class="map-tag map-2">I</span> <span class="map-tag map-1">will have cooked</span>.', tr: 'Sen <span class="map-tag map-3">gelene kadar</span> <span class="map-tag map-2">ben</span> <span class="map-tag map-1">pişirmiş olacağım</span>.' },
                ]
            },
        ],
        mistake: '❌ Günlük konuşmada nadir — akademik/resmi metinlerde ve YDS sorularında sıklıkla çıkar.',
        tip: '💡 "by + gelecek zaman" = Future Perfect\'in tetiği.',
    },
    {
        id: 'future_perfect_cont',
        name: 'Future Perfect Continuous',
        tr: 'Gelecekte Süregelen Tamamlanmış',
        color: '#0f766e',
        light: '#f0fdfa',
        border: '#99f6e4',
        formula: 'S + will + have + been + V-ing',
        signal_words: ['by then', 'for', 'by the time', 'how long'],
        usages: [
            {
                tag: 'Geleceğe Kadar Sürecek Eylemin Süresi', color: '#0f766e', desc: 'Ne kadar süredir devam edeceğine vurgu.', examples: [
                    { en: '<span class="map-tag map-3">By next year</span>, <span class="map-tag map-2">I</span> <span class="map-tag map-1">will have been working</span> <span class="map-tag map-4">for a decade</span>.', tr: '<span class="map-tag map-3">Gelecek yıl</span>, <span class="map-tag map-4">on yıldır</span> <span class="map-tag map-1">çalışmakta olacağım</span> (<span class="map-tag map-2">Ben</span>).' },
                    { en: '<span class="map-tag map-3">By midnight</span>, <span class="map-tag map-2">we</span> <span class="map-tag map-1">will have been sitting</span> here <span class="map-tag map-4">for 6 hours</span>.', tr: '<span class="map-tag map-3">Gece yarısına kadar</span>, <span class="map-tag map-4">6 saattir</span> burada <span class="map-tag map-1">oturuyor olacağız</span> (<span class="map-tag map-2">Biz</span>).' },
                ]
            },
        ],
        mistake: '❌ Çok ileri düzey — YDS\'de nadiren çıkar. Anlamını bil, formülünü tanı yeter.',
        tip: '💡 En karmaşık tense. = "will have been" + V-ing. Süreye vurgu.',
    },
];

// ── HTML Template ────────────────────────────────────────────
function buildTenseGuideHTML() {
    const groupedHTML = `
<div class="max-w-4xl mx-auto px-4 py-10" id="tg2-root">

  <!-- Action Bar (Print) -->
  <div class="flex justify-end mb-4 no-print">
      <button onclick="window.print()" class="print-btn flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg active:scale-95">
          <i class="fas fa-file-pdf"></i> PDF İndir / Yazdır
      </button>
  </div>

  <!-- Hero -->
  <div class="text-center mb-10">
    <div class="inline-flex items-center gap-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-3 rounded-2xl shadow-xl mb-5">
      <i class="fas fa-clock-rotate-left text-xl"></i>
      <span class="font-bold text-lg tracking-wide" style="font-family:'Playfair Display',serif;">İngilizce Tense Rehberi</span>
    </div>
    <h2 class="text-3xl font-extrabold text-slate-800 mb-2" style="font-family:'Playfair Display',serif;">Tüm Zamanlar — Kullanım Rehberi</h2>
    <p class="text-slate-500 text-sm max-w-xl mx-auto">12 İngilizce zaman, gerçek kullanım bağlamlarıyla, örnek cümlelerle ve yaygın hatalar ile birlikte.</p>
  </div>

  <!-- Quick Nav -->
  <div class="flex flex-wrap gap-2 justify-center mb-10 no-print" id="tense-quick-nav">
    ${TENSES.map(t => `
      <button onclick="tg2ScrollTo('${t.id}')"
        class="text-xs font-bold px-3 py-1.5 rounded-full border transition-all hover:shadow-md"
        style="border-color:${t.color}33; color:${t.color}; background:${t.light};">
        ${t.name}
      </button>`).join('')}
  </div>

  <!-- Tense Cards -->
  <div class="space-y-5" id="tense-cards">
    ${TENSES.map(t => buildTenseCard(t)).join('')}
  </div>

</div>

<style>
.tg2-tag { display:inline-flex; align-items:center; gap:5px; font-size:0.7rem; font-weight:800; padding:2px 8px; border-radius:999px; }
.tg2-example { background:#f8fafc; border-left:3px solid #e2e8f0; border-radius:0 0.5rem 0.5rem 0; padding:0.5rem 0.75rem; margin-top:0.35rem; }
.tg2-en { font-style:italic; color:#1e293b; font-size:0.875rem; font-weight:500; }
.tg2-tr { font-size:0.75rem; color:#64748b; margin-top:2px;}
.tg2-formula { font-family: 'Courier New', monospace; font-size:0.8rem; background:#1e293b; color:#e2e8f0; padding:0.4rem 0.9rem; border-radius:0.5rem; display:inline-block; }
.tg2-signal { display:inline-flex; align-items:center; font-size:0.7rem; background:#f1f5f9; color:#475569; border-radius:999px; padding:2px 8px; margin:2px; font-weight:600; }
.tg2-mistake { background:#fff1f2; border:1px solid #fecdd3; border-radius:0.75rem; padding:0.6rem 0.9rem; font-size:0.8rem; color:#881337; }
.tg2-tip { background:#fefce8; border:1px solid #fde68a; border-radius:0.75rem; padding:0.6rem 0.9rem; font-size:0.8rem; color:#713f12; }
</style>`;
    return groupedHTML;
}

function buildTenseCard(t) {
    const usagesHTML = t.usages.map(u => `
    <div class="mb-4">
      <div class="flex items-center gap-2 mb-2">
        <span class="tg2-tag" style="background:${u.color}18; color:${u.color};">${u.tag}</span>
        <span class="text-xs text-slate-400">${u.desc}</span>
      </div>
      ${u.examples.map(ex => `
        <div class="tg2-example" style="border-left-color:${u.color}55;">
          <div class="tg2-en">${ex.en}</div>
          <div class="map-tr-sentence">${ex.tr}</div>
        </div>`).join('')}
    </div>`).join('');

    const signalsHTML = t.signal_words.map(w =>
        `<span class="tg2-signal">${w}</span>`).join('');

    return `
  <div id="${t.id}" class="rounded-2xl border-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
       style="border-color:${t.border};">
    <!-- Card header -->
    <div class="flex items-center justify-between px-5 py-4 cursor-pointer"
         style="background:${t.light};" onclick="tg2Toggle('body-${t.id}', 'chv-${t.id}')">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-extrabold shadow-sm"
             style="background:${t.color};">T</div>
        <div>
          <p class="font-extrabold text-slate-800 text-base">${t.name}</p>
          <p class="text-xs font-medium" style="color:${t.color};">${t.tr}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <span class="tg2-formula">${t.formula}</span>
        <i id="chv-${t.id}" class="fas fa-chevron-down text-slate-400 text-xs transition-transform duration-300"></i>
      </div>
    </div>

    <!-- Card body -->
    <div id="body-${t.id}" class="hidden px-5 pb-5 pt-4 bg-white">

      <!-- Signal words -->
      <div class="mb-5">
        <p class="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2">⏰ Zaman Zarfları / Signal Words</p>
        <div class="flex flex-wrap">${signalsHTML}</div>
      </div>

      <!-- Usages -->
      <div class="mb-5">
        <p class="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-3">🎯 Kullanım Alanları</p>
        ${usagesHTML}
      </div>

      <!-- Mistake & Tip -->
      <div class="grid sm:grid-cols-2 gap-3">
        <div class="tg2-mistake"><p class="font-bold mb-0.5">❌ Yaygın Hata</p>${t.mistake.replace(/\n/g, '<br>')}</div>
        <div class="tg2-tip"><p class="font-bold mb-0.5">💡 Akılda Kal</p>${t.tip}</div>
      </div>
    </div>
  </div>`;
}

// ── Functions ────────────────────────────────────────────────
function tg2Toggle(bodyId, chevId) {
    const body = document.getElementById(bodyId);
    const chev = document.getElementById(chevId);
    if (!body) return;
    const hidden = body.classList.contains('hidden');
    body.classList.toggle('hidden', !hidden);
    if (chev) chev.style.transform = hidden ? 'rotate(180deg)' : 'rotate(0deg)';
}

function tg2ScrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Auto-open if closed
    const body = document.getElementById(`body-${id}`);
    const chev = document.getElementById(`chv-${id}`);
    if (body && body.classList.contains('hidden')) {
        body.classList.remove('hidden');
        if (chev) chev.style.transform = 'rotate(180deg)';
    }
}

function initTenseGuide2() {
    const container = document.getElementById('tab-tenseguide');
    if (!container) return;
    container.innerHTML = buildTenseGuideHTML();
}

window.initTenseGuide2 = initTenseGuide2;
window.tg2Toggle = tg2Toggle;
window.tg2ScrollTo = tg2ScrollTo;
