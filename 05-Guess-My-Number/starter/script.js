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
const number = Math.trunc(Math.random() * (20));
document.querySelector('.number').textContent = number;

// Create score
let score = 20;

// Add event listener to button
document.querySelector('.check').addEventListener('click', function () {

    // Retrieve value
    const guess = Number(document.querySelector('.guess').value);

    // Convert to number if exists
    if (!guess) {
        document.querySelector('.message').textContent = 'No number!';
    }
    else {

        // Evaluate guess
        if (number === guess) {
            document.querySelector('.message').textContent = 'Correct number!';
        }

        else if (guess > number) {
            document.querySelector('.message').textContent = 'Too high';
            wrongGuess();
        }

        else if (guess < number) {
            document.querySelector('.message').textContent = 'Too low';
            wrongGuess();
        }

        // Display new score
        document.querySelector('.score').textContent = score;

    }

});

// Helper function
function wrongGuess() {
    if (score > 0) score--;
    if (score == 0) {
        document.querySelector('.message').textContent = 'You lost the game you dumb fuck!';
    }
}
