module.exports = function(app, passport) {

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/user');
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
    approvalPrompt: 'force' // TODO: remove
  }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/user',
      failureRedirect: '/'
    }));

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};
