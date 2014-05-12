var gulp = require('gulp');
var git = require('gulp-git');
var watch = require('gulp-watch');
// var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');

gulp.task('serve', function() {
  // var app = require('./app');
});

// gulp.task('watchify', function() {
//   return watchify({
//     entries: ['./client/js/main.js'],
//     extensions: ['.js']
//   })
//     .bundle({
//       debug: true
//     })
//     .pipe(source('main.js'))
//     .pipe(gulp.dest('./public/js'));
// });

// gulp.task('stylus', function() {
//   gulp.src(['./client/css/*.styl'])
//     .pipe(stylus())
//     .pipe(gulp.dest('./public/css'));
// });

gulp.task('watch', function() {
  // var server = livereload();

  // var reload = function(path) {
  //   server.changed(path);
  // };

  // gulp.watch('client/js/*.js', ['watchify'])
  //   .on('change', reload);
  // gulp.watch('client/css/*.styl', ['stylus'])
  //   .on('change', reload);
  // gulp.watch('public/**/*').on('change', reload);
  nodemon({
    script: 'app.js',
    ext: 'html css js'
    // ignore: ['public/**/*']
  })
    .on('change', function() {
      console.log('changed!')
    })
    .on('restart', function() {
      console.log('restarted!')
    });
});

gulp.task('default', ['watch', 'serve']);