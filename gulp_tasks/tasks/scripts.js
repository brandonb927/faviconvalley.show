import runSequence from 'run-sequence'
import gulp from 'gulp'
import concat from 'gulp-concat-util'
import duration from 'gulp-duration'
import plumber from 'gulp-plumber'
import sourcemaps from 'gulp-sourcemaps'
import baseConfig from '../config/base'
import configDev from '../config/dev'
import configProd from '../config/prod'
import errorHandler from '../utils/errorHandler'

// Dev tasks
gulp.task('scripts:vendor:dev', () =>
  gulp
    .src(configDev.scripts.vendor.src)
    .pipe(plumber({ errorHandler }))
    .pipe(concat(configDev.scripts.vendorPack, { sep: ';' }))
    .pipe(duration('Concatenating vendor scripts for development'))
    .pipe(gulp.dest(configDev.scripts.dest))
)

// Main tasks
gulp.task('scripts:build:dev', () =>
  gulp
    .src([
      `${configDev.scripts.dest}/${baseConfig.scripts.vendorPack}`,
      `${configDev.scripts.dest}/${baseConfig.scripts.site}`
    ])
    .pipe(plumber({ errorHandler }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(concat(configDev.scripts.sitePack, { sep: ';' }))
    .pipe(sourcemaps.write())
    .pipe(duration('Concatenating minified scripts for development'))
    .pipe(gulp.dest(configDev.scripts.dest))
)

// Prod tasks
gulp.task('scripts:vendor:prod', () =>
  gulp
    .src(configProd.scripts.vendor.src)
    .pipe(plumber({ errorHandler }))
    .pipe(concat(configProd.scripts.vendorPack, { sep: ';' }))
    .pipe(duration('Concatenating vendor scripts for production'))
    .pipe(gulp.dest(configProd.scripts.dest))
)

gulp.task('scripts:build:prod', () =>
  gulp
    .src([
      `${configProd.scripts.dest}/${baseConfig.scripts.vendorPack}`,
      `${configProd.scripts.dest}/${baseConfig.scripts.site}`
    ])
    .pipe(plumber({ errorHandler }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(concat(configProd.scripts.sitePack, { sep: ';' }))
    .pipe(sourcemaps.write())
    .pipe(duration('Concatenating minified scripts for production'))
    .pipe(gulp.dest(configProd.scripts.dest))
)

// Main tasks
gulp.task('scripts:dev', (callback) =>
  runSequence(
    'scripts:vendor:dev',
    'scripts:build:dev',
    callback
  )
)

gulp.task('scripts:prod', (callback) =>
  runSequence(
    'scripts:vendor:prod',
    'scripts:build:prod',
    callback
  )
)
