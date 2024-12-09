let task = {
  id: "",
  assignedTo: false,
  category: "",
  description: "",
  dueDate: "",
  prio: "low",
  status: "to-do",
  subtasks: false,
  title: "",
};
let errorTask = {
  Title: false,
  DueDate: false,
  Category: false,
  Subtask: false,
};

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
    task.assignedTo = false;
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
 * change the Category
 * @param {event} event - input event
 */
function changeCategory(event) {
  task.category = event.target.value;
  errorMassage("", "Category");
  checkIfError();
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
 * Push the Data to firebase and clear the Form
 */
async function submitNewTask(ifDialog) {
  try {
    delete task.id;
    await pushData("tasks", task);
    // resetNewTask();
    if (!ifDialog) {
      setToLocalStorage("newTask", true);
      window.location.href = "./board.html";
    } else {
      showPopupMessage("addTask-popup-message", "Task added to board");
    }
    if (ifDialog) {
      loadData();
    }
  } catch (error) {
    console.warn(error);
  }
}

/**
 * Rendered all contatcs to the Dropdown
 */
function renderDropdownAssinged() {
  let dropdownRef = document.getElementById("dropdown-list");
  dropdownRef.innerHTML = getListOfUsers([], contacts);
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
  errorTask = { Title: true, DueDate: true, Category: true, Subtask: false };
  checkIfError();
}

/**
 * Cahnge the description in the task
 * @param {event} event - input event
 */
function changeDescription(event) {
  task.description = event.target.value;
}

/**
 * Cahnge the prio in the task
 * @param {event} event - input event
 */
function changePrio(event) {
  task.prio = event.target.value;
}

/**
 * Toggel the visibility of delete Subtask in edit task
 * @param {event} event - input event
 */
function changeVisibilityButton(event) {
  let subtaskBtnRef = document.getElementById("subtaskBtn");
  if (event.target.value.length > 0) {
    subtaskBtnRef.classList.add("subtaskBtnActive");
  } else {
    subtaskBtnRef.classList.remove("subtaskBtnActive");
  }
}

/**
 * created new Subtasks by Key enter
 * @param {event} event - Keyup event
 */
function keyUpInput(event) {
  if (event.key === "Enter") {
    addNewSubtask();
  }
}

/**
 * Added a new Subtask and render the list of Subtasks new
 */
function addNewSubtask() {
  let inputSubtasksRef = document.getElementById("inputSubtasks");
  let subtaskCheckBtnRef = document.getElementById("subtaskCheckBtn");
  let newSubtask = inputSubtasksRef.value;
  if (newSubtask != "") {
    let newSubtaskObj = { done: false, subtitle: newSubtask };
    if (task.subtasks === false) {
      task.subtasks = [newSubtaskObj];
    } else {
      task.subtasks.push(newSubtaskObj);
    }
    subtaskCheckBtnRef.classList.remove("subtaskCheckBtnActive");
    inputSubtasksRef.value = "";
    renderSubtasks(task);
  }
}

/**
 * Clear the input for Subtasks
 */
function clearNewSubtask() {
  let inputSubtasksRef = document.getElementById("inputSubtasks");
  let subtaskBtnRef = document.getElementById("subtaskBtn");
  inputSubtasksRef.value = "";
  subtaskBtnRef.classList.remove("subtaskBtnActive");
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
  if (task.subtasks.length > 1) {
    task.subtasks.splice(indexOfSubtak, 1);
  } else {
    task.subtasks = false;
  }
  renderSubtasks(task);
  checkSubtasks();
}

/**
 * Reset the completed Form
 */
function resetNewTask() {
  resetData(task.status);
  resetForm();
  resetErrorMassage();
}

/**
 * Reset the Data
 * @param {string} status - set the Status
 */
function resetData(status) {
  task = {
    id: "",
    assignedTo: false,
    category: "",
    description: "",
    dueDate: "",
    prio: "low",
    status: status,
    subtasks: false,
    title: "",
  };
}

/**
 * Reset the inputs
 */
function resetForm() {
  document.getElementById("inputTitle").value = "";
  document.getElementById("inputDescription").value = "";
  renderDropdownAssinged();
  renderAssignedTo(task);
  document.getElementById("inputDueDate").value = "";
  document.getElementById("inputPriorityLow").checked = true;
  document.getElementById("inputCategory").value = "";
  renderSubtasks(task);
}

/**
 * Reset the error Massage
 */
function resetErrorMassage() {
  errorMassage("", "Title");
  errorMassage("", "DueDate");
  errorMassage("", "Category");
  errorTask = { Title: true, DueDate: true, Category: true, Subtask: false };
  checkIfError();
}

/**
 * Change the value of the Subtask
 * @param {event} event - Input event
 * @param {number} indexOfSubtask - Index of the Subtask
 */
function changeSubtask(event, indexOfSubtask) {
  task.subtasks[indexOfSubtask].subtitle = event.target.value;
  checkSubtasks();
}

/**
 * Check if all Subtasks filled
 */
function checkSubtasks() {
  let listOfSubtasks = document.getElementsByClassName(
    "input-subtask-list-item"
  );
  let isError = false;
  if (listOfSubtasks.length > 0) {
    Array.from(listOfSubtasks).forEach((element) => {
      if (element.value == "") {
        isError = true;
        element.parentNode.classList.add("errorSubtask");
      } else {
        element.parentNode.classList.remove("errorSubtask");
      }
    });
  }
  errorTask.Subtask = isError;
  checkIfError();
}
