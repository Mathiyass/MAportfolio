document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('memory-board');
    const movesElement = document.getElementById('memory-moves');
    const timeElement = document.getElementById('memory-time');
    const resetBtn = document.getElementById('start-memory-btn');
    const statusElement = document.getElementById('memory-status');

    // If elements don't exist (e.g., not on games page), exit
    if (!board) return;

    const icons = [
        'fa-robot', 'fa-microchip', 'fa-rocket', 'fa-code',
        'fa-database', 'fa-gamepad', 'fa-network-wired', 'fa-satellite'
    ];

    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let time = 0;
    let timerInterval;
    let isGameActive = false;

    function initGame() {
        // Duplicate icons to create pairs
        let gameIcons = [...icons, ...icons];
        // Shuffle icons
        gameIcons.sort(() => Math.random() - 0.5);

        board.innerHTML = '';
        cards = [];
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        time = 0;
        isGameActive = true;

        movesElement.textContent = moves;
        timeElement.textContent = '00:00';
        statusElement.textContent = 'Find matching pairs';
        statusElement.classList.remove('text-green-400');

        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);

        gameIcons.forEach((icon, index) => {
            const card = document.createElement('div');
            card.classList.add('memory-card', 'glass', 'cursor-pointer');
            card.dataset.icon = icon;
            card.dataset.index = index;

            const cardInner = document.createElement('div');
            cardInner.classList.add('memory-card-inner');

            const cardFront = document.createElement('div');
            cardFront.classList.add('memory-card-front');
            cardFront.innerHTML = '<i class="fas fa-question text-gray-600 text-2xl"></i>';

            const cardBack = document.createElement('div');
            cardBack.classList.add('memory-card-back');
            cardBack.innerHTML = `<i class="fas ${icon} text-cyber-cyan text-2xl"></i>`;

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);

            card.addEventListener('click', flipCard);
            board.appendChild(card);
            cards.push(card);
        });
    }

    function flipCard() {
        if (!isGameActive) return;
        if (flippedCards.length >= 2) return;
        if (this.classList.contains('flipped')) return;
        if (this.classList.contains('matched')) return;

        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            movesElement.textContent = moves;
            checkForMatch();
        }
    }

    function checkForMatch() {
        const card1 = flippedCards[0];
        const card2 = flippedCards[1];

        const icon1 = card1.dataset.icon;
        const icon2 = card2.dataset.icon;

        if (icon1 === icon2) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            // Add glow effect to matched cards
            card1.querySelector('.memory-card-back').classList.add('shadow-[0_0_15px_#00FFDE]');
            card2.querySelector('.memory-card-back').classList.add('shadow-[0_0_15px_#00FFDE]');

            matchedPairs++;
            flippedCards = [];

            if (matchedPairs === icons.length) {
                gameWon();
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }

    function updateTimer() {
        time++;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function gameWon() {
        clearInterval(timerInterval);
        isGameActive = false;
        statusElement.textContent = 'System Hack Complete!';
        statusElement.classList.add('text-green-400', 'font-bold', 'animate-pulse');

        // Save high score if implemented
        // ...
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', initGame);
    }

    // Initialize on load
    initGame();
});
