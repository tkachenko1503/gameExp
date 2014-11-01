var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');

var paths = {
    styles: './src/scss/'
};

gulp.task('sass', function () {
    gulp.src(paths.styles + 'style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
});

gulp.task('build-js', function () {
    gulp.src('./src/index.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : true
        }))
        .pipe(gulp.dest('./src/app'));
});

gulp.task('default', ['sass', 'build-js'], function () {
    gulp.watch('./src/scss/*', ['sass']);
    gulp.watch(['./src/index.js', './src/js/*/*'], ['build-js']);
});