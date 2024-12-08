/**
 * Initializes the page by rendering the header and navbar, and setting the active item background.
 * Check if user logged in and aktive
 *
 * @param {number} page - The index of the page to set as active in the navbar.
 */
function init(page) {
  if (getUserActive()) {
    renderHeaderAndNavbar();
    setAktivItemBackground("", page);
    setAktivItemBackground("mobile", page);
  } else {
    window.location.href = "./index.html";
  }
}

/**
 * Renders the header and navbar for the logged-in state.
 */
function renderHeaderAndNavbar() {
  let headerContainer = document.getElementById("header-container");
  let navContainer = document.getElementById("navbar-container");
  let navContainerMobile = document.getElementById("navbar-container-mobile");
  headerContainer.innerHTML = getHeaderTemplate();
  navContainer.innerHTML = getNavbarTemplate("");
  navContainerMobile.innerHTML = getNavbarTemplate("mobile");
}

/**
 * Renders the header and navbar for the non-logged-in state.
 */
function renderHeaderAndNavbarNoLogin() {
  let headerContainer = document.getElementById("header-container");
  let navContainer = document.getElementById("navbar-container");
  headerContainer.innerHTML = getHeaderNoLoginTemplate();
  navContainer.innerHTML = getNavbarNoLoginTemplate();
}

/**
 * Gets the active user status from localStorage.
 *
 * @returns {Object|null} The active user status object if found, otherwise null.
 */
function getUserActive() {
  return getFromLocalStorage("join393");
}

/**
 * Shows a popup message and returns a Promise that resolves after the message is shown.
 *
 * @param {string} message - The message to display in the popup.
 * @returns {Promise} A Promise that resolves after the message is shown.
 */
function showPopupMessage(elementId, message) {
  return new Promise((resolve) => {
    let popup = document.getElementById(elementId);
    popup.innerHTML = `<span>${message}</span>`;
    popup.classList.add("show");
    setTimeout(() => {
      popup.classList.remove("show");
      resolve();
    }, 2000); // Show the popup for 2 seconds
  });
}
