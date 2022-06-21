const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const cssClean = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

const paths = {
  styles: {
    src: 'src/css/styles.css',
    dest: 'dist/css/'
  },
  img: {
    src: 'src/img/*.jpg',
    dest: 'dist/img'
  }
}

function clean() {
  return del(['dist']);
}

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(cssClean())
    .pipe(autoprefixer())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

function imgCopy() {
  return gulp.src(paths.img.src)
    .pipe(gulp.dest(paths.img.dest));
}

function watch() {
  gulp.watch(paths.styles.src, styles)
}

const build = gulp.series(clean, styles, imgCopy, watch);

exports.clean = clean;
exports.styles = styles;
exports.imgCopy = imgCopy;
exports.watch = watch;
exports.build = build;
exports.default = build;