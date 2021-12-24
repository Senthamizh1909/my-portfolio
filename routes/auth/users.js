const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('./checkAuthentication');

/* GET users listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('sso/user', { user: req.user });
});

module.exports = router;
