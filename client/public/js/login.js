function validateLogin() {
    
    var invalid = false;

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    //Checks if username exists in database
    fetch('/usercheck/'+email, {
        method:'POST',
        body: email,
        headers: {'Content-Type': 'application/json, charset=UTF-8'}
    })
    .then((data) => data.json())
    .then((data) => {
        console.log(data.data);
        if(data.data == 0) {
            invalid = true;
        }
    });

    if(invalid) {
        document.getElementById('userError').style.visibility = "visible";
        event.preventDefault();
        return false;
    }

}

function unRed(box) {
    document.getElementById(box).classList.remove('redbox');
}