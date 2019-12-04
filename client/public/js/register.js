var err = document.getElementById('userError');

function validateRegister() {
    
    var invalid = false;

    var alpha = new RegExp("^[a-zA-Z]+");
    var num = new RegExp("^[0-9]+");
    var alphanum = new RegExp("^[a-zA-Z0-9]+")
    var mail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$");

    var id = document.getElementById('id').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var password2 = document.getElementById('password2').value;
    var secret = document.getElementById('secret').value;

    var formErrors = [];

    if(!num.test(id) || id.length != 8) {
        invalid = true;
        formErrors.push("- Invalid CWID");
    }
    if(!mail.test(email) || !email.includes('@marist.edu') || !email.split("@")[0].includes(".")) {
        invalid = true;
        formErrors.push("- Invalid Marist Email");
    }
    if(password != password2 || !alphanum.test(password)) {
        invalid = true;
        formErrors.push("- Invalid Password.");
    }
    if(!alpha.test(secret)) {
        invalid = true;
        formErrors.push("- Invalid Event Code");
    }
    
    if(invalid) {
        err.innerText = "The following errors have been found: \n";
        err.style.visibility = "visible";
        for(var i = 0; i < formErrors.length; i++) {
            err.innerText += formErrors[i]+"\n";
        }
        event.preventDefault();
        return false;
    }

}

function unRed(box) {
    document.getElementById(box).classList.remove('redbox');
}