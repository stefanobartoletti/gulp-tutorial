// gulp requirements

var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

// variables

var styleSRC = 'src/sass/style.scss';
var styleDIST = 'dist/css/';
var styleWatch = 'src/sass/**/*.scss';

var scriptSRC = 'src/js/script.js';
var scriptDIST = 'dist/js/';
var scriptWatch = 'src/js/**/*.js';

// CSS

gulp.task('style', function () {

    gulp.src(styleSRC)

        .pipe(sourcemaps.init())

        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))

        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))

        .pipe(rename({
            suffix: '.min'
        }))

        .pipe(sourcemaps.write('./'))

        .pipe(gulp.dest(styleDIST));

});

// JS

gulp.task('script', function () {

    gulp.src(scriptSRC)

        .pipe(gulp.dest(scriptDIST));

});

// default

gulp.task('default', ['style', 'script']);

// watch

gulp.task('watch', ['default'], function(){
    gulp.watch( styleWatch, ['style']);
    gulp.watch( scriptWatch, ['script']);
});