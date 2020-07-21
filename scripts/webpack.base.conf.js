'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const os = require('os');
const HappyPack = require('happypack');

// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// const createHappyPlugin = (id, loaders) => new HappyPack({
//   id: id,
//   loaders: loaders,
//   threadPool: happyThreadPool,
//   verbose: process.env.HAPPY_VERBOSE === '1' // make happy more verbose with HAPPY_VERBOSE=1
// });

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

function resolveSourceDir(dir) {
  return path.join(__dirname, '../web/src', dir);
}

const isProduction = process.env.NODE_ENV === 'production';

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
});

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: resolveSourceDir('main.js')
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: isProduction ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolveSourceDir('js')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=babel',
        include: [
          resolveSourceDir(''),
          resolve('mock'),
          resolve('node_modules/webpack-dev-server/client')
        ]
      },
      {
        test: /\.s?css$/,
        loader: [
          isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('web/static/svg')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader']
    })
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
