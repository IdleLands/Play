var path = require('path');
var GitRevisionPlugin = require('git-revision-webpack-plugin');
var webpack = require('webpack');

var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');
var gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {
  context: path.join(__dirname, 'src'),
  entry:  {
    bootstrap: './bootstrap.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /pnotify.*\.js$/,
        loader: 'imports?define=>false,global=>window'
      },
      {
        test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
        loaders: ['transform?brfs', 'transform?packageify']
      },
      {
        test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
        loader: 'transform?ejsify'
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        loader: 'style!css'
      },
      {
        test: /\.less/,
        loader: 'style!css!less'
      },
      {
        test: /\.json/,
        loader: 'json'
      },
      {
        test: /\.png|\.ico|\.xml/,
        loader:'file-loader?name=favicon/[path][name].[ext]&context=./favicon'
      },
      {
        test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
        loader: 'file'
      },
      {
        test: /\.html/,
        loader: 'html?caseSensitive=true&minimize=false'
      }
    ]
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi.js': pixi,
      'p2': p2
    }
  },
  devServer: {
    port: 9002,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.DefinePlugin({
      'VERSION': JSON.stringify(gitRevisionPlugin.version()),
      'COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
    })
  ]
};