const path = require('path');
const { webpack } = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'eval', // hidden-source-map,
  resolve: {
    extensions: ['.jsx', '.js'],
  },

  entry: {
    app: '/src/client'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 5% in KR']
            },
          }],
          '@babel/preset-react',
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          'react-refresh/babel',
        ]
      }
    }],
  },
  plugins: [
    new RefreshWebpackPlugin(),
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist',
  },
  devServer: {
    devMiddleware: { publicPath: '/dist/' },
    static: { directory: path.resolve(__dirname) },
    hot: true, //변경점 감지해서 publicPath 업데이트 해줌
  },
};