// load all the things we need
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true
    },
    function(req, token, refreshToken, profile, done) {
      process.nextTick(function() {
        if (req.user) {
          return done(null, req.user);
        } else {
          User.find({
            where: {
              profileID: profile.id
            }
          }).success(function(user) {
            if (user) {
              return done(null, user);
            } else {
              User.create({
                email: profile.emails[0].value.toLowerCase(), // get first email address
                profileID: profile.id,
                token: token,
                refreshToken: refreshToken,
                name: profile.displayName
              }).success(function(user) {
                var msg = 'New user ' + user.email + '!';
                global.mg.sendText('danielsuo@gmail.com', 'danielsuo@gmail.com', msg, 'Move along, folks.', {}, function(err) {
                  err && console.log(err);
                  console.log(msg);
                });
                return done(null, user);
              })
            }
          }).error(function(error) {
            return done(error);
          });
        }
      });
    }));
};