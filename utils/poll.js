require('./db');

// load the auth variables
var configAuth = require('../config/auth');

global.db.User.all().success(function(users) {
  for (i in users) {
    var user = users[i];
    var xoauth2 = require('xoauth2');
    var generator = xoauth2.createXOAuth2Generator({
      user: user.email,
      clientId: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      refreshToken: user.refreshToken
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
          var datum = global.db.Datum.create({
            count: box.messages.total
          })
            .success(function(d) {
              d.setUser(user);
              console.log(d.count);
            })
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
  }
});
