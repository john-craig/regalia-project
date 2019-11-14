//Express
const express = require('express');
const app = express();

//MySQL
const mysql = require('mysql');

//Validator
const { check , validationResult } = require('express-validator');

//bodyparser
const bodyParser = require('body-parser');

//Form session
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(express.static('client/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

app.use(cookieParser());
app.use(session({
    secret: 'positronx',
    saveUninitialized: false,
    resave: false,
}));

const port = 5050;

// Set database connection credentials
const config = mysql.createConnection ({
    host: '10.10.9.105',
    user: 'admin',
    password: 'Passw0rd',
    database: 'regalia',
    multipleStatements: true,
});

// Create a MySQL pool
//const pool = mysql.createPool(config);
//module.exports = pool;

//const pool = require('../data/config');

config.connect ((err) => {
    if(err) console.log(err);
    console.log("Database connected!");
})

app.get('/', function(req, res) {
    var ticket = req.param('ticket');
    if (ticket) {
        //Ticket validation goes here, or in the JS for the login page
        res.sendFile('index.html', {root: './client'})
    } else {
        res.redirect('/login')
    }
});

app.get('/login', function(req, res) {
    res.sendFile('thanks.html', {root: './client'})
})

app.get('/admin', function(req, res) {
    res.sendFile('admin.html', {root: './client'})
});

app.get('/form', function(req, res) {
    res.sendFile('regalia_form.html', {root: './client'})
});

app.get('/datatable', function(req, res) {
    res.sendFile('datatable.html', {root: './client'})
});

app.get('/thanks', function(req, res){
    res.sendFile('thanks.html', {root: './client'})
});



app.post('/submit', [
    check('fname').not().isEmpty().withMessage("First name is required."),
    chekc('lname').not().isEmpty().withMessage("Last name is required."),
] , (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    var data = req.body;

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

app.get('/api/datatable', function(req, res) {
    //res.send(tempData);

    //dataRow = [];

    config.query("SELECT FacultyID, First_Name, Last_Name, Email, Weight, Height, College_Name, College_City, College_State FROM faculty, gowns, colleges WHERE faculty.FacultyID = gowns.GownID", function (err, data) {       
        if (err) {
            console.error(err);
            return;
        }
        res.send(data)
        console.log(data[0]);
    })


    
})

app.post('/api/admin/add', function(req, res) {
    var sql = "INSERT INTO admin (Email) VALUES (" + req.body + ")"

    con.query(sql, function(err, result) {
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
