const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');

const { forwardAuthenticated } = require('../auth');

// Set database connection credentials
const config = mysql.createConnection ({
    host: '10.10.9.105',
    user: 'admin',
    password: 'Passw0rd',
    database: 'regalia',
    multipleStatements: true,
});

//Page routes
//Index (redirects to login page)
router.get('/', forwardAuthenticated, (req, res) => res.sendFile('login.html', {root: './client'}));

//Login
router.get('/login', forwardAuthenticated, (req, res) => res.sendFile('login.html', {root: './client'}));

//Register
router.get('/register', forwardAuthenticated, (req, res) => res.sendFile('register.html', {root: './client'}));

//Registration handler
router.post('/registerSubmit', (req, res) => {
    var data = req.body;
    var id = data.id;
    var first = data.name.split(" ")[0];
    var last = data.name.split(" ")[1];
    var email = data.email;
    var pass = data.password;
      
    //Check for existing user
    config.query("SELECT COUNT(Email) FROM users WHERE Email =  + '" + data.email + "'", (err, row) => {
        if(err) throw (err);
        
        var count = row[0]['COUNT(Email)'];

        if(count > 0) {
            //Redirect to registration page with error message
            console.log("fail");
            res.sendFile('register.html', {root: './client'});

        } else {
            //Create new user
            var newUser = User.newUser(
                id,
                first,
                last,
                email,
                pass
            );
            
            //Hash password
            bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(pass, salt, (err, hash) => {
                    if(err) throw err;
                    //Set hased password
                    newUser.pass = hash;
                    //Save the user data
                    config.query("INSERT INTO users VALUES ('" + id + "', '" + email + "', '" + first + "', '" + last + "', '" + hash + "')", (err, res) => {
                        if(err) throw err;
                    });
                
            }));
            res.redirect('/login'); 
        }
        
    })

});

//Login handler
router.post('/loginSubmit', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/u/form',
        failureRedirect: '/login'   
    })(req, res, next);
});

module.exports = router;