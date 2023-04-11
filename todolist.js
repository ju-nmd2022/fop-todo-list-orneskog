let tasks = [];
let arrayJSON;
const taskListElement = document.getElementById("task");
const buttonElement = document.getElementById("sendButton");

// getting value from inputValue textfield and then pushing it to tasks array
function addTaskToTaskList() {
  let inputValue = document.getElementById("textInput").value;
  tasks.push(inputValue);
  taskLoop();
  saveToLocalStorage();
}

// Saving tasks to local storage
function saveToLocalStorage() {
  arrayJSON = JSON.stringify(tasks);
  localStorage.tasks = arrayJSON;
}

// Function to create a div for every task in the tasks array
function taskLoop() {
  taskListElement.innerHTML = "";
  //   For loop creating div for task in tasks array.
  for (let task of tasks) {
    const taskElement = document.createElement("div");
    taskElement.innerText = task;
    taskListElement.appendChild(taskElement);
    taskElement.classList.add("completedTask");

    // Creating a button for completing a task
    const completeButton = document.createElement("span");
    completeButton.innerText = "✔️";
    taskElement.appendChild(completeButton);
    completeButton.classList.add("buttonSpace");

    // Creating a button for removing a task
    const removeButton = document.createElement("span");
    removeButton.innerText = "❌";
    taskElement.appendChild(removeButton);
    removeButton.classList.add("buttonSpace");

    // Changing color on task when clicking on button
    completeButton.addEventListener("click", () => {
      taskElement.style = "background-color: #fff;";
    });

    // Removing task when clicking on remove button
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

// loading tasks from local storrage if we have a value in it
if (localStorage.tasks) {
  tasks = JSON.parse(localStorage.tasks);
}
//  Calling taskLoop to print out the saved tasks
taskLoop();
