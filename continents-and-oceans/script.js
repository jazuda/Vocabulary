const DATA = [
    { name: "Asia", type: "continent", fact: "Asia is the largest continent and home to Mount Everest, the highest peak on Earth.", image: "assets/asia.jpg", x: 78, y: 28 },
    { name: "Africa", type: "continent", fact: "Africa is home to the Sahara, the largest hot desert, and the Nile, the longest river.", image: "assets/africa.webp", x: 55, y: 52 },
    { name: "North America", type: "continent", fact: "North America features diverse climates and landmarks like the Grand Canyon.", image: "assets/north_america.jpg", x: 20, y: 25 },
    { name: "South America", type: "continent", fact: "South America is home to the Amazon rainforest, the world's largest tropical forest.", image: "assets/south_america.jpg", x: 32, y: 60 },
    { name: "Antarctica", type: "continent", fact: "Antarctica is the coldest, driest, and windiest continent, covered mostly by ice.", image: "assets/antarctica.jpg", x: 55, y: 92 },
    { name: "Europe", type: "continent", fact: "Europe is known for its rich history and landmarks like the Eiffel Tower.", image: "assets/europe.jpg", x: 52, y: 22 },
    { name: "Oceania", type: "continent", fact: "Oceania is the smallest continent, consisting of Australia and many island nations.", image: "assets/oceania.jpg", x: 88, y: 72 },
    { name: "Pacific Ocean", type: "ocean", fact: "The Pacific is the largest and deepest ocean, covering more area than all land combined.", image: "assets/hero.png", x: 8, y: 50 },
    { name: "Atlantic Ocean", type: "ocean", fact: "The Atlantic is the second largest ocean and separates the Americas from Europe and Africa.", image: "assets/hero.png", x: 42, y: 45 },
    { name: "Indian Ocean", type: "ocean", fact: "The Indian Ocean is the warmest ocean in the world.", image: "assets/hero.png", x: 70, y: 65 },
    { name: "Southern Ocean", type: "ocean", fact: "The Southern Ocean surrounds Antarctica and has very cold waters.", image: "assets/hero.png", x: 50, y: 85 },
    { name: "Arctic Ocean", type: "ocean", fact: "The Arctic Ocean is the smallest and shallowest of the world's five major oceans.", image: "assets/hero.png", x: 50, y: 5 }
];

const CLASSES = {
    "Mr García": ["Acosta Valeria", "Araujo Valerie", "Bautista Cristian", "Bravo Armijos Meivi", "Campos Osorio Isaias", "Chango-Tasiguano Brithney", "Chasig Cataleya", "Dominguez-Bahena Liam", "Guadarrama Gerardo", "Hernandez Yanderis", "Lopez Caleb", "Matos Rodriguez Fatima", "Peralta-Flores Mia", "Ramirez Suniaga Isabella", "Sanchez Jair", "Sandoval Mariana", "Sotelo Lesly", "Varela Angel", "Vicente Adrian", "Vital Daniel"],
    "Ms Poncelas": ["Beristain Loyo Angel", "Campos Eylin", "Cervantes Casarrubias Sergio", "Diaz Mateo", "Dorantes Lurmarelia", "Escobar Natasha", "Garcia David", "Garcia Sophia", "Guanotuna Sharline", "Landi Denise", "Lutuala Quishpe Erick", "Ortega Mathyas", "Paniagua Edgar", "Pilaguano Choloquinga Sheyla", "Prada Edymar", "Rios Iam", "Salinas Elena", "Valladares Jesus", "Vallecillo Ana", "Veliz Gomez Carlismar"],
    "Mr Zubieta": ["Alvarado Kevin", "Cordova Thiago", "Diaz Zoe", "Fernandez Richard", "Garcia David", "Gomez Salvador Judit", "Jacho Ayala Ashley", "Jacho Vega Kimberly", "Marin Delgado Isaac", "Martinez Garcia Iker", "Mercado Sapon Arianna", "Orozco Mia", "Perez-Larios Milan", "Ramirez Lauren", "Ruiz Contreras Daviana", "Tocte Condor Keylor", "Torres Pedroza Itzayana", "Valentin Mata Bryan", "Villalobos Emmanuel", "Zuniga Soto Wilson"]
};

let currentRole = null;
let studentName = "";
let studentClass = "";
let currentPhase = 1; // 1: Presentation, 2: Map, 3: Practice, 4: Test
let currentWordIndex = 0;
let phaseWords = [];
let totalScore = 0;
let wordScore = 10;
let timer = null;
let timeLeft = 5.0;
let currentAppWord = "";
let currentAppFact = "";

// Supabase Configuration
const SUPABASE_URL = "https://xcpxhrmdjkqcdhhghizn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjcHhocm1kamtxY2RoaGdoaXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzUxMjEsImV4cCI6MjA4ODIxMTEyMX0.YggPQSNoVkZunc_Dh7fIRrDSw4nTrGmVfaPq-7Bb1vY";

// Load Supabase dynamically if not present
if (typeof supabase === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    document.head.appendChild(script);
}

let _supabaseClient = null;
function getSupabase() {
    if (!_supabaseClient && typeof supabase !== 'undefined') {
        _supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    return _supabaseClient;
}

// --- Initialization ---

function selectRole(role) {
    currentRole = role;
    document.getElementById('roleOverlay').classList.remove('active');
    if (role === 'student') showClassSelection();
    else startApp();
}

function showClassSelection() {
    document.getElementById('nameOverlay').classList.add('active');
    const classContainer = document.getElementById('classChoice');
    const nameContainer = document.getElementById('nameChoice');
    const backBtn = document.getElementById('backBtn');
    classContainer.classList.remove('hide');
    nameContainer.classList.add('hide');
    backBtn.classList.add('hide');
    document.getElementById('nameSelectTitle').innerText = "Choose your Class";
    classContainer.innerHTML = Object.keys(CLASSES).map(teacher => `<div class="name-item" onclick="selectClass('${teacher}')">${teacher}</div>`).join('');
}

function selectClass(teacher) {
    studentClass = teacher;
    const classContainer = document.getElementById('classChoice');
    const nameContainer = document.getElementById('nameChoice');
    const backBtn = document.getElementById('backBtn');
    classContainer.classList.add('hide');
    nameContainer.classList.remove('hide');
    backBtn.classList.remove('hide');
    document.getElementById('nameSelectTitle').innerText = `Class: ${teacher}`;
    nameContainer.innerHTML = CLASSES[teacher].map(name => `<div class="name-item" onclick="selectStudent('${name}')">${name}</div>`).join('');
}

function selectStudent(name) {
    studentName = name;
    document.getElementById('nameOverlay').classList.remove('active');
    startApp();
}

function startApp() {
    document.getElementById('gameContainer').classList.remove('hide');
    document.getElementById('navMenu').classList.remove('hide');
    jumpToPhase(1);
}

function jumpToPhase(phase) {
    currentPhase = phase;
    currentWordIndex = 0;
    if (phase === 4) totalScore = 0;
    showPhase();
    updateProgress();
    updateNavUI();
}

// --- Phase Management ---

function showPhase() {
    ['presentationPhase', 'mapPhase', 'gamePhase', 'resultPhase'].forEach(p => document.getElementById(p)?.classList.add('hide'));
    if (currentPhase === 1) {
        document.getElementById('presentationPhase').classList.remove('hide');
        phaseWords = [...DATA];
        loadPresentationWord();
    } else if (currentPhase === 2) {
        document.getElementById('mapPhase').classList.remove('hide');
        initMapGame();
    } else if (currentPhase === 3 || currentPhase === 4) {
        document.getElementById('gamePhase').classList.remove('hide');
        phaseWords = [...DATA].sort(() => Math.random() - 0.5);
        loadGameWord();
    } else {
        showResults();
    }
}

// --- Phase 1: Presentation ---

function loadPresentationWord() {
    const wordObj = phaseWords[currentWordIndex];
    document.getElementById('presTitle').innerText = wordObj.name;
    document.getElementById('presFact').innerText = wordObj.fact;
    document.getElementById('presImage').src = wordObj.image;
    currentAppWord = wordObj.name;
    currentAppFact = wordObj.fact;
    document.getElementById('prevBtn').disabled = currentWordIndex === 0;
    const nextBtn = document.getElementById('nextPhaseBtn');
    nextBtn.innerText = currentWordIndex === phaseWords.length - 1 ? "Start Map Game →" : "Next";
}

function nextWord() {
    if (currentWordIndex < phaseWords.length - 1) {
        currentWordIndex++;
        loadPresentationWord();
    } else jumpToPhase(2);
    updateProgress();
}

function prevWord() {
    if (currentWordIndex > 0) {
        currentWordIndex--;
        loadPresentationWord();
    }
    updateProgress();
}

// --- Phase 2: Map Game ---

function initMapGame() {
    const mapArea = document.getElementById('mapDropZones');
    const bank = document.getElementById('mapNameBank');
    mapArea.innerHTML = '';
    bank.innerHTML = '<h3>Click on a circle to identify the place!</h3>';

    DATA.forEach(item => {
        const zone = document.createElement('div');
        zone.className = 'drop-zone interactive';
        zone.style.left = `${item.x}%`;
        zone.style.top = `${item.y}%`;
        zone.dataset.name = item.name;
        zone.innerHTML = '<div class="marker">?</div>';
        zone.onclick = (e) => showMapDropdown(e, zone);
        mapArea.appendChild(zone);
    });
}

function showMapDropdown(e, zone) {
    if (zone.classList.contains('filled')) return;

    // Remove existing dropdowns
    document.querySelectorAll('.map-dropdown').forEach(d => d.remove());

    const dropdown = document.createElement('div');
    dropdown.className = 'map-dropdown';

    // Get all names and shuffle them for the dropdown
    const names = DATA.map(d => d.name).sort(() => Math.random() - 0.5);

    names.forEach(name => {
        const option = document.createElement('div');
        option.className = 'dropdown-option';
        option.innerText = name;
        option.onclick = (event) => {
            event.stopPropagation();
            if (name === zone.dataset.name) {
                zone.innerText = name;
                zone.classList.add('filled');
                dropdown.remove();
                showFeedback('correct');
                checkMapComplete();
            } else {
                showFeedback('error');
                dropdown.remove();
            }
        };
        dropdown.appendChild(option);
    });

    document.body.appendChild(dropdown);

    // Position dropdown near the click
    dropdown.style.left = `${e.pageX}px`;
    dropdown.style.top = `${e.pageY}px`;

    // Close dropdown on outside click
    setTimeout(() => {
        window.onclick = () => {
            dropdown.remove();
            window.onclick = null;
        };
    }, 100);
}

function checkMapComplete() {
    const zones = Array.from(document.querySelectorAll('.drop-zone'));
    if (zones.every(z => z.classList.contains('filled'))) {
        setTimeout(() => jumpToPhase(3), 1500);
    }
}

// --- Phase 3 & 4: Word Games ---

function loadGameWord() {
    const wordObj = phaseWords[currentWordIndex];
    currentAppWord = wordObj.name;
    currentAppFact = wordObj.fact;
    wordScore = 10;
    document.getElementById('currentPoints').parentElement.classList.toggle('hide', currentPhase === 3);
    document.getElementById('currentPoints').innerText = wordScore;
    document.getElementById('currentWordIndex').innerText = `${currentWordIndex + 1}/${phaseWords.length}`;
    document.getElementById('currentPhaseLabel').innerText = currentPhase === 3 ? "Practice" : "Challenge";
    document.getElementById('gameImage').src = wordObj.image;
    const factHint = document.getElementById('gameFactHint');

    // Obfuscate name in the hint
    let hintText = wordObj.fact;
    const name = wordObj.name;
    const regex = new RegExp(`^(The\\s+)?${name}\\s+is\\s+`, 'i');
    if (regex.test(hintText)) {
        hintText = hintText.replace(regex, "Is ");
    } else {
        const simpleRegex = new RegExp(`(The\\s+)?${name}`, 'gi');
        hintText = hintText.replace(simpleRegex, "...");
    }

    factHint.innerText = hintText;
    currentAppFact = hintText; // Update current fact for audio to match the hint
    if (currentPhase === 3) {
        document.getElementById('phaseInstruction').innerText = "Practice: Fill missing letters";
        createFillBlanks(wordObj.name);
        stopTimer();
        document.getElementById('timerDisplay').classList.add('hide');
    } else {
        document.getElementById('phaseInstruction').innerText = "Challenge: Type full name";
        createWritingInput(wordObj.name);
        document.getElementById('timerDisplay').classList.remove('hide');
        startWordTimer();
    }
}

function createFillBlanks(word) {
    const container = document.getElementById('wordContainer');
    container.innerHTML = '';
    word.split('').forEach((char, idx) => {
        if (char === ' ') { container.appendChild(document.createElement('div')).style.width = '20px'; return; }
        const slot = document.createElement('div'); slot.className = 'letter-slot';
        if ((idx % 2 === 1) || (idx === word.length - 1)) {
            const inp = document.createElement('input'); inp.className = 'letter-input'; inp.maxLength = 1;
            inp.dataset.expected = char.toUpperCase(); inp.oninput = (e) => handleLetterInput(e.target);
            slot.appendChild(inp); slot.classList.add('active');
        } else { slot.innerText = char; slot.classList.add('correct'); }
        container.appendChild(slot);
    });
    setTimeout(() => container.querySelector('input')?.focus(), 500);
}

function createWritingInput(word) {
    const container = document.getElementById('wordContainer');
    container.innerHTML = '';
    word.split('').forEach(char => {
        if (char === ' ') { container.appendChild(document.createElement('div')).style.width = '20px'; return; }
        const slot = document.createElement('div'); slot.className = 'letter-slot active';
        const inp = document.createElement('input'); inp.className = 'letter-input'; inp.maxLength = 1;
        inp.dataset.expected = char.toUpperCase(); inp.oninput = (e) => handleLetterInput(e.target);
        slot.appendChild(inp); container.appendChild(slot);
    });
    setTimeout(() => container.querySelector('input')?.focus(), 500);
}

function handleLetterInput(input) {
    const val = input.value.toUpperCase();
    if (val === '') return;
    if (val === input.dataset.expected) {
        input.disabled = true; input.parentElement.classList.replace('active', 'correct');
        const next = Array.from(document.querySelectorAll('.letter-input')).find(i => !i.disabled);
        if (next) next.focus(); else checkWordComplete();
    } else {
        input.value = ''; triggerError(input.parentElement);
    }
}

function triggerError(element) {
    element.classList.add('incorrect');
    if (currentPhase === 4) { wordScore = Math.max(0, wordScore - 1); document.getElementById('currentPoints').innerText = wordScore; }
    showFeedback('error');
    setTimeout(() => element.classList.remove('incorrect'), 400);
    if (currentPhase === 4) checkZeroScore();
}

function checkWordComplete() {
    const inputs = Array.from(document.querySelectorAll('.letter-input'));
    if (inputs.every(inp => inp.disabled)) {
        stopTimer();
        if (currentPhase === 4) totalScore += wordScore;
        showFeedback('correct');
        setTimeout(() => {
            if (currentWordIndex < phaseWords.length - 1) { currentWordIndex++; loadGameWord(); }
            else jumpToPhase(currentPhase + 1);
        }, 1000);
    }
}

function startWordTimer() {
    stopTimer(); timeLeft = 5.0; updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft -= 0.1;
        if (timeLeft <= 0) { timeLeft = 0; stopTimer(); wordScore = Math.max(0, wordScore - 1); document.getElementById('currentPoints').innerText = wordScore; checkZeroScore(); }
        updateTimerDisplay();
    }, 100);
}

function stopTimer() { if (timer) clearInterval(timer); }
function updateTimerDisplay() { document.getElementById('timerDisplay').innerText = timeLeft.toFixed(1) + 's'; }

function checkZeroScore() {
    if (wordScore <= 0) { stopTimer(); revealSolution(); setTimeout(() => { if (currentWordIndex < phaseWords.length - 1) { currentWordIndex++; loadGameWord(); } else jumpToPhase(currentPhase + 1); }, 3000); }
}

function revealSolution() {
    document.querySelectorAll('.letter-input').forEach(i => { i.value = i.dataset.expected; i.disabled = true; i.parentElement.className = 'letter-slot correct'; });
    document.getElementById('phaseInstruction').innerText = "Answer: " + currentAppWord;
}

function updateProgress() {
    let base = (currentPhase - 1) * 25;
    let step = (currentWordIndex / DATA.length) * 25;
    document.getElementById('progressBar').style.width = (base + step) + '%';
}

function showFeedback(type) {
    const overlay = document.getElementById('feedbackOverlay');
    overlay.className = `feedback-overlay active-${type}`;
    setTimeout(() => overlay.className = 'feedback-overlay', 300);
}

function updateNavUI() { document.querySelectorAll('.nav-btn').forEach((btn, idx) => btn.classList.toggle('active', (idx + 1) === currentPhase)); }

function showResults() {
    document.getElementById('resultPhase').classList.remove('hide');
    document.getElementById('totalScore').innerText = totalScore;
    document.getElementById('resStudentName').innerText = studentName || 'Guest';
    document.getElementById('resClassName').innerText = studentClass || 'None';
    if (studentName) saveScore();
}

function saveScore() {
    const result = {
        name: studentName,
        class: studentClass,
        app: "Continents & Oceans",
        score: totalScore,
        date: new Date().toLocaleString()
    };

    // Save to LocalStorage
    const scores = JSON.parse(localStorage.getItem('vocabulary_lab_scores') || '[]');
    scores.push(result);
    localStorage.setItem('vocabulary_lab_scores', JSON.stringify(scores));

    // Save to Cloud (Supabase)
    const client = getSupabase();
    if (client) {
        client.from('scores').insert([{
            name: studentName,
            class: studentClass,
            app: "Continents & Oceans",
            score: totalScore,
            time: "N/A" // This app uses points but not a global game timer
        }]).then(({ error }) => {
            if (error) console.error("Error al guardar en Supabase:", error);
            else console.log("Resultado guardado en la nube con éxito");
        });
    } else {
        // Retry in 1 second if library not yet loaded
        setTimeout(saveScore, 1000);
    }
}

function restartApp() { totalScore = 0; jumpToPhase(1); }

function playCurrentWord() {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(currentAppWord);
    u.lang = 'en-US'; u.rate = 0.9;
    window.speechSynthesis.speak(u);
}

function playCurrentFact() {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(currentAppFact);
    u.lang = 'en-US'; u.rate = 0.9;
    window.speechSynthesis.speak(u);
}
