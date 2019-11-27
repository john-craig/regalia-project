const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../auth');

router.get('/', forwardAuthenticated, (req, res) => res.send("<p>Logged in</p>"));

router.get('/form', ensureAuthenticated, (req, res) => 
    res.sendFile('regalia_form.html', {root: './client'}));


module.exports = router;