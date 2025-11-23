document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('minesweeper-grid');
    const startBtn = document.getElementById('start-minesweeper-btn');
    const statusEl = document.getElementById('minesweeper-status');
    const flagsEl = document.getElementById('minesweeper-flags');

    if (!grid) return;

    const width = 10;
    const height = 10; // grid size
    const bombAmount = 15;
    let squares = [];
    let isGameOver = false;
    let flags = 0;

    function createBoard() {
        grid.innerHTML = '';
        squares = [];
        isGameOver = false;
        flags = 0;
        if (flagsEl) flagsEl.textContent = bombAmount - flags;
        if (statusEl) statusEl.textContent = "Avoid the mines!";
        if (startBtn) startBtn.textContent = "Restart Game";

        // Get shuffled game array with random bombs
        const bombsArray = Array(bombAmount).fill('bomb');
        const emptyArray = Array(width * height - bombAmount).fill('valid');
        const gameArray = emptyArray.concat(bombsArray);
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

        for (let i = 0; i < width * height; i++) {
            const square = document.createElement('div');
            square.setAttribute('id', i);
            square.classList.add('w-8', 'h-8', 'bg-dark-card', 'border', 'border-gray-700', 'flex', 'items-center', 'justify-center', 'cursor-pointer', 'text-sm', 'font-bold', 'select-none', 'transition-colors');
            square.dataset.type = shuffledArray[i];
            grid.appendChild(square);
            squares.push(square);

            // Left Click
            square.addEventListener('click', function(e) {
                click(square);
            });

            // Right Click
            square.oncontextmenu = function(e) {
                e.preventDefault();
                addFlag(square);
            }
        }

        // Add numbers
        for (let i = 0; i < squares.length; i++) {
            let total = 0;
            const isLeftEdge = (i % width === 0);
            const isRightEdge = (i % width === width - 1);

            if (squares[i].dataset.type === 'valid') {
                // West
                if (i > 0 && !isLeftEdge && squares[i - 1].dataset.type === 'bomb') total++;
                // North-East
                if (i >= width && !isRightEdge && squares[i + 1 - width].dataset.type === 'bomb') total++;
                // North
                if (i >= width && squares[i - width].dataset.type === 'bomb') total++;
                // North-West
                if (i >= width && !isLeftEdge && squares[i - 1 - width].dataset.type === 'bomb') total++;
                // East
                if (i < (width * height - 1) && !isRightEdge && squares[i + 1].dataset.type === 'bomb') total++;
                // South-West
                if (i < (width * (height - 1)) && !isLeftEdge && squares[i - 1 + width].dataset.type === 'bomb') total++;
                // South-East
                if (i < (width * (height - 1)) && !isRightEdge && squares[i + 1 + width].dataset.type === 'bomb') total++;
                // South
                if (i < (width * (height - 1)) && squares[i + width].dataset.type === 'bomb') total++;

                squares[i].setAttribute('data', total);
            }
        }
    }

    function addFlag(square) {
        if (isGameOver) return;
        if (!square.classList.contains('checked') && (flags < bombAmount || square.classList.contains('flag'))) {
            if (!square.classList.contains('flag')) {
                square.classList.add('flag');
                square.innerHTML = '🚩';
                flags++;
                if (flagsEl) flagsEl.textContent = bombAmount - flags;
                checkForWin();
            } else {
                square.classList.remove('flag');
                square.innerHTML = '';
                flags--;
                if (flagsEl) flagsEl.textContent = bombAmount - flags;
            }
        }
    }

    function click(square) {
        let currentId = square.id;
        if (isGameOver) return;
        if (square.classList.contains('checked') || square.classList.contains('flag')) return;

        if (square.dataset.type === 'bomb') {
            gameOver(square);
        } else {
            let total = square.getAttribute('data');
            if (total != 0) {
                square.classList.add('checked');
                square.classList.add('bg-gray-600');
                square.innerHTML = total;
                // Color coding numbers
                if (total == 1) square.classList.add('text-blue-400');
                if (total == 2) square.classList.add('text-green-400');
                if (total == 3) square.classList.add('text-red-400');
                if (total >= 4) square.classList.add('text-purple-400');
                return;
            }
            checkSquare(square, currentId);
        }
        square.classList.add('checked');
        square.classList.add('bg-gray-600');
    }

    // Recursive check for neighboring squares
    function checkSquare(square, currentId) {
        const isLeftEdge = (currentId % width === 0);
        const isRightEdge = (currentId % width === width - 1);
        const i = parseInt(currentId);

        setTimeout(() => {
            // West
            if (i > 0 && !isLeftEdge) {
                const newId = squares[i - 1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            // North-East
            if (i >= width && !isRightEdge) {
                const newId = squares[i + 1 - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            // North
            if (i >= width) {
                const newId = squares[i - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            // North-West
            if (i >= width && !isLeftEdge) {
                const newId = squares[i - 1 - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            // East
            if (i < (width * height - 1) && !isRightEdge) {
                const newId = squares[i + 1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            // South-West
            if (i < (width * (height - 1)) && !isLeftEdge) {
                const newId = squares[i - 1 + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            // South-East
            if (i < (width * (height - 1)) && !isRightEdge) {
                const newId = squares[i + 1 + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            // South
            if (i < (width * (height - 1))) {
                const newId = squares[i + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
        }, 10);
    }

    function gameOver(square) {
        if(statusEl) statusEl.textContent = 'BOOM! Game Over!';
        isGameOver = true;

        // Show all bombs
        squares.forEach(square => {
            if (square.dataset.type === 'bomb') {
                square.innerHTML = '💣';
                square.classList.remove('bg-dark-card');
                square.classList.add('bg-red-500');
            }
        });
    }

    function checkForWin() {
        let matches = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].classList.contains('flag') && squares[i].dataset.type === 'bomb') {
                matches++;
            }
            if (matches === bombAmount) {
                if(statusEl) statusEl.textContent = 'YOU WIN!';
                isGameOver = true;
            }
        }
    }

    if (startBtn) startBtn.addEventListener('click', createBoard);

    // Initialize if grid is present
    if (grid) createBoard();
});
