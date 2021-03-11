window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const movies = document.querySelector('.movies'),
        cards = document.querySelector('.cards');

    const getData = () => {
        return fetch('./dbHeroes.json');
    };

    const promise = getData();
    promise.then((response) => {
            if (response.status !== 200) {
                throw new Error('status network not 200');
            }
            return response.json();
        })
        .then((data) => {
            const mov = new Set();

            data.forEach((item) => {
                const card = document.createElement('div');
                card.classList.add('card');

                const name = item.realName ? item.realName.trim() : 'не известно',
                    species = item.species ? item.species.trim() : 'не известно',
                    citizenship = item.citizenship ? item.citizenship.trim() : 'не известно',
                    gender = item.gender ? item.gender.trim() : 'не известно',
                    birthDay = item.birthDay ? item.birthDay.trim() : 'не известно',
                    deathDay = item.deathDay ? item.deathDay.trim() : 'не известно',
                    status = item.status ? item.status.trim() : 'не известно',
                    actor = item.actors ? item.actors.trim() : 'не известно',
                    listMovie = item.movies ? item.movies.map(item =>
                        item.trim()).join(', ') : 'не известно';

                card.innerHTML = `
                <ul class="card-description">
                    <li class=""><b>Герой:</b> ${item.name}</li>
                    <li><b>Имя:</b> ${name}</li>
                    <li><b>Расса:</b> ${species}</li>
                    <li><b>Гражданство:</b> ${citizenship}</li>
                    <li><b>Пол:</b> ${gender}</li>
                    <li><b>Год рождения:</b> ${birthDay}</li>
                    <li><b>Год смерти:</b> ${deathDay}</li>
                    <li><b>Статус:</b> ${status}</li>
                    <li><b>Актер:</b> ${actor}</li>
                    <li class="listMovie"><b>Фильмы:</b> ${listMovie}</li>
                </ul>
                <span class="card-name">${item.name}</span>
                `;

                const noPhoto = 'img/no-foto.jpg';
                if (item.photo) {
                    card.style.cssText = `background: no-repeat top/100%  url(${item.photo})`;
                } else {
                    card.style.cssText = `background: no-repeat top/100%  url(${noPhoto})`;
                }

                cards.append(card);

                if (item.movies) {
                    item.movies.forEach((elem) => {
                        mov.add(elem.trim());
                    });
                }
            });

            const creatLi = (value = '') => {
                const li = document.createElement('li');
                li.classList.add('movie');
                li.textContent = value;
                return li;
            };

            mov.forEach((item) => { movies.append(creatLi(item)); });

            movies.prepend(creatLi('Все герои'));
            movies.append(creatLi('Герои без фильмов'));
        })
        .catch((error) => console.error(error));

    movies.addEventListener('click', (event) => {
        const target = event.target;

        if (target.matches('.movie')) {
            const value = target.textContent;
            const listCards = document.querySelectorAll('.card');

            listCards.forEach(elem => {
                elem.style.display = 'inline-block';

                if (value !== 'Все герои') {
                    const li = elem.querySelector('.listMovie');
                    let count = 0;

                    let films = li.textContent;

                    films = films.replace(/^Фильмы:\s/, '');
                    if (value === 'Герои без фильмов') {
                        if (films !== 'не известно') { elem.style.display = 'none'; }
                    } else {
                        const result = films.split(', ');
                        result.forEach(item => {
                            console.log(`"${item}"`);
                            if (value === item) {
                                count++;
                                console.log(`"${value}"`);
                                console.log(`"${item}"`);
                            }
                        });

                        if (count === 0) { elem.style.display = 'none'; }
                    }
                }
            });
        }
    });
});