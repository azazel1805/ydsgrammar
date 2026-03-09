document.addEventListener("DOMContentLoaded", () => {
    injectRestatementHTML();
    initRestatement();
});

const restatementHTML = `
<div class="max-w-4xl mx-auto p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <!-- Header -->
    <div class="text-center space-y-2">
        <h2 class="text-4xl font-bold text-slate-900" style="font-family: 'Playfair Display', serif;">
            AI Restatement Generator
        </h2>
        <p class="text-slate-500 italic">"Anlamca En Yakın Cümle" stratejilerini yapay zeka ile keşfet.</p>
    </div>

    <!-- Input Card -->
    <div class="p-8 rounded-[2rem] shadow-sm bg-white border border-slate-200 space-y-6">
        <div class="space-y-2">
            <label class="text-xs font-bold uppercase tracking-widest text-slate-400">Giriş Cümlesi</label>
            <textarea 
                id="restatementInput"
                rows="4"
                class="w-full p-5 rounded-2xl bg-slate-50 text-slate-900 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-red-800 transition-all font-serif italic text-lg shadow-inner"
                placeholder="Dönüştürmek istediğin akademik cümleyi buraya yaz..."></textarea>
        </div>

        <button 
            id="restatementBtn"
            class="w-full py-4 rounded-xl font-bold text-lg bg-slate-900 hover:bg-black text-white transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] group flex items-center justify-center gap-3">
            Varyasyonları Oluştur <i class="fas fa-magic text-sm opacity-50 group-hover:opacity-100 transition-opacity"></i>
        </button>
    </div>

    <!-- Output Section -->
    <div id="restatementOutput" class="space-y-6 notranslate" translate="no"></div>
</div>

<style>
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes slide-in-bottom { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.animate-in { animation: slide-in-bottom 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
</style>
`;

function injectRestatementHTML() {
    const container = document.getElementById("tab-restatement");
    if (!container) return;
    container.innerHTML = restatementHTML;
}

function initRestatement() {
    const btn = document.getElementById("restatementBtn");
    if (!btn) return;

    btn.addEventListener("click", async () => {
        const input = document.getElementById("restatementInput").value.trim();
        if (!input) {
            alert("Lütfen bir cümle girin.");
            return;
        }

        const output = document.getElementById("restatementOutput");
        output.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 space-y-4">
                <div class="w-12 h-12 border-4 border-slate-100 border-t-red-800 rounded-full animate-spin"></div>
                <p class="text-slate-400 font-bold text-sm uppercase tracking-widest animate-pulse">Cümle yeniden kurgulanıyor...</p>
            </div>
        `;

        try {
            const response = await fetch("/.netlify/functions/restatement", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input })
            });

            const data = await response.json();
            renderRestatement(data);
        } catch (err) {
            output.innerHTML = `
                <div class="p-6 bg-red-50 text-red-800 rounded-2xl border border-red-100 text-center font-bold">
                    <i class="fas fa-exclamation-triangle mb-2 text-xl"></i><br>
                    Bir hata oluştu. Lütfen tekrar deneyin.
                </div>
            `;
            console.error(err);
        }
    });
}

function renderRestatement(data) {
    const container = document.getElementById("restatementOutput");

    if (!data.variations) {
        container.innerHTML = "<div class='text-red-400'>Hatalı AI yanıtı.</div>";
        return;
    }

    let html = `
        <div class="space-y-6">
            <h3 class="text-xl font-bold text-slate-900" style="font-family: 'Playfair Display', serif;">Academic Variations</h3>
            <div class="grid grid-cols-1 gap-4">
    `;

    data.variations.forEach((v, idx) => {
        html += `
            <div class="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm hover:border-red-100 transition-all group">
                <div class="flex items-center gap-3 mb-4">
                    <span class="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">#${idx + 1}</span>
                    <span class="text-[10px] uppercase font-bold tracking-widest text-red-800 bg-red-50 px-3 py-1 rounded-full">${v.strategy}</span>
                </div>
                <p class="text-lg font-serif italic text-slate-800 mb-4 leading-relaxed line-height-relaxed border-l-4 border-slate-100 pl-4">
                    "${v.sentence}"
                </p>
                <div class="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 border border-slate-100">
                    <i class="fas fa-info-circle mr-2 text-slate-400"></i> ${v.explanation_tr}
                </div>
            </div>
        `;
    });

    html += `
            </div>
            
            <!-- Vocab Card -->
            <div class="bg-slate-900 rounded-[2rem] p-8 text-white">
                <h3 class="text-xl font-bold mb-6 flex items-center gap-2" style="font-family: 'Playfair Display', serif;">
                    <i class="fas fa-book-open text-red-400"></i> Key Vocabulary
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${data.key_vocabulary.map(v => `
                        <div class="flex justify-between items-center p-3 border-b border-white/10">
                            <span class="font-bold text-red-400">${v.word}</span>
                            <span class="text-slate-400 text-sm italic">${v.meaning_tr}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
}
