





function validateSignupForm() {
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    let rememberMe = document.getElementById('login-checkbox').checked;

    // email regex for validation
    let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    // Password regex: min 8 characters, at least one uppercase letter, one digit, and one special character
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.-_#+])[A-Za-z\d@$!%*?&.-_#+]{8,}$/;

    if (!email) {
        alert('Email is required.');
        return false;
    }
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    if (!password) {
        alert('Password is required.');
        return false;
    }
    if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 digit, and 1 special character.');
        return false;
    }
    // If all validations pass, return the form data
    return {
        email: email,
        password: password,
        rememberMe: rememberMe
    };
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