function validateRegister() {
    
    var invalid = false;

    var alpha = new RegExp("[a-zA-Z]");
    var num = new RegExp("[0-9]");
    var mail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");

    var id = document.getElementById('id').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var password2 = document.getElementById('password2').value;
    var secret = document.getElementById('secret').value;

    if(!num.test(id) || id.length != 8) {
        invalid = true;
        document.getElementById('id').classList.add('redbox');
    }
    if(!mail.test(email) || !email.includes('@marist.edu') || !email.split("@")[0].includes(".")) {
        invalid = true;
        document.getElementById('email').classList.add('redbox');
    }
    if(password != password2) {
        invalid = true;
        document.getElementById('password').classList.add('redbox');
        document.getElementById('password2').classList.add('redbox');
    }
    if(!alpha.test(secret)) {
        invalid = true;
        document.getElementById('secret').classList.add('redbox');
    }
    
    if(invalid) {
        event.preventDefault();
        return false;
    }

}

function unRed(box) {
    document.getElementById(box).classList.remove('redbox');
}