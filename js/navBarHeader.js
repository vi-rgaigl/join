window.addEventListener('beforeunload', function() {
    removeFromLocalStorage('join393active');
});

/**
 * Sets the active background for a navbar item.
 * 
 * @param {string} mobile - A string indicating if the navbar is in mobile mode.
 * @param {number} index - The index of the navbar item to activate.
 */
function setAktivItemBackground(mobile, index) {
    if(index == 0) { return }
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
 * Sets the background color of the monogram based on the user's color.
 */
function setMonogramBackground() {
    let user = getFromLocalStorage('join393');
    document.getElementById('header_avatar').style.backgroundColor = user.color;
}


/**
 * 
 * changes the visibility of the popup menu when clicking on the usermongram
 * 
 */
function openUserMenu() {
    document.getElementById('popup-user').classList.toggle('d-flex');
}


/**
 * Logs the user out by removing the user from localStorage and redirecting to the login page.
 */
async function logout() {
    setUserInactive();
    await removeFromLocalStorage('join393');
    window.location.href = './index.html';
}


/**
 * Sets the user as inactive by removing the active status from localStorage.
 */
function setUserInactive() {
    removeFromLocalStorage('join393active');
}


/**
 * Redirects the user to the help page.
 */
function openHelp() {
    window.location.href = './help.html';
}


/**
 * Redirects the user to the legal notice page.
 */
function openLegalNotice() {
    window.location.href = './legalNotice.html';
}


/**
 * Redirects the user to the privacy policy page.
 */
function openPrivacyPolicy() {
    window.location.href = './privacyPolicy.html';
}