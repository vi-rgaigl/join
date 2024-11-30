let task = {
  id: "",
  assignedTo: false,
  category: "",
  description: "",
  dueDate: "",
  prio: "",
  status: "",
  subtasks: false,
  title: "",
};
let errorTask = { Title: false, DueDate: false, Category: false };

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
    task.assignedTo = AssignedToIds;
  } else {
    return false;
  }
  renderAssignedTo(task);
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
 * validate the title and change in the task
 * @param {event} event - input event
 */
function changeTitle(event) {
  let title = event.target.value;
  if (title.length > 0) {
    errorMassage("", "Title");
    checkIfError;
  } else {
    errorMassage("This field is required.", "Title");
  }
  checkIfError();
  task.title = title;
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
  task.dueDate = dueDate;
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
    errorTask[field] = false;
  } else {
    errorRef.innerText = text;
    inputRef.classList.add("inputError");
    errorTask[field] = true;
  }
}

/**
 * Check if a error of Input and disable the button submit
 */
function checkIfError() {
  let btnSubmitEditTaskRef = document.getElementById("btnSubmitEditTask");
  let isError = false;
  for (const [key, value] of Object.entries(errorTask)) {
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
    await changeData("tasks", task);
    await loadData();
    renderOverviewTask(id);
  } catch (error) {
    console.warn(error);
  }
}

/**
 * Find the Object of contact
 * @param {string} assignId -ID of assigned contacts
 * @param {[]} contacts -List of all contatcs
 * @returns Object of contact
 */
function getAssignedContact(assignId, contacts) {
  return contacts.find((contact) => {
    return contact.id === assignId;
  });
}

/**
 * Set submit button initail disable
 */
function setButtenDisable() {
  errorTask = { Title: true, DueDate: true, Category: true };
  checkIfError();
}
