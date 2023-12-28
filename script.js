
// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${taskInput.value}</span>
            <button onclick="toggleTaskCompletion(this)">Complete</button>
            <button onclick="removeTask(this)">Remove</button>
        `;
        taskList.appendChild(taskItem);
        saveTaskToLocalStorage(taskInput.value);
        taskInput.value = "";
    }
}

function toggleTaskCompletion(button) {
    const taskItem = button.parentNode;
    taskItem.classList.toggle("completed");

    // Update the completion status in local storage
    const taskText = taskItem.querySelector("span").innerText;
    updateTaskCompletionInLocalStorage(taskText);
}

function removeTask(button) {
    const taskItem = button.parentNode;
    taskItem.remove();

    // Remove the task from local storage
    const taskText = taskItem.querySelector("span").innerText;
    removeTaskFromLocalStorage(taskText);
}

function saveTaskToLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push({ text: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskCompletionInLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.map((task) => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter((task) => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    const tasks = getTasksFromLocalStorage();

    tasks.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <button onclick="toggleTaskCompletion(this)">Complete</button>
            <button onclick="removeTask(this)">Remove</button>
        `;
        if (task.completed) {
            taskItem.classList.add("completed");
        }
        taskList.appendChild(taskItem);
    });
}


