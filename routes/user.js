var express = require('express');
var router = express.Router();
var utils = require(APP_ROOT + '/utils/utils');
var validator = require('validator');
var nodemailer = require('nodemailer');

router.get('/', utils.isLoggedIn, function(req, res) {
  req.user.getGroups().success(function(groups) {
    res.render('user/show.html', {
      title: req.user.name,
      groups: groups,
      user: req.user // get the user out of session and pass to template
    });
  });
});


router.post('/invite', utils.isLoggedIn, function(req, res, next){
  // do email validation
  if (validator.isEmail(req.body.email)){

    var smtpTransport = nodemailer.createTransport("SMTP", {
      service: "Gmail",
      auth: {
        user:"darthsuo@gmail.com",
        pass: "yngsMfw88"
      }
    });

    var mailOptions = {
      from: "hello <your@mom.com>",
      to: req.body.email,
      subject: "Join boxplot!",
      text: "seriously, join!"
    }

    smtpTransport.sendMail(mailOptions, function (error, response) {
      if(error){
        console.log(error);
        res.send(500, "looks like something went wrong with email!");
      }
      else{
        console.log("Invite sent to:" + req.body.email);
        res.send("Invite sent!")
      }
    });

    smtpTransport.close()
  }

  else {
    res.send("500", "invalid email!")
  }

});


module.exports = router;
