'use strict'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line space-before-function-paren
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 选项...
  publicPath: './',
  outputDir: '../src/vs/code/electron-browser/inktank',
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'inktank',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
