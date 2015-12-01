var gulp = require('gulp');
var browserify = require('browserify');  // Bundles JS.
var babelify = require('babelify');  // Transforms React JSX to JS.
var source = require('vinyl-source-stream');
var eslint = require('gulp-eslint');
var less = require('gulp-less');

// Lint Task
gulp.task('lint', function() {
  return gulp.src('scripts/*.jsx')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Build

// CSS

gulp.task('less', function() {
    return gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('build'));
});

// Javascript

gulp.task('browserify', function() {
  var reactBabelify = babelify.configure({presets: ["react"]});
  return browserify('scripts/main.jsx')
    .transform(reactBabelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build'));
});

// Test



// Development Mode

gulp.task('dev', function() {
    gulp.watch('scripts/*.jsx', ['lint', 'browserify']);
    gulp.watch('css/*.less', ['less']);
});

// Deploy

// Default Task
gulp.task('default', ['lint', 'browserify']);
