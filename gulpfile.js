var
  // Modules
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  // connect = require('gulp-connect'),
  browserSync = require('browser-sync').create(),

  // Directories
  dir = {
    src: 'style/**/*.scss',
    dest: 'dist/'
  }
;

// Error handling

var onError = function(err) {
  gutil.beep();
  console.log(err.message);
  this.emit('end');
};

// SCSS processing

gulp.task('style', function() {

  return gulp.src(dir.src)
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [
        'node_modules'
      ]
    })
    .on('error', sass.logError))
    .pipe(gulp.dest(dir.dest))
    .pipe(browserSync.stream());

});

// Static server and watching .scss/.html files
gulp.task('serve', ['style'], function() {

  browserSync.init({
    port: 5000,
    server: true
  });

  gulp.watch(dir.src, ['style']);
  gulp.watch("*.html").on('change', browserSync.reload);

});

// Default (watch) task
gulp.task('default', ['serve']);

// gulp.task('default', function() {
//   connect.server({}, function (){
//     browserSync.init({
//       port: 5000,
//       open: false
//     });
//   });
//   gulp.watch(params.styles.src, ['style']);
// });


// STYLES

// gulp.task('styles', function() {
//   var sassStream, cssStream;

//   sassStream = gulp.src(params.styles.src)
//     .pipe(plumber({
//       errorHandler: onError
//     }))
//     .pipe(sass({
//       errLogToConsole: true
//     }))

//   cssStream = gulp.src(params.styles.vendor);

//   return merge(cssStream, sassStream)
//     .pipe(concat('main.css'))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(cssnano())
//     .pipe(gulp.dest(params.styles.dist))
//     .pipe(bust())
//     .pipe(gulp.dest('.'))
//     .pipe(browserSync.reload({
//       stream: true
//     }));
// });

// ## IMAGES

// gulp.task('images', function() {
//   gulp.src(params.images.src)
//     .pipe(cache(imagemin({
//       interlaced: true,
//       progressive: true,
//       optimizationLevel: 5,
//       svgoPlugins: [{removeViewBox: false}]
//     })))
//     .pipe(gulp.dest(params.images.dist))
// });

// DEFAULT

// gulp.task('default', function() {
//   connect.server({}, function (){
//     browserSync.init({
//       // proxy: '127.0.0.1:8000',
//       port: 5000,
//       open: false
//     });
//   });
//   gulp.watch(params.styles.src, ['style']);
//   // gulp.watch(params.scripts.src, ['scripts']);
// });