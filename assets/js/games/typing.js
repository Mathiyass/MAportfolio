document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('typing-input');
    const wordDisplay = document.getElementById('word-display');
    const timeDisplay = document.getElementById('typing-time');
    const scoreDisplay = document.getElementById('typing-score');
    const wpmDisplay = document.getElementById('typing-wpm');
    const restartBtn = document.getElementById('restart-typing-btn');

    const words = [
        'algorithm', 'function', 'variable', 'javascript', 'browser',
        'server', 'database', 'framework', 'react', 'angular', 'vue',
        'node', 'python', 'java', 'compiler', 'syntax', 'loop', 'array',
        'object', 'class', 'method', 'promise', 'async', 'await', 'bug',
        'debug', 'terminal', 'console', 'request', 'response', 'header',
        'footer', 'style', 'script', 'source', 'code', 'develop', 'test',
        'deploy', 'git', 'merge', 'branch', 'commit', 'push', 'pull'
    ];

    let time = 60;
    let score = 0;
    let isPlaying = false;
    let currentWord;
    let timer;

    function init() {
        showNewWord();
        input.addEventListener('input', startMatch);
        restartBtn.addEventListener('click', resetGame);
    }

    function startMatch() {
        if (matchWords()) {
            isPlaying = true;
            time = 61; // Reset timer conceptually for display
            showNewWord();
            input.value = '';
            score++;
        }

        if (score === -1) {
            scoreDisplay.innerHTML = 0;
        } else {
            scoreDisplay.innerHTML = score;
        }

        if (!timer && isPlaying) {
             timer = setInterval(countdown, 1000);
        }
    }

    function matchWords() {
        if (input.value === currentWord.innerHTML) {
            return true;
        } else {
            return false;
        }
    }

    function showNewWord() {
        const randIndex = Math.floor(Math.random() * words.length);
        currentWord = document.createElement('span'); // Dummy
        wordDisplay.innerHTML = words[randIndex];
        currentWord.innerHTML = words[randIndex];
    }

    function countdown() {
        if (time > 0) {
            time--;
        } else if (time === 0) {
            isPlaying = false;
        }
        timeDisplay.innerHTML = time;

        if (time === 0) {
            clearInterval(timer);
            timer = null;
            wordDisplay.innerHTML = 'Game Over!';
            const wpm = Math.round(score); // Rough estimate
            wpmDisplay.innerHTML = wpm;
        }
    }

    function resetGame() {
        clearInterval(timer);
        timer = null;
        time = 60;
        score = 0;
        isPlaying = false;
        input.value = '';
        timeDisplay.innerHTML = time;
        scoreDisplay.innerHTML = score;
        wpmDisplay.innerHTML = 0;
        showNewWord();
    }

    init();
});
