document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('flappyCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('start-flappy-btn');
    const scoreElement = document.getElementById('flappy-score');
    const highScoreElement = document.getElementById('flappy-highscore');

    let score = 0;
    let highScore = localStorage.getItem('flappyHighScore') || 0;
    highScoreElement.textContent = highScore;

    let isGameRunning = false;
    let gameInterval;
    let frame = 0;

    const gravity = 0.25;
    const jump = -4.5;

    const drone = {
        x: 50,
        y: 150,
        width: 20,
        height: 20,
        velocity: 0,
        draw() {
            ctx.fillStyle = '#00FFDE';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            // Eye
            ctx.fillStyle = '#000';
            ctx.fillRect(this.x + 12, this.y + 4, 4, 4);
        },
        update() {
            this.velocity += gravity;
            this.y += this.velocity;

            // Floor collision
            if (this.y + this.height > canvas.height) {
                this.y = canvas.height - this.height;
                this.velocity = 0;
                gameOver();
            }
            // Ceiling collision
            if (this.y < 0) {
                this.y = 0;
                this.velocity = 0;
            }
        },
        flap() {
            this.velocity = jump;
        }
    };

    const obstacles = {
        items: [],
        gap: 120,
        frequency: 100, // frames
        speed: 2,
        update() {
            if (frame % this.frequency === 0) {
                const minHeight = 50;
                const maxHeight = canvas.height - this.gap - minHeight;
                const height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);

                this.items.push({
                    x: canvas.width,
                    y: 0,
                    width: 30,
                    height: height,
                    passed: false
                });

                this.items.push({
                    x: canvas.width,
                    y: height + this.gap,
                    width: 30,
                    height: canvas.height - height - this.gap,
                    passed: false
                });
            }

            for (let i = 0; i < this.items.length; i++) {
                let obs = this.items[i];
                obs.x -= this.speed;

                // Collision Detection
                if (
                    drone.x < obs.x + obs.width &&
                    drone.x + drone.width > obs.x &&
                    drone.y < obs.y + obs.height &&
                    drone.y + drone.height > obs.y
                ) {
                    gameOver();
                }

                // Remove off-screen
                if (obs.x + obs.width < 0) {
                    this.items.shift();
                    i--;
                    continue;
                }

                // Score
                // Check if it's the top pipe (even index usually, but let's check pipe pair logic)
                // Actually simpler: check if pipe passed the bird
                if (obs.x + obs.width < drone.x && !obs.passed) {
                    // Only count once per pair
                    // Since we push 2 pipes (top and bottom) with same X,
                    // we will trigger this twice. So add 0.5 or just track pairs.
                    // Let's just track pairs.
                    // Or score += 0.5
                    score += 0.5;
                    scoreElement.textContent = Math.floor(score);
                    obs.passed = true;
                }
            }
        },
        draw() {
            ctx.fillStyle = '#FF3366';
            for (let obs of this.items) {
                ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
            }
        },
        reset() {
            this.items = [];
        }
    };

    function startGame() {
        if (isGameRunning) return;
        isGameRunning = true;
        startBtn.textContent = "Restart Game";
        score = 0;
        scoreElement.textContent = score;
        frame = 0;

        drone.y = 150;
        drone.velocity = 0;
        obstacles.reset();

        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, 20);
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        obstacles.update();
        obstacles.draw();

        drone.update();
        drone.draw();

        frame++;
    }

    function gameOver() {
        isGameRunning = false;
        clearInterval(gameInterval);
        ctx.fillStyle = 'white';
        ctx.font = '24px Orbitron';
        ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);
        startBtn.textContent = "Play Again";

        let finalScore = Math.floor(score);
        if (finalScore > highScore) {
            highScore = finalScore;
            localStorage.setItem('flappyHighScore', highScore);
            highScoreElement.textContent = highScore;
        }
    }

    document.addEventListener('keydown', (e) => {
        if ((e.code === 'Space' || e.key === ' ') && isGameRunning) {
            drone.flap();
            e.preventDefault();
        }
    });

    canvas.addEventListener('click', (e) => {
        if (isGameRunning) {
            drone.flap();
        }
    });

    startBtn.addEventListener('click', startGame);

    // Initial Render
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '16px Orbitron';
    ctx.fillText("Press Start", canvas.width / 2 - 50, canvas.height / 2);
});
