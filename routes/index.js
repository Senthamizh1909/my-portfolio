// Require Express
const express = require('express');

// Import data
const data = require('../data.json');

// Create new router
const router = express.Router();
const ensureAuthenticated = require('./auth/checkAuthentication');


// Handle index route
router.get('/', ensureAuthenticated, function(req, res, next) {
    res.locals.data = data.projects;
    res.render('index');
});

// Export router
module.exports = router;