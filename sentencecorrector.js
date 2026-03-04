// ==========================================
// SENTENCE CORRECTOR (LanguageTool Based)
// ==========================================

function initSentenceCorrector(){

    const input = document.getElementById("scInput");
    const checkBtn = document.getElementById("scCheck");
    const correctionsBox = document.getElementById("scCorrections");
    const correctedBox = document.getElementById("scCorrected");

    if(!input || !checkBtn) return;

    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    async function checkSentence(){

        const text = input.value.trim();

        if(!text){
            correctionsBox.innerHTML = `
                <div class="text-red-500 font-semibold">
                    Please enter a sentence.
                </div>`;
            correctedBox.innerHTML = "";
            return;
        }

        correctionsBox.innerHTML = `
            <div class="text-slate-500">
                Checking...
            </div>`;
        correctedBox.innerHTML = "";

        try{

            const url = `https://api.languagetool.org/v2/check?text=${encodeURIComponent(text)}&language=en-US`;

            const response = await fetch(url);
            const data = await response.json();

            if(!data.matches.length){
                correctionsBox.innerHTML = `
                    <div class="bg-emerald-100 dark:bg-emerald-900 
                    text-emerald-700 dark:text-emerald-300 
                    p-4 rounded-lg">
                    No errors detected.
                    </div>`;
                return;
            }

            let correctedSentence = text;

            const corrections = data.matches.map(match => ({
                message: match.message,
                replacement: match.replacements[0]?.value,
                offset: match.offset,
                length: match.length
            }));

            // Important: reverse order for safe replacement
            corrections.sort((a,b)=>b.offset - a.offset);

            corrections.forEach(c=>{
                if(c.replacement){
                    correctedSentence =
                        correctedSentence.slice(0, c.offset)
                        + c.replacement
                        + correctedSentence.slice(c.offset + c.length);
                }
            });

            // Show corrections
            correctionsBox.innerHTML = corrections.map(c=>`
                <div class="mb-3 p-4 
                bg-red-100 dark:bg-red-900 
                text-red-700 dark:text-red-300 
                rounded-lg text-sm">

                    ${c.message}
                    <div class="mt-1 font-semibold">
                        Suggestion: ${c.replacement || "No suggestion"}
                    </div>

                </div>
            `).join("");

            correctedBox.innerHTML = `
                <div class="mt-4 p-4 
                bg-emerald-100 dark:bg-emerald-900 
                text-emerald-700 dark:text-emerald-300 
                rounded-lg font-semibold">

                Corrected: ${correctedSentence}

                </div>
            `;

        }catch(err){

            correctionsBox.innerHTML = `
                <div class="text-red-500 font-semibold">
                    API Error. Try again.
                </div>`;
        }
    }

    const debouncedCheck = debounce(checkSentence, 1000);

    input.addEventListener("input", debouncedCheck);
    checkBtn.addEventListener("click", checkSentence);
}