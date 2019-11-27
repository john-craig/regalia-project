const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Set database connection credentials
const config = mysql.createConnection ({
    host: '10.10.9.105',
    user: 'admin',
    password: 'Passw0rd',
    database: 'regalia',
    multipleStatements: true,
});

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            config.query("SELECT * FROM users WHERE Email = '" + email + "';", (err, row) => {
                if(err) throw err;
                
                if(row[0] == null) {
                    console.log("Not registered")
                    return done(null, false, {message: 'That email is not registered.'});
                }
                
                var user = User.newUser(
                    row[0].ID,
                    row[0].First_Name,
                    row[0].Last_Name,
                    row[0].Email,
                    row[0].Hashed_Pass
                );

                bcrypt.compare(password, user.pass, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Password incorrect'});
                    }
                });
            });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        config.query("SELECT * FROM users WHERE ID = '" + id + "';", (err, row) => {
            var user = User.newUser(
                row[0].ID,
                row[0].First_Name,
                row[0].Last_Name,
                row[0].Email,
                row[0].Hashed_Pass
            );
            done(err, user);
        });
    });
};