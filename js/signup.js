
document.addEventListener('DOMContentLoaded', function() {
    let signupForm = document.querySelector('#signup-form');
    signupForm.setAttribute('novalidate', true);
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        signupUser();
    });
});


function signupUser() {
    if (validateSignupForm()) {
        // Proceed with signup logic
        console.log('Form is valid and ready for submission.');
    }
}


function validateSignupForm() {
    let name = document.getElementById('signup-name').value;
    let email = document.getElementById('signup-email').value;
    let password = document.getElementById('signup-password').value;
    let confirmPassword = document.getElementById('confirm-password').value;
    let isValid = true;

    if (!name) {
        setErrorMessage('error-signup-name', 'Name is required.');
        isValid = false;
    } else {
        clearErrorMessage('error-signup-name');
    }

    if (!checkEmailRegex(email)) {
        setErrorMessage('error-signup-email', 'Please enter a valid email address.');
        isValid = false;
    } else {
        clearErrorMessage('error-signup-email');
    }

    if (!checkPasswordRegex(password)) {
        setErrorMessage('error-signup-password', 'At least 8 chars, 1 uppercase, 1 digit, 1 special char.');
        isValid = false;
    } else if (password !== confirmPassword) {
        setErrorMessage('error-signup-password', 'Passwords do not match.');
        isValid = false;
    } else {
        clearErrorMessage('error-signup-password');
    }
    return isValid;
}

function checkEmailRegex(email) {
    let emailRegex = /^(?!.*\.\.)[\-A-Za-z0-9_][\-A-Za-z0-9_\.]+[\-A-Za-z0-9]@[\-A-Za-z0-9][\-A-Za-z0-9_]+\.[A-Za-z]{2,4}/;
    return emailRegex.test(email);
}

function checkPasswordRegex(password) {
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.-_#+])[A-Za-z\d@$!%*?&.-_#+]{8,}$/;
    return passwordRegex.test(password);
}

function getPolicyCheckbox() {
    return document.getElementById('policy-checkbox').checked;
}

function setSignupRedirect(item) {
    if(item) {
        window.location.href='./login.html'
    } else {
        
    }
}

function setErrorMessage(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

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