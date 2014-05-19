var Group = require('./group');

var User = function() {};

User.define = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    profileID: DataTypes.STRING,
    token: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
    name: DataTypes.STRING
  });

  return User;
};

User.new = function(data, callback, error) {
  User.create({
    email: data.email,
    profileID: data.profileID,
    token: data.token,
    refreshToken: data.refreshToken,
    name: data.name
  }).success(function(user) {
    callback(user);
  }).error(function(err) {
    error(err);
  })
};

User.show = function() {
  // Show user profile
};

User.find = function() {

};

User.createGroup = function(data, success, failure) {
  Group.new({name: data.name, creator: data.user.id}, function(group) {
    group.addUser(data.user).success(function() {
      success(data.user, group);
    })
  }, function(error) {
    failure(data.user, error);
  });
};
User.deleteGroup = function() {
  // Only creator should be able to delete
};
User.joinGroup = function() {
  // Join group; requires group hash
};
User.leaveGroup = function() {
  // Leave group
};
User.showGroups = function() {
  // Show list of current groups
};

module.exports = User;
