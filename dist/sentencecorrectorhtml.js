const sentenceCorrectorHTML = `
<div class="max-w-[1400px] mx-auto px-4 py-8 lg:py-12 animate-in fade-in duration-700">
    <!-- HERO HEADER -->
    <div class="text-center mb-12 relative">
       <div class="absolute inset-0 -top-20 bg-gradient-to-b from-cyan-50/50 to-transparent blur-3xl pointer-events-none -z-10"></div>
       
       <div class="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 shadow-xl shadow-slate-200">
         <i class="fas fa-spell-check text-cyan-400"></i>
         <span>Advanced Grammar Lab (Free)</span>
       </div>
       
       <h2 class="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight" style="font-family:'Playfair Display',serif;">
         Sentence <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600">Corrector</span> & Analyzer
       </h2>
       <p class="text-slate-500 max-w-xl mx-auto text-sm lg:text-base font-medium">Cümlelerinizi akademik standartlara göre optimize edin, yazım ve dilbilgisi hatalarını anında görün.</p>
    </div>

    <!-- MAIN INTERFACE: SIDE BY SIDE -->
    <div class="grid lg:grid-cols-12 gap-8 items-start">
        
        <!-- INPUT PANEL (Left) -->
        <div class="lg:col-span-7 bg-white border border-slate-100 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl shadow-cyan-500/5 relative overflow-hidden">
            <div class="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
                <i class="fas fa-edit text-8xl"></i>
            </div>

            <div class="relative z-10">
                <div class="flex items-center justify-between mb-6">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">İNGİLİZCE CÜMLENİZ</label>
                    <span id="charCount" class="text-[10px] font-bold text-slate-300">0 / 1000</span>
                </div>

                <div class="relative group">
                    <textarea 
                        id="scInput"
                        class="w-full p-8 rounded-3xl bg-slate-50/50 border-2 border-slate-100 focus:bg-white focus:border-cyan-500 outline-none transition-all font-medium text-lg text-slate-800 placeholder:text-slate-300 min-h-[300px] resize-none selection:bg-cyan-100"
                        placeholder="Cümlenizi buraya yazın veya yapıştırın..."></textarea>
                    
                    <div class="absolute bottom-6 right-6 flex gap-2">
                        <button onclick="window.resetSentenceCorrector()" class="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-red-500 hover:border-red-100 transition-all shadow-sm flex items-center justify-center">
                            <i class="fas fa-trash-alt text-xs"></i>
                        </button>
                    </div>
                </div>

                <button id="scCheck" class="group w-full mt-6 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-cyan-900/10 hover:bg-cyan-600 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3">
                    <span>CÜMLEYİ ANALİZ ET</span>
                    <i class="fas fa-microchip animate-pulse text-cyan-400"></i>
                </button>
            </div>
        </div>

        <!-- RESULTS PANEL (Right) -->
        <div class="lg:col-span-5 space-y-6">
            
            <!-- STATUS / STATS CARD -->
            <div class="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 flex items-center justify-between">
                <div id="scStatusLabel" class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                        <i class="fas fa-search"></i>
                    </div>
                    <div>
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">DURUM</p>
                        <p id="scStatusText" class="text-xs font-bold text-slate-600 uppercase">Analiz Hazır</p>
                    </div>
                </div>
                <div class="flex gap-2" id="scSummary">
                    <!-- Dynamic Badges -->
                </div>
            </div>

            <!-- CORRECTIONS LIST -->
            <div id="scCorrections" class="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                <div class="flex flex-col items-center justify-center p-12 text-center opacity-30">
                    <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl mb-4">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Henüz analiz yapılmadı</p>
                </div>
            </div>

            <!-- FINAL CORRECTED OUTPUT -->
            <div id="scCorrectedArea" class="hidden animate-in slide-in-from-top-4 duration-500">
                <div class="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2.5rem] p-8 lg:p-10 text-white shadow-xl shadow-emerald-200 relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                        <i class="fas fa-sparkles text-6xl"></i>
                    </div>
                    <div class="relative z-10">
                        <p class="text-[10px] font-black text-emerald-100 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <i class="fas fa-star animate-pulse"></i> Önerilen Düzeltme
                        </p>
                        <p id="scCorrectedText" class="text-xl lg:text-2xl font-bold leading-relaxed italic"></p>
                        <div class="mt-8 flex gap-3">
                            <button onclick="window.copyCorrectedText()" class="flex-1 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                                <i class="fas fa-copy"></i> Kopyala
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<style>
    .sc-error-card { @apply bg-white border border-red-50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden; }
    .sc-error-badge { @apply absolute top-0 right-0 px-4 py-1.5 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest rounded-bl-xl; }
    .custom-scrollbar::-webkit-scrollbar { width: 5px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>
`;