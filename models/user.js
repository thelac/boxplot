var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileID: DataTypes.STRING,
    token: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
    name: DataTypes.STRING
  });

  return User;
};
