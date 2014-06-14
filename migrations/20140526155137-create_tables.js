// Taken from: http://bulkan-evcimen.com/using_sequelize_migrations_with_an_existing_database.html

var async = require('async'),
  fs = require('fs'),
  pg = require('pg');

module.exports = {
  up: function(migration, DataTypes, done) {

    var db = migration.migrator.sequelize;

    async.waterfall([

      function(callback) {
        fs.readFile(__dirname + '/initial.sql', function(err, data) {
          if (err) {
            throw err;
          }
          callback(null, data.toString());
        });
      },

      function(initialSchema, callback) {
        // need to split on ';' to get the individual CREATE TABLE sql
        // as db.query can execute on query at a time
        var tables = initialSchema.split(';');

        function createTable(tableSql, doneCreate) {
          db.query(tableSql).complete(doneCreate);
        }

        async.each(tables, createTable, callback);
      }
    ], function(err, result) {
      if (err) {
        console.log(err);
      } else {
        done();
      }
    });
  },

  down: function(migration, DataTypes, done) {
    migration.showAllTables().success(function(tableNames) {

      // Dont drop the SequelizeMeta table
      var tables = tableNames.filter(function(name) {
        return name.toLowerCase() !== 'sequelizemeta';
      });

      function dropTable(tableName, callback) {
        migration.dropTable(tableName).complete(callback);
      }

      async.each(tables, dropTable, done);
    });
  }
};