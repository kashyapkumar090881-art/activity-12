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
  const heights = tokens.slice(1);

  if (!Number.isInteger(n) || n < 1 || heights.length !== n ||
      heights.some((height) => !Number.isFinite(height))) {
    throw new Error('Expected a positive candle count followed by that many heights.');
  }

  // Track the tallest height and its frequency in one pass.
  let tallest = -Infinity;
  let tallestCount = 0;

  for (const height of heights) {
    if (height > tallest) {
      tallest = height;
      tallestCount = 1;
    } else if (height === tallest) {
      tallestCount += 1;
    }
  }

  console.log(tallestCount);
});
