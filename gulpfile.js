var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var sourcemaps = require('gulp-sourcemaps');

const dirs = {
  src: 'src',
  dest: 'dist',
};

const cssPaths = {
  srcFiles: `${dirs.src}/css/*.css`,
  destDir: `${dirs.dest}/css`,
}

gulp.task('css', () => {
  return gulp.src(cssPaths.srcFiles)
    .pipe(sourcemaps.init())
    .pipe(postcss([
      autoprefixer(),
      cssnano(),
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(cssPaths.destDir));
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('watch', () => {
  gulp.watch(cssPaths.srcFiles, ['css', browserSync.reload]);
  gulp.watch("*.html", browserSync.reload);
});

gulp.task('default', ['css', 'browser-sync', 'watch']);