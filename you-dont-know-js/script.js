'use strict';

const ad = document.querySelector('.adv');
const collectionBooks = document.querySelectorAll('.book');
const bgBody = document.querySelector('body');


console.log(collectionBooks);

ad.remove();

collectionBooks[0].before(collectionBooks[1]);
collectionBooks[3].before(collectionBooks[4]);
collectionBooks[5].after(collectionBooks[2]);

bgBody.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

console.log();


// background-image: url(./image/you-dont-know-js.jpg);