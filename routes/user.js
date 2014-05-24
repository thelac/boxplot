var express = require('express');
var router = express.Router();
var utils = require(APP_ROOT + '/utils/utils');

router.get('/', utils.isLoggedIn, function(req, res) {
  req.user.getGroups().success(function(groups) {
    res.render('user/show.html', {
      title: req.user.name,
      groups: groups,
      user: req.user // get the user out of session and pass to template
    });
  });
});

module.exports = router;
