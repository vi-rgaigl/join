let users =[];

/**
 * Initializes the login page with the logo animation.
 */
function initLogin() {
    document.getElementById('login-form-box').classList.add('dawn');
    document.getElementById('login-body').classList.add('dawn');
    document.getElementById('logo-login').classList.add('logo-position');
}

/**
 * Fetches users from remote storage.
 */
async function getUsers() {
    users = await getData('users');
    console.log(users);
    let user = getUserByEmail('frank.schmidt@example.com');
    console.log(user);
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
 * Handles the login process by validating the form, checking user credentials,
 * and redirecting to the summary page if successful.
 */
function login() {
    let formData = validateLoginForm();
    if (!formData) return; 
    let user = getUserByEmail(formData.email);
    if (!user || user.password !== formData.password) {
        alert('Incorrect password or email address. Please try again.');
        clearLoginForm();
        return;
    }
    if (getRememberme()) {
        setToLocalStorage('join', user);
    }
    window.open('./summaryUser.html', '_self');
}


document.addEventListener('DOMContentLoaded', () => isUserRemembered() );
    
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
function getRememberme() {
    return document.getElementById('login-checkbox').checked;
}

/**
 * Checks if a user is remembered in localStorage and redirects to summaryUser.html if found.
 */
function isUserRemembered() {
    let storedUser = getFromLocalStorage('join');
    if (storedUser) {
        window.location.href = './summaryUser.html';
        return;
    }
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
 * Logs in as a guest user and redirects to summaryUser.html.
 */
function guestLogin() {
    let user = getUserByEmail('guest@guest.example');
    setToLocalStorage('join', user);
    window.location.href = './summaryUser.html';
}