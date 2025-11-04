
// SVG library
const SVG = {
    gear: () => `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 3.75a2.25 2.25 0 1 1 3 2.121V9.75h4.5a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V10.5a.75.75 0 0 1 .75-.75h4.5V5.871a2.25 2.25 0 0 1-3-2.121Z"/></svg>`,
    globe: () => `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6l4 2"/></svg>`,
    timer: () => `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 10h-1V8h1v4Zm-1 2h1v1h-1v-1Z"/></svg>`,
    check: () => `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>`
};

/* === BENEFITS RENDER === */
(function renderBenefits() {
    const grid = document.getElementById('benefits-grid');
    if (!grid) return;

    const benefits = [
        { icon: SVG.gear, title: "Scientifically Valid", desc: "Backed by modern IQ research" },
        { icon: SVG.globe, title: "Worldwide Comparison", desc: "Compare with global users" },
        { icon: SVG.timer, title: "Timed & Accurate", desc: "Fair timing, precise scoring" },
        { icon: SVG.check, title: "Instant Results", desc: "See your IQ immediately" }
    ];

    const colors = [
        { bg: 'bg-purple-50', border: 'border-purple-200', iconBg: 'bg-purple-100', text: 'text-purple-700', orb: 'bg-purple-300' },
        { bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-blue-100', text: 'text-blue-700', orb: 'bg-blue-300' },
        { bg: 'bg-emerald-50', border: 'border-emerald-200', iconBg: 'bg-emerald-100', text: 'text-emerald-700', orb: 'bg-emerald-300' },
        { bg: 'bg-amber-50', border: 'border-amber-200', iconBg: 'bg-amber-100', text: 'text-amber-700', orb: 'bg-amber-300' }
    ];

    benefits.forEach((item, i) => {
        const c = colors[i];
        const tilt = i % 2 === 0 ? 'rotate-3' : '-rotate-3';
        const lift = (i === 1 || i === 2) ? 'translate-y-4' : '';
        const pop = (i === 2) ? 'scale-105 shadow-2xl' : '';

        const card = document.createElement('div');
        card.className = `relative p-8 rounded-3xl border-2 ${c.border} ${c.bg} reveal overflow-hidden group cursor-pointer transform-gpu transition-all duration-500 ${tilt} ${lift} ${pop}`.trim();
        card.style.transitionDelay = `${i * 0.12}s`;

        card.innerHTML = `
          <div class="absolute -top-8 -left-8 w-36 h-36 ${c.orb} rounded-full blur-3xl opacity-20 -z-10 group-hover:opacity-40 transition-opacity"></div>

          <div class="inline-flex items-center justify-center w-16 h-16 mb-6 ${c.iconBg} ${c.text} rounded-2xl group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500">
            ${item.icon()}
          </div>

          <h3 class="text-xl font-black ${c.text} mb-3 tracking-tight">${item.title}</h3>
          <p class="text-sm opacity-90 leading-relaxed ${c.text}">${item.desc}</p>

          <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-80 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-1000"></div>
        `;

        // Hover lift (keeps original visual behavior)
        card.addEventListener('mouseenter', () => {
            card.style.transform = `translateY(-20px) scale(1.08) ${tilt}`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });

        grid.appendChild(card);
    });
})();

/* === STEPS RENDER === */
(function renderSteps() {
    const stepsContainer = document.getElementById('steps-container');
    if (!stepsContainer) return;

    const steps = [
        { num: "1", title: "Start the Test", desc: "Begin instantly — no signup needed." },
        { num: "2", title: "Answer Questions", desc: "Verbal, logic, spatial — all in one." },
        { num: "3", title: "Get Instant Score", desc: "IQ + percentile in seconds." },
        { num: "4", title: "Download Certificate", desc: "Personalized PDF (optional)." }
    ];

    const stepColors = ['bg-indigo-50 text-indigo-700 border-indigo-200', 'bg-teal-50 text-teal-700 border-teal-200', 'bg-violet-50 text-violet-700 border-violet-200', 'bg-rose-50 text-rose-700 border-rose-200'];

    steps.forEach((step, i) => {
        const div = document.createElement('div');
        div.className = `flex items-start space-x-6 p-6 rounded-2xl border ${stepColors[i]} reveal`;
        div.style.transitionDelay = `${i * 0.15}s`;
        div.innerHTML = `
          <div class="flex-shrink-0 w-14 h-14 bg-primary text-black rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
            ${step.num}
          </div>
          <div class="flex-1 pt-1">
            <h4 class="text-xl font-bold text-gray-900">${step.title}</h4>
            <p class="text-gray-600 mt-1">${step.desc}</p>
          </div>
        `;
        stepsContainer.appendChild(div);
    });
})();

/* === RANKINGS RENDER === */
(function renderRankings() {
    const container = document.getElementById('ranking-container');
    if (!container) return;

    const rankings = [
        { country: 'Japan', iq: 106.48, flag: 'https://flagcdn.com/w320/jp.png' },
        { country: 'Taiwan', iq: 106.47, flag: 'https://flagcdn.com/w320/tw.png' },
        { country: 'Singapore', iq: 105.89, flag: 'https://flagcdn.com/w320/sg.png' },
        { country: 'Hong Kong', iq: 105.37, flag: 'https://flagcdn.com/w320/hk.png' },
        { country: 'China', iq: 104.1, flag: 'https://flagcdn.com/w320/cn.png' }
    ];

    rankings.forEach((rank, i) => {
        const card = document.createElement('div');
        card.className = `bg-white p-6 rounded-2xl card-hover border border-gray-200 reveal text-center group ranking-card`;
        card.style.transitionDelay = `${i * 0.1}s`;
        card.innerHTML = `
          <div class="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden shadow-md ring-4 ring-white group-hover:scale-110 transition-transform">
            <img src="${rank.flag}" alt="${rank.country} flag" class="w-full h-full object-cover">
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">${rank.country}</h3>
          <p class="text-2xl font-extrabold text-primary">${rank.iq}</p>
          <p class="text-xs text-gray-600">Avg IQ</p>
        `;
        container.appendChild(card);
    });
})();

/* === REVEAL ON SCROLL (IntersectionObserver) === */
(function setupReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.12 });

    // observe current elements + newly added ones (use delegation)
    const observeAll = () => document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    // initial observe (elements already appended)
    observeAll();

    // Also observe when new nodes are appended (MutationObserver)
    const grid = document.getElementById('benefits-grid');
    if (grid) {
        const mo = new MutationObserver(() => observeAll());
        mo.observe(grid, { childList: true, subtree: true });
    }
})();