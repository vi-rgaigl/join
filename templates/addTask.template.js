/**
 * Generates the HTML template for the Add Task form. 
 * @param {boolean} ifDialog - A flag indicating whether the template is used in a dialog.
 * @returns {string} - The HTML template for the Add Task form.
 */
function getTemplateAddTask(ifDialog) {
  return `<div class="addTask-Content">
            ${getHead(ifDialog)}
            <div class="form">
              <div class="first-column">
                <label required for="inputTitle"
                  >Title
                  <p class="lableRequiert">*</p></label
                >
                <input
                  class="input"
                  type="text"
                  id="inputTitle"
                  placeholder="Enter a title"
                  oninput="changeTitle(event)"
                />
                <div id="errorTitle" class="errorMassage"></div>
                <label for="inputDescription">Description</label>
                <textarea
                  class="input"
                  type="textarea"
                  id="inputDescription"
                  placeholder="Enter a Description"
                  oninput="changeDescription(event)"
                ></textarea>
                <div class="errorMassage"></div>
                <label for="dropdownAssinged">Assigned to</label>
                <div
                  class="input dropdown select-arrow"
                  id="dropdownAssinged"
                  data-dropdown="true"
                >
                  <div
                    class="dropdown-click"
                    onclick="toggleDropdown()"
                    data-dropdown="true"
                  >
                    Select contacts to assign
                  </div>
                  <div
                    class="dropdown-list"
                    id="dropdown-list"
                    data-dropdown="true"
                  >
                    <hr class="dropdown-hr" data-dropdown="true" />
                  </div>
                </div>
                <div class="assinged-users" id="assingedUsers"></div>
              </div>

              <div class="separator"></div>

              <div class="second-column">
                <label for="inputDueDate" required
                  >Due date
                  <p class="lableRequiert">*</p></label
                >
                <input
                  class="input"
                  id="inputDueDate"
                  type="date"
                  oninput="changeDueDate(event)"
                />
                <div id="errorDueDate" class="errorMassage"></div>
                <label for="prio">Prio</label>

                <div class="radio-btns">
                  <div class="radio-container radio-urgent">
                    <input
                      type="radio"
                      id="inputPriorityUrgent"
                      name="inputPriority"
                      value="urgent"
                      oninput="changePrio(event)"
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
                      checked
                    />
                    <label for="inputPriorityLow">Low</label>
                  </div>
                </div>
                <div class="errorMassage"></div>
                <label for="category" required
                  >Category
                  <p class="lableRequiert">*</p></label
                >
                <select
                  class="input select-arrow"
                  id="inputCategory"
                  oninput="changeCategory(event)"
                >
                  <option value="" disabled selected>
                    Select task category
                  </option>
                  <option value="user-story">User Story</option>
                  <option value="technical-task">Technical Task</option>
                </select>
                <div id="errorCategory" class="errorMassage"></div>
                <label for="">Subtasks</label>
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
                <div class="listSubtasks" id="listSubtasks"></div>
              </div>
            </div>
            <div class="form-footer">
              <div class="text">
                <p class="lableRequiert">*</p>
                This field is required
              </div>
              <div class="form-buttons">
                <button
                  id="btnResetTask"
                  class="button-white"
                  onclick="resetNewTask()"
                >
                  Clear
                  <img src="./assets/icons/close.svg" alt="check" />
                </button>
                <button
                  id="btnSubmitEditTask"
                  class="button-blue"
                  onclick="submitNewTask(${ifDialog})"
                >
                  Create Task
                  <img
                    src="./assets/icons/checkWithoutCircle.svg"
                    alt="check"
                  />
                </button>
              </div>
            </div>
          </div>`;
}

/**
 * Generates the header HTML for the Add Task form.
 * @param {boolean} ifDialog - A flag indicating whether the template is used in a dialog.
 * @returns {string} - The HTML header for the Add Task form.
 */
function getHead(ifDialog) {
  if (ifDialog) {
    return `<div class="dialog-header-addTask">
    <h1>Add Task</h1>
    <div class="closeX" onclick="closeDialog('addTaskDialog');">
      <img src="./assets/icons/close.svg" alt="closeButton" />
    </div>
  </div>`;
  } else {
    return ` <h1>Add Task</h1>`;
  }
}
