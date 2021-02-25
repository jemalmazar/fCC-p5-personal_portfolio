const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');


function style() {
    return gulp.src('./style.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./style.css', style);
    gulp.watch('./index.html').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;

let build = gulp.parallel(style, watch);

gulp.task('default', build);