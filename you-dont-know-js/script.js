'use strict';

const collectionBooks = document.querySelectorAll('.book');

const ad = document.querySelector('.adv');

console.log(collectionBooks);

ad.remove();

collectionBooks[0].before(collectionBooks[1]);
collectionBooks[3].before(collectionBooks[4]);
collectionBooks[5].after(collectionBooks[2]);