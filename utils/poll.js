require('./db');
var Imap = require('imap');
var async = require('async');
var xoauth2 = require('xoauth2');

var pollUsers = function(users) {
  users.forEach(function(user) {

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

      var imap = new Imap({
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        xoauth2: token,
        connTimeout: 30000
      });

      imap.once('ready', function() {
        imap.openBox('INBOX', true, function(err, box) {
          var datum = global.db.Datum.create({
            count: box.messages.total
          })
            .success(function(d) {
              d.setUser(user);
              console.log('Polled user: ' + user.email + ' (' + d.count + ')');
              imap.destroy();
            })
        });
      });

      imap.once('error', function(err) {
        console.log('IMAP error: ' + err);
      });

      imap.once('end', function() {
        console.log('Connection ended');
      });

      imap.connect();
    });
  });
};

module.exports = {
  pollAll: function() {
    global.db.User.all().success(function(users) {
      pollUsers(users);
    });
  },
  pollGroup: function(gid) {
    global.db.Group.find(gid).success(function(group) {
      group.getUsers().success(function(users) {
        pollUsers(users);
      });
    });
  }
};