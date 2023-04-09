let tasks = [];
const taskListElement = document.getElementById("task");
const buttonElement = document.getElementById("sendButton");

function addTaskToTaskList() {
  let inputValue = document.getElementById("textInput").value;
  tasks.push(inputValue);
  console.log(tasks);

  for (let task of tasks) {
    const taskElement = document.createElement("div");
    taskElement.innerText = task;
    taskListElement.appendChild(taskElement);
  }
}

const sendButton = document.getElementById("sendButton");
sendButton.addEventListener("click", addTaskToTaskList);

// Creating div's from the tasks array
