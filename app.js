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

var app = express();

// Database ====================================================================
require('./utils/db');

// Mailgun +====================================================================
require('./utils/mailgun')

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
var pg = require('pg');
var pgSession = require('connect-pg-simple')(require('connect'));

app.use(session({
  store: new pgSession({
    pg: pg,
    conString: process.env.SESSION_DATABASE_URL
  }),
  cookie: {
    maxAge: 72 * 60 * 60 * 1000
  },
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
app.get('*', function(req, res) {
  res.render('error.html', {
    auth: req.isAuthenticated()
  });
});


app.listen(process.env.PORT || 8000);

// TODO: this is incredibly bad practice
process.on('uncaughtException', function(exception) {
  console.log(exception);
});

// TODO: will set interval to poll gmail for data
var pollingFrequency = 10 * 60 * 1000;
setInterval(function() {
  require('./utils/poll').pollAll();
}, pollingFrequency);

module.exports = app;