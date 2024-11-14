/**
 * Sets a value in localStorage.
 * 
 * @param {string} key - The key under which the value is stored.
 * @param {*} value - The value to store. It will be stringified to JSON.
 */
function setToLocalStorage(key, value) {
    let toStoreItem = {
        user: value.user
    }
    try {
        localStorage.setItem(key, JSON.stringify(toStoreItem));
    } catch (error) {
        console.error('Error setting to localStorage', error);
    }
}

/**
 * Gets a value from localStorage.
 * 
 * @param {string} key - The key under which the value is stored.
 * @returns {*} The parsed value from localStorage, or null if not found or an error occurs.
 */
function getFromLocalStorage(key) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error getting from localStorage', error);
        return null;
    }
}

/**
 * Removes a value from localStorage.
 * 
 * @param {string} key - The key under which the value is stored.
 */
function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from localStorage', error);
    }
}

/**
 * Clears all values from localStorage.
 */
function clearLocalStorage() {
    try {
        localStorage.clear();
    } catch (error) {
        console.error('Error clearing localStorage', error);
    }
}


/**
 * Sets a value in sessionStorage.
 * 
 * @param {string} key - The key under which the value is stored.
 * @param {*} value - The value to store. It will be stringified to JSON.
 */
function setToSessionStorage(key, value) {
    let toStoreItem = {
        email: value.email,
        user: value.user,
    }
    try {
        sessionStorage.setItem(key, JSON.stringify(toStoreItem));
    } catch (error) {
        console.error('Error setting to sessionStorage', error);
    }
}

/**
 * Gets a value from sessionStorage.
 * 
 * @param {string} key - The key under which the value is stored.
 * @returns {*} The parsed value from sessionStorage, or null if not found or an error occurs.
 */
function getFromSessionStorage(key) {
    try {
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error getting from sessionStorage', error);
        return null;
    }
}

/**
 * Removes a value from sessionStorage.
 * 
 * @param {string} key - The key under which the value is stored.
 */
function removeFromSessionStorage(key) {
    try {
        sessionStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from sessionStorage', error);
    }
}

/**
 * Clears all values from sessionStorage.
 */
function clearSessionStorage() {
    try {
        sessionStorage.clear();
    } catch (error) {
        console.error('Error clearing sessionStorage', error);
    }
}