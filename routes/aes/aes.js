const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../auth/checkAuthentication');

const CryptoJS = require("crypto-js");
const secert_key = '9d95139c95370b8132ec99bc3d6ed3c4052020ad1447c59c6e392677313a74e5935b4ae35dfaec822b946418bdc1ddc65666f3aeb660176d9f7a07a2a4a96ebe';


router.get('/', function(req, res, next) {
    res.render('aes/aes');
});

router.post('/result', ensureAuthenticated, function(req, res, next) {
	
    let statTags = {};

    statTags.secert = '\n secert  "' + secert_key + '"';

    const ciphertext = CryptoJS.AES.encrypt(req.body.username, secert_key).toString();

    statTags.sent = 'You sent the name "' + req.body.username + '"'
    //   res.send('Encrypted name  "' + ciphertext + '"');
    statTags.encrpted = '\n Encrypted name  "' + ciphertext + '"'

    // Decrypt
    const bytes = CryptoJS.AES.decrypt(ciphertext, secert_key);

    // res.send('Decrypted name  "' + bytes + '".');
    statTags.Decrypted = '\n Decrypted name  "' + bytes + '".'

    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    // res.send('Encoding to UTF*   "' + originalText + '".');
    statTags.Encoding = '\n Encoding to UTF*   "' + originalText + '".'

    // res.send(statTags);

    console.log(originalText);


    console.log(req.body.username)
    res.render('aes/aesResult', { aesResult : JSON.stringify(statTags) });
});

// Export router
module.exports = router;
