// Load existing todos from local storage on page load
window.onload = function() {
    loadTodos();
};

// Function to load existing todos from local storage
function loadTodos() {
    var todos = JSON.parse(localStorage.getItem("todos")) || [];
    var todoList = document.getElementById("todoList");

    // Clear existing todo list
    todoList.innerHTML = "";

    // Add each todo to the list
    todos.forEach(function(todo) {
        var li = createTodoElement(todo.text, todo.completed);
        todoList.appendChild(li);
    });
}
 

// Function to create a todo list item element
function createTodoElement(text, completed) {
    var li = document.createElement("li");
    li.textContent = text;
    if (completed) {
        li.classList.add("strike");
    }
    li.onclick = toggleTodo;

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = removeTodo;

    // Append the delete button to the end of the todo item
    li.appendChild(deleteButton);

    return li;
}


// Function to add a new todo
function addTodo() {
    var todoInput = document.getElementById("todoInput");
    var todoText = todoInput.value.trim();

    if (todoText === "") {
        alert("Please enter a todo!");
        return;
    }

    var li = createTodoElement(todoText, false);

    var todoList = document.getElementById("todoList");
    todoList.appendChild(li);

    // Save updated todo list to local storage
    saveTodos();

    // Clear the input field
    todoInput.value = "";
}

// Function to toggle the "completed" state of a todo
function toggleTodo() {
    this.classList.toggle("strike");

    // Save updated todo list to local storage
    saveTodos();
}

// Function to remove a todo
function removeTodo(event) {
    // Prevent the button click event from bubbling up to the parent li
    event.stopPropagation();

    var todoList = document.getElementById("todoList");
    var li = this.parentElement;
    todoList.removeChild(li);

    // Save updated todo list to local storage
    saveTodos();
}

// Function to save the current todo list to local storage
function saveTodos() {
    var todoList = document.getElementById("todoList");
    var todos = [];

    // Extract the text content and completion status of each todo item
    todoList.querySelectorAll("li").forEach(function(li) {
        todos.push({
            text: li.textContent,
            completed: li.classList.contains("strike")
        });
    });

    // Save the todo list to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}
