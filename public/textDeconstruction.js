/* =========================================
   METIN ANALIZI (DECONSTRUCTION)
 ========================================= */

const textDeconHTML = `
<div class="max-w-7xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">

    <!-- Compact Header -->
    <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
            <i class="fas fa-layer-group text-violet-700"></i>
        </div>
        <div>
            <h2 class="text-lg font-extrabold text-slate-900" style="font-family: 'Playfair Display', serif;">
                Metin Analizi <span class="text-violet-700">(Deconstruction)</span>
            </h2>
            <p class="text-slate-400 text-xs leading-relaxed hidden sm:block">
                Metni cümle cümle analiz et — basitleştirilmiş hali, gramer yapısı ve anahtar kelimeleri keşfet.
            </p>
        </div>
    </div>

    <!-- Input Row -->
    <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <textarea id="textDeconInput" placeholder="İngilizce metni buraya yapıştırın..." 
            class="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all h-24 resize-none custom-scrollbar leading-relaxed"></textarea>
        <button id="textDeconBtn" onclick="analyzeTextDeconstruction()"
            class="sm:w-36 py-3 bg-violet-700 text-white rounded-xl font-bold text-sm hover:bg-violet-900 transition-all active:scale-95 flex items-center justify-center gap-2 flex-shrink-0">
            <i class="fas fa-layer-group text-xs"></i>
            <span>Analiz Et</span>
        </button>
    </div>

    <!-- Results -->
    <div id="textDeconResult" class="hidden">
        <!-- Mobile: stacked; Desktop: side by side -->
        <div class="flex flex-col lg:flex-row gap-4">

            <!-- Left: Original Text -->
            <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col lg:w-[45%] xl:w-[40%] min-h-[300px] max-h-[70vh] overflow-hidden">
                <div class="flex items-center gap-2 mb-3 flex-shrink-0 border-b border-violet-50 pb-3">
                    <i class="fas fa-file-alt text-violet-400 text-xs"></i>
                    <h3 class="text-sm font-bold text-violet-700 uppercase tracking-widest">Orijinal Metin</h3>
                </div>
                <div id="textDeconVisual" class="overflow-y-auto pr-1 custom-scrollbar flex-1 space-y-1 text-sm leading-relaxed text-slate-700">
                    <!-- sentences injected -->
                </div>
            </div>

            <!-- Right: Sentence Detail -->
            <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col flex-1 min-h-[300px] max-h-[70vh] overflow-hidden">
                <div class="flex items-center gap-2 mb-3 flex-shrink-0 border-b border-violet-50 pb-3">
                    <i class="fas fa-search text-violet-400 text-xs"></i>
                    <h3 class="text-sm font-bold text-violet-700 uppercase tracking-widest">Cümle Analizi</h3>
                </div>
                <div id="textDeconDetail" class="overflow-y-auto pr-1 custom-scrollbar flex-1">
                    <div class="text-center py-10 opacity-40">
                        <i class="fas fa-hand-pointer text-2xl mb-2 block text-violet-400"></i>
                        <p class="text-slate-400 text-xs font-medium italic">Soldaki bir cümleye tıklayın.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.decon-sentence {
    cursor: pointer;
    padding: 5px 8px;
    border-radius: 8px;
    transition: all 0.18s ease;
    display: block;
    border-left: 3px solid transparent;
    font-size: 0.875rem;
    line-height: 1.6;
}
.decon-sentence:hover { background: rgba(109, 40, 217, 0.04); }
.decon-sentence.active {
    background: rgba(109, 40, 217, 0.09);
    border-left-color: #7c3aed;
    padding-left: 12px;
}
.kw-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 10px;
    border-radius: 10px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    gap: 8px;
}
.kw-row .kw-text { display: flex; align-items: center; gap: 6px; flex: 1; }
.kw-row strong { color: #1e293b; font-weight: 700; font-size: 0.76rem; }
.kw-row span { color: #64748b; font-size: 0.73rem; }
.save-word-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 6px;
    border-radius: 8px;
    color: #c4b5fd;
    transition: all 0.2s;
    font-size: 0.75rem;
    flex-shrink: 0;
}
.save-word-btn:hover { color: #7c3aed; background: rgba(109,40,217,0.08); }
.save-word-btn.saved { color: #7c3aed; }
</style>
`;

let textDeconData = null;
const savedDeconWords = new Set();

async function analyzeTextDeconstruction() {
    const input = document.getElementById("textDeconInput");
    const btn = document.getElementById("textDeconBtn");
    const result = document.getElementById("textDeconResult");

    if (!input.value.trim()) {
        alert("Lütfen bir metin girin.");
        return;
    }

    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner animate-spin text-xs"></i> <span>Yükleniyor</span>`;

    try {
        const res = await fetch("/.netlify/functions/textDeconstruction", {
            method: "POST",
            body: JSON.stringify({ text: input.value.trim() })
        });

        if (!res.ok) throw new Error("Analiz başarısız");

        const data = await res.json();
        textDeconData = data;
        savedDeconWords.clear();
        renderTextDecon(data);

        result.classList.remove("hidden");
        result.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        console.error(err);
    } finally {
        btn.disabled = false;
        btn.innerHTML = `<i class="fas fa-layer-group text-xs"></i><span>Analiz Et</span>`;
    }
}

function renderTextDecon(data) {
    const visual = document.getElementById("textDeconVisual");
    visual.innerHTML = "";

    data.sentences.forEach((s, idx) => {
        const el = document.createElement("span");
        el.className = "decon-sentence";
        el.innerText = s.original;
        el.onclick = () => showTextDeconDetail(idx);
        visual.appendChild(el);
    });

    showTextDeconDetail(0);
}

function showTextDeconDetail(index) {
    const detail = document.getElementById("textDeconDetail");
    const s = textDeconData.sentences[index];

    document.querySelectorAll(".decon-sentence").forEach((el, i) => {
        el.classList.toggle("active", i === index);
    });

    const keywordsHTML = (s.keywords || []).map((kw, ki) => `
        <div class="kw-row" id="kw-row-${index}-${ki}">
            <div class="kw-text">
                <strong>${kw.word}:</strong>
                <span>${kw.meaning}</span>
            </div>
            <button class="save-word-btn ${savedDeconWords.has(kw.word) ? 'saved' : ''}" 
                    onclick="saveDeconWord('${kw.word.replace(/'/g, "\\'")}', '${kw.meaning.replace(/'/g, "\\'")}', ${index}, ${ki})"
                    title="Kelime defterime ekle">
                <i class="fas fa-bookmark"></i>
            </button>
        </div>
    `).join("");

    detail.innerHTML = `
        <div class="space-y-4">
            
            <div>
                <label class="text-[9px] font-extrabold text-violet-400 uppercase tracking-widest mb-1.5 block">Basitleştirilmiş Hali</label>
                <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-700 leading-relaxed italic">
                    "${s.simplified}"
                </div>
            </div>

            <div>
                <label class="text-[9px] font-extrabold text-violet-400 uppercase tracking-widest mb-1.5 block">Gramer Açıklaması</label>
                <div class="p-3.5 rounded-xl bg-violet-50 border border-violet-100 text-xs text-slate-700 leading-relaxed">
                    ${s.grammarNote}
                </div>
            </div>

            ${s.keywords && s.keywords.length > 0 ? `
            <div>
                <label class="text-[9px] font-extrabold text-violet-400 uppercase tracking-widest mb-1.5 block">Anahtar Kelimeler</label>
                <div class="flex flex-col gap-1.5">
                    ${keywordsHTML}
                </div>
            </div>
            ` : ""}
        </div>
    `;
}

async function saveDeconWord(word, meaning, sIdx, kwIdx) {
    if (!window.currentUser) { alert("Giriş yapmanız gerekiyor."); return; }
    if (savedDeconWords.has(word)) return;

    try {
        await window.saveWordFirestore({ word, meaning, source: "textDeconstruction" });
        savedDeconWords.add(word);

        const btn = document.querySelector(`#kw-row-${sIdx}-${kwIdx} .save-word-btn`);
        if (btn) {
            btn.classList.add("saved");
            btn.innerHTML = `<i class="fas fa-check"></i>`;
            setTimeout(() => btn.innerHTML = `<i class="fas fa-bookmark"></i>`, 1500);
        }
    } catch (err) {
        console.error("Save word error:", err);
        alert("Kaydetme başarısız.");
    }
}
