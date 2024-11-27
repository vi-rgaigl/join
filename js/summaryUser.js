let tasks;
let user;
async function loadSummary() {
  try {
    tasks = await getData("tasks");
    loadDataFromLocalStorage();
    renderSummary();
  } catch (error) {}
}

function renderSummary() {
  let summaryRef = document.getElementById("summary-data");
  summaryRef.innerHTML = getTemplateSummary(tasks, user);
}

function loadDataFromLocalStorage() {
  let respons = getFromLocalStorage("join393");
  user = respons.user;
}
