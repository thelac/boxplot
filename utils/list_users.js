require('./process_env');
require('./db');

global.db.User.all().success(function(users) {
  users.forEach(function(user) {
    console.log(user.email);
  });
});