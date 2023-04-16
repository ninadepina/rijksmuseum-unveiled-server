import gulp from 'gulp';
import uglify from 'gulp-uglify';

(() => {
	return gulp
        .src(['./src/scripts/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./static/'));
})();
