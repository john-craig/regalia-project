var CAS = require('cas');
    var cas = new CAS({
        service_url: 'auth.it.marist.edu/idp/profile', 
        cas_url: '/login',
        service: 'cas',
        version: 2.0
    });

exports.cas_authenticate = function(req, res) {
    cas.authenticate(req, res, function(err, status, username, extended) {
      if (err) {
        // Handle the error
        res.send({error: err});
      } else {
        // Log the user in 
        res.send({status: status, username: username, attributes: extended.attributes});
      }
    });
}

exports.cas_validate = function(req, res) {
cas.validate(ticket, function(err, status, username) {
    if (err) {
      // Handle the error
      res.send({error: err});
    } else {
      // Log the user in
      res.send({status: status, username: username});
    }
  });
}