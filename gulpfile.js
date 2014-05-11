var gulp = require('gulp'),
  git = require('gulp-git'),
  dust = require('gulp-dust'),
  watch = require('gulp-watch'),
  stylus = require('gulp-stylus'),
  livereload = require('gulp-livereload'),
  source = require('vinyl-source-stream'),
  watchify = require('watchify');

var PORT = 8000;

gulp.task('serve', function() {
  var app = require('./app');
  app.listen(PORT);
});

gulp.task('watchify', function() {
  return watchify({
    entries: ['./client/js/main.js'],
    extensions: ['.js']
  })
    .bundle({
      debug: true
    })
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('stylus', function() {
  gulp.src(['./client/css/*.styl'])
    .pipe(stylus())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
  var server = livereload();

  var reload = function(file) {
    server.changed(file.path);
  };

  gulp.watch('client/js/*.js', ['watchify'])
    .on('change', reload);
  gulp.watch('client/css/*.styl', ['stylus'])
    .on('change', reload);
});

gulp.task('default', ['watch', 'serve']);