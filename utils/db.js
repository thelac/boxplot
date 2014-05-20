var User = require('../models/user');
var Datum = require('../models/datum');
var Group = require('../models/group');

if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize'),
    sequelize = null;

  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT
  });

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize
  };

  global.db.User = User.define(sequelize, Sequelize);
  global.db.Datum = Datum.define(sequelize, Sequelize);
  global.db.Group = Group.define(sequelize, Sequelize)
  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */
  // global.db.User.hasMany(global.db.Datum);
  global.db.Datum
    .hasOne(global.db.User)
    .belongsTo(global.db.User);

  global.db.User.hasMany(global.db.Datum);

  global.db.User.hasMany(global.db.Group);
  global.db.Group.hasMany(global.db.User);

  require('./sync_db')(false);
}
