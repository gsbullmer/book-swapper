const path = require('path');
const atImport = require("postcss-import");
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
  debug: true,
  devtool: '#inline-source-map',
  entry: './src/index.js',
  devServer: {
    contentBase: './src'
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['src', 'node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loaders: ['babel']
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, {
        test: /(\.css)$/,
        loaders: ['style', 'css', 'postcss']
      }
    ]
  },
  postcss: function(webpack) {
    return [
      atImport({addDependencyTo: webpack}),
      precss,
      autoprefixer
    ];
  }
};
