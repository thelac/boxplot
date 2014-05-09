var gulp = require('gulp'),
  git = require('gulp-git'),
  dust = require('gulp-dust'),
  watch = require('gulp-watch'),
  livereload = require('gulp-livereload');

var PORT = 8000;

function startApp() {
  var app = require('./app');
  app.listen(PORT);
}

gulp.task('default', function() {
  startApp();

  gulp.src(['public/**/*', 'routes/*.js'])
    .pipe(watch())
    .pipe(livereload());

  gulp.src('views/*.dust')
    .pipe(watch())
    .pipe(dust())
    .pipe(gulp.dest('views'));
});