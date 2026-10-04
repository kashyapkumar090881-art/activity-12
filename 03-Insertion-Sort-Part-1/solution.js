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
  const values = tokens.slice(1);

  if (!Number.isInteger(n) || n < 1 || values.length !== n ||
      values.some((value) => !Number.isFinite(value))) {
    throw new Error('Expected a positive array length followed by that many integers.');
  }

  // The final element is the value to insert into the already sorted prefix.
  const result = values.slice();
  const valueToInsert = result[n - 1];
  let index = n - 2;
  const output = [];

  // Shift larger values right, printing the array after each individual shift.
  while (index >= 0 && result[index] > valueToInsert) {
    result[index + 1] = result[index];
    output.push(result.join(' '));
    index -= 1;
  }

  result[index + 1] = valueToInsert;
  output.push(result.join(' '));

  console.log(output.join('\n'));
});
