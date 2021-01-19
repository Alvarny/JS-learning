'use strict';

/*
// Set text
document.querySelector('.message').textContent = 'Correct Number!';

// Set number
document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
*/

// Create random number
let number = Math.trunc(Math.random() * (20));
document.querySelector('.number').textContent = number;

// Create scores
let score = 20;
let highScore = 0

// Is game finished?
let gameEnded = false;



////////////// AGAIN BUTTON
document.querySelector('.again').addEventListener('click', function () {

    gameEnded = false;

    // Reset score
    score = 20;
    number = Math.trunc(Math.random() * (20));

    document.querySelector('.message').textContent = 'Start guessing...';

    // Reset styles
    document.querySelector('.number').textContent = '?';
    document.querySelector('.number').textContent = number;
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('body').style.backgroundColor = '#222';

});

////////////// CHECK BUTTON
// Add event listener to button
document.querySelector('.check').addEventListener('click', function () {

    if (!gameEnded) {

        // Retrieve value
        const guess = Number(document.querySelector('.guess').value);

        // Convert to number if exists
        if (!guess) {
            displayMessage('.message', 'No number!')
        }
        else {

            // Evaluate guess
            if (number === guess) {
                displayMessage('.message', 'Correct number!')
                correctGuess();
            }

            else if (guess > number) {
                displayMessage('.message', 'Too high')
                wrongGuess();
            }

            else if (guess < number) {
                displayMessage('.message', 'Too low')
                wrongGuess();
            }

            // Display new score
            displayMessage('.score', score);

        }

    }

});

// Helper function
function displayMessage(element, message) {
    document.querySelector(element).textContent = message;
}

function displayValue(element, value) {
    document.querySelector(element).value = message;
}


function wrongGuess() {
    if (score > 0) score--;
    if (score == 0) {
        displayMessage('.message', 'You lost the game you dumb fuck!')
    }
}

function correctGuess() {

    // New background?
    if (score > highScore) {
        highScore = score;
        document.querySelector('.highscore').textContent = score;
    }

    // Make background green
    document.querySelector('body').style.backgroundColor = '#60b347';

    // Enlarge and display number
    displayMessage('.number', number);
    document.querySelector('.number').textContent = number;
    document.querySelector('.number').style.width = '30rem';

    // Game has ended
    gameEnded = true;
}