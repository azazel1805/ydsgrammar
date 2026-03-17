/* ============================================================
   reportedspeech.js - Reported Speech (Dolayli Anlati) Rehberi
   ============================================================ */

const RS_DATA = {
  tenseShift: [
    { direct: 'Present Simple', reported: 'Past Simple', ex_d: 'I work here.', ex_r: 'He said he worked there.' },
    { direct: 'Present Continuous', reported: 'Past Continuous', ex_d: 'I am working.', ex_r: 'She said she was working.' },
    { direct: 'Present Perfect', reported: 'Past Perfect', ex_d: 'I have finished.', ex_r: 'He said he had finished.' },
    { direct: 'Past Simple', reported: 'Past Perfect', ex_d: 'I went there.', ex_r: 'She said she had gone there.' },
    { direct: 'Past Continuous', reported: 'Past Perfect Continuous', ex_d: 'I was sleeping.', ex_r: 'He said he had been sleeping.' },
    { direct: 'will', reported: 'would', ex_d: 'I will call you.', ex_r: 'She said she would call me.' },
    { direct: 'can', reported: 'could', ex_d: 'I can help.', ex_r: 'He said he could help.' },
    { direct: 'may', reported: 'might', ex_d: 'I may come.', ex_r: 'She said she might come.' },
    { direct: 'must', reported: 'had to', ex_d: 'I must leave.', ex_r: 'He said he had to leave.' },
    { direct: 'shall', reported: 'should / would', ex_d: 'Shall I help?', ex_r: 'He asked if he should help.' },
  ],
  timeRef: [
    { direct: 'now', reported: 'then / at that moment' },
    { direct: 'today', reported: 'that day' },
    { direct: 'yesterday', reported: 'the day before / the previous day' },
    { direct: 'tomorrow', reported: 'the next day / the following day' },
    { direct: 'last week', reported: 'the week before / the previous week' },
    { direct: 'next week', reported: 'the following week' },
    { direct: 'here', reported: 'there' },
    { direct: 'this', reported: 'that' },
    { direct: 'these', reported: 'those' },
    { direct: 'ago', reported: 'before / earlier' },
  ],
  types: [
    {
      id: 'rs_statements',
      name: 'Statements (Bildiri Cumlesi)',
      color: '#2563eb',
      light: '#eff6ff',
      border: '#bfdbfe',
      formula: 'say/tell + (that) + reported clause',
      usages: [
        {
          tag: 'say vs tell Farki', color: '#2563eb',
          desc: '"say" -> nesne almaz. "tell" -> kisi nesnesi gerektirir.',
          examples: [
            { en: `<span class="map-tag map-1">He said</span> (that) <span class="map-tag map-2">he was</span> tired.`, tr: `Yorgun <span class="map-tag map-2">olduğunu</span> <span class="map-tag map-1">söyledi</span>.` },
            { en: `<span class="map-tag map-1">He told me</span> (that) <span class="map-tag map-2">he was</span> tired.`, tr: `Bana yorgun <span class="map-tag map-2">olduğunu</span> <span class="map-tag map-1">söyledi</span>.` },
            { en: '<span class="map-tag map-1">He told</span> her <span class="map-tag map-2">the truth</span>.', tr: 'Ona <span class="map-tag map-2">gerçeği</span> <span class="map-tag map-1">söyledi</span>.' },
          ]
        },
        {
          tag: 'Tense Backshift', color: '#7c3aed',
          desc: 'Reporting verb gecmisteyse ana cumlenin tense\'i bir adim geriye kayar.',
          examples: [
            { en: '"I <span class="map-tag map-1">live</span> in London." -> She said she <span class="map-tag map-1">lived</span> in London.', tr: '"Londra\'da <span class="map-tag map-1">yaşıyorum</span>." -> Londra\'da <span class="map-tag map-1">yaşadığını</span> söyledi.' },
            { en: '"I <span class="map-tag map-1">have been waiting</span>." -> He said he <span class="map-tag map-1">had been waiting</span>.', tr: '"<span class="map-tag map-1">Bekliyordum</span>." -> <span class="map-tag map-1">Beklediğini</span> söyledi.' },
          ]
        },
        {
          tag: 'Backshift Gerekmeyebilir', color: '#16a34a',
          desc: 'Hala gercek olan durumlar, genel gercekler ve reporting verb "says" ise backshift gerekmez.',
          examples: [
            { en: 'She <span class="map-tag map-1">says</span> she <span class="map-tag map-2">is</span> a doctor.', tr: 'Doktor <span class="map-tag map-2">olduğunu</span> <span class="map-tag map-1">söylüyor</span>.' },
            { en: 'He <span class="map-tag map-1">said</span> the Earth <span class="map-tag map-2">is</span> round.', tr: 'Dünyanın yuvarlak <span class="map-tag map-2">olduğunu</span> <span class="map-tag map-1">söyledi</span>.' },
          ]
        },
      ],
      mistake: 'YANLIS: "He said me that..." -> "He told me that..." / "He said that..."',
      tip: 'KURAL: say = nesnesiz / tell = kisi nesnesi zorunlu',
    },
    {
      id: 'rs_questions',
      name: 'Questions (Sorular)',
      color: '#0891b2',
      light: '#ecfeff',
      border: '#a5f3fc',
      formula: 'ask (sb) + if/whether | wh-word + S + V (positive order)',
      usages: [
        {
          tag: 'Yes/No Sorulari (if/whether)', color: '#0891b2',
          desc: 'Evet/ilanin cevabi beklenen sorular "if" veya "whether" ile aktarilir.',
          examples: [
            { en: `"<span class="map-tag map-2">Are you</span> tired?" -> <span class="map-tag map-1">He asked if</span> I was tired.`, tr: `"<span class="map-tag map-2">Yorgun musun</span>?" -> Yorgun <span class="map-tag map-1">olup olmadığımı sordu</span>.` },
            { en: `"<span class="map-tag map-2">Have you eaten</span>?" -> <span class="map-tag map-1">She asked whether</span> I had eaten.`, tr: `"<span class="map-tag map-2">Yedin mi</span>?" -> Yiyip <span class="map-tag map-1">yemediğimi sordu</span>.` },
          ]
        },
        {
          tag: 'Wh- Sorulari', color: '#7c3aed',
          desc: 'Soru kelimesi ayni kalir; soru dizisi -> normal cumle dizisi (S+V).',
          examples: [
            { en: '"Where <span class="map-tag map-2">do you live</span>?" -> <span class="map-tag map-1">She asked where</span> I lived.', tr: '"Nerede <span class="map-tag map-2">yaşıyorsun</span>?" -> Nerede <span class="map-tag map-1">yaşadığımı sordu</span>.' },
            { en: '"What time <span class="map-tag map-2">did you arrive</span>?" -> <span class="map-tag map-1">He asked what time</span> I had arrived.', tr: '"Saat kaçta <span class="map-tag map-2">geldin</span>?" -> Saat kaçta <span class="map-tag map-1">geldiğimi sordu</span>.' },
          ]
        },
      ],
      mistake: 'YANLIS: "She asked where did I live." -> Soru dizisi DONUSTU: "where I lived" (normal cumle sirasi!)',
      tip: 'Reported question\'da soru isaretini kapiyi kapatir -- normal cumle yapi turu gelir.',
    },
    {
      id: 'rs_commands',
      name: 'Commands & Requests (Emir & Rica)',
      color: '#dc2626',
      light: '#fff1f2',
      border: '#fecdd3',
      formula: 'tell / ask / order / warn + sb + to-infinitive (olumlu) | not + to-infinitive (olumsuz)',
      usages: [
        {
          tag: 'Emir (tell/order/command)', color: '#dc2626',
          desc: 'Dogrudan emirler "tell/order + kisi + to-inf" ile aktarilir.',
          examples: [
            { en: '"<span class="map-tag map-2">Close</span> the door!" -> <span class="map-tag map-1">She told me to close</span> the door.', tr: '"Kapıyı <span class="map-tag map-2">kapat</span>!" -> Kapıyı <span class="map-tag map-1">kapatmamı söyledi</span>.' },
            { en: '"<span class="map-tag map-2">Don\'t be</span> late!" -> <span class="map-tag map-1">He told us not to be</span> late.', tr: '"Geç <span class="map-tag map-2">kalmayın</span>!" -> Geç <span class="map-tag map-1">kalmamamızı söyledi</span>.' },
          ]
        },
        {
          tag: 'Rica (ask)', color: '#7c3aed',
          desc: 'Nazik istekler "ask + kisi + to-inf" ile aktarilir.',
          examples: [
            { en: '"Could you <span class="map-tag map-2">help</span> me?" -> <span class="map-tag map-1">She asked me to help</span> her.', tr: '"<span class="map-tag map-2">Yardım</span> eder misin?" -> <span class="map-tag map-1">Yardım etmemi istedi</span>.' },
            { en: '"Please <span class="map-tag map-2">don\'t tell</span> anyone." -> <span class="map-tag map-1">He asked her not to tell</span> anyone.', tr: '"Kimseye <span class="map-tag map-2">söyleme</span> lütfen." -> Kimseye <span class="map-tag map-1">söylememesini rica etti</span>.' },
          ]
        },
      ],
      mistake: 'YANLIS: "He told me that close the door." -> to-infinitive gerekir: "told me to close"',
      tip: 'Olumsuz emirlerde: told/asked + sb + NOT + to-infinitive',
    },
    {
      id: 'rs_suggestions',
      name: 'Suggestions & Offers (Oneri & Teklif)',
      color: '#16a34a',
      light: '#f0fdf4',
      border: '#bbf7d0',
      formula: 'suggest + v-ing | suggest + (that) + S + should/V1',
      usages: [
        {
          tag: 'suggest Yapilari', color: '#16a34a',
          desc: '"suggest" to-infinitive almaz -- -ing veya that-clause kullanir.',
          examples: [
            { en: '"Let\'s <span class="map-tag map-2">go</span> to the cinema." -> <span class="map-tag map-1">He suggested going</span> to the cinema.', tr: '"Sinemaya <span class="map-tag map-2">gidelim</span>." -> Sinemaya <span class="map-tag map-1">gitmeyi önerdi</span>.' },
            { en: '"Why don\'t you <span class="map-tag map-2">try</span> again?" -> <span class="map-tag map-1">She suggested that I should try</span> again.', tr: '"Neden yeniden <span class="map-tag map-2">denemiyorsun</span>?" -> Yeniden <span class="map-tag map-1">denememi önerdi</span>.' },
          ]
        },
        {
          tag: 'offer / promise / refuse / agree', color: '#0891b2',
          desc: 'Bu fiiller to-infinitive ile kullanilir.',
          examples: [
            { en: '"I\'ll <span class="map-tag map-2">pay</span> for it." -> <span class="map-tag map-1">He offered to pay</span> for it.', tr: '"Ben <span class="map-tag map-2">öderim</span>." -> <span class="map-tag map-1">Ödemeyi teklif etti</span>.' },
            { en: '"Yes, I\'ll <span class="map-tag map-2">do</span> it." -> <span class="map-tag map-1">She agreed to do</span> it.', tr: '"Evet, <span class="map-tag map-2">yaparım</span>." -> <span class="map-tag map-1">Yapmayı kabul etti</span>.' },
            { en: '"No, I <span class="map-tag map-2">won\'t come</span>." -> <span class="map-tag map-1">He refused to come</span>.', tr: '"Hayır, <span class="map-tag map-2">gelmeyeceğim</span>." -> <span class="map-tag map-1">Gelmeyi reddetti</span>.' },
          ]
        },
      ],
      mistake: 'YANLIS: "He suggested to go." -> "suggest" to-inf almaz!\nDOGRU: "He suggested going." / "He suggested (that) we go."',
      tip: 'suggest, recommend, propose -> -ing veya that-clause',
    },
    {
      id: 'rs_reporting_verbs',
      name: 'Reporting Verbs (Aktarim Fiilleri)',
      color: '#7c3aed',
      light: '#f5f3ff',
      border: '#ddd6fe',
      formula: 'Fiilin aldigi yapiya gore degisir',
      usages: [
        {
          tag: 'V + to-inf', color: '#7c3aed',
          desc: 'agree, offer, promise, refuse, threaten, claim, decide',
          examples: [
            { en: '"I will <span class="map-tag map-2">help</span>." -> <span class="map-tag map-1">He promised to help</span>.', tr: '"<span class="map-tag map-2">Yardım</span> edeceğim." -> <span class="map-tag map-1">Yardım edeceğine söz verdi</span>.' },
            { en: '"I <span class="map-tag map-2">will not go</span>!" -> <span class="map-tag map-1">She threatened not to go</span>.', tr: '"<span class="map-tag map-2">Gitmeyeceğim</span>!" -> <span class="map-tag map-1">Gitmemekle tehdit etti</span>.' },
          ]
        },
        {
          tag: 'V + sb + to-inf', color: '#0891b2',
          desc: 'tell, ask, warn, advise, remind, invite, order, forbid, persuade, beg',
          examples: [
            { en: '"Be <span class="map-tag map-2">careful</span>!" -> <span class="map-tag map-1">He warned me to be</span> careful.', tr: '"<span class="map-tag map-2">Dikkatli</span> ol!" -> <span class="map-tag map-1">Dikkatli olmam için uyardı</span>.' },
            { en: '"You should <span class="map-tag map-2">see</span> a doctor." -> <span class="map-tag map-1">She advised me to see</span> a doctor.', tr: '"Doktora <span class="map-tag map-2">görünün</span>." -> Doktora <span class="map-tag map-1">görünmemi tavsiye etti</span>.' },
          ]
        },
        {
          tag: 'V + -ing', color: '#dc2626',
          desc: 'admit, deny, suggest, recommend, accuse sb of, apologise for, insist on',
          examples: [
            { en: '"I <span class="map-tag map-2">took</span> it." -> <span class="map-tag map-1">He admitted taking</span> it.', tr: '"<span class="map-tag map-2">Aldım</span>." -> <span class="map-tag map-1">Aldığını kabul etti</span>.' },
            { en: '"I <span class="map-tag map-2">didn\'t do</span> it." -> <span class="map-tag map-1">She denied doing</span> it.', tr: '"Ben <span class="map-tag map-2">yapmadım</span>." -> <span class="map-tag map-1">Yapmadığını inkar etti</span>.' },
          ]
        },
        {
          tag: 'V + (that) clause', color: '#16a34a',
          desc: 'say, explain, claim, suggest, admit, complain, deny, add, remark, announce',
          examples: [
            { en: '"I am <span class="map-tag map-2">exhausted</span>." -> <span class="map-tag map-1">He complained (that) he was</span> exhausted.', tr: '"<span class="map-tag map-2">Bitkin</span> durumdayım." -> <span class="map-tag map-1">Bitkin olduğundan yakındı</span>.' },
          ]
        },
      ],
      mistake: 'Reporting verb\'in yapisi ezberlenmelidir -- yanlis yapi cumleyı bozar.',
      tip: 'En sikca YDS\'de cikaname: told/asked/warned/advised/suggested/refused/promised',
    },
  ],
};

// -- Builder --------------------------------------------------
function buildRSHTML() {
  const tenseRows = RS_DATA.tenseShift.map(r => `
    <tr class="hover:bg-slate-50">
      <td class="py-2 px-3 text-xs font-semibold text-slate-700">${r.direct}</td>
      <td class="py-2 px-3 text-xs font-bold text-violet-700">${r.reported}</td>
      <td class="py-2 px-3 text-xs text-slate-500 italic">"${r.ex_d}"</td>
      <td class="py-2 px-3 text-xs text-slate-600">${r.ex_r}</td>
    </tr>`).join('');

  const timeRows = RS_DATA.timeRef.map(r => `
    <tr class="hover:bg-slate-50">
      <td class="py-2 px-4 text-xs font-bold text-slate-700">${r.direct}</td>
      <td class="py-2 px-4 text-xs font-semibold text-teal-700">${r.reported}</td>
    </tr>`).join('');

  const typeCards = RS_DATA.types.map(t => buildRSCard(t)).join('');

  return `
<div class="max-w-4xl mx-auto px-4 py-10" id="rs-root">
  <!-- Action Bar (Print) -->
  <div class="flex justify-end mb-4 no-print">
      <button onclick="window.print()" class="print-btn flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg active:scale-95">
          <i class="fas fa-file-pdf"></i> PDF İndir / Yazdır
      </button>
  </div>

  <div class="text-center mb-10">
    <div class="inline-flex items-center gap-3 bg-gradient-to-r from-violet-800 to-violet-900 text-white px-6 py-3 rounded-2xl shadow-xl mb-5">
      <i class="fas fa-quote-right text-xl"></i>
      <span class="font-bold text-lg tracking-wide" style="font-family:'Playfair Display',serif;">Reported Speech Rehberi</span>
    </div>
    <h2 class="text-3xl font-extrabold text-slate-800 mb-2" style="font-family:'Playfair Display',serif;">Dolayli Anlati -- Tam Rehber</h2>
    <p class="text-slate-500 text-sm max-w-xl mx-auto">Tense backshift, soru donusumu, emir/rica/oneri aktarimi ve reporting verb yapilari -- tum kurallari orneklerle.</p>
  </div>

  <!-- Tense Backshift Table -->
  <div class="rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-8">
    <div class="bg-slate-900 text-white px-5 py-3 flex items-center gap-2">
      <i class="fas fa-table text-sm text-slate-400"></i>
      <p class="font-bold text-sm">Tense Backshift Tablosu</p>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 border-b border-slate-200">
          <tr>
            <th class="text-left py-2 px-3 text-xs text-slate-500 font-bold">Direct Speech</th>
            <th class="text-left py-2 px-3 text-xs text-slate-500 font-bold">Reported Speech</th>
            <th class="text-left py-2 px-3 text-xs text-slate-500 font-bold">Direct Ornek</th>
            <th class="text-left py-2 px-3 text-xs text-slate-500 font-bold">Reported Ornek</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">${tenseRows}</tbody>
      </table>
    </div>
  </div>

  <!-- Time Reference Changes -->
  <div class="rounded-2xl border border-teal-200 overflow-hidden shadow-sm mb-10">
    <div class="bg-teal-800 text-white px-5 py-3">
      <p class="font-bold text-sm">Zaman & Yer Referanslari (Degisen Ifadeler)</p>
    </div>
    <div class="grid sm:grid-cols-2 overflow-x-auto">
      <table class="w-full text-sm border-r border-teal-100">
        <thead class="bg-teal-50"><tr>
          <th class="text-left py-2 px-4 text-xs text-teal-700 font-bold">Direct</th>
          <th class="text-left py-2 px-4 text-xs text-teal-700 font-bold">Reported</th>
        </tr></thead>
        <tbody class="divide-y divide-teal-50">${timeRows}</tbody>
      </table>
    </div>
  </div>

  <!-- Type Cards -->
  <div class="space-y-4">${typeCards}</div>

</div>

<style>
.rs-example { background:#f8fafc; border-left:3px solid #e2e8f0; border-radius:0 0.5rem 0.5rem 0; padding:0.5rem 0.75rem; margin-top:0.35rem; }
.rs-en { font-style:italic; color:#1e293b; font-size:0.875rem; font-weight:600; white-space:pre-line; }
.rs-tr { font-size:0.75rem; color:#64748b; margin-top:2px; }
.rs-mistake { background:#fff1f2; border:1px solid #fecdd3; border-radius:0.75rem; padding:0.65rem 0.9rem; font-size:0.8rem; color:#881337; white-space:pre-line; }
.rs-tip { background:#fefce8; border:1px solid #fde68a; border-radius:0.75rem; padding:0.65rem 0.9rem; font-size:0.8rem; color:#713f12; white-space:pre-line; }
.rs-tag { display:inline-flex; font-size:0.7rem; font-weight:800; padding:2px 8px; border-radius:999px; }
</style>`;
}

function buildRSCard(t) {
  const usagesHTML = t.usages.map(u => `
    <div class="mb-4">
      <div class="flex flex-wrap items-start gap-2 mb-2">
        <span class="rs-tag" style="background:${u.color}18; color:${u.color};">${u.tag}</span>
        <span class="text-xs text-slate-400 leading-snug">${u.desc}</span>
      </div>
      ${u.examples.map(ex => `
        <div class="rs-example" style="border-left-color:${u.color}55;">
          <p class="rs-en">${ex.en}</p>
          <p class="rs-tr">-> ${ex.tr}</p>
        </div>`).join('')}
    </div>`).join('');

  return `
  <div id="${t.id}" class="rounded-2xl border-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
       style="border-color:${t.border};">
    <div class="px-5 py-4 cursor-pointer flex items-center justify-between flex-wrap gap-3"
         style="background:${t.light};" onclick="rsToggle('rsbody-${t.id}', 'rschv-${t.id}')">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-sm"
             style="background:${t.color};"><i class="fas fa-comment-dots"></i></div>
        <div>
          <p class="font-extrabold text-slate-800">${t.name}</p>
          <code class="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">${t.formula}</code>
        </div>
      </div>
      <i id="rschv-${t.id}" class="fas fa-chevron-down text-slate-400 text-xs transition-transform duration-300"></i>
    </div>
    <div id="rsbody-${t.id}" class="hidden px-5 pb-5 pt-4 bg-white">
      <div class="mb-5">${usagesHTML}</div>
      <div class="grid sm:grid-cols-2 gap-3">
        <div class="rs-mistake"><p class="font-bold mb-1">Yaygin Hata</p>${t.mistake}</div>
        <div class="rs-tip"><p class="font-bold mb-1">Aklda Kal</p>${t.tip}</div>
      </div>
    </div>
  </div>`;
}

function rsToggle(bodyId, chevId) {
  const body = document.getElementById(bodyId);
  const chev = document.getElementById(chevId);
  if (!body) return;
  const hidden = body.classList.contains('hidden');
  body.classList.toggle('hidden', !hidden);
  if (chev) chev.style.transform = hidden ? 'rotate(180deg)' : 'rotate(0)';
}

function initReportedSpeech() {
  const container = document.getElementById('tab-reportedspeech');
  if (!container) return;
  container.innerHTML = buildRSHTML();
}

window.initReportedSpeech = initReportedSpeech;
window.rsToggle = rsToggle;
