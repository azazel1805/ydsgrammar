/* ============================================================
   gerunds.js - Gerunds & Infinitives Rehberi
   ============================================================ */

const GI_SECTIONS = [
  {
    id: 'gi_gerund_only',
    name: 'Sadece Gerund (-ing) Alan Fiiller',
    color: '#0891b2',
    light: '#ecfeff',
    border: '#a5f3fc',
    icon: 'fa-circle-dot',
    formula: 'V + V-ing',
    verbs: ['enjoy', 'admit', 'avoid', 'deny', 'finish', 'consider', 'mind', 'suggest', 'recommend', 'risk', 'miss', 'practise', 'keep', 'delay', 'postpone', 'give up', 'put off', 'carry on'],
    examples: [
      { en: 'She enjoys reading classic novels.', note: 'NOT: enjoy to read', tr: 'Klasik roman okumaktan zevk aliyor.' },
      { en: 'He admitted taking the money.', tr: 'Parayi aldigini kabul etti.' },
      { en: 'Would you mind opening the window?', tr: 'Pencereyi acar misiniz?' },
      { en: 'They keep arguing about money.', tr: 'Para konusunda tartismaya devam ediyorlar.' },
    ],
    mistake: 'YANLIS: "I enjoy to swim." -> "I enjoy swimming."\nYANLIS: "She avoids to eat sugar." -> "She avoids eating sugar."',
    tip: 'TRICK: Bu fiillerin cogu bir eylemi DURDURMAK veya EYLEMI KENDISI hakkinda konusmakla ilgilidir.',
  },
  {
    id: 'gi_infinitive_only',
    name: 'Sadece Infinitive (to + V1) Alan Fiiller',
    color: '#15803d',
    light: '#f0fdf4',
    border: '#bbf7d0',
    icon: 'fa-arrow-right',
    formula: 'V + to + V1',
    verbs: ['want', 'hope', 'wish', 'decide', 'plan', 'arrange', 'promise', 'offer', 'agree', 'refuse', 'manage', 'fail', 'attempt', 'tend', 'seem', 'expect', 'pretend', 'appear'],
    examples: [
      { en: 'She decided to study medicine.', note: 'NOT: decided studying', tr: 'Tip okumaya karar verdi.' },
      { en: 'He managed to finish on time.', tr: 'Zamaninda bitirmeyi basardi.' },
      { en: 'They refused to cooperate.', tr: 'Isbirligi yapmayi reddettiler.' },
    ],
    mistake: 'YANLIS: "He wants eating." -> "He wants to eat."\nYANLIS: "She refused helping." -> "She refused to help."',
    tip: 'TRICK: Bu fiillerin cogu bir GELECEK EYLEM veya KARAR ile ilgilidir.',
  },
  {
    id: 'gi_both_same',
    name: 'Her Ikisini Alan Fiiller (Anlam Ayni)',
    color: '#7c3aed',
    light: '#f5f3ff',
    border: '#ddd6fe',
    icon: 'fa-equals',
    formula: 'V + V-ing / to + V1 (anlam degismez)',
    verbs: [],
    examples: [],
    pairs: [
      { v: 'begin / start / continue', e1: 'It started raining.', e2: 'It started to rain.', t: 'Yagmur basladi.' },
      { v: 'like / love / hate / prefer', e1: 'She likes swimming.', e2: 'She likes to swim.', t: 'Yuzmeyi seviyor.' },
      { v: 'intend / attempt / bother', e1: 'He attempted climbing it.', e2: 'He attempted to climb it.', t: 'Tirmanmaya calisti.' },
    ],
    mistake: 'like + -ing = genel zevk / like + to-inf = belirli durumlarda tercih\nBu nuans cok ince -- cogu zaman birbirinin yerine kullanilir.',
    tip: 'YDS\'de genellikle her ikisi de secenek olarak verilmez -- biri yanlis yapida olur.',
  },
  {
    id: 'gi_both_different',
    name: 'Her Ikisini Alan Ama Anlam Degisen Fiiller',
    color: '#dc2626',
    light: '#fff1f2',
    border: '#fecdd3',
    icon: 'fa-shuffle',
    formula: '-ing (gecmis anlami) vs to-inf (gelecek/baska anlam)',
    verbs: [],
    examples: [],
    meaning_pairs: [
      {
        verb: 'stop', cases: [
          { form: 'stop + -ing', m: 'bir eylemi birakma', e: 'He stopped smoking.', t: 'Sigara icmeyi birakti.' },
          { form: 'stop + to-inf', m: 'yapmak icin duraksamak', e: 'He stopped to smoke.', t: 'Sigara icmek icin durdu.' },
        ]
      },
      {
        verb: 'remember / forget', cases: [
          { form: '+  -ing', m: 'gecmisteki bir eylemi hatirlamak', e: 'I remember meeting her.', t: 'Onunla tanistigimi hatırlıyorum.' },
          { form: '+ to-inf', m: 'gelecekte yapilmasi gereken seyi hatırlamak', e: 'Remember to call her!', t: 'Onu aramayı unutma!' },
        ]
      },
      {
        verb: 'try', cases: [
          { form: 'try + -ing', m: 'bir yol denemek', e: 'Try adding salt.', t: 'Tuz eklemeyi dene.' },
          { form: 'try + to-inf', m: 'zorlu bir seyi basarmaya calismak', e: 'I tried to open the jar.', t: 'Kavanozu acmaya callastimdim.' },
        ]
      },
      {
        verb: 'regret', cases: [
          { form: 'regret + -ing', m: 'yapilmis bir seyden uzulmek', e: 'I regret saying that.', t: 'Bunu soyledigime pismanlık duyuyorum.' },
          { form: 'regret + to-inf', m: 'uzucu haber vermek (resmi)', e: 'We regret to inform you...', t: 'Size bildirmekten uzuntu duyaris...' },
        ]
      },
    ],
    mistake: '"I stopped to smoke." -> Sigara icmek icin durdu (birakma degil!)\nStop + -ing = birak / stop + to-inf = ara ver yapip yap',
    tip: '-ing = gecmis/suregelen eylem / to-inf = gelecek/amac (genel kural)',
  },
  {
    id: 'gi_preposition',
    name: 'Preposition + Gerund',
    color: '#b45309',
    light: '#fffbeb',
    border: '#fde68a',
    icon: 'fa-link',
    formula: 'preposition + V-ing (daima)',
    verbs: [],
    examples: [
      { en: 'She is interested in learning French.', tr: 'Fransizca ogrenmeyle ilgileniyor.' },
      { en: 'He is good at playing chess.', tr: 'Satranc oynamakta iyidir.' },
      { en: 'After finishing work, she went home.', tr: 'Isi bittikten sonra eve gitti.' },
      { en: 'I look forward to hearing from you.', tr: 'Sizden haber almayı bekliyorum.' },
      { en: 'I got used to waking up early.', tr: 'Erken kalkmaya alistim.' },
    ],
    mistake: 'YANLIS: "I look forward to see you." -> "to" burada edat!\n-> "I look forward to SEEING you."',
    tip: '"used to + V1" = gecmis aliskanlik (I used to smoke)\n"be/get used to + -ing" = bir seye alisma (I am used to waking up early)',
  },
  {
    id: 'gi_subject',
    name: 'Ozne Konumunda Gerund & Infinitive',
    color: '#0369a1',
    light: '#f0f9ff',
    border: '#bae6fd',
    icon: 'fa-heading',
    formula: 'V-ing = Subject / It + to-inf = Resmi Yapi',
    verbs: [],
    examples: [
      { en: 'Swimming is good exercise. (= To swim is...)', tr: 'Yuzme iyi bir egzersizdir.' },
      { en: 'It is important to exercise regularly.', tr: 'Duzenli egzersiz yapmak onemlidir.' },
      { en: 'It was kind OF you to help.', tr: 'Yardim etmen nazikce.' },
      { en: 'It is easy FOR us to understand.', tr: 'Anlamamiz kolay.' },
    ],
    note: 'of vs for: kind/nice/rude/clever/generous + OF (kisinin ozelligi) | easy/hard/difficult/important + FOR (eylem icin kim)',
    mistake: 'YANLIS: "It is important studying daily." -> to-inf gerekir.\n-> "It is important to study daily."',
    tip: 'YDS ceviri sorularinda "It is + adj + to-inf" yapisi cok sik cikar.',
  },
];

function buildGIHTML() {
  const cards = GI_SECTIONS.map(s => buildGICard(s)).join('');
  return `
<div class="max-w-4xl mx-auto px-4 py-10" id="gi-root">
  <!-- Action Bar (Print) -->
  <div class="flex justify-end mb-4 no-print">
      <button onclick="window.print()" class="print-btn flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg active:scale-95">
          <i class="fas fa-file-pdf"></i> PDF İndir / Yazdır
      </button>
  </div>
  <div class="text-center mb-10">
    <div class="inline-flex items-center gap-3 bg-gradient-to-r from-teal-700 to-teal-900 text-white px-6 py-3 rounded-2xl shadow-xl mb-5">
      <i class="fas fa-infinity text-xl"></i>
      <span class="font-bold text-lg tracking-wide" style="font-family:'Playfair Display',serif;">Gerund & Infinitive Rehberi</span>
    </div>
    <h2 class="text-3xl font-extrabold text-slate-800 mb-2" style="font-family:'Playfair Display',serif;">-ing mi, to + V mi?</h2>
    <p class="text-slate-500 text-sm max-w-xl mx-auto">Hangi fiilden sonra ne gelir, anlam farkliliklari, preposition kurallari ve YDS ornekleriyle.</p>
  </div>
  <div class="flex flex-wrap gap-2 justify-center mb-8">
    ${GI_SECTIONS.map(s => `
      <button onclick="giScrollTo('${s.id}')"
        class="text-xs font-bold px-3 py-1.5 rounded-full border transition-all"
        style="border-color:${s.color}44; color:${s.color}; background:${s.light};">
        ${s.name.split('(')[0].trim()}
      </button>`).join('')}
  </div>
  <div class="space-y-4">${cards}</div>
</div>
<style>
.gi-example{background:#f8fafc;border-left:3px solid #e2e8f0;border-radius:0 .5rem .5rem 0;padding:.5rem .75rem;margin-top:.35rem}
.gi-en{font-style:italic;color:#1e293b;font-size:.875rem;font-weight:600}
.gi-tr{font-size:.75rem;color:#64748b;margin-top:2px}
.gi-mistake{background:#fff1f2;border:1px solid #fecdd3;border-radius:.75rem;padding:.65rem .9rem;font-size:.8rem;color:#881337;white-space:pre-line}
.gi-tip{background:#fefce8;border:1px solid #fde68a;border-radius:.75rem;padding:.65rem .9rem;font-size:.8rem;color:#713f12;white-space:pre-line}
</style>`;
}

function buildGICard(s) {
  let body = '';

  if (s.verbs && s.verbs.length) {
    body += `<div class="flex flex-wrap gap-1.5 mb-4">${s.verbs.map(v =>
      `<span class="text-xs font-bold px-2 py-1 rounded-lg border" style="background:${s.light};color:${s.color};border-color:${s.border};">${v}</span>`
    ).join('')}</div>`;
  }

  if (s.pairs) {
    body += s.pairs.map(p => `
      <div class="bg-purple-50 border border-purple-100 rounded-xl p-3 mb-3">
        <p class="text-xs font-bold text-purple-800 mb-2">${p.v}</p>
        <div class="gi-example" style="border-left-color:#7c3aed55;">
          <p class="gi-en">"${p.e1}" = "${p.e2}"</p>
          <p class="gi-tr">-> ${p.t}</p>
        </div>
      </div>`).join('');
  }

  if (s.meaning_pairs) {
    body += s.meaning_pairs.map(item => `
      <div class="border border-red-100 rounded-xl overflow-hidden mb-3">
        <div class="bg-red-600 text-white px-4 py-2 text-sm font-bold">${item.verb}</div>
        <div class="p-4 space-y-2">
          ${item.cases.map(c => `
            <div class="gi-example" style="border-left-color:#dc262655;">
              <p class="text-xs font-bold text-red-700 mb-1">${c.form} = ${c.m}</p>
              <p class="gi-en">"${c.e}"</p>
              <p class="gi-tr">-> ${c.t}</p>
            </div>`).join('')}
        </div>
      </div>`).join('');
  }

  if (s.examples && s.examples.length) {
    body += s.examples.map(ex => `
      <div class="gi-example" style="border-left-color:${s.color}44;">
        ${ex.note ? `<p class="text-xs font-bold text-red-600 mb-1">${ex.note}</p>` : ''}
        <p class="gi-en">"${ex.en}"</p>
        <p class="gi-tr">-> ${ex.tr}</p>
      </div>`).join('');
  }

  if (s.note) {
    body += `<div class="mt-3 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 text-xs text-blue-800">${s.note}</div>`;
  }

  return `
  <div id="${s.id}" class="rounded-2xl border-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow" style="border-color:${s.border};">
    <div class="px-5 py-4 cursor-pointer flex items-center justify-between flex-wrap gap-3"
         style="background:${s.light};" onclick="giToggle('gibody-${s.id}','gichv-${s.id}')">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold" style="background:${s.color};">
          <i class="fas ${s.icon}"></i>
        </div>
        <div>
          <p class="font-extrabold text-slate-800">${s.name}</p>
          <code class="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">${s.formula}</code>
        </div>
      </div>
      <i id="gichv-${s.id}" class="fas fa-chevron-down text-slate-400 text-xs transition-transform duration-300"></i>
    </div>
    <div id="gibody-${s.id}" class="hidden px-5 pb-5 pt-4 bg-white">
      <div class="mb-4">${body}</div>
      <div class="grid sm:grid-cols-2 gap-3 mt-3">
        <div class="gi-mistake"><p class="font-bold mb-1">Yaygin Hatalar</p>${s.mistake}</div>
        <div class="gi-tip"><p class="font-bold mb-1">Aklda Kal</p>${s.tip}</div>
      </div>
    </div>
  </div>`;
}

function giToggle(b, c) {
  const body = document.getElementById(b);
  const chev = document.getElementById(c);
  if (!body) return;
  const hidden = body.classList.contains('hidden');
  body.classList.toggle('hidden', !hidden);
  if (chev) chev.style.transform = hidden ? 'rotate(180deg)' : 'rotate(0)';
}

function giScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const body = document.getElementById('gibody-' + id);
  const chev = document.getElementById('gichv-' + id);
  if (body && body.classList.contains('hidden')) {
    body.classList.remove('hidden');
    if (chev) chev.style.transform = 'rotate(180deg)';
  }
}

function initGerunds() {
  const c = document.getElementById('tab-gerunds');
  if (!c) return;
  c.innerHTML = buildGIHTML();
}

window.initGerunds = initGerunds;
window.giToggle = giToggle;
window.giScrollTo = giScrollTo;
