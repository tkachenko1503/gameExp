var gulp = require('gulp');
var sass = require('gulp-sass');

var paths = {
    styles: './src/scss/'
};

gulp.task('sass', function () {
    gulp.src(paths.styles + 'style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
});

gulp.task('default', function() {
    gulp.watch('./src/scss/*', ['sass']);
});