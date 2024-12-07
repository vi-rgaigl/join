/**
 * Generats the HTML Code for renderign
 * @param {string} list -Name of list
 * @param {[]} tasks -List of tasks
 * @param {[]} contacts -List of contacts
 * @returns HTML for rendering
 */
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
    return `<div class="cardNoTask">No Task</div>` + templateDragArea;
  }
}

/**
 * Filter all tasks with the name of list
 * @param {string} list -Name of list
 * @param {[]} tasks -List of tasks
 * @returns List of filters tasks
 */
function findTasks(list, tasks) {
  return tasks.filter((task) => {
    return task.status === list;
  });
}

/**
 * Generat the HTML of Task
 * @param {[]} task -Task for rendering
 * @param {[]} contacts -List of contacts
 * @returns HTML of Task
 */
function getTemplateCard(task, contacts) {
  return `<div class="cardTask" id="${task.id}" ondragstart="startDragging('${
    task.id
  }')" ondragend="endDragging('${
    task.id
  }')" draggable="true" onclick="openDialog('${task.id}')">
            <div class="card-head">
              ${getCategory(task.category)}
              <div class="card-menue-box" onclick="openMenue(event)">
                <img src="./assets/icons/select-arrow.svg"
                    alt="menue"/>
                <div class="card-menue">
                ${getMenue(task)}
                </div>
              </div>
            </div>
            <div class="card-title">
              ${task.title}
              <div class="card-description">
              ${getDescription(task.description)}
              </div>
            </div>
            ${getSubtasksBar(task.subtasks)}
            <div class="card-footer">
            ${getAssignInitials(task.assignedTo, contacts)}
              <div class="card-footer-prio">
                <img src="./assets/icons/${task.prio}-priority-small-color.svg"
                  alt="prio-${task.prio}"/>
              </div>
            </div>
          </div>`;
}

/**
 * Skip the text if there length more then 50 letters
 * @param {string} text -Text to skip
 * @returns skiped text
 */
function getDescription(text) {
  return text.length > 50 ? text.slice(0, 45) + "..." : text;
}

/**
 * Generats HTML with Processbar and numbers of Subtasks
 * @param {[]} subtasks -List of subtask
 * @returns HTML for Subtask
 */
function getSubtasksBar(subtasks) {
  if (subtasks === false) {
    return "";
  } else {
    let numbersSubtasks = subtasks.length;
    let numbersSubtasksDone = getNumbersOfDoneTasks(subtasks);
    let percent = (numbersSubtasksDone / numbersSubtasks) * 100;
    return `<div class="card-subtasks"><div class="progressContainer">
              <div class="progressBar" style="width: ${percent}%"></div>
            </div>
            <p class="card-subtasks-text">${numbersSubtasksDone}/${numbersSubtasks} Subtasks</p></div>`;
  }
}

/**
 * Calculat the numbers of done Task
 * @param {[]} subtasks List of subtask
 * @returns number of done task
 */
function getNumbersOfDoneTasks(subtasks) {
  let numbersSubtasksDone = 0;
  subtasks.forEach((subtask) => {
    if (subtask.done) {
      numbersSubtasksDone++;
    }
  });
  return numbersSubtasksDone;
}

/**
 * Generats the HTML for category
 * @param {string} category -Name of category
 * @returns HTML for category
 */
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

/**
 * Generats the HTML of assign contacts
 * @param {[]} listOfAssign -List of assign contacts
 * @param {[]} contacts -List of all contatcs
 * @returns HTML of assign contacts
 */
function getAssignInitials(listOfAssign, contacts) {
  let beginn = `<div class="card-footer-assign">`;
  let end = `</div>`;
  let numberOfIcons = 0;
  let numberOfUsers = 0;
  if (listOfAssign === false) {
    return "";
  } else {
    listOfAssign.forEach((assignId) => {
      let assignedContact = getAssignedContact(assignId, contacts);
      if (assignedContact != undefined && numberOfIcons < 3) {
        numberOfIcons++;
        beginn += getIconAssig(assignedContact);
      }
      numberOfUsers++;
    });
    if (numberOfUsers > 3) {
      beginn += getIconsOverflow(numberOfUsers);
    }
  }
  return beginn + end;
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
    numberOfUsers - 3
  }+
            </div>`;
}

/**
 * Generats the HTML of Menü
 * @param {{}} task -Task for rendering
 * @returns HTML of Menü
 */
function getMenue(task) {
  switch (task.status) {
    case "to-do":
      return `               
      <p class="card-menue-title">Change to:</p>
      <p onclick="changeStatus(event,'in-progress','${task.id}')">In progess</p>
      <p onclick="changeStatus(event,'await-feedback','${task.id}')">Await feedback</p>
      <p onclick="changeStatus(event,'done','${task.id}')">Done</p>`;

    case "in-progress":
      return `               
      <p class="card-menue-title">Change to:</p>
      <p onclick="changeStatus(event,'to-do','${task.id}')">To do</p>
      <p onclick="changeStatus(event,'await-feedback','${task.id}')">Await feedback</p>
      <p onclick="changeStatus(event,'done','${task.id}')">Done</p>`;

    case "await-feedback":
      return `             
      <p class="card-menue-title">Change to:</p>  
      <p onclick="changeStatus(event,'to-do','${task.id}')">To do</p>
      <p onclick="changeStatus(event,'in-progress','${task.id}')">In progess</p>
      <p onclick="changeStatus(event,'done','${task.id}')">Done</p>`;

    case "done":
      return `           
      <p class="card-menue-title">Change to:</p>    
      <p onclick="changeStatus(event,'to-do','${task.id}')">To do</p>
      <p onclick="changeStatus(event,'in-progress','${task.id}')">In progess</p>
      <p onclick="changeStatus(event,'await-feedback','${task.id}')">Await feedback</p>`;
  }
}
