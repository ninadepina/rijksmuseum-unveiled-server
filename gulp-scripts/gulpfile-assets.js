import gulp from 'gulp';

(() => {
  return gulp.src([
    './src/font/**/*.*',
  ])
    .pipe(gulp.dest('./static/'))
})();