let tasks = [];
let contacts = [];
let dragginTaskId;

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
