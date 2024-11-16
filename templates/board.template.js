function getTemplateCards(list, tasks, contacts) {
  let templateDragArea = `<div id="${list}-drag-area" class="drag-area"></div>`;
  let tasksOfList = findTasks(list, tasks);
  if (tasksOfList.length > 0) {
    let html = "";
    tasksOfList.forEach((task) => {
      html += getTemplateCard(task, contacts);
    });
    return html + templateDragArea;
  } else {
    return `<div class="cardNoTask">No Task To do</div>` + templateDragArea;
  }
}

function findTasks(list, tasks) {
  return tasks.filter((task) => {
    return task.status === list;
  });
}

function getTemplateCard(task, contacts) {
  return `<div class="cardTask" id="${task.id}" ondragstart="startDragging('${
    task.id
  }')" ondragend="endDragging('${task.id}')" draggable="true">
                ${getCategory(task.category)}
                <div class="card-title">
                  ${task.title}
                  <div class="card-description">
                    ${getDescription(task.description)}
                  </div>
                </div>
                
                  ${getSubtasks(task.subtasks)}
                
                <div class="card-footer">
  ${getAssignName(task.assignedTo, contacts)}
                  <div class="card-footer-prio">
                  <img
                      src="./assets/icons/${task.prio}-priority-small-color.svg"
                      alt="prio-${task.prio}"
                    />
                  </div>
                </div>
              </div>`;
}

function getDescription(text) {
  return text.length > 40 ? text.slice(0, 45) + "..." : text;
}

function getSubtasks(subtasks) {
  if (subtasks === false) {
    return "";
  } else {
    let numbersSubtasks = subtasks.length;
    let numbersSubtasksDone = getNumbersOfDoneTasks(subtasks);
    let percent = (numbersSubtasksDone / numbersSubtasks) * 100;
    return /*HTML*/ `<div class="card-subtasks"><div class="progressContainer">
                    <div class="progressBar" style="width: ${percent}%"></div>
                  </div>
                  <p class="card-subtasks-text">${numbersSubtasksDone}/${numbersSubtasks} Subtasks</p></div>`;
  }
}

function getNumbersOfDoneTasks(subtasks) {
  let numbersSubtasksDone = 0;
  subtasks.forEach((subtask) => {
    if (subtask.done) {
      numbersSubtasksDone++;
    }
  });
  return numbersSubtasksDone;
}

function getCategory(category) {
  switch (category) {
    case "user-story":
      return `<div class="card-category category-UserStory">User Stroy</div>`;
    case "technical-task":
      return `<div class="card-category category-Technicaltask">Technical Task</div>`;
    default:
      return "";
  }
}

function getAssignName(listOfAssign, contacts) {
  let beginn = `<div class="card-footer-assign">`;
  let end = `</div>`;
  listOfAssign.forEach((assignId) => {
    let assignedContact = getAssignedContact(assignId, contacts);
    beginn += ` <div class="assign-name" style="background-color: ${assignedContact.color}">
                  ${assignedContact.initials}
                </div>`;
  });
  return beginn + end;
}

function getAssignedContact(assignId, contacts) {
  return contacts.find((contact) => {
    return contact.id === assignId;
  });
}
