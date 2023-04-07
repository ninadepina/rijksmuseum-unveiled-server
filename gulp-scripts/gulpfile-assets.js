import gulp from 'gulp';

(() => {
  return gulp.src([
    './public/font/**/*.*',
  ])
    .pipe(gulp.dest('./static/'))
})();