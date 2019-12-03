module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    },
    forwardAuthenticated: function(req, res, next) {
        if(!req.isAuthenticated()) {
            return next();
        }
        res.redirect('u/index');
    },
    adminAuthenticated: function(req, res, next) {
        //this just checks if the current user is an admin
        if(req.isAuthenticated()) {
            if(req.user.IsAdmin == true) {
                return next();
            } else {
                res.redirect('./dashboard');
            }
        } else {
            res.redirect('/login');    
        }
    }
};