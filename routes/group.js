var Group = require(APP_ROOT + '/models/group');
var User = require(APP_ROOT + '/models/user');
var express = require('express');
utils = require(APP_ROOT + '/utils/utils');
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
    });
  });
});

router.post('/:id/add', utils.isLoggedIn, function(req, res) {
  isMemberOf(req.params.id, req.user.id, function(error, group, user, isMember) {
    if (isMember && group) {
      global.db.User.find({
        where: {
          email: req.body.email.toLowerCase()
        }
      })
        .success(function(user) {
          if (user) {
            group.addUser(user).success(function() {
              console.log('User ' + user.email + 'successfully added to ' + group.name + '!');
              res.redirect('/group/' + req.params.id);
            })
            .error(function(error) {
              res.render('error.html');
            });
          } else {
            req.flash('groupManageMessage', 'Unable to add :( Invite your friend to sign up!');
            res.redirect('/group/' + req.params.id);
          }
        })
        .error(function(error) {
          res.render('error.html');
        });
    } else {
      res.render('denied.html', {
        auth: req.isAuthenticated()
      });
    }
  });
});

router.get('/:gid/remove/:uid', utils.isLoggedIn, function(req, res) {
  isGroupCreator(req.params.gid, req.user.id, function(group, isCreator) {
    if (isCreator) {
      global.db.User.find(req.params.uid)
        .success(function(user) {
          group.removeUser(user).success(function() {
            var msg = 'User ' + user.email + ' removed from group ' + group.name + '.';
            console.log(msg);
            req.flash('groupManageMessage', msg);
            res.redirect('/group/' + req.params.gid);
          });
        })
        .error(function(error) {
          res.render('error.html');
        });
    }
  });
});

router.get('/:id/poll', utils.isLoggedIn, function(req, res) {
  // TODO: should add check to see if user is in group
  // TODO: should set rate limits here or something...
  require(APP_ROOT + '/utils/poll').pollGroup(req.params.id);
  req.flash('groupManageMessage', 'Group data polled!');
  res.redirect('/group/' + req.params.id);
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
  isMemberOf(req.params.id, req.user.id, function(error, group, user, isMember) {
    if (isMember && group) {
      group.getUsers()
        .success(function(users) {
          isGroupCreator(req.params.id, req.user.id, function(group, isCreator) {
            res.render('group/show.html', {
              title: group.name,
              group: group,
              users: users,
              creator: req.user.id,
              isCreator: isCreator,
              message: req.flash('groupManageMessage')
            });
          });
        })
        .error(function(error) {
          res.render('error.html');
        });
    } else {
      res.render('denied.html', {
        auth: req.isAuthenticated()
      });
    }
  });
});

function isMemberOf(gid, uid, callback) {
  // Will return (error, group, user, isMember)
  global.db.Group.find(gid)
    .success(function(group) {
      if (group) {
        global.db.User.find(uid)
          .success(function(user) {
            if (user) {
              group.hasUser(user)
                .success(function(hasUserResult) {
                  if (hasUserResult) {
                    callback(null, group, user, true);
                  } else {
                    callback(null, group, user, false);
                  }
                });
            } else {
              callback(null, group, null, false);
            }
          })
          .error(function(error){
            callback(error, null, null, false);
          });
      } else {
        // Should the response be different if the group doesn't exist?
        // I'm mimicking isGroupCreator for now
        var error = "No group with that id";
        callback(error, null, null, false);
      }
    });
}

function isGroupCreator(gid, uid, callback) {
  // TODO: should really replace these two queries with one on the
  // join table
  global.db.Group.find(gid)
    .success(function(group) {
      if (group && group.creator === uid) {
        callback(group, true);
      } else {
        callback(group, false);
      }
    });
}

module.exports = router;
