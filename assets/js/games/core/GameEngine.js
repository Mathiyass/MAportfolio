/**
 * GameEngine.js
 * Core class for handling game loops, state, score, and common utilities.
 */

export class GameEngine {
    constructor(canvasId, gameConfig = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`Canvas element with id '${canvasId}' not found.`);
            return;
        }
        this.ctx = this.canvas.getContext('2d');

        // Configuration
        this.config = {
            width: gameConfig.width || 800,
            height: gameConfig.height || 600,
            frameRate: gameConfig.frameRate || 60,
            ...gameConfig
        };

        // State
        this.isRunning = false;
        this.isPaused = false;
        this.score = 0;
        this.highScore = 0;
        this.gameLoopId = null;
        this.lastTime = 0;

        // Resize canvas
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Load high score
        this.loadHighScore();
    }

    resizeCanvas() {
        // Maintain aspect ratio or fill parent?
        // For now, let's fit parent container
        const parent = this.canvas.parentElement;
        if (parent) {
            this.canvas.width = parent.clientWidth;
            this.canvas.height = parent.clientHeight;
        } else {
            this.canvas.width = this.config.width;
            this.canvas.height = this.config.height;
        }
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.isPaused = false;
        this.score = 0;
        this.lastTime = performance.now();
        this.gameLoopId = requestAnimationFrame((t) => this.loop(t));
        this.onStart();
    }

    stop() {
        this.isRunning = false;
        cancelAnimationFrame(this.gameLoopId);
        this.onStop();
    }

    pause() {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.onPause();
        } else {
            this.onResume();
        }
    }

    loop(timestamp) {
        if (!this.isRunning) return;

        const deltaTime = timestamp - this.lastTime;

        if (!this.isPaused) {
            if (deltaTime >= 1000 / this.config.frameRate) {
                this.update(deltaTime);
                this.draw();
                this.lastTime = timestamp;
            }
        }

        this.gameLoopId = requestAnimationFrame((t) => this.loop(t));
    }

    // Methods to be overridden by specific games
    update(deltaTime) {}
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    onStart() { console.log("Game Started"); }
    onStop() { console.log("Game Stopped"); }
    onPause() { console.log("Game Paused"); }
    onResume() { console.log("Game Resumed"); }
    onGameOver() {
        this.saveHighScore();
        this.stop();
        // Trigger UI event
        const event = new CustomEvent('game-over', { detail: { score: this.score } });
        this.canvas.dispatchEvent(event);
    }

    // Score Management
    addScore(points) {
        this.score += points;
        const scoreEl = document.getElementById('current-score');
        if (scoreEl) scoreEl.textContent = this.score;

        if (this.score > this.highScore) {
            this.highScore = this.score;
            const highScoreEl = document.getElementById('high-score');
            if (highScoreEl) highScoreEl.textContent = this.highScore;
        }
    }

    saveHighScore() {
        const key = `highscore_${this.constructor.name}`;
        localStorage.setItem(key, this.highScore);
    }

    loadHighScore() {
        const key = `highscore_${this.constructor.name}`;
        this.highScore = parseInt(localStorage.getItem(key)) || 0;
        const highScoreEl = document.getElementById('high-score');
        if (highScoreEl) highScoreEl.textContent = this.highScore;
    }

    // Input Utilities
    handleInput(key) {
        // To be implemented by subclasses
    }
}
