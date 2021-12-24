const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../auth/checkAuthentication');

router.get('/', ensureAuthenticated, async function(req, res, next) {
    try {
        await firstFunction();
        secondFunction();
        await thirdFunction();
    } catch (e) {
        console.log(e);
    } finally {
        res.render('asyncAndAwait/asyncAndAwait');
    }
});

async function firstFunction() {
    await thirdFunction();
    console.log("Its from first function");
}

function secondFunction() {
    console.log("Its from second function");
}

async function thirdFunction() {
    console.log("Its from third function");
    secondFunction();
}

// Export router
module.exports = router;