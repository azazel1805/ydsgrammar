
const EXAM_EVENTS = [
    { date: "2026-03-07", label: "YÖKDİL/1", title: "YÖKDİL 1. Oturum", type: "yokdil", desc: "Yükseköğretim Kurumları Yabancı Dil Sınavı", results: "2026-03-24" },
    { date: "2026-04-05", label: "YDS/1", title: "YDS 1. Oturum", type: "yds", desc: "Yabancı Dil Bilgisi Seviye Tespit Sınavı", results: "2026-04-30" },
    { date: "2026-06-14", label: "YDT", title: "YKS YDT", type: "ydt", desc: "Yükseköğretim Kurumları Sınavı - Yabancı Dil Testi", results: "2026-07-16" },
    { date: "2026-08-23", label: "YÖKDİL/2", title: "YÖKDİL 2. Oturum", type: "yokdil", desc: "Yükseköğretim Kurumları Yabancı Dil Sınavı", results: "2026-09-08" },
    { date: "2026-11-21", label: "YDS/2", title: "YDS 2. Oturum", type: "yds", desc: "Yabancı Dil Bilgisi Seviye Tespit Sınavı", results: "2026-12-09" }
];

const calendarHTML = `
<div class="max-w-6xl mx-auto px-4 py-12">
    <!-- Header -->
    <div class="text-center mb-16">
        <div class="inline-flex items-center gap-3 bg-red-800 text-white px-6 py-2 rounded-2xl shadow-xl mb-6">
            <i class="fas fa-calendar-alt"></i>
            <span class="font-bold tracking-widest text-xs uppercase">Sınav Takvimi 2026</span>
        </div>
        <h2 class="text-5xl font-black text-slate-900 mb-6" style="font-family:'Playfair Display',serif;">
            Geleceğini <span class="text-red-800">Planla</span>
        </h2>
        <p class="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            2026 yılı ÖSYM sınav tarihlerini, başvuru ve sonuç tarihlerini buradan takip edebilirsin.
        </p>
    </div>

    <div class="grid lg:grid-cols-12 gap-12">
        <!-- Calendar Grid -->
        <div class="lg:col-span-8 bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-red-900/5 border border-slate-50 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-[100px] -z-10 opacity-30"></div>
            
            <div class="flex items-center justify-between mb-10">
                <h3 id="currentMonthYear" class="text-3xl font-black text-slate-900" style="font-family:'Playfair Display',serif;">Mart 2026</h3>
                <div class="flex gap-2">
                    <button onclick="changeMonth(-1)" class="w-10 h-10 rounded-xl bg-slate-50 hover:bg-red-800 hover:text-white transition-all flex items-center justify-center border border-slate-100 shadow-sm">
                        <i class="fas fa-chevron-left text-xs"></i>
                    </button>
                    <button onclick="changeMonth(1)" class="w-10 h-10 rounded-xl bg-slate-50 hover:bg-red-800 hover:text-white transition-all flex items-center justify-center border border-slate-100 shadow-sm">
                        <i class="fas fa-chevron-right text-xs"></i>
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-7 gap-2 mb-4">
                ${['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(d => `
                    <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center py-2">${d}</div>
                `).join('')}
            </div>

            <div id="calendarGrid" class="grid grid-cols-7 gap-2 md:gap-4 relative min-h-[400px]">
                <!-- Days injected here -->
            </div>
        </div>

        <!-- Event Details Card -->
        <div class="lg:col-span-4 space-y-6">
            <div id="calendarSidebar" class="bg-slate-900 rounded-[2.5rem] p-8 text-white h-full shadow-2xl shadow-slate-900/40 sticky top-12">
                <div class="mb-8">
                    <p class="text-[10px] font-black text-red-400 uppercase tracking-[0.2em] mb-4">Seçili Tarih Detayı</p>
                    <div id="eventDetailContent">
                        <div class="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-40">
                            <i class="fas fa-bullseye text-4xl"></i>
                            <p class="text-sm font-medium">Bölümü görüntülemek için takvimden bir sınav seçin.</p>
                        </div>
                    </div>
                </div>

                <div class="pt-8 border-t border-white/10">
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Yaklaşan Sınavlar</p>
                    <div class="space-y-4" id="upcomingExamsList">
                        <!-- Upcoming injected here -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .calendar-day {
        aspect-ratio: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 1.5rem;
        font-weight: 700;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid transparent;
        position: relative;
    }
    .calendar-day:hover {
        background: #f8fafc;
        transform: translateY(-2px);
    }
    .calendar-day.today {
        background: #fff;
        border-color: #ef4444;
        color: #ef4444;
        box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.1);
    }
    .calendar-day.today::after {
        content: 'BUGÜN';
        position: absolute;
        bottom: 2px;
        font-size: 6px;
        font-weight: 900;
        letter-spacing: 0.1em;
    }
    .calendar-day.other-month {
        opacity: 0.15;
        pointer-events: none;
    }
    .calendar-day.has-exam {
        background: #991b1b;
        color: white;
        box-shadow: 0 10px 20px -5px rgba(153, 27, 27, 0.3);
    }
    .calendar-day.has-exam:hover {
        background: #000;
    }
    .calendar-day.selected {
        border: 2px solid #000;
        transform: scale(1.1);
        z-index: 10;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .exam-dot {
        position: absolute;
        top: 6px;
        right: 6px;
        width: 6px;
        height: 6px;
        background: white;
        border-radius: full;
        box-shadow: 0 0 10px white;
    }

    @keyframes fadeInCalendar {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .calendar-animate {
        animation: fadeInCalendar 0.4s ease forwards;
    }
</style>
`;

let currentCalDate = new Date(2026, 2, 1); // Default to March 2026 as per screenshot

function initCalendar() {
    const today = new Date();
    // Use current computer time if it's 2026, else stick to 2026
    if (today.getFullYear() === 2026) {
        currentCalDate = new Date(today.getFullYear(), today.getMonth(), 1);
    } else {
        currentCalDate = new Date(2026, 2, 1);
    }
    renderCalendar();
    renderUpcoming();
}

function changeMonth(dir) {
    currentCalDate.setMonth(currentCalDate.getMonth() + dir);
    renderCalendar();
}

function renderCalendar() {
    const month = currentCalDate.getMonth();
    const year = currentCalDate.getFullYear();
    
    document.getElementById('currentMonthYear').innerText = 
        new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric' }).format(currentCalDate);

    const firstDay = new Date(year, month, 1).getDay(); // Sun=0
    // Adjust to Monday = 0
    let startDayIdx = (firstDay === 0) ? 6 : firstDay - 1;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevDaysInMonth = new Date(year, month, 0).getDate();
    
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';

    // Prev month days
    for (let i = startDayIdx - 1; i >= 0; i--) {
        const d = prevDaysInMonth - i;
        grid.innerHTML += `<div class="calendar-day other-month">${d}</div>`;
    }

    const todayStr = new Date().toISOString().split('T')[0];

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const exam = EXAM_EVENTS.find(e => e.date === dateStr);
        const isToday = dateStr === todayStr;
        
        const dayEl = document.createElement('div');
        dayEl.className = `calendar-day ${exam ? 'has-exam' : ''} ${isToday ? 'today' : ''} calendar-animate`;
        dayEl.style.animationDelay = `${i * 0.01}s`;
        dayEl.innerHTML = `
            ${i}
            ${exam ? '<div class="exam-dot"></div>' : ''}
            ${exam ? `<div class="absolute -bottom-1 text-[8px] font-black text-white/60">${exam.label}</div>` : ''}
        `;
        
        dayEl.onclick = () => {
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
            dayEl.classList.add('selected');
            showEventDetail(exam, dateStr);
        };

        grid.appendChild(dayEl);
    }

    // Next month days (fill the rest of grid 42 slots usually)
    const totalSlots = 42;
    const remaining = totalSlots - (startDayIdx + daysInMonth);
    for (let i = 1; i <= remaining; i++) {
        grid.innerHTML += `<div class="calendar-day other-month">${i}</div>`;
    }
}

function showEventDetail(exam, dateStr) {
    const container = document.getElementById('eventDetailContent');
    if (!exam) {
        container.innerHTML = `
            <div class="bg-white/5 rounded-2xl p-6 border border-white/5">
                <p class="text-sm text-slate-400 font-serif italic mb-2">Tarih: ${new Intl.DateTimeFormat('tr-TR', { dateStyle: 'full' }).format(new Date(dateStr))}</p>
                <p class="text-xs text-slate-500">Bu tarihte planlı bir sınav bulunmuyor. Hazırlıklara devam!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="animate-in fade-in slide-in-from-right-4 duration-500">
            <div class="inline-flex px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-red-400 mb-6">
                ${exam.type.toUpperCase()} OTURUMU
            </div>
            <h4 class="text-3xl font-black mb-4 leading-tight">${exam.title}</h4>
            <p class="text-slate-400 text-sm leading-relaxed mb-10 font-medium">${exam.desc}</p>
            
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-white/5 p-4 rounded-2xl border border-white/10 group hover:bg-white/10 transition-colors">
                    <p class="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Sınav Tarihi</p>
                    <p class="text-lg font-bold">${new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long' }).format(new Date(exam.date))}</p>
                    <p class="text-[10px] text-slate-400">Pazar, 10:15</p>
                </div>
                <div class="bg-white/5 p-4 rounded-2xl border border-white/10 group hover:bg-white/10 transition-colors">
                    <p class="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Sonuç Tarihi</p>
                    <p class="text-lg font-bold text-green-400">${new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long' }).format(new Date(exam.results))}</p>
                </div>
            </div>

            <button onclick="switchTab('tacticguide')" class="w-full mt-10 py-4 bg-red-800 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-red-900/40 hover:bg-white hover:text-black transition-all">
                STRATEJİLERİ İNCELE
            </button>
        </div>
    `;
}

function renderUpcoming() {
    const list = document.getElementById('upcomingExamsList');
    if (!list) return;

    const today = new Date();
    const upcoming = EXAM_EVENTS
        .filter(e => new Date(e.date) >= today)
        .sort((a,b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);

    if (upcoming.length === 0) {
        list.innerHTML = `<p class="text-xs text-slate-500 italic">Planlı sınav kalmadı.</p>`;
        return;
    }

    list.innerHTML = upcoming.map(e => {
        const dateObj = new Date(e.date);
        const diffTime = Math.abs(dateObj - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return `
            <div class="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/20 transition-all cursor-pointer group"
                onclick="currentCalDate = new Date(${dateObj.getFullYear()}, ${dateObj.getMonth()}, 1); renderCalendar(); showEventDetail(EXAM_EVENTS.find(ev=>ev.date==='${e.date}'), '${e.date}')">
                <div class="text-center min-w-[50px]">
                    <p class="text-[10px] font-black text-slate-500 uppercase">${new Intl.DateTimeFormat('tr-TR', { month: 'short' }).format(dateObj)}</p>
                    <p class="text-xl font-black text-white">${dateObj.getDate()}</p>
                </div>
                <div class="flex-1">
                    <p class="text-sm font-bold text-slate-200">${e.label}</p>
                    <p class="text-[10px] font-medium text-red-400/80 uppercase tracking-tight">${diffDays} gün kaldı</p>
                </div>
                <i class="fas fa-chevron-right text-[10px] text-slate-700 group-hover:text-red-800 group-hover:translate-x-1 transition-all"></i>
            </div>
        `;
    }).join('');
}

// Global exports
window.initCalendar = initCalendar;
window.changeMonth = changeMonth;
window.calendarHTML = calendarHTML;
window.EXAM_EVENTS = EXAM_EVENTS;
