module.exports = function(reset) {
  global.db.sequelize
    .sync({force: reset})
    .complete(function(err) {
      if ( !! err) {
        console.log('An error occurred while creating the table: ', err);
      } else {
        console.log('Database sync succesded; force was ' + reset);
      }
    });
};
