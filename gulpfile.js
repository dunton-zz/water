// Ryan Dunton's Gulp File build 6/13/17

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var browserSync = require('browser-sync').create();
argv = require('yargs').argv,
size = argv.size;
var reload = browserSync.reload;

//minify js/css banner
gulp.task('minify-js', function () {
	return gulp.src('patient/' + size + '/js/*.js')
		// minify js
	.pipe(gulpIf('*.js', uglify()))
	.pipe(rename({
		extname: '.min.js'
		}))
	.pipe(gulp.dest('patient/' + size + '/build/'))
})

gulp.task('minify-css', function() {
	return gulp.src('patient/' + size + '/css/*.css')
		// minify css
		.pipe(rename({
			extname: '.min.css'
			}))
	.pipe(gulpIf('*.css', cssnano()))
	.pipe(gulp.dest('patient/' + size + '/build/'))
})

gulp.task('minify-images', function() {
	return gulp.src('patient/' + size + '/build/*.png')
	.pipe(imagemin())
	.pipe(gulp.dest('patient/' + size + '/build'))
})

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'patient/' + size + '/build/'
		}
	})
})

gulp.task('watch', ['browser-sync'], function(){
	gulp.watch('patient/' + size + '/js/*.js', ['minify-js']);
	
	//gulp.watch(size + '/sass/**/*.scss', ['styles']);
	gulp.watch('patient/' + size + '/css/*.css', ['minify-css']);
	
	gulp.watch('patient/' + size + '/css/*.css').on('change', reload)
	gulp.watch('patient/' + size + '/js/*.js').on('change', reload)
	gulp.watch('patient/' + size + '/build/*.html').on('change', reload)

});

////   DEFAULT TASK 
gulp.task('default', function(callback) {
	runSequence(['minify-js', 'minify-css', 'minify-images', 'watch'])
})