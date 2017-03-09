'use strict';
const gulp = require('gulp');

gulp.task('hello', function(callback) {
  console.log('hello world');
  callback();
});

gulp.task('default', function() {
  return gulp.src('source/**/*.{css,js}')
      .pipe(gulp.dest(function(file) {
        return file.extname == '.js' ? 'js' :
            file.extname == '.css' ? 'css' : 'dest';
      }));
});
