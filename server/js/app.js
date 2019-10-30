const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express()
app.use(express.static('client/public'));
app.use(bodyParser.urlencoded()); 
app.use(bodyParser.json());
const port = 5050;

// Set database connection credentials
const config = mysql.createConnection ({
    host: '10.10.9.105',
    user: 'admin',
    password: 'Passw0rd',
    database: 'regalia',
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
    res.sendFile('index.html', {root: './client'})
});

app.get('/admin', function(req, res) {
    res.sendFile('admin.html', {root: './client'})
});

app.get('/form', function(req, res) {
    res.sendFile('regalia_form.html', {root: './client'})
});

app.post('/api/submit', function(req, res) {

    var data = req.body;
    

    var fac_sql = "INSERT INTO faculty (FacultyID, First_Name, Last_Name, Email) VALUES ()";
    var gow_sql = "INSERT INTO gowns (Height, Weight) VALUES ()"
    var cap_sql = "INSERT INTO caps (Cap_Size) VALUES ()"
    var col_sql = "INSERT INTO college(College_Name, College_City, College_State) "

    
    //con.query(fac_sql, function(err, result) {
    //    if (err) throw err;
    //});
    console.log(req);
})
    
    

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
