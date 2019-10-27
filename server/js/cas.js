var CAS = require('cas');
    var cas = new CAS({
        base_url: 'auth.it.marist.edu/idp/profile', 
        service: 'cas',
        version: 2.0
    });

exports.cas_login = function(req, res) {
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