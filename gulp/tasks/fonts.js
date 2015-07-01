var gulp = require('gulp');
var clean = require('gulp-clean');
var config = require('../config').fonts;

gulp.task('fonts', function(){
   gulp.src(config.src)
  .pipe(gulp.dest(config.dest));
  /*.pipe(clean({force: true}));*/
});