function renderDialogTaskOverview(task, contacts) {
  return `
  <div class="dialog-scroll">
  <div class="dialog-task-overview">
          <div class="dialog-header">
          ${getCategory(task.category)}
            <div class="closeX" onclick="closeDialog()">
              <img src="./assets/icons/close.svg" alt="closeButton" />
            </div>
          </div>
          <h1>${task.title}</h1>
          <div>${task.description}</div>
          <div class="headline">
            Due date:
            <p>${formatDate(task.dueDate)}</p>
          </div>
          <div class="headline">
            Priority:
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

function formatDate(date) {
  return date.split("-").reverse().join("/");
}

function getPriority(prio) {
  let namePrio = prio.charAt(0).toUpperCase() + prio.slice(1);
  return `<p>${namePrio}</p>
          <img src="./assets/icons/${prio}-priority-small-color.svg"
          alt="prio-${prio}"/>`;
}

function getAssignInitialsName(listOfAssign, contacts) {
  let beginn = `<div class="headline">Assigned To:</div>`;
  if (listOfAssign !== false) {
    listOfAssign.forEach((assignId) => {
      let assignedContact = getAssignedContact(assignId, contacts);
      beginn += `<div class="dialog-assigned">
              <div
                class="assign-name"
                style="background-color: ${assignedContact.color}"
              >
              ${assignedContact.initials}
              </div>
              ${assignedContact.name}
            </div>`;
    });
  }
  return beginn;
}

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

function renderDialogTaskEdit(task, contacts) {
  return `<div class="dialog-header flex-end">
          <div class="closeX" onclick="closeDialog()">
            <img src="./assets/icons/close.svg" alt="closeButton" />
          </div>
        </div>
        <div class="formBoard">
          <div class="dialog-scroll dialog-scroll-edit w-100">
            <div class="input-row">
              <label for="inputTitle" class="lable">Title</label>
              <input type="text" class="input" id="inputTitle" />
              <div id="errorTitle" class="errorMassage">
                This field is reqiuert
              </div>
            </div>
            <div class="input-row">
              <label for="inputDescription" class="lable">Description</label>
              <textarea class="input" id="inputDescription"></textarea>
              <div id="errorDescription" class="errorMassage">
                This field is reqiuert
              </div>
            </div>
            <div class="input-row">
              <label for="inputDueDate" class="lable">Due Date</label>
              <input type="date" class="input" id="inputDueDate" />
              <div id="errorDueDate" class="errorMassage">
                This field is reqiuert
              </div>
            </div>
            <div class="input-row">
              <label for="inputPriority" class="lable">Priority</label>
              <div class="radio-btns">
                <div class="radio-container radio-urgent">
                  <input
                    type="radio"
                    id="inputPriorityUrgent"
                    name="inputPriority"
                    value="urgent"
                    checked
                  />
                  <label for="inputPriorityUrgent">Urgent</label>
                </div>
                <div class="radio-container radio-medium">
                  <input
                    type="radio"
                    id="inputPriorityMedium"
                    name="inputPriority"
                    value="medium"
                  />
                  <label for="inputPriorityMedium">Medium</label>
                </div>
                <div class="radio-container radio-low">
                  <input
                    type="radio"
                    id="inputPriorityLow"
                    name="inputPriority"
                    value="high"
                  />
                  <label for="inputPriorityLow">Low</label>
                </div>
              </div>
            </div>
            <div class="input-row">
              <label class="lable">Assinged to</label>
              <div class="input dropdown select-arrow" id="dropdownAssinged">
                <div class="dropdown-click" onclick="toggleDropdown()">
                  Select contacts to assign
                </div>
                <div class="dropdown-list">
                  <hr class="dropdown-hr" />
                  <div class="dropdown-list-item">
                    <input
                      type="checkbox"
                      id="user1"
                      name="assignedUsers"
                      value="TestUser"
                    />
                    <label for="user1"> Test User</label>
                  </div>
                  <div class="dropdown-list-item">
                    <input
                      type="checkbox"
                      id="user2"
                      name="assignedUsers"
                      value="TestUser2"
                    />
                    <label for="user2"> Test User 2</label>
                  </div>
                </div>
              </div>
              <div class="assinged-users" id="assingedUsers">
                <div
                  class="assign-name"
                  style="background-color: rgb(255, 87, 51)"
                >
                  AS
                </div>
                <div
                  class="assign-name"
                  style="background-color: rgb(255, 87, 51)"
                >
                  AS
                </div>
                <div
                  class="assign-name"
                  style="background-color: rgb(255, 87, 51)"
                >
                  AS
                </div>
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
                />
                <img
                  src="./assets/icons/checkWithoutCircle.svg"
                  alt="check"
                  class="subtaskCheckBtn"
                />
              </div>
              <div class="listSubtasks">
                <div class="subtask-list-item">
                  Das ist ein Test Subtask
                  <img
                    src="./assets/icons/delete.svg"
                    alt="delete"
                    class="subtask-list-img"
                  />
                </div>
                <div class="subtask-list-item">
                  Das ist ein Test Subtask
                  <img
                    src="./assets/icons/delete.svg"
                    alt="delete"
                    class="subtask-list-img"
                  />
                </div>
                <div class="subtask-list-item">
                  Das ist ein Test Subtask
                  <img
                    src="./assets/icons/delete.svg"
                    alt="delete"
                    class="subtask-list-img"
                  />
                </div>
                <div class="subtask-list-item">
                  Das ist ein Test Subtask
                  <img
                    src="./assets/icons/delete.svg"
                    alt="delete"
                    class="subtask-list-img"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="input-row form-submit-btn">
            <button onclick="submitEditTask()" class="button-blue button-check">
              OK <img src="./assets/icons/checkWithoutCircle.svg" alt="check" />
            </button>
          </div>
        </div>`;
}
