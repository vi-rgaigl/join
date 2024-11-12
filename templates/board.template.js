function getTemplateCards(list, tasks, contacts) {
  let tasksOfList = findTasks(list, tasks);
  if (tasksOfList.length > 0) {
    let html = "";
    tasksOfList.forEach((task) => {
      html += getTemplateCard(task, contacts);
    });
    return html;
  } else {
    return `<div class="cardNoTask">No Task To do</div>`;
  }
}

function findTasks(list, tasks) {
  return tasks.filter((task) => {
    return task.status === list;
  });
}

function getTemplateCard(task, contacts) {
  return /*HTML*/ `<div class="cardTask">
                ${getCategory(task.category)}
                <div class="card-title">
                  ${task.title}
                  <div class="card-description">
                    ${getDescription(task.description)}
                  </div>
                </div>
                
                  ${getSubtasks(task.subtasks)}
                
                <div class="card-footer">
                  <div class="card-footer-assign">
                    <div class="assign-name" style="background-color: #ff7a00">
                      AM
                    </div>
                    <div class="assign-name" style="background-color: #1fd7c1">
                      EM
                    </div>
                    <div class="assign-name" style="background-color: #462f8a">
                      MB
                    </div>
                  </div>
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
  return text.length > 40 ? text.slice(0, 40) + "..." : text;
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
