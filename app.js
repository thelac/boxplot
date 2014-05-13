var express      = require('express');
var session      = require('express-session')
var path         = require('path');
var favicon      = require('static-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var nunjucks     = require('nunjucks');

var passport     = require('passport');
var flash        = require('connect-flash');

var app          = express();

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
app.use(session({ secret: 'theleatherapronclub' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/index.js')(app, passport);
var users  = require('./routes/users');
var groups = require('./routes/groups');

app.use('/users', users);
app.use('/groups', groups);

app.listen(process.env.PORT || 8000);

module.exports = app;

// Database=====================================================================
var Sequelize = require('sequelize')
  , sequelize = new Sequelize('boxplot', null, null, {
      host: 'localhost',
      dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
      port:    5432, // or 5432 (for postgres)
    })
 
sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })
