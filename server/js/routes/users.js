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

    console.log(userData);
    console.log(formData);
})

module.exports = router;