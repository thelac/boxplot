if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize'),
    sequelize = null;

  if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
    // the application is executed on Heroku ... use the postgres database
    var match = process.env.HEROKU_POSTGRESQL_BRONZE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

    sequelize = new Sequelize(match[5], match[1], match[2], {
      dialect: 'postgres',
      protocol: 'postgres',
      port: match[4],
      host: match[3],
      logging: true //false
    })
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

  sequelize
    .sync({
      force: true
    })
    .complete(function(err) {
      if ( !! err) {
        console.log('An error occurred while creating the table:', err)
      } else {
        console.log('It worked!')
      }
    })

  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */
  global.db.User.hasMany(global.db.Datum);
}
