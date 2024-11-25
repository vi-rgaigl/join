let users =[];


/**
 * Initializes the login page with the logo animation. Loads users from remote storage and set user inactive.
 */
async function initLogin() {
    document.getElementById('body').classList.add('dark-dawn');
    document.getElementById('login-form-box').classList.add('dawn');
    document.getElementById('header-login').classList.add('dawn'); 
    document.getElementById('logo-login').classList.add('logo-position');
    await getUsers();
    removeFromLocalStorage('join393active');
    isUserRemembered();
}


/**
 * Fetches users from remote storage.
 */
async function getUsers() {
    users = await getData('users');
    console.log(users);
}


document.addEventListener('DOMContentLoaded', function() {
    let loginButton = document.getElementById('login-button');
    let emailInput = document.getElementById('login-email');
    let passwordInput = document.getElementById('login-password');

    function isFormFilled() {    
        if (emailInput.value && passwordInput.value) {
            loginButton.disabled = false;
        } else {
            loginButton.disabled = true;
        }
    };
    emailInput.addEventListener('input', isFormFilled);
    passwordInput.addEventListener('input', isFormFilled);
});


/**
 * Handles the login process by validating the form, checking user credentials,
 * and redirecting to the summary page if successful.
 */
function login() {
    let formData = validateLoginForm();
    if (!formData) return; 
    let user = getUserByEmail(formData.email);
    if (!user || user.password !== formData.password) {
        setErrorMessage('error-login-email', 'Email or password not correct.');
        setErrorMessage('error-login-password', 'Email or password not correct.');
        clearLoginForm();
        return;
    } else {
        clearErrorMessage('error-login-email');
        clearErrorMessage('error-login-password');
    }
    if (getRemembermeCheckbox()) {
        setRememberme(user);
    }  
    setUserActive();
    window.open('./summaryUser.html', '_self');
}


/**
 * Logs in as a guest user and redirects to summaryUser.html.
 */
function guestLogin() {
    let user = getUserByEmail('guest@guest.example');
    setToLocalStorage('join393', user);
    setUserActive();
    window.location.href = './summaryUser.html';
}


/**
 * Finds a user by their email address.
 * 
 * @param {string} email - The email address to search for.
 * @returns {Object|undefined} The user object if found, otherwise undefined.
 */
function getUserByEmail(email) {
    return users.find(user => user.email === email);
}


/**
 * Validates the login form and returns the form data if valid.
 * 
 * @returns {Object|boolean} The form data if valid, or false if invalid.
 */
function validateLoginForm() {
    let email = document.getElementById('login-email');
    let password = document.getElementById('login-password');
    if (!email.value) {
        alert('Email is required.');
        return false;
    }
    if (!password.value) {
        alert('Password is required.');
        return false;
    }
    return {
        email: email.value,
        password: password.value
    };
}


/**
 * Gets the state of the "Remember me" checkbox.
 * 
 * @returns {boolean} True if the checkbox is checked, false otherwise.
 */
function getRemembermeCheckbox() {
    return document.getElementById('login-checkbox').checked;
}


/**
 * Sets the user data in localStorage to remember the user.
 * 
 * @param {Object} user - The user object to store in localStorage.
 */
function setRememberme(user) {
    setToLocalStorage('join393', user);
}


/**
 * Checks if a user is remembered in localStorage, redirects to summaryUser.html if true.
 */
function isUserRemembered() {
    let storedUser = getFromLocalStorage('join393');
    if (storedUser) {
        window.location.href = './summaryUser.html';
        setUserActive();
    }
}


/**
 * Sets the user as active in localStorage.
 */
function setUserActive() {
    setToLocalStorage('join393active', {});
}


/**
 * Clears the login form inputs and disables the login button.
 */
function clearLoginForm() {
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('login-checkbox').checked = false;
    document.getElementById('login-button').disabled = true;
}


/**
 * Toggles the visibility of the login password.
 */
function togglePasswordVisibility() {
    let passwordInput = document.getElementById('login-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'passwordshowtext';
    } else {
        passwordInput.type = 'password';
    }
}


/**
 * Sets an error message for a specified element.
 * 
 * @param {string} id - The ID of the element where the error message will be displayed.
 * @param {string} message - The error message to display.
 */
function setErrorMessage(id, message) {
    let errorMessage = document.getElementById(id);
    errorMessage.innerHTML = message;
}


/**
 * Sets an error message for a specified element.
 * 
 * @param {string} elementId - The ID of the element where the error message will be displayed.
 * @param {string} message - The error message to display.
 */
function setErrorMessage(elementId, message) {
    document.getElementById(elementId).textContent = message;
}


/**
 * Clears the error message for a specified element.
 * 
 * @param {string} elementId - The ID of the element where the error message will be cleared.
 */
function clearErrorMessage(elementId) {
    document.getElementById(elementId).textContent = '';
}


