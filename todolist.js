let tasks = [];
let taskJSON;
const taskListElement = document.getElementById("task");
const buttonElement = document.getElementById("sendButton");

// getting value from inputValue textfield and then pushing it to tasks array
function addTaskToTaskList() {
  let inputValue = document.getElementById("textInput").value;
  // Only adding to tasks array if we have a value in inputValue
  if (inputValue !== "") {
    let task = { text: inputValue };
    tasks.push(task);
    taskLoop();
    saveTaskToLocalStorage();
  }
}

// Saving tasks to local storage
function saveTaskToLocalStorage() {
  taskJSON = JSON.stringify(tasks);
  localStorage.setItem("tasks", taskJSON);
  console.log(tasks);
}

// Function to create a div for every task in the tasks array
function taskLoop() {
  // Added to not get copies of previously added tasks when adding a new one.
  taskListElement.innerHTML = "";
  //   For loop creating div for task in tasks array.
  for (let task of tasks) {
    const taskElement = document.createElement("div");
    taskElement.innerText = task.text;
    taskListElement.appendChild(taskElement);

    // First check if the task has been completed, and if boolean = 1, we change the background to #8D3
    if (task.completed) {
      taskElement.style.backgroundColor = task.color;
    }

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

    // I got help from ChatGPT to get the following code to work. This after discussing the matter on the lecture about ChatGPT and that it could be okay.
    // Before using it, I could add the changed style to the task, but when updating it, the changes were gone.
    // Now after taking help, the task objects in the "tasks" array will have three properties, both a text string for the task collected from the text field, a boolean for if the task was completed or not and the background color saved.
    // Accessed 11 april, 2023

    completeButton.addEventListener("click", () => {
      // Changing the color on the background
      taskElement.style.backgroundColor = "#8D3";
      // Adding the values for completed and color to the array of tasks.
      task.completed = true;
      task.color = "#8D3";
      saveTaskToLocalStorage();
    });

    // Removing task when clicking on remove button
    const taskIndex = tasks.indexOf(task);
    removeButton.addEventListener("click", () => {
      tasks.splice(taskIndex, 1);
      taskLoop();
      saveTaskToLocalStorage();
    });
  }
}

const sendButton = document.getElementById("sendButton");
sendButton.addEventListener("click", addTaskToTaskList);

// loading tasks from local storage if we have a "tasks" value
// if we have that, it takes the value and changes ot from a JSON string to a JavaScript array with the name "tasks", then run the taskLoop() to display the different tasks in div's
// Then, we check if the "completed" property is true, and if it is, it changes the background color to the saved color in the array.
if (localStorage.tasks) {
  tasks = JSON.parse(localStorage.tasks);
  taskLoop();
  for (let task of tasks) {
    if (task.completed) {
      taskElement.style.backgroundColor = task.color;
    }
  }
}
