//Express
const express = require('express');
const app = express();
//const flash = require('connect-flash'); 
const session = require('express-session');
const passport = require('passport');

require('./passport')(passport);

const port = process.env.PORT || 5050;

//MySQL
const mysql = require('mysql');

//Validator
const { check , validationResult } = require('express-validator');

app.use(express.static('./client/public'));

//BodyParser
app.use(express.urlencoded({
    extended: false
}));

//Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

/*
//Connect flash
app.use(flash());

//Globals
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error_msg');
    next();
});
*/

//Routes
app.use('/', require('./routes/index'));
app.use('/u', require('./routes/users'));


// Set database connection credentials
const config = mysql.createConnection ({
    host: '10.10.9.105',
    user: 'admin',
    password: 'Passw0rd',
    database: 'regalia',
    multipleStatements: true,
});

config.connect ((err) => {
    if(err) console.log(err);
    console.log("Database connected!");
})




app.listen(port, () => console.log('Regalia running on port ' + port))
