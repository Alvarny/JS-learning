'use strict';

// Create base function
const addTax = function (rate) {
	return function (value) {
		const taxValue = value + value * rate;
		console.log(`Tax value is ${taxValue}`);
	}
}

// Create and call derived function
const addTax23 = addTax(0.23);
addTax23(1200);

// Coding challenge #1
/*
1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]
*/

const poll = {
	question: 'What is your favourite programming language?',
	options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
	// This generates [0, 0, 0, 0]. More in the next section 😃
	answers: new Array(4)
		.fill(0),
};

// 1.
poll.registerNewAnswer = function () {

	// 1.1 Get user input
	const choice = Number(prompt(`
    What is your favourite programming language?
    0: JavaScript
    1: Python
    2: Rust
    3: C++
    (Write option number)
    `));

	console.log(choice);

	// 1.2 If choice is within bounds increase array
	if (choice < 4 && choice >= 0) this.answers[choice]++;

	// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.
	//this.displayResults.call(this, 'array');
	this.displayResults();
	this.displayResults('string');
}

// 2. Add event listener and bind method to poll
document.querySelector('.poll')
	.addEventListener('click', poll.registerNewAnswer.bind(poll));

/* 
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. 
If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. 
If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
*/
poll.displayResults = function (type = 'array') {

	if (type === 'array') console.log(this.answers);
	if (type === 'string') {
		console.log(`Poll results are ${this.answers.join(', ')}`);
	}

}

/*
BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. 
Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]
*/
var arr1 = [5, 2, 3];
var arr2 = [1, 5, 3, 9, 6, 1];

console.log(poll);
poll.displayResults.call({
	answers: arr1
});

// Coding challenge #2
/*
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.
*/
(function () {
	const header = document.querySelector('h1');
	header.style.color = 'red';

	const body = document.querySelector('body');
	body.addEventListener('click', () => {
		header.style.color = 'blue';
	})

})();