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
        closeButton = document.querySelector('.close-button'),
        button = document.querySelector('.button');

    button.style.pointerEvents = 'none';

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
                }

                if (target.closest('.dropdown-lists__total-line')) {
                    selectCities.value = '';
                    if (listSelect.style.display === 'none') {
                        colSelect.textContent = '';

                        const countryValue = target.closest('.dropdown-lists__total-line').firstChild.textContent;
                        const objData = data.RU.filter(item => item.country === countryValue);
                        addCountryBlock(objData[0].cities, colSelect, objData[0].country, objData[0].count);

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
                        button.href = '#';
                        selectCities.value = target.closest('.dropdown-lists__line').firstChild.textContent;
                        closeButton.style.setProperty('display', 'block', 'important');
                        button.style.pointerEvents = 'auto';

                        data.RU.forEach(item => {
                            item.cities.forEach(elem => {
                                if (elem.name === selectCities.value) {
                                    button.href = elem.link;
                                    button.setAttribute('target', '_blank');
                                }
                            });
                        });

                        // document.querySelectorAll('.dropdown-lists__list').forEach(item => item.style.display = 'none');
                    } else if (target.closest('.dropdown-lists__total-line')) {
                        button.href = '#';
                        selectCities.value = '';
                        selectCities.value = target.closest('.dropdown-lists__total-line').firstChild.textContent;
                        closeButton.style.setProperty('display', 'block', 'important');
                        // document.querySelectorAll('.dropdown-lists__list').forEach(item => item.style.display = 'none');
                    }
                }

                if (target.matches('.close-button')) {
                    selectCities.value = '';
                    closeButton.style.display = 'none';
                    document.querySelectorAll('.dropdown-lists__list').forEach(item => item.style.display = 'none');
                    button.style.pointerEvents = 'none';
                }

                if (selectCities.value !== '') {
                    label.style.cssText = `position: absolute; top: -25px; left: 0; color: #00416A;`;
                } else {
                    label.style.cssText = `position: absolute; top: 15 px; left: 15 px; color: #fff;`;
                    button.style.pointerEvents = 'none';
                }

                if (!target.closest('#select-cities') && !target.closest('.dropdown')) {
                    document.querySelectorAll('.dropdown-lists__list').forEach(item => item.style.display = 'none');
                }
            });

            selectCities.addEventListener('input', (event) => {
                const target = event.target;

                button.href = '#';

                if (target.value !== '') {
                    listDefault.style.display = 'none';
                    colAutocomplete.textContent = '';

                    const regExp = new RegExp('^' + target.value, 'gi');
                    let empty = 0;
                    let result = false;

                    data.RU.forEach(item => {
                        const arrCities = item.cities.filter(item => regExp.test(item.name));

                        if (arrCities.length !== 0) {
                            empty++;
                            addCountryBlock(arrCities, colAutocomplete);
                        }

                        arrCities.forEach(elem => {
                            if (elem.name === target.value) {
                                result = true;
                                button.href = elem.link;
                                button.setAttribute('target', '_blank');
                            }
                        });
                    });

                    if (empty === 0) {
                        addCountryBlock([{ "name": "Ничего не найдено", "count": "" }], colAutocomplete);
                        button.style.pointerEvents = 'none';
                    }

                    if (!result) { button.style.pointerEvents = 'none'; }

                    listAutocomplete.style.display = 'block';
                } else {
                    listAutocomplete.style.display = 'none';
                    listDefault.style.display = 'block';
                }
            });
        })
        .catch(error => console.error(error));
});