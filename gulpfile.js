var gulp = require('gulp');
var browserify = require('browserify'); // Bundles JS.
var babelify = require('babelify'); // Transforms React JSX to JS.
var source = require('vinyl-source-stream');
var eslint = require('gulp-eslint');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var watchify = require('watchify');
var bundler = watchify(browserify('scripts/main.jsx'));
var browserSync = require('browser-sync').create();

// Lint Task
gulp.task('lint', function() {
    return gulp.src('scripts/*.jsx')
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
    return gulp.src('less/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('build'));
});

// Javascript

gulp.task('browserify', ['lint'], function() {
    var reactBabelify = babelify.configure({
        presets: ["react"]
    });
    return bundler.transform(reactBabelify)
        .bundle()
        .pipe(plumber())
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

gulp.task('dev', ['browser-sync'] ,function() {
    gulp.watch('scripts/*.jsx', ['build']);
    //gulp.watch('less/*.less', ['less']);
});

// Deploy

// Default Task
gulp.task('default', ['lint', 'browserify']);