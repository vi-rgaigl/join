let contacts = [];

/**
 * Inital load of all Data from Firebase
 */
async function initLoad() {
  try {
    contacts = await getData("contacts");
    renderDropdownAssinged();
  } catch (error) {
    console.warn(error);
  }
}

function renderDropdownAssinged() {
  let dropdownRef = document.getElementById("dropdown-list");
  dropdownRef.innerHTML += getListOfUsers([], contacts);
}
