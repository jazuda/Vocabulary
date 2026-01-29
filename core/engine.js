let currentSlide = 0;
let totalSlides = 0;
let score = 100;
let elapsedSeconds = 0;
let timerInterval;
let gameStarted = false;
let _currentConfig = null;

function initPresentation(userConfig) {
    console.log("Initializing presentation...");
    _currentConfig = userConfig;

    const run = () => {
        const container = document.getElementById('container');
        if (!container) {
            console.error("Container NOT found! Retrying...");
            setTimeout(run, 100);
            return;
        }
        renderSlides();
        updateSlide();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
}

function renderSlides() {
    const container = document.getElementById('container');
    container.innerHTML = '';

    // 1. Title Slide
    const titleSlide = document.createElement('div');
    titleSlide.className = 'slide title-slide';
    titleSlide.innerHTML = `
        <div class="content" style="flex-direction: column; text-align: center;">
            <h1>Vocabulary</h1>
            <h2>${_currentConfig.title}</h2>
            <div class="start-hint">Press → to start learning</div>
        </div>
    `;
    container.appendChild(titleSlide);

    // 2. Vocabulary Slides
    _currentConfig.vocab.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `
            <div class="content">
                <div class="image-box"><img src="${item.image}" alt="${item.word}"></div>
                <div class="text-box">
                    <h1>${item.word} <button class="speaker-btn" onclick="speak('${item.word.replace(/'/g, "\\'")}')">🔊</button></h1>
                    <p>${item.sentence} <button class="sentence-speaker-btn" onclick="speak('${item.sentence.replace(/'/g, "\\'")}')">🔊</button></p>
                </div>
            </div>
        `;
        container.appendChild(slide);
    });

    // 3. Guess the Word Intro
    const guessIntro = document.createElement('div');
    guessIntro.className = 'slide';
    guessIntro.innerHTML = `
        <div class="content" style="flex-direction: column; text-align: center;">
            <h1 style="font-size: 5rem;">Guess the Word! 🕵️</h1>
            <p style="font-size: 2.5rem;">Can you name the object before you reveal it?</p>
        </div>
    `;
    container.appendChild(guessIntro);

    // 4. Guess the Word Slides
    _currentConfig.vocab.forEach((item) => {
        const slide = document.createElement('div');
        slide.className = 'slide game-slide';
        slide.innerHTML = `
            <div class="content">
                <div class="image-box"><img src="${item.image}" alt="${item.word}"></div>
                <div class="text-box hidden-text">
                    <h1>${item.word} <button class="speaker-btn" onclick="speak('${item.word.replace(/'/g, "\\'")}')">🔊</button></h1>
                    <p>${item.sentence} <button class="sentence-speaker-btn" onclick="speak('${item.sentence.replace(/'/g, "\\'")}')">🔊</button></p>
                    <button class="reveal-btn" onclick="revealText(this)">REVEAL</button>
                </div>
            </div>
        `;
        container.appendChild(slide);
    });

    // 5. Fill in Blanks Intro
    const fillIntro = document.createElement('div');
    fillIntro.className = 'slide';
    fillIntro.innerHTML = `
        <div class="content" style="flex-direction: column; text-align: center;">
            <h1 style="font-size: 5rem;">Fill in the Blanks! ✏️</h1>
            <p style="font-size: 2.5rem;">Complete the word based on the image!</p>
        </div>
    `;
    container.appendChild(fillIntro);

    // Placeholder for Dynamic Fill in Blanks
    const placeholder = document.createElement('div');
    placeholder.id = 'dynamic-game-container';
    container.appendChild(placeholder);

    totalSlides = document.querySelectorAll('.slide').length;
    initFillInBlanks();
}

function initFillInBlanks() {
    const parent = document.getElementById('container');
    const dynamicContainer = document.getElementById('dynamic-game-container');

    // Clear dynamic slides if they exist (for restart)
    document.querySelectorAll('.slide-dynamic').forEach(s => s.remove());

    const shuffled = [..._currentConfig.vocab].sort(() => Math.random() - 0.5);

    shuffled.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'slide slide-dynamic';

        const blanks = item.word.split('').map(char => {
            if (char === ' ') return '<div style="width: 20px;"></div>';
            return `<input type="text" class="letter-input" maxlength="1" data-char="${char.toUpperCase()}" oninput="checkLetter(this)">`;
        }).join('');

        slide.innerHTML = `
            <div class="content">
                <div class="image-box"><img src="${item.image}" alt="${item.word}"></div>
                <div class="text-box">
                    <h1 style="text-align: center; margin-bottom: 2rem; font-size: 3rem;">
                        What word is it? 
                        <button class="speaker-btn" style="display: inline-flex; width: 45px; height: 45px; font-size: 1.2rem; vertical-align: middle;" onclick="speak('${item.word.replace(/'/g, "\\'")}')">🔊</button>
                    </h1>
                    <div class="blank-container">${blanks}</div>
                </div>
            </div>
        `;
        parent.insertBefore(slide, dynamicContainer);
    });

    // 6. Results Slide
    const resSlide = document.createElement('div');
    resSlide.className = 'slide slide-dynamic';
    resSlide.innerHTML = `
        <div class="content" style="justify-content: center;">
            <div class="results-box">
                <h1 style="font-size: 5rem;">Well Done! 🎉</h1>
                <p style="font-size: 2rem;">Your final score is:</p>
                <div class="results-score" id="finalScoreText">${score}</div>
                <p style="font-size: 2rem;">Total time:</p>
                <div class="results-time" id="finalTimeText">00:00</div>
                <button class="restart-btn" onclick="restartGame()">Try Again</button>
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

    if (!container || slides.length === 0) {
        console.warn("Container or slides not found yet.");
        return;
    }

    container.style.transform = `translateX(-${currentSlide * 100}vw)`;
    progress.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;

    // Calculate game start slide (after Fill Intro)
    const fillIntroIndex = 1 + _currentConfig.vocab.length + 1 + _currentConfig.vocab.length; // Title + Vocab + GuessIntro + GuessSlides

    if (currentSlide > fillIntroIndex && currentSlide < totalSlides - 1) {
        scoreDisplay.style.display = 'block';
        timerDisplay.style.display = 'block';
        if (!gameStarted) startTimer();
    } else {
        scoreDisplay.style.display = 'none';
        timerDisplay.style.display = 'none';
    }

    if (currentSlide === totalSlides - 1) {
        stopTimer();
        document.getElementById('finalScoreText').innerText = score;
        document.getElementById('finalTimeText').innerText = formatTime(elapsedSeconds);
    }

    slides.forEach((slide, index) => {
        if (index === currentSlide) slide.classList.add('active');
        else slide.classList.remove('active');
    });
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlide();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlide();
    }
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
    toggleMenu();
}

function toggleMenu() {
    const menu = document.getElementById('menuOverlay');
    menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
}

function speak(text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

function revealText(btn) {
    const textBox = btn.parentElement;
    textBox.classList.remove('hidden-text');
    btn.style.display = 'none';
}

function startTimer() {
    gameStarted = true;
    elapsedSeconds = 0;
    timerInterval = setInterval(() => {
        elapsedSeconds++;
        document.getElementById('timerDisplay').innerText = `Time: ${formatTime(elapsedSeconds)}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    gameStarted = false;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function checkLetter(input) {
    const val = input.value.toUpperCase();
    const correct = input.getAttribute('data-char');

    if (val === correct) {
        input.classList.remove('incorrect');
        input.classList.add('correct');
        input.disabled = true;

        // Auto focus next
        const next = input.nextElementSibling;
        if (next && next.classList.contains('letter-input')) next.focus();

        // Check if word complete
        const container = input.closest('.blank-container');
        const inputs = Array.from(container.querySelectorAll('.letter-input'));
        if (inputs.every(i => i.disabled)) {
            setTimeout(nextSlide, 800);
        }
    } else if (val !== "") {
        input.classList.add('incorrect');
        score = Math.max(0, score - 1);
        document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
        setTimeout(() => {
            input.value = "";
            input.classList.remove('incorrect');
        }, 500);
    }
}


// Auto-init if config exists globally
if (typeof config !== 'undefined' && config !== null) {
    console.log("Auto-initializing with global config...");
    initPresentation(config);
}

