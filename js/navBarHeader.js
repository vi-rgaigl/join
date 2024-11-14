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
 * Gets the initials from a full name.
 * 
 * @param {string} name - The full name.
 * @returns {string} The initials.
 */
function getInitials(name) {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
}

/**
 * Sets the monogram (initials) of the user from localStorage.
 * 
 * @returns {string} The initials of the user, or an empty string if no user is found.
 */
function setMonogram() {
    let user = getFromLocalStorage('join');
    return user ? getInitials(user.user) : '';
}