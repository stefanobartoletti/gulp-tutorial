// gulp requirements
var gulp = require( 'gulp' );
var rename = require ( 'gulp-rename' );
var sass = require ( 'gulp-sass' );

// CSS

var styleSRC = './src/sass/style.scss';
var styleDIST = './dist/css/';

gulp.task( 'style', function() {
    gulp.src(styleSRC)
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest(styleDIST));
        
});