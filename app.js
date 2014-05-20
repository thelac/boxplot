require('./utils/process_env.js');

var express = require('express');
var session = require('express-session')
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

var passport = require('passport');
var flash = require('connect-flash');

var activator = require('activator');
var User = require('./models/user');

var app = express();

// Database ====================================================================
require('./utils/db');

// Authentication ==============================================================
require('./config/passport')(passport);

// configuration ===============================================================
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use('/public', express.static(process.cwd() + '/public'));

// required for passport
app.use(session({
  secret: process.env.PASSPORT_SESSION_SECRET
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/index.js')(app, passport);
var users = require('./routes/user');
var groups = require('./routes/group');

app.use('/user', users);
app.use('/group', groups);

app.listen(process.env.PORT || 8000);

// TODO: this is incredibly bad practice
process.on('uncaughtException', function (exception) {
  console.log(exception);
});

// TODO: will set interval to poll gmail for data
var pollingFrequency = 10 * 60 * 1000;
setInterval(function() {
  require('./utils/poll')();
}, pollingFrequency);

module.exports = app;
