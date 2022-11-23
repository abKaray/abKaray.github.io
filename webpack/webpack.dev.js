const path = require('path')
const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common')

module.exports = merge(commonConfiguration, {
  stats: 'errors-warnings',
  mode: 'development',
  infrastructureLogging: {
    level: 'warn',
  },
  devServer: {
    // static: {
    //   directory: path.join(__dirname, '../src'),
    // },
    compress: true,
    port: 9000,
    open: true,
    watchFiles: ['src/**', 'static/**'],
    static: {
      watch: true,
      directory: path.join(__dirname, '../src'),
    },
  },
})
