# Number to Words Converter for Dutch

This NPM library is made for converting numbers into their word representations in Dutch

_Deze NPM library is gemaakt om cijfers om te zetten in hun Nederlandse uitgeschreven vorm_

Based on the original [num-to-words](https://github.com/salmanm/num-words) and took inspiration from the [german package](https://www.npmjs.com/package/num-words-de?activeTab=readme)

## Features

- Convert integers and floats to words in Dutch
- Support for negative numbers and large numbers up to 16 characters, you can try for really large numbers but because of javascript limiations those won't be really accurate.
- Convert currency amounts into words, supporting the euro and the US dollar, other currencies can be added in the params of the function.
- Replace numbers in a string into words

## Install

```bash
npm install num-to-words
```

## Usage
## Basic Conversion

Using require syntax:

```javascript
const numtowords = require('num-to-words-nl');

console.log(numtowords.int_to_words(123)); // Outputs: "honderddrieëntwintig"
console.log(numtowords.float_to_words(45.75, { capitals: true })); // Outputs: "Vijfenveertig komma Vijfenzeventig"

```

Using ES6 import syntax
```javascript
import { int_to_words, float_to_words } from 'num-to-words-nl';

console.log(int_to_words(123, { capitals: true })); // Outputs: "Honderddrieëntwintig"
console.log(float_to_words(45.75, { capitals: true })); // Outputs: "Vijfenveertig komma Vijfenzeventig"
```

The function takes 2 parameters, 

### Currency Conversion

```javascript
const numtowords = require('num-to-words-nl');

console.log(numtowords.num_to_currency(999.99, 'USD')); // Outputs: "negenhonderdnegenennegentig dollar en negenennegentig cent"
```

### replace numbers in a text
```js
const numtowords = require('num-to-words-nl');

console.log(numtowords.replace_num_to_words("Ik heb 3 appels en 2 peren")); // Outputs: "Ik heb drie appels en twee peren"
```

### write out time
```js
const numtowords = require('num-to-words-nl')

console.log(numtowords.time_to_words("12:00")) // Outputs: "twaalf uur"
```

## Supported Currencies

- USD (United States Dollar)
- EUR (Euro)


## API Documentation

### `int_to_words(n, params)`

Converts an integer `n` into its Dutch word representation.

- `n`: The integer to be converted.
- `params`: Optional object with configuration parameters (`capitals` for capitalizing the first letter, `noWarnings` to suppress warnings).

### `float_to_words(n, params, puntofkomma = "komma")`

Converts a float `n` into its Dutch word representation.

- `n`: The float to be converted.
- `params`: Optional object with configuration parameters (`capitals`, `noWarnings`).
- `puntofkomma`: Optional string to specify the separator between integer and fractional parts. By default it is `komma`

### `num_to_currency(amount, currency = 'EUR', customCurrencyNames = null)`

Converts a currency amount into its Dutch word representation.

- `amount`: The currency amount (float) to be converted.
- `currency`: Optional string specifying the currency (default is 'EUR' for Euro).
- `customCurrencyNames`: Optional object providing custom currency names.

### `replace_num_to_words(text)`

Replaces all numeric substrings in `text` with their Dutch word equivalents.

- `text`: The input text containing numbers to be replaced.

### `time_to_words(time)`

Writes out the time into its Dutch word representation

- `time`: The time in `hh:mm` format. Example: 12:10 -> tien over twaalf.


## Run tests
```bash
npm run test
```

## Run CLI command
```bash
npm nl-numtowords-cli <number>
```
example:
```bash
npm exec nl-numtowords-cli 99 # negenennegentig
```
if globally installed (`npm install num-to-word-nl -g`)
```bash
nl-numtowords-cli 99 # negenennegentig
```

## Contributing

You are welcome to submit a pull request for additional languages or errors I made in the current functions

## License

This project is licensed under the MIT License - see the LICENSE file for details.