window.addEventListener('DOMContentLoaded', () => {
'use strict';

const selectCities = document.getElementById('select-cities'),
    listDefault = document.querySelector('.dropdown-lists__list--default'),
    listSelect = document.querySelector('.dropdown-lists__list--select'),
    listAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete'),
    colDefault = listDefault.childNodes[1];

const noneDropdownLists = ()=>{
    const dropdownLists = document.querySelectorAll('.dropdown-lists__list');
    dropdownLists.forEach(item => item.style.display = 'none');
};

noneDropdownLists();


const getData =()=>{
    return fetch('./db_cities.json');
};

const createDiv = (classEl) => {
    const div = document.createElement('div');
    div.classList.add(classEl);
    return div;
};

const addCountryBlock = (textCountry, textCount, arr, parrent) => {
    const countryBlock = createDiv('dropdown-lists__countryBlock'),
        totalLine = createDiv('dropdown-lists__total-line'),
        country = createDiv('dropdown-lists__country'),
        count = createDiv('dropdown-lists__count');

    country.textContent = textCountry;
    count.textContent = textCount;

    totalLine.append(country, count);
    countryBlock.append(totalLine);

    arr.forEach((item, index) =>{
        const line = createDiv('dropdown-lists__line'),
            city = createDiv('dropdown-lists__city'),
            count = createDiv('dropdown-lists__count');

        if (index===0) {city.classList.add('dropdown-lists__city--ip')}

        city.textContent = item.name;
        count.textContent = item.count;

        line.append(city, count);
        countryBlock.append(line);
    });

    console.log(countryBlock);
    parrent.append(countryBlock);
};


getData()
    .then(response =>{
        if (response.status !==200) {throw new Error('status network not 200')}
        return response.json();
    })
    .then(data => {
        console.log(data);
        selectCities.addEventListener('click', ()=>{

            data['RU'].forEach(item => {
                console.log(item);
                console.log(colDefault);
                addCountryBlock(item.country, item.count, item.cities, colDefault);
            });

            listDefault.style.display = 'block';
        });
    })
    .catch(error => console.error(error));


});