// Deals with all dashboard-related logic
// Includes updating user info


// Require modules --> express, router, bcrypt, passport, config/auth
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

// User Model
const User = require('../models/User');

// Dashboard Page
router.get('', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        name: req.user.name,
        email: req.user.email,
        password: req.user.password,
        date: req.user.date
    })
});

// Old Email to be set in Update Page and passed into Update Handle
let oldEmail = "";

// Update Page
router.get('/update', ensureAuthenticated, (req, res) => {
    oldEmail = req.user.email

    res.render('update', {
        name: req.user.name,
        email: req.user.email,
        password: req.user.password,
        date: req.user.date
    })
});


// Update Handle
router.post('/update', ensureAuthenticated, (req, res) => {
    const { newName, newEmail, newPassword } = req.body;
    let errors = [];

    // Check required fields
    if (!newName || !newEmail || !newPassword) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // Check pass length
    if (newPassword.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    // If there are any errors, re-render with errors
    if (errors.length > 0) {
        res.render('update', {
            errors,
        })
    } else {
        // Set data to be stored
        let newData = { name: newName, email: newEmail, password: newPassword };

        // Hash password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newData.password, salt, (err, hash) => {
                if (err) throw err;
                newData.password = hash;
                console.log(newData.password);

                // Record to MongoDB
                User.updateOne({ email: oldEmail }, newData, (err, collection) => {
                    if (err) throw err;
                    console.log('Record updated successfully');
                })
            })
        })

        // Flash success message and redirect to dashboard
        req.flash('success_msg', 'You have successfuly updated account details');
        res.redirect('/dashboard');
    }

})

// Export router
module.exports = router;


