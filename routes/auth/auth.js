const express = require('express');
const router = express.Router();
const passportGoogle = require('../../auth/google');
const User = require('../../models/User');

/* LOGIN ROUTER */
router.get('/login', function(req, res, next) {
  res.render('sso/login', { title: 'Please Sign In with:' });
});

/* LOGOUT ROUTER */
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/* GOOGLE ROUTER */
router.get('/google',
  passportGoogle.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/portfolio');
  });

module.exports = router;
