'use strict';

function generateOddNumber(x, y) {
    let max, min, num;

    if (x > y) {
        max = x;
        min = y;
    } else {
        max = y;
        min = x;
    }

    do {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (num % 2 === 0)

    return num;
}

console.log(generateOddNumber(1, 100));
console.log(generateOddNumber(0, -10));
console.log(generateOddNumber(-7, -3));
console.log(generateOddNumber(-100, 100));
console.log(generateOddNumber(1, -1));