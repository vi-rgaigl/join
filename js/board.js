let tasks = [];
let contacts = [];
let dragginTaskId;

function ifNewTastAdded() {
  if (getFromLocalStorage("newTask")) {
    showPopupMessage("addTask-popup-message", "Task added to board");
    removeFromLocalStorage("newTask");
  }
}

/**
 * Inital load of all Data from Firebase
 */
async function initLoadData() {
  try {
    tasks = await getData("tasks");
    contacts = await getData("contacts");
    renderTasks();
  } catch (error) {
    console.warn(error);
  }
}

/**
 * Load Tasks from Firebase and render Tasks overview
 */
async function loadData() {
  try {
    tasks = await getData("tasks");
    renderTasks();
  } catch (error) {
    console.warn(error);
  }
}

/**
 * Render the Task overview
 */
function renderTasks() {
  let filtersTask = filterTask(tasks);
  let listOfRows = ["to-do", "in-progress", "await-feedback", "done"];
  for (let i = 0; i < listOfRows.length; i++) {
    let rowRef = document.getElementById(listOfRows[i]);
    rowRef.innerHTML = getTemplateCards(listOfRows[i], filtersTask, contacts);
  }
}

/**
 * Filter the Tasks by Serache input
 * @param {[]} tasks -List of all tasks
 * @returns Filtered list
 */
function filterTask(tasks) {
  let filterWord = document.getElementById("inputSearch").value;
  if (filterWord.length > 0) {
    return tasks.filter((task) => filterByKeyword(task, filterWord));
  } else {
    return tasks;
  }
}

/**
 * Filterfunction for filtering by filterword
 * @param {object} data -for filter
 * @param {string} filterWord -word for filtering
 */
function filterByKeyword(data, filterWord) {
  const { title, description } = data;
  const keyword = filterWord.toLowerCase();
  return (
    (title && title.toLowerCase().includes(keyword)) ||
    (description && description.toLowerCase().includes(keyword))
  );
}

/**
 * Open the Dialog with overview of the Task
 * @param {string} id - of Task
 */
function openDialog(id) {
  let boardDialogRef = document.getElementById("boardDialog");
  boardDialogRef.innerHTML = renderDialogTaskOverview(getTask(id), contacts);
  boardDialogRef.showModal();
}

/**
 * Close the Dialog with animation
 */
function closeDialog(dialog) {
  let boardDialogRef = document.getElementById(dialog);
  boardDialogRef.classList.add("hide");
  boardDialogRef.addEventListener(
    "webkitAnimationEnd",
    function () {
      boardDialogRef.classList.remove("hide");
      boardDialogRef.close();
      boardDialogRef.removeEventListener(
        "webkitAnimationEnd",
        arguments.callee,
        false
      );
    },
    false
  );
}

/**
 * Close the Edit Dialog and rendered the Overview
 */
function closeDialogEdit() {
  renderOverviewTask(task.id);
}

/**
 * Find the Object of task with id
 * @param {string} id - of the task
 * @returns the object of the task
 */
function getTask(id) {
  return tasks.find((task) => {
    return task.id === id;
  });
}

/**
 * Toggel the status of Subtask and render the Overview new
 * @param {string} idSubtask - ID of the Subtask
 * @param {string} idTask - ID od the Task
 */
async function subtasktChangeDone(idSubtask, idTask) {
  let currentTask = getTask(idTask);
  currentTask.subtasks[idSubtask].done = !currentTask.subtasks[idSubtask].done;
  try {
    await changeData("tasks", currentTask);
    tasks = await getData("tasks");
    renderTasks();
    openDialog(idTask);
  } catch (error) {
    console.warn(error);
  }
}

/**
 * Delet the Task and render the Overview new
 * @param {string} idTask - ID of Task
 */
async function deleteTask(idTask) {
  let currentTask = getTask(idTask);
  try {
    await deleteData("tasks", currentTask);
    loadData();
    closeDialog("boardDialog");
  } catch (error) {
    console.warn(error);
  }
}

/**
 * Render the edit dialog of task
 * @param {string} id - ID of Task
 */
function renderEditTask(id) {
  let boardDialogRef = document.getElementById("boardDialog");
  task = structuredClone(getTask(id));
  boardDialogRef.innerHTML = renderDialogTaskEdit(task, contacts);
}

/**
 * Render the overview dialog of task
 * @param {string} id - ID of Task
 */
function renderOverviewTask(id) {
  let boardDialogRef = document.getElementById("boardDialog");
  boardDialogRef.innerHTML = renderDialogTaskOverview(getTask(id), contacts);
}

/**
 * Opens the Add Task dialog with a specific status.
 * @param {string} status - The status to set for the new task.
 */
function openDialogAddTask(status) {
  let addTaskDialogRef = document.getElementById("addTaskDialog");
  addTaskDialogRef.innerHTML = getTemplateAddTask(true);
  renderDropdownAssinged();
  setButtenDisable();
  task.status = status;
  addTaskDialogRef.showModal();
}
