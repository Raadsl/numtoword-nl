#!/usr/bin/env node
const { int_to_words, float_to_words } = require('../src/numtowords');
const process = require('process');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Usage: numtowords-cli <number or float>");
  process.exit(1);
}

const number = parseFloat(args[0]);

if (isNaN(number)) {
  console.error("The first argument must be a valid number.");
  process.exit(1);
}

const params = {}; // Add any necessary parameters here

let words;
if (Number.isInteger(number)) {
  words = int_to_words(number, params);
} else {
  words = float_to_words(number, params);
}

console.log(words);