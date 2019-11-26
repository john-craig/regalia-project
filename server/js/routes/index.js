const express = require('express');
const router = express.Router();

//Index (redirects to login page)
router.get('/', (req, res) => res.sendFile('login.html', {root: './client'}));

//Login
router.get('/login', (req, res) => res.sendFile('login.html', {root: './client'}));

//Register
router.get('/register', (req, res) => res.sendFile('register.html', {root: './client'}));

//Form
router.get('/form', (req, res) => res.sendFile('regalia_form.html', {root: './client'}));

//Admin view
router.get('/admin', (req, res) => res.sendFile('admin.html', {root: './client'}));

//Thank You page
router.get('/thanks', (req, res) => res.sendFile('thanks.html', {root: './client'}));

module.exports = router;