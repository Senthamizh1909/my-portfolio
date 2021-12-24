// Require Express
const express = require('express');

// Create new router
const router = express.Router();
const ensureAuthenticated = require('./auth/checkAuthentication');


// Handle about route
router.get('/', ensureAuthenticated, function(req, res, next) {
    res.render('about');
});

// Export router
module.exports = router;