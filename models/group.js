var crypto = require('crypto');

var Group = function() {};

Group.define = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });

  return Group;
};

Group.new = function(name) {
  global.db.Group.create({
    name: name
  })
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

module.exports = Group;
