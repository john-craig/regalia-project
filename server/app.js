const mysql = require('mysql');
const express = require('express');

const app = express()
app.use(express.static('client/public'));
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


app.listen(port, () => console.log('Regalia running on port ${port}!'))