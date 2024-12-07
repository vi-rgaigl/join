let tasks;
let user;

/**
 * Loads the summary data, including tasks and user information, and renders the summary.
 */
async function loadSummary() {
  try {
    tasks = await getData("tasks");
    loadDataFromLocalStorage();
    renderSummary();
    renderMobileGreasing();
  } catch (error) {
    console.warn(error);
  }
}

/**
 * Renders the summary data into the element with the ID 'summary-data'.
 */
function renderSummary() {
  let summaryRef = document.getElementById("summary-data");
  summaryRef.innerHTML = getTemplateSummary(tasks, user);
}

/**
 * Loads user data from local storage.
 */
function loadDataFromLocalStorage() {
  let respons = getFromLocalStorage("join393");
  user = respons.user;
}

/**
 * Renders the mobile greeting into the element with the ID 'summary-greacing-mobile'.
 */
function renderMobileGreasing() {
  let greasingRef = document.getElementById("summary-greacing-mobile");
  greasingRef.innerHTML = getGreacing(user);
}
