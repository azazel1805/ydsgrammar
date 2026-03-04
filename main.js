/* ==========================================␊
   GLOBAL VARIABLES (Quiz)␊
========================================== */␊
␊
let allItems = [];␊
let quizSet = [];␊
let quizResults = [];␊
let currentQ = 0;␊
let score = 0;␊
␊
/* ==========================================␊
   DOM READY␊
========================================== */␊
␊
document.addEventListener("DOMContentLoaded", function () {␊
␊
    function safeInject(id, content){␊
        const el = document.getElementById(id);␊
        if(el && typeof content !== 'undefined'){␊
            el.innerHTML = content;␊
        }␊
    }␊
␊
    /* ================= TAB INJECTION ================= */␊
␊
    safeInject("tab-profile", typeof profileHTML !== 'undefined' ? profileHTML : undefined);␊
safeInject("tab-modals", typeof modalsHTML !== 'undefined' ? modalsHTML : undefined);␊
safeInject("tab-prepositions", typeof prepositionsHTML !== 'undefined' ? prepositionsHTML : undefined);␊
safeInject("tab-tenses", typeof tensesHTML !== 'undefined' ? tensesHTML : undefined);␊
safeInject("tab-conjunctions", typeof conjunctionsHTML !== 'undefined' ? conjunctionsHTML : undefined);␊
safeInject("tab-dictionary", typeof dictionaryHTML !== 'undefined' ? dictionaryHTML : undefined);␊
safeInject("tab-reading", typeof readingHTML !== 'undefined' ? readingHTML : undefined);␊
safeInject("tab-passive", typeof passiveHTML !== 'undefined' ? passiveHTML : undefined);␊
safeInject("tab-relative", typeof relativeHTML !== 'undefined' ? relativeHTML : undefined);␊
safeInject("tab-noun", typeof nounHTML !== 'undefined' ? nounHTML : undefined);␊
safeInject("tab-sentence", typeof sentenceCorrectorHTML !== 'undefined' ? sentenceCorrectorHTML : undefined);␊
␊
␊
␊
    if(typeof initSentenceCorrector === "function"){␊
        initSentenceCorrector();␊
␊
    }␊
␊
    /* ================= THEME ================= */␊
␊
    const savedTheme = localStorage.getItem("theme");␊
    if (␊
        savedTheme === "dark" ||␊
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)␊
    ) {␊
        document.documentElement.classList.add("dark");␊
    }␊
␊
    /* ================= QUIZ LOAD ================= */␊
␊
    setTimeout(loadQuizData, 800);␊
␊
    /* ================= HAMBURGER BIND ================= */␊
␊
    const hamburgerBtn = document.getElementById("hamburgerBtn");␊
    const drawer = document.getElementById("mobileDrawer");␊
    const overlay = document.getElementById("drawerOverlay");␊
␊
    if(hamburgerBtn && drawer && overlay){␊
        hamburgerBtn.addEventListener("click", () => {␊
            drawer.classList.remove("translate-x-full");␊
            overlay.classList.remove("hidden");␊
            document.body.style.overflow = "hidden";␊
        });␊
␊
        overlay.addEventListener("click", () => {␊
            drawer.classList.add("translate-x-full");␊
            overlay.classList.add("hidden");␊
            document.body.style.overflow = "auto";␊
        });␊
    }␊
});␊
␊
/* ==========================================␊
   QUIZ DATA SCRAPER␊
========================================== */␊
␊
window.loadQuizData = function(){␊
␊
    allItems = [];␊
␊
    document.querySelectorAll('.italic, .example-text')␊
    .forEach(ex => {␊
␊
        let highlight = ex.querySelector(␊
            '.highlight-modal, .highlight-verb, .font-bold'␊
        );␊
␊
        if(highlight && ex.innerText.length > 20){␊
␊
            allItems.push({␊
                fullSentence: ex.innerText.trim(),␊
                correct: highlight.innerText.trim()␊
            });␊
        }␊
    });␊
␊
    console.log("Quiz data loaded:", allItems.length);␊
};␊
␊
/* ==========================================␊
   TAB SYSTEM␊
========================================== */␊
␊
window.switchTab = function(tabName){␊
␊
    document.querySelectorAll('.tab-content')␊
        .forEach(el => el.classList.remove('active'));␊
␊
    document.querySelectorAll('.tab-btn, .drawer-btn')
        .forEach(btn => btn.classList.remove('active'));␊
␊
    const target = document.getElementById('tab-' + tabName);␊
    if(target) target.classList.add('active');␊
␊
    document.querySelectorAll('.tab-btn, .drawer-btn').forEach(btn => {
        if(btn.dataset.tab === tabName){
            btn.classList.add('active');␊
        }␊
    });␊
␊
    if(tabName === "dashboard"){␊
        setTimeout(loadQuizData, 500);␊
    }␊
␊
    if(tabName === "prepositions" && typeof initPrepositions === "function"){␊
        initPrepositions();␊
    }␊
␊
    document.body.style.overflow = "auto";␊
    window.scrollTo({top:0, behavior:'smooth'});␊
};
␊
␊
␊
␊
␊
␊
/* ==========================================␊
   DARK MODE␊
========================================== */␊
␊
window.toggleDarkMode = function(){␊
␊
    const html = document.documentElement;␊
␊
    if(html.classList.contains("dark")){␊
        html.classList.remove("dark");␊
        localStorage.setItem("theme", "light");␊
    } else {␊
        html.classList.add("dark");␊
        localStorage.setItem("theme", "dark");␊
    }␊
};␊
␊
/* ==========================================␊
   QUIZ ENGINE␊
========================================== */␊
␊
window.openQuiz = function(){␊
    const modal = document.getElementById('quizModal');␊
    if(!modal) return;␊
    modal.classList.remove('hidden');␊
    modal.classList.add('flex');␊
    resetQuizView();␊
};␊
␊
window.closeQuiz = function(){␊
    const modal = document.getElementById('quizModal');␊
    if(!modal) return;␊
    modal.classList.add('hidden');␊
    modal.classList.remove('flex');␊
document.body.style.overflow = "auto";␊
};␊
␊
function resetQuizView(){␊
    document.getElementById('quizStart').style.display = 'block';␊
    document.getElementById('quizGame').style.display = 'none';␊
    document.getElementById('quizResult').style.display = 'none';␊
}␊
␊
window.startQuiz = function(n){␊
␊
    if(allItems.length < 5){␊
        alert("Quiz data not ready yet.");␊
        return;␊
    }␊
␊
    quizSet = [...allItems]␊
        .sort(() => 0.5 - Math.random())␊
        .slice(0, n);␊
␊
    currentQ = 0;␊
    score = 0;␊
    quizResults = [];␊
␊
    document.getElementById('quizStart').style.display = 'none';␊
    document.getElementById('quizGame').style.display = 'block';␊
    document.getElementById('quizResult').style.display = 'none';␊
␊
    showQuestion();␊
};␊
␊
function showQuestion(){␊
␊
    const q = quizSet[currentQ];␊
    if(!q) return;␊
␊
    document.getElementById('qNum').innerText = currentQ + 1;␊
    document.getElementById('qScore').innerText = score;␊
␊
    document.getElementById('qSentence').innerText =␊
        q.fullSentence.replace(q.correct, "__________");␊
␊
    const container = document.getElementById('qOptions');␊
    container.innerHTML = '';␊
␊
    let pool = allItems.filter(i => i.correct !== q.correct);␊
    let distractors = pool␊
        .sort(() => 0.5 - Math.random())␊
        .slice(0,3)␊
        .map(i => i.correct);␊
␊
    let options = [...distractors, q.correct]␊
        .sort(() => 0.5 - Math.random());␊
␊
    options.forEach(opt => {␊
␊
        const btn = document.createElement("button");␊
        btn.innerText = opt;␊
        btn.className = "p-4 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold";␊
        btn.onclick = () => checkAnswer(btn, opt, q.correct);␊
        container.appendChild(btn);␊
    });␊
}␊
␊
function checkAnswer(btn, selected, correct){␊
␊
    const buttons = document.querySelectorAll('#qOptions button');␊
    buttons.forEach(b => b.disabled = true);␊
␊
    const isCorrect = selected === correct;␊
␊
    if(isCorrect){␊
        btn.classList.add('bg-emerald-500','text-white');␊
        score += 10;␊
    } else {␊
        btn.classList.add('bg-red-500','text-white');␊
        buttons.forEach(b=>{␊
            if(b.innerText === correct){␊
                b.classList.add('bg-emerald-500','text-white');␊
            }␊
        });␊
    }␊
␊
    quizResults.push({␊
        question: quizSet[currentQ].fullSentence,␊
        selected,␊
        correct,␊
        isCorrect␊
    });␊
␊
    setTimeout(()=>{␊
        currentQ++;␊
        if(currentQ < quizSet.length){␊
            showQuestion();␊
        } else {␊
            showResult();␊
        }␊
    }, 1200);␊
}␊
␊
function showResult(){␊
␊
    document.getElementById('quizGame').style.display = 'none';␊
    document.getElementById('quizResult').style.display = 'block';␊
    document.getElementById('finalScore').innerText = score;␊
␊
    const errorBox = document.getElementById('quizErrorSummary');␊
    if(!errorBox) return;␊
␊
    let html = `␊
    <div class="mt-6">␊
    <h3 class="font-bold mb-4 text-purple-400">␊
    📊 Quiz Summary␊
    </h3>␊
    `;␊
␊
    quizResults.forEach((res, i)=>{␊
␊
        html += `␊
        <div class="mb-4 p-4 rounded-lg text-sm␊
        ${res.isCorrect
            ? 'bg-emerald-900/40 border border-emerald-500'
            : 'bg-red-900/40 border border-red-500'}">␊
␊
            <div class="font-semibold mb-2">␊
                ${i+1}. ${res.question}␊
            </div>␊
␊
            <div>␊
                Your Answer:␊
                <span class="${res.isCorrect ? 'text-emerald-400' : 'text-red-400'}">␊
                ${res.selected}␊
                </span>␊
            </div>␊
␊
            ${!res.isCorrect ? `␊
            <div class="text-emerald-400">␊
                Correct: ${res.correct}␊
            </div>␊
            ` : ''}␊
␊
        </div>␊
        `;␊
    });␊
␊
    html += `</div>`;␊
    errorBox.innerHTML = html;␊
}␊
␊
/* ==========================================␊
   DRAWER HELPERS␊
========================================== */␊
␊
window.closeDrawer = function(){␊
    const drawer = document.getElementById("mobileDrawer");␊
    const overlay = document.getElementById("drawerOverlay");␊
␊
    if(drawer) drawer.classList.add("translate-x-full");␊
    if(overlay) overlay.classList.add("hidden");␊
␊
    document.body.style.overflow = "auto";␊
};␊
␊
window.switchTabAndClose = function(tab){␊
    switchTab(tab);␊
    closeDrawer();␊
};␊
␊
/* ==========================================␊
   TACTIC TOGGLES␊
========================================== */␊
␊
window.toggleModalTactics = function(){␊
    const content = document.getElementById("modalTacticContent");␊
    const icon = document.getElementById("modalTacticToggleIcon");␊
␊
    if(content) content.classList.toggle("hidden");␊
    if(icon) icon.innerText = icon.innerText === "▼" ? "▲" : "▼";␊
};␊
␊
window.toggleTenseTactics = function(){␊
    const content = document.getElementById("tenseTacticContent");␊
    const icon = document.getElementById("tenseTacticToggleIcon");␊
␊
    if(content) content.classList.toggle("hidden");␊
    if(icon) icon.innerText = icon.innerText === "▼" ? "▲" : "▼";␊
};␊
␊
␊
document.addEventListener("DOMContentLoaded", () => {␊
␊
    const scrollBtn = document.getElementById("scrollTopBtn");␊
␊
    if (!scrollBtn) return;␊
␊
    window.addEventListener("scroll", () => {␊
        if (window.scrollY > 300) {␊
            scrollBtn.classList.remove("hidden");␊
        } else {␊
            scrollBtn.classList.add("hidden");␊
        }␊
    });␊
␊
    scrollBtn.addEventListener("click", () => {␊
        window.scrollTo({ top: 0, behavior: "smooth" });␊
    });␊
␊
});␊
␊
/* ==========================================
   MOBILE DRAWER FIX
========================================== */

document.addEventListener("click", function(e){

    if(e.target.id === "hamburgerBtn"){

        const drawer = document.getElementById("mobileDrawer");
        const overlay = document.getElementById("drawerOverlay");

        if(drawer && overlay){
            drawer.classList.remove("translate-x-full");
            overlay.classList.remove("hidden");
            document.body.style.overflow = "hidden";
        }

    }

});

document.addEventListener("click", function(e){

    if(e.target.id === "drawerOverlay"){

        const drawer = document.getElementById("mobileDrawer");
        const overlay = document.getElementById("drawerOverlay");

        if(drawer && overlay){
            drawer.classList.add("translate-x-full");
            overlay.classList.add("hidden");
            document.body.style.overflow = "auto";
        }

    }

});


