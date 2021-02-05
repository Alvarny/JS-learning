'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
	interestRate: 1.2, // %
	pin: 1111,
};

const account2 = {
	owner: 'Jessica Davis',
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,
};

const account3 = {
	owner: 'Steven Thomas Williams',
	movements: [200, -200, 340, -300, -20, 50, 400, -460],
	interestRate: 0.7,
	pin: 3333,
};

const account4 = {
	owner: 'Sarah Smith',
	movements: [430, 1000, 700, 50, 90],
	interestRate: 1,
	pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Display movements
const displayMovements = function (movements) {

	// Delete placeholder content
	containerMovements.innerHTML = '';

	// Display the individual movements
	movements.forEach(function (mov, i) {

		// Figure out if deposit or withdrawal
		const type = mov > 0 ? 'deposit' : 'withdrawal';

		// Create html template literal
		const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;

		// Insert html
		containerMovements.insertAdjacentHTML('afterbegin', html)

	});

}

// Compute user names (map)
const createUsernames = function (accounts) {

	accounts.forEach((acc) => {

		acc.username = acc.owner.toLowerCase()
			.split(' ')
			.map((name) => name[0])
			.join('');

	})
};
createUsernames(accounts);
console.log(accounts);

// Filter deposits out of movements (movement > 0) (filter)
const deposits = movements.filter((mov) => mov > 0);
const withdrawals = movements.filter((mov) => mov < 0);

// Calculate global value of account (reduce)
const balance = movements.reduce((acc, cur, i, arr) => acc + cur, 0);

// Calculate balance
const calcDisplayBalance = function (acc) {

	// Calculate balance
	acc.balance = acc.movements.reduce((acc, value) => acc + value, 0);

	// Show balance
	labelBalance.textContent = `${acc.balance}€`;

};

// Calculate statistics
const calcDisplaySummary = function (acc) {

	// Income
	const income = acc.movements.filter(mov => mov > 0)
		.reduce((acc, mov) => acc + mov, 0);

	labelSumIn.textContent = `${income}€`;

	// Spending
	const spending = acc.movements.filter(mov => mov < 0)
		.reduce((acc, mov) => acc + mov, 0);

	labelSumOut.textContent = `${Math.abs(spending)}€`;

	// Interest
	const interest = acc.movements.filter(mov => mov > 0)
		.map(deposit => deposit * acc.interestRate / 100)
		.filter(interest => interest > 1) // Bank only grants interest if interest is greater than 1€
		.reduce((acc, mov) => acc + mov, 0);
	labelSumInterest.textContent = `${interest}€`;

}

// Login functionality
let currentAccount; // Global so that it is accessible from anywhere
btnLogin.addEventListener('click', (e) => {

	// Prevent page from reloading
	e.preventDefault();

	// Find account to the user input
	currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

	// Check if pin is correct
	if (currentAccount?.pin === Number(inputLoginPin.value)) {

		// Display UI and welcome message
		labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
		containerApp.style.opacity = 100;

		// Clear input fields
		inputLoginUsername.value = inputLoginPin.value = "";
		inputLoginPin.blur()

		// Update UI
		updateUI(currentAccount)

	}

});

// Update helper
const updateUI = function(currentAccount) {
	// Display movements
	displayMovements(currentAccount.movements)

	// Display balance
	calcDisplayBalance(currentAccount)

	// Display summary
	calcDisplaySummary(currentAccount)
}

// Transfer functionality
btnTransfer.addEventListener('click', (e) => {
	
	// Prevent site reload
	e.preventDefault();

	// Get inputs
	const amount = Number(inputTransferAmount.value);
	const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

	// Reset inputs
	inputTransferTo = inputTransferAmount = ""

	// Check value
	if(receiverAcc && amount > 0 && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {

		// Deduct fom sender
		currentAccount.movements.push(-amount);
		
		// Add to recipient
		receiverAcc.movements.push(amount);

		// Update UI
		updateUI(currentAccount)

	}

})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
	['USD', 'United States dollar'],
	['EUR', 'Euro'],
	['GBP', 'Pound sterling'],
]);

// Find an account
const account = accounts.find(acc => acc.owner === 'Jessica Davis');

///////////////////////////////////////////////// Challenges

/*
Challenge #1

Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
*/

var julia1 = [3, 5, 2, 12, 7];
var kate1 = [4, 1, 15, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {

	// 1. Shallow copy
	const dogsJuliaNew = dogsJulia.slice(1, 3);

	// 2. Concat arrays
	const concatArray = [
		...dogsJuliaNew,
		...dogsKate
	];

	// 3. 
	concatArray.forEach((dogAge, index) => {

		if (dogAge > 2) console.log(`Dog number ${index} is an adult and is ${dogAge} years old`);
		else if (dogAge <= 2) console.log(`Dog number ${index} is still a puppy`);

	});

}

//checkDogs(julia1, kate1);

//////////// Data transformations

const eurToUsd = 1.1;

const movementsUSD = movements.map((mov) => mov * eurToUsd);

/*
Challenge #2

Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

*/

const arr1 = [5, 2, 4, 1, 15, 8, 3];
const arr2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (ages) {

	console.log(`Dog ages: ${ages}`);

	// 1. Calculate dog age
	const dogInHumanAge = ages.map((dogAge) => dogAge <= 2 ? (2 * dogAge) : (16 + dogAge * 4));
	console.log(`In human ages: ${dogInHumanAge}`);

	// 2. Exclude certain dogs
	const dogInHumanAge_adultsOnly = dogInHumanAge.filter((dog) => dog >= 18);
	console.log(`Only those 18 and older: ${dogInHumanAge_adultsOnly}`);

	// 3. Calculate average
	const dogInHumanAge_average = dogInHumanAge_adultsOnly.reduce((avg, cur) => (avg + cur / (dogInHumanAge_adultsOnly.length)), 0);
	console.log(`Average human age: ${dogInHumanAge_average}`);

}
calcAverageHumanAge(arr1);

// 3. coding challenge
const calcAverageHumanAge_arrow = (ages) => ages.map((dogAge) => dogAge <= 2 ? (2 * dogAge) : (16 + dogAge * 4))
	.filter((dog) => dog >= 18)
	.reduce((avg, cur, i, arr) => (avg + cur / (arr.length)), 0);
console.log(calcAverageHumanAge_arrow(arr1));