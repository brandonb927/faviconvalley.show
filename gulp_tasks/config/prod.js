// Production config

import path from 'path'
import _ from 'lodash'

import baseConfig from './base'

// Paths
let src = baseConfig.src.base
let srcAssets = baseConfig.src.assets
let build = path.resolve(src, 'build_prod')
let buildAssets = path.resolve(build, 'assets')

let prodBuildConfigFilename = path.resolve(src, '_config_prod.yml')
let buildConfigFilename = `${baseConfig.jekyll
  .baseConfig},${prodBuildConfigFilename}`

// Config
let baseProdConfig = {
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
  delete: {
    src: build
  },
  deploy: {
    src: build,
    dest: build
  },
  jekyll: {
    src,
    dest: build,
    config: buildConfigFilename
  },
  styles: {
    src: `${srcAssets}/styles/site.less`,
    dest: `${buildAssets}/styles`
  },
  scripts: {
    src: `${srcAssets}/scripts/*.js`,
    dest: `${buildAssets}/scripts`
  },
  optimize: {
    styles: {
      src: [`${buildAssets}/styles/**/*.css`],
      dest: `${buildAssets}/styles`,
      options: {
        keepSpecialComments: 0
      }
    },
    scripts: {
      src: [`${buildAssets}/scripts/*.js`],
      dest: `${buildAssets}/scripts`,
      options: {}
    },
    images: {
      src: `${srcAssets}/images/**/*`,
      dest: `${srcAssets}/images`,
      options: {
        optimizationLevel: 3,
        progessive: true,
        interlaced: true
      }
    },
    html: {
      src: `${build}/**/*.html`,
      dest: build,
      options: {
        // gulp-minify-html options
        loose: true
      }
    }
  }
}

let prodConfig = _.merge(baseProdConfig, baseConfig)

export default prodConfig
