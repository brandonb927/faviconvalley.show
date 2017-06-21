// Development config

import fs from 'fs'
import path from 'path'
import url from 'url'
import _ from 'lodash'

import baseConfig from './base'

// Paths
let src = baseConfig.src.base
let srcAssets = baseConfig.src.assets
let build = path.resolve(src, 'build_dev')
let buildAssets = path.resolve(build, 'assets')

let devBuildConfigFilename = path.resolve(src, '_config_dev.yml')
let buildConfigFilename = `${baseConfig.jekyll
  .baseConfig},${devBuildConfigFilename}`

// Config
let baseDevConfig = {
  browsersync: {
    server: {
      baseDir: build,
      middleware: [
        function (req, res, next) {
          // middleware for clean, extensionless URLs
          let uri = url.parse(req.url)
          if (
            uri.pathname.length > 1 &&
            path.extname(uri.pathname) === '' &&
            fs.existsSync(`${path.join(build, uri.pathname)}.html`)
          ) {
            req.url = `${uri.pathname}.html${uri.search || ''}`
          }
          return next()
        }
      ]
    },
    port: 8888,
    ui: {
      port: 9001
    },
    open: false
  },
  delete: {
    src: build
  },
  styles: {
    src: `${srcAssets}/styles/site.less`,
    dest: `${buildAssets}/styles`
  },
  scripts: {
    src: `${srcAssets}/scripts/*.js`,
    dest: `${buildAssets}/scripts`
  },
  copy: {
    images: {
      src: `${srcAssets}/images/**/*`,
      dest: `${buildAssets}/images`
    },
    letsencrypt: {
      dest: `${build}/.well-known`
    },
    surgeignore: {
      dest: build
    }
  },
  jekyll: {
    src,
    dest: build,
    config: buildConfigFilename
  }
}

let devConfig = _.merge(baseDevConfig, baseConfig)

export default devConfig
