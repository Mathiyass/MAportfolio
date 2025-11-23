document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('start-pong-btn');
    const scoreElement = document.getElementById('pong-score');
    const highScoreElement = document.getElementById('pong-highscore');

    let score = 0;
    let highScore = localStorage.getItem('pongHighScore') || 0;
    highScoreElement.textContent = highScore;

    let isGameRunning = false;
    let gameInterval;

    // Paddle properties
    const paddleWidth = 10;
    const paddleHeight = 60;
    let playerY = (canvas.height - paddleHeight) / 2;
    let computerY = (canvas.height - paddleHeight) / 2;
    const playerX = 10;
    const computerX = canvas.width - 20;
    let playerSpeed = 0;
    const computerSpeed = 4;

    // Ball properties
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSpeedX = 4;
    let ballSpeedY = 4;
    const ballSize = 8;

    function startGame() {
        if (isGameRunning) return;
        isGameRunning = true;
        startBtn.textContent = "Restart Game";
        score = 0;
        scoreElement.textContent = score;
        resetBall();

        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, 1000 / 60);
    }

    function resetBall() {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
        ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1);
    }

    function gameLoop() {
        // Player Movement
        playerY += playerSpeed;
        if (playerY < 0) playerY = 0;
        if (playerY > canvas.height - paddleHeight) playerY = canvas.height - paddleHeight;

        // Computer AI Movement (Simple tracking)
        if (computerY + paddleHeight / 2 < ballY - 35) {
            computerY += computerSpeed;
        } else if (computerY + paddleHeight / 2 > ballY + 35) {
            computerY -= computerSpeed;
        }

        // Ball Movement
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Wall Collision (Top/Bottom)
        if (ballY < 0 || ballY > canvas.height) {
            ballSpeedY = -ballSpeedY;
        }

        // Paddle Collision
        // Player
        if (ballX < playerX + paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            // Add some English based on where it hits the paddle
            let deltaY = ballY - (playerY + paddleHeight / 2);
            ballSpeedY = deltaY * 0.35;
        }
        // Computer
        if (ballX > computerX && ballY > computerY && ballY < computerY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY - (computerY + paddleHeight / 2);
            ballSpeedY = deltaY * 0.35;
        }

        // Scoring
        if (ballX < 0) {
            // Computer scores, reset ball, player loses life? or just reset score?
            // Let's make it a survival game: score increases on hit, resets on miss.
            gameOver();
        }
        if (ballX > canvas.width) {
            // Player scores
            score++;
            scoreElement.textContent = score;
            resetBall();
        }

        draw();
    }

    function draw() {
        // Background
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Net
        ctx.strokeStyle = '#333';
        ctx.setLineDash([5, 15]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);

        // Paddles
        ctx.fillStyle = '#00FFDE';
        ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);

        ctx.fillStyle = '#FF3366';
        ctx.fillRect(computerX, computerY, paddleWidth, paddleHeight);

        // Ball
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballSize / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    function gameOver() {
        isGameRunning = false;
        clearInterval(gameInterval);
        ctx.fillStyle = 'white';
        ctx.font = '20px Orbitron';
        ctx.fillText("Game Over", canvas.width / 2 - 50, canvas.height / 2);
        startBtn.textContent = "Try Again";

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('pongHighScore', highScore);
            highScoreElement.textContent = highScore;
        }
    }

    document.addEventListener('keydown', (e) => {
        if (!isGameRunning) return;
        if (e.key === 'ArrowUp') playerSpeed = -6;
        if (e.key === 'ArrowDown') playerSpeed = 6;
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') playerSpeed = 0;
    });

    startBtn.addEventListener('click', startGame);

    // Initial Draw
    draw();
    ctx.fillStyle = 'white';
    ctx.font = '16px Orbitron';
    ctx.fillText("Press Start", canvas.width / 2 - 40, canvas.height / 2);
});
