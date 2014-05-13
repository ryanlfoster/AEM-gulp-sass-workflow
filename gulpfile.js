// curl <http path> -Ok

// master background images need to moved from
// ../
// to
// ../../master/

// User variables ** must be filled in with your data **

var userName = 'cozo002';

// Start app below

var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	express = require('express'),
	lr = require('tiny-lr')(),
	path = require('path'),
	rename = require('gulp-rename');
	
var http = require('http'),
	fs = require('fs');

var repo = '/Users/' + userName + '/workspace/svu-banners-cq5/components/src/main/content/jcr_root/etc/designs/svubanners';

var banner;
var siteSection;

gulp.task('styles', function() {
	return gulp.src(repo + '/' + banner + '/css/' + banner + '-' + siteSection + '.scss')
		.pipe(sass({
			style: 'expanded',
			sourcemap: true
		}))
		// .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		// .pipe(rename({suffix: '.min'}))
		// .pipe(minifycss())
		.pipe(gulp.dest(repo + '/' + banner + '/css'));
});

// gulp.task('rename', function () {
// 	return gulp.src(repo + '../../../content/svubanners/**/original')
// });

// {base: '../../../content/svubanners/' + banner})

gulp.task('rename-step-1', function () {

	// return gulp.src('/Users/cozo002/workspace/svu-banners-cq5/components/src/main/content/jcr_root/content/dam/svubanners/cub/en/default_cub.png/_jcr_content/renditions/original')
	return gulp.src('/Users/cozo002/workspace/svu-banners-cq5/components/src/main/content/jcr_root/content/dam/svubanners/cub/**/original')	
		.pipe(rename(function (path) {
			var folders = path.dirname.split('\\');
			var fileName;
			var dir;
			for (var i = 0; i < folders.length; i++) {
				if (/png|gif|jpg|jpeg$/.test(folders[i])) {
					fileName = folders[i];
				}
			}
			if (fileName) {
				// console.log(path.dirname.substr(0, path.dirname.length - 24 - fileName.length));
				// console.log(path.dirname);
				console.log(path);
				dir = path.dirname.substr(0, path.dirname.length - 24 - fileName.length);
				path.dirname = dir;
				path.basename = fileName.split('.')[0] + 'TEMP';
				path.extname = '.' + fileName.split('.')[1];
				console.log(path);
			}
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('delete-img-dirs', ['rename-step-1'], function () {
	
});

gulp.task('rename', ['delete-img-dirs'], function () {
	
});

// gulp.task('default', ['server', 'styles', 'watch']);
gulp.task('default', ['rename']);

gulp.task('retarget-css', ['styles'], function () {
	console.log('retarget-css fired');
});

gulp.task('watch', function () {
	gulp.watch(repo + '/**/*.scss', function (event) {
		var path = event.path.split('\\');
		banner = path[path.length - 3];
		siteSection = path[path.length - 1].split('.')[0];
		gulp.run('styles');
	});
	gulp.watch(repo + '/shoppers/css/shoppers-homepage.css', notifyLivereload);
});


gulp.task('server', function () {
	fs.readFile('./index.html', 'utf8', function (err, data) {
		// console.log(data);
	});
	var app = express();
	app.use(express.static(__dirname));
	app.listen(8080);
	lr.listen(35729);
});

function notifyLivereload (event) {
	var fileName = path.relative(__dirname, event.path);
	lr.changed({
		body: {
			files: [fileName]
		}
	});
}