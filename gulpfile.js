const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const cssClean = require('gulp-clean-css');
const webp = require('gulp-webp');
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

function imgConv() {
  return gulp.src(paths.img.src)
    .pipe(webp())
    .pipe(gulp.dest(paths.img.dest));
}

function watch() {
  gulp.watch(paths.styles.src, styles)
}

const build = gulp.series(clean, styles, imgConv, watch);

exports.clean = clean;
exports.styles = styles;
exports.imgConv = imgConv;
exports.watch = watch;
exports.build = build;
exports.default = build;