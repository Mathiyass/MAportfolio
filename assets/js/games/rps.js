document.addEventListener('DOMContentLoaded', () => {
    const playerChoiceDisplay = document.getElementById('player-choice');
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const resultDisplay = document.getElementById('rps-result');
    const possibleChoices = document.querySelectorAll('.rps-btn');
    const playerScoreDisplay = document.getElementById('rps-player-score');
    const compScoreDisplay = document.getElementById('rps-comp-score');

    let userChoice;
    let computerChoice;
    let result;
    let playerScore = 0;
    let compScore = 0;

    const choices = ['rock', 'paper', 'scissors'];
    const icons = {
        'rock': '<i class="far fa-hand-rock"></i>',
        'paper': '<i class="far fa-hand-paper"></i>',
        'scissors': '<i class="far fa-hand-scissors"></i>'
    };

    possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
        // Find the button even if clicked on icon
        const btn = e.target.closest('button');
        userChoice = btn.getAttribute('data-choice');

        playerChoiceDisplay.innerHTML = icons[userChoice];
        playerChoiceDisplay.classList.add('animate-bounce');
        setTimeout(() => playerChoiceDisplay.classList.remove('animate-bounce'), 500);

        generateComputerChoice();
        getResult();
    }));

    function generateComputerChoice() {
        const randomNumber = Math.floor(Math.random() * 3);
        computerChoice = choices[randomNumber];
        computerChoiceDisplay.innerHTML = icons[computerChoice];

        computerChoiceDisplay.classList.add('animate-spin');
        setTimeout(() => computerChoiceDisplay.classList.remove('animate-spin'), 500);
    }

    function getResult() {
        if (computerChoice === userChoice) {
            result = 'Draw!';
            resultDisplay.style.color = '#fff';
        }
        else if (userChoice === 'rock' && computerChoice === 'paper') {
            result = 'You Lost!';
            resultDisplay.style.color = '#FF10F0';
            compScore++;
        }
        else if (userChoice === 'rock' && computerChoice === 'scissors') {
            result = 'You Win!';
            resultDisplay.style.color = '#00FFDE';
            playerScore++;
        }
        else if (userChoice === 'paper' && computerChoice === 'scissors') {
            result = 'You Lost!';
            resultDisplay.style.color = '#FF10F0';
            compScore++;
        }
        else if (userChoice === 'paper' && computerChoice === 'rock') {
            result = 'You Win!';
            resultDisplay.style.color = '#00FFDE';
            playerScore++;
        }
        else if (userChoice === 'scissors' && computerChoice === 'rock') {
            result = 'You Lost!';
            resultDisplay.style.color = '#FF10F0';
            compScore++;
        }
        else if (userChoice === 'scissors' && computerChoice === 'paper') {
            result = 'You Win!';
            resultDisplay.style.color = '#00FFDE';
            playerScore++;
        }

        resultDisplay.innerHTML = result;
        playerScoreDisplay.textContent = playerScore;
        compScoreDisplay.textContent = compScore;
    }
});
