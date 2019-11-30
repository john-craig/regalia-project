var api = require('server/js/api.js')

function validateLogin() {
    //Validation for login fields should go here
    console.log("This output is from the login validation function in login.js")

    return true;
}

function unRed(box) {
    document.getElementById(box).classList.remove('redbox');
}