let tasks = [];
let contacts = [];
let dragginTaskId;

async function initLoadData() {
  try {
    tasks = await getData("tasks");
    contacts = await getData("contacts");
    renderTasks();

    let boardDialogRef = document.getElementById("boardDialog");
    boardDialogRef.showModal();
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
  boardDialogRef.innerHTML = renderDialogTaskEdit(getTask(id), contacts);
}
