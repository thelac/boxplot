var crypto = require('crypto');

var Group = function() {};

Group.define = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    hash: DataTypes.STRING
  });

  return Group;
};

Group.new = function(name) {
  global.db.Group.create({
    name: name,
    hash: crypto.createHash('md5').update(name).digest('hex')
  })
};

Group.show = function() {};

Group.addUser = function() {};
Group.removeUser = function() {};

module.exports = Group;
