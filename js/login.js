let users =[];

function initLogin() {
    document.getElementById('login-form-box').classList.add('dawn');
    document.getElementById('login-body').classList.add('dawn');
    document.getElementById('logo-login').classList.add('logo-position');
}

async function getUsers() {
    users = await getData('users');
    console.log(users);
    let user = getUserByEmail('frank.schmidt@example.com');
    console.log(user);
}

function getUserByEmail(email) {
    return users.find(user => user.email === email);
}

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
    // alert('Login successful!');
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

function getRememberme() {
    return document.getElementById('login-checkbox').checked;
}

function isUserRemembered() {
    let storedUser = getFromLocalStorage('join');
    if (storedUser) {
        window.location.href = './summaryUser.html';
        return;
    }
}

function clearLoginForm() {
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('login-checkbox').checked = false;
    document.getElementById('login-button').disabled = true;
}
