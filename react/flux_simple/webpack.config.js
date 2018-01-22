var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
  entry: './components/index.jsx',
  output: {
    filename: 'build/bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders:[
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'jsx-loader' },
      { test: /\.js$/, exclude:/node_modules/, loader: 'babel-loader'},
    ]
  },
  plugins: [
    new CommonsChunkPlugin('build/init.js'), // CommonsChunkPlugin 插件来提取多个页面之间的公共模块，并将该模块打包为 init.js
  ]
};
