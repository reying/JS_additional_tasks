window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const body = document.querySelector('body'),
        selectCities = document.getElementById('select-cities'),
        listDefault = document.querySelector('.dropdown-lists__list--default'),
        listSelect = document.querySelector('.dropdown-lists__list--select'),
        listAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete'),
        colDefault = listDefault.childNodes[1],
        colSelect = listSelect.childNodes[1],
        colAutocomplete = listAutocomplete.childNodes[1],
        label = document.querySelector('.label'),
        closeButton = document.querySelector('.close-button');

    const getData = () => {
        return fetch('./db_cities.json');
    };

    const createDiv = (classEl) => {
        const div = document.createElement('div');
        div.classList.add(classEl);
        return div;
    };

    const addCountryBlock = (arr, parrent, textCountry, textCount, countCity, ip) => {
        const countryBlock = createDiv('dropdown-lists__countryBlock'),
            totalLine = createDiv('dropdown-lists__total-line'),
            country = createDiv('dropdown-lists__country'),
            count = createDiv('dropdown-lists__count');

        if (textCountry && textCount) {
            country.textContent = textCountry;
            count.textContent = textCount;

            totalLine.append(country, count);
            countryBlock.append(totalLine);
        }

        const restriction = (countCity) ? countCity : arr.length;

        arr.forEach((item, index) => {
            if (index < restriction) {
                const line = createDiv('dropdown-lists__line'),
                    city = createDiv('dropdown-lists__city'),
                    count = createDiv('dropdown-lists__count');

                if (index === 0 && ip) { city.classList.add('dropdown-lists__city--ip'); }

                city.textContent = item.name;
                count.textContent = item.count;

                line.append(city, count);
                countryBlock.append(line);
            }
        });

        parrent.append(countryBlock);
    };


    getData()
        .then(response => {
            if (response.status !== 200) { throw new Error('status network not 200'); }
            return response.json();
        })
        .then(data => {

            body.addEventListener('click', (event) => {
                const target = event.target;

                if (target.matches('#select-cities')) {
                    listSelect.style.display = 'none';
                    listAutocomplete.style.display = 'none';
                    colDefault.textContent = '';

                    data.RU.forEach(item => {
                        item.cities.sort((a, b) => b.count - a.count);
                        addCountryBlock(item.cities, colDefault, item.country, item.count, 3, true);
                    });

                    listDefault.style.display = 'block';

                    target.addEventListener('input', () => {
                        if (target.value !== '') {
                            listDefault.style.display = 'none';
                            colAutocomplete.textContent = '';

                            const regExp = new RegExp('^' + target.value, 'gi');
                            let empty = 0;

                            data.RU.forEach(item => {
                                const arrCities = item.cities.filter(item => regExp.test(item.name));
                                if (arrCities.length !== 0) {
                                    empty++;
                                    addCountryBlock(arrCities, colAutocomplete);
                                }
                            });

                            if (empty === 0) {
                                addCountryBlock([{ "name": "Ничего не найдено", "count": "" }], colAutocomplete);
                            }

                            listAutocomplete.style.display = 'block';
                        } else {
                            listAutocomplete.style.display = 'none';
                            listDefault.style.display = 'block';
                        }
                    });
                }

                if (target.closest('.dropdown-lists__total-line')) {
                    selectCities.value = '';
                    if (listSelect.style.display === 'none') {
                        colSelect.textContent = '';

                        data.RU.forEach(item => {
                            addCountryBlock(item.cities, colSelect, item.country, item.count);
                        });

                        listDefault.style.display = 'none';
                        listSelect.style.display = 'block';
                    } else {
                        listDefault.style.display = 'block';
                        listSelect.style.display = 'none';
                    }
                }

                if (listSelect.style.display !== 'none' || listDefault.style.display !== 'none ' || listAutocomplete.style.display !== 'none ') {
                    if (target.closest('.dropdown-lists__line')) {
                        selectCities.value = '';
                        selectCities.value = target.closest('.dropdown-lists__line').firstChild.textContent;
                        document.querySelectorAll('.dropdown-lists__list').forEach(item => item.style.display = 'none');
                    }
                }

                if (selectCities.value !== '') {
                    label.style.cssText = `position: absolute; top: -25px; left: 0; color: #00416A;`;
                    // console.log(closeButton);
                    closeButton.display = 'inline-block';
                } else {
                    label.style.cssText = `position: absolute; top: 15 px; left: 15 px; color: #fff;`;
                    closeButton.display = 'none';
                }


                if (!target.closest('#select-cities') && !target.closest('.dropdown')) {
                    document.querySelectorAll('.dropdown-lists__list').forEach(item => item.style.display = 'none');
                }
            });
        })
        .catch(error => console.error(error));
});