import gulp from 'gulp'
import browsersync from 'browser-sync'
import configDev from '../config/dev'

gulp.task('browser-sync', () => browsersync(configDev.browsersync))
