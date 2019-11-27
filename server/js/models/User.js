function User(id, first, last, email, pass, isAdmin) {
    this.id = id;
    this.first = first;
    this.last = last;
    this.email = email;
    this.pass = pass;
    this.isAdmin = isAdmin
}

exports.newUser = function(id, first, last, email, pass, isAdmin) {
    var newUser = new User(id, first, last, email, pass, isAdmin);
    return newUser;
}

