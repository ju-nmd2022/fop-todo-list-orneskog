let tasks = [];
const taskListElement = document.getElementById("task");
const buttonElement = document.getElementById("sendButton");

let arrayJSON;

function addTaskToTaskList() {
  let inputValue = document.getElementById("textInput").value;
  tasks.push(inputValue);
  taskLoop();
  saveToLocalStorage();
}

function saveToLocalStorage() {
  arrayJSON = JSON.stringify(tasks);
  localStorage.tasks = arrayJSON;
}

function taskLoop() {
  taskListElement.innerHTML = "";
  for (let task of tasks) {
    const taskElement = document.createElement("div");
    taskElement.innerText = task;
    taskListElement.appendChild(taskElement);
    taskElement.classList.add("completedTask");

    const completeButton = document.createElement("span");
    completeButton.innerText = "✔️";
    taskElement.appendChild(completeButton);
    completeButton.classList.add("buttonSpace");

    const removeButton = document.createElement("span");
    removeButton.innerText = "❌";
    taskElement.appendChild(removeButton);
    removeButton.classList.add("buttonSpace");

    completeButton.addEventListener("click", () => {
      taskElement.style = "background-color: #fff;";
    });

    const taskIndex = tasks.indexOf(task);
    removeButton.addEventListener("click", () => {
      tasks.splice(taskIndex, 1);
      taskLoop();
      saveToLocalStorage();
    });
  }
}

const sendButton = document.getElementById("sendButton");
sendButton.addEventListener("click", addTaskToTaskList);

if (localStorage.tasks) {
  tasks = JSON.parse(localStorage.tasks);
}

taskLoop();
