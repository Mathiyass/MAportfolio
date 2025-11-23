import { GameEngine } from '../core/GameEngine.js';

export class TetrisGame extends GameEngine {
    constructor(canvasId) {
        super(canvasId, { frameRate: 60 });

        this.blockSize = 30;
        this.boardWidth = 10;
        this.boardHeight = 20;

        this.colors = [
            null,
            '#FF0D72', // T - Magenta
            '#0DC2FF', // O - Cyan
            '#0DFF72', // S - Green
            '#F538FF', // Z - Purple
            '#FF8E0D', // L - Orange
            '#FFE138', // J - Yellow
            '#3877FF', // I - Blue
        ];

        this.arena = this.createMatrix(this.boardWidth, this.boardHeight);

        this.player = {
            pos: {x: 0, y: 0},
            matrix: null,
            score: 0,
        };

        this.dropCounter = 0;
        this.dropInterval = 1000;
        this.lastTime = 0;

        this.bindControls();
    }

    createMatrix(w, h) {
        const matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(0));
        }
        return matrix;
    }

    createPiece(type) {
        if (type === 'I') {
            return [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ];
        } else if (type === 'L') {
            return [
                [0, 2, 0],
                [0, 2, 0],
                [0, 2, 2],
            ];
        } else if (type === 'J') {
            return [
                [0, 3, 0],
                [0, 3, 0],
                [3, 3, 0],
            ];
        } else if (type === 'O') {
            return [
                [4, 4],
                [4, 4],
            ];
        } else if (type === 'Z') {
            return [
                [5, 5, 0],
                [0, 5, 5],
                [0, 0, 0],
            ];
        } else if (type === 'S') {
            return [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0],
            ];
        } else if (type === 'T') {
            return [
                [0, 7, 0],
                [7, 7, 7],
                [0, 0, 0],
            ];
        }
    }

    drawMatrix(matrix, offset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.ctx.fillStyle = this.colors[value];

                    // Add neon glow
                    this.ctx.shadowBlur = 10;
                    this.ctx.shadowColor = this.colors[value];

                    this.ctx.fillRect(
                        (x + offset.x) * this.blockSize,
                        (y + offset.y) * this.blockSize,
                        this.blockSize - 1,
                        this.blockSize - 1
                    );

                    this.ctx.shadowBlur = 0; // Reset
                }
            });
        });
    }

    merge(arena, player) {
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    arena[y + player.pos.y][x + player.pos.x] = value;
                }
            });
        });
    }

    rotate(matrix, dir) {
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
            }
        }
        if (dir > 0) {
            matrix.forEach(row => row.reverse());
        } else {
            matrix.reverse();
        }
    }

    playerDrop() {
        this.player.pos.y++;
        if (this.collide(this.arena, this.player)) {
            this.player.pos.y--;
            this.merge(this.arena, this.player);
            this.playerReset();
            this.arenaSweep();
            this.addScore(10); // Points for placing a piece
        }
        this.dropCounter = 0;
    }

    playerMove(offset) {
        this.player.pos.x += offset;
        if (this.collide(this.arena, this.player)) {
            this.player.pos.x -= offset;
        }
    }

    playerReset() {
        const pieces = 'ILJOTSZ';
        this.player.matrix = this.createPiece(pieces[pieces.length * Math.random() | 0]);
        this.player.pos.y = 0;
        this.player.pos.x = (this.arena[0].length / 2 | 0) - (this.player.matrix[0].length / 2 | 0);

        if (this.collide(this.arena, this.player)) {
            this.arena.forEach(row => row.fill(0));
            this.onGameOver();
        }
    }

    playerRotate(dir) {
        const pos = this.player.pos.x;
        let offset = 1;
        this.rotate(this.player.matrix, dir);
        while (this.collide(this.arena, this.player)) {
            this.player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.player.matrix[0].length) {
                this.rotate(this.player.matrix, -dir);
                this.player.pos.x = pos;
                return;
            }
        }
    }

    collide(arena, player) {
        const m = player.matrix;
        const o = player.pos;
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 &&
                   (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    arenaSweep() {
        let rowCount = 1;
        outer: for (let y = this.arena.length -1; y > 0; --y) {
            for (let x = 0; x < this.arena[y].length; ++x) {
                if (this.arena[y][x] === 0) {
                    continue outer;
                }
            }

            const row = this.arena.splice(y, 1)[0].fill(0);
            this.arena.unshift(row);
            ++y;

            this.addScore(rowCount * 100);
            rowCount *= 2;
        }
    }

    update(deltaTime) {
        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            this.playerDrop();
        }
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Calculate offset to center the board
        const offsetX = Math.floor((this.canvas.width / this.blockSize - this.boardWidth) / 2);
        const offsetY = Math.floor((this.canvas.height / this.blockSize - this.boardHeight) / 2);

        this.drawMatrix(this.arena, {x: offsetX, y: offsetY});
        this.drawMatrix(this.player.matrix, {x: this.player.pos.x + offsetX, y: this.player.pos.y + offsetY});
    }

    onStart() {
        this.playerReset();
        this.arena.forEach(row => row.fill(0));
        super.onStart();
    }

    bindControls() {
        document.addEventListener('keydown', event => {
            if (!this.isRunning || this.isPaused) return;

            if (event.keyCode === 37) { // Left
                this.playerMove(-1);
            } else if (event.keyCode === 39) { // Right
                this.playerMove(1);
            } else if (event.keyCode === 40) { // Down
                this.playerDrop();
            } else if (event.keyCode === 81) { // Q
                this.playerRotate(-1);
            } else if (event.keyCode === 87 || event.keyCode === 38) { // W or Up
                this.playerRotate(1);
            }
        });
    }
}
