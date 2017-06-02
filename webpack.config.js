/* globals require, module, __dirname */

const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'hidden-source-map',
  context: __dirname,
  entry: {
    app: './index.js',
  },
  output: {
    path: __dirname,
    filename: 'jaskier.min.js',
  },
  externals: {
    'chalk': 'chalk',
  },
  module: {
    loaders: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        loaders: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve('.'),
      'node_modules',
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      sourceMap: false
    }),
  ],
};
