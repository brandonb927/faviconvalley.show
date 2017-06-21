import fs from 'fs'
import { argv } from 'yargs'
import cp from 'child_process'
import gulp from 'gulp'
import awspublish from 'gulp-awspublish'
import duration from 'gulp-duration'
import runSequence from 'run-sequence'
import prodConfig from '../config/prod'

let imagesConfig = prodConfig.images
let deployConfig = prodConfig.deploy

let awsConfig = JSON.parse(fs.readFileSync(`${process.env.HOME}/.aws.json`))
awsConfig.bucket = deployConfig.s3.bucket
awsConfig.region = 'us-east-1'

let s3Config = {
  accessKeyId: awsConfig.key,
  secretAccessKey: awsConfig.secret,
  region: awsConfig.region,
  params: {
    Bucket: awsConfig.bucket
  },
  headers: {
    'Cache-Control': 'max-age=2592000, no-transform, public'
  }
}

// Upload a published build to the interwebs
gulp.task('surge-deploy', callback =>
  cp
    .spawn('surge', [deployConfig.src, `--domain=${deployConfig.url}`], {
      stdio: 'inherit'
    })
    .on('close', callback)
)

gulp.task('s3-deploy', () => {
  let publisher = awspublish.create(s3Config)

  return gulp
    .src(imagesConfig.src)
    .pipe(publisher.publish(s3Config.headers))
    .pipe(publisher.cache())
    .pipe(duration('Uploading images to S3'))
    .pipe(awspublish.reporter())
})

gulp.task('deploy', (callback) => {
  if (argv.dryrun) {
    return runSequence(
      'build:prod',
      ['optimize:scripts', 'optimize:styles'],
      'optimize:html',
      callback
    )
  } else {
    return runSequence(
      'build:prod',
      ['optimize:scripts', 'optimize:styles'],
      'optimize:html',
      'surge-deploy',
      's3-deploy',
      callback
    )
  }
})
