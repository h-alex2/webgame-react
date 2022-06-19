const path = require('path'); //node에 기본으로 들어있음

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development', //실서비스는 production
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  entry: {//입력
    app: ['./client'],
    //client.jsx에서 WordRelay를 불러오고 있기 때문에 WordRelay는 안적어줘도 된다.
    //그리고 위에 resolve extension 넣으면 확장자도 안넣어도 됨
  },

  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react'
        ],
      }
    }],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  }, //출력
};