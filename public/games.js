/* =========================================
   YDS GAMES MODULE
   Adapted from dd.html for yds.monster
   ========================================= */

const gamesHTML = `
<section id="game-center" class="animate-in fade-in duration-700 p-4 md:p-8">
    <div class="max-w-6xl mx-auto space-y-8">
        
        <!-- Header -->
        <div class="text-center space-y-2">
            <h2 class="text-3xl md:text-4xl font-black text-slate-900" style="font-family: 'Playfair Display', serif;">Oyun Merkezi</h2>
            <p class="text-slate-500 italic text-sm">Kelime dağarcığını eğlenerek geliştir!</p>
        </div>

        <!-- Games Navigation -->
        <nav class="flex flex-wrap justify-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 max-w-2xl mx-auto">
            <button onclick="switchGameSubTab('game-home')" id="btn-game-home" class="game-tab-btn active">🏠 Ana Sayfa</button>
            <button onclick="switchGameSubTab('game-crossword')" id="btn-game-crossword" class="game-tab-btn">🧩 Kare Bulmaca</button>
            <button onclick="switchGameSubTab('game-hangman')" id="btn-game-hangman" class="game-tab-btn">🪦 Adam Asmaca</button>
            <button onclick="switchGameSubTab('game-chain')" id="btn-game-chain" class="game-tab-btn">🔄 Kelime Zinciri</button>
            <button onclick="switchGameSubTab('game-passaparola')" id="btn-game-passaparola" class="game-tab-btn">🎡 Passaparola</button>
            <button onclick="switchGameSubTab('game-architect')" id="btn-game-architect" class="game-tab-btn">🏗️ Cümle Mimarı</button>
        </nav>

        <!-- GAME HOME -->
        <div id="game-home" class="game-container active">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="game-card group" onclick="switchGameSubTab('game-crossword')">
                    <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">🧩</div>
                    <h3 class="text-xl font-bold text-slate-900 group-hover:text-red-800 transition-colors">Kare Bulmaca</h3>
                    <p class="text-slate-500 text-sm italic mt-2">Oxford tanımlarını kullanarak bulmacayı çöz.</p>
                </div>
                <div class="game-card group" onclick="switchGameSubTab('game-hangman')">
                    <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">🪦</div>
                    <h3 class="text-xl font-bold text-slate-900 group-hover:text-red-800 transition-colors">Adam Asmaca</h3>
                    <p class="text-slate-500 text-sm italic mt-2">Harfleri tahmin ederek gizli kelimeyi bul.</p>
                </div>
                <div class="game-card group" onclick="switchGameSubTab('game-chain')">
                    <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">🔄</div>
                    <h3 class="text-xl font-bold text-slate-900 group-hover:text-red-800 transition-colors">Kelime Zinciri</h3>
                    <p class="text-slate-500 text-sm italic mt-2">Son harfle başlayan yeni kelimeler türet.</p>
                </div>
                <div class="game-card group" onclick="switchGameSubTab('game-passaparola')">
                    <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">🎡</div>
                    <h3 class="text-xl font-bold text-slate-900 group-hover:text-red-800 transition-colors">Passaparola</h3>
                    <p class="text-slate-500 text-sm italic mt-2">Çarkı tamamla, tüm harfleri doğru bil.</p>
                </div>
                <div class="game-card group" onclick="switchGameSubTab('game-architect')">
                    <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">🏗️</div>
                    <h3 class="text-xl font-bold text-slate-900 group-hover:text-red-800 transition-colors">Cümle Mimarı</h3>
                    <p class="text-slate-500 text-sm italic mt-2">Kelimeleri doğru sıraya dizerek cümleyi kur.</p>
                </div>
            </div>
        </div>

        <!-- CROSSWORD -->
        <div id="game-crossword" class="game-container">
            <div class="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <h3 class="text-2xl font-bold text-slate-900">Kare Bulmaca</h3>
                    <div class="flex flex-wrap items-center gap-3">
                        <select id="cw-level" class="game-select"><option value="a1">A1</option><option value="a2">a2</option><option value="b1">b1</option><option value="b2">b2</option><option value="c1">c1</option></select>
                        <select id="cw-mode" class="game-select"><option value="definition">Tanım</option><option value="synonym">Eş Anlam</option></select>
                        <button onclick="toggleGameTR('cw')" id="cw-tr-btn" class="game-btn-secondary">🇹🇷 TR AÇIK</button>
                        <button onclick="startCrossword()" class="game-btn-primary">YENİ BULMACA</button>
                    </div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div class="lg:col-span-2 bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col items-center min-h-[400px] relative overflow-hidden">
                        <div id="cw-loader" class="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10 hidden">
                             <div class="w-8 h-8 border-4 border-red-100 border-t-red-800 rounded-full animate-spin"></div>
                             <p class="text-xs font-bold mt-2 text-slate-500">Oluşturuluyor...</p>
                        </div>
                        <div class="w-full overflow-x-auto py-4 flex justify-center custom-scrollbar">
                            <div id="cw-grid" class="grid gap-1 bg-slate-200 p-1 border border-slate-200 shrink-0"></div>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <h4 class="font-bold text-slate-900 flex items-center gap-2"><i class="fas fa-search text-red-800"></i> İpuçları</h4>
                        <ul id="cw-clue-list" class="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar"></ul>
                        <div class="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                            <button onclick="checkCrosswordAnswers()" class="game-btn-primary">KONTROL ET</button>
                            <button onclick="toggleCrosswordReveal()" class="game-btn-secondary">CEVAPLARI GÖSTER</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- HANGMAN -->
        <div id="game-hangman" class="game-container">
            <div class="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <h3 class="text-2xl font-bold text-slate-900">Adam Asmaca</h3>
                    <div class="flex flex-wrap items-center gap-3">
                        <select id="hm-level" class="game-select"><option value="a1">A1</option><option value="a2">a2</option><option value="b1">b1</option><option value="b2">b2</option><option value="c1">c1</option></select>
                        <select id="hm-len" class="game-select"><option value="any">Uzunluk</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9+</option></select>
                        <button onclick="toggleGameTR('hm')" id="hm-tr-btn" class="game-btn-secondary">🇹🇷 TR AÇIK</button>
                        <button onclick="startHangman()" class="game-btn-primary">KELİME GETİR</button>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div class="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col items-center justify-center relative">
                        <div class="absolute top-4 right-4 bg-red-800 text-white px-3 py-1 rounded-full text-xs font-bold">❤️ <span id="hm-lives">6</span> CAN</div>
                        <svg class="w-48 h-64 h-hangman-svg" viewBox="0 0 200 250">
                            <path d="M20 230 L180 230 M40 230 L40 20 L140 20 L140 50" stroke="#cbd5e1" stroke-width="4" fill="none" />
                            <circle id="hm-head" class="hm-part" cx="140" cy="80" r="30" />
                            <line id="hm-body" class="hm-part" x1="140" y1="110" x2="140" y2="180" />
                            <line id="hm-larm" class="hm-part" x1="140" y1="130" x2="110" y2="160" />
                            <line id="hm-rarm" class="hm-part" x1="140" y1="130" x2="170" y2="160" />
                            <line id="hm-lleg" class="hm-part" x1="140" y1="180" x2="110" y2="220" />
                            <line id="hm-rleg" class="hm-part" x1="140" y1="180" x2="170" y2="220" />
                        </svg>
                    </div>
                    <div class="space-y-6">
                        <div id="hm-clue-box" class="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 text-sm text-indigo-900 min-h-[100px] flex flex-col justify-center">
                            Kelime getirmek için "KELİME GETİR"e tıkla.
                        </div>
                        <div id="hm-word-display" class="flex gap-2 flex-wrap justify-center py-4"></div>
                        <div id="hm-keyboard" class="grid grid-cols-7 sm:grid-cols-9 gap-2"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- WORD CHAIN -->
        <div id="game-chain" class="game-container">
            <div class="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <h3 class="text-2xl font-bold text-slate-900">Kelime Zinciri</h3>
                    <select id="ch-level" class="game-select"><option value="a1">A1</option><option value="a2">a2</option><option value="b1">b1</option><option value="b2">b2</option><option value="c1">c1</option></select>
                </div>
                <p class="text-slate-500 text-sm italic mb-8">Her kelime, bir önceki kelimenin son harfiyle başlamalıdır.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                     <div class="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col items-center justify-center relative">
                        <div class="absolute top-4 right-4 bg-red-800 text-white px-3 py-1 rounded-full text-xs font-bold">❤️ <span id="ch-lives-val">6</span> CAN</div>
                        <svg class="w-48 h-64 h-hangman-svg" viewBox="0 0 200 250">
                            <path d="M20 230 L180 230 M40 230 L40 20 L140 20 L140 50" stroke="#cbd5e1" stroke-width="4" fill="none" />
                            <circle id="chc-head" class="hm-part" cx="140" cy="80" r="30" />
                            <line id="chc-body" class="hm-part" x1="140" y1="110" x2="140" y2="180" />
                            <line id="chc-larm" class="hm-part" x1="140" y1="130" x2="110" y2="160" />
                            <line id="chc-rarm" class="hm-part" x1="140" y1="130" x2="170" y2="160" />
                            <line id="chc-lleg" class="hm-part" x1="140" y1="180" x2="110" y2="220" />
                            <line id="chc-rleg" class="hm-part" x1="140" y1="180" x2="170" y2="220" />
                        </svg>
                    </div>
                    <div class="space-y-6 flex flex-col justify-center">
                        <div id="ch-display" class="bg-slate-900 text-white p-8 rounded-3xl text-center space-y-4">
                            <div id="ch-prev-word" class="text-3xl font-black tracking-widest uppercase" style="font-family: 'Playfair Display', serif;">HAZIR?</div>
                            <div id="ch-status" class="text-xs text-slate-400 font-bold uppercase tracking-widest">Başlamak için bir kelime yaz!</div>
                        </div>
                        <div class="flex gap-2">
                            <input type="text" id="ch-input" placeholder="Kelimeniz..." class="flex-1 bg-slate-50 border border-slate-100 p-4 rounded-xl font-bold uppercase" onkeypress="if(event.key==='Enter') checkChain()">
                            <button onclick="checkChain()" class="game-btn-primary px-8">GÖNDER</button>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                                <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">PUAN</div>
                                <div id="ch-score" class="text-2xl font-black text-slate-900">0</div>
                            </div>
                            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                                <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">HATA</div>
                                <div id="ch-mistakes" class="text-2xl font-black text-red-800">0 / 6</div>
                            </div>
                        </div>
                        <button onclick="initChain()" class="w-full game-btn-secondary">OYUNU SIFIRLA</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- PASSAPAROLA -->
        <div id="game-passaparola" class="game-container">
            <div class="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <h3 class="text-2xl font-bold text-slate-900">Passaparola</h3>
                    <select id="pp-level" class="game-select"><option value="a1">A1</option><option value="a2">a2</option><option value="b1">b1</option><option value="b2">b2</option><option value="c1">c1</option></select>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div class="bg-slate-900 rounded-[2.5rem] p-4 flex items-center justify-center min-h-[400px] relative overflow-hidden">
                        <div id="pp-timer" class="absolute top-6 left-6 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-bold border border-white/10">⏱️ 03:00</div>
                        <div id="pp-score-badge" class="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">🏆 0</div>
                        <div id="pp-circle" class="relative w-64 h-64 md:w-80 md:h-80"></div>
                        <div id="pp-holo-letter" class="absolute inset-0 flex items-center justify-center text-8xl font-black text-white/5 pointer-events-none">A</div>
                    </div>
                    <div class="space-y-6 flex flex-col justify-center">
                        <div class="bg-indigo-600 text-white p-8 rounded-3xl space-y-4 shadow-xl shadow-indigo-100">
                            <div id="pp-letter-label" class="text-[10px] uppercase font-bold tracking-[0.2em] text-indigo-200 opacity-80">Starting with A...</div>
                            <div id="pp-question" class="text-lg font-bold leading-relaxed">Tanım yükleniyor...</div>
                        </div>
                        <div class="flex gap-2">
                            <input type="text" id="pp-input" placeholder="CEVABI YAZIN" class="flex-1 bg-slate-50 border border-slate-100 p-4 rounded-xl font-bold uppercase" onkeypress="if(event.key==='Enter') checkPassaparola()">
                            <button onclick="checkPassaparola()" class="game-btn-primary px-8">GÖNDER</button>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <button onclick="passPassaparola()" class="game-btn-secondary py-4">PAS</button>
                            <button id="pp-pause-btn" onclick="pausePassaparola()" class="game-btn-secondary py-4">BEKLE (10s)</button>
                        </div>
                        <button onclick="initPassaparola()" class="w-full py-4 text-red-500 font-bold border-2 border-dashed border-red-200 rounded-3xl hover:bg-red-50 transition-all uppercase tracking-widest text-xs">OYUNU BİTİR / SIFIRLA</button>
                    </div>
                </div>
            </div>
        <!-- SENTENCE ARCHITECT -->
        <div id="game-architect" class="game-container">
            <div class="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <h3 class="text-2xl font-bold text-slate-900">Cümle Mimarı</h3>
                    <select id="sa-level" class="game-select" onchange="initArchitect()"><option value="a1">A1</option><option value="a2">a2</option><option value="b1">b1</option><option value="b2">b2</option><option value="c1">c1</option></select>
                </div>
                <p class="text-slate-500 text-sm italic mb-8">Kelimeleri doğru sırayla seçerek anlamlı bir cümle oluştur.</p>
                
                <div class="max-w-4xl mx-auto space-y-12 py-8">
                    <!-- Translation Clue -->
                    <div class="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                        <div class="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">TÜRKÇE ANLAMI</div>
                        <div id="sa-tr-clue" class="text-xl font-bold text-slate-800">Cümle yükleniyor...</div>
                    </div>

                    <!-- Target Area (Slots) -->
                    <div id="sa-slots" class="flex flex-wrap justify-center gap-3 min-h-[60px] p-4 bg-slate-900/5 rounded-3xl border-2 border-dashed border-slate-200">
                        <!-- Clicked words go here -->
                    </div>

                    <!-- Source Area (Pool) -->
                    <div id="sa-pool" class="flex flex-wrap justify-center gap-3 p-4">
                        <!-- Shuffled words go here -->
                    </div>

                    <!-- Actions -->
                    <div class="flex justify-center gap-4">
                        <button onclick="undoArchitect()" class="game-btn-secondary px-8">SON KELİMEYİ AL</button>
                        <button onclick="initArchitect()" class="game-btn-primary px-8">YENİ CÜMLE</button>
                    </div>

                    <!-- Stats -->
                    <div class="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                        <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                            <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">DOĞRU</div>
                            <div id="sa-score" class="text-2xl font-black text-slate-900">0</div>
                        </div>
                        <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                            <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">CAN</div>
                            <div id="sa-lives" class="text-2xl font-black text-red-800">3</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>

<style>
    .game-tab-btn {
        padding: 10px 18px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 700;
        color: #64748b;
        transition: all 0.3s;
    }
    .game-tab-btn.active {
        background: #f1f5f9;
        color: #1e293b;
    }
    .game-tab-btn:hover:not(.active) {
        color: #0f172a;
        background: #f8fafc;
    }
    .game-container { display: none; }
    .game-container.active { display: block; }

    .game-card {
        background: white;
        padding: 32px;
        border-radius: 32px;
        border: 1px solid #f1f5f9;
        text-align: center;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .game-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px -12px rgba(0,0,0,0.08);
        border-color: #fee2e2;
    }
    .game-btn-primary {
        background: #0f172a;
        color: white;
        padding: 10px 20px;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        transition: all 0.3s;
    }
    .game-btn-primary:hover {
        background: #000;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .game-btn-secondary {
        background: #f8fafc;
        color: #475569;
        padding: 10px 20px;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 800;
        text-transform: uppercase;
        border: 1px solid #f1f5f9;
        transition: all 0.3s;
    }
    .game-btn-secondary:hover {
        background: #f1f5f9;
        color: #0f172a;
    }
    .game-select {
        background: #f8fafc;
        border: 1px solid #f1f5f9;
        padding: 8px 12px;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 700;
        outline: none;
    }

    /* Hangman Parts */
    .hm-part { stroke: #ef4444; stroke-width: 4; stroke-linecap: round; fill: none; opacity: 0.1; transition: opacity 0.4s; }
    .hm-part.visible { opacity: 1; }

    /* Crossword */
    #cw-grid { grid-template-columns: repeat(15, 1fr); cursor: text; }
    .cw-cell { width: 32px; height: 32px; background: #0f172a; position: relative; }
    .cw-cell.white { background: white; }
    .cw-cell-num { position: absolute; top: 1px; left: 2px; font-size: 0.5rem; color: #94a3b8; font-weight: 800; pointer-events: none; }
    .cw-input { width: 100%; height: 100%; border: none; background: transparent; text-align: center; font-weight: 900; color: #1e293b; outline: none; font-size: 1.1rem; }
    .cw-cell.correct { background: #dcfce7 !important; }
    .cw-cell.wrong { background: #fee2e2; }
    
    .cw-clue-item {
        padding: 14px;
        background: #f8fafc;
        border-left: 4px solid #e2e8f0;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 0.85rem;
    }
    .cw-clue-item:hover { border-left-color: #0f172a; background: #f1f5f9; }
    .cw-clue-item.active { border-left-color: #ef4444; background: #fef2f2; }

    /* Hangman Letters */
    .hm-letter-box {
        width: 32px;
        height: 44px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        font-size: 1.2rem;
        color: #0f172a;
        border-bottom: 4px solid #e2e8f0;
    }
    .hm-key {
        background: #f8fafc;
        border: 1px solid #f1f5f9;
        padding: 10px 2px;
        text-align: center;
        border-radius: 8px;
        font-weight: 800;
        font-size: 0.7rem;
        cursor: pointer;
        transition: all 0.2s;
        user-select: none;
    }
    .hm-key:active { transform: scale(0.9); }
    .hm-key.used.correct { background: #22c55e; color: white; border-color: #16a34a; }
    .hm-key.used.wrong { background: #ef4444; color: white; border-color: #dc2626; opacity: 0.5; }

    /* Passaparola Circle */
    .pp-letter {
        width: 24px; height: 24px;
        background: rgba(255,255,255,0.05);
        color: rgba(255,255,255,0.4);
        display: flex; align-items: center; justify-content: center;
        border-radius: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        font-size: 0.55rem;
        font-weight: 900;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border: 1px solid rgba(255,255,255,0.1);
        user-select: none;
    }
    .pp-letter.current {
        width: 38px; height: 38px;
        background: #4f46e5;
        color: white;
        font-size: 0.9rem;
        z-index: 10;
        box-shadow: 0 0 20px rgba(79, 70, 229, 0.5);
        border-color: white;
    }

    @media (max-width: 640px) {
        .cw-cell { width: 28px; height: 28px; }
        .cw-input { font-size: 1rem; }
        .pp-letter { width: 18px; height: 18px; font-size: 0.45rem; }
        .pp-letter.current { width: 28px; height: 28px; font-size: 0.7rem; }
        .hm-letter-box { width: 24px; height: 36px; font-size: 1rem; }
    }

    /* Sentence Architect Styles */
    .sa-word-box {
        background: white;
        border: 2px solid #e2e8f0;
        padding: 10px 20px;
        border-radius: 16px;
        font-weight: 800;
        color: #1e293b;
        cursor: pointer;
        transition: all 0.2s;
        user-select: none;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        font-size: 0.9rem;
    }
    .sa-word-box:hover {
        border-color: #4f46e5;
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    }
    .sa-word-box.selected {
        opacity: 0.3;
        pointer-events: none;
        transform: scale(0.95);
    }
    .sa-slot-word {
        background: #0f172a;
        color: white;
        padding: 8px 16px;
        border-radius: 12px;
        font-weight: 700;
        animation: sa-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    @keyframes sa-pop {
        0% { transform: scale(0.5); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
    }
</style>
`;

let gameLexicon = [];
let showHMTR = true;
let showCWTR = true;

// HANGMAN GLOBALS
let hmWord = "", hmGuessed = [], hmLives = 6, hmEnHint = "", hmTrHint = "";

// CROSSWORD GLOBALS
let cwCurrentData = null, cwDir = 'across';

// CHAIN GLOBALS
let chPrevWord = "", chUsedWords = [], chScore = 0, chMistakes = 0;

// PASSAPAROLA GLOBALS
const ppAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let ppRemaining = [...ppAlphabet], ppPassed = [], ppCurrentIdx = 0, ppTime = 180, ppTimer, ppScore = 0, ppQuestions = {}, ppIsPaused = false, ppPauseUsed = false;

// ARCHITECT GLOBALS
let gameSentences = [];
let currentSA = null, saUserWords = [], saScore = 0, saLives = 3;

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("tab-games");
    if (container) {
        container.innerHTML = gamesHTML;
        loadGameLexicon();
    }
});

async function loadGameLexicon() {
    try {
        const res = await fetch("/data/oxford_master_5000.json");
        const data = await res.json();
        gameLexicon = data.map(x => ({ w: x.word.toUpperCase(), l: x.level }));

        // Load sentences too
        const sRes = await fetch("/data/sentences.json");
        gameSentences = await sRes.json();
    } catch (e) {
        console.error("Lexicon load error", e);
        gameLexicon = [{ w: "APPLE", l: "a1" }, { w: "BANANA", l: "a1" }, { w: "COMPUTER", l: "b1" }];
    }
}

// TAB SWITCHING
window.switchGameSubTab = function (id) {
    document.querySelectorAll('.game-container').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.game-tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.getElementById('btn-' + id).classList.add('active');

    // Auto-init if first time
    if (id === 'game-hangman' && !hmWord) startHangman();
    if (id === 'game-crossword' && !cwCurrentData) startCrossword();
    if (id === 'game-chain' && !chPrevWord) initChain();
    if (id === 'game-passaparola' && ppRemaining.length === 26) initPassaparola();
    if (id === 'game-architect' && !currentSA) initArchitect();
};

window.toggleGameTR = function (game) {
    if (game === 'hm') {
        showHMTR = !showHMTR;
        document.getElementById("hm-tr-btn").innerText = showHMTR ? "🇹🇷 TR AÇIK" : "🇹🇷 TR KAPALI";
        updateHangmanHintDisplay();
    } else {
        showCWTR = !showCWTR;
        document.getElementById("cw-tr-btn").innerText = showCWTR ? "🇹🇷 TR AÇIK" : "🇹🇷 TR KAPALI";
        // Update crossword clues display
        document.querySelectorAll('.cw-tr-line').forEach(el => {
            el.style.display = showCWTR ? 'block' : 'none';
        });
    }
};

// --- HANGMAN LOGIC ---
window.startHangman = function () {
    if (!gameLexicon.length) { setTimeout(startHangman, 500); return; }
    const lvl = document.getElementById("hm-level").value;
    const len = document.getElementById("hm-len").value;
    let pool = gameLexicon.filter(x => (x.l || 'a1').toLowerCase() === lvl.toLowerCase());
    if (len !== 'any') {
        if (len === '9') pool = pool.filter(x => x.w.length >= 9);
        else pool = pool.filter(x => x.w.length === parseInt(len));
    }
    if (!pool.length) pool = gameLexicon.filter(x => (x.l || 'a1').toLowerCase() === lvl.toLowerCase());
    let item = pool[Math.floor(Math.random() * pool.length)];
    hmWord = item.w; hmGuessed = []; hmLives = 6; hmEnHint = ''; hmTrHint = '';

    document.getElementById("hm-clue-box").innerText = "İpucu yükleniyor...";
    renderHangman(); fetchHangmanHint(hmWord);
};

async function fetchHangmanHint(w) {
    try {
        let r = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${w}`);
        let d = await r.json();
        hmEnHint = Array.isArray(d) ? d[0].meanings[0].definitions[0].definition : "Tanım bulunamadı.";
        updateHangmanHintDisplay();
        fetch(`https://api.mymemory.translated.net/get?q=${w}&langpair=en|tr`)
            .then(r => r.json())
            .then(d => { hmTrHint = d.responseData.translatedText; updateHangmanHintDisplay(); });
    } catch (e) { document.getElementById("hm-clue-box").innerText = "İpucu hatası."; }
}

function updateHangmanHintDisplay() {
    let html = `<div>${hmEnHint}</div>`;
    if (showHMTR && hmTrHint) {
        html += `<div class="mt-4 pt-4 border-t border-slate-100/50 text-indigo-700 italic">🇹🇷 ${hmTrHint}</div>`;
    }
    document.getElementById("hm-clue-box").innerHTML = html;
}

function renderHangman() {
    const wb = document.getElementById("hm-word-display"); wb.innerHTML = "";
    for (let c of hmWord) {
        let card = document.createElement("div"); card.className = "hm-letter-box";
        card.innerText = hmGuessed.includes(c) ? c : ""; wb.appendChild(card);
    }
    document.getElementById("hm-lives").innerText = hmLives;
    renderHangmanKB(); updateHangmanSVG();

    const win = hmWord && hmWord.split("").every(c => hmGuessed.includes(c));
    if (win) { document.getElementById("hm-clue-box").innerHTML = "<div class='text-green-600 font-black text-2xl animate-bounce'>TEBRİKLER! 🎉</div>"; }
    else if (hmLives <= 0) { document.getElementById("hm-clue-box").innerHTML = `<div class='text-red-600 font-bold'>OYUN BİTTİ! 💀</div>Kelime şuydu: <b class='text-slate-900'>${hmWord}</b>`; }
}

function renderHangmanKB() {
    const kb = document.getElementById("hm-keyboard"); kb.innerHTML = "";
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(k => {
        let b = document.createElement("div"); b.className = "hm-key";
        if (hmGuessed.includes(k)) { b.classList.add("used"); b.classList.add(hmWord.includes(k) ? "correct" : "wrong"); }
        b.innerText = k; b.onclick = () => { if (!hmGuessed.includes(k) && hmLives > 0) { hmGuessed.push(k); if (!hmWord.includes(k)) hmLives--; renderHangman(); } }; kb.appendChild(b);
    });
}

function updateHangmanSVG() {
    const ids = ["hm-rleg", "hm-lleg", "hm-rarm", "hm-larm", "hm-body", "hm-head"];
    ids.forEach((id, i) => { let el = document.getElementById(id); if (i < (6 - hmLives)) el.classList.add("visible"); else el.classList.remove("visible"); });
}

// --- CROSSWORD LOGIC ---
window.startCrossword = function () {
    if (!gameLexicon.length) { setTimeout(startCrossword, 500); return; }
    document.getElementById("cw-loader").style.display = "flex";
    const l = document.getElementById("cw-level").value;
    let pool = gameLexicon.filter(x => (x.l || 'a1').toLowerCase() === l.toLowerCase() && x.w.length > 2 && x.w.length < 11);
    cwCurrentData = generateCrosswordGrid(pool.sort(() => 0.5 - Math.random()).slice(0, 15).map(x => x.w), 10);
    renderCrossword(cwCurrentData);
    loadCrosswordClues(cwCurrentData.placements, document.getElementById("cw-mode").value);
};

function generateCrosswordGrid(words, target) {
    const s = 15; let g = Array(s).fill(null).map(() => Array(s).fill("")); let p = [];
    const sorted = words.sort((a, b) => b.length - a.length);
    if (!sorted.length) return { grid: g, placements: p, wordStarts: {} };
    const w1 = sorted[0]; let r1 = Math.floor(s / 2), c1 = Math.floor((s - w1.length) / 2);
    for (let i = 0; i < w1.length; i++) g[r1][c1 + i] = w1[i]; p.push({ word: w1, r: r1, c: c1, dir: 'across' });
    for (let w of words.filter(x => x !== w1)) {
        if (p.length >= target) break;
        outer: for (let pl of p) {
            for (let i = 0; i < pl.word.length; i++) {
                for (let j = 0; j < w.length; j++) {
                    if (pl.word[i] === w[j]) {
                        let dir = pl.dir === 'across' ? 'down' : 'across',
                            r = dir === 'down' ? pl.r - j : pl.r + i,
                            c = dir === 'across' ? pl.c - j : pl.c + i;
                        if (canFitCrossword(g, w, r, c, dir)) {
                            for (let l = 0; l < w.length; l++) g[r + (dir === 'down' ? l : 0)][c + (dir === 'across' ? l : 0)] = w[l];
                            p.push({ word: w, r, c, dir }); break outer;
                        }
                    }
                }
            }
        }
    }
    let ws = {}; let count = 1;
    for (let r = 0; r < 15; r++) for (let c = 0; c < 15; c++) {
        if (p.some(pl => pl.r === r && pl.c === c)) { ws[`${r}-${c}`] = count++; }
    }
    p.forEach(pl => pl.num = ws[`${pl.r}-${pl.c}`] || (p.find(o => o.r === pl.r && o.c === pl.c)?.num));
    return { grid: g, placements: p, wordStarts: ws };
}

function canFitCrossword(g, w, r, c, d) {
    for (let i = 0; i < w.length; i++) {
        let cr = r + (d === 'down' ? i : 0), cc = c + (d === 'across' ? i : 0);
        if (cr < 0 || cr >= 15 || cc < 0 || cc >= 15) return false;
        if (g[cr][cc] !== "" && g[cr][cc] !== w[i]) return false;
        if (g[cr][cc] === "") {
            let nh = d === 'across' ? [[cr - 1, cc], [cr + 1, cc]] : [[cr, cc - 1], [cr, cc + 1]];
            if (i === 0) nh.push(d === 'across' ? [cr, cc - 1] : [cr - 1, cc]);
            if (i === w.length - 1) nh.push(d === 'across' ? [cr, cc + 1] : [cr + 1, cc]);
            for (let [nr, nc] of nh) if (nr >= 0 && nr < 15 && nc >= 0 && nc < 15 && g[nr][nc] !== "") return false;
        }
    }
    return true;
}

function renderCrossword(d) {
    const container = document.getElementById("cw-grid"); container.innerHTML = "";
    d.grid.forEach((row, r) => {
        row.forEach((char, c) => {
            let cell = document.createElement("div"); cell.className = "cw-cell " + (char === "" ? "black" : "white");
            if (char !== "") {
                if (d.wordStarts[`${r}-${c}`]) {
                    let n = document.createElement("span"); n.className = "cw-cell-num"; n.innerText = d.wordStarts[`${r}-${c}`]; cell.appendChild(n);
                }
                let ip = document.createElement("input"); ip.className = "cw-input"; ip.maxLength = 1; ip.dataset.a = char; ip.dataset.r = r; ip.dataset.c = c;
                ip.oninput = (e) => { e.target.value = e.target.value.toUpperCase(); if (e.target.value) moveCrosswordFocus(r, c, 1); };
                ip.onkeydown = (e) => { if (e.key === 'Backspace' && !e.target.value) moveCrosswordFocus(r, c, -1); }; cell.appendChild(ip);
            }
            container.appendChild(cell);
        });
    });
}

function moveCrosswordFocus(r, c, s) {
    let nr = r + (cwDir === 'down' ? s : 0), nc = c + (cwDir === 'across' ? s : 0);
    let n = document.querySelector(`.cw-input[data-r="${nr}"][data-c="${nc}"]`); if (n) n.focus();
}

async function loadCrosswordClues(p, m) {
    const list = document.getElementById("cw-clue-list"); list.innerHTML = "";
    p.sort((a, b) => a.num - b.num);
    const res = await Promise.all(p.map(async i => {
        let cl = `<div>${i.word} maddesi.</div>`;
        try {
            let r = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${i.word}`); let d = await r.json();
            if (Array.isArray(d)) { let mn = d[0].meanings[0]; let def = m === 'definition' ? mn.definitions[0].definition : mn.synonyms?.[0] || mn.definitions[0].definition; cl = `<div>${def}</div>`; }
            const tr_r = await fetch(`https://api.mymemory.translated.net/get?q=${i.word}&langpair=en|tr`);
            const tr_d = await tr_r.json();
            cl += `<div class="cw-tr-line" style="display:${showCWTR ? 'block' : 'none'}; color:#64748b; font-size:0.75rem; margin-top:4px; border-top:1px solid #f1f5f9; padding-top:4px italic">🇹🇷 ${tr_d.responseData.translatedText}</div>`;
        } catch (e) { }
        return { clue: cl, num: i.num, dir: i.dir, word: i.word };
    }));
    document.getElementById("cw-loader").style.display = "none";
    res.forEach(r => {
        let li = document.createElement("li"); li.className = "cw-clue-item";
        li.innerHTML = `<div style="color:#ef4444;font-weight:900;font-size:0.7rem;margin-bottom:4px">${r.num}. ${r.dir.toUpperCase()}</div>${r.clue}<div class="cw-reveal-ans" style="display:none;color:#16a34a;font-weight:bold;margin-top:5px;font-size:0.8rem">Cevap: ${r.word}</div>`;
        li.onclick = () => { let s = p.find(x => x.num === r.num); let ip = document.querySelector(`.cw-input[data-r="${s.r}"][data-c="${s.c}"]`); if (ip) { cwDir = r.dir; ip.focus(); } }; list.appendChild(li);
    });
}

window.checkCrosswordAnswers = function () {
    document.querySelectorAll(".cw-input").forEach(i => { const ok = i.value.toUpperCase() === i.dataset.a; i.parentElement.className = "cw-cell white " + (ok ? "correct" : "wrong"); });
};

window.toggleCrosswordReveal = function () {
    const els = document.querySelectorAll('.cw-reveal-ans');
    const isHidden = els[0]?.style.display === 'none';
    els.forEach(e => e.style.display = isHidden ? 'block' : 'none');
};

// --- WORD CHAIN LOGIC ---
window.initChain = function () {
    if (!gameLexicon.length) return;
    const lvl = document.getElementById("ch-level").value;
    const pool = gameLexicon.filter(x => (x.l || 'a1').toLowerCase() === lvl.toLowerCase());
    const randomEntry = pool.length ? pool[Math.floor(Math.random() * pool.length)] : gameLexicon[Math.floor(Math.random() * gameLexicon.length)];
    chPrevWord = randomEntry.w; chUsedWords = [chPrevWord]; chScore = 0; chMistakes = 0;
    updateChainUI();
    document.getElementById("ch-input").value = "";
    document.getElementById("ch-input").disabled = false;
    document.getElementById("ch-status").innerText = "Zincir başladı!";
    document.querySelectorAll("#chc-head, #chc-body, #chc-larm, #chc-rarm, #chc-lleg, #chc-rleg").forEach(el => el.classList.remove("visible"));
};

function updateChainUI() {
    const main = chPrevWord.slice(0, -1); const last = chPrevWord.slice(-1);
    document.getElementById("ch-prev-word").innerHTML = `${main}<span class="text-indigo-400">${last}</span>`;
    document.getElementById("ch-score").innerText = chScore;
    document.getElementById("ch-mistakes").innerText = `${chMistakes} / 6`;
    document.getElementById("ch-lives-val").innerText = 6 - chMistakes;
    const ids = ["chc-rleg", "chc-lleg", "chc-rarm", "chc-larm", "chc-body", "chc-head"];
    ids.forEach((id, i) => { let el = document.getElementById(id); if (i < chMistakes) el.classList.add("visible"); else el.classList.remove("visible"); });
}

window.checkChain = function () {
    const input = document.getElementById("ch-input"); const val = input.value.toUpperCase().trim(); const status = document.getElementById("ch-status");
    if (!val) return; input.value = "";
    if (chUsedWords.includes(val)) { status.innerText = "Kelime zaten kullanıldı!"; handleChainMistake(); return; }
    if (val.charAt(0) !== chPrevWord.charAt(chPrevWord.length - 1)) { status.innerText = `"${chPrevWord.charAt(chPrevWord.length - 1)}" harfiyle başlamalı!`; handleChainMistake(); return; }
    status.innerText = "Sözlük kontrol ediliyor...";
    if (gameLexicon.some(x => x.w === val)) {
        chPrevWord = val; chUsedWords.push(val); chScore++; status.innerText = "Doğru! Sıradaki harf: " + val.charAt(val.length - 1); updateChainUI();
    } else { status.innerText = "Kelime Oxford listesinde yok!"; handleChainMistake(); }
};

function handleChainMistake() {
    chMistakes++; updateChainUI();
    if (chMistakes >= 6) { document.getElementById("ch-status").innerHTML = "<span class='text-red-600'>OYUN BİTTİ!</span>"; document.getElementById("ch-input").disabled = true; }
}

// --- PASSAPAROLA LOGIC ---
window.initPassaparola = function () {
    clearInterval(ppTimer);
    const container = document.getElementById('pp-circle'); container.innerHTML = "";
    const radius = 120, centerX = container.clientWidth / 2 || 160, centerY = container.clientHeight / 2 || 160;
    ppAlphabet.forEach((l, i) => {
        const angle = (i / 26) * 2 * Math.PI - Math.PI / 2;
        const div = document.createElement('div'); div.className = 'pp-letter'; div.textContent = l; div.id = `ppl-${l}`;
        div.style.left = `${centerX + radius * Math.cos(angle)}px`; div.style.top = `${centerY + radius * Math.sin(angle)}px`;
        container.appendChild(div);
    });
    ppRemaining = [...ppAlphabet]; ppPassed = []; ppCurrentIdx = 0; ppTime = 180; ppScore = 0; ppQuestions = {}; ppIsPaused = false; ppPauseUsed = false;
    document.getElementById("pp-input").disabled = false;
    document.getElementById("pp-pause-btn").disabled = false;
    document.getElementById("pp-score-badge").innerText = `🏆 0`;
    showPassaparolaQuestion();
    startPassaparolaTimer();
};

function startPassaparolaTimer() {
    ppTimer = setInterval(() => {
        if (!ppIsPaused) {
            ppTime--; const m = Math.floor(ppTime / 60), s = ppTime % 60;
            document.getElementById('pp-timer').textContent = `⏱️ ${m}:${s < 10 ? '0' + s : s}`;
            if (ppTime <= 0) endPassaparola();
        }
    }, 1000);
}

async function showPassaparolaQuestion() {
    if (ppRemaining.length === 0 && ppPassed.length > 0) { ppRemaining = [...ppPassed]; ppPassed = []; ppCurrentIdx = 0; }
    if (ppRemaining.length === 0) { endPassaparola(); return; }
    const l = ppRemaining[ppCurrentIdx];
    const lvl = document.getElementById("pp-level").value;
    document.querySelectorAll(".pp-letter").forEach(el => el.classList.remove("current"));
    const target = document.getElementById(`ppl-${l}`);
    if (target) target.classList.add("current");
    document.getElementById("pp-holo-letter").innerText = l;
    document.getElementById("pp-letter-label").innerText = `${l} ile başlayan...`;
    if (!ppQuestions[l]) {
        document.getElementById('pp-question').innerText = "Tanım yükleniyor...";
        const pool = gameLexicon.filter(x => x.w.startsWith(l) && (x.l || 'a1').toLowerCase() === lvl.toLowerCase());
        const word = pool.length ? pool[Math.floor(Math.random() * pool.length)].w : gameLexicon.find(x => x.w.startsWith(l))?.w || "APPLE";
        try {
            const r = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`); const d = await r.json();
            const def = Array.isArray(d) ? d[0].meanings[0].definitions[0].definition : "Tanım bulunamadı.";
            ppQuestions[l] = { q: def, a: word };
        } catch (e) { ppQuestions[l] = { q: "Tanım hatası: " + word, a: word }; }
    }
    document.getElementById('pp-question').innerText = ppQuestions[l].q;
    document.getElementById("pp-input").value = ""; document.getElementById("pp-input").focus();
}

window.checkPassaparola = function () {
    const l = ppRemaining[ppCurrentIdx]; const ans = document.getElementById("pp-input").value.toUpperCase().trim();
    const el = document.getElementById(`ppl-${l}`);
    if (ans === ppQuestions[l].a) {
        ppScore += 10; document.getElementById("pp-score-badge").innerText = `🏆 ${ppScore}`;
        if (el) { el.style.background = "#22c55e"; el.style.color = "white"; }
        ppRemaining.splice(ppCurrentIdx, 1);
    } else {
        if (el) { el.style.background = "#ef4444"; el.style.color = "white"; }
        ppRemaining.splice(ppCurrentIdx, 1);
    }
    ppCurrentIdx = ppCurrentIdx % Math.max(1, ppRemaining.length); showPassaparolaQuestion();
};

window.passPassaparola = function () {
    const l = ppRemaining[ppCurrentIdx]; const el = document.getElementById(`ppl-${l}`);
    if (el) { el.style.background = "#94a3b8"; el.style.color = "white"; }
    ppPassed.push(l); ppRemaining.splice(ppCurrentIdx, 1);
    ppCurrentIdx = ppCurrentIdx % Math.max(1, ppRemaining.length); showPassaparolaQuestion();
};

window.pausePassaparola = function () {
    if (!ppPauseUsed && !ppIsPaused) {
        ppIsPaused = true; ppPauseUsed = true; let top = 10;
        const btn = document.getElementById("pp-pause-btn"); btn.disabled = true;
        const t = setInterval(() => { top--; btn.innerText = `BEKLE (${top}s)`; if (top <= 0) { clearInterval(t); ppIsPaused = false; btn.innerText = "BEKLE (10s)"; } }, 1000);
    }
};

function endPassaparola() {
    clearInterval(ppTimer);
    document.getElementById("pp-question").innerHTML = `<div class="text-slate-900 text-2xl font-black">OTURUM SONLANDI</div>Puan: ${ppScore}`;
    document.getElementById("pp-input").disabled = true;
}

// --- SENTENCE ARCHITECT LOGIC ---
window.initArchitect = function () {
    if (!gameSentences.length) return;
    const lvl = document.getElementById("sa-level").value;
    const pool = gameSentences.filter(s => s.level.toLowerCase() === lvl.toLowerCase());
    if (!pool.length) { alert("Bu seviye için henüz cümle eklenmemiş."); return; }

    currentSA = pool[Math.floor(Math.random() * pool.length)];
    saUserWords = [];
    saLives = 3;
    renderArchitect();
};

function renderArchitect() {
    // UI Updates
    document.getElementById("sa-tr-clue").innerText = currentSA.tr;
    document.getElementById("sa-score").innerText = saScore;
    document.getElementById("sa-lives").innerText = saLives;

    // Slots Area
    const slots = document.getElementById("sa-slots");
    slots.innerHTML = "";
    saUserWords.forEach((w, i) => {
        const div = document.createElement("div");
        div.className = "sa-slot-word";
        div.innerText = w;
        div.onclick = () => undoArchitect(); // Can also undo by clicking
        slots.appendChild(div);
    });

    // Pool Area
    const pool = document.getElementById("sa-pool");
    pool.innerHTML = "";

    // Original words split and shuffled
    const originalWords = currentSA.en.split(" ");
    const shuffled = [...originalWords].sort((a, b) => a.localeCompare(b)); // Sort by alphabet initially or shuffle
    // Let's actually shuffle properly
    const finalPool = currentSA._shuffled || [...originalWords].sort(() => Math.random() - 0.5);
    currentSA._shuffled = finalPool; // Keep same shuffle for this sentence

    finalPool.forEach((word, idx) => {
        // Find how many times this word has been used already in saUserWords
        const usedCount = saUserWords.filter(w => w === word).length;
        const totalInSentence = originalWords.filter(w => w === word).length;

        const btn = document.createElement("div");
        btn.className = "sa-word-box";
        if (usedCount >= totalInSentence) btn.classList.add("selected");
        btn.innerText = word;
        btn.onclick = () => selectArchitectWord(word);
        pool.appendChild(btn);
    });
}

window.selectArchitectWord = function (word) {
    if (saLives <= 0) return;
    saUserWords.push(word);

    // Check if correct so far
    const correctWords = currentSA.en.split(" ");
    const currentIdx = saUserWords.length - 1;
    if (saUserWords[currentIdx] !== correctWords[currentIdx]) {
        // WRONG
        saLives--;
        saUserWords.pop();
        alert("Yanlış kelime! Tekrar dene.");
        if (saLives <= 0) {
            alert("Canın bitti! Doğru cümle: " + currentSA.en);
            initArchitect();
            return;
        }
    } else {
        // CORRECT so far
        if (saUserWords.length === correctWords.length) {
            saScore += 10;
            alert("Tebrikler! Cümleyi doğru kurdun.");
            initArchitect();
            return;
        }
    }
    renderArchitect();
};

window.undoArchitect = function () {
    if (saUserWords.length > 0) {
        saUserWords.pop();
        renderArchitect();
    }
};
