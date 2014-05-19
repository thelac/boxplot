// load the auth variables
var configAuth = require('../config/auth');

module.exports = function(app, passport) {

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      res.render('index.html', {
        title: 'boxplot.io'
      });
    }
  });

  // =====================================
  // DASHBOARD PAGE ======================
  // =====================================
  app.get('/dash', function(req, res) {
    res.render('dashboard.html', {
      title: 'boxplot.io'
    });
  });

  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://mail.google.com',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    accessType: 'offline',
  }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.html', {
      user: req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // POLL ================================
  // =====================================

  app.get('/poll', isLoggedIn, function(req, res) {
    console.log(req.user)
    var xoauth2 = require('xoauth2');
    var generator = xoauth2.createXOAuth2Generator({
      user: req.user.email,
      clientId: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      refreshToken: req.user.refreshToken
    });

    generator.getToken(function(err, token) {
      if (err) {
        return console.log(err);
      }
      console.log("AUTH XOAUTH2 " + token);
      var Imap = require('imap');
      var imap = new Imap({
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        xoauth2: token,
        connTimeout: 30000
      });

      imap.once('ready', function() {
        console.log('connected!!!')
        imap.openBox('INBOX', true, function(err, box) {
          console.log(box.messages.total);
        });
      });

      imap.once('error', function(err) {
        console.log(err);
      });

      imap.once('end', function() {
        console.log('Connection ended');
      });

      imap.connect();

    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
};
