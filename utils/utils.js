module.exports = {
  cleanDir: function(dir) {
    dir = dir === undefined ? '.' : dir;
    dir = dir.substr(dir.length - 1) === '/' ?
      dir.substring(0, dir.length - 1) : dir;

    return dir;
  },
  // route middleware to make sure a user is logged in
  isLoggedIn: function(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
  }
};
