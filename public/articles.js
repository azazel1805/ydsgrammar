/* ============================================================
   articles.js - Articles (a/an/the/zero) Rehberi
   ============================================================ */

const ART_SECTIONS = [
    {
        id: 'art_a_an',
        name: 'A / AN -- Belirsiz Article',
        color: '#2563eb',
        light: '#eff6ff',
        border: '#bfdbfe',
        icon: 'A',
        usages: [
            {
                tag: 'Ilk Bahsedilen / Bilinmeyen', color: '#2563eb', examples: [
                    { en: `I saw <span class="map-tag map-1">a</span> <span class="map-tag map-2">man</span> in the street.`, tr: `Sokakta <span class="map-tag map-1">bir</span> <span class="map-tag map-2">adam</span> gördüm.` },
                    { en: `She bought <span class="map-tag map-1">a</span> <span class="map-tag map-2">car</span> yesterday.`, tr: `Dün <span class="map-tag map-1">bir</span> <span class="map-tag map-2">araba</span> satın aldı.` },
                ]
            },
            {
                tag: 'Meslekler', color: '#16a34a', examples: [
                    { en: `She is <span class="map-tag map-1">a</span> <span class="map-tag map-2">doctor</span>.`, tr: `O <span class="map-tag map-1">bir</span> <span class="map-tag map-2">doktor</span>dur.` },
                    { en: `He works as <span class="map-tag map-1">an</span> <span class="map-tag map-2">engineer</span>.`, tr: `O <span class="map-tag map-1">bir</span> <span class="map-tag map-2">mühendis</span> olarak çalışıyor.` },
                ]
            },
            {
                tag: 'Ornek / Sinif Uyeligi', color: '#7c3aed', examples: [
                    { en: `<span class="map-tag map-1">A</span> <span class="map-tag map-2">dog</span> is <span class="map-tag map-3">a</span> loyal animal.`, tr: `<span class="map-tag map-1">Bir</span> <span class="map-tag map-2">köpek</span> sadık <span class="map-tag map-3">bir</span> hayvandır.` },
                    { en: `<span class="map-tag map-1">An</span> <span class="map-tag map-2">apple</span> a day keeps the doctor away.`, tr: `Günde <span class="map-tag map-1">bir</span> <span class="map-tag map-2">elma</span> doktoru uzak tutar.` },
                ]
            },
            {
                tag: 'Sayilarla (per / each)', color: '#b45309', examples: [
                    { en: `She earns $50 <span class="map-tag map-1">an</span> <span class="map-tag map-2">hour</span>.`, tr: `<span class="map-tag map-2">Saatte</span> 50 <span class="map-tag map-1">bir</span> dolar (saat başı) kazanıyor.` },
                    { en: `Take the medicine twice <span class="map-tag map-1">a</span> <span class="map-tag map-2">day</span>.`, tr: `İlacı <span class="map-tag map-2">günde</span> iki <span class="map-tag map-1">kez</span> alın.` },
                ]
            },
            {
                tag: 'a vs an secimi', color: '#dc2626', examples: [
                    { en: '<span class="map-tag map-1">a university</span>, <span class="map-tag map-2">a European</span>', tr: '<span class="map-tag map-1">bir üniversite</span>, <span class="map-tag map-2">bir Avrupalı</span> (sessizle başlar)' },
                    { en: '<span class="map-tag map-1">an hour</span>, <span class="map-tag map-2">an FBI agent</span>', tr: '<span class="map-tag map-1">bir saat</span>, <span class="map-tag map-2">bir FBI ajanı</span> (sesliyle başlar)' },
                ]
            },
        ],
        mistake: 'a/an seciminde YAZIYI degil SESI esas al!\n"a hour" YANLIS -> "an hour" (h sessiz, sesi /aur/)\n"an university" YANLIS -> "a university" (u sesi /yoo/)',
        tip: 'a = consonant sound ile baslayan kelimeler\nan = vowel sound ile baslayan kelimeler',
    },
    {
        id: 'art_the',
        name: 'THE -- Belirli Article',
        color: '#0891b2',
        light: '#ecfeff',
        border: '#a5f3fc',
        icon: 'THE',
        usages: [
            {
                tag: 'Ikinci Bahsedilen / Bilineni', color: '#0891b2', examples: [
                    { en: `I saw a man. <span class="map-tag map-1">The</span> <span class="map-tag map-2">man</span> was wearing a red coat.`, tr: `Bir adam gördüm. <span class="map-tag map-1">(Sözü edilen)</span> <span class="map-tag map-2">Adam</span> kırmizı palto giyiyordu.` },
                    { en: `Can you close <span class="map-tag map-1">the</span> <span class="map-tag map-2">door</span>, please?`, tr: `Lütfen <span class="map-tag map-2">kapıyı</span> <span class="map-tag map-1">(bilinen kapı)</span> kapatır mısın?` },
                ]
            },
            {
                tag: 'Tek / Esiz Seyler', color: '#7c3aed', examples: [
                    { en: 'The sun rises in the east.', tr: 'Gunes doguda dogar.' },
                    { en: 'The moon, the president, the Eiffel Tower', tr: 'Dunya uzerinde tek olan seyler.' },
                ]
            },
            {
                tag: 'Superlative / Ordinal', color: '#dc2626', examples: [
                    { en: `She is <span class="map-tag map-1">the best</span> <span class="map-tag map-2">student</span>.`, tr: `O <span class="map-tag map-1">en iyi</span> <span class="map-tag map-2">öğrencidir</span>.` },
                    { en: `This is <span class="map-tag map-1">the weight</span> of <span class="map-tag map-2">the first</span> time.`, tr: `Bu <span class="map-tag map-2">ilk</span> <span class="map-tag map-1">seferin</span> ağırlığıdır.` },
                ]
            },
            {
                tag: 'Daglar/Okyanuslar/Nehirler/Gazete vb.', color: '#16a34a', examples: [
                    { en: 'the Amazon, the Pacific, the Alps, the Sahara', tr: 'Cografik ozgun isimler (cogul formda)' },
                    { en: 'the Times, the BBC, the UN, the EU', tr: 'Gazete, organizasyon isimleri' },
                ]
            },
            {
                tag: 'Nationality (halki)', color: '#b45309', examples: [
                    { en: 'The Turkish love tea.', tr: 'Turkler cayi sever.' },
                    { en: 'The French are known for their cuisine.', tr: 'Fransizlar mutfaklariyla bilinir.' },
                ]
            },
        ],
        mistake: '"The" + proper noun genelde YANLISTIR:\n"I visited the Turkey." YANLIS -> "I visited Turkey."\nAMAwould: "the United States / the Netherlands" -> dogru (cogul kelimeler)',
        tip: 'the = konusan ve dinleyenin birbirini anladigi, belirli olan seyler icin.',
    },
    {
        id: 'art_zero',
        name: 'Zero Article -- Article Yok',
        color: '#15803d',
        light: '#f0fdf4',
        border: '#bbf7d0',
        icon: '0',
        usages: [
            {
                tag: 'Ozel Isimler (Proper Nouns)', color: '#15803d', examples: [
                    { en: 'Turkey, London, Mount Everest, Lake Victoria', tr: 'Ulke, sehir, dag isimleri' },
                    { en: 'Dr. Smith, President Lincoln', tr: 'Unvanla birlikte kullanilan isimler' },
                ]
            },
            {
                tag: 'Cogul Genel Ifadeler', color: '#0891b2', examples: [
                    { en: 'Dogs are loyal animals. (genel)', tr: 'Kopekler sadik hayvanlardır. (hepsi)' },
                    { en: 'I love books.', tr: 'Kitaplari severim. (genel, hepsi)' },
                ]
            },
            {
                tag: 'Sayilamaz Isimler (Genel)', color: '#7c3aed', examples: [
                    { en: 'Water is essential for life.', tr: 'Su hayat icin gereklidir.' },
                    { en: 'Knowledge is power.', tr: 'Bilgi gucttur.' },
                ]
            },
            {
                tag: 'Yemek/Oyun/Ders/Dil', color: '#dc2626', examples: [
                    { en: 'I had breakfast / lunch / dinner.', tr: 'Kahvalti/oglen/aksam yedim.' },
                    { en: 'She plays chess / football / piano.', tr: 'Satranc / futbol / piyano oynar.' },
                    { en: 'He studies mathematics / speaks French.', tr: 'Matematik okur / Fransizca konusur.' },
                ]
            },
            {
                tag: 'Ulasim & Kurum (Genel)', color: '#b45309', examples: [
                    { en: 'by car / by train / by plane / on foot', tr: 'Ulasim sekilleri' },
                    { en: 'go to school / be in hospital / be at work', tr: 'Kurumlarin amaci icin (hastane = tedavi)' },
                    { en: 'go to the school (to pick up a child)', tr: 'Kurum bina olarak -> the gelir' },
                ]
            },
        ],
        mistake: '"I go to the school every day." -> ogrenci olarak gidiyorsa the GELMEZ.\n"I go to school every day." (egitim amaci -> zero article)\nAMA: "I went to the school to meet the principal." (bina olarak -> the)',
        tip: 'Genel kullanim (hepsi, her birimi, her zaman) -> zero article\nOzel, belirli, bilinen -> the',
    },
    {
        id: 'art_fixed',
        name: 'Sabit Ifadeler & Ozel Durumlar',
        color: '#9333ea',
        light: '#faf5ff',
        border: '#e9d5ff',
        icon: 'FX',
        usages: [
            {
                tag: 'Article Gerektiren Sabit Ifadeler', color: '#9333ea', examples: [
                    { en: `<span class="map-tag map-1">in the morning</span> / <span class="map-tag map-2">in the evening</span>`, tr: `<span class="map-tag map-1">sabahleyin</span> / <span class="map-tag map-2">akşamleyin</span>` },
                    { en: `play <span class="map-tag map-1">the piano</span> / <span class="map-tag map-2">the guitar</span>`, tr: `<span class="map-tag map-1">piyano</span> / <span class="map-tag map-2">gitar</span> çalmak` },
                    { en: `go to <span class="map-tag map-1">the cinema</span> / <span class="map-tag map-2">the gym</span>`, tr: `<span class="map-tag map-1">sinemaya</span> / <span class="map-tag map-2">spor salonuna</span> gitmek` },
                ]
            },
            {
                tag: 'Article Gerektirmeyen Sabit Ifadeler', color: '#dc2626', examples: [
                    { en: 'at home, at school, at work, at university', tr: 'Yer ifadeleri (amac)' },
                    { en: 'by car, by bus, by train, on foot', tr: 'Ulasim' },
                    { en: 'go to bed, go to sleep, go to church', tr: 'Rutin aktiviteler' },
                ]
            },
            {
                tag: 'Kafa Karistiran Durumlar (YDS Favorites)', color: '#b45309', examples: [
                    { en: 'in hospital (hasta olarak) vs in the hospital (ziyaretci)', tr: 'Kurumun amaci vs bina olarak' },
                    { en: 'at sea (denizde, denizci) vs on the sea (deniz kenarinda)', tr: 'Anlam farki onemli' },
                    { en: 'all the time / most of the time / some of the time', tr: 'Zaman ifadeleri' },
                ]
            },
        ],
        mistake: '"I play a piano." -> YANLIS | "I play the piano." DOGRU (calgi aletleri the ile)',
        tip: 'at night (the yok) / in the morning (the var) -- bu esitsizlik sik sorulur!',
    },
];

function buildArticlesHTML() {
    const summary = `
  <div class="rounded-2xl border border-slate-200 bg-slate-900 text-white p-5 mb-10 overflow-x-auto">
    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Hizli Ozet Tablosu</p>
    <table class="w-full text-sm min-w-[400px]">
      <thead><tr class="border-b border-slate-700">
        <th class="text-left py-2 px-3 text-slate-400 text-xs font-bold">Article</th>
        <th class="text-left py-2 px-3 text-slate-400 text-xs font-bold">Ne zaman?</th>
        <th class="text-left py-2 px-3 text-slate-400 text-xs font-bold">Ornek</th>
      </tr></thead>
      <tbody class="divide-y divide-slate-800">
        <tr><td class="py-2 px-3 text-blue-400 font-bold">a / an</td><td class="py-2 px-3 text-slate-300 text-xs">Ilk bahsedilen, bilinmeyen, meslekler, ornek</td><td class="py-2 px-3 text-slate-400 text-xs italic">I saw a dog.</td></tr>
        <tr><td class="py-2 px-3 text-cyan-400 font-bold">the</td><td class="py-2 px-3 text-slate-300 text-xs">Ikinci bahsedilen, belirli, tek, superlative</td><td class="py-2 px-3 text-slate-400 text-xs italic">The dog was big.</td></tr>
        <tr><td class="py-2 px-3 text-green-400 font-bold">zero (--)</td><td class="py-2 px-3 text-slate-300 text-xs">Ozel isimler, genel cogul, sayilamaz genel</td><td class="py-2 px-3 text-slate-400 text-xs italic">Dogs are loyal.</td></tr>
      </tbody>
    </table>
  </div>`;

    const cards = ART_SECTIONS.map(s => buildArtCard(s)).join('');

    return `
<div class="max-w-4xl mx-auto px-4 py-10" id="art-root">
  <!-- Action Bar (Print) -->
  <div class="flex justify-end mb-4 no-print">
      <button onclick="window.print()" class="print-btn flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg active:scale-95">
          <i class="fas fa-file-pdf"></i> PDF İndir / Yazdır
      </button>
  </div>
  <div class="text-center mb-10">
    <div class="inline-flex items-center gap-3 bg-gradient-to-r from-blue-800 to-blue-900 text-white px-6 py-3 rounded-2xl shadow-xl mb-5">
      <i class="fas fa-font text-xl"></i>
      <span class="font-bold text-lg tracking-wide" style="font-family:'Playfair Display',serif;">Articles Rehberi</span>
    </div>
    <h2 class="text-3xl font-extrabold text-slate-800 mb-2" style="font-family:'Playfair Display',serif;">a / an / the / zero -- Ne Zaman?</h2>
    <p class="text-slate-500 text-sm max-w-xl mx-auto">Belirsiz, belirli ve sifir article -- Turkce yapisi olmayan bu konu icin kapsamli kurallar ve YDS ornekleri.</p>
  </div>
  ${summary}
  <div class="space-y-4">${cards}</div>
</div>
<style>
.art-example{background:#f8fafc;border-left:3px solid #e2e8f0;border-radius:0 .5rem .5rem 0;padding:.5rem .75rem;margin-top:.35rem}
.art-en{font-style:italic;color:#1e293b;font-size:.875rem;font-weight:600}
.art-tr{font-size:.75rem;color:#64748b;margin-top:2px}
.art-mistake{background:#fff1f2;border:1px solid #fecdd3;border-radius:.75rem;padding:.65rem .9rem;font-size:.8rem;color:#881337;white-space:pre-line}
.art-tip{background:#fefce8;border:1px solid #fde68a;border-radius:.75rem;padding:.65rem .9rem;font-size:.8rem;color:#713f12;white-space:pre-line}
.art-tag{display:inline-flex;font-size:.7rem;font-weight:800;padding:2px 8px;border-radius:999px}
</style>`;
}

function buildArtCard(s) {
    const usagesHTML = s.usages.map(u => `
    <div class="mb-4">
      <span class="art-tag mb-2 inline-flex" style="background:${u.color}18;color:${u.color};">${u.tag}</span>
      ${u.examples.map(ex => `
        <div class="art-example" style="border-left-color:${u.color}55;">
          <p class="text-sm font-bold">${ex.en}</p>
          <div class="map-tr-sentence">${ex.tr}</div>
        </div>`).join('')}
    </div>`).join('');

    return `
  <div id="${s.id}" class="rounded-2xl border-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow" style="border-color:${s.border};">
    <div class="px-5 py-4 cursor-pointer flex items-center justify-between" style="background:${s.light};" onclick="artToggle('artbody-${s.id}','artchv-${s.id}')">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm" style="background:${s.color};">${s.icon}</div>
        <p class="font-extrabold text-slate-800">${s.name}</p>
      </div>
      <i id="artchv-${s.id}" class="fas fa-chevron-down text-slate-400 text-xs transition-transform duration-300"></i>
    </div>
    <div id="artbody-${s.id}" class="hidden px-5 pb-5 pt-4 bg-white">
      <div class="mb-4">${usagesHTML}</div>
      <div class="grid sm:grid-cols-2 gap-3">
        <div class="art-mistake"><p class="font-bold mb-1">Yaygin Hatalar</p>${s.mistake}</div>
        <div class="art-tip"><p class="font-bold mb-1">Aklda Kal</p>${s.tip}</div>
      </div>
    </div>
  </div>`;
}

function artToggle(b, c) {
    const body = document.getElementById(b);
    const chev = document.getElementById(c);
    if (!body) return;
    const hidden = body.classList.contains('hidden');
    body.classList.toggle('hidden', !hidden);
    if (chev) chev.style.transform = hidden ? 'rotate(180deg)' : 'rotate(0)';
}

function initArticles() {
    const c = document.getElementById('tab-articles');
    if (!c) return;
    c.innerHTML = buildArticlesHTML();
}

window.initArticles = initArticles;
window.artToggle = artToggle;
