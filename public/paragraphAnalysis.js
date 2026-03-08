/* =========================================
   PARAGRAPH ANALYST - MODERN & LITERARY DESIGN
 ========================================= */

const paragraphHTML = `
<div class="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    
    <!-- Introduction Header -->
    <div class="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden group">
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-emerald-50 rounded-full blur-3xl group-hover:bg-emerald-100 transition-colors duration-500"></div>
        
        <div class="relative space-y-4">
            <h2 class="text-4xl font-extrabold text-slate-900" style="font-family: 'Playfair Display', serif;">
                Paragraf Bağlantı Analisti
            </h2>
            <p class="text-slate-500 text-lg leading-relaxed max-w-3xl">
                İngilizce bir paragrafın cümleleri arasındaki mantıksal akışı ve bağlantıları analiz edin. 
                Bu araç, metin akışı ve anlamsal bütünlük kurma becerilerinizi geliştirmenize yardımcı olur.
            </p>
        </div>
    </div>

    <!-- Input Section -->
    <div class="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-6">
        <textarea id="paragraphInput" placeholder="Analiz etmek istediğiniz İngilizce paragrafı buraya yapıştırın..." 
            class="w-full bg-slate-50 border border-slate-100 rounded-[2rem] px-8 py-6 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all h-48 resize-none custom-scrollbar"></textarea>
        
        <button id="analyzeParBtn" onclick="analyzeParagraph()"
            class="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-bold text-lg hover:bg-black transition-all active:scale-[0.98] shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 group">
            <span>Analizi Başlat</span>
            <i class="fas fa-magic text-sm transition-transform group-hover:rotate-12"></i>
        </button>
    </div>

    <!-- Analysis Results (Hidden by default) -->
    <div id="parAnalysisResult" class="hidden grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left Column: Visual Paragraph -->
        <div class="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col">
            <h3 class="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4" style="font-family: 'Playfair Display', serif;">
                Analiz Edilen Paragraf
            </h3>
            
            <div id="visualParagraph" class="text-lg leading-[2.5] text-slate-700 font-medium space-y-4">
                <!-- Sentences injected here -->
            </div>

            <!-- Legend -->
            <div class="mt-auto pt-8 border-t border-slate-50 flex flex-wrap gap-6">
                <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Güçlü Bağlantı</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                    <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Orta Bağlantı</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-rose-500"></div>
                    <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Zayıf Bağlantı</span>
                </div>
            </div>
        </div>

        <!-- Right Column: Sentence Details -->
        <div class="lg:col-span-1 space-y-8">
            <!-- Sidebar Card: Details -->
            <div class="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8 sticky top-8">
                <h3 class="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4" style="font-family: 'Playfair Display', serif;">
                    Detaylı Analiz
                </h3>
                
                <div id="sentenceDetailContent" class="space-y-6">
                    <div class="text-center py-12 opacity-30 italic text-slate-500">
                        <i class="fas fa-mouse-pointer text-4xl mb-4 block"></i>
                        Detayları görmek için soldaki bir cümleye tıklayın.
                    </div>
                </div>

                <!-- Global Evaluation -->
                <div class="pt-8 border-t border-slate-100">
                    <label class="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest mb-2 block">Genel Değerlendirme</label>
                    <div id="globalEvaluationBadge" class="inline-flex px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest">
                        ...
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.sentence-chip {
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    padding: 2px 4px;
    border-radius: 6px;
    display: inline-block;
}

.sentence-chip:hover {
    background: rgba(0,0,0,0.03);
    transform: translateY(-1px);
}

.sentence-chip.active {
    background: rgba(0,0,0,0.05);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

/* Underline styles */
.underline-strong { border-bottom: 3px solid #10b981; }
.underline-moderate { border-bottom: 3px solid #fbbf24; }
.underline-weak { border-bottom: 3px solid #f43f5e; }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>
`;

let currentAnalysis = null;

async function analyzeParagraph() {
    const input = document.getElementById("paragraphInput");
    const btn = document.getElementById("analyzeParBtn");
    const resultDiv = document.getElementById("parAnalysisResult");

    if (!input.value.trim()) {
        alert("Lütfen bir paragraf girin.");
        return;
    }

    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner animate-spin mr-2"></i> Analiz Ediliyor...`;

    try {
        const response = await fetch("/.netlify/functions/paragraphAnalysis", {
            method: "POST",
            body: JSON.stringify({ paragraph: input.value.trim() })
        });

        if (!response.ok) throw new Error("Analiz hatası");

        const data = await response.json();
        currentAnalysis = data;
        renderParagraphAnalysis(data);

        resultDiv.classList.remove("hidden");
        resultDiv.scrollIntoView({ behavior: 'smooth' });

    } catch (err) {
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        console.error(err);
    } finally {
        btn.disabled = false;
        btn.innerHTML = `<span>Analizi Başlat</span><i class="fas fa-magic text-sm"></i>`;
    }
}

function renderParagraphAnalysis(data) {
    const visual = document.getElementById("visualParagraph");
    const evalBadge = document.getElementById("globalEvaluationBadge");

    visual.innerHTML = "";

    data.sentences.forEach((s, idx) => {
        const span = document.createElement("span");
        span.className = `sentence-chip underline-${s.connectionLevel.toLowerCase()}`;
        span.innerText = s.text + " ";
        span.onclick = () => showSentenceDetail(idx);
        visual.appendChild(span);
    });

    // Evaluation Badge Style
    evalBadge.innerText = data.generalEvaluation;
    evalBadge.className = "inline-flex px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest " +
        (data.generalEvaluation === 'High' ? 'bg-emerald-100 text-emerald-800' :
            data.generalEvaluation === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800');

    // Show first sentence detail by default
    showSentenceDetail(0);
}

function showSentenceDetail(index) {
    const content = document.getElementById("sentenceDetailContent");
    const s = currentAnalysis.sentences[index];

    // Highlight active sentence
    const chips = document.querySelectorAll('.sentence-chip');
    chips.forEach((c, idx) => {
        if (idx === index) c.classList.add('active');
        else c.classList.remove('active');
    });

    content.innerHTML = `
        <div class="animate-in fade-in slide-in-from-right-4 duration-500">
            <div class="space-y-6">
                <div>
                  <label class="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 block">Cümlenin Rolü</label>
                  <p class="text-slate-800 font-bold leading-relaxed">${s.role}</p>
                </div>

                <div>
                  <label class="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 block">Önceki Cümleyle Bağlantısı</label>
                  <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm text-slate-600 leading-relaxed italic">
                    "${s.connectionDetail}"
                  </div>
                </div>

                ${s.improvementSuggestion && s.improvementSuggestion !== 'None' ? `
                <div class="p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <label class="text-[10px] font-extrabold text-emerald-800 uppercase tracking-widest mb-2 block">İyileştirme Önerisi 💡</label>
                  <p class="text-slate-700 text-sm leading-relaxed">${s.improvementSuggestion}</p>
                </div>
                ` : ''}
            </div>
        </div>
    `;
}
