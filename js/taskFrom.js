/**
 * Toggel the status of dropdown
 */
function toggleDropdown() {
  let dropdownAssignedRef = document.getElementById("dropdownAssinged");
  dropdownAssignedRef.classList.toggle("dropdown-open");
}

/**
 * Close dropdown if click not on the dropdown
 */
function closeDropdown(event) {
  let dropdownRef = document.getElementById("dropdownAssinged");
  if (dropdownRef !== null) {
    if (event.target.dataset.dropdown !== "true") {
      dropdownRef.classList.remove("dropdown-open");
    }
  }
}

//
//    TODO Validation
//    !!!Auchtung nicht fertig!!!
//    !!!WIP!!!
//
//

//    TODO Check
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

//    TODO Check
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

//    TODO Check
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

//    TODO Check
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

//    TODO Check
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

//    TODO Check
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
  } else {
    errorRef.innerText = text;
    inputRef.classList.add("inputError");
  }
}
