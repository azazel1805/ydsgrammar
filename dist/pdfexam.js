const pdfexamHTML = `
<div class="max-w-[1400px] mx-auto px-4 py-8 lg:py-12 animate-in fade-in duration-700">
    <!-- HERO HEADER -->
    <div class="text-center mb-12 relative">
       <div class="absolute inset-0 -top-20 bg-gradient-to-b from-indigo-50/50 to-transparent blur-3xl pointer-events-none -z-10"></div>
       
       <div class="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 shadow-xl shadow-slate-200">
         <i class="fas fa-magic text-indigo-400"></i>
         <span>AI PDF Exam Generator</span>
       </div>
       
       <h2 class="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight" style="font-family:'Playfair Display',serif;">
         PDF Sınav <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-600">Dönüştürücü</span>
       </h2>
       <p class="text-slate-500 max-w-xl mx-auto text-sm lg:text-base font-medium italic">YDS/YDT PDF dosyalarınızı yükleyin, sayfaları seçin ve saniyeler içinde interaktif sınavınıza başlayın.</p>
    </div>

    <!-- MAIN INTERFACE -->
    <div id="pdfInitialArea" class="max-w-3xl mx-auto">
        <div id="pdfDropZone" class="group relative bg-white border-4 border-dashed border-slate-100 rounded-[3rem] p-16 text-center hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer shadow-2xl shadow-indigo-500/5">
            <input type="file" id="pdfFileInput" class="hidden" accept="application/pdf">
            <div class="w-24 h-24 bg-indigo-50 rounded-3xl mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-100">
                <i class="fas fa-file-pdf text-4xl text-indigo-600"></i>
            </div>
            <h3 class="text-2xl font-black text-slate-900 mb-2" style="font-family:'Playfair Display',serif;">PDF Dosyanızı Buraya Bırakın</h3>
            <p class="text-slate-400 font-medium mb-8">Veya dosyayı seçmek için tıklayın</p>
            <div class="inline-flex items-center gap-4 text-[10px] font-black tracking-widest uppercase text-slate-400 bg-white px-6 py-2 rounded-full border border-slate-100">
                <i class="fas fa-shield-alt text-indigo-500"></i>
                <span>GÜVENLİ & AI DESTEKLİ</span>
            </div>
        </div>
    </div>

    <!-- PREVIEW & SELECTION AREA (Hidden initially) -->
    <div id="pdfSelectionArea" class="hidden animate-in slide-in-from-bottom-8 duration-700">
        <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl shadow-slate-500/5 relative overflow-hidden mb-8">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-slate-50 pb-8">
                <div>
                    <h4 class="text-2xl font-black text-slate-900" style="font-family:'Playfair Display',serif;">Sayfa Seçimi Yapın</h4>
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Sınava DÖNÜŞTÜRÜLECEK SAYFALARI İŞARETLEYİN</p>
                </div>
                <div class="flex items-center gap-4">
                    <span id="selectedCount" class="text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">0 SAYFA SEÇİLDİ</span>
                    <button id="generateBtn" class="group px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-900/10 hover:bg-indigo-600 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                        <span>SINAVI OLUŞTUR</span>
                        <i class="fas fa-wand-magic-sparkles text-amber-400"></i>
                    </button>
                    <button id="resetPdfBtn" class="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600 rounded-2xl transition-all">
                        <i class="fas fa-undo"></i>
                    </button>
                </div>
            </div>

            <!-- THUMBNAILS GRID -->
            <div id="pdfThumbnailsContainer" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                <!-- Pages will be injected here -->
            </div>
        </div>
    </div>

    <!-- PROCESSING OVERLAY -->
    <div id="pdfProcessOverlay" class="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] hidden flex items-center justify-center">
        <div class="max-w-md w-full mx-4 bg-white rounded-[2.5rem] p-10 text-center shadow-2xl">
            <div class="relative w-24 h-24 mx-auto mb-8">
                <div class="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                <div class="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <i class="fas fa-brain text-indigo-600 text-2xl animate-pulse"></i>
                </div>
            </div>
            <h5 id="processStatus" class="text-xl font-bold text-slate-900 mb-2" style="font-family:'Playfair Display',serif;">AI Analiz Başladı</h5>
            <p id="processDetail" class="text-sm text-slate-500 font-medium mb-6">PDF sayfalarınız yapay zeka tarafından okunuyor ve sorular ayrıştırılıyor...</p>
            
            <!-- Progress Bar -->
            <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div id="processBar" class="h-full bg-indigo-600 transition-all duration-1000" style="width: 10%;"></div>
            </div>
        </div>
    </div>
</div>

<style>
    .pdf-thumbnail { @apply relative cursor-pointer group transition-all duration-300; }
    .pdf-thumbnail canvas { @apply w-full h-auto rounded-2xl border-2 border-slate-100 group-hover:border-indigo-200 transition-all shadow-sm; }
    .pdf-thumbnail.selected canvas { @apply border-indigo-500 shadow-xl shadow-indigo-100 scale-[0.98]; }
    .pdf-thumbnail .check-badge { @apply absolute top-3 right-3 w-8 h-8 bg-indigo-600 text-white rounded-xl flex items-center justify-center opacity-0 scale-50 transition-all rotate-12; }
    .pdf-thumbnail.selected .check-badge { @apply opacity-100 scale-100 rotate-0; }
    .pdf-thumbnail .page-num { @apply absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-black text-slate-900 rounded-lg shadow-sm border border-slate-100; }
</style>
`;

let currentPdf = null;
let selectedPages = new Set();
let pageImages = {}; // Store base64 images of selected pages

function injectPdfExamHTML() {
    const container = document.getElementById("tab-pdfexam");
    if (!container) return;
    container.innerHTML = pdfexamHTML;
    initPdfExam();
}

function initPdfExam() {
    const dropZone = document.getElementById("pdfDropZone");
    const fileInput = document.getElementById("pdfFileInput");
    const resetBtn = document.getElementById("resetPdfBtn");
    const generateBtn = document.getElementById("generateBtn");

    if(!dropZone) return;

    dropZone.addEventListener("click", () => fileInput.click());
    dropZone.addEventListener("dragover", (e) => { e.preventDefault(); dropZone.classList.add("border-indigo-400", "bg-indigo-50/50"); });
    dropZone.addEventListener("dragleave", () => { dropZone.classList.remove("border-indigo-400", "bg-indigo-50/50"); });
    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("border-indigo-400", "bg-indigo-50/50");
        const file = e.dataTransfer.files[0];
        if (file && file.type === "application/pdf") handlePdfFile(file);
    });

    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) handlePdfFile(file);
    });

    resetBtn.addEventListener("click", resetPdfExam);

    generateBtn.addEventListener("click", () => {
        if(selectedPages.size > 0) processSelectedPages();
    });
}

function resetPdfExam() {
    currentPdf = null;
    selectedPages.clear();
    pageImages = {};
    document.getElementById("pdfInitialArea").classList.remove("hidden");
    document.getElementById("pdfSelectionArea").classList.add("hidden");
    document.getElementById("pdfThumbnailsContainer").innerHTML = "";
    document.getElementById("pdfFileInput").value = "";
    updateSelectionUI();
}

async function handlePdfFile(file) {
    const loader = document.getElementById("initialLoader");
    if(loader) loader.classList.remove("hidden");

    try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        currentPdf = await loadingTask.promise;

        document.getElementById("pdfInitialArea").classList.add("hidden");
        document.getElementById("pdfSelectionArea").classList.remove("hidden");

        renderThumbnails();
    } catch (err) {
        console.error("PDF read error:", err);
        alert("PDF dosyası okunamadı.");
    } finally {
        if(loader) loader.classList.add("hidden");
    }
}

async function renderThumbnails() {
    const container = document.getElementById("pdfThumbnailsContainer");
    container.innerHTML = "";

    for (let i = 1; i <= currentPdf.numPages; i++) {
        const page = await currentPdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.3 }); // Small thumbnail
        
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport: viewport }).promise;

        const wrapper = document.createElement("div");
        wrapper.className = "pdf-thumbnail";
        wrapper.dataset.page = i;
        wrapper.innerHTML = `
            <canvas></canvas>
            <div class="check-badge"><i class="fas fa-check"></i></div>
            <div class="page-num">SAYFA ${i}</div>
        `;
        
        const existingCanvas = wrapper.querySelector("canvas");
        existingCanvas.width = canvas.width;
        existingCanvas.height = canvas.height;
        existingCanvas.getContext("2d").drawImage(canvas, 0, 0);

        wrapper.addEventListener("click", () => togglePageSelection(i, wrapper));
        container.appendChild(wrapper);
    }
}

function togglePageSelection(pageIndex, element) {
    if (selectedPages.has(pageIndex)) {
        selectedPages.delete(pageIndex);
        element.classList.remove("selected");
    } else {
        selectedPages.add(pageIndex);
        element.classList.add("selected");
    }
    updateSelectionUI();
}

function updateSelectionUI() {
    const count = selectedPages.size;
    document.getElementById("selectedCount").innerText = `${count} SAYFA SEÇİLDİ`;
    document.getElementById("generateBtn").disabled = count === 0;
}

async function processSelectedPages() {
    const overlay = document.getElementById("pdfProcessOverlay");
    const bar = document.getElementById("processBar");
    const status = document.getElementById("processStatus");
    const detail = document.getElementById("processDetail");

    overlay.classList.remove("hidden");
    bar.style.width = "10%";
    status.innerText = "Görüntüler Hazırlanıyor";
    detail.innerText = "Seçilen sayfalar AI analizi için optimize ediliyor...";

    try {
        pageImages = {};
        const pageArray = Array.from(selectedPages).sort((a, b) => a - b);
        
        for (let i = 0; i < pageArray.length; i++) {
            const pageNum = pageArray[i];
            const page = await currentPdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 2.0 }); // Higher resolution for AI
            
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport: viewport }).promise;
            pageImages[pageNum] = canvas.toDataURL("image/jpeg", 0.85);
            
            // Update bar
            const progress = 10 + Math.floor((i + 1) / pageArray.length * 20);
            bar.style.width = `${progress}%`;
        }

        status.innerText = "AI Laboratuvarına Gönderiliyor";
        detail.innerText = "Monster AI soruları okuyor, şıkları ayrıştırıyor ve doğru cevapları buluyor...";
        bar.style.width = "50%";

        const response = await fetch("/.netlify/functions/pdf-to-exam", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                images: Object.values(pageImages),
                meta: {
                    title: "PDF'den Üretilen Sınav",
                    count: selectedPages.size
                }
            })
        });

        if (!response.ok) throw new Error("AI Conversion failed");

        bar.style.width = "90%";
        const examData = await response.json();

        status.innerText = "Sınav Motoruna Hazırlanıyor";
        detail.innerText = "Veriler hazır, sınav motoru başlatılıyor...";
        bar.style.width = "100%";

        setTimeout(() => {
            overlay.classList.add("hidden");
            // Load this into full exam mode or a custom previewer
            startInteractiveExam(examData);
        }, 1000);

    } catch (err) {
        console.error("Processing error:", err);
        status.innerText = "Hata Oluştu";
        detail.innerText = "AI dönüştürme sırasında bir hata oluştu. Lütfen tekrar deneyin.";
        setTimeout(() => overlay.classList.add("hidden"), 3000);
    }
}

function startInteractiveExam(examData) {
    // We can use the existing window.fullExamData logic if available, 
    // or just pass it to the full exam module.
    if (typeof window.startCustomExam === "function") {
        window.startCustomExam(examData);
    } else {
        // Fallback or store in session and redirect to fullexam tab
        localStorage.setItem("customPdfExam", JSON.stringify(examData));
        switchTab("fullexam");
        // Trigger a custom event that fullexam module can listen to
        window.dispatchEvent(new CustomEvent('customExamReady', { detail: examData }));
    }
}

window.initPdfExam = initPdfExam;
window.injectPdfExamHTML = injectPdfExamHTML;
