require('./db');

module.exports = function() {


  global.db.User.all().success(function(users) {
    users.forEach(function(user) {
      var xoauth2 = require('xoauth2');

      var generator = xoauth2.createXOAuth2Generator({
        user: user.email,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
                console.log(user.email)
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
    });
  });
};
