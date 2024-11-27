function getTemplateSummary(tasks, user) {
  return `<div class="summary-data-left">
              <div class="summary-data-row">
                <a class="summary-data-card card-m" href="./board.html">
                  <div class="data-card-img">
                    <img src="./assets/icons/edit.svg" alt="icon_todo" />
                  </div>
                  <div class="card-number">
                  ${getNumbersOfList(tasks, "to-do")}
                    <div class="card-number-name">To-Do</div>
                  </div>
                </a>
                <a class="summary-data-card card-m" href="./board.html">
                  <div class="data-card-img">
                    <img
                      class="data-card-img-check"
                      src="./assets/icons/checkWithoutCircle.svg"
                      alt="icon_done"
                    />
                  </div>
                  <div class="card-number">
                  ${getNumbersOfList(tasks, "done")}
                    <div class="card-number-name">Done</div>
                  </div>
                </a>
              </div>
              <div class="summary-data-row">
                <a class="summary-data-card card-l" href="./board.html">
                  <div class="card-prio card-prio-urgent"></div>
                  <div class="card-number">
                    1
                    <div class="card-number-name">Urgent</div>
                  </div>
                  <div class="card-seperator"></div>
                  <div class="card-date">
                    October 16, 2022
                    <div class="card-date-name">Upcoming Deadline</div>
                  </div>
                </a>
              </div>
              <div class="summary-data-row">
                <a class="summary-data-card card-s" href="./board.html">
                  <div class="card-number">
                    ${tasks.length}
                    <div class="card-number-name">Task in Board</div>
                  </div>
                </a>
                <a class="summary-data-card card-s" href="./board.html">
                  <div class="card-number">
                    ${getNumbersOfList(tasks, "in-progress")}
                    <div class="card-number-name">Task in Progess</div>
                  </div>
                </a>
                <a class="summary-data-card card-s" href="./board.html">
                  <div class="card-number">
                  ${getNumbersOfList(tasks, "await-feedback")}
                    <div class="card-number-name">Awaiting Feedback</div>
                  </div>
                </a>
              </div>
            </div>
            <div class="summary-data-rigth">
            ${getGreacing(user)}
            </div>`;
}

function getGreacing(user) {
  if (user == "guest") {
    return `<div class="summary-data-text">Good morning</div>`;
  } else {
    return `<div class="summary-data-text">Good morning,</div>
              <div class="summary-data-name">${user}</div>`;
  }
}

function getNumbersOfList(tasks, listName) {
  let tasksOfList = tasks.filter((task) => {
    return task.status === listName;
  });
  return tasksOfList.length;
}
