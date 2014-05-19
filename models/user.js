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

User.new = function() {};
User.show = function() {};

User.createGroup = function () {};
User.deleteGroup = function() {};
User.showGroups = function() {};

module.exports = User;
