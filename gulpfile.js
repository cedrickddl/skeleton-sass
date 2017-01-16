const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const sassdoc = require('sassdoc');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function () {
    del('sassdoc');
    return del('main.css*');
});

gulp.task('sass', ['clean'], function () {
    return gulp.src('main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'));
});

gulp.task('doc', function () {
    return gulp.src('skeleton/**/*.scss')
        .pipe(sassdoc({
            display: {
                alias: true,
                watermark: true
            },
            groups: {
                core: 'Core'
            }
        }));
});

gulp.task('default', ['sass', 'doc']);
