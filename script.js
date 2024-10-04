const userScoreElement = document.getElementById('user-score');
const computerScoreElement = document.getElementById('computer-score');
const resultMessageElement = document.getElementById('result-message');
const resetButton = document.getElementById('reset-btn');
const choices = document.querySelectorAll('.choice');
let userScore = 0;
let computerScore = 0;

// Mapping user choices to their full names
const choiceNames = { 'r': 'Rock', 'p': 'Paper', 's': 'Scissors' };

// Function to get computer's choice randomly
function getComputerChoice() {
    const choices = ['r', 'p', 's'];
    return choices[Math.floor(Math.random() * 3)];
}

// Function to calculate the result and update scores
function game(userChoice) {
    const computerChoice = getComputerChoice();
    const result = userChoice + computerChoice;

    switch (result) {
        case 'rs': // Rock beats Scissors
        case 'pr': // Paper beats Rock
        case 'sp': // Scissors beats Paper
            win(userChoice, computerChoice);
            break;
        case 'rp': // Rock loses to Paper
        case 'ps': // Paper loses to Scissors
        case 'sr': // Scissors lose to Rock
            lose(userChoice, computerChoice);
            break;
        default:
            draw(userChoice, computerChoice);
    }
}

// Function to handle user win
function win(userChoice, computerChoice) {
    userScore++;
    userScoreElement.textContent = userScore;
    resultMessageElement.textContent = `${choiceNames[userChoice]} beats ${choiceNames[computerChoice]}. You win! 🎉`;
    document.getElementById(userChoice).classList.add('win-glow');
    setTimeout(() => document.getElementById(userChoice).classList.remove('win-glow'), 300);
}

// Function to handle user loss
function lose(userChoice, computerChoice) {
    computerScore++;
    computerScoreElement.textContent = computerScore;
    resultMessageElement.textContent = `${choiceNames[computerChoice]} beats ${choiceNames[userChoice]}. You lose! 😞`;
    document.getElementById(userChoice).classList.add('lose-glow');
    setTimeout(() => document.getElementById(userChoice).classList.remove('lose-glow'), 300);
}

// Function to handle draw
function draw(userChoice, computerChoice) {
    resultMessageElement.textContent = `It's a draw! Both chose ${choiceNames[userChoice]}. 😐`;
    document.getElementById(userChoice).classList.add('draw-glow');
    setTimeout(() => document.getElementById(userChoice).classList.remove('draw-glow'), 300);
}

// Reset Game Functionality
resetButton.addEventListener('click', () => {
    userScore = 0;
    computerScore = 0;
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
    resultMessageElement.textContent = "Let's see who wins!";
});

// Add event listeners for each choice
choices.forEach(choice => {
    choice.addEventListener('click', () => game(choice.id));
});
