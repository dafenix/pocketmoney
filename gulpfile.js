var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var buffer = require('vinyl-buffer');

/*
  Tranforms JSX-Files and reloads Site in Browser if JSX-Files changes
*/
gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./src/js/index.jsx'], // Only need initial file, browserify finds the deps
        transform: ['babelify','reactify'], // We want to convert JSX to normal javascript
        debug: false, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle() // Create new bundle that uses the cache for high performance
        .pipe(source('index.js'))
        // This is where you add uglifying etc.
        .pipe(gulp.dest('./dist/js/'))
        .pipe(connect.reload());
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source('index.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
});

/*
  Starts Server with live reload support
*/
gulp.task('server', function() {
  var server = {
    settings: {
      root: './dist',
      host: 'localhost',
      port: process.env.PORT,

      livereload: {
        port: 35929
      }
    }
  };
  connect.server(server.settings);
});

/*
 Copies index.html to destination
*/
gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('./dist'));
});

/*
 Copies CSS-Files from styles-Folder to destination
*/
gulp.task('styles', function() {
  gulp.src('./src/styles/**/*.css')
    .pipe(gulp.dest('./dist/styles'));
});

/*
 Watches for changes in src-Folder and triggers actions if any file changes
*/
gulp.task('watch', function() {
  var watcher = gulp.watch('src/**/*.*', ['html','styles','reload']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

/*
 Reloads site in browser
*/
gulp.task('reload',function() {
  gulp.src('./dist/*.html')
   .pipe(connect.reload());
});

/*
 Copy Fonts
*/
gulp.task('fonts', function(){
   gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('./dist/fonts'));
});

/*
 Creates minified site in destination
*/
gulp.task('deploy', function() {
    return browserify({
        entries: ['./src/js/index.jsx'], // Only need initial file, browserify finds the deps
        transform: ['babelify','reactify'], // We want to convert JSX to normal javascript
        debug: false, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    }).bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});


gulp.task('default', ['browserify', 'html','styles','fonts','watch','server']);
