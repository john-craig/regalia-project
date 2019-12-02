const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../auth');

router.get('/', ensureAuthenticated, (req, res) => 
res.sendFile('index.html', {root: './client'}));

router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.sendFile('index.html', {root: './client'}));

router.get('/form', ensureAuthenticated, (req, res) => 
    res.sendFile('regalia_form.html', {root: './client'}));

router.post('/submitForm', (req, res) => {

    var formData = req.body;
    var userData = req.user;

    var date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth();
    let yyyy = date.getFullYear();
    
    
    //console.log(userData);
    //console.log(formData);

    let id = userData.id;
    let cur_date = yyyy + "-" + mm + "-" + dd;
    console.log(cur_date);
})

module.exports = router;