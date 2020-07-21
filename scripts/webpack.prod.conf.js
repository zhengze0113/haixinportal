'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackBar = require('webpackbar');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const env = require('../config/prod.env');

// For NamedChunksPlugin
const seen = new Set();
const nameLength = 4;

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash:8].css')
    }),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: resolve('web/html/index.html'),
      inject: true,
      favicon: resolve('web/favicon.ico'),
      title: '中海油云平台',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: /runtime\..*\.js$/
    }),
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name;
      }
      const modules = Array.from(chunk.modulesIterable);
      if (modules.length > 1) {
        const hash = require('hash-sum');
        const joinedHash = hash(modules.map(m => m.id).join('_'));
        let len = nameLength;
        while (seen.has(joinedHash.substr(0, len))) len++;
        seen.add(joinedHash.substr(0, len));
        return `page-${joinedHash.substr(0, len)}`;
      } else {
        return 'chunk-' + modules[0].id;
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, '../web/static/pngIcon'), to: 'web/static/pngIcon' },
      { from: path.join(__dirname, '../web/static/images'), to: 'web/static/images' },
      { from: path.join(__dirname, '../web/static/UEditor'), to: 'web/static/UEditor' },
      { from: path.join(__dirname, '../web/static/tinymce'), to: 'web/static/tinymce' }
    ]),
    new WebpackBar()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        },
        elementUI: {
          name: 'chunk-elementUI', // 单独将 elementUI 拆包
          priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          test: /[\\/]node_modules[\\/]element-ui[\\/]/
        }
      }
    },
    runtimeChunk: 'single',
    minimizer: [
      new ParallelUglifyPlugin({
        cacheDir: '.cache/',
        uglifyES: {
          output: {
            comments: false,
            beautify: false
          },
          compress: {
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  }
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

if (config.build.generateAnalyzerReport || config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

  if (config.build.bundleAnalyzerReport) {
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerPort: 8080,
        generateStatsFile: false
      })
    );
  }

  if (config.build.generateAnalyzerReport) {
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle-report.html',
        openAnalyzer: false
      })
    );
  }
}

module.exports = webpackConfig;
