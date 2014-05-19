var Group = require('../models/group');
var User = require('../models/user');
var express = require('express');
var router = express.Router();

router.get('/new', function(req, res) {
  res.render('group/new.html', {
    title: 'New Group'
  });
});

router.post('/new', function(req, res) {
  User.createGroup({
    user: req.user,
    name: req.body.name
  }, function(user, group) { // Success
    res.redirect('/user/groups');
  }, function(user, error) { // Failure
    res.render('group/new.html', {
      message: req.flash('Group failed!')
    })
  });
});

router.get('/:id', function(req, res) {
  global.db.Group.find(req.params.id)
    .success(function(group) {
      if(group && group.hasUser(req.user)) {
        res.render('group/show.html', {
          title: 'Group ' + group.name,
          group: group
        });
      } else {
        res.render('error.html');
      };
    })
    .error(function(error) {
      console.log('Group id ' + req.params.id + ' not found.');
      res.render('error.html');
    })
})

module.exports = router;
