'use strict';

const ad = document.querySelector('.adv'),
    collectionBooks = document.querySelectorAll('.book'),
    bgBody = document.querySelector('body'),
    linkHeadBook3 = collectionBooks[4].querySelector('a'),
    chaptersBook2 = collectionBooks[0].querySelectorAll('li'),
    chaptersBook5 = collectionBooks[5].querySelectorAll('li'),
    chaptersBook6 = collectionBooks[2].querySelectorAll('li');


ad.remove(); // Удаление рекламы

// Упорядочивание книг
collectionBooks[0].before(collectionBooks[1]);
collectionBooks[3].before(collectionBooks[4]);
collectionBooks[5].after(collectionBooks[2]);

// Измененение фона страницы
bgBody.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// Исправление опечатки в заголовке книги 3
linkHeadBook3.textContent = 'Книга 3. this и Прототипы Объектов';

// Упорядочивание глав книги 2
chaptersBook2[9].after(chaptersBook2[2]);
chaptersBook2[3].after(chaptersBook2[6]);
chaptersBook2[4].before(chaptersBook2[8]);

// Упорядочивание глав книги 5
chaptersBook5[1].after(chaptersBook5[9]);
chaptersBook5[6].before(chaptersBook5[2]);
chaptersBook5[7].after(chaptersBook5[5]);

// Добавление новой главы в книгу 6
const newChapterBook6 = document.createElement('li');
newChapterBook6.textContent = 'Глава 8: За пределами ES6';
chaptersBook6[8].after(newChapterBook6);