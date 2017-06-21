import gulp from 'gulp'
import runSequence from 'run-sequence'
import configDev from '../config/dev'
import configProd from '../config/prod'

// Copy images
gulp.task('copy:images:dev', () => {
  gulp.src(configDev.copy.images.src).pipe(gulp.dest(configDev.copy.images.dest))
})

gulp.task('copy:images:prod', () => {
  gulp
    .src(configProd.copy.images.src)
    .pipe(gulp.dest(configProd.copy.images.dest))
})

// Copy letsencrypt verification folder
gulp.task('copy:letsencrypt:dev', () => {
  gulp
    .src(configDev.copy.letsencrypt.src)
    .pipe(gulp.dest(configDev.copy.letsencrypt.dest))
})

gulp.task('copy:letsencrypt:prod', () => {
  gulp
    .src(configProd.copy.letsencrypt.src)
    .pipe(gulp.dest(configProd.copy.letsencrypt.dest))
})

// Copy surgeignore file
gulp.task('copy:surgeignore:dev', () => {
  gulp
    .src(configDev.copy.surgeignore.src)
    .pipe(gulp.dest(configDev.copy.surgeignore.dest))
})

gulp.task('copy:surgeignore:prod', () => {
  gulp
    .src(configProd.copy.surgeignore.src)
    .pipe(gulp.dest(configProd.copy.surgeignore.dest))
})

gulp.task('copy:dev', (callback) => {
  runSequence(
    'copy:images:dev',
    'copy:surgeignore:prod',
    'copy:letsencrypt:dev',
    callback
  )
})

gulp.task('copy:prod', (callback) => {
  runSequence(
    'copy:images:prod',
    'copy:surgeignore:prod',
    'copy:letsencrypt:prod',
    callback
  )
})
