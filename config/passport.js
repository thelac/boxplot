// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User = global.db.User;

// load the auth variables
var configAuth = require('./auth');

// expose this function to our app using module.exports
module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.find(id).success(function(user) {
      done(null, user);
    }).error(function(err) {
      done(err, null);
    });
  });

  // =========================================================================
  // GOOGLE SIGNUP ===========================================================
  // =========================================================================
  // TODO: should refactor this with Local Signup, but not doing now since we
  // will probably kill local signup (i.e., w/ username and password)
  passport.use('google', new GoogleStrategy({
      clientID: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      callbackURL: configAuth.googleAuth.callbackURL,
      passReqToCallback: true
    },
    function(req, token, refreshToken, profile, done) {
      process.nextTick(function() {
        User.find({
          where: {
            profileID: profile.id
          }
        }).success(function(user) {
          if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {

            var xoauth2 = require('xoauth2');
            var generator = xoauth2.createXOAuth2Generator({
              user: profile.emails[0].value,
              clientId: configAuth.googleAuth.clientID,
              clientSecret: configAuth.googleAuth.clientSecret,
              refreshToken: refreshToken
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

            User.create({
              email: profile.emails[0].value, // get first email address
              password: 'dummy', // TODO: remove; dummy password for now
              profileID: profile.id,
              token: token,
              refreshToken: refreshToken,
              name: profile.displayName
            }).success(function(user) {
              console.log('User created!');
              return done(null, user);
            })
          }
        }).error(function(error) {
          console.log(error);
          return done(error)
        });
      });
    }));

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.find({
        where: {
          email: email
        }
      }).success(function(user) {
        if (user) return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        else User.create({
          email: email,
          password: password
        }).success(function(user) {
          console.log(user);
          return done(null, false, req.flash('signupMessage', 'WOOOO!'));
        })
      }).error(function(error) {
        console.log(error);
        return done(error)
      })
    }));

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.find({
        where: {
          email: email
        }
      }).success(function(user) {
        if (user) {
          if (user.validatePassword(password)) return done(null, user)
          return done(null, false, req.flash('loginMessage', 'Bad password.'));
        } else return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
      }).error(function(error) {
        console.log(error);
        return done(error)
      })
    }));
};
