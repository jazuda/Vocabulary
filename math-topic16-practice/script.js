let currentSlide = 0;
let totalSlides = 0;
let studentName = "";
let studentClass = "";
let userRole = null;
let answeredQuestions = new Set();

const CLASSES = {
    "Mr Zubieta": ["Alvarado Kevin", "Cordova Thiago", "Diaz Zoe", "Fernandez Richard", "Garcia David", "Gomez Salvador Judit", "Jacho Ayala Ashley", "Jacho Vega Kimberly", "Marin Delgado Isaac", "Martinez Garcia Iker", "Mercado Sapon Arianna", "Orozco Mia", "Perez-Larios Milan", "Ramirez Lauren", "Ruiz Contreras Daviana", "Tocte Condor Keylor", "Torres Pedroza Itzayana", "Valentin Mata Bryan", "Villalobos Emmanuel", "Zuniga Soto Wilson"],
    "Ms Poncelas": ["Beristain Loyo Angel", "Campos Eylin", "Cervantes Casarrubias Sergio", "Diaz Mateo", "Dorantes Lurmarelia", "Escobar Natasha", "Garcia David", "Garcia Sophia", "Guanotuna Sharline", "Landi Denise", "Lutuala Quishpe Erick", "Ortega Mathyas", "Paniagua Edgar", "Pilaguano Choloquinga Sheyla", "Prada Edymar", "Rios Iam", "Salinas Elena", "Valladares Jesus", "Vallecillo Ana", "Veliz Gomez Carlismar"],
    "Mr García": ["Acosta Valeria", "Araujo Valerie", "Bautista Cristian", "Bravo Armijos Meivi", "Campos Osorio Isaias", "Chango-Tasiguano Brithney", "Chasig Cataleya", "Dominguez-Bahena Liam", "Guadarrama Gerardo", "Hernandez Yanderis", "Lopez Caleb", "Matos Rodriguez Fatima", "Peralta-Flores Mia", "Ramirez Suniaga Isabella", "Sanchez Jair", "Sandoval Mariana", "Sotelo Lesly", "Varela Angel", "Vicente Adrian", "Vital Daniel"]
};

function initApp() {
    renderRoleSelection();
}

function renderRoleSelection() {
    document.getElementById('topNav').style.display = 'none';
    const container = document.getElementById('container');
    container.innerHTML = `
        <div class="slide active">
            <div class="content role-selection" style="flex-direction: column; text-align: center; max-width: 500px;">
                <h1 style="margin-bottom: 2rem;">¿Quién eres?</h1>
                <div style="display: flex; gap: 1rem; justify-content: center; width: 100%;">
                    <button class="nav-btn primary" style="flex: 1; height: 100px; flex-direction: column;" onclick="selectRole('teacher')">
                        <span style="font-size: 2rem; margin-bottom: 0.5rem;">👨‍🏫</span>
                        Maestro/a
                    </button>
                    <button class="nav-btn primary" style="flex: 1; height: 100px; flex-direction: column;" onclick="selectRole('student')">
                        <span style="font-size: 2rem; margin-bottom: 0.5rem;">🎓</span>
                        Estudiante
                    </button>
                </div>
            </div>
        </div>
    `;
}

window.selectRole = function (role) {
    userRole = role;
    if (role === 'teacher') {
        startAssessment();
    } else {
        renderClassSelection();
    }
};

function renderClassSelection() {
    const container = document.getElementById('container');
    container.innerHTML = `
        <div class="slide active">
            <div class="content" style="flex-direction: column; text-align: center; max-width: 500px;">
                <h1 style="margin-bottom: 2rem;">¿De qué clase eres?</h1>
                <div style="display: grid; grid-template-columns: 1fr; gap: 0.75rem; width: 100%;">
                    ${Object.keys(CLASSES).map(cls => `<button class="nav-btn" style="width: 100%; justify-content: center; padding: 0.75rem;" onclick="selectClass('${cls}')">${cls}</button>`).join('')}
                </div>
            </div>
        </div>
    `;
}

window.selectClass = function (cls) {
    studentClass = cls;
    renderNameSelection();
};

function renderNameSelection() {
    const container = document.getElementById('container');
    container.innerHTML = `
        <div class="slide active">
            <div class="content" style="flex-direction: column; text-align: center; max-width: 600px;">
                <h1 style="margin-bottom: 1.5rem;">Elige tu nombre</h1>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-top: 1rem; max-height: 400px; overflow-y: auto; padding: 0.5rem; width: 100%;">
                    ${CLASSES[studentClass].map(name => `<button class="nav-btn" style="width: 100%; justify-content: center; font-size: 0.85rem;" onclick="selectName('${name}')">${name}</button>`).join('')}
                </div>
                <button class="nav-btn" style="margin-top: 1.5rem; border: none; color: var(--text-muted);" onclick="renderClassSelection()">← Volver</button>
            </div>
        </div>
    `;
}

window.selectName = function (name) {
    studentName = name;
    startAssessment();
};

function renderTopNav() {
    const nav = document.getElementById('topNav');
    nav.style.display = 'flex';
    nav.innerHTML = MATH_CONFIG.activities.map((_, i) => `
        <div class="nav-box" id="nav-box-${i + 1}" onclick="goToSlide(${i + 1})">${i + 1}</div>
    `).join('');
}

function startAssessment() {
    renderTopNav();
    const container = document.getElementById('container');
    container.innerHTML = '';

    // Title Slide
    const titleSlide = document.createElement('div');
    titleSlide.className = 'slide';
    titleSlide.innerHTML = `
        <div class="content" style="flex-direction: column; text-align: center;">
            <p>Práctica para Estudiante: ${studentName || 'Maestro'}</p>
            <h1>${MATH_CONFIG.title}</h1>
            <p style="margin-top: 2rem;">Esta práctica tiene 16 actividades para repasar el Tema 16.</p>
            <div class="input-area">
                <button class="nav-btn primary" style="width: auto; height: auto; padding: 1rem 3rem; border-radius: 2rem;" onclick="nextSlide()">Comenzar →</button>
            </div>
        </div>
    `;
    container.appendChild(titleSlide);

    // Activity Slides
    MATH_CONFIG.activities.forEach((act, idx) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.id = `slide-act-${act.id}`;

        let activityContent = '';
        if (act.type === 'text-fill') {
            activityContent = act.items.map((item, i) => `
                <div class="input-item">
                    <p>${item.text.replace('__________', `<input type="text" class="math-input" style="width: 150px; display: inline-block; margin: 0 10px;" oninput="checkIfAnswered(${act.id})">`)}</p>
                </div>
            `).join('');
        } else if (act.type === 'math-grid') {
            activityContent = act.items.map((item, i) => `
                <div class="input-item" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                    <p style="min-width: 120px;">${item.text}</p>
                    <input type="text" class="math-input" style="width: 80px;" oninput="checkIfAnswered(${act.id})">
                </div>
            `).join('');
        } else if (act.type === 'shapes-fill') {
            activityContent = act.shapes.map((shape, i) => `
                <div style="margin-bottom: 2rem;">
                    <p style="font-weight: 600; margin-bottom: 1rem;">${shape.type === 'square' ? 'Cuadrado' : 'Rectángulo'}:</p>
                    <div style="display: flex; gap: 2rem; align-items: center;">
                        <div style="position: relative; width: ${shape.type === 'square' ? '120px' : '160px'}; height: ${shape.type === 'square' ? '120px' : '80px'}; border: 2px solid var(--primary); background: rgba(35, 131, 226, 0.05); border-radius: 4px;">
                            <!-- Top side -->
                            <div style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); font-size: 0.8rem;">${shape.label || shape.labelW}</div>
                            <!-- Bottom side -->
                            <div style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%);"><input type="text" class="math-input" style="width: 50px; text-align: center; padding: 2px;" placeholder="?" oninput="checkIfAnswered(${act.id})"></div>
                            <!-- Left side -->
                            <div style="position: absolute; left: -60px; top: 50%; transform: translateY(-50%); font-size: 0.8rem;">${shape.labelH || shape.label || shape.side + ' in'}</div>
                            <!-- Right side -->
                            <div style="position: absolute; right: -60px; top: 50%; transform: translateY(-50%);"><input type="text" class="math-input" style="width: 50px; text-align: center; padding: 2px;" placeholder="?" oninput="checkIfAnswered(${act.id})"></div>
                        </div>
                    </div>
                </div>
            `).join('');
        } else if (act.type === 'perimeter-calc' || act.type === 'missing-side') {
            const label = act.type === 'perimeter-calc' ? 'Perímetro =' : 'X =';
            activityContent = `
                <div class="input-area">
                    <p>${label} <input type="text" class="math-input" style="width: 100px; display: inline-block;" oninput="checkIfAnswered(${act.id})"> ${act.unit || ''}</p>
                </div>
            `;
        } else if (act.type === 'multiple-choice') {
            activityContent = act.options.map((opt, i) => `
                <button class="math-input choice-btn" style="text-align: left; margin-bottom: 0.5rem;" onclick="selectChoice(this, ${act.id})">${opt.text}</button>
            `).join('');
        } else if (act.type === 'multiple-choice-multi') {
            activityContent = act.options.map((opt, i) => `
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                    <input type="checkbox" class="math-checkbox" style="width: 20px; height: 20px;" onchange="checkIfAnswered(${act.id})">
                    <p>${opt.text}</p>
                </div>
            `).join('');
        } else if (act.type === 'drawing-grid') {
            activityContent = `
                <p>${act.instructions || 'Dibuja en la cuadrícula.'}</p>
                <div class="grid-container" style="display: grid; grid-template-columns: repeat(10, 25px); gap: 1px; margin-top: 0.5rem; background: var(--border); padding: 1px; border: 1px solid var(--border-dark); width: fit-content;">
                    ${Array(100).fill(0).map((_, i) => `<div class="grid-cell" style="width: 25px; height: 25px; background: white; cursor: pointer;" onclick="toggleGridCell(this, ${act.id})"></div>`).join('')}
                </div>
                <div class="input-area" style="margin-top: 1rem;">
                    <p>Perímetro de tu figura: <input type="text" class="math-input" style="width: 80px;" oninput="checkIfAnswered(${act.id})"></p>
                </div>
            `;
        } else if (act.type === 'multipart') {
            activityContent = act.parts.map(part => `
                <div style="margin-bottom: 1rem; padding: 0.75rem; background: var(--sidebar-bg); border-radius: 4px;">
                    <p style="font-weight: 600; margin-bottom: 0.5rem; font-size: 0.9rem;">${part.text}</p>
                    ${part.type === 'text-fill' ? part.items.map(it => `<div style="display:inline-block; margin-right: 0.75rem;">${it.text} <input type="text" class="math-input" style="width: 60px;" oninput="checkIfAnswered(${act.id})"></div>`).join('') : `<textarea class="math-input" style="height: 60px; resize: none;" oninput="checkIfAnswered(${act.id})"></textarea>`}
                </div>
            `).join('');
        }

        const svgContent = renderSVG(act);
        const hasContent = !!(act.image || svgContent);

        slide.innerHTML = `
            <div class="content ${!hasContent ? 'no-image' : ''}">
                ${hasContent ? `
                <div class="image-box">
                    ${act.image ? `<img src="${act.image}" alt="Actividad ${act.id}">` : svgContent}
                </div>` : ''}
                <div class="text-box">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <span class="level-badge">Nivel ${act.level}</span>
                        <span style="color: var(--text-muted); font-size: 0.75rem;">Actividad ${act.id}/16</span>
                    </div>
                    <h1>${act.question}</h1>
                    <div class="input-area">
                        ${activityContent}
                    </div>
                </div>
            </div>
        `;
        container.appendChild(slide);
    });

    // Final Slide
    const finalSlide = document.createElement('div');
    finalSlide.className = 'slide';
    finalSlide.id = 'finalSlide';
    finalSlide.innerHTML = `
        <div class="content" style="flex-direction: column; text-align: center;">
            <h1>¡Práctica Finalizada! 🎉</h1>
            <p>Buen trabajo, ${studentName || 'Maestro'}. Haz clic en enviar para ver tus resultados.</p>
            <div id="validationOutput"></div>
            <div class="input-area" style="margin-top: 2rem;">
                <button class="submit-btn" onclick="submitAssessment()">Enviar Práctica</button>
            </div>
        </div>
    `;
    container.appendChild(finalSlide);

    totalSlides = document.querySelectorAll('.slide').length;
    updateSlide();
}

window.goToSlide = function (n) {
    currentSlide = n;
    updateSlide();
};

window.nextSlide = function () {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlide();
    }
};

window.prevSlide = function () {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlide();
    }
};

function updateSlide() {
    const container = document.getElementById('container');
    const progress = document.getElementById('progress');
    container.style.transform = `translateX(-${currentSlide * 100}vw)`;
    if (progress) progress.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;

    document.querySelectorAll('.slide').forEach((s, i) => {
        if (i === currentSlide) s.classList.add('active');
        else s.classList.remove('active');
    });

    // Update nav boxes
    document.querySelectorAll('.nav-box').forEach((box, i) => {
        if (i + 1 === currentSlide) box.classList.add('active');
        else box.classList.remove('active');
    });
}

window.selectChoice = function (btn, actId) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('primary'));
    btn.classList.add('primary');
    checkIfAnswered(actId);
};

window.toggleGridCell = function (cell, actId) {
    cell.classList.toggle('active');
    checkIfAnswered(actId);
};

window.checkIfAnswered = function (actId) {
    const slide = document.getElementById(`slide-act-${actId}`);
    if (!slide) return;

    let isAnswered = false;
    const inputs = slide.querySelectorAll('input[type="text"], textarea');
    const checkboxes = slide.querySelectorAll('input[type="checkbox"]');
    const choiceBtns = slide.querySelectorAll('.choice-btn.primary');
    const activeGridCells = slide.querySelectorAll('.grid-cell.active');

    if (inputs.length > 0) {
        isAnswered = Array.from(inputs).every(inp => inp.value.trim() !== "");
    } else if (checkboxes.length > 0) {
        isAnswered = Array.from(checkboxes).some(cb => cb.checked);
    } else if (choiceBtns.length > 0) {
        isAnswered = true;
    } else if (activeGridCells.length > 0) {
        const pInput = slide.querySelector('input[type="text"]');
        isAnswered = activeGridCells.length > 0 && (pInput ? pInput.value.trim() !== "" : true);
    }

    const navBox = document.getElementById(`nav-box-${actId}`);
    if (isAnswered) {
        navBox.classList.add('answered');
        answeredQuestions.add(actId);
    } else {
        navBox.classList.remove('answered');
        answeredQuestions.delete(actId);
    }
};

window.submitAssessment = function (force = false) {
    const missing = [];
    MATH_CONFIG.activities.forEach(act => {
        if (!answeredQuestions.has(act.id)) {
            missing.push(act.id);
        }
    });

    const output = document.getElementById('validationOutput');
    if (missing.length > 0 && !force) {
        output.innerHTML = `
            <div class="validation-msg">
                ⚠️ Te faltan preguntas por contestar: <strong>${missing.join(', ')}</strong>.
                ¿Deseas enviar la práctica de todas formas?
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1rem;">
                <button class="submit-btn" style="background: var(--text-muted);" onclick="submitAssessment(true)">Enviar igualmente</button>
            </div>
        `;
    } else {
        output.innerHTML = `
            <div class="validation-msg" style="color: var(--notion-green); background: rgba(46, 204, 113, 0.05); border-color: var(--notion-green);">
                ✅ ¡Práctica enviada con éxito! ${missing.length > 0 ? `<br><small style="color:var(--text-muted)">Se envió con ${missing.length} preguntas sin contestar.</small>` : ''}
            </div>
            <button class="nav-btn" style="margin-top: 1rem; width: 100%; justify-content: center;" onclick="location.reload()">Terminar sesión</button>
        `;
        document.querySelector('.submit-btn').style.display = 'none';
    }
};

function renderSVG(act) {
    const fillOpacity = 0.1;
    const strokeWidth = 2;

    if (act.id === 1) {
        return `
            <svg width="250" height="150" viewBox="0 0 300 200">
                <rect x="50" y="40" width="200" height="100" fill="rgba(35, 131, 226, ${fillOpacity})" stroke="var(--primary)" stroke-width="${strokeWidth}" />
            </svg>
        `;
    }
    if (act.id === 2) {
        return `
            <svg width="250" height="150" viewBox="0 0 300 200">
                <text x="50" y="60" fill="var(--primary)" font-size="40" font-weight="bold" opacity="0.2">12 + 18</text>
                <text x="150" y="120" fill="var(--secondary)" font-size="40" font-weight="bold" opacity="0.2">8 + 12</text>
                <text x="100" y="170" fill="var(--accent)" font-size="30" font-weight="bold" opacity="0.2">P = ?</text>
            </svg>
        `;
    }
    if (act.id === 5) { // Adjusted for P=20
        return `
            <svg width="250" height="180" viewBox="0 0 250 180">
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.05)" stroke-width="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <path d="M40,40 h120 v80 h-120 z" fill="rgba(46, 204, 113, 0.1)" stroke="#2ecc71" stroke-width="2" />
                <text x="40" y="160" fill="var(--text-muted)" font-size="10">Escala: — = 1 pie</text>
            </svg>
        `;
    }
    if (act.id === 10) { // Trapezoid for P=40, sides 10,12,10, X=8
        return `
            <svg width="250" height="150" viewBox="0 0 300 200">
                <polygon points="50,150 250,150 200,50 100,50" fill="rgba(35, 131, 226, ${fillOpacity})" stroke="var(--primary)" stroke-width="${strokeWidth}" />
                <text x="150" y="175" fill="var(--text)" text-anchor="middle" font-size="16">12 yd</text>
                <text x="150" y="40" fill="var(--text)" text-anchor="middle" font-size="16">X</text>
                <text x="60" y="100" fill="var(--text)" text-anchor="end" font-size="16">10 yd</text>
                <text x="240" y="100" fill="var(--text)" font-size="16">10 yd</text>
            </svg>
        `;
    }
    if (act.id === 11) { // Triangle for P=20, sides 8,8, X=4
        return `
            <svg width="250" height="150" viewBox="0 0 300 200">
                <polygon points="150,50 50,150 250,150" fill="rgba(35, 131, 226, ${fillOpacity})" stroke="var(--primary)" stroke-width="${strokeWidth}" />
                <text x="150" y="170" fill="var(--text)" text-anchor="middle" font-size="14">X</text>
                <text x="80" y="100" fill="var(--text)" text-anchor="end" font-size="14">8 ft</text>
                <text x="220" y="100" fill="var(--text)" font-size="14">8 ft</text>
            </svg>
        `;
    }
    if (act.id === 4) {
        return `
            <svg width="250" height="180" viewBox="0 0 300 200">
                <rect x="50" y="50" width="200" height="100" fill="#e8f5e9" stroke="#4caf50" stroke-width="1" />
                <rect x="45" y="45" width="210" height="110" fill="none" stroke="#795548" stroke-width="3" stroke-dasharray="8 4" />
                <rect x="100" y="70" width="100" height="60" fill="#bbdefb" stroke="#1976d2" stroke-width="2" />
                <polygon points="100,70 200,70 150,40" fill="#ffcdd2" stroke="#e53935" stroke-width="2" />
                <text x="150" y="170" fill="var(--text-muted)" font-size="10" text-anchor="middle">(Representación simplificada)</text>
            </svg>
        `;
    }
    if (act.id === 8) { // Equilateral Triangle side 5
        return `
            <svg width="250" height="150" viewBox="0 0 300 200">
                <polygon points="150,50 50,150 250,150" fill="rgba(35, 131, 226, ${fillOpacity})" stroke="var(--primary)" stroke-width="${strokeWidth}" />
                <text x="150" y="170" fill="var(--text)" text-anchor="middle" font-size="14">5 yd</text>
            </svg>
        `;
    }
    if (act.id === 9) { // Rectangle 5x7
        return `
            <svg width="250" height="150" viewBox="0 0 300 200">
                <rect x="50" y="50" width="200" height="100" fill="rgba(35, 131, 226, ${fillOpacity})" stroke="var(--primary)" stroke-width="${strokeWidth}" />
                <text x="150" y="40" fill="var(--text)" text-anchor="middle" font-size="16">7 m</text>
                <text x="40" y="105" fill="var(--text)" text-anchor="end" font-size="16">5 m</text>
            </svg>
        `;
    }
    if (act.id === 12) { // 6x6 vs 4x8
        return `
            <svg width="280" height="180" viewBox="0 0 350 200">
                <rect x="30" y="40" width="80" height="80" fill="rgba(35, 131, 226, ${fillOpacity})" stroke="var(--primary)" stroke-width="${strokeWidth}" />
                <text x="70" y="32" fill="var(--text)" font-size="12" text-anchor="middle">6 ft</text>
                <text x="22" y="85" fill="var(--text)" font-size="12" text-anchor="end">6 ft</text>
                
                <rect x="180" y="25" width="40" height="110" fill="rgba(35, 131, 226, ${fillOpacity})" stroke="var(--primary)" stroke-width="${strokeWidth}" />
                <text x="200" y="18" fill="var(--text)" font-size="12" text-anchor="middle">4 ft</text>
                <text x="172" y="85" fill="var(--text)" font-size="12" text-anchor="end">8 ft</text>
            </svg>
        `;
    }
    if (act.id === 13) { // 10x2, 5x3, 6x2
        return `
            <svg width="350" height="220" viewBox="0 0 400 250">
                <g transform="translate(20, 40)">
                    <rect x="0" y="0" width="140" height="15" fill="rgba(0,0,0,0.05)" stroke="#333" stroke-width="1.5" />
                    <text x="70" y="45" fill="var(--text)" font-size="24" text-anchor="middle" font-weight="bold">A</text>
                    <text x="70" y="-10" fill="var(--text)" font-size="14" text-anchor="middle">10 units</text>
                    <text x="-10" y="12" fill="var(--text)" font-size="14" text-anchor="end">2</text>
                </g>
                <g transform="translate(200, 40)">
                    <rect x="0" y="0" width="60" height="45" fill="rgba(0,0,0,0.05)" stroke="#333" stroke-width="1.5" />
                    <text x="30" y="75" fill="var(--text)" font-size="24" text-anchor="middle" font-weight="bold">B</text>
                    <text x="30" y="-10" fill="var(--text)" font-size="14" text-anchor="middle">5 units</text>
                    <text x="-10" y="28" fill="var(--text)" font-size="14" text-anchor="end">3</text>
                </g>
                <g transform="translate(300, 40)">
                    <rect x="0" y="0" width="80" height="30" fill="rgba(0,0,0,0.05)" stroke="#333" stroke-width="1.5" />
                    <text x="40" y="65" fill="var(--text)" font-size="24" text-anchor="middle" font-weight="bold">C</text>
                    <text x="40" y="-10" fill="var(--text)" font-size="14" text-anchor="middle">6 units</text>
                    <text x="-10" y="22" fill="var(--text)" font-size="14" text-anchor="end">2</text>
                </g>
            </svg>
        `;
    }
    if (act.id === 15) { // 10x10 vs 20x5
        return `
            <svg width="280" height="150" viewBox="0 0 350 150">
                <rect x="30" y="40" width="60" height="60" fill="rgba(35, 131, 226, ${fillOpacity})" stroke="var(--primary)" stroke-width="${strokeWidth}" />
                <text x="60" y="30" fill="var(--text)" font-size="12" text-anchor="middle">10 in</text>
                <text x="22" y="75" fill="var(--text)" font-size="12" text-anchor="end">10 in</text>
                <rect x="180" y="55" width="120" height="30" fill="rgba(35, 131, 226, ${fillOpacity})" stroke="var(--primary)" stroke-width="${strokeWidth}" />
                <text x="240" y="45" fill="var(--text)" font-size="12" text-anchor="middle">20 in</text>
                <text x="170" y="75" fill="var(--text)" font-size="12" text-anchor="end">5 in</text>
            </svg>
        `;
    }
    if (act.id === 6) { // [6, 10, 7, 7, 15]
        return `
            <svg width="250" height="200" viewBox="0 0 300 240">
                <polygon points="50,180 250,180 220,50 120,30 50,100" fill="rgba(35, 131, 226, ${fillOpacity})" stroke="var(--primary)" stroke-width="${strokeWidth}" />
                <text x="150" y="200" fill="var(--text)" font-size="12" text-anchor="middle">15 ft</text>
                <text x="30" y="140" fill="var(--text)" font-size="12">6 ft</text>
                <text x="80" y="60" fill="var(--text)" font-size="12">10 ft</text>
                <text x="180" y="40" fill="var(--text)" font-size="12">7 ft</text>
                <text x="250" y="120" fill="var(--text)" font-size="12">7 ft</text>
            </svg>
        `;
    }
    if (act.id === 16) { // Rug 6x4
        return `
            <svg width="250" height="150" viewBox="0 0 300 200">
                <rect x="50" y="60" width="200" height="80" fill="rgba(35, 131, 226, ${fillOpacity})" stroke="var(--primary)" stroke-width="${strokeWidth}" rx="4" />
                <text x="150" y="50" fill="var(--text)" text-anchor="middle" font-size="14">6 feet</text>
                <text x="35" y="105" fill="var(--text)" text-anchor="end" font-size="14">4 feet</text>
            </svg>
        `;
    }
    return "";
}

document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

document.addEventListener('DOMContentLoaded', initApp);
