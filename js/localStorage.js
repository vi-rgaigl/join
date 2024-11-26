/**
 * Sets a value in localStorage.
 * 
 * @param {string} key - The key under which the value is stored.
 * @param {Object} value - The value to store. It will be stringified to JSON.
 * @param {boolean} [rememberMe=false] - A flag indicating whether to remember the user.
 */
function setToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
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