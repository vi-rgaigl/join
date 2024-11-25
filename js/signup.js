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

    signupForm.addEventListener('submit', function(event) {
        signupUser();
    });
});


async function signupUser() {
    let formData = getFormData();
    if (validateSignupForm(formData)) {
        if (formData.policyCheckbox) {
            let userItem = {
                email: formData.email,
                initials: getInitials(formData.name),
                password: formData.password,
                user: formData.name
            };
            await pushData('users', userItem);
            setSignupRedirect();
        } else {
            setErrorMessage('error-signup-policy', 'Please accept the privacy policy.');
        }
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

function setSignupRedirect() {
    window.location.href='./index.html'
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