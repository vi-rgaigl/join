function renderDialogTaskOverview(task, contacts) {
  return `<div class="dialog-task-overview">
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
              <div class="dialog-menue-point">
                <img src="./assets/icons/edit.svg" alt="" /> Edit
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
  return /*HTML*/ ` <p>${namePrio}</p>
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
