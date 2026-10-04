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
  // HackerRank Tutorial Intro format: target, array length, then sorted values.
  const tokens = inputLines.join(' ').trim().split(/\s+/).map(Number);
  const target = tokens[0];
  const n = tokens[1];
  const values = tokens.slice(2);

  if (!Number.isFinite(target) || !Number.isInteger(n) || n < 1 ||
      values.length !== n || values.some((value) => !Number.isFinite(value))) {
    throw new Error('Expected a target, positive array length, and that many sorted values.');
  }

  // Narrow the candidate interval by half on every iteration.
  let left = 0;
  let right = values.length - 1;
  let result = -1;

  while (left <= right) {
    const middle = left + Math.floor((right - left) / 2);

    if (values[middle] === target) {
      result = middle;
      break;
    }

    if (values[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  console.log(result);
});
