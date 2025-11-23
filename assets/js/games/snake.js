document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('start-snake-btn');
    const scoreElement = document.getElementById('snake-score');
    const highScoreElement = document.getElementById('snake-highscore');

    const gridSize = 15; // Size of one grid square
    const tileCount = canvas.width / gridSize;

    let score = 0;
    let highScore = localStorage.getItem('snakeHighScore') || 0;
    highScoreElement.textContent = highScore;

    let xVelocity = 0;
    let yVelocity = 0;
    let playerX = 10;
    let playerY = 10;
    let appleX = 15;
    let appleY = 15;

    let trail = [];
    let tail = 5;

    let gameInterval;
    let isGameRunning = false;

    function startGame() {
        if (isGameRunning) return;
        isGameRunning = true;
        startBtn.textContent = "Restart Game";

        // Reset state
        playerX = 10;
        playerY = 10;
        trail = [];
        tail = 5;
        score = 0;
        scoreElement.textContent = score;
        xVelocity = 1; // Start moving right
        yVelocity = 0;

        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, 1000 / 10); // 10 FPS
    }

    function gameLoop() {
        playerX += xVelocity;
        playerY += yVelocity;

        // Wrap around logic
        if (playerX < 0) playerX = tileCount - 1;
        if (playerX > tileCount - 1) playerX = 0;
        if (playerY < 0) playerY = tileCount - 1;
        if (playerY > tileCount - 1) playerY = 0;

        // Background
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Snake
        ctx.fillStyle = '#00FFDE';
        for (let i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);

            // Collision with tail
            if (trail[i].x === playerX && trail[i].y === playerY) {
                gameOver();
            }
        }

        trail.push({ x: playerX, y: playerY });
        while (trail.length > tail) {
            trail.shift();
        }

        // Apple
        ctx.fillStyle = '#FF3366';
        ctx.fillRect(appleX * gridSize, appleY * gridSize, gridSize - 2, gridSize - 2);

        // Eat Apple
        if (appleX === playerX && appleY === playerY) {
            tail++;
            score += 10;
            scoreElement.textContent = score;

            // Increase speed slightly or just keep it constant for simplicity?
            // For now constant speed.

            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);
        }
    }

    function gameOver() {
        isGameRunning = false;
        clearInterval(gameInterval);
        ctx.fillStyle = 'white';
        ctx.font = '20px Orbitron';
        ctx.fillText("Game Over", canvas.width / 4, canvas.height / 2);
        startBtn.textContent = "Play Again";

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('snakeHighScore', highScore);
            highScoreElement.textContent = highScore;
        }
    }

    function keyPush(evt) {
        if (!isGameRunning && (evt.keyCode >= 37 && evt.keyCode <= 40)) {
             // Optional: start game on arrow key?
        }

        switch (evt.keyCode) {
            case 37: // Left
                if (xVelocity === 1) return; // Can't go back
                xVelocity = -1;
                yVelocity = 0;
                evt.preventDefault();
                break;
            case 38: // Up
                if (yVelocity === 1) return;
                xVelocity = 0;
                yVelocity = -1;
                evt.preventDefault();
                break;
            case 39: // Right
                if (xVelocity === -1) return;
                xVelocity = 1;
                yVelocity = 0;
                evt.preventDefault();
                break;
            case 40: // Down
                if (yVelocity === -1) return;
                xVelocity = 0;
                yVelocity = 1;
                evt.preventDefault();
                break;
        }
    }

    document.addEventListener('keydown', keyPush);
    startBtn.addEventListener('click', startGame);

    // Initial Render
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '16px Orbitron';
    ctx.fillText("Press Start", canvas.width / 3, canvas.height / 2);
});
