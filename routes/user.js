var express = require('express');
var router = express.Router();

router.get('/groups', function(req, res) {
  req.user.getGroups().success(function(groups) {
    res.render('user/groups.html', {
      title: 'My Groups',
      groups: groups
    });
  });
});

router.get('/', function(req, res) {
  res.render('user/show.html', {
    title: req.user.name,
    user: req.user // get the user out of session and pass to template
  });
});

module.exports = router;
