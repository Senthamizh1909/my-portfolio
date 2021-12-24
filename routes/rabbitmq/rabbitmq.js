const express = require('express');
const router = express.Router();
const amqp = require('amqp');
const jackrabbit = require('jackrabbit');
const ensureAuthenticated = require('../auth/checkAuthentication');

const rabbitmq_url = process.env.AMQP_URL || 'amqp://guest:guest@localhost';
const topic = process.env.TOPIC || '#';

console.log('Opening connection to RabbitMQ');

const rabbit = jackrabbit(rabbitmq_url);
const exchange = rabbit.default();
var msgQueue;

/* LOGIN ROUTER */
router.get('/', ensureAuthenticated, function(req, res, next) {
    res.render('rabbitmq/rabbitmq');
});

router.post('/queue', ensureAuthenticated, function(req, res, next) {
    msgQueue = exchange.queue({name: topic, durable: true});

    const message = req.body.message;
    console.log('Message sent is: ' + message);

    exchange.publish({msg:message}, {key: topic});
    res.redirect('/rabbitmq');
    res.end();
});

router.get('/publish', ensureAuthenticated, function(req, res, next) {
    msgQueue = exchange.queue({name: '#', durable: true});
    msgQueue.consume(sendMsg);  
    res.render('rabbitmq/publish');
    res.end();
});

function sendMsg(data, ack) {
    console.log('Message received is: ' + JSON.stringify(data.msg));
    ack();
}           

// Export router
module.exports = router;