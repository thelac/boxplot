var User = global.db.sequelize.define('User', {
  email: {
    type: global.db.Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: global.db.Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;
