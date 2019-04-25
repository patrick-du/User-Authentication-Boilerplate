const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Dashboard Page
router.get('', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        name: req.user.name,
        email: req.user.email,
        password: req.user.password,
        date: req.user.date
    })
});

router.get('/update', ensureAuthenticated, (req, res) => {
    res.render('update', {
        name: req.user.name,
        email: req.user.email,
        password: req.user.password,
        date: req.user.date
    })
});

module.exports = router;