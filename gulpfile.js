// gulp requirements
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

// CSS

var styleSRC = './src/sass/style.scss';
var styleDIST = './dist/css/';

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