var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	shell = require('gulp-shell');

var repo = '/Users/cozo002/workspace/svu-banners-cq5/components/src/main/content/jcr_root/etc/designs/svubanners';

gulp.task('styles', function() {
	return gulp.src(repo + '**/*.scss')
		.pipe(sass({ style: 'expanded' }))
		// .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('styles'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('styles'))
		.pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('vault', ['styles'], function () {
	return gulp.src(repo)
	.pipe(shell(['vlt ci *'], {cwd: repo}));
});

// gulp.task('scripts', function() {
// 	return gulp.src('scripts/*.js')
// 		.pipe(jshint())
// 		.pipe(jshint.reporter('default'))
// 		.pipe(notify({ message: 'Scripts task complete' }));
// });

// gulp.task('default', ['styles', 'scripts', 'watch']);

// gulp.task('default', ['styles', 'watch']);

gulp.task('default', ['vault']);


gulp.task('watch', function () {
	// gulp.watch(repo, ['styles']);
	// gulp.watch('scripts/*.js', ['scripts']);
});

// gulp.task('watch', function() {
// 	var server = livereload();
// 	gulp.watch(['styles']).on('change', function(file) {
// 		server.changed(file.path);
// 	});
// });

// curl http://www.cub.com/index.html -O