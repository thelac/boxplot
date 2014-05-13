// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = global.db.User;

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
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

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
};
