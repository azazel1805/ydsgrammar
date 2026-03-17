/* =========================================
 YDS Vocabulary Engine v9.0
 CEFR + Frequency Heat
 Multi TR per Definition
 3 Unsplash Images
 Firestore Notebook
 ========================================= */

const UNSPLASH_ACCESS_KEY = "0uDnN1Zl1YFXRG3vHAKgEZoTakXkCg65RV3LtgXiNcM";

/* =========================================
 HTML TEMPLATE
 ========================================= */

const dictionaryHTML = `
<div class="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
  <!-- HEADER & SEARCH -->
  <div class="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-slate-100 shadow-2xl shadow-indigo-500/5 relative overflow-hidden">
    <div class="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none rotate-12">
      <i class="fas fa-book-open text-9xl"></i>
    </div>
    
    <div class="relative z-10">
      <div class="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase mb-6">
        <i class="fas fa-brain"></i>
        <span>AI Powered Vocabulary Engine</span>
      </div>
      
      <h2 class="text-3xl lg:text-4xl font-black text-slate-900 mb-8 tracking-tight" style="font-family:'Playfair Display',serif;">
        YDS <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Vocabulary</span> Engine
      </h2>

      <div class="relative flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1 group">
          <i class="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"></i>
          <input id="dictWordInput" type="text"
            placeholder="Kelime ara... (örn: alleviate, exacerbate)"
            onkeydown="if(event.key==='Enter') searchDictionaryWord()"
            class="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 text-slate-900 focus:bg-white focus:border-indigo-500 transition-all font-bold placeholder:text-slate-400 outline-none">
        </div>
        <button onclick="searchDictionaryWord()" 
          class="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-200">
          KEŞFET
        </button>
      </div>
    </div>
  </div>

  <!-- OUTPUT AREA -->
  <div id="dictOutput" class="min-h-[200px] flex flex-col gap-6">
    <div class="flex flex-col items-center justify-center p-20 text-center opacity-40">
       <div class="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-3xl mb-4">
          <i class="fas fa-terminal"></i>
       </div>
       <p class="font-bold text-slate-500">Analiz başlatmak için bir kelime girin.</p>
    </div>
  </div>

  <!-- POPUP -->
  <div id="imagePopup" class="fixed inset-0 bg-slate-900/90 hidden items-center justify-center z-[100] p-4 backdrop-blur-sm animate-in fade-in duration-300">
    <div class="bg-white p-2 rounded-[2rem] relative max-w-2xl w-full shadow-2xl scale-in-center">
      <button onclick="closeImagePopup()" 
        class="absolute -top-4 -right-4 w-10 h-10 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-xl hover:bg-red-500 hover:text-white transition-all z-10">
        <i class="fas fa-times"></i>
      </button>
      <img id="popupImage" class="w-full rounded-[1.8rem] shadow-lg">
      <div id="popupCredit" class="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center"></div>
    </div>
  </div>
</div>

<style>
  .scale-in-center { animation: scale-in-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; }
  @keyframes scale-in-center {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  .tag-pill { @apply px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all hover:scale-105 active:scale-95 cursor-pointer; }
</style>
`;

/* =========================================
 CEFR
 ========================================= */

function getCEFR(score) {
    if (score >= 6.5) return { level: "A1", desc: "Elementary", color: "bg-emerald-500" };
    if (score >= 5.5) return { level: "A2", desc: "Pre-Intermediate", color: "bg-emerald-600" };
    if (score >= 4.5) return { level: "B1", desc: "Intermediate", color: "bg-amber-500" };
    if (score >= 3.5) return { level: "B2", desc: "Upper-Intermediate", color: "bg-orange-500" };
    if (score >= 2.5) return { level: "C1", desc: "Advanced", color: "bg-rose-500" };
    return { level: "C2", desc: "Proficiency", color: "bg-indigo-600" };
}

/* =========================================
 UNSPLASH
 ========================================= */

async function fetchUnsplashImages(word) {
    try {
        const res = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(word)}&per_page=3`,
            {
                headers: {
                    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
                }
            }
        );

        const data = await res.json();

        if (data.results) {
            return data.results.map(img => ({
                thumb: img.urls.small,
                full: img.urls.regular,
                author: img.user.name,
                authorLink: img.user.links.html
            }));
        }

        return [];
    } catch {
        return [];
    }
}

/* =========================================
 TRANSLATE
 ========================================= */

async function translateText(text) {
    try {
        const res = await fetch("/.netlify/functions/nlpAnalyze", {
            method: "POST",
            body: JSON.stringify({ text: text })
        });
        const data = await res.json();
        return data.translation || "";
    } catch (e) {
        console.error("Translation error:", e);
        return "";
    }
}

/* =========================================
 MAIN SEARCH
 ========================================= */

async function searchDictionaryWord(wordParam = null) {

    const input = document.getElementById("dictWordInput");
    if (!input) return;

    const word = (wordParam || input.value).toLowerCase().trim();
    if (!word) return;

    input.value = word;

    const output = document.getElementById("dictOutput");
    if (!output) return;

    output.innerHTML = `
      <div class="flex flex-col items-center justify-center p-20 animate-pulse">
        <div class="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p class="font-black text-slate-400 text-xs uppercase tracking-widest">Analiz Ediliyor...</p>
      </div>
    `;

    try {

        const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!dictRes.ok) throw new Error();
        const dictData = await dictRes.json();

        // Parallel fetch for extensions
        const [synData, antData, freqData, familyData, images] = await Promise.all([
          fetch(`https://api.datamuse.com/words?rel_syn=${word}`).then(r => r.json()),
          fetch(`https://api.datamuse.com/words?rel_ant=${word}`).then(r => r.json()),
          fetch(`https://api.datamuse.com/words?sp=${word}&md=f`).then(r => r.json()),
          fetch(`https://api.datamuse.com/words?ml=${word}&max=10`).then(r => r.json()),
          fetchUnsplashImages(word)
        ]);

        let score = 0;
        const freqTag = freqData[0]?.tags?.find(t => t.startsWith("f:"));
        if (freqTag) score = parseFloat(freqTag.split(":")[1]);
        score = Math.max(0, Math.min(score, 7));
        const percent = (score / 7) * 100;
        const cefr = getCEFR(score);

        const entry = dictData[0];
        let html = "";

        /* WORD CARD */
        html += `
          <div class="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-slate-100 shadow-xl animate-in slide-in-from-bottom-4 duration-500">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-10 border-b border-slate-50">
               <div>
                  <div class="flex items-center gap-4 mb-2">
                    <h3 class="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">${entry.word}</h3>
                    <div class="flex gap-2">
                       <button onclick="speakWord('${entry.word}')" class="w-10 h-10 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-all flex items-center justify-center shadow-sm">
                         <i class="fas fa-volume-up"></i>
                       </button>
                       <button onclick="saveWord('${entry.word}')" class="w-10 h-10 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-400 hover:text-amber-500 transition-all flex items-center justify-center shadow-sm">
                         <i class="fas fa-star"></i>
                       </button>
                    </div>
                  </div>
                  <p class="text-indigo-500 font-black text-lg font-mono opacity-60 tracking-widest">${entry.phonetic || '// ... //'}</p>
               </div>
               
               <div class="bg-slate-50 p-4 rounded-3xl border border-slate-100 min-w-[200px]">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Difficulty / CEFR</span>
                    <span class="px-2 py-0.5 ${cefr.color} text-white rounded-lg text-[10px] font-black uppercase tracking-widest">${cefr.level}</span>
                  </div>
                  <div class="relative h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-1">
                    <div class="absolute inset-0 bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 transition-all duration-1000" style="width:${percent}%"></div>
                  </div>
                  <p class="text-[9px] font-bold text-slate-400 text-right uppercase tracking-tighter">${cefr.desc}</p>
               </div>
            </div>

            <!-- DEFINITIONS -->
            <div class="grid lg:grid-cols-2 gap-10">
              <div class="space-y-8">
                <h4 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                   <i class="fas fa-align-left text-indigo-500"></i> Meanings & Translations
                </h4>
                ${entry.meanings.map(m => `
                  <div class="group">
                    <div class="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] font-black uppercase tracking-widest mb-4 ring-1 ring-indigo-100">
                      ${m.partOfSpeech}
                    </div>
                    <div class="space-y-6">
                      ${m.definitions.slice(0, 2).map((d, idx) => `
                        <div class="relative pl-6 border-l-2 border-slate-100 group-hover:border-indigo-200 transition-colors">
                           <p class="text-slate-800 font-medium leading-relaxed mb-2">${d.definition}</p>
                           <div id="tr-${m.partOfSpeech}-${idx}" class="py-2.5 px-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800 font-bold text-sm italic shadow-sm shadow-emerald-100/50 animate-in slide-in-from-left-2 duration-500">
                              <i class="fas fa-language mr-2 opacity-40"></i> Yükleniyor...
                           </div>
                           ${d.example ? `
                             <p class="mt-3 text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">"${d.example}"</p>
                           ` : ''}
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>

              <div class="space-y-8">
                <h4 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                   <i class="fas fa-images text-indigo-500"></i> Visual Context
                </h4>
                ${images.length ? `
                  <div class="grid grid-cols-2 gap-3">
                    ${images.map((img, i) => `
                      <div onclick="openImagePopup('${img.full}','${img.author}','${img.authorLink}')"
                        class="aspect-video bg-slate-100 rounded-2xl overflow-hidden cursor-zoom-in group relative shadow-md">
                        <img src="${img.thumb}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    `).join('')}
                  </div>
                ` : `<div class="p-10 bg-slate-50 rounded-3xl text-center text-slate-300 italic text-xs border border-dashed border-slate-200">Görsel bulunamadı</div>`}

                <!-- RELATIONS -->
                <div class="space-y-6 pt-6 border-t border-slate-50">
                  ${synData.length ? `
                    <div>
                      <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Synonyms</p>
                      <div class="flex flex-wrap gap-2">
                        ${synData.slice(0, 6).map(s => `<span onclick="searchDictionaryWord('${s.word}')" class="tag-pill bg-blue-50 text-blue-700 ring-1 ring-blue-100 hover:bg-blue-600 hover:text-white">${s.word}</span>`).join('')}
                      </div>
                    </div>
                  ` : ''}
                  
                  ${antData.length ? `
                    <div>
                      <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Antonyms</p>
                      <div class="flex flex-wrap gap-2">
                        ${antData.slice(0, 6).map(s => `<span onclick="searchDictionaryWord('${s.word}')" class="tag-pill bg-rose-50 text-rose-700 ring-1 ring-rose-100 hover:bg-rose-600 hover:text-white">${s.word}</span>`).join('')}
                      </div>
                    </div>
                  ` : ''}

                  ${familyData.length ? `
                    <div>
                      <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Related / Family</p>
                      <div class="flex flex-wrap gap-2">
                        ${familyData.slice(0, 6).map(s => `<span onclick="searchDictionaryWord('${s.word}')" class="tag-pill bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100 hover:bg-indigo-600 hover:text-white">${s.word}</span>`).join('')}
                      </div>
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>
          </div>
        `;

        output.innerHTML = html;

        // Perform translations asynchronously and update the UI
        entry.meanings.forEach((m, mIdx) => {
          m.definitions.slice(0, 2).forEach(async (d, dIdx) => {
            const tr = await translateText(d.definition);
            const el = document.getElementById(`tr-${m.partOfSpeech}-${dIdx}`);
            if (el) {
              el.innerHTML = `<i class="fas fa-language mr-2 opacity-40"></i> ${tr || 'Çeviri bulunamadı'}`;
            }
          });
        });

    } catch (e) {
        console.error(e);
        output.innerHTML = `
          <div class="bg-white rounded-3xl p-12 text-center border ring-4 ring-slate-50">
             <div class="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-exclamation-triangle"></i>
             </div>
             <p class="font-bold text-slate-800 mb-1">Kelime bulunamadı</p>
             <p class="text-sm text-slate-400">Yazımı kontrol edip tekrar deneyin.</p>
          </div>
        `;
    }
}

/* =========================================
 IMAGE POPUP
 ========================================= */

function openImagePopup(url, author, link) {
    const popup = document.getElementById("imagePopup");
    const img = document.getElementById("popupImage");
    const credit = document.getElementById("popupCredit");

    img.src = url;
    credit.innerHTML = `Photo by <a href="${link}" target="_blank" class="underline">${author}</a> on Unsplash`;

    popup.classList.remove("hidden");
    popup.classList.add("flex");
}

function closeImagePopup() {
    document.getElementById("imagePopup").classList.add("hidden");
}

/* =========================================
 SPEECH
 ========================================= */

function speakWord(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
}

/* =========================================
 FIRESTORE NOTEBOOK (SAFE VERSION)
========================================= */

async function saveWord(word) {

    if (!word || typeof word !== "string") {
        console.error("Invalid word:", word);
        return;
    }

    if (!window.currentUser) {
        alert("Please login first.");
        return;
    }

    try {

        // 🔍 Duplicate kontrolü
        const existing = await getSavedWordsFirestore();
        const alreadySaved = existing.some(item => item.word === word);

        if (alreadySaved) {
            alert("Word already saved.");
            return;
        }

        // ✅ Firestore'a OBJECT gönderiyoruz
        await saveWordFirestore({
            word: word,
            createdAt: new Date()
        });

        alert("Word saved successfully!");
        renderNotebook();

    } catch (error) {
        console.error("Save error:", error);
        alert("Error saving word.");
    }
}


/* =========================================
 RENDER NOTEBOOK
========================================= */

async function renderNotebook() {

    if (!window.currentUser) return;

    const container = document.getElementById("profileNotebookList");
    if (!container) return;

    try {

        const notebook = await getSavedWordsFirestore();

        container.innerHTML = "";

        if (!notebook || notebook.length === 0) {
            container.innerHTML =
                "<p class='text-sm text-gray-500'>No saved words yet.</p>";
            return;
        }

        notebook.forEach(item => {

            const div = document.createElement("div");
            div.className =
                "flex justify-between items-center bg-slate-100 p-2 rounded mb-2 text-sm";

            div.innerHTML = `
 <span class="font-medium cursor-pointer text-black hover:underline">
 ${item.word}
 </span>

 <button class="text-red-400 hover:text-red-600 text-xs">
 Delete
 </button>
 `;

            // Word click
            div.querySelector("span").onclick = () => {
                switchTab('dictionary');
                setTimeout(() => searchDictionaryWord(item.word), 200);
            };

            // Delete click
            div.querySelector("button").onclick = async () => {

                if (!confirm("Delete this word?")) return;

                await deleteWordFirestore(item.id);
                renderNotebook();
            };

            container.appendChild(div);
        });

    } catch (error) {
        console.error(error);
    }
}

/* =========================================
 AUTO LOAD AFTER LOGIN
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Eğer auth state değişimini dinliyorsan,
    // en sağlıklısı oradan renderNotebook çağırmak.

    setTimeout(() => {
        renderNotebook();
    }, 500);

});