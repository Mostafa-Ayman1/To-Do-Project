const beat = new Audio("audio/done.mp3");
let taskNumber = 0;
function checkInput() {
  if (task_form_name.value.length > 3) {
    return true;
  } else {
    return false;
  }
}

function addTask(task, state, priority, id, done) {
  // Select the container for tasks
  let rowsContainer = document.querySelector(".rows");

  // Create the main task row element
  let taskRow = document.createElement("div");
  let taskRowData = document.createElement("div");

  // Add classes and IDs
  taskRow.classList.add("row");
  taskRowData.classList.add("row-data");
  taskRowData.id = `task-${id}`;

  // HTML content for the task row
  let taskRowContent = `
    <div class="row-checkbox">
      <label for="todo-${id}" class="item">
        <input type="checkbox" id="todo-${id}" class="hidden" />
        <label for="todo-${id}" class="cbx">
          <svg width="14px" height="12px" viewBox="0 0 14 12">
            <polyline points="1 7.6 5 11 13 1"></polyline>
          </svg>
        </label>
        <label for="todo-${id}" class="cbx-lbl">${task}</label>
      </label>
    </div>
    <div class="info">
      <div class="row-state ${state.toLowerCase()}">${state}</div>
      <div class="row-priority ${priority.toLowerCase()}"><span class="circle"></span>${priority}</div>
    </div>
  `;

  // HTML content for task options
  let optionsContent = `
    <div class="options">
      <i class="fa-solid fa-trash-can" id="delete-task-${id}"></i>
    </div>
  `;

  // Set the HTML content for the task row
  taskRowData.innerHTML = taskRowContent;
  taskRow.appendChild(taskRowData);
  taskRow.innerHTML += optionsContent;

  // Append the task row to the container
  rowsContainer.appendChild(taskRow);

  // Set opacity and checkbox state based on 'done' parameter
  if (!done) taskNumber += 1;

  taskRow.style.opacity = done ? 0.3 : 1;
  taskRow.querySelector(`#todo-${id}`).checked = done;

  // Add event listeners for task options
  addEvents(id);
}

// Handle Events And Remove Taks

function addEvents(id) {
  let taskElement = document.getElementById(`task-${id}`);

  taskElement.addEventListener("click", () => {
    // Get the task element and its checked state
    let checkbox = document.getElementById(`todo-${id}`);
    let checked = checkbox.checked;

    // Update opacity based on checked state
    taskElement.parentNode.style.opacity = checked ? 1 : 0.3;

    // Update local storage and checkbox state based on checked state
    let [task, state, priority] = getLocal(id);
    saveLocal(task, state, priority, id, !checked);

    checkbox.checked = !checked;

    if (!checked) {
      beat.load();
      beat.play();

      taskNumber--;

      if (taskNumber > 1) task_num.innerHTML = `${taskNumber} tasks`;
      else task_num.innerHTML = `${taskNumber} task`;
    } else {
      beat.pause();
      taskNumber++;

      if (taskNumber > 1) task_num.innerHTML = `${taskNumber} tasks`;
      else task_num.innerHTML = `${taskNumber} task`;
    }
  });

  // Button Delete Events

  let btn_delete = document.getElementById(`delete-task-${id}`);

  btn_delete.addEventListener("click", () => {
    removeTask(id);
  });
}
function removeTask(id) {
  document.getElementById(`task-${id}`).parentNode.remove();
  localStorage.removeItem(`task-${id}`);
}

function removeTaskForm() {
  add_task_form.style.display = "none";
  add_task_form.style.opacity = 0;

  // Add Black Overlay To whole Page
  document.body.classList.remove("over-lay");
}

// Handle Local Stroge

function saveLocal(task, state, priority, id, done = false) {
  localStorage.setItem(`task-${id}`, [task, state, priority, done]);
}
function getLocal(id) {
  return localStorage.getItem(`task-${id}`).split(",");
}

// Handle ID

function getVaildId() {
  let length = localStorage.length;
  let id = 1;
  if (length > 0) {
    for (; id <= 100; id++) {
      if (!localStorage.getItem(`task-${id}`)) {
        return id;
      }
    }
  } else return id;
}

// Handle Errors

function showError(msg) {
  //To Prevent Form Diplicta Errors Display
  if (error === "") {
    //Set Error to inform  Function when call agaign the Error is already displayed
    error = msg;
    let span = document.createElement("span");
    span.classList.add("error-messege");
    span.innerHTML = error;
    span.id = "error-messege";
    task_form_name.classList.add("input-error");
    task_form_name.insertAdjacentElement("afterend", span);
  }
}
function removeError() {
  let span_error = document.getElementById("error-messege");
  if (span_error) {
    span_error.remove();
    task_form_name.classList.remove("input-error");
    error = "";
  }
}

// Display All Tasks

function Show() {
  let length = localStorage.length;
  for (let id = 1; id <= length; id++) {
    let [task, state, priority, done] = getLocal(id);
    addTask(task, state, priority, id, done === "true");
  }
}
