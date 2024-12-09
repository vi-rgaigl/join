/**
 * Generats the HTML for Dialog Overview
 * @param {object} task -Object of Task
 * @param {[]} contacts -List of all contacts
 * @returns HTMl for Dialog
 */
function renderDialogTaskOverview(task, contacts) {
  return `<div class="dialog-scroll">
            <div class="dialog-task-overview">
              <div class="dialog-header">
                ${getCategory(task.category)}
                <div class="closeX" onclick="closeDialog('boardDialog')">
                  <img src="./assets/icons/close.svg" alt="closeButton" />
                </div>
              </div>
              <h1 class="title">${task.title}</h1>
              <div>${task.description}</div>
              <div class="headline">Due date:
                <p>${formatDate(task.dueDate)}</p>
              </div>
              <div class="headline">Priority:
                ${getPriority(task.prio)}
              </div>
              <div>
              ${getAssignInitialsName(task.assignedTo, contacts)}
              </div>
              <div>
              ${getListOfSubtasks(task.subtasks, task.id)}
              </div>
              <div class="dialog-menue">
                <div class="dialog-menue-points">
                  <div class="dialog-menue-point" onclick="deleteTask('${
                    task.id
                  }')">
                  <img src="./assets/icons/delete.svg" alt="" /> Delete
                  </div>
                  <div class="dialog-menue-poinsts-seperator"></div>
                  <div class="dialog-menue-point" onclick="renderEditTask('${
                    task.id
                  }')">
                    <img src="./assets/icons/edit.svg" alt="" /> Edit
                  </div>
                </div>
              </div>
            </div>
          </div>`;
}

/**
 * Generats the HTML for Dialog Edit
 * @param {object} task -Object of Task
 * @param {[]} contacts -List of all contacts
 * @returns HTMl for Dialog
 */
function renderDialogTaskEdit(task, contacts) {
  return `<div class="dialog-header flex-end">
            <div class="closeX" onclick="closeDialogEdit()">
              <img src="./assets/icons/close.svg" alt="closeButton" />
            </div>
          </div>
          <div class="formBoard">
            <div class="dialog-scroll dialog-scroll-edit w-100">
              <div class="input-row">
                <label for="inputTitle" class="lable">Title<p class="lableRequiert">*</p></label>
                <input type="text" class="input" id="inputTitle" value="${
                  task.title
                }" oninput="changeTitle(event)"/>
                <div id="errorTitle" class="errorMassage">
                </div>
              </div>
              <div class="input-row">
                <label for="inputDescription" class="lable">Description</label>
                <textarea class="input" id="inputDescription" rows="4" oninput="changeDescription(event)">${
                  task.description
                }</textarea>
                <div id="errorDescription" class="errorMassage">
                </div>
              </div>
              <div class="input-row">
                <label for="inputDueDate" class="lable">Due Date<p class="lableRequiert">*</p></label>
                <input type="date" class="input" id="inputDueDate" value="${
                  task.dueDate
                }" oninput="changeDueDate(event)"/>
                <div id="errorDueDate" class="errorMassage">
                </div>
              </div>
              <div class="input-row">
                <label for="inputPriority" class="lable">Priority</label>
                <div class="radio-btns">
                  ${getPriorityEdit(task.prio)}
                </div>
              </div>
              <div class="input-row">
                <label class="lable">Assinged to</label>
                <div class="input dropdown select-arrow" id="dropdownAssinged" data-dropdown=true>
                  <div class="dropdown-click" onclick="toggleDropdown()" data-dropdown=true>
                    Select contacts to assign
                  </div>
                  <div class="dropdown-list" data-dropdown=true>
                    <hr class="dropdown-hr" data-dropdown=true/>
                    ${getListOfUsers(task.assignedTo, contacts)}
                  </div>
                </div>
                <div class="assinged-users" id="assingedUsers">
                ${getAssignInitialsNameEdit(task.assignedTo, contacts)}
                </div>
              </div>
              <div class="input-row">
                <label for="inputSubtasks" class="lable">Subtasks</label>
                <div class="input-group">
                  <input
                  type="text"
                  class="input-subtasks"
                  id="inputSubtasks"
                  placeholder="Add new Subtasks"
                  oninput="changeVisibilityButton(event)"
                  onkeyup="keyUpInput(event)"
                  />
                  <div class="subtaskBtn" id="subtaskBtn">
                    <img
                      src="./assets/icons/checkWithoutCircle.svg"
                      alt="check"
                      class="subtaskCheckBtn"
                      onclick="addNewSubtask()"
                      id="subtaskCheckBtn"
                    />
                    <div class="subtaskSep"></div>
                    <img
                      src="./assets/icons/close.svg"
                      alt="check"
                      class="subtaskClearBtn"  
                      onclick="clearNewSubtask()"                  
                      id="subtaskClearBtn"
                    />
                  </div>
                </div>
                <div class="listSubtasks" id="listSubtasks">
                ${getListOfSubtasksEdit(task.subtasks)}
                </div>
              </div>
            </div>
            <div class="input-row form-submit-btn">
              <div>
              <p class="lableRequiert">*</p>This field is required</div>
              <button onclick="submitEditTask('${
                task.id
              }')" id="btnSubmitEditTask" class="button-blue button-check">
                OK <img src="./assets/icons/checkWithoutCircle.svg" alt="check" />
              </button>
            </div>
          </div>`;
}

/**
 * Formats the date to the new format
 * @param {string} date -date in format YYYY-MM-DD
 * @returns date in format DD/MM/YYY
 */
function formatDate(date) {
  return date.split("-").reverse().join("/");
}

/**
 * Generats the HTML for Prio IMG
 * @param {string} prio name of prio
 * @returns HTML of prio Img
 */
function getPriority(prio) {
  let namePrio = prio.charAt(0).toUpperCase() + prio.slice(1);
  return `<p>${namePrio}</p>
          <img src="./assets/icons/${prio}-priority-small-color.svg"
          alt="prio-${prio}"/>`;
}

/**
 * Get the Radiobuttons for the Dialog
 * @param {string} prio - Value of the Prio
 * @returns HTML
 */
function getPriorityEdit(prio) {
  let inputPriorityUrgent = "";
  let inputPriorityMedium = "";
  let inputPriorityLow = "";

  switch (prio) {
    case "urgent":
      inputPriorityUrgent = "checked";
      break;
    case "medium":
      inputPriorityMedium = "checked";
      break;
    case "low":
      inputPriorityLow = "checked";
      break;
  }

  return `<div class="radio-container radio-urgent">
                  <input
                    type="radio"
                    id="inputPriorityUrgent"
                    name="inputPriority"
                    value="urgent"
                    oninput="changePrio(event)"
                    ${inputPriorityUrgent}
                  />
                  <label for="inputPriorityUrgent">Urgent</label>
                </div>
                <div class="radio-container radio-medium">
                  <input
                    type="radio"
                    id="inputPriorityMedium"
                    name="inputPriority"
                    value="medium"
                    oninput="changePrio(event)"
                    ${inputPriorityMedium}
                  />
                  <label for="inputPriorityMedium">Medium</label>
                </div>
                <div class="radio-container radio-low">
                  <input
                    type="radio"
                    id="inputPriorityLow"
                    name="inputPriority"
                    value="low"
                    oninput="changePrio(event)"
                    ${inputPriorityLow}
                  />
                  <label for="inputPriorityLow">Low</label>
                </div>`;
}

/**
 * Get the List of Assign Users for Dialog Overview
 * @param {[]} listOfAssign - List of Assign Users
 * @param {[]} contacts - List of all Users
 * @returns HTML
 */
function getAssignInitialsName(listOfAssign, contacts) {
  let beginn = `<div class="headline">Assigned To:</div>`;
  if (listOfAssign !== false) {
    listOfAssign.forEach((assignId) => {
      let assignedContact = getAssignedContact(assignId, contacts);
      if (assignedContact != undefined) {
        beginn += `<div class="dialog-assigned" >
              <div
                class="assign-name"
                style="background-color: ${assignedContact.color}"
              >
              ${assignedContact.initials}
              </div>
              ${assignedContact.name}
            </div>`;
      }
    });
  }
  return beginn;
}

/**
 * Get the List of Assign Users for Dialog Edit
 * @param {[]} listOfAssign - List of Assign Users
 * @param {[]} contacts - List of all Users
 * @returns HTML
 */
function getAssignInitialsNameEdit(listOfAssign, contacts) {
  let beginn = ``;
  let numberOfIcons = 0;
  let numberOfUsers = 0;
  if (listOfAssign !== false) {
    listOfAssign.forEach((assignId) => {
      let assignedContact = getAssignedContact(assignId, contacts);
      if (assignedContact != undefined && numberOfIcons < 5) {
        numberOfIcons++;
        beginn += getIconAssig(assignedContact);
      }
      numberOfUsers++;
    });
    if (numberOfUsers > 5) {
      beginn += getIconsOverflow(numberOfUsers);
    }
  }
  return beginn;
}

/**
 * Generats the HTML of Icon assign contacts
 * @param {{}} assignedContact - Assigned Contact
 * @returns HTML of Icon User
 */
function getIconAssig(assignedContact) {
  return ` <div class="assign-name" style="background-color: ${assignedContact.color}">
              ${assignedContact.initials}
            </div>`;
}

/**
 * Generats the HTML of Icon with numbers of assign contacts
 * @param {number} numberOfUsers - Number of all Users
 * @returns HTML of placeholder Icon
 */
function getIconsOverflow(numberOfUsers) {
  return ` <div class="assign-name" style="background-color: #919191">${
    numberOfUsers - 5
  }+
            </div>`;
}

/**
 * Get the List of Subtasks for Dialog Overview
 * @param {[]} subtasks - List of Subtasks
 * @returns HTML
 */
function getListOfSubtasks(subtasks, id) {
  if (subtasks === false) {
    return "";
  } else {
    let headline = `<div class="headline">Subtasks</div>`;

    subtasks.forEach((subtask, index) => {
      let nameImg = subtask.done ? "checked" : "unchecked";
      headline += `<div class="dialog-subtask">
        <img src="./assets/icons/check-button-${nameImg}.svg" alt="Task_${nameImg}" onclick="subtasktChangeDone('${index}','${id}')"/>
        ${subtask.subtitle}
      </div>`;
    });
    return headline;
  }
}

/**
 * Get the List of Subtasks for Dialog Edit
 * @param {[]} subtasks - List of Subtasks
 * @returns HTML
 */
function getListOfSubtasksEditold(subtasks) {
  let html = "";
  if (subtasks === false) {
    return "";
  } else {
    subtasks.forEach((subtask, index) => {
      html += `<div class="subtask-list-item" data-done="${subtask.done}">
      ${subtask.subtitle}
      <img
        src="./assets/icons/delete.svg"
        alt="delete"
        class="subtask-list-img"
        onclick="deleteSubtask(${index})"
      />
    </div>`;
    });
    return html;
  }
}

function getListOfSubtasksEdit(subtasks) {
  let html = "";
  if (subtasks === false) {
    return "";
  } else {
    subtasks.forEach((subtask, index) => {
      html += `<div class="subtask-list-item" data-done="${subtask.done}">
      <input oninput="changeSubtask(event,${index})" class="input-subtask-list-item" type="text" value="${subtask.subtitle}">
      <img
        src="./assets/icons/delete.svg"
        alt="delete"
        class="subtask-list-img"
        onclick="deleteSubtask(${index})"
      />
    </div>`;
    });
    return html;
  }
}

/**
 * Generats the HTML for dropdown
 * @param {[]} assignedTo -List of assigned contacts
 * @param {[]} contacts -List of all contacts
 * @returns HTML for dropdown
 */
function getListOfUsers(assignedTo, contacts) {
  let html = "";
  contacts.forEach((contact) => {
    html += `<div class="dropdown-list-item" data-dropdown=true>
              <input
                data-dropdown=true
                type="checkbox"
                id="user${contact.id}"
                name="assignedUsers"
                value="${contact.id}"
                onchange="changeAssignedTo(event)"
                ${ifUserAssigned(assignedTo, contact.id)}
                />
              <label for="user${contact.id}" data-dropdown=true>${
      contact.name
    }</label>
            </div>`;
  });

  return html;
}

/**
 * Checked if contact assigned
 * @param {[]} assignedTo -List of assigned contacts
 * @param {string} userId -ID of contact
 * @returns checked if assigned
 */
function ifUserAssigned(assignedTo, userId) {
  if (assignedTo === false) {
    return "";
  } else {
    return assignedTo.includes(userId) ? "checked" : "";
  }
}
