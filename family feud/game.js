// game.js

// Variables to track player scores, rounds, and current answer
let team1Score = 0;
let team2Score = 0;
let roundCount = 0;
const totalRounds = 5; // Define total rounds for the game
let currentAnswer = '';
let currentRoundAnswers = ['Villablanca', 'Awatin', 'Agno', 'Almario']; // Example answers
const resultsList = document.getElementById('answer-list');
const team1ScoreElement = document.getElementById('team1-score');
const team2ScoreElement = document.getElementById('team2-score');

// Function to initialize the game
function startGame() {
    team1Score = 0;
    team2Score = 0;
    roundCount = 0;
    updateScores();
    document.getElementById('countdown-timer').style.display = 'none';
    resultsList.innerHTML = ''; // Clear previous results
    alert("Correct Answer!");
    startRound();
}

// Function to validate answers
function validateAnswer(userAnswer) {
    return currentRoundAnswers.includes(userAnswer);
}

// Function to display correct answers
function displayResults(userAnswer) {
    const resultItem = document.createElement('li');
    if (validateAnswer(userAnswer)) {
        resultItem.textContent = `${userAnswer} - Correct!`;
        resultsList.appendChild(resultItem);
        if (roundCount % 2 === 0) {
            team1Score++;
        } else {
            team2Score++;
        }
        updateScores();
    } else {
        resultItem.textContent = `${userAnswer} - Incorrect!`;
        resultsList.appendChild(resultItem);
        alert("Incorrect answer, try again!");
    }
}

// Function to update scores
function updateScores() {
    team1ScoreElement.innerHTML = team1Score;
    team2ScoreElement.innerHTML = team2Score;
}

// Function to start a round
function startRound() {
    roundCount++;
    currentAnswer = currentRoundAnswers[Math.floor(Math.random() * currentRoundAnswers.length)];
    console.log(`Round ${roundCount}: Current answer is ${currentAnswer}`); // Debugging
    startTimer();
}

// Countdown timer for each round
function startTimer() {
    let timeLeft = 3; // 3 seconds countdown
    const timerDisplay = document.getElementById('timer');
    document.getElementById('countdown-timer').style.display = 'block';
    
    const timerInterval = setInterval(() => {
        timerDisplay.innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById('countdown-timer').style.display = 'none';
            alert("Time's up! Moving to the next round.");
            if (roundCount < totalRounds) {
                startRound();
            } else {
                endGame();
            }
        }
        timeLeft--;
    }, 1000);
}

// Function to end the game
function endGame() {
    alert(`Game Over! Final Scores:\nTeam 1: ${team1Score}\nTeam 2: ${team2Score}`);
    resetGame();
}

// Function to reset the game
function resetGame() {
    team1Score = 0;
    team2Score = 0;
    roundCount = 0;
    updateScores();
    resultsList.innerHTML = '';
}

// Event listeners
document.getElementById('answer-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const userAnswer = document.getElementById('user-answer').value.trim();
    displayResults(userAnswer);
    document.getElementById('user-answer').value = ''; // Clear the input
});

// Start game button
document.querySelector('.btn-custom').addEventListener('click', startGame);
