document.addEventListener("DOMContentLoaded", () => {
    injectAnalyzerHTML();
    initAnalyzer();
});

function injectAnalyzerHTML() {

    const container = document.getElementById("tab-analyzer");
    if (!container) return;

    container.innerHTML = `
<div class="max-w-5xl mx-auto p-8 space-y-8">

 <h2 class="text-4xl font-bold text-center text-red-800 mb-2" style="font-family: 'Playfair Display', serif;">
 🧠 YDS Question Analyzer
 </h2>

 <div class="p-6 rounded-2xl shadow-sm
 bg-white 
 border border-slate-200 
 space-y-6">

 <textarea 
 id="analyzerInput"
 rows="8"
 class="w-full p-4 rounded-xl
 bg-slate-50 
 text-slate-900 
 border border-slate-300 
 focus:outline-none focus:ring-2 focus:ring-red-800"
 placeholder="Şıklı YDS sorusunu buraya yapıştırın...">
 </textarea>

 <button 
 id="analyzeBtn"
 class="w-full py-3 rounded-xl font-bold text-lg
 bg-red-800 hover:bg-black
 text-white transition shadow-sm">
 Analyze Question
 </button>

 </div>

 <div id="analysisOutput" class="mt-6 space-y-6 notranslate"></div>

</div>
`;
}

function initAnalyzer() {

    document.getElementById("analyzeBtn").addEventListener("click", async () => {

        const input = document.getElementById("analyzerInput").value.trim();
        if (!input) return;

        document.getElementById("analysisOutput").innerHTML =
            "<div class='text-yellow-400 text-lg'>Analyzing question...</div>";

        try {

            const response = await fetch("/.netlify/functions/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ input })
            });

            const text = await response.text();
            const data = JSON.parse(text);

            renderAnalysis(data);

        } catch (err) {

            document.getElementById("analysisOutput").innerHTML =
                "<div class='text-red-400'>AI returned invalid JSON.</div>";

            console.error(err);
        }

    });
}

function renderAnalysis(data) {

    const container = document.getElementById("analysisOutput");

    if (!data.question_analysis) {
        container.innerHTML = "<div class='text-red-400'>Invalid response.</div>";
        return;
    }

    container.innerHTML = `
 <div class="bg-gray-50 p-6 rounded text-black space-y-6">

 <h3 class="text-2xl text-red-700 font-bold">
 📘 Detailed Question Analysis
 </h3>

 <div class="border-b border-slate-600 pb-4">
 <div><strong>🎯 Grammar Focus:</strong> ${data.question_analysis.grammar_focus}</div>
 <div><strong>🧠 Logical Structure:</strong> ${data.question_analysis.logical_structure}</div>
 </div>

 <div class="bg-green-900/40 p-4 rounded border border-green-500">
 <div class="text-green-400 font-bold text-xl">
 ✅ Correct Answer: ${data.question_analysis.correct_answer}
 </div>
 <div class="mt-2">
 <strong>Why Correct:</strong><br>
 ${data.question_analysis.why_correct}
 </div>
 </div>

 <div class="bg-red-900/30 p-4 rounded border border-red-500">
 <strong>❌ Why Others Are Wrong:</strong>
 <div class="mt-2 space-y-2">
 ${data.question_analysis.why_others_wrong
            .map(o => `<div class="text-red-400">• ${o}</div>`)
            .join("")}
 </div>
 </div>

 <div class="bg-yellow-900/30 p-4 rounded border border-yellow-500">
 <strong>⚠ YDS Trap Analysis</strong>
 <div class="mt-2">
 <div><strong>Trap Type:</strong> ${data.yds_trap_engine.trap_type}</div>
 <div><strong>Logic Type:</strong> ${data.yds_trap_engine.logic_type}</div>
 <div><strong>Elimination Strategy:</strong> ${data.yds_trap_engine.elimination_strategy}</div>
 <div><strong>Exam Tip:</strong> ${data.yds_trap_engine.exam_tip}</div>
 </div>
 </div>

 <div class="flex justify-between text-sm text-gray-600">
 <div>🎯 Difficulty: ${data.question_analysis.difficulty_level}</div>
 <div>📊 Confidence: ${data.question_analysis.confidence_level}</div>
 </div>

 </div>
 `;
}
