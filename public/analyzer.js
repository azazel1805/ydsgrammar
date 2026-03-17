const analyzerHTML = `
<div class="max-w-[1400px] mx-auto px-4 py-8 lg:py-12 animate-in fade-in duration-700">
    <!-- HERO HEADER -->
    <div class="text-center mb-12 relative">
       <div class="absolute inset-0 -top-20 bg-gradient-to-b from-rose-50/50 to-transparent blur-3xl pointer-events-none -z-10"></div>
       
       <div class="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 shadow-xl shadow-slate-200">
         <i class="fas fa-brain text-rose-400"></i>
         <span>YDS Question Strategy Lab</span>
       </div>
       
       <h2 class="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight" style="font-family:'Playfair Display',serif;">
         Soru <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-indigo-600">Analizörü</span>
       </h2>
       <p class="text-slate-500 max-w-xl mx-auto text-sm lg:text-base font-medium">Karmaşık YDS/YDT sorularını yapay zeka ile parçalarına ayırın, eleme stratejilerini ve 'Düşünme Yolu'nu keşfedin.</p>
    </div>

    <!-- MAIN INTERFACE -->
    <div class="grid lg:grid-cols-12 gap-8 items-start">
        
        <!-- INPUT PANEL (Left) -->
        <div class="lg:col-span-12 bg-white border border-slate-100 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl shadow-rose-500/5 relative overflow-hidden mb-8">
            <div class="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
                <i class="fas fa-microchip text-8xl"></i>
            </div>

            <div class="relative z-10">
                <div class="flex items-center justify-between mb-6">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">YDS / YDT SORUSU</label>
                </div>

                <textarea 
                    id="analyzerInput"
                    class="w-full p-8 rounded-3xl bg-slate-50/50 border-2 border-slate-100 focus:bg-white focus:border-rose-500 outline-none transition-all font-medium text-lg text-slate-800 placeholder:text-slate-300 min-h-[250px] resize-none selection:bg-rose-100"
                    placeholder="Şıklı sorunuzu buraya yapıştırın..."></textarea>
                
                <button id="analyzeBtn" class="group w-full mt-6 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-rose-900/10 hover:bg-rose-600 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3">
                    <span>SORUYU ANALİZ ET</span>
                    <i class="fas fa-bolt animate-pulse text-amber-400"></i>
                </button>
            </div>
        </div>

        <!-- RESULTS PANEL -->
        <div id="analysisOutput" class="lg:col-span-12 space-y-8 min-h-[200px] empty:hidden">
            <!-- Dynamic Content -->
        </div>
    </div>
</div>

<style>
    .roadmap-step { @apply relative pl-10 pb-6 border-l-2 border-rose-100 last:border-0; }
    .roadmap-step::before { 
        content: ''; 
        @apply absolute left-[-9px] top-0 w-4 h-4 bg-white border-2 border-rose-500 rounded-full z-10;
    }
    .wrong-option { @apply p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-800 text-sm font-medium; }
</style>
`;

function injectAnalyzerHTML() {
    const container = document.getElementById("tab-analyzer");
    if (!container) return;
    container.innerHTML = analyzerHTML;
}

function initAnalyzer() {
    const btn = document.getElementById("analyzeBtn");
    if(!btn) return;

    btn.addEventListener("click", async () => {
        const input = document.getElementById("analyzerInput").value.trim();
        if (!input) return;

        const output = document.getElementById("analysisOutput");
        output.innerHTML = `
            <div class="flex flex-col items-center justify-center p-20 bg-white rounded-[2.5rem] border border-slate-100">
                <i class="fas fa-cog fa-spin text-4xl text-rose-500 mb-4"></i>
                <p class="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">Analiz Motoru Çalışıyor...</p>
            </div>
        `;

        try {
            const response = await fetch("/.netlify/functions/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input })
            });

            const text = await response.text();
            const data = JSON.parse(text);
            renderAnalysis(data);

        } catch (err) {
            output.innerHTML = "<div class='text-rose-500 p-8 bg-white rounded-3xl text-center border border-rose-100'>Hata oluştu. Lütfen tekrar deneyin.</div>";
            console.error(err);
        }
    });
}

function renderAnalysis(data) {
    const container = document.getElementById("analysisOutput");
    if (!data.question_analysis) {
        container.innerHTML = "<div class='text-rose-500 font-bold p-8 bg-white rounded-3xl text-center border border-rose-100'>Geçersiz AI yanıtı. Lütfen tekrar deneyin.</div>";
        return;
    }

    container.innerHTML = `
    <div class="animate-in slide-in-from-bottom-8 duration-700 space-y-8">
        <!-- TOP STATS -->
        <div class="grid md:grid-cols-3 gap-4">
            <div class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                    <i class="fas fa-bullseye"></i>
                </div>
                <div>
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">GRAMER ODAĞI</p>
                    <p class="text-xs font-bold text-slate-800 uppercase">${data.question_analysis.grammar_focus}</p>
                </div>
            </div>
            <div class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                    <i class="fas fa-layer-group"></i>
                </div>
                <div>
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">ZORLUK SEVİYESİ</p>
                    <p class="text-xs font-bold text-slate-800 uppercase">${data.question_analysis.difficulty_level}</p>
                </div>
            </div>
            <div class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div>
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">DOĞRU CEVAP</p>
                    <p class="text-xs font-black text-emerald-600 uppercase tracking-[0.1em]">${data.question_analysis.correct_answer}</p>
                </div>
            </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
            <!-- LEFT COLUMN: THOUGHT PROCESS -->
            <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl shadow-rose-500/5">
                <h4 class="text-2xl font-black text-slate-900 mb-8 tracking-tight italic" style="font-family:'Playfair Display',serif;">Düşünme Yolu & <span class="text-rose-600">Yol Haritası</span></h4>
                
                <!-- Roadmap Visualized -->
                <div class="space-y-0">
                    <div class="roadmap-step">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">İLK ADIM (STRATEJİK)</p>
                        <p class="text-sm font-bold text-slate-800">${data.question_analysis.logical_structure}</p>
                    </div>
                    <div class="roadmap-step border-l-0 pb-0">
                         <p class="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2">DETAYLI ANALİZ</p>
                         <div class="text-sm leading-relaxed text-slate-600 font-medium whitespace-pre-wrap">${data.question_analysis.why_correct}</div>
                    </div>
                </div>

                <!-- Trap Section -->
                <div class="mt-10 bg-rose-900 text-white rounded-[2rem] p-8 relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                        <i class="fas fa-skull-crossbones text-4xl"></i>
                    </div>
                    <h5 class="text-[10px] font-black text-rose-300 uppercase tracking-widest mb-4">Sınav Tuzağı & Hipotez</h5>
                    <p class="text-sm font-medium leading-relaxed mb-6 opacity-90">${data.yds_trap_engine.elimination_strategy}</p>
                    <div class="p-4 bg-white/10 rounded-xl border border-white/10 flex items-start gap-3">
                        <i class="fas fa-lightbulb text-amber-300 mt-1"></i>
                        <p class="text-xs font-bold leading-snug">${data.yds_trap_engine.exam_tip}</p>
                    </div>
                </div>
            </div>

            <!-- RIGHT COLUMN: ELIMINATION -->
            <div class="space-y-6">
                <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl shadow-slate-200/50">
                    <h4 class="text-2xl font-black text-slate-900 mb-8 tracking-tight italic" style="font-family:'Playfair Display',serif;">Neden Diğerleri <span class="text-rose-600">Yanlış?</span></h4>
                    <div class="space-y-4">
                        ${data.question_analysis.why_others_wrong.map(o => `
                            <div class="wrong-option flex items-start gap-3">
                                <i class="fas fa-times-circle mt-0.5 opacity-50"></i>
                                <span>${o}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>

                <!-- Confidence Badge -->
                <div class="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Güven Oranı</span>
                    </div>
                    <span class="text-xs font-black text-slate-800 uppercase px-3 py-1 bg-white rounded-lg border border-slate-100 shadow-sm">${data.question_analysis.confidence_level}</span>
                </div>
            </div>
        </div>
    </div>
    `;

    // Apply syntax term enhancements
    if (window.SYNTAX_TERMS) {
        Object.keys(window.SYNTAX_TERMS).forEach(term => {
            const regex = new RegExp(`\\b${term}\\b`, 'g');
            container.innerHTML = container.innerHTML.replace(regex, `<b>${term}</b> <span class="text-[10px] text-slate-400 bg-slate-100 px-1 rounded">(${window.SYNTAX_TERMS[term]})</span>`);
        });
    }
}
