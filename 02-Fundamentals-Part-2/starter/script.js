"use strict";


//////// Exercise 1: functions
/*
// Data: Scores of both teams
let dolphinsScore1 = [44, 23, 71];
let dolphinsScore2 = [85, 54, 41];
let koalasScore1 = [65, 54, 49];
let koalasScore2 = [23, 34, 27];

let data1 = [dolphinsScore1, koalasScore1];
let data2 = [dolphinsScore2, koalasScore2];

// Function: Calculate average of 3 scores
const calcAverage = (num1, num2, num3) => (num1 + num2 + num3) / 3;

// Function: Check winner
function checkWinner(dolphinsAverage, koalasAverage) {
    if(dolphinsAverage > koalasAverage) {
        console.log(`Dolphins win ${dolphinsAverage} vs. ${koalasAverage}!`);
    } 
    else{
        console.log(`Koalas win ${koalasAverage} vs. ${dolphinsAverage}!`);
    }
}


// Check winner for game 1
let dolphinsAverage1 = calcAverage(...data1[0]);
let koalasAverage1 = calcAverage(...data1[1]);

checkWinner(dolphinsAverage1, koalasAverage1);

// Check winner for game 2
let dolphinsAverage2 = calcAverage(...data2[0]);
let koalasAverage2 = calcAverage(...data2[1]);

checkWinner(dolphinsAverage2, koalasAverage2);
*/


// Exercise 2: arrays

/*
const calcTip = function(billAmount){
    if (billAmount > 50 && billAmount < 300) return billAmount * 0.15;
    else return billAmount * 0.2;
}

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const billsPlusTips = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]]

console.log(`${bills}
${tips}
${billsPlusTips}`);
*/


// Exercise 3: object methods

// Exercise 4: loops
const bills = [125, 555, 44];
const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
    const tip = calcTip(bills[i]);
    tips.push(tip);
    totals.push(tip + bills[i]);
}