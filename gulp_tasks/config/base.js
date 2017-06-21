import path from 'path'

let base = path.normalize(`${__dirname}/../..`)

// Export the base config
let baseConfig = {
  src: {
    base,
    assets: path.resolve(base, '_assets')
  },
  deploy: {
    domain: 'faviconvalley.show',
    s3: {
      bucket: 'faviconvalley-show-images'
    }
  },
  jekyll: {
    baseConfig: path.resolve(base, '_config.yml')
  },
  copy: {
    letsencrypt: {
      src: `${path.resolve(base, '.well-known')}/**/*`
    },
    surgeignore: {
      src: path.resolve(base, '.surgeignore')
    }
  },
  styles: {
    autoprefixer: {
      cascade: true,
      browsers: ['last 2 versions', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }
  },
  size: {
    showFiles: true
  }
}

baseConfig.watch = {
  jekyll: [
    `${baseConfig.src.base}/*.yml`,
    `${baseConfig.src.base}/_data/*.json`,
    `${baseConfig.src.base}/_data/*.yml`,
    `${baseConfig.src.base}/index.html`,
    `${baseConfig.src.base}/404.html`,
    `${baseConfig.src.base}/_includes/*.html`,
    `${baseConfig.src.base}/_layouts/*.html`,
    `${baseConfig.src.base}/_pages/*`,
    `${baseConfig.src.base}/_episodes/*{md,html}`
  ],
  styles: `${baseConfig.src.assets}/styles/*.less`,
  scripts: `${baseConfig.src.assets}/scripts/*.js`,
  images: `${baseConfig.src.assets}/images/*`
}

baseConfig.scripts = {
  sitePack: 'site-pack.js',
  site: 'site.js',
  options: {
    debug: true
  },
  vendor: {
    src: []
  }
}

baseConfig.deploy.url = `http://${baseConfig.deploy.domain}`

export default baseConfig
