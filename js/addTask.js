let contacts = [];

/**
 * Inital load of all Data from Firebase
 */
async function initLoad() {
  try {
    contacts = await getData("contacts");
    renderAddTask();
    renderDropdownAssinged();
    setButtenDisable();
  } catch (error) {
    console.warn(error);
  }
}

function renderAddTask() {
  let contentRef = document.getElementById("application-content");
  contentRef.innerHTML = getTemplateAddTask();
}
