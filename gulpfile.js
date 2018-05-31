var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: "./app"
  });

  gulp.watch("./app/src/sass/**/*.sass", ['sass']);
  gulp.watch("./app/**/*.html").on('change', browserSync.reload);
});
// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("./app/src/sass/*.sass")
    .pipe(sass())
    .pipe(concat('build.css'))
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(gulp.dest("./app/dist/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
