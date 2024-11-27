function loadSummary() {
  renderSummary();
}

function renderSummary() {
  let summaryRef = document.getElementById("summary-data");
  summaryRef.innerHTML = getTemplateSummary();
}
