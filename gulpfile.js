'use strict';
const gulp = require('gulp');
const del = require('del');
const less = require('gulp-less');
const concat = require('gulp-concat');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('hello', function(callback) {
  console.log('hello world');
  callback();
});

gulp.task('clean', function(callback) {
  console.log('cleaned');//del('public');
  callback();
});

gulp.task('del', function(callback) {
  return del('public');
});

gulp.task('test', function() {
  return gulp.src('source/**/*.{css,js}')
      .pipe(gulp.dest(function(file) {
        return file.extname == '.js' ? 'js' :
            file.extname == '.css' ? 'css' : 'dest';
      }));
});

gulp.task('styles', function() {
  return gulp.src('frontend/styles/main.less')
      .pipe(gulpif(isDevelopment, sourcemaps.init()))
      .pipe(less())
      .pipe(gulpif(isDevelopment, sourcemaps.write()))
      .pipe(gulp.dest('public'));
});

gulp.task('assets', function() {
  return gulp.src('frontend/assets/**')
      .pipe(gulp.dest('public'));
});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('assets','styles'))
);
