/* =========================================
   METIN ANALIZI (DECONSTRUCTION)
 ========================================= */

const textDeconHTML = `
<div class="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

    <!-- Header -->
    <div class="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden group">
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-violet-50 rounded-full blur-3xl group-hover:bg-violet-100 transition-colors duration-500"></div>
        <div class="relative space-y-3">
            <h2 class="text-4xl font-extrabold text-slate-900" style="font-family: 'Playfair Display', serif;">
                Metin Analizi <span class="text-violet-700">(Deconstruction)</span>
            </h2>
            <p class="text-slate-500 text-lg leading-relaxed max-w-3xl">
                Karmaşık bir İngilizce metni cümle cümle analiz ederek derinlemesine anlayın. 
                Metni yapıştırın ve her cümlenin basitleştirilmiş halini, gramer yapısını ve anahtar kelimelerini keşfedin.
            </p>
        </div>
    </div>

    <!-- Input -->
    <div class="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-6">
        <textarea id="textDeconInput" placeholder="Analiz etmek istediğiniz İngilizce metni buraya yapıştırın..." 
            class="w-full bg-slate-50 border border-slate-100 rounded-[2rem] px-8 py-6 text-base focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all h-48 resize-none custom-scrollbar leading-relaxed"></textarea>
        
        <button id="textDeconBtn" onclick="analyzeTextDeconstruction()"
            class="w-full py-5 bg-violet-700 text-white rounded-[2rem] font-bold text-lg hover:bg-violet-900 transition-all active:scale-[0.99] shadow-xl shadow-violet-900/20 flex items-center justify-center gap-3">
            <span>Metni Analiz Et</span>
            <i class="fas fa-layer-group text-sm"></i>
        </button>
    </div>

    <!-- Results -->
    <div id="textDeconResult" class="hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <!-- Left: Visual Paragraph -->
            <div class="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex flex-col space-y-4 max-h-[85vh] overflow-hidden">
                <h3 class="text-2xl font-bold text-violet-700 border-b border-violet-50 pb-4 flex-shrink-0" style="font-family: 'Playfair Display', serif;">
                    Orijinal Metin
                </h3>
                <div id="textDeconVisual" class="overflow-y-auto pr-2 custom-scrollbar flex-1 space-y-3 text-base leading-[2.2] text-slate-700">
                    <!-- sentences injected -->
                </div>
            </div>

            <!-- Right: Sentence Detail -->
            <div class="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex flex-col space-y-6 sticky top-8 max-h-[85vh] overflow-hidden">
                <h3 class="text-2xl font-bold text-violet-700 border-b border-violet-50 pb-4 flex-shrink-0" style="font-family: 'Playfair Display', serif;">
                    Cümle Analizi
                </h3>
                <div id="textDeconDetail" class="overflow-y-auto pr-2 custom-scrollbar flex-1">
                    <div class="text-center py-16 opacity-30">
                        <i class="fas fa-hand-pointer text-4xl mb-4 block text-violet-400"></i>
                        <p class="text-slate-500 font-medium italic">Analiz görmek için soldaki bir cümleye tıklayın.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.decon-sentence {
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 10px;
    transition: all 0.2s ease;
    display: block;
}
.decon-sentence:hover {
    background: rgba(109, 40, 217, 0.05);
}
.decon-sentence.active {
    background: rgba(109, 40, 217, 0.12);
    border-left: 3px solid #7c3aed;
    padding-left: 14px;
}
.keyword-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 8px 14px;
    font-size: 0.8rem;
}
.keyword-chip strong {
    color: #1e293b;
    font-weight: 700;
}
.keyword-chip span {
    color: #64748b;
}
</style>
`;

let textDeconData = null;

async function analyzeTextDeconstruction() {
    const input = document.getElementById("textDeconInput");
    const btn = document.getElementById("textDeconBtn");
    const result = document.getElementById("textDeconResult");

    if (!input.value.trim()) {
        alert("Lütfen bir metin girin.");
        return;
    }

    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner animate-spin mr-2"></i> Analiz Ediliyor...`;

    try {
        const res = await fetch("/.netlify/functions/textDeconstruction", {
            method: "POST",
            body: JSON.stringify({ text: input.value.trim() })
        });

        if (!res.ok) throw new Error("Analiz başarısız");

        const data = await res.json();
        textDeconData = data;
        renderTextDecon(data);

        result.classList.remove("hidden");
        result.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        console.error(err);
    } finally {
        btn.disabled = false;
        btn.innerHTML = `<span>Metni Analiz Et</span><i class="fas fa-layer-group text-sm"></i>`;
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

    // Highlight active
    document.querySelectorAll(".decon-sentence").forEach((el, i) => {
        el.classList.toggle("active", i === index);
    });

    const keywordsHTML = (s.keywords || []).map(kw => `
        <div class="keyword-chip">
            <strong>${kw.word}:</strong>
            <span>${kw.meaning}</span>
            <i class="fas fa-bookmark text-violet-300 text-xs ml-1"></i>
        </div>
    `).join("");

    detail.innerHTML = `
        <div class="space-y-6 animate-in fade-in duration-300">
            
            <div>
                <label class="text-[10px] font-extrabold text-violet-400 uppercase tracking-widest mb-2 block">Basitleştirilmiş Hali</label>
                <div class="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-base text-slate-700 leading-relaxed font-medium italic">
                    "${s.simplified}"
                </div>
            </div>

            <div>
                <label class="text-[10px] font-extrabold text-violet-400 uppercase tracking-widest mb-2 block">Gramer Açıklaması</label>
                <div class="p-5 rounded-2xl bg-violet-50 border border-violet-100 text-sm text-slate-700 leading-relaxed">
                    ${s.grammarNote}
                </div>
            </div>

            ${s.keywords && s.keywords.length > 0 ? `
            <div>
                <label class="text-[10px] font-extrabold text-violet-400 uppercase tracking-widest mb-3 block">Anahtar Kelimeler</label>
                <div class="flex flex-col gap-2">
                    ${keywordsHTML}
                </div>
            </div>
            ` : ""}
        </div>
    `;
}
