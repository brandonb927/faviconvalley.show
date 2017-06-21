import gulp from 'gulp'
import duration from 'gulp-duration'
import imagemin from 'gulp-imagemin'
import minifycss from 'gulp-minify-css'
import minifyHTML from 'gulp-minify-html'
import plumber from 'gulp-plumber'
import size from 'gulp-size'
import uglify from 'gulp-uglify'
import {
  optimize as config,
  size as sizeConfig
} from '../config/prod'
import errorHandler from '../utils/errorHandler'

// Optimize image assets
gulp.task('optimize:images', () =>
  gulp
    .src(config.images.src)
    .pipe(plumber({ errorHandler }))
    .pipe(imagemin(config.images.options))
    .pipe(duration('Optimizing images for production'))
    .pipe(gulp.dest(config.images.dest))
    .pipe(size(sizeConfig))
)

// Minify CSS styles
gulp.task('optimize:styles', () =>
  gulp
    .src(config.styles.src)
    .pipe(plumber({ errorHandler }))
    .pipe(minifycss(config.styles.options))
    .pipe(duration('Optimizing and minifying CSS for production'))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(size(sizeConfig))
)

// Optimize, minify and uglify JS
gulp.task('optimize:scripts', () =>
  gulp
    .src(config.scripts.src)
    .pipe(plumber({ errorHandler }))
    .pipe(uglify(config.scripts.options))
    .pipe(duration('Optimizing, minifying and minifying JS for production'))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(size(sizeConfig))
)

// Optimize and minify HTML
gulp.task('optimize:html', () =>
  gulp
    .src(config.html.src)
    .pipe(plumber({ errorHandler }))
    .pipe(minifyHTML(config.html.options))
    .pipe(duration('Optimizing and minifying HTML for production'))
    .pipe(gulp.dest(config.html.dest))
    .pipe(size(sizeConfig))
)

gulp.task('optimize', [
  'optimize:images',
  'optimize:styles',
  'optimize:scripts',
  'optimize:html'
])
