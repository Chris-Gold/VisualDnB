var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    autoprefixer = require('autoprefixer');

gulp.task('css', function(){
  gulp.src('assets/css/style.css')
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('assets/css/'))
})
