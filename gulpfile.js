var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    autoprefixer = require('autoprefixer'),
    nano = require('cssnano');

var processor = [
  autoprefixer({ browsers: ['last 5 versions'] }),
  nano
]

gulp.task('default', function(){
  gulp.src('assets/css/style.css')
    .pipe(postcss(processor))
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('assets/css/'))
})
