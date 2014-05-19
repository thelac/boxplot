if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize'),
    sequelize = null;

  if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
    // the application is executed on Heroku ... use the postgres database
  } else {
    // the application is executed on the local machine ... use mysql
    sequelize = new Sequelize('boxplot', null, null, {
      host: 'localhost',
      dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
      port: 5432, // or 5432 (for postgres)
    });
  }

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: sequelize.import('../models/user'),
    Datum: sequelize.import('../models/datum')
  }

  require('./sync_db')(false);
  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */
  // global.db.User.hasMany(global.db.Datum);
  global.db.Datum
    .hasOne(global.db.User)
    .belongsTo(global.db.User);
}