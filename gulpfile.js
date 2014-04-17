var gulp = require('gulp');
var git = require('gulp-git');
var lr = require('tiny-lr')();

var PORT = 8000;
var ROOT = __dirname;
var LIVE = 35729;

function startExpress() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(ROOT));
  app.listen(PORT);
}

function startLiveReload() {
  lr.listen(LIVE);
}

function reload(event) {
  var fileName = require('path').relative(ROOT, event.path);

  lr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('default', function() {
  startExpress();
  startLiveReload();
  gulp.watch('*', reload);
});