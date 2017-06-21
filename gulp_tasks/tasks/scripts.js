import gulp from 'gulp'
import babel from 'gulp-babel'
import concat from 'gulp-concat-util'
import plumber from 'gulp-plumber'
import sourcemaps from 'gulp-sourcemaps'
import configDev from '../config/dev'
import configProd from '../config/prod'
import errorHandler from '../utils/errorHandler'

// Main tasks
gulp.task('scripts:dev', callback => {
  gulp
    .src(configDev.scripts.src)
    .pipe(plumber({ errorHandler }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(babel())
    .pipe(concat(configDev.scripts.sitePack, { sep: ';' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(configDev.scripts.dest))
  callback()
})

// Prod tasks
gulp.task('scripts:prod', callback => {
  gulp
    .src(configProd.scripts.src)
    .pipe(plumber({ errorHandler }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(babel())
    .pipe(concat(configProd.scripts.sitePack, { sep: ';' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(configProd.scripts.dest))
  callback()
})
