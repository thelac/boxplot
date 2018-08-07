var Group = require(APP_ROOT + '/models/group');
var User = require(APP_ROOT + '/models/user');
var express = require('express');
utils = require(APP_ROOT + '/utils/utils');
var async = require('async');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/new', utils.isLoggedIn, function(req, res) {
  res.render('group/new.html', {
    title: 'New Group'
  });
});

router.post('/new', utils.isLoggedIn, function(req, res) {
  var proposedName = req.body.name,
      normProposedName = utils.normalizeName(proposedName),
      conflictingName = false;

  global.db.Group.findAll()
    .success(function(allGroups) {
      for (var ind = 0; ind < allGroups.length; ind++) {
        var existingGroup = utils.normalizeName(allGroups[ind].name);
        if (existingGroup === normProposedName) {
          conflictingName = true;
        }
      }
      if (conflictingName) {
        res.render('error.html', {
          errorMsg: "A group with that name already exists!",
          auth: req.isAuthenticated()
        });
      } else {
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
      }
    })
    .error(function(error) {
      res.render('error.html');
    });
});

router.post('/:id/add', utils.isLoggedIn, function(req, res, next) {
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
              console.log('User ' + user.email + ' successfully added to ' + group.name + '!');
              res.send('success');
            })
            .error(function(error) {
              res.render('error.html');
            });
          } else {
            res.send(500, 'Not a user!')
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

router.get('/:id/:span/data/', utils.isLoggedIn, function(req, res) {
  // TODO: this should be cleaned up massively
  // Should probably do straight up SQL query
  // Logic should also go elsewhere
  var results = [];

  var cutoff, samplingMultiplier;
  switch (req.params.span) {
    case 'day':
      cutoff = new Date(
          new Date().getTime() - (24 * 60 * 60 * 1000)
        );
      samplingMultiplier = 1;
      break;
    case 'week':
      cutoff = new Date(
          new Date().getTime() - (24 * 60 * 60 * 1000 * 7)
        );
      samplingMultiplier = 4;
      break;
  }

  global.db.Group.find(req.params.id).success(function(group) {
    group.getUsers().success(function(users) {
      async.each(users, function(user, userCallback) {
        user.getData().success(function(data) {
          var dataIdx = 0;
          async.each(data, function(datum, datumCallback) {
            if (dataIdx % samplingMultiplier === 0 &&
              datum.createdAt > cutoff) {
              results.push({
                time: datum.createdAt,
                count: datum.count,
                id: user.email
              });
            }
            dataIdx++;
            datumCallback();
          }, function(err) {
            userCallback();
          });
        });
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
            res.redirect(req.params.id + '/day');
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

router.get('/:id/:span', utils.isLoggedIn, function(req, res) {
  isMemberOf(req.params.id, req.user.id, function(error, group, user, isMember) {
    if (isMember && group) {
      group.getUsers()
        .success(function(users) {
          isGroupCreator(req.params.id, req.user.id, function(group, isCreator) {
            res.render('group/views/' + req.params.span + '.html', {
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

router.delete('/:id', utils.isLoggedIn, function(req, res, next) {
  var gid = req.params.id;
  global.db.Group.find(gid)
    .success(function(group) {
      var uid = req.user.id;
      if (group) {
        isGroupCreator(gid, uid, function(group, isCreator) {
          if (isCreator) {
            group.destroy()
              .success(function() {
                return res.status(200).send('Group Deleted Successfully');
              })
              .error(function(error) {
                return next(error);
              });
          } else {
            return next('Not Authorized to delete that group');
          }
        });
      } else {
        return next('Group with id ' + req.params.id + ' not found');
      }
    })
    .error(function(error) {
      // Calling `next` sends this to the next route, which is usually the error handler
      return next(error);
    });
});

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
