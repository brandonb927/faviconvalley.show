gulp           = require('gulp')
runSequence    = require('run-sequence')
copyConfigDev  = require('../config/dev').copy
copyConfigProd = require('../config/prod').copy


# Copy images
gulp.task('copy:images:dev', () ->
  return gulp.src(copyConfigDev.images.src)
    .pipe(gulp.dest(copyConfigDev.images.dest))
)

gulp.task('copy:images:prod', () ->
  return gulp.src(copyConfigProd.images.src)
    .pipe(gulp.dest(copyConfigProd.images.dest))
)

# Copy letsencrypt verification folder
gulp.task('copy:letsencrypt:dev', () ->
  return gulp.src(copyConfigDev.letsencrypt.src)
    .pipe(gulp.dest(copyConfigDev.letsencrypt.dest))
)

gulp.task('copy:letsencrypt:prod', () ->
  return gulp.src(copyConfigProd.letsencrypt.src)
    .pipe(gulp.dest(copyConfigProd.letsencrypt.dest))
)

# Copy surgeignore file
gulp.task('copy:surgeignore:dev', () ->
  return gulp.src(copyConfigDev.surgeignore.src)
    .pipe(gulp.dest(copyConfigDev.surgeignore.dest))
)

gulp.task('copy:surgeignore:prod', () ->
  return gulp.src(copyConfigProd.surgeignore.src)
    .pipe(gulp.dest(copyConfigProd.surgeignore.dest))
)

gulp.task('copy:dev', (callback) ->
  runSequence(
    'copy:images:dev'
    'copy:surgeignore:prod'
    'copy:letsencrypt:dev'
    callback
  )
)

gulp.task('copy:prod', (callback) ->
  runSequence(
    'copy:images:prod'
    'copy:surgeignore:prod'
    'copy:letsencrypt:prod'
    callback
  )
)
