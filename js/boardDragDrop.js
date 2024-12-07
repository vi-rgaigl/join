/**
 * Disable the standart of Drag and Drop
 * @param {*} ev Drag and Drop event
 */
function allowDrop(ev) {
  ev.preventDefault();
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
 * Changes the status of a task and updates the data.
 * @param {Event} event - The event object.
 * @param {string} newStatus - The new status to set for the task.
 * @param {number} id - The ID of the task to update.
 */
async function changeStatus(event, newStatus, id) {
  event.stopPropagation();
  let task = tasks.find((task) => task.id === id);
  task.status = newStatus;
  try {
    await changeData("tasks", task);
    loadData();
  } catch (error) {
    console.warn(error);
  }
}

/**
 * Opens the menu and stops the event from propagating.
 * @param {Event} event - The event object.
 */
function openMenue(event) {
  event.stopPropagation();
}
