let error = "";
const add_task_button = document.getElementById("add-task-button");
const task_num = document.querySelector(".tasks-num");

// Show Add Task Form
add_task_button.addEventListener("click", () => {
  add_task_form.style.display = "block";
  add_task_form.style.opacity = 1;

  // Add Black Overlay To whole Page
  document.body.classList.add("over-lay");
});

//Form Elements
const add_task_form = document.getElementById("add-form");
const task_form_name = document.getElementById("form-name");
const task_form_state = document.getElementById("form-state");
const task_form_priority = document.getElementById("form-priority");
const task_form_button = document.getElementById("form-submit");

//Add New Task
task_form_button.addEventListener("click", (e) => {
  //First Prevent Sumbit button Form Send Data
  e.preventDefault();
  if (checkInput()) {
    removeError();

    let task = task_form_name.value;
    let state = task_form_state.value;
    let priority = task_form_priority.value;
    let id = getVaildId();

    console.log(id);

    addTask(task, state, priority, id);
    saveLocal(task, state, priority, id);

    removeTaskForm();
  } else {
    showError("Task Name Must be More Than 3 Charecters");
  }
});

task_form_name.addEventListener("blur", () => {
  if (!checkInput()) {
    showError("Task Name Must be More Than 3 Charecters");
  } else {
    removeError();
  }
});

//Functions

Show();

if (taskNumber > 1) task_num.innerHTML = `${taskNumber} tasks`;
else task_num.innerHTML = `${taskNumber} task`;
