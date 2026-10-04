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
  const values = inputLines.join(' ').trim().split(/\s+/).map(Number);

  if (values.length !== 5 || values.some((value) => !Number.isFinite(value))) {
    throw new Error('Expected exactly five finite integers.');
  }

  // Add the values once, then subtract each possible minimum or maximum.
  const total = values.reduce((sum, value) => sum + value, 0);
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);

  console.log(`${total - maximum} ${total - minimum}`);
});
