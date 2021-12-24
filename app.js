// Import dependencies and routes
if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config()
}
const express = require('express');
const indexRoutes = require('./routes');
const aboutRoutes = require('./routes/about');
const projectRoutes = require('./routes/project');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const razorpayIndexRoutes = require('./routes/razorpay/index');
const paymentWebRoutes = require('./routes/razorpay/payments');
const authIndex = require('./routes/auth/index');
const usersRoutes = require('./routes/auth/users');
const authRoutes = require('./routes/auth/auth');
const aesRoutes = require('./routes/aes/aes');
const threeFuncRoutes = require('./routes/three-functions/threefunc');
const rabbitMQRoutes = require('./routes/rabbitmq/rabbitmq');
const joinCollectionRoutes = require('./routes/mongo-three-collections/threecollections');
const callbackHellRoutes = require('./routes/callback/callbackhell');

// Port
const port = process.env.PORT || 3000;

// Create Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('[STATUS] Connected to Database'));


// Set view engine to Pug
app.set('view engine', 'pug');

app.use(cookieParser());

// Serve static files
app.use('/static', express.static('public'));

// Configure bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(session({
    secret: 's3cr3t',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Auth Routes
app.use('/', authIndex);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

// Routes
app.use('/portfolio', indexRoutes);
app.use('/about', aboutRoutes);
app.use('/project', projectRoutes);

// Web Routes
app.use('/razorpay', razorpayIndexRoutes);
app.use('/payment', paymentWebRoutes);

// AES Routes
app.use('/aes', aesRoutes);

// Three Function Routes
app.use('/threefunc', threeFuncRoutes);

// RabbitMQ
app.use('/rabbitmq', rabbitMQRoutes);

// Mongo Join Three Collections
app.use('/mongo', joinCollectionRoutes);

// CallBack Hell
app.use('/callbackhell', callbackHellRoutes);

// // Handle errors
// app.use((req, res, next) => {
//     const err = new Error('Something went wrong');
//     err.status = 500;
//     next(err);
// });

// app.use((err, req, res, next) => {
//     res.locals.error = err;
//     res.status(err.status).render('error');
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// // Create server
// app.listen(port, () => console.log(`App is listening to port ${port}`));

module.exports = app;
