/* ==========================================
 GLOBAL VARIABLES (Quiz)
========================================== */

let allItems = [];
let quizSet = [];
let quizResults = [];
let currentQ = 0;
let score = 0;

/* ==========================================
 DOM READY
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    function safeInject(id, content) {
        const el = document.getElementById(id);
        if (el && typeof content !== 'undefined') {
            el.innerHTML = content;
        }
    }

    /* ================= TAB INJECTION ================= */

    safeInject("tab-profile", typeof profileHTML !== 'undefined' ? profileHTML : undefined);
    safeInject("tab-modals", typeof modalsHTML !== 'undefined' ? modalsHTML : undefined);
    safeInject("tab-prepositions", typeof prepositionsHTML !== 'undefined' ? prepositionsHTML : undefined);
    safeInject("tab-tenseagreement", typeof tenseAgreementHTML !== 'undefined' ? tenseAgreementHTML : undefined);
    safeInject("tab-tacticalpanels", typeof tacticalPanelsHTML !== 'undefined' ? tacticalPanelsHTML : undefined);
    safeInject("tab-nlpanaliz", typeof nlpAnalizHTML !== 'undefined' ? nlpAnalizHTML : undefined);

    safeInject("tab-conjunctions", typeof conjunctionsHTML !== 'undefined' ? conjunctionsHTML : undefined);
    safeInject("tab-dictionary", typeof dictionaryHTML !== 'undefined' ? dictionaryHTML : undefined);
    safeInject("tab-reading", typeof readingHTML !== 'undefined' ? readingHTML : undefined);
    safeInject("tab-passive", typeof passiveHTML !== 'undefined' ? passiveHTML : undefined);
    safeInject("tab-relative", typeof relativeHTML !== 'undefined' ? relativeHTML : undefined);
    safeInject("tab-quantifiers", typeof quantifiersHTML !== 'undefined' ? quantifiersHTML : undefined);
    safeInject("tab-noun", typeof nounHTML !== 'undefined' ? nounHTML : undefined);
    safeInject("tab-sentence", typeof sentenceCorrectorHTML !== 'undefined' ? sentenceCorrectorHTML : undefined);
    safeInject("tab-forum", typeof forumHTML !== 'undefined' ? forumHTML : undefined);
    safeInject("tab-restatement", typeof restatementHTML !== 'undefined' ? restatementHTML : undefined);
    safeInject("tab-paragraph", typeof paragraphHTML !== 'undefined' ? paragraphHTML : undefined);
    safeInject("tab-textdecon", typeof textDeconHTML !== 'undefined' ? textDeconHTML : undefined);
    safeInject("tab-analyzer", typeof analyzerHTML !== 'undefined' ? analyzerHTML : undefined);
    safeInject("tab-testlab", typeof testlabHTML !== 'undefined' ? testlabHTML : undefined);
    safeInject("tab-wordpractice", typeof wordPracticeHTML !== 'undefined' ? wordPracticeHTML : undefined);
    safeInject("tab-grammarchallenge", typeof trainingCenterCommonHTML !== 'undefined' ? trainingCenterCommonHTML('gc', '', '', '') : undefined);
    safeInject("tab-irrelevant", typeof trainingCenterCommonHTML !== 'undefined' ? trainingCenterCommonHTML('ir', '', '', '') : undefined);
    safeInject("tab-synonymmatch", typeof trainingCenterCommonHTML !== 'undefined' ? trainingCenterCommonHTML('sm', '', '', '') : undefined);

    if (typeof initSentenceCorrector === "function") {
        initSentenceCorrector();
    }

    if (typeof initForum === "function") {
        initForum();
    }

    if (typeof initFullExam === "function") {
        initFullExam();
    }

    if (typeof initTacticGuide === "function") {
        initTacticGuide();
    }

    if (typeof initTenseGuide2 === "function") {
        initTenseGuide2();
    }

    if (typeof initIfClauses === "function") {
        initIfClauses();
    }

    if (typeof initReportedSpeech === "function") {
        initReportedSpeech();
    }

    if (typeof initGerunds === "function") {
        initGerunds();
    }

    if (typeof initArticles === "function") {
        initArticles();
    }

    /* ================= THEME ================= */
    // Dark mode logic has been removed as per the literary light-only aesthetic.

    /* ================= QUIZ LOAD ================= */

    setTimeout(loadQuizData, 800);

    /* ================= HAMBURGER BIND ================= */

    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const drawer = document.getElementById("mobileDrawer");
    const overlay = document.getElementById("drawerOverlay");

    if (hamburgerBtn && drawer && overlay) {
        hamburgerBtn.addEventListener("click", () => {
            drawer.classList.remove("translate-x-full");
            overlay.classList.remove("hidden");
            document.body.style.overflow = "hidden";
        });

        overlay.addEventListener("click", () => {
            drawer.classList.add("translate-x-full");
            overlay.classList.add("hidden");
            document.body.style.overflow = "auto";
        });
    }

    // Deep link check (Both Hash and Pathname for SEO friendliness)
    const currentHash = window.location.hash.replace('#', '');
    const currentPath = window.location.pathname.replace(/^\/|\/$/g, '');

    const pathMap = {
        'passive-voice': 'passive',
        'noun-clauses': 'noun',
        'modals': 'modals',
        'prepositions': 'prepositions',
        'yds-vocabulary': 'vocabulary'
    };

    if (currentHash) {
        setTimeout(() => switchTab(currentHash), 1200);
    } else if (currentPath && pathMap[currentPath]) {
        setTimeout(() => switchTab(pathMap[currentPath]), 1200);
    } else if (currentPath && document.getElementById('tab-' + currentPath)) {
        setTimeout(() => switchTab(currentPath), 1200);
    } else {
        // Default to dashboard
        switchTab('dashboard');
    }
});

/* ==========================================
 QUIZ DATA SCRAPER
========================================== */

window.loadQuizData = function () {
    allItems = [];

    // 1. Scraping from DOM (Legacy sections like Tenses, Modals in HTML)
    document.querySelectorAll('.tab-content').forEach(tab => {
        const topicId = tab.id.replace('tab-', '');
        tab.querySelectorAll('.italic, .example-text, .tg2-en').forEach(ex => {
            let highlight = ex.querySelector('.highlight-modal, .highlight-verb, .font-bold');
            if (highlight && ex.innerText.length > 20) {
                allItems.push({
                    topic: topicId,
                    fullSentence: ex.innerText.trim(),
                    correct: highlight.innerText.trim()
                });
            }
        });
    });

    // 2. Scraping from JS Modules (New sections)
    // --- IF CLAUSES ---
    if (typeof IF_TYPES !== 'undefined') {
        IF_TYPES.forEach(type => {
            (type.usages || []).forEach(u => {
                (u.examples || []).forEach(ex => {
                    let sentence = ex.en;
                    let match = sentence.match(/\b(will|would|had|was|were|if|unless)\b/i);
                    if (match) allItems.push({ topic: 'ifclauses', fullSentence: sentence, correct: match[0] });
                });
            });
        });
    }

    // --- ARTICLES ---
    if (typeof ART_SECTIONS !== 'undefined') {
        ART_SECTIONS.forEach(sec => {
            (sec.usages || []).forEach(u => {
                (u.examples || []).forEach(ex => {
                    let match = ex.en.match(/\b(a|an|the)\b/i);
                    if (match) allItems.push({ topic: 'articles', fullSentence: ex.en, correct: match[0] });
                });
            });
        });
    }

    // --- REPORTED SPEECH ---
    if (typeof RS_DATA !== 'undefined' && RS_DATA.types) {
        RS_DATA.types.forEach(type => {
            (type.usages || []).forEach(u => {
                (u.examples || []).forEach(ex => {
                    let match = ex.en.match(/\b(said|told|asked|suggested|promised|refused|if|whether)\b/i);
                    if (match) allItems.push({ topic: 'reportedspeech', fullSentence: ex.en, correct: match[0] });
                });
            });
        });
    }

    // --- GERUNDS & INF (Fixed structure) ---
    if (typeof GI_SECTIONS !== 'undefined') {
        GI_SECTIONS.forEach(sec => {
            // Check direct examples
            (sec.examples || []).forEach(ex => {
                let match = ex.en.match(/\b\w+(ing|to \w+)\b/i);
                if (match) allItems.push({ topic: 'gerunds', fullSentence: ex.en, correct: match[0] });
            });
            // Check pairs (begin/start etc)
            (sec.pairs || []).forEach(p => {
                [p.e1, p.e2].forEach(sent => {
                    let match = sent.match(/\b\w+(ing|to \w+)\b/i);
                    if (match) allItems.push({ topic: 'gerunds', fullSentence: sent, correct: match[0] });
                });
            });
            // Check meaning_pairs (stop/try etc)
            (sec.meaning_pairs || []).forEach(mp => {
                (mp.cases || []).forEach(c => {
                    let match = c.e.match(/\b\w+(ing|to \w+)\b/i);
                    if (match) allItems.push({ topic: 'gerunds', fullSentence: c.e, correct: match[0] });
                });
            });
        });
    }

    console.log("Quiz engine updated. Total samples:", allItems.length);
};

/* ==========================================
 TAB SYSTEM
========================================== */

window.switchTab = function (tabName) {
    document.querySelectorAll('.tab-content')
        .forEach(el => el.classList.remove('active'));

    document.querySelectorAll('.tab-btn, .drawer-btn')
        .forEach(btn => btn.classList.remove('active'));

    const target = document.getElementById('tab-' + tabName);
    if (target) {
        target.classList.add('active');
        // If content is empty (due to race condition or error), try re-injecting
        if (target.innerHTML.trim() === "" || target.innerHTML.includes("undefined")) {
            console.warn("Tab content empty, re-injecting:", tabName);
            reinjectTabContent(tabName);
        }
    }

    const protectedTabs = ['forum', 'profile', 'analyzer', 'testlab', 'restatement', 'paragraph', 'textdecon', 'vocabulary', 'wordpractice', 'grammarchallenge', 'irrelevant', 'synonymmatch'];

    if (protectedTabs.includes(tabName) && !window.currentUser) {
        console.warn("Protected tab accessed without login:", tabName);
        if (typeof window.openLoginModal === "function") {
            window.openLoginModal();
        } else {
            alert("This feature is for registered users only. Please sign in.");
        }
        return; // Halt tab switch
    }

    document.querySelectorAll('.tab-btn, .drawer-btn').forEach(btn => {
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });

    // Update URL hash without scrolling
    if (window.location.hash !== "#" + tabName) {
        history.replaceState(null, null, "#" + tabName);
    }

    // Call dynamic SEO update
    updateSEO(tabName);

    // Send page view to GA if it exists
    if (typeof gtag === 'function') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_path: window.location.hash
        });
    }

    if (tabName === "dashboard") {
        setTimeout(loadQuizData, 500);
    }

    if (tabName === "prepositions" && typeof initPrepositions === "function") {
        initPrepositions();
    }

    if (tabName === "profile" && typeof window.forceProfileRender === "function") {
        window.forceProfileRender();
    }

    if (tabName === "wordpractice" && typeof initWordPractice === "function") {
        initWordPractice();
    }

    if (tabName === "grammarchallenge" && typeof initGrammarChallenge === "function") {
        initGrammarChallenge();
    }

    if (tabName === "irrelevant" && typeof initIrrelevant === "function") {
        initIrrelevant();
    }

    if (tabName === "synonymmatch" && typeof initSynonymMatch === "function") {
        initSynonymMatch();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.switchTabAndClose = function (tabName) {
    switchTab(tabName);
    closeDrawer();
};

function reinjectTabContent(tabName) {
    const mappings = {
        "profile": typeof profileHTML !== 'undefined' ? profileHTML : null,
        "modals": typeof modalsHTML !== 'undefined' ? modalsHTML : null,
        "prepositions": typeof prepositionsHTML !== 'undefined' ? prepositionsHTML : null,
        "quantifiers": typeof quantifiersHTML !== 'undefined' ? quantifiersHTML : null,
        "tenseagreement": typeof tenseAgreementHTML !== 'undefined' ? tenseAgreementHTML : null,

        "conjunctions": typeof conjunctionsHTML !== 'undefined' ? conjunctionsHTML : null,
        "dictionary": typeof dictionaryHTML !== 'undefined' ? dictionaryHTML : null,
        "sentence": typeof sentenceCorrectorHTML !== 'undefined' ? sentenceCorrectorHTML : null,
        "forum": typeof forumHTML !== 'undefined' ? forumHTML : null,
        "restatement": typeof restatementHTML !== 'undefined' ? restatementHTML : null,
        "paragraph": typeof paragraphHTML !== 'undefined' ? paragraphHTML : null,
        "textdecon": typeof textDeconHTML !== 'undefined' ? textDeconHTML : null,
        "tacticalpanels": typeof tacticalPanelsHTML !== 'undefined' ? tacticalPanelsHTML : null,
        "tacticguide": typeof tacticGuideHTML !== 'undefined' ? tacticGuideHTML : null,
        "analyzer": typeof analyzerHTML !== 'undefined' ? analyzerHTML : null,
        "nlpanaliz": typeof nlpAnalizHTML !== 'undefined' ? nlpAnalizHTML : null,
        "testlab": typeof testlabHTML !== 'undefined' ? testlabHTML : null,
        "wordpractice": typeof wordPracticeHTML !== 'undefined' ? wordPracticeHTML : null,
        "grammarchallenge": typeof trainingCenterCommonHTML !== 'undefined' ? trainingCenterCommonHTML('gc', '', '', '') : null,
        "irrelevant": typeof trainingCenterCommonHTML !== 'undefined' ? trainingCenterCommonHTML('ir', '', '', '') : null,
        "synonymmatch": typeof trainingCenterCommonHTML !== 'undefined' ? trainingCenterCommonHTML('sm', '', '', '') : null
    };

    const content = mappings[tabName];
    if (content) {
        const el = document.getElementById('tab-' + tabName);
        if (el) el.innerHTML = content;
    }
}

/* ==========================================
 DYNAMIC SEO & HEADERS
========================================== */

function updateSEO(tab) {
    const seoMap = {
        "dashboard": { title: "Dashboard – YDS & YDT İlerleme Takibi", desc: "Kendi YDS gelişiminizi takip edin, başarı istatistiklerinizi görün." },
        "tacticguide": { title: "YDS & YDT Taktik Rehberi – Sınav Stratejileri", desc: "YDS sınavında hız kazandıracak, net artıracak gizli taktikler ve ipuçları." },
        "modals": { title: "Modals (Kipler) Rehberi – YDS Gramer Konuları", desc: "Kan, could, must gibi kiplerin YDS'de en çok çıkan kullanım alanları." },
        "conjunctions": { title: "Bağlaçlar (Conjunctions) – YDS En Kapsamlı Liste", desc: "Zıtlık, sebep-sonuç ve ekleme bağlaçlarının tam listesi ve çevirileri." },
        "reading": { title: "YDS Reading (Okuma) Çalışmaları ve Çeviriler", desc: "Güncel akademik makaleler ve detaylı cümle analizli okuma parçaları." },
        "vocabulary": { title: "YDS Kelime Ezberleme ve Listeler", desc: "Sınavda en sık sorulan 1000+ kelime ve ezberleme kartları." },
        "forum": { title: "YDS Forum – Soru Sor & Cevap Al", desc: "Takıldığın soruları sor, diğer öğrencilerle yardımlaş." },
        "prepositions": { title: "Prepositions (Edatlar) – YDS Çıkmış Listeler", desc: "YDS'de en çok kafa karıştıran edatlar ve fiil-edat öbekleri." },
        "passive": { title: "Passive Voice (Edilgen Yapı) – YDS Gramer", desc: "Edilgen yapıların sınavdaki fonksiyonları ve çeviri teknikleri." },
        "relative": { title: "Relative Clauses – YDS Sıfat Cümlecikleri", desc: "Who, which, that gibi yapıların karmaşık cümlelerdeki tespiti." },
        "profile": { title: "Profilim – YDS İstatistiklerim", desc: "Kaydettiğiniz kelimeler ve kişisel çalışma verileriniz." },
        "miniexams": { title: "Mini Denemeler – YDS Konu Quizleri", desc: "Konu konu ayrılmış 10 soruluk hızlı YDS mini denemeleri." },
        "fullexam": { title: "Full Deneme Sınavları – YDS / YDT Denemeler", desc: "Sınav formatında, süreli ve cevap açıklamalı full YDS denemeleri." },
        "tenseguide": { title: "Tense Rehberi – Zamanlar ve Kullanımları", desc: "İngilizce zamanların YDS perspektifinden sadeleştirilmiş anlatımı." },
        "ifclauses": { title: "If Clauses (Koşul Cümleleri) – YDS Rehberi", desc: "Tüm type'lar ve devrik yapılar (inversion) ile koşul cümleleri." },
        "sentence": { title: "Sentence Corrector – Cümle Yapısı Analizi", desc: "Cümlelerdeki gramer hatalarını bulan yapay zeka destekli araç." }
    };

    const data = seoMap[tab] || { title: "yds.monster – YDS & YDT Master Encyclopedia", desc: "Kapsamlı YDS ve YDT hazırlık platformu." };

    document.title = data.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', data.desc);
    }
}

/* ==========================================
 QUIZ ENGINE
========================================== */

window.openQuiz = function () {
    const modal = document.getElementById('quizModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    resetQuizView();
};

window.closeQuiz = function () {
    const modal = document.getElementById('quizModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = "auto";
};

function resetQuizView() {
    document.getElementById('quizStart').style.display = 'block';
    document.getElementById('quizGame').style.display = 'none';
    document.getElementById('quizResult').style.display = 'none';
}

window.startQuiz = function (n, topic = 'all') {
    let pool = allItems;
    if (topic !== 'all') {
        pool = allItems.filter(i => i.topic === topic);
    }

    if (pool.length < 5) {
        if (topic !== 'all') {
            console.warn(`Not enough items for topic ${topic}, falling back to all.`);
            pool = allItems;
        } else {
            alert("Quiz data not ready yet.");
            return;
        }
    }

    quizSet = [...pool]
        .sort(() => 0.5 - Math.random())
        .slice(0, n);

    currentQ = 0;
    score = 0;
    quizResults = [];

    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('quizGame').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';

    showQuestion();
};

function showQuestion() {

    const q = quizSet[currentQ];
    if (!q) return;

    document.getElementById('qNum').innerText = currentQ + 1;
    document.getElementById('qScore').innerText = score;

    document.getElementById('qSentence').innerText =
        q.fullSentence.replace(q.correct, "__________");

    const container = document.getElementById('qOptions');
    container.innerHTML = '';

    let pool = allItems.filter(i => i.correct !== q.correct);
    let distractors = pool
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(i => i.correct);

    let options = [...distractors, q.correct]
        .sort(() => 0.5 - Math.random());

    options.forEach(opt => {

        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.className = "p-4 bg-slate-100 rounded-lg font-bold";
        btn.onclick = () => checkAnswer(btn, opt, q.correct);
        container.appendChild(btn);
    });
}

function checkAnswer(btn, selected, correct) {

    const buttons = document.querySelectorAll('#qOptions button');
    buttons.forEach(b => b.disabled = true);

    const isCorrect = selected === correct;

    if (isCorrect) {
        btn.classList.add('bg-emerald-600', 'text-white');
        score += 10;
    } else {
        btn.classList.add('bg-red-600', 'text-white');
        buttons.forEach(b => {
            if (b.innerText === correct) {
                b.classList.add('bg-emerald-600', 'text-white');
            }
        });
    }

    quizResults.push({
        question: quizSet[currentQ].fullSentence,
        selected,
        correct,
        isCorrect
    });

    setTimeout(() => {
        currentQ++;
        if (currentQ < quizSet.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1200);
}

function showResult() {

    document.getElementById('quizGame').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('finalScore').innerText = score;

    // FIREBASE GAMIFICATION SAVE
    if (typeof window.saveQuizScoreFirestore === "function") {
        window.saveQuizScoreFirestore(score).then(() => {
            // Re-initialize charts on dashboard so the user sees their new score immediately
            if (typeof initCharts === "function") {
                initCharts();
            }
        }).catch(console.error);
    }

    const errorBox = document.getElementById('quizErrorSummary');
    if (!errorBox) return;

    let html = `
 <div class="mt-6">
 <h3 class="font-bold mb-4 text-red-700">
 📊 Quiz Summary
 </h3>
 `;

    quizResults.forEach((res, i) => {

        html += `
 <div class="mb-4 p-4 rounded-lg text-sm
 ${res.isCorrect
                ? 'bg-emerald-900/40 border border-emerald-500'
                : 'bg-red-900/40 border border-red-500'}">

 <div class="font-semibold mb-2">
 ${i + 1}. ${res.question}
 </div>

 <div>
 Your Answer:
 <span class="${res.isCorrect ? 'text-red-700' : 'text-red-400'}">
 ${res.selected}
 </span>
 </div>

 ${!res.isCorrect ? `
 <div class="text-red-700">
 Correct: ${res.correct}
 </div>
 ` : ''}

 </div>
 `;
    });

    html += `</div>`;
    errorBox.innerHTML = html;
}

/* ==========================================
 DRAWER HELPERS
========================================== */

window.closeDrawer = function () {
    const drawer = document.getElementById("mobileDrawer");
    const overlay = document.getElementById("drawerOverlay");

    if (drawer) drawer.classList.add("translate-x-full");
    if (overlay) overlay.classList.add("hidden");

    document.body.style.overflow = "auto";
};



/* ==========================================
 TACTIC TOGGLES
========================================== */

window.toggleModalTactics = function () {
    const content = document.getElementById("modalTacticContent");
    const icon = document.getElementById("modalTacticToggleIcon");

    if (content) content.classList.toggle("hidden");
    if (icon) icon.innerText = icon.innerText === "▼" ? "▲" : "▼";
};

/* ==========================================
 LOCK / UNLOCK AI TOOLS UI
========================================== */

window.lockAnalyzerUI = function () {
    const navButtons = [
        "analyzerNavBtn", "testlabNavBtn", "restatementNavBtn", "paragraphNavBtn", "textDeconNavBtn",
        "analyzerMobileBtn", "testlabMobileBtn", "restatementMobileBtn", "paragraphMobileBtn", "textDeconMobileBtn"
    ];

    navButtons.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add("hidden");
    });

    document.querySelectorAll('.aiToolsLocked').forEach(el => el.classList.remove('hidden'));
};

window.unlockAnalyzerUI = function () {
    const navButtons = [
        "analyzerNavBtn", "testlabNavBtn", "restatementNavBtn", "paragraphNavBtn", "textDeconNavBtn",
        "analyzerMobileBtn", "testlabMobileBtn", "restatementMobileBtn", "paragraphMobileBtn", "textDeconMobileBtn"
    ];

    navButtons.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove("hidden");
    });

    document.querySelectorAll('.aiToolsLocked').forEach(el => el.classList.add('hidden'));
};

/* ==========================================
 SYNTAX ABBREVIATIONS
========================================== */

window.SYNTAX_TERMS = {
    "NP": "Noun Phrase (İsim Öbeği)",
    "VP": "Verb Phrase (Fiil Öbeği)",
    "SBAR": "Subordinating Clause (Yan Cümle)",
    "PP": "Prepositional Phrase (Edat Öbeği)",
    "ADJP": "Adjective Phrase (Sıfat Öbeği)",
    "ADVP": "Adverb Phrase (Zarf Öbeği)",
    "S": "Sentence (Cümle)",
    "PRN": "Parenthetical (Ara Söz)",
    "CONJP": "Conjunction Phrase (Bağlaç Öbeği)",
    "WHNP": "Wh-Noun Phrase (Soru Zamiri Öbeği)"
};




document.addEventListener("DOMContentLoaded", () => {

    const scrollBtn = document.getElementById("scrollTopBtn");

    if (!scrollBtn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.remove("hidden");
        } else {
            scrollBtn.classList.add("hidden");
        }
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

});

/* ==========================================
 SEARCH / FILTER LOGIC
========================================== */

window.filterTab = function (input) {
    const filter = input.value.toUpperCase();
    const tabId = input.closest('.tab-content')?.id;
    if (!tabId) return;

    const tab = document.getElementById(tabId);
    // Find containers that should be filtered
    const items = tab.querySelectorAll('.italic, .example-text, .p-4.rounded-lg, .bg-white.p-6.rounded-2xl');

    items.forEach(item => {
        const text = item.textContent || item.innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
};

