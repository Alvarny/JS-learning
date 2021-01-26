'use strict';

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};


// Data for challenges
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// Challenge 1
/*
1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.
*/

// 1. Destructure array
const [players1, players2] = game.players;

// 2. Using the rest operator to split array
const [goalkeeper, ...fieldPlayers] = players1;

// 3. Joining two arrays
const allPlayers = [...players1, ...players2];

// 4. Joining array with new values
const players1Final = [...players1, 'Thiaga', 'Coutinho', 'Perisic'];

// 5. Using destructuring
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

// 6. 
const printGoals = function (...playerNames) {
  playerNames.forEach(function (item) {
    console.log(item + ' ' + playerNames.length);
  });
}
printGoals('PlayerA', 'PlayerB', 'PlayerC', 'PlayerD');

// 7. Short-circuiting logic
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');




// Challenge 2
/*

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

*/

// 1.
let num = 1;
for (const score of game.scored) {
  console.log(`Goal ${num}: ${score}`);
  num++;
}

// 1. with entries()
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i}: ${player}`)
}

// 2.
let sum = 0;
for (const odd of Object.values(game.odds)) {
  sum += odd;
}
sum /= Object.values(game.odds).length;
console.log(`Average is ${sum}`);

// 3.
for (const [key, value] of Object.entries(game.odds)) {
  const team = game[key] ?? 'draw';
  console.log(`Victory odds for ${team}: ${value}`)
}


// Bonus
/*
const scorers = {
  [...game.scored]: ;
}
*/
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}


// Coding challenge 3
/*
1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL
*/

// 1. Map to set to array
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2. Remove an event
gameEvents.delete(64);

// 3. Get average event value
let priorValue = 0, average = 0;
for (const [minute, event] of gameEvents) {

  let difference = minute - priorValue;
  average += difference;

  priorValue = minute;
}
average /= gameEvents.size;
console.log(average);

// 4. 
for (const [minute, event] of gameEvents) {

  let half = minute <= 45 ? `FIRST` : `SECOND`;
  let str = `[${half} HALF] ${minute}: ${event}`;

  console.log(str);
}


const email = 'hello@jonas.io';
const loginEmail = '    Hello@Jonas.Io \n';
const lowerEmail = loginEmail.toLowerCase().trim();
console.log(lowerEmail);


// Coding challenge 4
/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!
*/

const convertToCamel = function (...vnames) {

  // Iterate over them
  for (const vname of vnames) {

    // Transform variable name
    let [vname1, vname2] = vname.toLowerCase().trim().split('_');
    let vnameConverted = `${vname1}${vname2[0].toUpperCase()}${vname2.slice(1)}`;

    // Log
    console.log(vnameConverted);

  }
}

convertToCamel('underscore_case', 'first_name', 'Some_Variable', '  calculate_AGE', 'delayed_departure');