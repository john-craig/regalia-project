const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { ensureAuthenticated, forwardAuthenticated, adminAuthenticated } = require('../auth');

const config = mysql.createConnection ({
    host: '10.10.9.105',
    user: 'admin',
    password: 'Passw0rd',
    database: 'regalia',
    multipleStatements: true,
});


router.get('/', ensureAuthenticated, (req, res) => 
res.sendFile('index.html', {root: './client'}));

router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.sendFile('index.html', {root: './client'}));

router.get('/form', ensureAuthenticated, (req, res) => 
    res.sendFile('regalia_form.html', {root: './client'}));

router.get('/thanks', ensureAuthenticated, (req, res) =>
    res.sendFile('thanks.html', {root: './client'}));

    //this is the admin route, uses adminAuthenticated. if a non admin clicks the link it redirects to their dashboard. admins get redirected to admin page
router.get('/admin', adminAuthenticated, (req, res) =>
    res.sendFile('admin.html', {root: './client'}));

router.post('/submitForm', (req, res) => {
    console.log(req.body)
    console.log(req.user)

    var formData = req.body;
    var userData = req.user;

    var date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    
    let id = userData.id;
    let cur_date = yyyy + "-" + mm + "-" + dd;
    let height = formData.heightFeet + "'" + formData.heightInches;
    let weight = formData.weight;
    let capsize = formData.cap_size;
    let degree = formData.degree;
    let name = formData.college_name;
    let city = formData.college_city;
    let state = formData.college_state;

    config.query('INSERT INTO orders '
                + '(UserID, '
                + 'Date_Posted, '
                + 'Height, ' 
                + 'Weight, '
                + 'Cap_Size, '
                + 'Degree_Level, '
                + 'College_Name, '
                + 'College_City, '
                + 'College_State) '
                + 'VALUES '
                + '( "' + id + '", '
                + '"' + cur_date + '", '
                + '"' + height + '", '
                + '"' + weight + '", '
                + '"' + capsize + '", '
                + '"' + degree + '", '
                + '"' + name + '", '
                + '"' + city + '", '
                + '"' + state + '");',
                (err) => {
                    if(err) throw err;
                });
    res.redirect('thanks');
});


router.post('/promoteAdmin', adminAuthenticated, (req, res) => {
    var data = req.body
    var email = data.email

    config.query("UPDATE users SET IsAdmin = 1 WHERE Email = '" + email + "'", (err, row) => {
        if(err) throw (err);

        console.log(row)
    });

    res.redirect('/admin')
});

router.post('/revokeUser', adminAuthenticated, (req, res) => {
    var data = req.body
    var email = data.email

    config.query("UPDATE users SET Hashed_Pass = 'NEFAS' WHERE Email = '" + email + "'", (err, row) => {
        if(err) throw (err);
        res.send('/')
    });

    res.redirect('/admin')
});

router.post('/changeSecret', adminAuthenticated, (req, res) => {
    //User should be validated as an administrator too-- but I'll work on that later

    config.query("INSERT INTO secrets (Secret_Code) VALUES ('" + req.body.passcode + "')", (err, res) => {
        if(err) throw err;
    });

    res.redirect('/admin')
});

module.exports = router;