document.addEventListener('DOMContentLoaded', function() {
    let signupForm = document.querySelector('#signup-form');
    let signupButton = document.getElementById('signup-button');
    let nameInput = document.getElementById('signup-name');
    let emailInput = document.getElementById('signup-email');
    let passwordInput = document.getElementById('signup-password');
    let confirmPasswordInput = document.getElementById('confirm-password');

    function isFormFilled() {
        if (nameInput.value && emailInput.value && passwordInput.value && confirmPasswordInput.value) {
            signupButton.disabled = false;
        } else {
            signupButton.disabled = true;
        }
    }

    nameInput.addEventListener('input', isFormFilled);
    emailInput.addEventListener('input', isFormFilled);
    passwordInput.addEventListener('input', isFormFilled);
    confirmPasswordInput.addEventListener('input', isFormFilled);

    signupForm.addEventListener('submit', (event) => signupUser());
});


/**
 * Signs up a new user if the form is valid and the user does not already exist.
 */
async function signupUser() {
    let formData = getFormData();
    if (validateSignupForm(formData)) {
        if (formData.policyCheckbox) {
            if (await isUserExists(formData.email)) {
                setErrorMessage('error-signup-email', 'A user with this email already exists.');
                return;
            }
            let userItem = {
                email: formData.email,
                initials: getInitials(formData.name),
                password: formData.password,
                user: formData.name
            };
            await pushData('users', userItem);       
            await showPopupMessage('signup-popup-message', 'You signed up successfully!');                        
            clearSignupForm();
            setSignupRedirect(); 
            
        } else {
            setErrorMessage('error-signup-policy', 'Please accept the privacy policy.');
        }
    }
}


/**
 * Checks if a user with the given email already exists.
 * 
 * @param {string} email - The email address to check.
 * @returns {Promise<boolean>} True if the user exists, false otherwise.
 */
async function isUserExists(email) {
    let users = await getData('users');
    return users.some(user => user.email === email);
}


/**
 * Validates the signup form data.
 * 
 * @param {Object} formData - The form data to validate.
 * @returns {boolean} True if the form data is valid, false otherwise.
 */
function validateSignupForm(formData) {
    let isValid = true;
    if (!formData.name) {
        setErrorMessage('error-signup-name', 'Name is required.');
        isValid = false;
    } else {
        clearErrorMessage('error-signup-name');
    }
    if (!checkEmailRegex(formData.email)) {
        setErrorMessage('error-signup-email', 'Please enter a valid email address.');
        isValid = false;
    } else {
        clearErrorMessage('error-signup-email');
    }
    if (!checkPasswordRegex(formData.password)) {
        setErrorMessage('error-signup-password', 'At least 8 chars, 1 uppercase, 1 digit, 1 special char.');
        isValid = false;
    } else {
        clearErrorMessage('error-signup-password');
    }
    if (formData.password !== formData.confirmPassword) {
        setErrorMessage('error-signup-password-confirm', 'Passwords do not match.');
        isValid = false;
    } else {
        clearErrorMessage('error-signup-password-confirm');
    }
    return isValid;
}


/**
 * Gets the form data from the signup form.
 * 
 * @returns {Object} The form data.
 */
function getFormData() {
    let formData = {
        name: document.getElementById('signup-name').value,
        email: document.getElementById('signup-email').value,
        password: document.getElementById('signup-password').value,
        confirmPassword: document.getElementById('confirm-password').value,
        policyCheckbox: getPolicyCheckbox()
    };
    return formData;
}


/**
 * Checks if the email matches the required pattern.
 * 
 * @param {string} email - The email to check.
 * @returns {boolean} True if the email matches the pattern, false otherwise.
 */
function checkEmailRegex(email) {
    let emailRegex = /^(?!.*\.\.)[\-A-Za-z0-9_][\-A-Za-z0-9_\.]+[\-A-Za-z0-9]@[\-A-Za-z0-9][\-A-Za-z0-9_]+\.[A-Za-z]{2,4}/;
    return emailRegex.test(email);
}


/**
 * Checks if the password matches the required pattern.
 * 
 * @param {string} password - The password to check.
 * @returns {boolean} True if the password matches the pattern (at least 8 char, 1 Uppercase, 1 digit, 1 special char), false otherwise.
 */
function checkPasswordRegex(password) {
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.-_#+])[A-Za-z\d@$!%*?&.-_#+]{8,}$/;
    return passwordRegex.test(password);
}


/**
 * Gets the state of the policy checkbox.
 * 
 * @returns {boolean} True if the checkbox is checked, false otherwise.
 */
function getPolicyCheckbox() {
    return document.getElementById('policy-checkbox').checked;
}


/**
 * Redirects the user to the index page after successful signup.
 */
function setSignupRedirect() {
    window.location.href='./index.html'
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


/**
 * Toggles the visibility of the login password.
 */
function togglePasswordVisibilitySignup(item) {
    let passwordInput = document.getElementById(`${item}-password`);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'passwordshowtext';
    } else {
        passwordInput.type = 'password';
    } 
}


/**
 * Gets the initials from a full name and converts them to uppercase.
 * 
 * @param {string} name - The full name.
 * @returns {string} The initials in uppercase.
 */
function getInitials(name) {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
}


/**
 * Clears the signup form inputs.
 */
function clearSignupForm() {
    document.getElementById('signup-name').value = '';
    document.getElementById('signup-email').value = '';
    document.getElementById('signup-password').value = '';
    document.getElementById('confirm-password').value = '';
    document.getElementById('policy-checkbox').checked = false;
    document.getElementById('signup-button').disabled = true;
}