
document.addEventListener('DOMContentLoaded', function() {
    let signupForm = document.querySelector('#signup-form');
    signupForm.setAttribute('novalidate', true);
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        signupUser();
    });
});


function signupUser() {
    let formData = getFormData();
    if (validateSignupForm(formData)) {
        console.log('Form is valid and ready for submission.');
        userItem = {
            email: formData.email,
            initials: getInitials(formData.name),
            password: formData.password,
            user: formData.name
        }
        pushData('users', userItem);
    }
}

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
    } else if (formData.password !== formData.confirmPassword) {
        setErrorMessage('error-signup-password', 'Passwords do not match.');
        isValid = false;
    } else {
        clearErrorMessage('error-signup-password');
    }
    return isValid;
}

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

function getInitials(name) {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
}