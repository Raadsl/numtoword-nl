const numberWords  = require('./words');


const int_to_words = (n, params) => {
    const { capitals, noWarnings } = params || { capitals: false, noWarnings: false };
    let return_words = '';
    let number = Number(n);

    if (isNaN(number)) {
        console.error("Input is not a Number");
        return n;
    }

    if (number.toString.length > 16) {
        if(noWarnings) return n;
        console.error("Numbers with more than 16 digits are not supported due to JavaScript limitations");
        return n;
    }

    if(number >= 9999999999999999 &! noWarnings) {
        console.error("Numbers larger than or equal to 9999999999999999 are not properly supported due to JavaScript limitations. They work limited");
    }

    if (number >= 10**153) {
        if(noWarnings) return n;
        console.error("Numbers larger than or equal to 1e+153 are not supported");
        return n;
    }
    if (number < 0) {
        return_words += 'min ';
        number = Math.abs(number);
    }


    return_words += convert_to_words(number, true);

    return capitals ? return_words.charAt(0).toUpperCase() + return_words.slice(1) : return_words;
}

const convert_to_words = (number, isFirst=false) => {
    let words;
    if (number == 1 && isFirst) return "één";
    else if (number < 20) words = numberWords["0-20"][number];
    else if (number < 100) {
        const tens = Math.floor(number / 10);
        const unit = number % 10;
        if (unit === 0) words = numberWords.tens[tens];
        else words = numberWords["0-20"][unit] + "en" + numberWords.tens[tens];
    } else if (number < 1000) {
        const hundreds = Math.floor(number / 100);
        const remainder = number % 100;
        const hundreds_word = hundreds === 1 ? "honderd" : numberWords["0-20"][hundreds] + "honderd";
        words = remainder ? hundreds_word +  convert_to_words(remainder) : hundreds_word;
    } else {
        words = convert_large_numbers(number);
    }

    words = words.replace(/(drie|twee)en/g, (match) => {
        return match.replace(/en$/, 'ën');
    });
    return words;
}


const convert_large_numbers = (number) => {
    const exponent = Math.floor(Math.log10(number) / 3);
    const base = Math.pow(10, exponent * 3);
    const base_word = exponent === 1 ? numberWords["1000"] : numberWords.exponentsof3[exponent - 2];
    const base_number = Math.floor(number / base);
    const remainder = number % base;
    const base_number_word = (base_number === 1 && exponent === 1) ? "" : convert_to_words(base_number, true);
    const space = base_number_word === "één" ? " " : "";
    return (base_number_word ? base_number_word + space : '') + base_word + (remainder ? ' ' + convert_to_words(remainder) : '');
}

const float_to_words = (n, params, puntofkomma = "komma") => {
    let words = ''
    let [main, komma] = n.toString().split('.').map(num => parseInt(num, 10));
    komma = komma || 0;
    words += int_to_words(main, params);
    if (komma > 0) {
        if (main > 0) {
            words += ' ' + puntofkomma + ' ';
        }
        words += int_to_words(komma)
    }
    return words
}

const num_to_currency = (amount, currency = 'EUR', customCurrencyNames = null) => {
    const defaultCurrencyNames = { // sometimes the currency names are different in plural form so this is just for the custom currency names
        "EUR": { "main": {"single": "euro", "plural": "euro"}, "sub": {"single": "cent", "plural": "cent"} },
        "USD": { "main": {"single": "dollar", "plural": "dollar"}, "sub": {"single": "cent", "plural": "cent"} },
    };

    const currencyNames = customCurrencyNames ? customCurrencyNames : defaultCurrencyNames[currency];

    let [main, cents] = amount.toString().split('.').map(num => parseInt(num, 10));
    cents = cents || 0;

    const mainCurrencyName = currencyNames["main"];
    const subCurrencyName = currencyNames["sub"];

    let words = '';

    if (main > 0) {
        words += int_to_words(main) + ' ' + (main === 1 ? mainCurrencyName["single"] : mainCurrencyName["plural"]);
    }

    if (cents > 0) {
        if (main > 0) {
            words += ' en ';
        }
        words += int_to_words(cents) + ' ' + (cents === 1 ? subCurrencyName["single"] : subCurrencyName["plural"]);
    }

    return words;
}
const replace_num_to_words = (text) => {
    const regex = /\b\d+\b/g; // Regular expression to match all numbers in the text
    return text.replace(regex, (match) => int_to_words(parseInt(match)));
}

const time_to_words = (time) => {
    const [hours, minutes] = time.split(':').map(Number);

    const hoursInWords = (h) => {
        const adjustedHours = h % 12 || 12; // Adjust for 12-hour clock, making 0 = 12
        return int_to_words(adjustedHours); // Assuming int_to_words function exists and converts numbers to words
    };

    if (minutes === 0) {
        return `${hoursInWords(hours)} uur`;
    } else if (minutes === 15) {
        return `kwart over ${hoursInWords(hours)}`;
    } else if (minutes === 30) {
        return `half ${hoursInWords(hours + 1)}`;
    } else if (minutes === 45) {
        return `kwart voor ${hoursInWords(hours + 1)}`;
    } else if (minutes > 30) {
        if (minutes === 40) {
            return `tien over half ${hoursInWords(hours + 1)}`;
        }
        const minutesToNextHour = 60 - minutes;
        return `${int_to_words(minutesToNextHour)} voor ${hoursInWords(hours + 1)}`;
    } else {
        if (minutes === 20) {
            return `tien voor half ${hoursInWords(hours + 1)}`;
        }
        return `${int_to_words(minutes)} over ${hoursInWords(hours)}`;
    }
};

module.exports = {
    int_to_words,
    float_to_words,
    replace_num_to_words,
    num_to_currency,
    time_to_words
}