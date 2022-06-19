## Note

### value와 onChange는 세트다.
value를 넣을거면 onChange를 넣어야한다. 아니면 defaultValue 넣어야한다.

### webpack 자동 빌드 - react refresh
`npm i react-refresh @pmmmwh/react-refresh-webpack-plugin -D`

- 서버 만들기
  - `npm i -D webpack-dev-server`

- package.json
```js
  "scripts": {
    "dev": "webpack serve --env development"
  },
```

- webpack.config.js
```js
const path = require('path');
const { webpack } = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval', // hidden-source-map,
  resolve: {
    extensions: ['.jsx', '.js'],
  },

  entry: {
    app: './client',
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
    new RefreshWebpackPlugin()
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist',
  },
  devServer: {
    // publicPath: '/dist', //여기에 저장
    hot: true, //변경점 감지해서 publicPath 업데이트 해줌
    devMiddleware: { publicPath: '/dist/' },
    static: { directory: path.resolve(__dirname) },  
  },
```
- `const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');`
- `'react-refresh/babel',`
- `devServer`

dist는 가상 경로라고 생각하면 된다.