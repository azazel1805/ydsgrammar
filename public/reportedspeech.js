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
            { en: 'He said (that) he was tired.', tr: 'Yorgun oldugunu soyledi.' },
            { en: 'He told me (that) he was tired.', tr: 'Bana yorgun oldugunu soyledi.' },
            { en: 'He told her the truth.', tr: 'Ona gercegi soyledi.' },
          ]
        },
        {
          tag: 'Tense Backshift', color: '#7c3aed',
          desc: 'Reporting verb gecmisteyse ana cumlenin tense\'i bir adim geriye kayar.',
          examples: [
            { en: '"I live in London." -> She said she lived in London.', tr: '"Londra\'da yasiyorum." -> Londra\'da yasadigini soyledi.' },
            { en: '"I have been waiting." -> He said he had been waiting.', tr: '"Bekliyordum." -> Bekledigini soyledi.' },
          ]
        },
        {
          tag: 'Backshift Gerekmeyebilir', color: '#16a34a',
          desc: 'Hala gercek olan durumlar, genel gercekler ve reporting verb "says" ise backshift gerekmez.',
          examples: [
            { en: 'She says she is a doctor. (hala doktor)', tr: 'Doktor oldugunu soyluyor.' },
            { en: 'He said the Earth is round. (genel gercek)', tr: 'Dunyanin yuvarlak oldugunu soyledi.' },
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
            { en: '"Are you tired?" -> He asked if I was tired.', tr: '"Yorgun musun?" -> Yorgun olup olmadigimi sordu.' },
            { en: '"Have you eaten?" -> She asked whether I had eaten.', tr: '"Yedin mi?" -> Yiyip yemedigimi sordu.' },
          ]
        },
        {
          tag: 'Wh- Sorulari', color: '#7c3aed',
          desc: 'Soru kelimesi ayni kalir; soru dizisi -> normal cumle dizisi (S+V).',
          examples: [
            { en: '"Where do you live?" -> She asked where I lived.', tr: '"Nerede yasiyorsun?" -> Nerede yasadigimi sordu.' },
            { en: '"What time did you arrive?" -> He asked what time I had arrived.', tr: '"Saat kacta geldin?" -> Saat kacta geldigimi sordu.' },
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
            { en: '"Close the door!" -> She told me to close the door.', tr: '"Kapiyi kapat!" -> Kapiyi kapatmami soyledi.' },
            { en: '"Don\'t be late!" -> He told us not to be late.', tr: '"Gec kalmayin!" -> Gec kalmamamizi soyledi.' },
          ]
        },
        {
          tag: 'Rica (ask)', color: '#7c3aed',
          desc: 'Nazik istekler "ask + kisi + to-inf" ile aktarilir.',
          examples: [
            { en: '"Could you help me?" -> She asked me to help her.', tr: '"Yardim eder misin?" -> Yardim etmemi istedi.' },
            { en: '"Please don\'t tell anyone." -> He asked her not to tell anyone.', tr: '"Kimseye soyleme lutfen." -> Kimseye soylememesini ricad etti.' },
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
            { en: '"Let\'s go to the cinema." -> He suggested going to the cinema.', tr: '"Sinemaya gidelim." -> Sinemaya gitmeyi onerdi.' },
            { en: '"Why don\'t you try again?" -> She suggested that I should try again.', tr: '"Neden yeniden denemiyorsun?" -> Yeniden denememi onerdi.' },
          ]
        },
        {
          tag: 'offer / promise / refuse / agree', color: '#0891b2',
          desc: 'Bu fiiller to-infinitive ile kullanilir.',
          examples: [
            { en: '"I\'ll pay for it." -> He offered to pay for it.', tr: '"Ben oderim." -> Odemeyi teklif etti.' },
            { en: '"Yes, I\'ll do it." -> She agreed to do it.', tr: '"Evet, yaparim." -> Yapmayı kabul etti.' },
            { en: '"No, I won\'t come." -> He refused to come.', tr: '"Hayir, gelmeyecegim." -> Gelmeyi reddetti.' },
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
            { en: '"I will help." -> He promised to help.', tr: '"Yardim edecegim." -> Yardim edecegine soz verdi.' },
            { en: '"I will not go!" -> She threatened not to go.', tr: '"Gitmeyecegim!" -> Gitmemekle tehdit etti.' },
          ]
        },
        {
          tag: 'V + sb + to-inf', color: '#0891b2',
          desc: 'tell, ask, warn, advise, remind, invite, order, forbid, persuade, beg',
          examples: [
            { en: '"Be careful!" -> He warned me to be careful.', tr: '"Dikkatli ol!" -> Dikkatli olmam icin uyardi.' },
            { en: '"You should see a doctor." -> She advised me to see a doctor.', tr: '"Doktora gorununun." -> Doktora gorunmemi tavsiye etti.' },
          ]
        },
        {
          tag: 'V + -ing', color: '#dc2626',
          desc: 'admit, deny, suggest, recommend, accuse sb of, apologise for, insist on',
          examples: [
            { en: '"I took it." -> He admitted taking it.', tr: '"Aldim." -> Aldigini kabul etti.' },
            { en: '"I didn\'t do it." -> She denied doing it.', tr: '"Ben yapamadim." -> Yapmadigini inkar etti.' },
          ]
        },
        {
          tag: 'V + (that) clause', color: '#16a34a',
          desc: 'say, explain, claim, suggest, admit, complain, deny, add, remark, announce',
          examples: [
            { en: '"I am exhausted." -> He complained (that) he was exhausted.', tr: '"Bitkin dusumduyorum." -> Bitkin dusugunden yakiniyordu.' },
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
