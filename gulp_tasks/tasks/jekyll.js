import gulp from 'gulp'
import cp from 'child_process'
import {
  notify,
  reload
} from 'browser-sync'
import configDev from '../config/dev'
import configProd from '../config/prod'

// Build the Jekyll site
gulp.task('jekyll-build:dev', function (callback) {
  notify('Compiling Jekyll for development')

  return cp
    .spawn(
      'bundle',
    [
      'exec',
      'jekyll',
      'build',
      `--source=${configDev.jekyll.src}`,
      `--destination=${configDev.jekyll.dest}`,
      `--config=${configDev.jekyll.config}`
    ],
      { stdio: 'inherit' }
    )
    .on('close', callback)
})

gulp.task('jekyll-build:prod', (callback) => {
  notify('Compiling Jekyll for production')

  return cp
    .spawn(
      'bundle',
    [
      'exec',
      'jekyll',
      'build',
      `--source=${configProd.jekyll.src}`,
      `--destination=${configProd.jekyll.dest}`,
      `--config=${configProd.jekyll.config}`
    ],
      { stdio: 'inherit' }
    )
    .on('close', callback)
})

// Jekyll site rebuild + browser reload
gulp.task('jekyll-rebuild', ['jekyll-build:dev'], reload)
