import gulp from 'gulp';

(() => {
  return gulp.src([
    './public/uploads/**/*.*',
  ])
    .pipe(gulp.dest('./static/uploads'))
})();