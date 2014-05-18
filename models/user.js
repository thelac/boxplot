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
    }
  }, {
    instanceMethods: {
      setPassword: function(password, done) {
        var salt = bcrypt.genSalt(10, function(err, salt) {
          var hash = bcrypt.hash(password, salt, function(error, encrypted) {
            this.password = encrypted;
            this.salt = salt;
            return done(null, null);
          });
          return hash;
        });
        return salt;
      },
      verifyPassword: function(password, done) {
        var valid = bcrypt.compare(password, this.password, function(err, res) {
          return done(err, res);
        });
        return valid;
      },
      validatePassword: function(password, done) {
        return password === this.password;
      }
    }
  });

  return User;
};
