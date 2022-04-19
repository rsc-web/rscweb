import axios from 'axios';
import server from '../assets/server.json';
import months from '../assets/months.json';
import roles from '../assets/roles.json';
import whitelist from '../assets/whitelist.json';

const defaultAvatar = 'https://uploads.scratch.mit.edu/get_image/user/1350_256x256.png';

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

const userDataUpdateHooks = [];
let notLoggedIn = null;

export function hookToUserUpdate(callback) {
    if(Object.keys(window.userData).length || notLoggedIn) return callback(notLoggedIn ? null : window.userData, null);
    userDataUpdateHooks.push(callback);
}

export function getUserData () {
    let authToken = localStorage.getItem('authToken');

    window.userData = {};

    if (authToken) {
        axios.post(`${server.domain}/user/me`, {
            authToken: authToken
        }).then(response => {
            let userData = response.data;
            window.userData = userData;
            userDataUpdateHooks.forEach(hook => {
                hook(userData, null);
            });

            if(userData.banned && window.location.pathname != '/banned' && !whitelist.banPages.includes(window.location.pathname)) 
                window.location.pathname = '/banned';
            else if(!userData.banned && window.location.pathname == '/banned') window.location.pathname = '/';
        }).catch(error => {
            console.log(error);
            localStorage.removeItem('authToken');
            userDataUpdateHooks.forEach(hook => {
                hook(null, error);
            });
        });
    } else {
        notLoggedIn = true;
        userDataUpdateHooks.forEach(hook => {
            hook(null, null);
        });
        if(window.location.pathname == '/banned') window.location.pathname = '/';
    }
}

export function signOut () {
    axios.post(`${server.domain}/user/signOut`, {
        authToken: localStorage.getItem('authToken')
    }).catch(error => {
        console.log(error);
    }).finally(() => {
        localStorage.removeItem('authToken');
        window.userData = {};
        window.location.reload();
    });
}

export function getAvatar(avatar) {
    return avatar || defaultAvatar;
}

export function getJoinDate(date) {
    let dateObj = new Date(date);
    let month = months.case[dateObj.getMonth()];
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();
    return `${day} ${month}, ${year} года`;
}

export function getRole(role) {
    return roles[role];
}