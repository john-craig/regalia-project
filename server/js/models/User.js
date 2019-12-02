function User(id, first, last, email, pass, IsAdmin) {
    this.id = id;
    this.first = first;
    this.last = last;
    this.email = email;
    this.pass = pass;
    this.IsAdmin = IsAdmin
}

exports.newUser = function(id, first, last, email, pass, IsAdmin) {
    var newUser = new User(id, first, last, email, pass, IsAdmin);
    return newUser;
}

