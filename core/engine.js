let currentSlide = 0;
let totalSlides = 0;
let score = 100;
let elapsedSeconds = 0;
let timerInterval;
let gameStarted = false;
let _currentConfig = null;
let currentRole = null;
let studentName = "";
let studentClass = "";
let wordStartTime = 0;

const CLASSES = {
    "Mr García": [
        "Acosta Valeria", "Araujo Valerie", "Bautista Cristian", "Bravo Armijos Meivi",
        "Campos Osorio Isaias", "Chango-Tasiguano Brithney", "Chasig Cataleya",
        "Dominguez-Bahena Liam", "Guadarrama Gerardo", "Hernandez Yanderis",
        "Lopez Caleb", "Matos Rodriguez Fatima", "Peralta-Flores Mia",
        "Ramirez Suniaga Isabella", "Sanchez Jair", "Sandoval Mariana",
        "Sotelo Lesly", "Varela Angel", "Vicente Adrian", "Vital Daniel"
    ],
    "Ms Poncelas": [
        "Beristain Loyo Angel", "Campos Eylin", "Cervantes Casarrubias Sergio",
        "Diaz Mateo", "Dorantes Lurmarelia", "Escobar Natasha", "Garcia David",
        "Garcia Sophia", "Guanotuna Sharline", "Landi Denise", "Lutuala Quishpe Erick",
        "Paniagua Edgar", "Pilaguano Choloquinga Sheyla", "Prada Edymar",
        "Rios Iam", "Salinas Elena", "Valladares Jesus", "Vallecillo Ana",
        "Veliz Gomez Carlismar"
    ],
    "Mr Zubieta": [
        "Fernandez Richard", "Gomez Salvador Judit", "Jacho Ayala Ashley",
        "Jacho Vega Kimberly", "Marin Delgado Isaac", "Martinez Garcia Iker",
        "Mercado Sapon Arianna", "Orozco Mia", "Perez-Larios Milan",
        "Ramirez Lauren", "Ruiz Contreras Daviana", "Thiago", "Tocte Condor Keylor",
        "Torres Pedroza Itzayana", "Valentin Mata Bryan", "Villalobos Emmanuel",
        "Zuniga Soto Wilson"
    ]
};

// URL de tu Web App de Google (Hoja de Cálculo)
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxeP7G4odynvqOqiSYwz-Xun-i8ZRjs2G_-xmvM7XpHS_5G3F-t8gb2TXlffyVuL1IbxQ/exec";

// Global functions attached to window for HTML onclick compatibility
window.selectRole = function (role) {
    currentRole = role;
    if (role === 'teacher') {
        window.confirmRole();
        return;
    }

    // Check for saved session
    const savedName = sessionStorage.getItem('studentName');
    const savedClass = sessionStorage.getItem('studentClass');
    if (savedName && savedClass) {
        showNameConfirmation(savedName, savedClass);
    } else {
        showClassSelection();
    }
};

function showClassSelection() {
    const card = document.querySelector('.role-card');
    card.innerHTML = `
        <h2>¿De qué clase eres?</h2>
        <div class="role-options" style="flex-direction: column; gap: 0.5rem;">
            ${Object.keys(CLASSES).map(teacher => `
                <button class="role-btn" style="width: 100%;" onclick="window.selectClass('${teacher}')">${teacher}</button>
            `).join('')}
        </div>
    `;
}

window.selectClass = function (teacher) {
    studentClass = teacher;
    const card = document.querySelector('.role-card');
    card.innerHTML = `
        <h2>Hola, Clase de ${teacher}</h2>
        <p style="margin-bottom: 1rem; color: var(--text-muted);">Elige tu nombre:</p>
        <div class="name-select-grid">
            ${CLASSES[teacher].map(name => `
                <button class="name-chip" onclick="window.selectStudentName('${name}')">${name}</button>
            `).join('')}
        </div>
        <button class="role-btn secondary" style="margin-top: 1rem; font-size: 0.8rem;" onclick="showClassSelection()">← Volver a elegir clase</button>
    `;
};

window.selectStudentName = function (name) {
    studentName = name;
    sessionStorage.setItem('studentName', name);
    sessionStorage.setItem('studentClass', studentClass);
    window.confirmRole();
};

function showNameConfirmation(name, className) {
    const card = document.querySelector('.role-card');
    card.innerHTML = `
        <h2>¡Hola de nuevo!</h2>
        <p style="margin-bottom: 2rem; font-size: 1.2rem; color: var(--text-muted);">
            ¿Eres <strong>${name}</strong> de la clase de <strong>${className}</strong>?
        </p>
        <div class="role-options">
            <button class="role-btn selected" onclick="window.confirmRoleFromSession('${name}', '${className}')">✅ Sí, soy yo</button>
            <button class="role-btn" onclick="window.resetNameSession()">❌ No soy yo</button>
        </div>
    `;
}

window.confirmRoleFromSession = function (name, className) {
    studentName = name;
    studentClass = className;
    currentRole = 'student';
    window.confirmRole();
};

window.resetNameSession = function () {
    sessionStorage.removeItem('studentName');
    sessionStorage.removeItem('studentClass');
    const overlay = document.getElementById('roleOverlay');
    if (overlay) overlay.remove();
    showRoleSelection();
};

window.confirmRole = function () {
    const overlay = document.getElementById('roleOverlay');
    if (overlay) overlay.remove();
    renderSlides();
    updateSlide();
};

window.toggleMenu = function () {
    const menu = document.getElementById('menuOverlay');
    if (menu) {
        menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
    }
};

window.speak = function (text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
};

window.revealText = function (btn) {
    const textBox = btn.parentElement;
    if (textBox) textBox.classList.remove('hidden-text');
    btn.style.display = 'none';
};

window.goToSlide = function (index) {
    currentSlide = index;
    updateSlide();
    window.toggleMenu();
};

window.restartGame = function () {
    currentSlide = 0;
    score = 100;
    elapsedSeconds = 0;
    gameStarted = false;
    wordStartTime = 0;
    const scoreDisp = document.getElementById('scoreDisplay');
    if (scoreDisp) scoreDisp.innerText = `Score: ${score}`;
    initFillInBlanks();
    updateSlide();
};

window.checkLetter = function (input) {
    const val = input.value.toUpperCase();
    const correct = input.getAttribute('data-char');

    if (val === correct) {
        input.classList.remove('incorrect');
        input.classList.add('correct');
        input.disabled = true;

        const next = input.nextElementSibling;
        if (next && next.classList.contains('letter-input')) next.focus();

        const container = input.closest('.blank-container');
        if (container) {
            const inputs = Array.from(container.querySelectorAll('.letter-input'));
            if (inputs.every(i => i.disabled)) {
                // Word Completed logic
                const duration = (Date.now() - wordStartTime) / 1000;

                // NO bonus for speed as requested, only penalties
                if (duration > 5) {
                    const extraTime = duration - 5;
                    const penalty = Math.floor(extraTime / 3);
                    score = Math.max(0, score - penalty); // Penalty for slowness
                }

                const scoreDisp = document.getElementById('scoreDisplay');
                if (scoreDisp) scoreDisp.innerText = `Score: ${score}`;

                setTimeout(nextSlide, 800);
            }
        }
    } else if (val !== "") {
        input.classList.add('incorrect');
        score = Math.max(0, score - 1); // Penalty for mistakes
        const scoreDisp = document.getElementById('scoreDisplay');
        if (scoreDisp) scoreDisp.innerText = `Score: ${score}`;
        setTimeout(() => {
            input.value = "";
            input.classList.remove('incorrect');
        }, 500);
    }
};

function initPresentation(userConfig) {
    _currentConfig = userConfig;
    const run = () => {
        const container = document.getElementById('container');
        if (!container) {
            setTimeout(run, 100);
            return;
        }

        // NUEVO: Comprobar sesión antes de mostrar nada
        const savedName = sessionStorage.getItem('studentName');
        const savedClass = sessionStorage.getItem('studentClass');

        if (savedName && savedClass) {
            // Si hay sesión, mostramos la confirmación directamente
            showRoleSelection(true); // true indica que saltamos a la confirmación
        } else {
            showRoleSelection(false);
        }
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
    document.addEventListener('keydown', (e) => {
        if (document.activeElement.tagName === 'INPUT') return;
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
}

function showRoleSelection(hasSession) {
    if (!document.getElementById('roleOverlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'role-overlay';
        overlay.id = 'roleOverlay';
        overlay.innerHTML = `<div class="role-card"></div>`;
        document.body.appendChild(overlay);

        const card = overlay.querySelector('.role-card');

        if (hasSession) {
            const name = sessionStorage.getItem('studentName');
            const className = sessionStorage.getItem('studentClass');
            showNameConfirmation(name, className);
        } else {
            card.innerHTML = `
                <h2>¿Quién está aprendiendo hoy?</h2>
                <div class="role-options">
                    <button class="role-btn" id="teacherBtn" onclick="window.selectRole('teacher')">👨‍🏫 Soy Maestro/a</button>
                    <button class="role-btn" id="studentBtn" onclick="window.selectRole('student')">🎓 Soy Estudiante</button>
                </div>
            `;
        }
    }
}

function renderSlides() {
    const container = document.getElementById('container');
    if (!container) return;
    container.innerHTML = '';

    // Title Slide
    const titleSlide = document.createElement('div');
    titleSlide.className = 'slide title-slide';
    titleSlide.innerHTML = `
        <div class="content" style="flex-direction: column; text-align: center;">
            <h1>Vocabulary</h1>
            <h2>${_currentConfig.title}</h2>
            <div class="start-hint">Presiona → para comenzar</div>
        </div>
    `;
    container.appendChild(titleSlide);

    // Vocabulary Slides
    _currentConfig.vocab.forEach((item) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `
            <div class="content">
                <div class="image-box"><img src="${item.image}" alt="${item.word}"></div>
                <div class="text-box">
                    <h1>${item.word} <button class="speaker-btn" onclick="window.speak('${item.word.replace(/'/g, "\\'")}')">🔊</button></h1>
                    <p>${item.sentence} <button class="sentence-speaker-btn" onclick="window.speak('${item.sentence.replace(/'/g, "\\'")}')">🔊</button></p>
                </div>
            </div>
        `;
        container.appendChild(slide);
    });

    // Guess Intro
    const guessIntro = document.createElement('div');
    guessIntro.className = 'slide';
    guessIntro.innerHTML = `
        <div class="content" style="flex-direction: column; text-align: center;">
            <h1 style="font-size: 5rem;">Guess the Word! 🕵️</h1>
            <p style="font-size: 2.5rem;">¿Puedes nombrar el objeto antes de revelarlo?</p>
        </div>
    `;
    container.appendChild(guessIntro);

    // Guess Slides
    _currentConfig.vocab.forEach((item) => {
        const slide = document.createElement('div');
        slide.className = 'slide game-slide';
        slide.innerHTML = `
            <div class="content">
                <div class="image-box"><img src="${item.image}" alt="${item.word}"></div>
                <div class="text-box hidden-text">
                    <h1>${item.word} <button class="speaker-btn" onclick="window.speak('${item.word.replace(/'/g, "\\'")}')">🔊</button></h1>
                    <p>${item.sentence} <button class="sentence-speaker-btn" onclick="window.speak('${item.sentence.replace(/'/g, "\\'")}')">🔊</button></p>
                    <button class="reveal-btn" onclick="window.revealText(this)">REVELAR</button>
                </div>
            </div>
        `;
        container.appendChild(slide);
    });

    // Fill Intro
    const fillIntro = document.createElement('div');
    fillIntro.className = 'slide';
    fillIntro.innerHTML = `
        <div class="content" style="flex-direction: column; text-align: center;">
            <h1 style="font-size: 5rem;">Fill in the Blanks! ✏️</h1>
            <p style="font-size: 2.5rem;">¡Completa la palabra basada en la imagen!</p>
        </div>
    `;
    container.appendChild(fillIntro);

    const placeholder = document.createElement('div');
    placeholder.id = 'dynamic-game-container';
    container.appendChild(placeholder);

    totalSlides = document.querySelectorAll('.slide').length;
    initFillInBlanks();
}

function initFillInBlanks() {
    const parent = document.getElementById('container');
    const dynamicContainer = document.getElementById('dynamic-game-container');
    if (!parent) return;
    document.querySelectorAll('.slide-dynamic').forEach(s => s.remove());
    const shuffled = [..._currentConfig.vocab].sort(() => Math.random() - 0.5);
    shuffled.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'slide slide-dynamic';
        const blanks = item.word.split('').map(char => {
            if (char === ' ') return '<div style="width: 20px;"></div>';
            return `<input type="text" class="letter-input" maxlength="1" data-char="${char.toUpperCase()}" oninput="window.checkLetter(this)">`;
        }).join('');
        slide.innerHTML = `
            <div class="content">
                <div class="image-box"><img src="${item.image}" alt="${item.word}"></div>
                <div class="text-box">
                    <h1 style="text-align: center; margin-bottom: 2rem; font-size: 3rem;">
                        ¿Qué palabra es? 
                        <button class="speaker-btn" style="display: inline-flex; width: 45px; height: 45px; font-size: 1.2rem; vertical-align: middle;" onclick="window.speak('${item.word.replace(/'/g, "\\'")}')">🔊</button>
                    </h1>
                    <div class="blank-container">${blanks}</div>
                </div>
            </div>
        `;
        parent.insertBefore(slide, dynamicContainer);
    });
    const resSlide = document.createElement('div');
    resSlide.className = 'slide slide-dynamic';
    resSlide.innerHTML = `
        <div class="content" style="justify-content: center;">
            <div class="results-box">
                <h1 style="font-size: 3rem;">¡Bien hecho! 🎉</h1>
                <p style="font-size: 1.2rem; color: var(--text-muted);">Tu puntuación es:</p>
                <div class="results-score" id="finalScoreText">${score}</div>
                <p style="font-size: 1.2rem; color: var(--text-muted);">Tiempo: <span id="finalTimeText" style="color: var(--primary); font-weight: bold;">00:00</span></p>
                <div class="results-buttons">
                    <button class="restart-btn" onclick="window.restartGame()">Intentar de nuevo</button>
                    <button class="restart-btn secondary" onclick="window.goToSlide(0)">Ir al inicio</button>
                    <button class="restart-btn secondary" onclick="window.location.href='../scores.html'">Ver mis puntuaciones</button>
                </div>
            </div>
        </div>
    `;
    parent.insertBefore(resSlide, dynamicContainer);
    totalSlides = document.querySelectorAll('.slide').length;
}

function updateSlide() {
    const container = document.getElementById('container');
    const progress = document.getElementById('progress');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const timerDisplay = document.getElementById('timerDisplay');
    const slides = document.querySelectorAll('.slide');
    if (!container) return;
    container.style.transform = `translateX(-${currentSlide * 100}vw)`;
    if (progress) progress.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;
    const vocabCount = _currentConfig ? _currentConfig.vocab.length : 0;
    const fillIntroIndex = 1 + vocabCount + 1 + vocabCount;
    if (currentSlide > fillIntroIndex && currentSlide < totalSlides - 1) {
        if (scoreDisplay) scoreDisplay.style.display = 'block';
        if (timerDisplay) timerDisplay.style.display = 'block';
        if (!gameStarted) startTimer();
    } else {
        if (scoreDisplay) scoreDisplay.style.display = 'none';
        if (timerDisplay) timerDisplay.style.display = 'none';
    }
    if (currentSlide === totalSlides - 1) {
        stopTimer();
        const scText = document.getElementById('finalScoreText');
        const tmText = document.getElementById('finalTimeText');
        if (scText) scText.innerText = score;
        if (tmText) tmText.innerText = formatTime(elapsedSeconds);
        saveGameResult();
    }
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
            if (slide.classList.contains('slide-dynamic')) {
                wordStartTime = Date.now();
                const firstInput = slide.querySelector('.letter-input');
                if (firstInput) setTimeout(() => firstInput.focus(), 850);
            }
        }
        else slide.classList.remove('active');
    });
}

function saveGameResult() {
    if (currentRole !== 'student' || !studentName) return;
    const result = {
        name: studentName,
        app: _currentConfig.title,
        score: score,
        time: formatTime(elapsedSeconds),
        date: new Date().toLocaleString(),
        class: studentClass
    };
    const scores = JSON.parse(localStorage.getItem('vocabulary_lab_scores') || '[]');
    scores.push(result);
    localStorage.setItem('vocabulary_lab_scores', JSON.stringify(scores));
    if (WEBHOOK_URL) {
        fetch(WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result)
        }).then(() => console.log("Resultado enviado a la nube"))
            .catch(err => console.error("Error enviando a la nube:", err));
    }
}

function nextSlide() { if (currentSlide < totalSlides - 1) { currentSlide++; updateSlide(); } }
function prevSlide() { if (currentSlide > 0) { currentSlide--; updateSlide(); } }
function startTimer() {
    gameStarted = true;
    elapsedSeconds = 0;
    timerInterval = setInterval(() => {
        elapsedSeconds++;
        const td = document.getElementById('timerDisplay');
        if (td) td.innerText = `Tiempo: ${formatTime(elapsedSeconds)}`;
    }, 1000);
}
function stopTimer() { clearInterval(timerInterval); gameStarted = false; }
function formatTime(s) {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
if (typeof config !== 'undefined' && config !== null) {
    initPresentation(config);
}
