var Datum = function() {};

Datum.define = function(sequelize, DataTypes) {
  return sequelize.define('Datum', {
    count: DataTypes.INTEGER
  });
};

module.exports = Datum;
