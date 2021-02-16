'use strict';

let userNameLogin = document.querySelector('#username'),
    passwordLogin = document.querySelector('#password'),
    loginKeeping = document.querySelector('#loginkeeping'),
    btnLogin = document.querySelector('.login_button');

let userFullNameSignup = document.querySelector('#userfullnamesignup'),
    userNameSignup = document.querySelector('#usernamesignup'),
    passwordSignup = document.querySelector('#passwordsignup'),
    passwordSignupConfirm = document.querySelector('#passwordsignup_confirm'),
    btnSignin = document.querySelector('.signin_button');

const outputUsers = document.querySelector('.output_users_ol'),
    autUser = document.querySelector('.aut-user');


const userData = [];
const nowDate = new Date();


const setUserDateToStoreg = function() {
    if (userData.length === 0) {
        localStorage.removeItem('users');
    } else {
        localStorage.users = JSON.stringify(userData);
    }
};

const getUserDateFromStoreg = function() {
    if (localStorage.users) {
        JSON.parse(localStorage.users).forEach(function(item) {
            userData.push(item);
        });
    }
};

const outputedUsersList = function() {
    outputUsers.textContent = '';

    if (userData.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Нет зарегистрированных пользователей!';
        outputUsers.append(li);
    } else {
        userData.forEach(function(item) {
            const li = document.createElement('li');
            li.classList.add('user');
            li.innerHTML = '<span class="text">Имя: ' + item.firstName + ', Фамилия: ' + item.lastName +
                ', зарегистрирован: ' + item.regDate + '</span>' +
                '<div class="buttons">' +
                '<button class="remove" alt="Удалить пользователя"></button>' +
                '</div>';
            outputUsers.append(li);

            let itemId = userData.indexOf(item);
            let btnRemoveUser = document.querySelectorAll('.remove')[itemId];

            btnRemoveUser.addEventListener('click', function() {
                userData.splice(itemId, 1);
                setUserDateToStoreg();
                outputedUsersList();
            });
        });
    }

};

const savedUserData = function() {
    userFullNameSignup = document.querySelector('#userfullnamesignup');
    userNameSignup = document.querySelector('#usernamesignup');
    passwordSignup = document.querySelector('#passwordsignup');
    passwordSignupConfirm = document.querySelector('#passwordsignup_confirm');

    if (userNameSignup.value === '') {
        alert('Имя пользователя не указано!');
        return;
    }
    if (passwordSignup.value === '' || passwordSignupConfirm.value === '') {
        alert('Поле с паролем не заполнено!');
        return;
    }
    if (passwordSignup.value !== passwordSignupConfirm.value) {
        alert('Пароли не совпадают! Задайте одинаковые значения!');
        passwordSignup.value = "";
        passwordSignupConfirm.value = "";
        return;
    }
    let data = {
        login: userNameSignup.value,
        password: passwordSignup.value,
        firstName: userFullNameSignup.value.split(' ')[0],
        lastName: userFullNameSignup.value.split(' ')[1],
        regDate: nowDate.toLocaleString('ru', { month: 'long', day: 'numeric' }) +
            ' ' + nowDate.getFullYear() + ' г., ' + nowDate.toLocaleTimeString()
    };

    const clearData = function() {
        userFullNameSignup.value = '';
        userNameSignup.value = '';
        passwordSignup.value = '';
        passwordSignupConfirm.value = '';
    };

    if (userData.length === 0) {
        userData.push(data);

        clearData();
    } else {
        let vremArray = [];
        userData.forEach(function(item) {
            vremArray.push(item.login);
        });
        if (vremArray.includes(data.login)) {
            alert('Пользователь с таким именем уже существует! Выберете другое имя!');
        } else {
            userData.push(data);

            clearData();
        }
    }

    outputedUsersList();
    setUserDateToStoreg();
};

const logined = function() {
    userNameLogin = document.querySelector('#username');
    passwordLogin = document.querySelector('#password');
    let check = '';

    const clearData = function() {
        userNameLogin.value = '';
        passwordLogin.value = '';
    };
    if (userNameLogin.value === '') { alert('Имя пользователя не указано!'); return; }
    if (passwordLogin.value === '') { alert('Пароль не указан!'); return; }

    userData.forEach(function(item) {
        if (item.login === userNameLogin.value && item.password === passwordLogin.value) {
            check = item.firstName;
            autUser.textContent = item.firstName;
            clearData();
        }
    });
    if (autUser.textContent !== check) {
        alert('Пользователь не найден');
    }
};


btnSignin.addEventListener('click', savedUserData);
btnLogin.addEventListener('click', logined);


getUserDateFromStoreg();
outputedUsersList();