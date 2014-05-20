var Group = require('../models/group');
var express = require('express');
var router = express.Router();

/* GET groups listing. */
/* This is what happens when you try to go to 'boxplot.com/groups/' or 'localhost:8000/groups/' */
router.get('/', function(req, res) {
    res.render('group.html', {
        title: 'This is the page title, passed in from routes/groups.js',
        myVariableName: 'This is more context to be passed to the groupsHome.jade file',
    });
});

module.exports = router;
