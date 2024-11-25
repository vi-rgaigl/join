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
