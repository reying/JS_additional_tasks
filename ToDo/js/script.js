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
        if (this.todoData.size !== 0) {
            localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
        } else { localStorage.removeItem('toDoList'); }
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

    hideItem(li) {
        let count = 1,
            idInterval;

        const ascent = () => {
            count -= 0.01;
            if (count !== 0) {
                li.style.opacity = count;
            } else {
                console.log(count);
                clearInterval(idInterval);
            }
        };
        idInterval = setInterval(ascent);
    }

    editItem(event) {
        const target = event.target;
        if (target.matches('.todo-edit')) {

            const li = target.closest('.todo-item');
            li.contentEditable = true;

            const saveValueItem = () => {
                this.todoData.forEach((item, key) => {
                    if (key === target.closest('.todo-item').key) {
                        item.value = li.childNodes[1].textContent;
                    }
                });
                this.render();
                li.removeEventListener('blur', saveValueItem);
            };

            li.addEventListener('blur', saveValueItem);
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

            this.hideItem(target.closest('.todo-item'));
            setTimeout(() => { this.render(); }, 550);
        }
    }

    completedItem(event) {
        let target = event.target;
        if (target.matches('.todo-complete')) {

            const li = target.closest('.todo-item');
            this.hideItem(li);

            this.todoData.forEach((item, key) => {
                if (key === li.key) {
                    item.completed = (item.completed) ? false : true;
                }
            });

            setTimeout(() => {
                this.render();
            }, 550);
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