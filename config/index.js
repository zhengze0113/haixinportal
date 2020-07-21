'use strict'
// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {

  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/cloud/iams/*': {
        target: 'http://10.72.78.125:8081',
        changeOrigin: true,
      },
      '/api/cloud/iams/v1/*': {
        target: 'http://10.72.78.125:8081',
        changeOrigin: true
      },
      '/api/cloud/osms/v1/*': {
        target: 'http://10.72.78.125:8082',
        changeOrigin: true
      },
      '/api/cloud/cmss/v1/*': {
        target: 'http://10.72.78.125:8085',
        changeOrigin: true
      },
      '/cms/*': {
        target: 'http://10.72.78.125:1337',
        changeOrigin: true,
        pathRewrite: {
          '/cms': '/'
        }
      }
    },
    host: 'localhost',
    port: 9527,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */
    devtool: 'source-map',
    cssSourceMap: false
  },

  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    productionSourceMap: false,
    devtool: 'source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report || false,

    // `npm run build:prod --generate_report`
    generateAnalyzerReport: process.env.npm_config_generate_report || false
  }
}
