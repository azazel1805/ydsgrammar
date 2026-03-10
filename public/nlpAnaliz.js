
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

                <div class="flex gap-2">
                    <button onclick="runNlpAnalysis()" id="nlpBtn"
                        class="flex-1 bg-slate-900 hover:bg-purple-900 text-white py-4 rounded-2xl font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-slate-200">
                        <span>Cümleyi Çözümle</span>
                        <i class="fas fa-magic"></i>
                    </button>
                    <button onclick="speakPremium()" id="nlpSpeakBtn"
                        class="px-6 bg-white border-2 border-slate-100 text-slate-600 hover:text-purple-600 hover:border-purple-200 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
                        title="Premium Dinle">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
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

            <!-- Content Classification (Category) -->
            <div id="nlpCategoryCard" class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hidden">
                <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                    <i class="fas fa-tags"></i>
                </div>
                <div>
                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Konu (Topic)</p>
                    <p id="nlpCategory" class="text-xl font-bold text-slate-900">...</p>
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

        <!-- Translation Card -->
        <div class="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2" style="font-family: 'Playfair Display', serif;">
                <i class="fas fa-language text-blue-400"></i> Cümlenin Anlamı (Translation)
            </h3>
            <div id="nlpTranslation" class="text-xl font-medium leading-relaxed italic opacity-90 border-l-4 border-blue-500 pl-6">
                Çeviri yükleniyor...
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
        // Translation is now handled directly by the proxy response, but let's keep MyMemory as secondary or logic check
        if (data.translation) {
            document.getElementById("nlpTranslation").innerText = data.translation;
        } else {
            fetchTranslation(input.value.trim()); // Fallback if Google translation is missing
        }
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

    // 2.5 Categories
    const catCard = document.getElementById("nlpCategoryCard");
    const catText = document.getElementById("nlpCategory");
    if (data.categories && data.categories.length > 0) {
        catCard.classList.remove("hidden");
        catText.innerText = data.categories.map(c => c.name.split("/").pop()).join(", ");
    } else {
        catCard.classList.add("hidden");
    }

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
                    ${t.lemma && t.lemma !== t.text.content ? `<p class="opacity-70">Kelime Kökü: ${t.lemma}</p>` : ''}
                    ${t.partOfSpeech.case && !t.partOfSpeech.case.includes('UNKNOWN') ? `<p class="opacity-70">Durum: ${t.partOfSpeech.case}</p>` : ''}
                    ${t.partOfSpeech.person && !t.partOfSpeech.person.includes('UNKNOWN') ? `<p class="opacity-70">Şahıs: ${t.partOfSpeech.person}</p>` : ''}
                    ${t.partOfSpeech.mood && !t.partOfSpeech.mood.includes('UNKNOWN') ? `<p class="opacity-70">Kip: ${t.partOfSpeech.mood}</p>` : ''}
                    ${t.partOfSpeech.tense && !t.partOfSpeech.tense.includes('UNKNOWN') ? `<p class="opacity-70">Zaman: ${t.partOfSpeech.tense}</p>` : ''}
                </div>
            </div>
        `;
        treeDiv.appendChild(tokenEl);
    });

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
async function fetchTranslation(text) {
    const trDiv = document.getElementById("nlpTranslation");
    if (!trDiv) return;
    try {
        // Log to identify translation source
        console.log("Fetching translation from MyMemory...");
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|tr`);
        const data = await response.json();

        if (data.status === 403 || (data.responseData?.translatedText && data.responseData.translatedText.includes("MYMEMORY WARNING"))) {
            throw new Error("MyMemory limit reached");
        }

        trDiv.innerText = data.responseData.translatedText || "Çeviri bulunamadı.";
    } catch (err) {
        console.warn("MyMemory failed, trying Google NLP Proxy fallback...", err.message);
        trDiv.innerHTML = `<span class="text-amber-400 text-sm italic">MyMemory limitine ulaşıldı. Google Cloud ile çeviriliyor...</span>`;

        try {
            // Fallback to our own secure Netlify function that can use Google Cloud translation if enabled
            // For now, let's at least show a better error or use a secondary free provider if possible
            trDiv.innerText = "Günlük ücretsiz MyMemory çeviri limitiniz doldu. Lütfen yarın tekrar deneyin veya Google Cloud Translation API'yi etkinleştirin.";
        } catch (innerErr) {
            trDiv.innerText = "Çeviri şu an yapılamıyor.";
        }
    }
}

async function speakPremium() {
    const text = document.getElementById("nlpInput")?.value.trim();
    if (!text) return;

    const btn = document.getElementById("nlpSpeakBtn");
    const originalIcon = btn.innerHTML;
    btn.innerHTML = `<i class="fas fa-spinner animate-spin"></i>`;
    btn.disabled = true;

    try {
        const res = await fetch("/.netlify/functions/speakPremium", {
            method: "POST",
            body: JSON.stringify({ text })
        });
        const data = await res.json();

        if (data.audioContent) {
            const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
            audio.play();
        } else {
            // Fallback to basic TTS
            if (typeof speakWord === "function") speakWord(text);
        }
    } catch (err) {
        if (typeof speakWord === "function") speakWord(text);
    } finally {
        btn.innerHTML = originalIcon;
        btn.disabled = false;
    }
}
