/**
 * Sets the active background for a navbar item.
 * 
 * @param {string} mobile - A string indicating if the navbar is in mobile mode.
 * @param {number} index - The index of the navbar item to activate.
 */
function setAktivItemBackground(mobile, index) {
    document.getElementById(`navbar-menu-${mobile}${index}`).classList.add('navbar-menu-item-aktiv');
    for (let i = 1; i <= 6; i++) {
        if (i != index) {
            document.getElementById(`navbar-menu-${mobile}${i}`).classList.remove('navbar-menu-item-aktiv');
        }
    }
}

/**
 * Sets the monogram (initials) of the user from localStorage.
 * 
 * @returns {string} The initials of the user, or an empty string if no user is found.
 */
function setMonogram() {
    let user = getFromLocalStorage('join393');
    return user ? user.initials : '';
}

/**
 * 
 * changes the visibility of the popup menu when clicking on the usermongram
 * 
 */
function openUserMenu() {
    document.getElementById('popup-user').classList.toggle('d-flex');
}