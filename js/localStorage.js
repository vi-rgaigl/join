function setToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting to localStorage', error);
    }
}

function getFromLocalStorage(key) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error getting from localStorage', error);
        return null;
    }
}

function setToSessionStorage(key, value) {
    try {
        sessionStorage.setItem(key  , JSON.stringify(value));
    } catch (error) {
        console.error('Error setting to sessionStorage', error);
    }
}

function getFromSessionStorage(key) {    
    try {
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error getting from sessionStorage', error);
        return null;
    }
}