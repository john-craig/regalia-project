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

app.get('/datatable', function(req, res) {
    res.sendFile('datatable.html', {root: './client'})
});

/*

app.post('/submit',/* [
    check('fname').not().isEmpty().withMessage("First name is required.")
    .isAlpha().withMessage("Invalid characters in name field."),
    check('lname').not().isEmpty().withMessage("Last name is required.")
    .isAlpha().withMessage("Invalid characters in name field."),
    check('email').isEmail().withMessage("Invalid email."),
    check('cwid').not().isEmpty().withMessage("CWID is required.")
    .isInt().withMessage("Please enter a valid CWID."),
    check('weight').isInt().withMessage("Please enter a valid weight value (lbs)."),
    check('college_name').not().isEmpty().withMessage("College name is requried.")
    .isAlphanumeric().withMessage("Invalid characters in name field."),
    check('college_city').not().isEmpty().withMessage("College city is required.")
    .isAlpha().withMessage("Invalid characters in city field."),
    check('college_state').not().isEmpty().withMessage("College state is required.")
    .isAlpha().withMessage("Invalid characters in state field.")
] ,function (req, res)  {
    /*
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        //return res.status(422).json({errors: errors.array()});
        req.flash('error', "invalid form");
        res.redirect('/form');
        
        return;
    }

    var data = req.body;
    console.log(data);

    //Faculty table
    config.query("INSERT INTO faculty (FacultyID, First_Name, Last_Name, Email) VALUES ('" + data.cwid + "', '" + data.fname + "', '" + data.lname + "', '" + data.email + "')", function(err, res) {
        if (err) throw err;
    })

    //Gowns table
    config.query("INSERT INTO gowns (GownID, Height, Weight) VALUES ('" + data.cwid + "', '" + data.heightFeet + " " + data.heightInches  + "', '" + data.weight + "')", function(err, res) {
        if (err) throw err;
    })

    //Caps table
    config.query("INSERT INTO caps (CapID, Cap_Size) VALUES ('" + data.cwid + "', '" + data.cap_size + "')", function(err, res) {
        if (err) throw err;
    })

    //Colleges table
    config.query("INSERT INTO colleges (CollegeID, College_Name, College_City, College_State) VALUES ('" + data.cwid + "', '" + data.college_name + "', '" + data.college_city + "', '" + data.college_state + "')", function (err, res) {
        if (err) throw err;
    })

    let date = new Date();
    let yyyy = date.getFullYear(); 
    let mm = ("0" + (date.getMonth() + 1)).slice(-2);
    let dd = ("0" + date.getDate()).slice(-2);

    //Order table
    config.query("INSERT INTO orders (Date_Posted, FacultyID, GownID, CapID, CollegeID) VALUES ('" + yyyy + "-" + mm + "-" + dd + "', '" + data.cwid + "', '" + data.cwid + "', '" + data.cwid + "', '" + data.cwid + "')", function (err, res) {
        if (err) throw err;
    })

    res.redirect('/thanks');

})

*/

app.get('/api/datatable', function(req, res) {
    //res.send(tempData);

    //dataRow = [];

    config.query("SELECT FacultyID, First_Name, Last_Name, Email, Weight, Height, College_Name, College_City, College_State FROM faculty, gowns, colleges WHERE faculty.FacultyID = gowns.GownID", function (err, data) {       
        if (err) {
            console.error(err);
            return;
        }
        res.send(data)
    })


    
});

app.post('/login', function(req, res) {
    //console.log(req.body)

    var fac_id = req.body.fac_id
    var email = req.body.email
    var hashed_pass = hash(req.body.password)

    var sql = "INSERT INTO faculty (FacultyID, Email, Hashed_Pass) VALUES ('" + fac_id + "', '" + email + "', '" + hashed_pass + "')"

    config.query(sql, function(err, result) {
        if (err) throw err;
    })

    console.log(sql)
    res.append('ticket', email)
    console.log(res)
    res.redirect('/');
});

app.post('/api/admin/add', function(req, res) {
    var sql = "INSERT INTO admin (Email) VALUES (" + req.body + ")"

    config.query(sql, function(err, result) {
        if (err) throw err;
    })
    console.log(req)
});

/*
config.query('SELECT * FROM admins', (err, rows) => {
    if(err) console.log(err);

    console.log(rows);
});
*/

/*
// Display all users
app.get('/users', (request, response) => {
    pool.query('SELECT * FROM users', (error, result) => {
        if (error) throw error;
 
        response.send(result);
    });
});

// Display a single user by ID
app.get('/users/:id', (request, response) => {
    const id = request.params.id;
 
    pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
        if (error) throw error;
 
        response.send(result);
    });
});

// Add a new user (POST)
app.post('/users', (request, response) => {
    //... 
});

// Add a new user
app.post('/users', (request, response) => {
    pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
        if (error) throw error;
 
        response.status(201).send(`User added with ID: ${result.insertId}`);
    });
});

// Update an existing user
app.put('/users/:id', (request, response) => {
    const id = request.params.id;
 
    pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) throw error;
 
        response.send('User updated successfully.');
    });
});
*/


app.listen(port, () => console.log('Regalia running on port ' + port))
