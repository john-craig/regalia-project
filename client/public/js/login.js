
/*
function validateLogin() {

    var invalid = false;
    var bit;

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
        bit = data.data;
        console.log(bit);
        if(bit == 0) {
            console.log(bit);
            invalid = true;
        };
        //if the username exists it will prevent the form from submitting
        if(invalid) {
            console.log(invalid);
            document.getElementById('boxContents').action = "/register";
        }
    }); 

}

function unRed(box) {
    document.getElementById(box).classList.remove('redbox');
}
*/