const mysql = require('mysql');
// Set database connection credentials
const config = {
    host: '10.10.9.105',
    user: 'admin',
    password: 'Passw0rd',
    database: 'regalia',
};
// Create a MySQL pool
const pool = mysql.createPool(config);
module.exports = pool;

const pool = require('../data/config');

// Display all users
app.get('/faculty', (request, response) => {
    pool.query('SELECT * FROM faculty', (error, result) => {
        if (error) throw error;
 
        response.send(result);
    });
});

// Display a single user by ID
app.get('/faculty/:id', (request, response) => {
    const id = request.params.id;
 
    pool.query('SELECT * FROM faculty WHERE id = ?', id, (error, result) => {
        if (error) throw error;
 
        response.send(result);
    });
});


// Add a new user
app.post('/faculty', (request, response) => {
    pool.query('INSERT INTO faculty SET ?', request.body, (error, result) => {
        if (error) throw error;
 
        response.status(201).send(`User added with ID: ${result.insertId}`);
    });
});

// Update an existing user
app.put('/faculty/:id', (request, response) => {
    const id = request.params.id;
 
    pool.query('UPDATE faculty SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) throw error;
 
        response.send('User updated successfully.');
    });
});



