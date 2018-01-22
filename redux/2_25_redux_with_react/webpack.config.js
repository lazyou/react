var path = require('path');
var webpack = require('webpack');

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('./builds/ReactCommon.js');

module.exports = {
  plugins: [commonsPlugin],
  entry: {
    TestApp: './TestApp.js',
  },
  output: {
    path: __dirname,
    filename: './builds/[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
}
