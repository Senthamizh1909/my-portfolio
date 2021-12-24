// Imports
const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../auth/checkAuthentication');

/**
 * Home page
 * 
 */
router.get('/', ensureAuthenticated, (req, res, next) => {
	res.render('pages/index');
});

module.exports = router;