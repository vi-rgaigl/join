let tasks;
let user;
async function loadSummary() {
  try {
    tasks = await getData("tasks");
    loadDataFromLocalStorage();
    renderSummary();
    renderMobileGreasing();
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

function renderMobileGreasing() {
  let greasingRef = document.getElementById("summary-greacing-mobile");
  greasingRef.innerHTML = getGreacing(user);
}
