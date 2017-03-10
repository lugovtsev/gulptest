'use strict';
const gulp = require('gulp');
const del = require('del');
const less = require('gulp-less');
const concat = require('gulp-concat');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('hello', function(callback) {
  console.log('hello world');
  callback();
});

gulp.task('clean', function() {
  return del(['public']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

gulp.task('test', function() {
  return gulp.src('source/**/*.{css,js}')
      .pipe(gulp.dest(function(file) {
        return file.extname == '.js' ? 'js' :
            file.extname == '.css' ? 'css' : 'dest';
      }));
});

// gulp.task('styles', function() {
//   return gulp.src('frontend/**/*.less')
//       .pipe(debug({title: 'src'}))
//       .pipe(less())
//       .pipe(debug({title: 'less'}))
//       .pipe(concat('all.css'))
//       .pipe(debug({title: 'concat'}))
//       .pipe(gulp.dest('public'));
// });

gulp.task('styles', function() {
  let pipeline = gulp.src('frontend/styles/main.less');

  if (isDevelopment) {
    pipeline = pipeline.pipe(sourcemaps.init());
  }

  pipeline = pipeline
      .pipe(less());

  if (isDevelopment) {
    pipeline = pipeline.pipe(sourcemaps.write());
  }

  return pipeline
      .pipe(gulp.dest('public'));
});

//gulp.task('default', ['clean','styles']);
