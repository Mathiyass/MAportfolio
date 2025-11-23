document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('sudoku-grid');
    const newGameBtn = document.getElementById('new-sudoku-btn');
    const checkBtn = document.getElementById('check-sudoku-btn');
    const difficultySelect = document.getElementById('sudoku-difficulty');
    const statusEl = document.getElementById('sudoku-status');

    if (!grid) return;

    let solution = [];
    let board = [];
    let initialBoard = [];

    // Simple Sudoku Generator
    function generateSudoku() {
        // Start with empty
        const empty = Array(9).fill().map(() => Array(9).fill(0));

        // Fill diagonal 3x3 boxes (independent)
        fillDiagonal(empty);

        // Solve completely to get solution
        solveSudoku(empty);
        solution = JSON.parse(JSON.stringify(empty));

        // Remove digits
        const difficulty = difficultySelect ? difficultySelect.value : 'easy';
        let attempts = difficulty === 'easy' ? 30 : (difficulty === 'medium' ? 40 : 50);

        board = JSON.parse(JSON.stringify(solution));
        while (attempts > 0) {
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);
            while(board[row][col] === 0) {
                row = Math.floor(Math.random() * 9);
                col = Math.floor(Math.random() * 9);
            }
            board[row][col] = 0;
            attempts--;
        }
        initialBoard = JSON.parse(JSON.stringify(board));
        renderBoard();
    }

    function fillDiagonal(grid) {
        for (let i = 0; i < 9; i = i + 3) {
            fillBox(grid, i, i);
        }
    }

    function fillBox(grid, row, col) {
        let num;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                do {
                    num = Math.floor(Math.random() * 9) + 1;
                } while (!isSafeInBox(grid, row, col, num));
                grid[row + i][col + j] = num;
            }
        }
    }

    function isSafeInBox(grid, rowStart, colStart, num) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[rowStart + i][colStart + j] === num) return false;
            }
        }
        return true;
    }

    function isSafe(grid, row, col, num) {
        for (let x = 0; x < 9; x++) if (grid[row][x] === num) return false;
        for (let x = 0; x < 9; x++) if (grid[x][col] === num) return false;
        const startRow = row - row % 3, startCol = col - col % 3;
        for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (grid[i + startRow][j + startCol] === num) return false;
        return true;
    }

    function solveSudoku(grid) {
        let row = -1, col = -1, isEmpty = true;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] === 0) {
                    row = i;
                    col = j;
                    isEmpty = false;
                    break;
                }
            }
            if (!isEmpty) break;
        }
        if (isEmpty) return true;

        for (let num = 1; num <= 9; num++) {
            if (isSafe(grid, row, col, num)) {
                grid[row][col] = num;
                if (solveSudoku(grid)) return true;
                grid[row][col] = 0;
            }
        }
        return false;
    }

    function renderBoard() {
        grid.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.min = 1;
                input.max = 9;
                input.classList.add('w-8', 'h-8', 'text-center', 'text-black', 'font-bold', 'outline-none', 'focus:bg-blue-100');

                // Styling borders for 3x3 grids
                if (j === 2 || j === 5) input.classList.add('border-r-2', 'border-r-gray-800');
                if (i === 2 || i === 5) input.classList.add('border-b-2', 'border-b-gray-800');
                // Regular borders
                input.classList.add('border', 'border-gray-300');

                if (initialBoard[i][j] !== 0) {
                    input.value = initialBoard[i][j];
                    input.disabled = true;
                    input.classList.add('bg-gray-300', 'text-gray-800');
                } else {
                    input.value = '';
                    input.classList.add('bg-white');
                    input.dataset.row = i;
                    input.dataset.col = j;
                    input.addEventListener('input', (e) => {
                        // Limit to single digit
                        if (e.target.value.length > 1) e.target.value = e.target.value.slice(0, 1);
                    });
                }
                grid.appendChild(input);
            }
        }
        if (statusEl) statusEl.textContent = "";
    }

    function checkSolution() {
        const inputs = grid.querySelectorAll('input');
        let correct = true;
        let filled = true;

        inputs.forEach(input => {
            if (!input.disabled) {
                const r = parseInt(input.dataset.row);
                const c = parseInt(input.dataset.col);
                const val = parseInt(input.value);

                if (isNaN(val)) {
                    filled = false;
                } else if (val !== solution[r][c]) {
                    correct = false;
                    input.classList.add('bg-red-200');
                } else {
                    input.classList.remove('bg-red-200');
                    input.classList.add('bg-green-200');
                }
            }
        });

        if (!filled) {
            if (statusEl) statusEl.textContent = "Fill all cells!";
        } else if (correct) {
            if (statusEl) statusEl.textContent = "Correct! Well done.";
        } else {
            if (statusEl) statusEl.textContent = "Some mistakes...";
        }
    }

    if (newGameBtn) newGameBtn.addEventListener('click', generateSudoku);
    if (checkBtn) checkBtn.addEventListener('click', checkSolution);

    generateSudoku();
});
