var express = require('express');
var router = express.Router();

/* GET users listing. */
/* This is what happens when you try to go to 'boxplot.com/users/' or 'localhost:8000/users/' */
router.get('/', function(req, res) {
    res.render('usersHome.html', {
        title: 'This is the page title, passed in from routes/users.js',
        myVariableName: 'This is more context to be passed to the usersHome.jade file',
    });
});

module.exports = router;
