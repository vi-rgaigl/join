let tasks = [];
let contacts = [];
let dragginTaskId;
let editTask;
let errorEditTask = { Title: false, DueDate: false };

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
  let rowToDoRef = document.getElementById("to-do");
  let rowInProgessRef = document.getElementById("in-progress");
  let rowAwaitFeedbackRef = document.getElementById("await-feedback");
  let rowDoneRef = document.getElementById("done");
  rowToDoRef.innerHTML = getTemplateCards("to-do", filtersTask, contacts);
  rowInProgessRef.innerHTML = getTemplateCards(
    "in-progress",
    filtersTask,
    contacts
  );
  rowAwaitFeedbackRef.innerHTML = getTemplateCards(
    "await-feedback",
    filtersTask,
    contacts
  );
  rowDoneRef.innerHTML = getTemplateCards("done", filtersTask, contacts);
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
 * Disable the standart of Drag and Drop
 * @param {*} ev Drag and Drop event
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Save the id of the dragging Obj and activate the dragging area
 * @param {string} id - of the dragging task
 */
function startDragging(id) {
  document.getElementById(id).classList.add("on-dragging");
  let draggingAreas = document.getElementsByClassName("drag-area");
  for (let i = 0; i < draggingAreas.length; i++) {
    draggingAreas[i].classList.add("drag-area-active");
  }
  dragginTaskId = id;
}

/**
 * Deaktivate the dragging area
 * @param {string} id - of the dragging task
 */
function endDragging(id) {
  document.getElementById(id).classList.remove("on-dragging");
  let draggingAreas = document.getElementsByClassName("drag-area");
  for (let i = 0; i < draggingAreas.length; i++) {
    draggingAreas[i].classList.remove("drag-area-active");
  }
}

/**
 * Set the status of dragging task to newStatus and load data new.
 * @param {string} newStatus - New status of the dragging Task
 */
async function moveTo(newStatus) {
  let task = tasks.find((task) => task.id === dragginTaskId);
  task.status = newStatus;
  try {
    await changeData("tasks", task);
    loadData();
  } catch (error) {
    console.warn(error);
  }
}

/**
 * Highlight the status who is hover of dragging Task
 * @param {string} status - Name of status to highlight
 */
function highlight(status) {
  document
    .getElementById(status + "-drag-area")
    .classList.add("drag-area-active-highlight");
}

/**
 * Remove highlight of status who is hover of dragging Task
 * @param {string} status - Name of status to highlight
 */
function removeHighlight(status) {
  document
    .getElementById(status + "-drag-area")
    .classList.remove("drag-area-active-highlight");
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
function closeDialog() {
  let boardDialogRef = document.getElementById("boardDialog");
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
  renderOverviewTask(editTask.id);
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
    closeDialog();
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
  editTask = structuredClone(getTask(id));
  boardDialogRef.innerHTML = renderDialogTaskEdit(editTask, contacts);
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
 * Toggel the status of dropdown
 */
function toggleDropdown() {
  let dropdownAssignedRef = document.getElementById("dropdownAssinged");
  dropdownAssignedRef.classList.toggle("dropdown-open");
}

/**
 * validate the title and change in the task
 * @param {event} event - input event
 */
function changeTitle(event) {
  let title = event.target.value;
  if (title.length > 0) {
    errorMassage("", "Title");
  } else {
    errorMassage("This field is required.", "Title");
  }
  checkIfError();
  editTask.title = title;
}

/**
 * Change the description in the task
 * @param {event} event - input event
 */
function changeDescription(event) {
  editTask.description = event.target.value;
}

/**
 * validate the due date and change in the task
 * @param {event} event - input event
 */
function changeDueDate(event) {
  let dueDate = event.target.value;
  if (dueDate.length <= 0) {
    errorMassage("This field is required.", "DueDate");
  } else if (checkIfPast(dueDate)) {
    errorMassage("The date must be in the future.", "DueDate");
  } else {
    errorMassage("", "DueDate");
  }
  checkIfError();
  editTask.dueDate = dueDate;
}

/**
 * Set the error to the input field
 * @param {string} text - Error massage to render
 * @param {string} field - Field to set the error
 */
function errorMassage(text, field) {
  let errorRef = document.getElementById(`error${field}`);
  let inputRef = document.getElementById(`input${field}`);
  if (text == "") {
    errorRef.innerText = text;
    inputRef.classList.remove("inputError");
    errorEditTask[field] = false;
  } else {
    errorRef.innerText = text;
    inputRef.classList.add("inputError");
    errorEditTask[field] = true;
  }
}

/**
 * Check if the Date is past
 * @param {string} date - in format YYYY-MM-DD
 * @returns true if the date is past
 */
function checkIfPast(date) {
  let dateTask = new Date(date + ":00:00.000");
  let dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0);
  return dateTask < dateNow;
}

/**
 * Change the prio in the task
 * @param {event} event - input event
 */
function changePrio(event) {
  editTask.prio = event.target.value;
}

/**
 * Change the assignedTo in the task
 * @param {event} event - input event
 */
function changeAssignedTo(event) {
  let assignedUsersRefs = document.querySelectorAll(
    "input[type=checkbox][name=assignedUsers]"
  );
  let AssignedToIds = Array.from(assignedUsersRefs)
    .filter((i) => i.checked)
    .map((i) => i.value);
  if (AssignedToIds.length > 0) {
    editTask.assignedTo = AssignedToIds;
  } else {
    return false;
  }
  renderAssignedTo(editTask);
}

/**
 * rendered the Names of assigned contacs
 * @param {object} task - set the assigned Names
 */
function renderAssignedTo(task) {
  let assingedUsersRef = document.getElementById("assingedUsers");
  assingedUsersRef.innerHTML = getAssignInitialsNameEdit(
    task.assignedTo,
    contacts
  );
}

/**
 * Toggel the visibility of delete Subtask in edit task
 * @param {event} event - input event
 */
function changeVisibilityButton(event) {
  let subtaskCheckBtnRef = document.getElementById("subtaskCheckBtn");
  if (event.target.value.length > 0) {
    subtaskCheckBtnRef.classList.add("subtaskCheckBtnActive");
  } else {
    subtaskCheckBtnRef.classList.remove("subtaskCheckBtnActive");
  }
}

/**
 * Added a new Subtask and render the list of Subtasks new
 */
function addNewSubtask() {
  let inputSubtasksRef = document.getElementById("inputSubtasks");
  let subtaskCheckBtnRef = document.getElementById("subtaskCheckBtn");
  let newSubtask = inputSubtasksRef.value;
  let newSubtaskObj = { done: false, subtitle: newSubtask };
  if (editTask.subtasks === false) {
    editTask.subtasks = [newSubtaskObj];
  } else {
    editTask.subtasks.push(newSubtaskObj);
  }
  subtaskCheckBtnRef.classList.remove("subtaskCheckBtnActive");
  inputSubtasksRef.value = "";
  renderSubtasks(editTask);
}

/**
 * Rendered the Subtasks of task
 * @param {object} task - Object to render
 */
function renderSubtasks(task) {
  let listSubtasksRef = document.getElementById("listSubtasks");
  listSubtasksRef.innerHTML = getListOfSubtasksEdit(task.subtasks);
}

/**
 * Delet the Subtask and render list of Subtask new
 * @param {number} indexOfSubtak - index of Subtask
 */
function deleteSubtask(indexOfSubtak) {
  editTask.subtasks.splice(indexOfSubtak, 1);
  renderSubtasks(editTask);
}

/**
 * Check if a error of Input and disable the button submit
 */
function checkIfError() {
  let btnSubmitEditTaskRef = document.getElementById("btnSubmitEditTask");
  let isError = false;
  for (const [key, value] of Object.entries(errorEditTask)) {
    if (value) {
      isError = true;
    }
  }
  btnSubmitEditTaskRef.disabled = isError;
}

/**
 * change the the task with the edits and load the Data new. Render task overview
 * @param {string} id - ID of task
 */
async function submitEditTask(id) {
  try {
    await changeData("tasks", editTask);
    await loadData();
    renderOverviewTask(id);
  } catch (error) {
    console.warn(error);
  }
}
