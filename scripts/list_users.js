require('../config');
require(APP_ROOT + '/config/db');

global.db.User.all().success(function(users) {
  users.forEach(function(user) {
    console.log(user.email);
  });
});