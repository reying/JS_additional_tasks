'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const todoData = [];

const getDataToStorage = function() {
    localStorage.toDoList = JSON.stringify(todoData);
};
const getDataFromStorage = function() {
    if (localStorage.toDoList) {
        JSON.parse(localStorage.toDoList).forEach(function(item) {
            todoData.push(item);
        });
        if (todoData.length === 0) { alert('Список задач пуст. Спланируйте новые задачи!'); }
    } else {
        alert('Предыдущих задач не обнаружено!' +
            ' Откройте страницу в браузере, в котором они были поставлены или спланируйте новые задачи!');
    }
};

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        const btnTodoRemove = li.querySelector('.todo-remove');

        btnTodoComplete.addEventListener('click', function() {
            item.completed = !item.completed;
            getDataToStorage();
            render();
        });

        btnTodoRemove.addEventListener('click', function() {
            let itemId = todoData.indexOf(item);
            todoData.splice(itemId, 1);
            getDataToStorage();
            render();
        });
    });
};

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();
    headerInput.value = headerInput.value.trim();
    if (headerInput.value === '') { return; }

    const newTodo = {
        value: headerInput.value,
        completed: false
    };

    todoData.push(newTodo);
    getDataToStorage();
    headerInput.value = '';

    render();
});

getDataFromStorage();
render();