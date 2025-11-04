// =================================================
/* IQ TEST – 3 MODE: Short | Medium | High-Acc */
// =================================================

const modes = {
  short:  { name: "Short",      questions: 15, time: 8,   file: 'fast.json' },
  medium: { name: "Medium",     questions: 30, time: 22*60,  file: 'medium.json' },
  high:   { name: "High-Acc",   questions: 50, time: 45*60,  file: 'advance.json' }
};

let CONFIG = modes.medium;
let questions = [];
let current = 0;
let answers = [];
let timer = null;
let timeLeft = 0;

// START BUTTONS
document.querySelectorAll('.start-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    btn.closest('[data-mode]').click();
  });
});

// TEST BOSHLASH
document.querySelectorAll('[data-mode]').forEach(card => {
  card.addEventListener('click', async () => {
    const mode = card.dataset.mode;
    CONFIG = modes[mode];

    // JSON DAN YUKLASH
    try {
      const response = await fetch(`../questions/${CONFIG.file}`);
      questions = await response.json();
    } catch (e) {
      console.error("JSON yuklanmadi:", e);
      alert("Test savollari yuklanmadi! Fayllarni tekshiring.");
      return;
    }

    // UI O'TISH
    document.querySelector('.pt-20').classList.add('hidden');
    document.getElementById('testArea').classList.remove('hidden');

    answers = new Array(questions.length).fill(undefined);
    current = 0;
    timeLeft = CONFIG.time;

    updateTimer();
    updateProgress();
    renderQuestion();
    startTimer();
  });
});

// SAVOL RENDER
function renderQuestion() {
  const q = questions[current];
  document.getElementById('question').textContent = q.q;
  document.getElementById('questionNum').textContent = `${current+1} / ${questions.length}`;

  const optionsHTML = q.a.map((opt,i) => `
    <button class="option-btn w-full p-5 bg-white border-2 border-border rounded-2xl text-left font-medium text-base sm:text-lg hover:border-primary hover:shadow-lg transition-all duration-300 ${answers[current] === i ? 'border-primary bg-primary/5 shadow-md' : ''}">
      ${opt}
    </button>
  `).join('');

  document.getElementById('options').innerHTML = optionsHTML;

  document.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.onclick = () => {
      answers[current] = i;
      document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('border-primary', 'bg-primary/5', 'shadow-md'));
      btn.classList.add('border-primary', 'bg-primary/5', 'shadow-md');
    };
  });

  document.getElementById('prevBtn').disabled = current === 0;
  document.getElementById('nextBtn').textContent = current === questions.length - 1 ? 'Finish' : 'Next';
  updateProgress();
}

// NAVIGATION
document.getElementById('prevBtn').onclick = () => { if (current > 0) { current--; renderQuestion(); } };
document.getElementById('nextBtn').onclick = () => {
  if (answers[current] === undefined) return alert("Please select an answer!");
  if (current < questions.length - 1) { current++; renderQuestion(); } else { endTest(); }
};

// TIMER
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) endTest();
  }, 1000);
}
function updateTimer() {
  const m = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const s = String(timeLeft % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `${m}:${s}`;
}

// PROGRESS
function updateProgress() {
  const percent = ((current + 1) / questions.length) * 100;
  document.getElementById('progress').style.width = `${percent}%`;
}

// END TEST + PDF
function endTest() {
  clearInterval(timer);

  const correct = answers.filter((a, i) => a === questions[i].c).length;
  const iq = Math.round(40 + correct * (120 / questions.length));  // 0 → 40, 100% → 160
  const pct = Math.round(correct / questions.length * 100);

  document.getElementById('testArea').classList.add('hidden');
  document.getElementById('results').classList.remove('hidden');
  document.getElementById('iqScore').textContent = iq;
  document.getElementById('percentile').textContent = pct;
  document.getElementById('badge').textContent = pct >= 98 ? 'Genius' : pct >= 90 ? 'Gifted' : pct >= 70 ? 'High' : 'Average';

  document.getElementById('downloadBtn').onclick = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(28);
    doc.text("IQWorld Certificate", 105, 50, { align: "center" });
    doc.setFontSize(18);
    doc.text(`${CONFIG.name} Test`, 105, 80, { align: "center" });
    doc.text(`IQ: ${iq}`, 105, 100, { align: "center" });
    doc.text(`Percentile: ${pct}%`, 105, 120, { align: "center" });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 140, { align: "center" });
    doc.save(`IQWorld_${CONFIG.name}_${iq}.pdf`);
  };
}