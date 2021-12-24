const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../auth/checkAuthentication');
const fs = require('fs');

/* GET users listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {
    
    const myFile = 'sample.txt';
    fs.readFile(myFile, 'utf8', function(err, first) {
        if (err) return console.log(err);

        first = first + '\nAppended something for first time';
        fs.writeFile(myFile, first, function(err) {
            if(err) return console.log(err);
            console.log('Appended first text!');
            
            fs.readFile(myFile, 'utf8', function(err, second) {
                if (err) return console.log(err);

                second = second + '\nAppended something for second time';
                fs.writeFile(myFile, second, function(err) {
                    if(err) return console.log(err);
                    console.log('Appended second text!');

                    fs.readFile(myFile, 'utf8', function(err, third) {
                        if (err) return console.log(err);
        
                        third = third + '\nAppended something for third time';
                        fs.writeFile(myFile, third, function(err) {
                            if(err) return console.log(err);
                            console.log('Appended third text!');

                            fs.readFile(myFile, 'utf8', function(err, fourth) {
                                if (err) return console.log(err);
                
                                fourth = fourth + '\nAppended something for fourth time';
                                fs.writeFile(myFile, fourth, function(err) {
                                    if(err) return console.log(err);
                                    console.log('Appended fourth text!');
                                    res.render('callback/callback');
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
  
module.exports = router;
