'use strict';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const inputLines = [];
rl.on('line', (line) => inputLines.push(line));

rl.on('close', () => {
  const tokens = inputLines.join(' ').trim().split(/\s+/).map(Number);
  const n = tokens[0];
  const budget = tokens[1];
  const prices = tokens.slice(2);

  if (!Number.isInteger(n) || n < 1 || !Number.isFinite(budget) ||
      prices.length !== n || prices.some((price) => !Number.isFinite(price) || price < 0)) {
    throw new Error('Expected a positive item count, a budget, and that many non-negative prices.');
  }

  // Buying the cheapest toys first maximizes how many fit within the budget.
  prices.sort((a, b) => a - b);
  let spent = 0;
  let bought = 0;

  for (const price of prices) {
    if (spent + price > budget) {
      break;
    }
    spent += price;
    bought += 1;
  }

  console.log(bought);
});
