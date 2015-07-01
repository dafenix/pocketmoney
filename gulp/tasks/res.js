var gulp = require('gulp');
var clean = require('gulp-clean');
var config = require('../config').res;

gulp.task('res', function(){
  gulp.src(config.src)
  .pipe(gulp.dest(config.dest));
});