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
                tag: 'Alışkanlık & Rutin', color: '#16a34a', desc: 'Tekrarlayan eylemler, alışkanlıklar ve rutinler.', examples: [
                    { en: `<span class="map-tag map-2">She</span> <span class="map-tag map-1">drinks</span> coffee every morning.`, tr: `Her sabah kahve <span class="map-tag map-1">içer</span> (<span class="map-tag map-2">O</span>).` },
                    { en: 'He never <span class="font-bold">eats</span> fast food.', tr: 'Hiç fast food yemez.' },
                ]
            },
            {
                tag: 'Genel Gerçekler & Doğa Yasaları', color: '#dc2626', desc: 'Değişmeyen gerçekler ve bilimsel yasalar.', examples: [
                    { en: 'Water <span class="font-bold">boils</span> at 100°C.', tr: 'Su 100°C\'de kaynar.' },
                    { en: 'The Earth <span class="font-bold">revolves</span> around the Sun.', tr: 'Dünya Güneş\'in etrafında döner.' },
                ]
            },
            {
                tag: 'Program & Tarifeli Gelecek', color: '#7c3aed', desc: 'Resmi program ve tarifeler (uçuş, maç, taks vb.).', examples: [
                    { en: 'The train <span class="font-bold">leaves</span> at 9 AM.', tr: 'Tren sabah 9\'da kalkıyor.' },
                    { en: 'The match <span class="font-bold">starts</span> at 8 PM tonight.', tr: 'Maç bu gece 20\'de başlıyor.' },
                ]
            },
            {
                tag: 'Duygular & Düşünceler (Stative Verbs)', color: '#b45309', desc: 'Eylem değil, durum bildiren fiiller (like, know, want...).', examples: [
                    { en: 'I <span class="font-bold">know</span> the answer.', tr: 'Cevabı biliyorum.' },
                    { en: 'She <span class="font-bold">loves</span> classical music.', tr: 'Klasik müziği seviyor.' },
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
                    { en: `She <span class="map-tag map-1">is reading</span> <span class="map-tag map-2">a book</span> right now.`, tr: `Şu anda <span class="map-tag map-2">bir kitap</span> <span class="map-tag map-1">okuyor</span>.` },
                    { en: 'They <span class="font-bold">are playing</span> football in the garden.', tr: 'Bahçede futbol oynuyorlar.' },
                ]
            },
            {
                tag: 'Geçici Durum', color: '#7c3aed', desc: 'Kalıcı olmayan, geçici durumlar.', examples: [
                    { en: 'I<span class="font-bold">\'m staying</span> at my friend\'s place this week.', tr: 'Bu hafta arkadaşımın evinde kalıyorum.' },
                    { en: 'She<span class="font-bold">\'s working</span> from home these days.', tr: 'Bu günlerde evden çalışıyor.' },
                ]
            },
            {
                tag: 'Kesin Planlanmış Gelecek', color: '#16a34a', desc: 'Yakın gelecekte organize edilmiş planlar (bilet alınmış, saat ayarlanmış vb.).', examples: [
                    { en: 'We<span class="font-bold">\'re meeting</span> the client tomorrow afternoon.', tr: 'Yarın öğleden sonra müşteriyle buluşuyoruz.' },
                    { en: 'I<span class="font-bold">\'m flying</span> to London next Monday.', tr: 'Gelecek Pazartesi Londra\'ya uçuyorum.' },
                ]
            },
            {
                tag: 'Rahatsız Eden / Şikâyet', color: '#dc2626', desc: '"always" ile birlikte tekrarlayan ve sinir bozucu davranışlar.', examples: [
                    { en: 'He\'s always leaving the lights on!', tr: 'Her zaman ışıkları açık bırakıyor!' },
                    { en: 'You\'re always interrupting me!', tr: 'Her zaman beni kesiyorsun!' },
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
                    { en: 'I <span class="font-bold">have just finished</span> the report.', tr: 'Raporu az önce bitirdim.' },
                    { en: 'She has just arrived.', tr: 'Az önce geldi.' },
                ]
            },
            {
                tag: 'Deneyim (ever/never)', color: '#dc2626', desc: 'Hayat boyu yaşanmış ya da yaşanmamış deneyimler.', examples: [
                    { en: '<span class="font-bold">Have you ever been</span> to Japan?', tr: 'Hiç Japonya\'ya gittin mi?' },
                    { en: 'I\'ve never tried sushi.', tr: 'Hiç sushi denemedim.' },
                ]
            },
            {
                tag: 'Devam Eden Durum (since/for)', color: '#0891b2', desc: 'Geçmişte başlayıp hâlâ devam eden durumlar.', examples: [
                    { en: `She <span class="map-tag map-1">has lived</span> here <span class="map-tag map-2">for</span> ten years.`, tr: `On yıl<span class="map-tag map-2">DIR</span> burada <span class="map-tag map-1">yaşıyor</span>.` },
                    { en: `I<span class="map-tag map-1">'ve known</span> him <span class="map-tag map-2">since</span> 2010.`, tr: `2010'dan <span class="map-tag map-2">BERİ</span> onu <span class="map-tag map-1">tanıyorum</span>.` },
                ]
            },
            {
                tag: 'Sonucu Şimdi Önemli', color: '#16a34a', desc: 'Geçmişte oldu ama sonucu şu an önemli/görünür.', examples: [
                    { en: 'I<span class="font-bold">\'ve lost</span> my keys. (can\'t get in now)', tr: 'Anahtarlarımı kaybettim. (şimdi giremiyorum)' },
                    { en: 'She<span class="font-bold">\'s broken</span> her leg. (she\'s on crutches)', tr: 'Bacağını kırdı. (şimdi koltuk değneğiyle geziyor)' },
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
                    { en: 'I<span class="font-bold">\'ve been studying</span> for five hours.', tr: 'Beş saattir çalışıyorum.' },
                    { en: 'She <span class="font-bold">has been waiting</span> since noon.', tr: 'Öğleden beri bekliyor.' },
                ]
            },
            {
                tag: 'Görünür Sonucu Olan Eylem', color: '#7c3aed', desc: 'Eylemin şu anki görünür etkisi/izi var.', examples: [
                    { en: 'Your eyes are red. <span class="font-bold">Have you been crying</span>?', tr: 'Gözlerin kırmızı. Ağlıyor muydun?' },
                    { en: 'You\'re sweating. <span class="font-bold">Have you been running</span>?', tr: 'Terlemişsin. Koşuyor muydun?' },
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
                    { en: 'She <span class="font-bold">graduated</span> from university in 2015.', tr: '2015\'te üniversiteden mezun oldu.' },
                    { en: 'He <span class="font-bold">called</span> me an hour ago.', tr: 'Bir saat önce beni aradı.' },
                ]
            },
            {
                tag: 'Ardışık Geçmiş Eylemler', color: '#7c3aed', desc: 'Birbiri ardına gerçekleşen geçmiş olaylar.', examples: [
                    { en: 'She <span class="font-bold">woke up</span>, <span class="font-bold">had</span> breakfast, and <span class="font-bold">left</span>.', tr: '"Uyandı, kahvaltı yaptı ve ayrıldı.' },
                ]
            },
            {
                tag: 'Geçmişteki Alışkanlık', color: '#dc2626', desc: 'Artık yapılmayan geçmiş alışkanlıklar ("used to" ile de ifade edilir).', examples: [
                    { en: 'As a child, I walked to school every day.', tr: 'Çocukken her gün yürüyerek okula giderdim.' },
                    { en: 'He played the guitar when he was young.', tr: 'Genç olduğunda gitar çalardı.' },
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
                    { en: 'I <span class="font-bold">was reading</span> when she called.', tr: 'O aradığında kitap okuyordum.' },
                    { en: 'It <span class="font-bold">was raining</span> when we arrived.', tr: 'Geldiğimizde yağmur yağıyordu.' },
                ]
            },
            {
                tag: 'Eş Zamanlı Geçmiş Eylemler', color: '#16a34a', desc: 'İki eylem aynı anda devam ediyordu.', examples: [
                    { en: 'While she <span class="font-bold">was cooking</span>, he <span class="font-bold">was setting</span> the table.', tr: 'O yemek pişirirken, o masayı kuruyordu.' },
                ]
            },
            {
                tag: 'Nazik İstek', color: '#7c3aed', desc: 'Kibarca bir şey sormak için.', examples: [
                    { en: 'I was wondering if you could help me.', tr: 'Bana yardım edip edemeyeceğinizi merak ediyordum.' },
                    { en: 'I was hoping you\'d agree.', tr: 'Kabul edeceğini umuyordum.' },
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
                    { en: 'When I arrived, the meeting <span class="font-bold">had already started</span>.', tr: 'Geldiğimde toplantı çoktan başlamıştı.' },
                    { en: 'She <span class="font-bold">had left</span> before I called.', tr: 'Ben aramadan önce ayrılmıştı.' },
                ]
            },
            {
                tag: 'Koşul (3. Tip)', color: '#dc2626', desc: '3. Tip conditional cümlelerinde zorunlu kullanım.', examples: [
                    { en: 'If I had studied harder, I would have passed.', tr: 'Daha çok çalışmış olsaydım, geçerdim.' },
                    { en: 'She wouldn\'t have been late if she had left earlier.', tr: 'Daha erken çıksaydı geç kalmazdı.' },
                ]
            },
            {
                tag: 'Wish (Pişmanlık)', color: '#b45309', desc: 'Geçmişe yönelik dilek ve pişmanlıklar.', examples: [
                    { en: 'I wish I had told her the truth.', tr: 'Keşke ona gerçeği söylemiş olsaydım.' },
                    { en: 'I wish I hadn\'t eaten so much.', tr: 'Keşke bu kadar yememiş olsaydım.' },
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
                    { en: 'She <span class="font-bold">had been waiting</span> for two hours when he finally arrived.', tr: 'O geldiğinde iki saattir bekliyordu.' },
                    { en: 'They <span class="font-bold">had been arguing</span> all morning before they made up.', tr: 'Barışmadan önce sabahtan beri tartışıyorlardı.' },
                ]
            },
            {
                tag: 'Görünür Sonucun Nedeni', color: '#7c3aed', desc: 'Geçmişte bir noktadaki görünür durumun nedeni.', examples: [
                    { en: 'He was exhausted because he had been working since dawn.', tr: 'Yorgundu çünkü şafaktan beri çalışıyordu.' },
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
                    { en: '"It\'s cold." – "I\'ll close the window."', tr: '"Soğuk." – "Pencereyi kapatayım."' },
                    { en: '"I\'ll have the soup, please."', tr: '"Çorba alacağım, lütfen."' },
                ]
            },
            {
                tag: 'Tahmin & Öngörü', color: '#f59e0b', desc: 'Kanıta dayalı olmayan, kişisel tahminler.', examples: [
                    { en: 'I think it <span class="font-bold">will rain</span> tomorrow.', tr: 'Sanırım yarın yağmur yağacak.' },
                    { en: 'She<span class="font-bold">\'ll probably be</span> late again.', tr: 'Muhtemelen yine geç kalacak.' },
                ]
            },
            {
                tag: 'Söz & Teklif & Tehdit', color: '#dc2626', desc: 'Vaatler, teklifler, tehditler ve ricalar.', examples: [
                    { en: 'I will always love you.', tr: 'Seni her zaman seveceğim.' },
                    { en: 'I\'ll help you with that.', tr: 'Sana yardım ederim.' },
                ]
            },
            {
                tag: 'Koşul Cümleleri (1. Tip)', color: '#7c3aed', desc: 'Gerçekleşmesi mümkün koşullar.', examples: [
                    { en: 'If it rains, I will stay home.', tr: 'Yağmur yağarsa evde kalacağım.' },
                    { en: 'Unless you hurry, you\'ll miss the bus.', tr: 'Acele etmezsen otobüsü kaçırırsın.' },
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
                    { en: 'We\'re going to buy a new car next month.', tr: 'Gelecek ay yeni bir araba alacağız.' },
                    { en: 'She\'s going to start a diet on Monday.', tr: 'Pazartesi diyete başlayacak.' },
                ]
            },
            {
                tag: 'Kanıta Dayalı Tahmin', color: '#dc2626', desc: 'Görebildiğin bir kanıta dayanarak yapılan tahmin.', examples: [
                    { en: 'Look at those clouds! It<span class="font-bold">\'s going to rain</span>.', tr: 'Şu bulutlara bak! Yağmur yağacak.' },
                    { en: 'Be careful! You<span class="font-bold">\'re going to fall</span>!', tr: 'Dikkat et! Düşeceksin!' },
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
                    { en: 'This time tomorrow, I\'ll be flying to Paris.', tr: 'Yarın bu saatte Paris\'e uçuyor olacağım.' },
                    { en: 'At 8 PM tonight, she\'ll be performing on stage.', tr: 'Bu gece 20\'de sahnede performans sergileyecek.' },
                ]
            },
            {
                tag: 'Doğal Gelecek Planı', color: '#7c3aed', desc: 'Zaten planlanmış, akışa göre gerçekleşecek eylem.', examples: [
                    { en: 'I\'ll be seeing the doctor next week anyway.', tr: 'Zaten gelecek hafta doktora gidecektim.' },
                ]
            },
            {
                tag: 'Nazik Soru', color: '#16a34a', desc: 'Birinin planlarını kibarca öğrenmek için.', examples: [
                    { en: 'Will you be using the car tonight?', tr: 'Bu gece arabayı kullanacak mısın?' },
                    { en: 'Will you be needing any help tomorrow?', tr: 'Yarın yardıma ihtiyacın olacak mı?' },
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
                    { en: 'By 2026, she <span class="font-bold">will have finished</span> her PhD.', tr: '2026\'ya kadar doktorasını bitirmiş olacak.' },
                    { en: 'By the time you arrive, I <span class="font-bold">will have cooked</span> dinner.', tr: 'Sen geldiğinde akşam yemeğini pişirmiş olacağım.' },
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
                    { en: 'By next year, I will have been working here for a decade.', tr: 'Gelecek yıl, burada on yıldır çalışıyor olacağım.' },
                    { en: 'By the time the film ends, we will have been sitting here for three hours.', tr: 'Film bittiğinde üç saattir burada oturuyor olacağız.' },
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
          <p class="tg2-en">"${ex.en}"</p>
          <p class="tg2-tr">-> ${ex.tr}</p>
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
