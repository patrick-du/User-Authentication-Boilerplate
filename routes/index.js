// Displays welcome page

// User Authentication is a web & mobile boilerplate application for account registration, login, and updates. 
// Developed this app for implementation in future projects and practice with Node JS (Express) and MongoDB.
// Utilized Passport JS, an authentication middleware, and adopted local username and password authentication strategy
// Stored accounts in MongoDB Atlas, a NoSQL database, and retrieved data through ad-hoc queries

// Require modules --> express, router
const express = require('express');
const router = express.Router();

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Export router
module.exports = router;