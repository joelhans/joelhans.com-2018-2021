var gulp = require('gulp');
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const browsersync = require('browser-sync').create();
var dir = {
  src: 'style/**/*.scss',
  dest: 'dist/'
}

function gulpStyle() {
  return gulp
  .src(['style/**/*.scss'])
  .pipe(sass({
    outputStyle: 'compressed',
    includePaths: [
      'node_modules'
    ]
  }))
  .pipe(gulp.dest(dir.dest))
  .pipe(browsersync.stream());
}
gulp.task(gulpStyle);

function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: '.'
    }    
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

function watchTask(){
  watch('*.html', browsersyncReload);
  watch([dir.dest], series(gulpStyle, browsersyncReload));
}

gulp.task('default', gulp.series(gulpStyle, browsersyncServe, watchTask));