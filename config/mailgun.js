require(APP_ROOT + '/config/process_env');
var Mailgun = require('mailgun').Mailgun;

if (!global.hasOwnProperty('mg')) {
  global.mg = new Mailgun(process.env.MAILGUN_API_KEY);
}