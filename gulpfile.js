var gulp = require('gulp');
var browserify = require('browserify'); // Bundles JS.
var babelify = require('babelify'); // Transforms React JSX to JS.
var source = require('vinyl-source-stream');
var eslint = require('gulp-eslint');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var watchify = require('watchify');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

// add custom browserify options here
var customOpts = {
  entries: ['./src/containers/app.jsx'],
  debug: true,
  cache: {}, packageCache: {}, fullPaths: true
};

var bundler = watchify(browserify(customOpts)); 

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/*/*.jsx')
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// Build

gulp.task('build', ['browserify', 'less'], function() {
    browserSync.reload();
})

// CSS

gulp.task('less', function() {
    return gulp.src('src/less/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());
});

// Javascript

gulp.task('browserify', ['lint'], function() {
    var reactBabelify = babelify.configure({
        presets: ["react", "es2015"]
    });
    return bundler.transform(reactBabelify)
        .bundle()
        .on('error', function(err) {
            // print the error (can replace with gulp-util)
            console.log(err);
            // end this stream
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('build'));
});

// Test

// Sync Browser

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "build"
        }
    });
});

// Development Mode

gulp.task('dev', ['browser-sync', 'build'], function() {
    gulp.watch('src/*/*.jsx', ['build']);
    gulp.watch('src/less/*.less', ['less']);
});

// Deploy

// Default Task
gulp.task('default', ['lint', 'browserify']);