const express = require('express');
const router = express.Router();

//Login
router.get('/login', (req, res) => res.sendFile('login.html', {root: './client'}));

//Register
router.get('/register', (req, res) => res.sendFile('register.html', {root: './client'}));

module.exports = router;