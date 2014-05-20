// config/auth.js

// expose our config directly to our application using module.exports

// It's a really bad idea to have these here; when we actually implement
// the dev / prod environment dichotomy, we'll have the developers' test
// environments here and store the prod clientID/secrets in Heroku config
// variabls
module.exports = {
  'googleAuth': {
    'clientID': '965010516033-3hlav83m5vblmavmpm37r99gafs962ip.apps.googleusercontent.com',
    'clientSecret': 'MxdGn0KOY1gbEHcystCAUtQ7',
    'callbackURL': 'http://127.0.0.1:8000/auth/google/callback'
  }
};
