// Register function
function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const email = document.getElementById('reg-email').value;

    if (username && password && email) {
        localStorage.setItem(username, JSON.stringify({ password: password, email: email }));
        alert('Registration successful');

        document.getElementById('reg-username').value = '';
        document.getElementById('reg-password').value = '';
        document.getElementById('reg-email').value = '';

        window.location.href = "log-in.html";
    } else {
        alert('Please fill in all fields');
    }
}

// Login function
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = JSON.parse(localStorage.getItem(username));
    if (user && user.password === password) {
        alert('Login successful');
        window.location.href = "to-do.html";
    } else {
        alert('Invalid username or password');
    }
}

// Logout function
function logout() {
    window.location.href = "log-in.html";
}

// Add Todo function
function addTodo() {
    const todoInput = document.getElementById('todo-input').value;
    if (todoInput) {
        const todoList = document.getElementById('todo-list');
        const li = document.createElement('li');

        li.textContent = todoInput;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.onclick = function () {
            li.style.textDecoration = 'line-through';
            saveTodos();
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            deleteTodo(li);
        };

        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);

        document.getElementById('todo-input').value = '';
        saveTodos();
    } else {
        alert('Please enter a task');
    }
}

// Save Todos function
function saveTodos() {
    const todoList = document.getElementById('todo-list');
    const todos = [];
    for (let i = 0; i < todoList.children.length; i++) {
        const li = todoList.children[i];
        todos.push({
            text: li.firstChild.textContent,
            completed: li.style.textDecoration === 'line-through'
        });
    }
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Delete Todo function
function deleteTodo(todoItem) {
    const todoList = document.getElementById('todo-list');
    todoList.removeChild(todoItem);
    saveTodos();
}

// Load Todos function
function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
        const todoList = document.getElementById('todo-list');
        savedTodos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.text;

            if (todo.completed) {
                li.style.textDecoration = 'line-through';
            }

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.onclick = function () {
                li.style.textDecoration = 'line-through';
                saveTodos();
            };

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function () {
                deleteTodo(li);
            };

            li.appendChild(completeButton);
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }
}

// Ensure to call loadTodos when the page loads
document.addEventListener('DOMContentLoaded', loadTodos);
