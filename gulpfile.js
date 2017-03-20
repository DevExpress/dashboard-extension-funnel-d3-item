var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

// define tasks here
gulp.task('default', function(){
	gulp
		.src([
			"./src/localization.js",
			"./src/meta.js",
			"./src/icon.js",
			"./src/funnel-d3-viewer.js",
			"./src/funnel-d3.js",
			])
		.pipe(concat("funnel.js"))
		.pipe(gulp.dest("./dist"))
		.pipe(uglify())
		.pipe(rename("funnel.min.js"))
		.pipe(gulp.dest("./dist"));
});