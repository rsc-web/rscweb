export function validateUsername(username) {
    // username must only contain numbers, letters, underscores, and dashes
    // username must also be between 3 and 20 characters long

    return /^[a-zA-Z0-9_-]{3,20}$/.test(username);
}

export function validateEmail(email) {
    // an email must be valid and must be from 3 to 100 characters long
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
}

export function validatePassword(password) {
    // a password must be at least 8 characters long and must contain at least one number and letter
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}

export function saveAuthToken(token) {
    localStorage.setItem('authToken', token);
}