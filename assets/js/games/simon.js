document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('simon-game');
    const startBtn = document.getElementById('start-simon-btn');
    const statusDisplay = document.getElementById('simon-status');

    if (!container) return;

    const colors = ['green', 'red', 'yellow', 'blue'];
    let sequence = [];
    let playerSequence = [];
    let level = 0;
    let isGameActive = false;
    let isPlayerTurn = false;

    // Create Pads
    const pads = {};
    colors.forEach(color => {
        const pad = document.getElementById(`simon-${color}`);
        if (pad) {
            pads[color] = pad;
            pad.addEventListener('click', () => handlePadClick(color));
        }
    });

    function startGame() {
        sequence = [];
        playerSequence = [];
        level = 0;
        isGameActive = true;
        isPlayerTurn = false;
        if (startBtn) startBtn.textContent = "Restart";
        nextLevel();
    }

    function nextLevel() {
        level++;
        playerSequence = [];
        if (statusDisplay) statusDisplay.textContent = `Level ${level}`;

        // Add random color
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        sequence.push(randomColor);

        // Play sequence
        playSequence();
    }

    function playSequence() {
        isPlayerTurn = false;
        let i = 0;
        const interval = setInterval(() => {
            activatePad(sequence[i]);
            i++;
            if (i >= sequence.length) {
                clearInterval(interval);
                isPlayerTurn = true;
            }
        }, 600);
    }

    function activatePad(color) {
        const pad = pads[color];
        if (!pad) return;

        pad.classList.add('active');
        pad.style.opacity = '1';
        pad.style.transform = 'scale(1.1)';

        // Play sound (optional, omitted for simplicity or use Audio context later)

        setTimeout(() => {
            pad.classList.remove('active');
            pad.style.opacity = '0.6';
            pad.style.transform = 'scale(1)';
        }, 300);
    }

    function handlePadClick(color) {
        if (!isGameActive || !isPlayerTurn) return;

        activatePad(color);
        playerSequence.push(color);

        // Check correct
        const index = playerSequence.length - 1;
        if (playerSequence[index] !== sequence[index]) {
            gameOver();
            return;
        }

        if (playerSequence.length === sequence.length) {
            isPlayerTurn = false;
            setTimeout(nextLevel, 1000);
        }
    }

    function gameOver() {
        isGameActive = false;
        if (statusDisplay) statusDisplay.textContent = "Game Over!";
        // Flash all
        colors.forEach(c => {
            pads[c].style.backgroundColor = 'white';
            setTimeout(() => {
                pads[c].style.backgroundColor = ''; // Reset to CSS class color
                // Resetting inline style might remove the color if defined in CSS
                // We should probably toggle a class or rely on the original class
            }, 200);
        });
        if (startBtn) startBtn.textContent = "Try Again";
    }

    if (startBtn) startBtn.addEventListener('click', startGame);
});
