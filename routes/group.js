var Group = require('../models/group');
var User = require('../models/user');
var express = require('express');
var utils = require('../utils/utils');
var async = require('async');
var router = express.Router();

router.get('/new', utils.isLoggedIn, function(req, res) {
  res.render('group/new.html', {
    title: 'New Group'
  });
});

router.post('/new', utils.isLoggedIn, function(req, res) {
  User.createGroup({
    user: req.user,
    name: req.body.name
  }, function(user, group) { // Success
    res.redirect('/user');
  }, function(user, error) { // Failure
    res.render('group/new.html', {
      message: req.flash('Group failed!')
    })
  });
});

router.post('/:id/add', utils.isLoggedIn, function(req, res) {
  global.db.Group.find(req.params.id)
    .success(function(group) {
      global.db.User.find({
        where: {
          email: req.body.email
        }
      }).success(function(user) {
        if (user) {
          group.addUser(user).success(function() {
            console.log('User ' + user.email + 'successfully added to ' + group.name + '!');
            res.redirect('/group/' + req.params.id);
          })
        } else {
          req.flash('groupManageMessage', 'Unable to add :( Invite your friend to sign up!');
          res.redirect('/group/' + req.params.id);
        }
      })
    })
});

router.get('/:gid/remove/:uid', utils.isLoggedIn, function(req, res) {
  isGroupCreator(req.params.gid, req.user.id, function(group, user) {
    if (user !== null) {
      group.removeUser(user).sucess(function() {
        var msg = 'User ' + user.email + ' removed from group ' + group.name + '.';
        console.log(msg);
        req.flash('groupManageMessage', msg);
        res.redirect('/group/' + req.params.gid);
      });
    }
  });
});

router.post('/:id/poll', utils.isLoggedIn, function(req, res) {

});

router.get('/:id/data', utils.isLoggedIn, function(req, res) {
  // TODO: this should be cleaned up massively
  // Should probably do straight up SQL query
  // Logic should also go elsewhere
  var results = [];

  global.db.Group.find(req.params.id).success(function(group) {
    group.getUsers().success(function(users) {
      async.each(users, function(user, userCallback) {
        user.getData().success(function(data) {
          async.each(data, function(datum, datumCallback) {
            results.push({
              time: datum.createdAt,
              count: datum.count,
              id: user.email
            });
            datumCallback();
          }, function(err) {
            userCallback();
          })
        })
      }, function(err) {
        res.json(results);
      });
    });
  });
});

router.get('/:id', utils.isLoggedIn, function(req, res) {
  global.db.Group.find(req.params.id)
    .success(function(group) {
      if (group && group.hasUser(req.user)) {
        group.getUsers().success(function(users) {
          isGroupCreator(req.params.id, req.user.id, function(group, user) {
            res.render('group/show.html', {
              title: group.name,
              group: group,
              users: users,
              creator: req.user.id,
              isCreator: user !== null,
              message: req.flash('groupManageMessage')
            });
          })
        })
      } else {
        res.render('error.html');
      };
    })
    .error(function(error) {
      console.log('Group id ' + req.params.id + ' not found.');
      res.render('error.html');
    })
})

function isGroupCreator(gid, uid, callback) {
  // TODO: should really replace these two queries with one on the
  // join table
  global.db.Group.find(gid)
    .success(function(group) {
      if (group && group.creator === uid) {
        global.db.User.find(uid)
          .success(function(user) {
            callback(group, user);
          })
      } else {
        callback(group, null);
      }
    })
};

module.exports = router;
