var env = require('../config/env');

// load the env variables
// var envPath = '../config/env.json';
// if (fs.existsSync(envPath)) {
//   var envConfig = require(envPath);
  Object.keys(env).forEach(function(key){
    process.env[key] = env[key];
  });
// }