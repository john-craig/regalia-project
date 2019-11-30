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
        res.redirect('u/form');
    },
    adminAuthenticated: function(req, res, next) {
        //This needs to check if the user has the 'isAdmin' field set to true, otherwise redirect to the landing page
        return next();

        res.redirect('/');
    }
};