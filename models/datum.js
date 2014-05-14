module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Datum', {
    count: DataTypes.INTEGER
  });
};
