import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import minifycss from 'gulp-minify-css'
import minifyHTML from 'gulp-minify-html'
import plumber from 'gulp-plumber'
import size from 'gulp-size'
import uglify from 'gulp-uglify'
import configProd from '../config/prod'
import errorHandler from '../utils/errorHandler'

// Optimize image assets
gulp.task('optimize:images', () =>
  gulp
    .src(configProd.optimize.images.src)
    .pipe(plumber({ errorHandler }))
    .pipe(imagemin(configProd.optimize.images.options))
    .pipe(gulp.dest(configProd.optimize.images.dest))
    .pipe(size(configProd.size))
)

// Minify CSS styles
gulp.task('optimize:styles', () =>
  gulp
    .src(configProd.optimize.styles.src)
    .pipe(plumber({ errorHandler }))
    .pipe(minifycss(configProd.optimize.styles.options))
    .pipe(gulp.dest(configProd.optimize.styles.dest))
    .pipe(size(configProd.size))
)

// Optimize, minify and uglify JS
gulp.task('optimize:scripts', () =>
  gulp
    .src(configProd.optimize.scripts.src)
    .pipe(plumber({ errorHandler }))
    .pipe(uglify(configProd.optimize.scripts.options))
    .pipe(gulp.dest(configProd.optimize.scripts.dest))
    .pipe(size(configProd.size))
)

// Optimize and minify HTML
gulp.task('optimize:html', () =>
  gulp
    .src(configProd.optimize.html.src)
    .pipe(plumber({ errorHandler }))
    .pipe(minifyHTML(configProd.optimize.html.options))
    .pipe(gulp.dest(configProd.optimize.html.dest))
    .pipe(size(configProd.size))
)

gulp.task('optimize', [
  'optimize:images',
  'optimize:styles',
  'optimize:scripts',
  'optimize:html'
])
