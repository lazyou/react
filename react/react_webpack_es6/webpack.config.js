var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    HelloWorld: './entry/HelloWorld.js',
    Test: './entry/Test.js'
  },
  output: {
    path: __dirname,
    filename: 'build/[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
