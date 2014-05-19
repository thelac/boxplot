var crypto = require('crypto');

var Group = function() {};

Group.define = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    creator: DataTypes.INTEGER
  });

  return Group;
};

Group.new = function(data, success, failure) {
  global.db.Group.create({
    name: data.name,
    creator: data.creator
  }).success(function(group) {
    success(group);
  }).error(function(err) {
    failure(err);
  });
};

Group.show = function() {
  // Dashboard view of charts
};

Group.addUser = function() {
  // Add a user (send email with hash and some instructions)
};
Group.removeUser = function() {
  // Remove a user and unlink data
};

Group.containsUser = function(id, user) {};

module.exports = Group;
