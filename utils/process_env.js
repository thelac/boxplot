var fs = require('fs');

// load the env variables
var envPath = __dirname + '/../config/env.js';
if (fs.existsSync(envPath)) {
  var envConfig = require(envPath);
  Object.keys(envConfig).forEach(function(key){
    process.env[key] = envConfig[key];
  });
}