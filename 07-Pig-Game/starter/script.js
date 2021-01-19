'use strict';

// Reference DOM elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const dieEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Variables
let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let gameState = 1;

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
dieEl.classList.add('hidden');


// Helper function
const switchPlayer = function () {

    // Reset current player's score
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    // Switch player
    activePlayer = activePlayer === 0 ? 1 : 0;

    // Switch design
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')

}

// Reset button interactivitz
btnNew.addEventListener('click', function () {

    // Reset design
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--winner');
    if (activePlayer === 1) {
        document.querySelector(`.player--1`).classList.remove('player--active');
    }
    document.querySelector(`.player--0`).classList.add('player--active');

    // Reset variables
    activePlayer = 0;
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;

    // Reset html
    document.getElementById(`score--0`).textContent = 0;
    document.getElementById(`score--1`).textContent = 0;
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;

    // Begin new game
    gameState = 1;

});

// Roll button interactivity
btnRoll.addEventListener('click', function () {

    if (gameState) {

        // Generate random die roll
        const die = Math.trunc(Math.random() * 6) + 1;
        console.log(die);

        // Display die
        dieEl.classList.remove('hidden');
        dieEl.src = `dice-${die}.png`;

        // Check if rolled 1 -> add die to current score
        if (die !== 1) {

            // Calc current score
            currentScore += die;

            // Dynamically assign score to current player
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        }
        // Else switch to next player
        else {
            switchPlayer();
        }

    }

});

// Hold button interactivity
btnHold.addEventListener('click', function () {

    if (gameState) {

        // Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Check if player's score is >= 100 --> finish game
        if (scores[activePlayer] >= 20) {
            // End game
            gameState = 0;

            // Hide die
            dieEl.classList.toggle('hidden');

            // Show win design
            document.querySelector(`.player--${activePlayer}`).classList.toggle('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
        }
        else {
            // Else switch to the next player
            switchPlayer();
        }

    }

});