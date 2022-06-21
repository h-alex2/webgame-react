# Note

## value와 onChange는 세트다.
value를 넣을거면 onChange를 넣어야한다. 아니면 defaultValue 넣어야한다.

## webpack 자동 빌드 - react refresh
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

## controlled input, uncontrolled input
1. controlled input
```js
<input
  ref={inputEl}
  value={value}
  onChange={...}
/>
```
- react는 기본적으로 controlled input
- 이걸 더 권장하기는 한다.

2. uncontrolled input
```js
<input ref={inputEl} />
```
- 기본적인 html 같은 input 형태
- value가 submit에서만 쓰이는 경우에는 이걸 써도 된다.

```js
	const onSubmitForm = (e) => {
		e.preventDefault();

		if (word[word.length - 1] === value[0]) {
			setResult("딩동댕");
			setWord(value);
			inputRef.current.focus();
			return;
		}

		setResult("땡");
		setValue("");
		inputRef.current.focus();
	}

	const onChangeInput = (e) => {
		setValue(e.target.value);
	}

  <input
    ref={inputRef}
    value={value}
    onChange={onChangeInput}
  />
```


---
```js
	const onSubmitForm = (e) => {
		e.preventDefault();

		if (word[word.length - 1] === value[0]) {
			setResult("딩동댕");
			setWord(value);
 			setValue("");
			inputRef.current.focus();
			return;
		}

		setResult("땡");
		setValue("");
		inputRef.current.focus();
	}

	const onChangeInput = (e) => {
		setValue(e.target.value);
	}
```
```js
	const onSubmitForm = (e) => {
		e.preventDefault();

		if (word[word.length - 1] === e.target.children.word.value[0]) {
			setResult("딩동댕");
			setWord(e.target.children.word.value);
      e.target.children.word.value = "";
			inputRef.current.focus();
			return;
		}

		setResult("땡");
    e.target.children.word.value = "";
		inputRef.current.focus();
	}

	return (
		<>
			<div>{word}</div>
			<form onSubmit={onSubmitForm}>
				<input
          id="word"
					ref={inputRef}
				/>
				<button>ENTER</button>
			</form>
			<div>{result}</div>
		</>
	);
};
```
- 이렇게 바꿀 수 있다.