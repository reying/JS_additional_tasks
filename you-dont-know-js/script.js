'use strict';

const ad = document.querySelector('.adv'),
    collectionBooks = document.querySelectorAll('.book'),
    bgBody = document.querySelector('body');

let linkHeadBook3 = collectionBooks[4].querySelector('a');


console.log(collectionBooks);

ad.remove();

collectionBooks[0].before(collectionBooks[1]);
collectionBooks[3].before(collectionBooks[4]);
collectionBooks[5].after(collectionBooks[2]);

bgBody.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

linkHeadBook3.textContent = 'Книга 3. this и Прототипы Объектов';



console.log(collectionBooks[4].h2.a);