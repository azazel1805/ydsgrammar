// ==========================================
// SENTENCE CORRECTOR (LanguageTool Based)
// ==========================================

function initSentenceCorrector() {
    const input = document.getElementById("scInput");
    const checkBtn = document.getElementById("scCheck");
    const correctionsBox = document.getElementById("scCorrections");
    const correctedArea = document.getElementById("scCorrectedArea");
    const correctedText = document.getElementById("scCorrectedText");
    const statusText = document.getElementById("scStatusText");
    const charCount = document.getElementById("charCount");
    const scSummary = document.getElementById("scSummary");

    if (!input || !checkBtn) return;

    // Character Count Listener
    input.addEventListener("input", () => {
        const len = input.value.length;
        charCount.innerText = `${len} / 1000`;
    });

    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    async function checkSentence() {
        const text = input.value.trim();

        if (!text) {
            correctionsBox.innerHTML = `
                <div class="flex flex-col items-center justify-center p-12 text-center opacity-30">
                    <i class="fas fa-keyboard text-3xl mb-4 text-slate-400"></i>
                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Lütfen bir cümle girin</p>
                </div>`;
            correctedArea.classList.add("hidden");
            statusText.innerText = "Bekleniyor";
            scSummary.innerHTML = "";
            return;
        }

        statusText.innerText = "Analiz Ediliyor...";
        checkBtn.disabled = true;
        checkBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ANALİZ EDİLİYOR';

        try {
            const url = `https://api.languagetool.org/v2/check?text=${encodeURIComponent(text)}&language=en-US`;
            const response = await fetch(url);
            const data = await response.json();

            checkBtn.disabled = false;
            checkBtn.innerHTML = '<span>HIZLI ANALİZ (Hataları Bul)</span> <i class="fas fa-bolt text-cyan-400"></i>';

            if (!data.matches.length) {
                statusText.innerText = "Hata Bulunmadı";
                scSummary.innerHTML = '<span class="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest ring-1 ring-emerald-200">Perfect</span>';
                correctionsBox.innerHTML = `
                    <div class="bg-white border border-emerald-100 rounded-[2rem] p-8 text-center shadow-lg shadow-emerald-500/5">
                        <div class="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-4">
                            <i class="fas fa-check-double text-2xl"></i>
                        </div>
                        <h3 class="text-slate-900 font-black text-lg mb-2">Harika! Hata bulunmadı.</h3>
                        <p class="text-slate-400 text-sm font-medium leading-relaxed">Cümleniz dilbilgisi kurallarına uygun görünüyor. Daha derin bir analiz için Monster AI'ı deneyebilirsiniz.</p>
                    </div>`;
                correctedArea.classList.add("hidden");
                return;
            }

            let correctedSentence = text;
            const corrections = data.matches.map(match => ({
                message: match.message,
                replacement: match.replacements[0]?.value,
                offset: match.offset,
                length: match.length,
                ruleType: match.rule.issueType || "Grammar"
            }));

            // Important: reverse order for safe replacement
            corrections.sort((a, b) => b.offset - a.offset);

            corrections.forEach(c => {
                if (c.replacement) {
                    correctedSentence = correctedSentence.slice(0, c.offset) + c.replacement + correctedSentence.slice(c.offset + c.length);
                }
            });

            // UI Feedback
            statusText.innerText = `${corrections.length} Hata Tespit Edildi`;
            scSummary.innerHTML = `<span class="px-3 py-1 bg-rose-100 text-rose-600 rounded-lg text-[10px] font-black uppercase tracking-widest ring-1 ring-rose-200">${corrections.length} ISSUES</span>`;

            // Show corrections
            correctionsBox.innerHTML = corrections.map(c => `
                <div class="sc-error-card animate-in slide-in-from-right-4 duration-300">
                    <span class="sc-error-badge">${c.ruleType}</span>
                    <div class="flex items-start gap-4 pr-16">
                        <div class="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500 flex-shrink-0 mt-1">
                            <i class="fas fa-exclamation-triangle text-xs"></i>
                        </div>
                        <div>
                            <p class="text-slate-700 font-bold text-sm mb-2 leading-snug">${c.message}</p>
                            ${c.replacement ? `
                                <div class="bg-cyan-50/50 p-3 rounded-xl border border-cyan-100/50 mt-3">
                                    <p class="text-[9px] font-black text-cyan-700 uppercase tracking-widest mb-1">ÖNERİ</p>
                                    <p class="text-cyan-900 font-black text-sm">${c.replacement}</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `).join("");

            correctedArea.classList.remove("hidden");
            correctedText.innerText = correctedSentence;

        } catch (err) {
            checkBtn.disabled = false;
            checkBtn.innerHTML = '<span>HIZLI ANALİZ (Hataları Bul)</span> <i class="fas fa-bolt text-cyan-400"></i>';
            statusText.innerText = "Bağlantı Hatası";
            correctionsBox.innerHTML = `
                <div class="p-8 text-center text-rose-500 font-bold bg-rose-50 rounded-2xl border border-rose-100">
                    <i class="fas fa-wifi-slash mb-2 text-2xl"></i>
                    <p>API hatası oluştu. Lütfen tekrar deneyin.</p>
                </div>`;
        }
    }

    const debouncedCheck = debounce(checkSentence, 1500);
    input.addEventListener("input", debouncedCheck);
    checkBtn.addEventListener("click", checkSentence);
}

// ==========================================
// MONSTER AI CHECK (Gemini Entegrasyonu)
// ==========================================
window.checkWithMonsterAI = async function() {
    const input = document.getElementById("scInput");
    const aiBtn = document.getElementById("scAiCheck");
    const aiResult = document.getElementById("scAiResult");
    const aiExplanation = document.getElementById("scAiExplanation");
    const correctedArea = document.getElementById("scCorrectedArea");
    const correctedText = document.getElementById("scCorrectedText");
    const scoreBar = document.getElementById("scScoreBar");
    const scoreValue = document.getElementById("scScoreValue");
    const statusText = document.getElementById("scStatusText");

    const text = input?.value.trim();
    if (!text) return alert("Analiz için bir cümle giriniz.");

    // Loading State
    const originalBtn = aiBtn.innerHTML;
    aiBtn.disabled = true;
    aiBtn.innerHTML = '<i class="fas fa-brain fa-spin"></i> MONSTER AI DÜŞÜNÜYOR...';
    statusText.innerText = "Monster AI Devrede...";

    try {
        const response = await fetch('/.netlify/functions/gemini-sentence-check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        if (!response.ok) throw new Error("AI Analiz servisi şu an meşgul.");

        const data = await response.json();
        
        // UI Update
        aiResult.classList.remove("hidden");
        aiExplanation.innerText = data.explanation || "Analiz başarılı.";
        
        if (data.score) {
            scoreBar.style.width = `${data.score}%`;
            scoreValue.innerText = `${data.score} / 100`;
        }

        if (data.corrected) {
            correctedArea.classList.remove("hidden");
            correctedText.innerText = data.corrected;
        }

        statusText.innerText = "AI Analizi Tamamlandı";

    } catch (err) {
        console.error(err);
        alert(err.message);
    } finally {
        aiBtn.disabled = false;
        aiBtn.innerHTML = originalBtn;
    }
};

// Global Copy Helper
window.copyCorrectedText = function() {
    const text = document.getElementById("scCorrectedText").innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.currentTarget;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Kopyalandı!';
        btn.classList.replace('bg-white/20', 'bg-white/50');
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.replace('bg-white/50', 'bg-white/20');
        }, 2000);
    });
};

// Global Reset Helper
window.resetSentenceCorrector = function() {
    const input = document.getElementById("scInput");
    const charCount = document.getElementById("charCount");
    const correctionsBox = document.getElementById("scCorrections");
    const correctedArea = document.getElementById("scCorrectedArea");
    const statusText = document.getElementById("scStatusText");
    const scSummary = document.getElementById("scSummary");

    if (input) input.value = "";
    if (charCount) charCount.innerText = "0 / 1000";
    if (statusText) statusText.innerText = "Analiz Hazır";
    if (scSummary) scSummary.innerHTML = "";
    if (correctedArea) correctedArea.classList.add("hidden");
    const aiResult = document.getElementById("scAiResult");
    const aiExplanation = document.getElementById("scAiExplanation");
    if (aiResult) aiResult.classList.add("hidden");
    if (aiExplanation) aiExplanation.innerText = "";
    
    if (correctionsBox) {
        correctionsBox.innerHTML = `
            <div class="flex flex-col items-center justify-center p-12 text-center opacity-30">
                <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl mb-4">
                    <i class="fas fa-check-circle"></i>
                </div>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Henüz analiz yapılmadı</p>
            </div>`;
    }
};