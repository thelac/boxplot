var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('watch', function() {
  nodemon({
    script: 'app.js',
    ext: 'html css js'
  })
    .on('change', function() {
      console.log('changed!');
    })
    .on('restart', function() {
      console.log('restarted!');
    });
});

gulp.task('default', ['watch']);