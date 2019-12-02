const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');

const { forwardAuthenticated } = require('../auth');
const { adminAuthenticated } = require('../auth');

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

//Admin
router.get('/admin', forwardAuthenticated, (req, res) => res.sendFile('admin.html', {root: './client'}));

//Registration handler
router.post('/registerSubmit', (req, res) => {
    var data = req.body;
    //console.log(data);

    var id = data.id;
    //var first = data.name.split(" ")[0];
    //var last = data.name.split(" ")[1];
    var email = data.email;
    //Assumes that the password and password2 have already been checked against one another on the page before this call
    var pass = data.password;

    //Note -- this assumes that the email will not have numeric characters before the '@' sign; should be okay as long as validation occurs before this call
    var first = email.split("@")[0].split(".")[0];
    var last = email.split("@")[0].split(".")[1];

    var digit = new RegExp("[0-9]");
    if(digit.test(last.charAt(last.length-1))) {
        last = last.slice(0,-1);
    }

    var secret = data.secret;

    var IsAdmin = 0;
    var canCreate = false;

    config.query("SELECT Secret_Code FROM secrets ORDER BY Date_Set DESC LIMIT 1", (err, row) => {
        if(err) throw (err);
        
        var code = row[0].Secret_Code

        /*console.log("Normal account")
        console.log(code)
        console.log(secret)
        console.log(code == secret)*/
        
        if(code == secret){
            canCreate = true;
        } else {
            canCreate = false;
        }

        config.query("SELECT Secret_Code FROM secrets ORDER BY Date_Set ASC LIMIT 1", (err, row) => {
            if(err) throw (err);
    
            var admin_code = row[0].Secret_Code;
    
            /*console.log("Admin account")
            console.log(admin_code)
            console.log(secret)
            console.log(admin_code == secret)*/
            
            if(admin_code == secret){
                IsAdmin = 1;
                canCreate = true;
            }

            console.log("Can create")
            console.log(canCreate)

            if(canCreate) {
                config.query("SELECT COUNT(Email) FROM users WHERE Email =  + '" + data.email + "'", (err, row) => {
                    if(err) throw (err);
                    
                    var count = row[0]['COUNT(Email)'];
            
                    if(count > 0) {
                        //Redirect to registration page with error message
                        console.log("fail");
                        res.sendFile('register.html', {root: './client'});
            
                    } else {
                        //config.query("SELECT")
            
                        //Create new user
                        var newUser = User.newUser(
                            id,
                            first,
                            last,
                            email,
                            pass,
                            IsAdmin
                        );
                        console.log(newUser);
                        //Hash password
                        bcrypt.genSalt(10, (err, salt) => 
                            bcrypt.hash(pass, salt, (err, hash) => {
                                if(err) throw err;
                                //Set hased password
                                newUser.pass = hash;
                                //Save the user data
                                config.query("INSERT INTO users VALUES ('" + id + "', '" + email + "', '" + first + "', '" + last + "', '" + hash + "', '" + IsAdmin + "')", (err, res) => {
                                    if(err) throw err;
                                    //console.log(res)
                                });
                            
                        }));
                        res.redirect('/login'); 
                    }
                    
                })
            } else {
                res.redirect('/register');
                //alert("Incorrect event code")
            }
        })
    })

    
    //Check for existing user
    /*
    
    */
});

//Login handler
router.post('/loginSubmit', (req, res, next) => {
    console.log(req.body)

    passport.authenticate('local', {
        successRedirect: '/u/dashboard',
        failureRedirect: '/login'   
    })(req, res, next);
});

router.post('/usercheck/:email', (req, res) => {
    var email = req.params.email;
    //console.log(email);
    config.query("SELECT COUNT(Email) FROM users WHERE Email =  + '" + email + "'", (err, row) => {
        if(err) throw (err);
        var count = row[0]['COUNT(Email)'];
        res.send({data: count});
    });
});

router.post('/changeSecret', adminAuthenticated, (req, res) => {
    //User should be validated as an administrator too-- but I'll work on that later

    config.query("INSERT INTO secrets (Secret_Code) VALUES ('" + req.body.passcode + "')", (err, res) => {
        if(err) throw err;
    });

    res.redirect('/')
});

module.exports = router;