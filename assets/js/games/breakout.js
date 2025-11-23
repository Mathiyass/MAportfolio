document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('breakoutCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('start-breakout-btn');
    const scoreElement = document.getElementById('breakout-score');
    const highScoreElement = document.getElementById('breakout-highscore');

    let score = 0;
    let highScore = localStorage.getItem('breakoutHighScore') || 0;
    highScoreElement.textContent = highScore;

    let isGameRunning = false;
    let gameInterval;

    // Paddle
    const paddleHeight = 10;
    const paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;

    // Ball
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 3;
    let dy = -3;
    const ballRadius = 6;

    // Bricks
    const brickRowCount = 3;
    const brickColumnCount = 5;
    const brickWidth = 45; // (300 - (10*4)) / 5 = 260/5 = 52... let's adjust padding
    const brickHeight = 15;
    const brickPadding = 10;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 15; // (300 - (5*45 + 4*10))/2 = (300 - 265)/2 = 17.5

    let bricks = [];

    function initBricks() {
        bricks = [];
        for (let c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
    }

    function startGame() {
        if (isGameRunning) return;
        isGameRunning = true;
        startBtn.textContent = "Restart Game";
        score = 0;
        scoreElement.textContent = score;

        // Reset Ball & Paddle
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3 * (Math.random() > 0.5 ? 1 : -1);
        dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;

        initBricks();

        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, 10);
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        collisionDetection();

        // Wall Collision
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                // Ball speed up slightly
                dy = -dy * 1.05;
            } else {
                gameOver();
                return;
            }
        }

        x += dx;
        y += dy;

        // Paddle Movement
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 5;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 5;
        }
    }

    function collisionDetection() {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                let b = bricks[c][r];
                if (b.status == 1) {
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score += 10;
                        scoreElement.textContent = score;
                        if (score == brickRowCount * brickColumnCount * 10) {
                            // Win logic - add more rows?
                            initBricks(); // For now just respawn
                            dy = dy * 1.1; // Make it harder
                        }
                    }
                }
            }
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#FF10F0";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#00FFDE";
        ctx.fill();
        ctx.closePath();
    }

    function drawBricks() {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status == 1) {
                    let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                    let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = `hsl(${c * 60}, 100%, 50%)`;
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    function gameOver() {
        isGameRunning = false;
        clearInterval(gameInterval);
        ctx.font = "24px Orbitron";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('breakoutHighScore', highScore);
            highScoreElement.textContent = highScore;
        }
        startBtn.textContent = "Play Again";
    }

    document.addEventListener("keydown", (e) => {
        if (e.key == "Right" || e.key == "ArrowRight") rightPressed = true;
        else if (e.key == "Left" || e.key == "ArrowLeft") leftPressed = true;
    }, false);

    document.addEventListener("keyup", (e) => {
        if (e.key == "Right" || e.key == "ArrowRight") rightPressed = false;
        else if (e.key == "Left" || e.key == "ArrowLeft") leftPressed = false;
    }, false);

    startBtn.addEventListener('click', startGame);

    // Initial Render
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '16px Orbitron';
    ctx.fillText("Press Start", canvas.width / 2 - 40, canvas.height / 2);
});
