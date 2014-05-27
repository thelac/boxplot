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
  if (validator.isEmail(req.body.email)) {
    var data = {
      from: "Boxplot <invite@boxplot.io>",
      to: req.body.email,
      subject: "Join Boxplot!",
      text: "do it boxplot.io"
    };

    global.mg.sendText("invite@boxplot.io", req.body.email, "Join Boxplot!", "Go to boxplot.io to sign up!", function (err) {
      if (err) {
        res.send(500, "looks like something went wrong!")
      }
      else {
        res.send("invited")
      }
    });
  }

  else {
    res.send(500, "invalid email!")
  }

});


module.exports = router;
