// Require modules --> express, router
const express = require('express');
const router = express.Router();

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Export router
module.exports = router;