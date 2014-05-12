var express = require('express');
var router = express.Router();

/* GET home page. */
/* This is what happens when you try to go to 'boxplot.com/' or 'localhost:8000/' */
router.get('/', function(req, res) {
  res.render('dashboard', {
    title: 'inboxr'
  });
});

module.exports = router;
