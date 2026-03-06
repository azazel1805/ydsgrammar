const sentenceCorrectorHTML = `
<div class="max-w-4xl mx-auto p-4">

 <h2 class="text-2xl font-bold mb-6 text-center">
 Sentence Corrector
 </h2>

 <div class="bg-white p-6 rounded-xl shadow-md">

 <label class="block font-semibold mb-2">
 Enter your sentence
 </label>

 <textarea 
 id="scInput"
 class="w-full p-4 rounded-lg bg-slate-100 
 focus:outline-none focus:ring-2 focus:ring-cyan-500"
 rows="4"
 placeholder="Type your sentence here...">
 </textarea>

 <button 
 id="scCheck"
 class="mt-4 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 
 text-black rounded-lg transition-all">
 Check Sentence
 </button>

 </div>

 <div id="scCorrections" class="mt-6"></div>
 <div id="scCorrected" class="mt-4"></div>

</div>
`;