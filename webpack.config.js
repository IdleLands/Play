var path = require('path');
var webpack = require('webpack');
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

var GitRevisionPlugin = require('git-revision-webpack-plugin');
var gitRevisionPlugin = new GitRevisionPlugin();

const phaserDir = path.join(__dirname, 'node_modules/phaser/');
const phaserlib = path.join(phaserDir, 'build/custom/phaser-split.js');
const pixi = path.join(phaserDir, 'build/custom/pixi.js');
const p2 = path.join(phaserDir, 'build/custom/p2.js');

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const envVars = require(`./config/${env}.json`);

module.exports = {
  entry: process.env.IONIC_APP_ENTRY_POINT,
  output: {
    path: '{{BUILD}}',
    publicPath: 'build/',
    filename: process.env.IONIC_OUTPUT_JS_FILE_NAME,
    devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
  },
  devtool: process.env.IONIC_SOURCE_MAP_TYPE,

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [ path.join(__dirname, "node_modules") ],

    alias: {
      phaserlib: phaserlib,
      'pixi.js': pixi,
      'p2.js': p2
    }
  },

  devServer: {
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        loader: process.env.IONIC_WEBPACK_LOADER,
        exclude: /node_modules/
      },
      {
        test: /\.woff$|\.woff2$|\.eot$|\.ttf$|\.svg$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    ionicWebpackFactory.getIonicEnvironmentPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(gitRevisionPlugin.version()),
      COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
      AUTH0_CLIENT_ID: JSON.stringify(envVars.AUTH0_CLIENT_ID)
    })
  ],

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
