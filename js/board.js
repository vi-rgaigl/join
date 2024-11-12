let tasks = [];
let contacts = [];

async function loadData() {
  try {
    tasks = await getData("tasks");
    contacts = await getData("contacts");
    renderTasks();
  } catch (error) {
    console.warn(error);
  }
}

function renderTasks() {
  let rowToDoRef = document.getElementById("rowToDo");
  let rowInProgessRef = document.getElementById("rowInProgess");
  let rowAwaitFeedbackRef = document.getElementById("rowAwaitFeedback");
  let rowDoneRef = document.getElementById("rowDone");
  rowToDoRef.innerHTML = getTemplateCards("to-do", tasks, contacts);
  rowInProgessRef.innerHTML = getTemplateCards("in-progress", tasks, contacts);
  rowAwaitFeedbackRef.innerHTML = getTemplateCards(
    "await-feedback",
    tasks,
    contacts
  );
  rowDoneRef.innerHTML = getTemplateCards("done", tasks, contacts);
}
