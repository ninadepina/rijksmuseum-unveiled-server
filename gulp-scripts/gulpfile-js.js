import gulp from 'gulp';
import uglify from 'gulp-uglify';

(() => {
	return gulp
        .src(['./public/scripts/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./static/'));
})();
