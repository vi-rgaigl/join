/**
 * Generates the HTML template for the summary section.
 * @param {Array} tasks - The list of tasks.
 * @param {string} user - The name of the user.
 * @returns {string} - The HTML template for the summary section.
 */
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
                    ${getNumbersOfPrio(tasks, "urgent")}
                    <div class="card-number-name">Urgent</div>
                  </div>
                  <div class="card-seperator"></div>
                  <div class="card-date">
                  ${getDateOfPrio(tasks, "urgent")}
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

/**
 * Generates the greeting HTML for the summary section.
 * @param {string} user - The name of the user.
 * @returns {string} - The HTML greeting for the summary section.
 */
function getGreacing(user) {
  if (user == "guest") {
    return `<div class="summary-data-text">${getGreacingText()}</div>`;
  } else {
    return `<div class="summary-data-text">${getGreacingText()},</div>
              <div class="summary-data-name">${user}</div>`;
  }
}

/**
 * Gets the number of tasks with a specific status.
 * This function filters the tasks by their status and returns the count.
 * @param {Array} tasks - The list of tasks.
 * @param {string} listName - The status of the tasks to count.
 * @returns {number} - The number of tasks with the specified status.
 */
function getNumbersOfList(tasks, listName) {
  let tasksOfList = tasks.filter((task) => {
    return task.status === listName;
  });
  return tasksOfList.length;
}

/**
 * Gets the number of tasks with a specific priority.
 * @param {Array} tasks - The list of tasks.
 * @param {string} listName - The priority of the tasks to count.
 * @returns {number} - The number of tasks with the specified priority.
 */
function getNumbersOfPrio(tasks, listName) {
  let tasksOfList = tasks.filter((task) => {
    return task.prio === listName;
  });
  return tasksOfList.length;
}

/**
 * Gets the due date of the task with the highest priority.
 * @param {Array} tasks - The list of tasks.
 * @param {string} listName - The priority of the tasks to filter.
 * @returns {string} - The formatted due date of the task with the highest priority.
 */
function getDateOfPrio(tasks, listName) {
  let listOfFilteredTasks = tasks.filter((task) => {
    return task.prio === listName;
  });
  listOfSortedTasks = sortByDate(listOfFilteredTasks);
  return fromatDate(listOfSortedTasks[0].dueDate);
}

/**
 * Sorts the tasks by their due date.
 * @param {Array} tasks - The list of tasks.
 * @returns {Array} - The sorted list of tasks.
 */
function sortByDate(tasks) {
  return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

/**
 * Formats a date string into a readable format.
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date string.
 */
function fromatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

/**
 * Gets the greeting text based on the current time.
 * @returns {string} - The greeting text.
 */
function getGreacingText() {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 15) {
    return "Good Day";
  } else if (hour >= 15 && hour < 20) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
}
