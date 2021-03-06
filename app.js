// Master file

// User Authentication is a web & mobile boilerplate application for account registration, login, and updates. 
// Developed this app for implementation in future projects and practice with Node JS (Express) and MongoDB.
// Utilized Passport JS, an authentication middleware, and adopted local username and password authentication strategy
// Stored accounts in MongoDB Atlas, a NoSQL database, and retrieved data through ad-hoc queries

// Require modules --> express, ejs, mongoose, passport, flash, session, app
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express();

// Passport Configs
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Static Files
app.use(express.static('./public'));

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/dashboard', require('./routes/dashboard'));

// Set PORT to be passed into app.listen();
const PORT = process.env.PORT || 5000;

// Listen to PORT 5000 OR PORT ___ for hosting
app.listen(PORT, console.log(`Server started on port ${PORT}`));