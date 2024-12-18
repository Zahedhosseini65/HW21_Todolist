document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');
    const todoList = document.getElementById('todo-list');
    const clearAllBtn = document.getElementById('clear-all-btn');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function renderTodos() {
        todoList.innerHTML = '';
        todos.sort((a, b) => new Date(a.date) - new Date(b.date));

        todos.forEach((todo, index) => {
            const todoItem = document.createElement('div');
            todoItem.className = 'flex justify-between items-center p-4 mb-2 bg-gray-100 rounded-md';

            const todoText = document.createElement('span');
            todoText.textContent = `${todo.text} - ${todo.date}`;
            todoText.className = 'flex-1';

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'حذف';
            deleteBtn.className = 'bg-red-500 text-white p-2 rounded-md hover:bg-red-400';
            deleteBtn.onclick = () => deleteTodo(index);

            const editBtn = document.createElement('button');
            editBtn.textContent = 'ویرایش';
            editBtn.className = 'bg-blue-500 text-white p-2 ml-2 rounded-md hover:bg-blue-400';
            editBtn.onclick = () => editTodo(index);

            todoItem.appendChild(todoText);
            todoItem.appendChild(editBtn);
            todoItem.appendChild(deleteBtn);

            todoList.appendChild(todoItem);
        });
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function addTodo(event) {
        event.preventDefault();

        const newTodo = {
            text: todoInput.value.trim(),
            date: todoDate.value
        };

        if (newTodo.text === '' || newTodo.date === '') {
            alert('لطفا همه فیلدها را پر کنید');
            return;
        }

        todos.push(newTodo);
        saveTodos();
        renderTodos();

        todoInput.value = '';
        todoDate.value = '';
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }

    function editTodo(index) {
        todoInput.value = todos[index].text;
        todoDate.value = todos[index].date;
        deleteTodo(index);
    }

    function clearAll() {
        todos = [];
        saveTodos();
        renderTodos();
    }

    todoForm.addEventListener('submit', addTodo);
    clearAllBtn.addEventListener('click', clearAll);

    renderTodos();
});
