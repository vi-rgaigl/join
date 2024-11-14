/**
 * Gets the first name from a full name.
 * 
 * @param {string} name - The full name.
 * @returns {string} The first name.
 */
function getFirstName(name) {
    return name.split(' ')[0];
}

/**
 * Gets the last name from a full name.
 * 
 * @param {string} name - The full name.
 * @returns {string} The last name.
 */
function getLastName(name) {
    return name.split(' ')[1];
}