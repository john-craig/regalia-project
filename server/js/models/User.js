function User(id, first, last, email, pass) {
    this.id = id;
    this.first = first;
    this.last = last;
    this.email = email;
    this.pass = pass;
}

exports.newUser = function(id, first, last, email, pass) {
    var newUser = new User(id, first, last, email, pass);
    return newUser;
}

