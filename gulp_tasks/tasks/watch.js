import gulp from 'gulp'
import configDev from '../config/dev'

// Run the jekyll build, browsersync server,
// and watch files for changes
gulp.task('watch', function (callback) {
  gulp.watch(configDev.watch.jekyll, ['jekyll-rebuild'])
  gulp.watch(configDev.watch.styles, ['styles:dev'])
  gulp.watch(configDev.watch.scripts, ['scripts:dev'])
  return gulp.watch(configDev.watch.images, ['copy:images:dev'])
})
