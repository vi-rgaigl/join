let templateTask = `<div class="cardTask">
                <div class="card-category category-UserStory">User Stroy</div>
                <div class="card-title">
                  Kochwelt Page & Recipe Recommender
                  <div class="card-description">
                    Build start page with recipe recommendation...
                  </div>
                </div>
                <div class="card-subtasks">
                  <div class="progressContainer">
                    <div class="progressBar" style="width: 50%"></div>
                  </div>
                  <p class="card-subtasks-text">1/2 Subtasks</p>
                </div>
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
                      src="./assets/icons/medium-priority-small-color.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>`;

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
  return `<div class="cardTask">
                <div class="card-category category-UserStory">User Stroy</div>
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
    console.log(subtasks);
    let numbersSubtasks = subtasks.length;
    let numbersSubtasksDone = 0;
    subtasks.forEach((subtask) => {
      if (subtask.done) {
        numbersSubtasksDone++;
      }
    });
    let percent = (numbersSubtasksDone / numbersSubtasks) * 100;
    return `<div class="card-subtasks"><div class="progressContainer">
                    <div class="progressBar" style="width: ${percent}%"></div>
                  </div>
                  <p class="card-subtasks-text">${numbersSubtasksDone}/${numbersSubtasks} Subtasks</p></div>`;
  }
}
