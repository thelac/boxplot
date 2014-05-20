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

User.new = function() {
  // Create new user
};
User.show = function() {
  // Show user profile
};

User.createGroup = function () {
  // Should tie creator to new group
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
