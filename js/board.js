let tasks = [];
let contacts = [];
let dragginTaskId;
let editTask;
let errorEditTask = { Title: false, DueDate: false };

async function initLoadData() {
  try {
    tasks = await getData("tasks");
    contacts = await getData("contacts");
    renderTasks();
  } catch (error) {
    console.warn(error);
  }
}

async function loadData() {
  try {
    tasks = await getData("tasks");
    renderTasks();
  } catch (error) {
    console.warn(error);
  }
}

function renderTasks() {
  let rowToDoRef = document.getElementById("to-do");
  let rowInProgessRef = document.getElementById("in-progress");
  let rowAwaitFeedbackRef = document.getElementById("await-feedback");
  let rowDoneRef = document.getElementById("done");
  rowToDoRef.innerHTML = getTemplateCards("to-do", tasks, contacts);
  rowInProgessRef.innerHTML = getTemplateCards("in-progress", tasks, contacts);
  rowAwaitFeedbackRef.innerHTML = getTemplateCards(
    "await-feedback",
    tasks,
    contacts
  );
  rowDoneRef.innerHTML = getTemplateCards("done", tasks, contacts);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function startDragging(id) {
  document.getElementById(id).classList.add("on-dragging");
  let draggingAreas = document.getElementsByClassName("drag-area");
  for (let i = 0; i < draggingAreas.length; i++) {
    draggingAreas[i].classList.add("drag-area-active");
  }
  dragginTaskId = id;
}
function endDragging(id) {
  document.getElementById(id).classList.remove("on-dragging");
  let draggingAreas = document.getElementsByClassName("drag-area");
  for (let i = 0; i < draggingAreas.length; i++) {
    draggingAreas[i].classList.remove("drag-area-active");
  }
}

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

function removeHighlight(status) {
  document
    .getElementById(status + "-drag-area")
    .classList.remove("drag-area-active-highlight");
}

function highlight(status) {
  document
    .getElementById(status + "-drag-area")
    .classList.add("drag-area-active-highlight");
}

function openDialog(id) {
  let boardDialogRef = document.getElementById("boardDialog");
  boardDialogRef.innerHTML = renderDialogTaskOverview(getTask(id), contacts);
  boardDialogRef.showModal();
}

function closeDialogEdit() {
  renderOverviewTask(editTask.id);
}

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

function getTask(id) {
  return tasks.find((task) => {
    return task.id === id;
  });
}

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

function renderEditTask(id) {
  let boardDialogRef = document.getElementById("boardDialog");
  editTask = structuredClone(getTask(id));
  boardDialogRef.innerHTML = renderDialogTaskEdit(editTask, contacts);
}

function renderOverviewTask(id) {
  let boardDialogRef = document.getElementById("boardDialog");
  boardDialogRef.innerHTML = renderDialogTaskOverview(getTask(id), contacts);
}

function toggleDropdown() {
  let dropdownAssignedRef = document.getElementById("dropdownAssinged");
  dropdownAssignedRef.classList.toggle("dropdown-open");
}

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

function changeDescription(event) {
  editTask.description = event.target.value;
}

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

function checkIfPast(date) {
  let dateTask = new Date(date + ":00:00.000");
  let dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0);
  return dateTask < dateNow;
}

function changePrio(event) {
  editTask.prio = event.target.value;
}

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

function renderAssignedTo(task) {
  let assingedUsersRef = document.getElementById("assingedUsers");
  assingedUsersRef.innerHTML = getAssignInitialsNameEdit(
    task.assignedTo,
    contacts
  );
}

function changeVisibilityButton(event) {
  let subtaskCheckBtnRef = document.getElementById("subtaskCheckBtn");
  if (event.target.value.length > 0) {
    subtaskCheckBtnRef.classList.add("subtaskCheckBtnActive");
  } else {
    subtaskCheckBtnRef.classList.remove("subtaskCheckBtnActive");
  }
}

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

function renderSubtasks(task) {
  let listSubtasksRef = document.getElementById("listSubtasks");
  listSubtasksRef.innerHTML = getListOfSubtasksEdit(task.subtasks);
}

function deleteSubtask(indexOfSubtak) {
  editTask.subtasks.splice(indexOfSubtak, 1);
  renderSubtasks(editTask);
}

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

async function submitEditTask(id) {
  try {
    await changeData("tasks", editTask);
    await loadData();
    renderOverviewTask(id);
  } catch (error) {
    console.warn(error);
  }
}
