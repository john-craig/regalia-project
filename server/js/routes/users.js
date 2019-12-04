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
    res.sendFile('dashboard.html', {root: './client'}));

router.get('/index', ensureAuthenticated, (req, res) => 
    res.sendFile('dashboard.html', {root: './client'}));

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    if(req.user.IsAdmin) { res.sendFile('adminDash.html', {root: './client'});}
    else { res.sendFile('dashboard.html', {root: './client'});}
});

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

router.post('/datatable/:date', (req, res) => {
    var date = req.params.date
    console.log(date)

    /*
    config.query("SELECT * FROM orders WHERE Date_Posted > '" + date + "'", (err, row) => {
        if(err) throw(err)

        console.log(row)
        res.send(row)
    });
    */

    config.query("SELECT " +
                    "orders.Date_Posted, orders.Height, orders.Weight, orders.Cap_Size, orders.Degree_Level, " + 
                    "orders.College_Name, orders.College_City, orders.College_State, " +
                    "users.Email, users.First_Name, users.Last_Name, users.ID " +
                    "FROM orders, users WHERE orders.UserID = users.ID AND Date_Posted > '" + date + "' ORDER BY Date_Posted DESC;", (err, row) => {
        if(err) throw(err)

        console.log(row)
        res.send(row)
    });
});

router.post('/promoteAdmin/:email', (req, res) => {

    var email = req.params.email;

    config.query("UPDATE users SET IsAdmin = 1 WHERE Email = '" + email + "'", (err, row) => {
        if(err) throw (err);
        console.log("user made admin" + row)
    });

});

router.post('/revokeUser/:email', adminAuthenticated, (req, res) => {

    var email = req.params.email;

    config.query("SELECT ID FROM users WHERE Email = '" + email + "';", (err, row) => {
        var user = row[0];
        console.log(user);
        if(user) {
            console.log("user found")
            var id = user.ID;

            config.query("DELETE FROM orders WHERE UserId = '" + id + "';", (err, row) => {
                if (err) throw err;
                console.log("orders deleted:" + row)
                config.query("DELETE FROM users WHERE Email = '" + email + "';", (err, row) => {
                    if(err) throw err;
                    console.log("user deleted: " + row)
                });
            });
            
        } else {
            console.log("no user by that email")
        };
    });
    
});

router.post('/changeSecret/:code', (req, res) => {
    //User should be validated as an administrator too-- but I'll work on that later
    var bit = true;
    var code = req.params.code;
    var len = 0;
    console.log(req.params.code);
    
    config.query("SELECT 1 FROM secrets WHERE Secret_Code = '"+code+"';", (err, res) => {
        if (err) throw err;
        len = res.length;

        console.log(len);
        if(len == 1) {
            console.log('code exists');
        } else {
            config.query("INSERT INTO secrets (Secret_Code) VALUES ('" + req.params.code + "');", (err, res) => {
                if(err) throw err;
            });  
        };
    });
    res.send(len);
});



module.exports = router;