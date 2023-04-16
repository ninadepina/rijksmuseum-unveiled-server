import gulp from 'gulp';

(() => {
  return gulp.src([
    './src/uploads/**/*.*',
  ])
    .pipe(gulp.dest('./static/uploads'))
})();