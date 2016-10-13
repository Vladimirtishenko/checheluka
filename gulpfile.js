var gulp = require('gulp');
var webpack = require('webpack-stream');


gulp.task('default', function() {
  return gulp.src('./public/javascripts/controller.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./public/build/'));
});