// SECTION Gulp requirements

const { src, dest, task, watch, series, parallel } = require('gulp');

var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


// SECTION Variables

var styleSRC = 'src/sass/style.scss';
var styleDIST = 'dist/css/';
var styleWatch = 'src/sass/**/*.scss';

var scriptFolder = 'src/js/';
var scriptSRC = 'script.js';
var scriptDIST = 'dist/js/';
var scriptWatch = 'src/js/**/*.js';
var scriptFILES = [scriptSRC];


// SECTION CSS

function css(done) {

    src(styleSRC)

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

        .pipe(dest(styleDIST))

    done();

};


// SECTION JS

function js(done) {

    scriptFILES.map(function (entry) {

        return browserify({
                entries: [scriptFolder + entry]
            })

            .transform(babelify, {
                presets: ['@babel/preset-env']
            })

            .bundle()

            .pipe(source(entry))

            .pipe(rename({
                extname: '.min.js'
            }))

            .pipe(buffer())

            .pipe(sourcemaps.init({
                loadMaps: true
            }))

            .pipe(uglify())

            .pipe(sourcemaps.write('./'))

            .pipe(dest(scriptDIST))
        
    });

    done();

};


function watchfiles () {

    watch(styleWatch, css)
    watch(scriptWatch, js)
    
}


// SECTION Default

task('css', css);
task('js', js);

task('default', parallel(css, js));


// SECTION Watch

task('watch', watchfiles);

