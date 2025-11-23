document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-2048');
    const scoreDisplay = document.getElementById('score-2048');
    const restartBtn = document.getElementById('restart-2048-btn');
    const width = 4;
    let squares = [];
    let score = 0;

    function createBoard() {
        gridContainer.innerHTML = '';
        squares = [];
        for (let i = 0; i < width * width; i++) {
            let square = document.createElement('div');
            square.className = 'w-full h-full bg-opacity-20 bg-gray-500 rounded flex justify-center items-center text-xl font-bold font-orbitron text-white';
            square.innerHTML = 0;
            gridContainer.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
        updateView();
    }

    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2;
            squares[randomNumber].setAttribute('data-val', 2);
        } else {
            generate();
        }
    }

    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + (width * 2)].innerHTML;
            let totalFour = squares[i + (width * 3)].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (width * 2)].innerHTML = newColumn[2];
            squares[i + (width * 3)].innerHTML = newColumn[3];
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + (width * 2)].innerHTML;
            let totalFour = squares[i + (width * 3)].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (width * 2)].innerHTML = newColumn[2];
            squares[i + (width * 3)].innerHTML = newColumn[3];
        }
    }

    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML && squares[i].innerHTML != 0 && (i + 1) % 4 !== 0) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML && squares[i].innerHTML != 0) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    function control(e) {
        if (e.keyCode === 39) { // Right
            e.preventDefault();
            moveRight();
            combineRow();
            moveRight();
            generate();
        } else if (e.keyCode === 37) { // Left
            e.preventDefault();
            moveLeft();
            combineRow();
            moveLeft();
            generate();
        } else if (e.keyCode === 38) { // Up
            e.preventDefault();
            moveUp();
            combineColumn();
            moveUp();
            generate();
        } else if (e.keyCode === 40) { // Down
            e.preventDefault();
            moveDown();
            combineColumn();
            moveDown();
            generate();
        }
        updateView();
    }

    function updateView() {
        for (let i = 0; i < squares.length; i++) {
            let val = parseInt(squares[i].innerHTML);
            squares[i].className = 'w-full h-full rounded flex justify-center items-center text-xl font-bold font-orbitron transition-all duration-200';

            if (val === 0) {
                squares[i].classList.add('bg-gray-800', 'bg-opacity-50', 'text-transparent');
                squares[i].innerHTML = '';
            } else {
                squares[i].innerHTML = val;
                squares[i].classList.add('text-white');
                if (val <= 4) squares[i].classList.add('bg-blue-900');
                else if (val <= 16) squares[i].classList.add('bg-blue-700');
                else if (val <= 64) squares[i].classList.add('bg-purple-700');
                else if (val <= 256) squares[i].classList.add('bg-pink-600');
                else if (val <= 1024) squares[i].classList.add('bg-red-600');
                else squares[i].classList.add('bg-yellow-500');
            }
        }
    }

    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                scoreDisplay.innerHTML = 'You Win!';
                document.removeEventListener('keyup', control);
            }
        }
    }

    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            scoreDisplay.innerHTML = 'Game Over';
            document.removeEventListener('keyup', control);
        }
    }

    restartBtn.addEventListener('click', () => {
        score = 0;
        scoreDisplay.innerHTML = 0;
        createBoard();
        document.addEventListener('keyup', control);
    });

    createBoard();
    document.addEventListener('keyup', control);
});
