
const nlpAnalizHTML = `
<div class="space-y-8">
    <div class="p-8 rounded-3xl shadow-2xl bg-white border border-slate-100 relative overflow-hidden">
        <!-- Background Decoration -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -ml-32 -mb-32"></div>

        <div class="relative z-10">
            <div class="flex items-center gap-3 mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200">
                    <i class="fas fa-brain text-white text-xl"></i>
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-slate-900" style="font-family: 'Playfair Display', serif;">Cümle Analizcisi</h2>
                    <p class="text-slate-500 text-sm">Ücretsiz Google Cloud NLP ile derinlemesine cümle analizi</p>
                </div>
            </div>

            <div class="space-y-4">
                <textarea id="nlpInput" 
                    class="w-full p-6 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-lg min-h-[120px]"
                    placeholder="Analiz etmek istediğiniz İngilizce cümleyi buraya yazın..."
                ></textarea>

                <button onclick="runNlpAnalysis()" id="nlpBtn"
                    class="w-full bg-slate-900 hover:bg-purple-900 text-white py-4 rounded-2xl font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-slate-200">
                    <span>Cümleyi Çözümle</span>
                    <i class="fas fa-magic"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Results Section -->
    <div id="nlpResults" class="hidden space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <!-- Quick Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <i class="fas fa-signal"></i>
                </div>
                <div>
                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Tahmini Seviye</p>
                    <p id="nlpCefr" class="text-xl font-bold text-slate-900">B1</p>
                </div>
            </div>
            
            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <i class="fas fa-layer-group"></i>
                </div>
                <div>
                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Öğe Sayısı</p>
                    <p id="nlpTokenCount" class="text-xl font-bold text-slate-900">0</p>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                    <i class="fas fa-clock"></i>
                </div>
                <div>
                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Detected Tense</p>
                    <p id="nlpTense" class="text-xl font-bold text-slate-900">N/A</p>
                </div>
            </div>
        </div>

        <!-- Detailed Structural Analysis -->
        <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 class="text-lg font-bold mb-6 flex items-center gap-2">
                <i class="fas fa-sitemap text-purple-600"></i>
                Sözdizimi ve Yapı Analizi (Structural Breakdown)
            </h3>
            <div id="nlpTree" class="flex flex-wrap gap-2 leading-loose">
                <!-- Visual tokens injected here -->
            </div>
        </div>

        <!-- Entity Detection -->
        <div class="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
            <h3 class="text-lg font-bold mb-4 opacity-80 flex items-center gap-2 text-purple-300">
                <i class="fas fa-fingerprint"></i>
                Varlık Tespiti (Named Entities)
            </h3>
            <div id="nlpEntities" class="flex flex-wrap gap-2">
                <!-- Entities injected here -->
            </div>
        </div>

    </div>
</div>
`;

async function runNlpAnalysis() {
    const input = document.getElementById("nlpInput");
    const container = document.getElementById("nlpResults");
    const btn = document.getElementById("nlpBtn");

    if (!input || !input.value.trim()) return;

    const originalBtnText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner animate-spin"></i> Analiz Ediliyor...`;

    try {
        console.log("Starting NLP Analysis for:", input.value.trim());
        const response = await fetch("/.netlify/functions/nlpAnalyze", {
            method: "POST",
            body: JSON.stringify({ text: input.value.trim() })
        });

        const data = await response.json();
        console.log("NLP API Response:", data);

        if (!response.ok || data.error) {
            const msg = data.error?.message || data.error || "API call failed";
            throw new Error(msg);
        }

        renderNlpResults(data);
        container.classList.remove("hidden");
    } catch (err) {
        console.error("NLP Analysis Error:", err);
        alert("Hata: " + err.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalBtnText;
    }
}

function renderNlpResults(data) {
    const tokens = data.tokens || [];
    const entities = data.entities || [];

    // 1. Stats
    document.getElementById("nlpTokenCount").innerText = tokens.length;

    // 2. Tense Detection (Simple Rule-Based)
    let detectedTense = "Present Simple (likely)";
    const hasPerfect = tokens.some(t => t.lemma === "have" && t.partOfSpeech.tag === "VERB");
    const hasWill = tokens.some(t => t.text.content.toLowerCase() === "will");
    const hasPast = tokens.some(t => t.partOfSpeech.tense === "PAST");
    const hasIng = tokens.some(t => t.partOfSpeech.aspect === "CONTINUOUS" || t.text.content.endsWith("ing"));

    if (hasWill) detectedTense = "Future";
    else if (hasPast && hasIng) detectedTense = "Past Continuous";
    else if (hasPast) detectedTense = "Past Simple";
    else if (hasPerfect && hasPast) detectedTense = "Past Perfect";
    else if (hasPerfect) detectedTense = "Present Perfect";
    else if (hasIng) detectedTense = "Present Continuous";

    document.getElementById("nlpTense").innerText = detectedTense;

    // 3. Tree View
    const treeDiv = document.getElementById("nlpTree");
    treeDiv.innerHTML = "";

    tokens.forEach(t => {
        const tag = t.partOfSpeech.tag;
        const color = getNlpColor(tag);
        const label = getNlpLabel(tag);

        const tokenEl = document.createElement("div");
        tokenEl.className = "group relative inline-block mb-4";
        tokenEl.innerHTML = `
            <div class="border-b-4 ${color} px-2 py-1 cursor-default hover:bg-slate-50 transition-colors">
                <span class="text-lg font-medium">${t.text.content}</span>
                <div class="text-[9px] font-bold uppercase tracking-tighter opacity-60">${tag}</div>
            </div>
            <!-- Tooltip -->
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                <div class="bg-white text-slate-900 text-xs p-3 rounded-xl shadow-2xl border border-slate-100 min-w-[150px]">
                    <p class="font-bold border-b border-slate-100 pb-1 mb-1">${label}</p>
                    <p class="opacity-70">Kelime Kökü (Lemma): ${t.lemma}</p>
                    <p class="opacity-70">Durum (Case): ${t.partOfSpeech.case || 'N/A'}</p>
                    <p class="opacity-70">Şahıs (Person): ${t.partOfSpeech.person || 'N/A'}</p>
                </div>
            </div>
        `;
        treeDiv.appendChild(tokenEl);
    });

    // 4. Entities
    const entityDiv = document.getElementById("nlpEntities");
    entityDiv.innerHTML = "";
    if (entities.length === 0) {
        entityDiv.innerHTML = `<span class="text-xs opacity-50 italic">Varlık bulunamadı.</span>`;
    } else {
        entities.forEach(e => {
            const badge = document.createElement("span");
            badge.className = "px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold border border-white/5";
            badge.innerText = `${e.name} (${e.type})`;
            entityDiv.appendChild(badge);
        });
    }

    // 5. CEFR guess (Using locally available oxford_master_5000 if global)
    if (typeof oxford_master_5000 !== 'undefined') {
        let maxLevel = 1; // A1
        const levels = { "A1": 1, "A2": 2, "B1": 3, "B2": 4, "C1": 5 };
        const reverseLevels = { 1: "A1", 2: "A2", 3: "B1", 4: "B2", 5: "C1" };

        tokens.forEach(t => {
            const word = t.lemma.toLowerCase();
            const found = oxford_master_5000.find(o => o.word.toLowerCase() === word);
            if (found && levels[found.level] > maxLevel) {
                maxLevel = levels[found.level];
            }
        });
        document.getElementById("nlpCefr").innerText = reverseLevels[maxLevel];
    }
}

function getNlpColor(tag) {
    const colors = {
        'NOUN': 'border-blue-400',
        'VERB': 'border-red-400',
        'ADJ': 'border-amber-400',
        'ADV': 'border-purple-400',
        'PRON': 'border-emerald-400',
        'DET': 'border-slate-300',
        'ADP': 'border-indigo-400',
        'CONJ': 'border-orange-400',
        'PRT': 'border-rose-400',
        'NUM': 'border-cyan-400'
    };
    return colors[tag] || 'border-slate-200';
}

function getNlpLabel(tag) {
    const labels = {
        'NOUN': 'İsim (Noun)',
        'VERB': 'Fiil (Verb)',
        'ADJ': 'Sıfat (Adjective)',
        'ADV': 'Zarf (Adverb)',
        'PRON': 'Zamir (Pronoun)',
        'DET': 'Belirteç (Determiner)',
        'ADP': 'Edat (Preposition)',
        'CONJ': 'Bağlaç (Conjunction)',
        'PRT': 'Parçacık (Particle)',
        'NUM': 'Sayı (Number)',
        'PUNCT': 'Noktalama'
    };
    return labels[tag] || tag;
}
