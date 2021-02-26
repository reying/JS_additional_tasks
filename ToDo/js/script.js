'use strict';

class Todo {
    constructor(form, input, todoContainer, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoContainer = document.querySelector(todoContainer);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        let btn = '';
        li.classList.add('todo-item');
        li.key = todo.key;
        if (!todo.completed) { btn = '<button class="todo-edit"></button>'; }
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
			<div class="todo-buttons">
                ${btn}
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>
        `);
        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(event) {
        event.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey()
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
            this.input.value = '';
        } else {
            alert('Нельзя добавить пустое дело!');
            this.input.value = '';
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    editItem(event) {
        const target = event.target;
        if (target.matches('.todo-edit')) {

            const li = target.closest('.todo-item');
            li.contentEditable = true;

            li.addEventListener('blur', () => {
                this.todoData.forEach((item, key) => {
                    if (key === target.closest('.todo-item').key) {
                        item.value = li.childNodes[1].textContent;
                    }
                });
                li.contentEditable = true;
                this.render();
            });
        }
    }

    deleteItem(event) {
        const target = event.target;

        if (target.matches('.todo-remove')) {
            this.todoData.forEach((item, key) => {
                if (key === target.closest('.todo-item').key) {
                    this.todoData.delete(key);
                }
            });
            this.render();
        }
    }

    completedItem(event) {
        let target = event.target;
        if (target.matches('.todo-complete')) {
            this.todoData.forEach((item, key) => {
                if (key === target.closest('.todo-item').key) {
                    item.completed = (item.completed) ? false : true;
                }
            });
            this.render();
        }
    }

    handler(event) {
        let target = event.target;
        if (target.closest('.todo-list')) {
            this.editItem(event);
            this.deleteItem(event);
            this.completedItem(event);
        } else if (target.closest('.todo-completed')) {
            this.deleteItem(event);
            this.completedItem(event);
        }
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.todoContainer.addEventListener('click', this.handler.bind(this));
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-container', '.todo-list', '.todo-completed');

todo.init();