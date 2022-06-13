## Notes

### fragment
	- `<div></div>` 대신 fragment `<></>`로 묶어줄 수 있다.
___

### React 18버전 업데이트로
	- 17버전 : `ReactDOM.render(<component />, document.querySelector("#root"));`
	- 18버전 : `ReactDOM.createRoot(document.querySelector("#root")).render(<component />);`
___


### form이 있으면 onSubmit form이 없으면 onClick
___


### class에서 메서드 쓸 때는 무조건 화살표함수 쓰기 function으로 써도 되지만 bind를 사용해야함 (this가 달라져서)

1. 
```js
	onChange = function (e) {
		this.setState({ value: e.target.value })
	}
```
2. 
```js
	onChange(e) {
		this.setState({ value: e.target.value })
	}
```
```js
	render() {
		return (<>
				<input
					type="number"
					value={this.state.value}
					onChange={this.onChange.bind(this)}
				/>
		</>)
	}
```
1, 2번으로 썼을 때는 this.onChange에 this를 bind해주어야 한다.

```js
	onChange = (e) => {
		this.setState({ value: e.target.value })
	}

	render() {
	return (<>
			<input
				type="number"
				value={this.state.value}
				onChange={this.onChange}
			/>
	</>)
}
```
- 화살표 함수 사용하기
___


### class - constructor
- constructor 어렵다면 빼도 됨

```js
class Gugudan extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			first: Math.ceil(Math.random() * 9),
			second: Math.ceil(Math.random() * 9),
			value: "",
			result: "",
		}
	}
}
```


```js
class Gugudan extends React.Component {
	state={
		first: Math.ceil(Math.random() * 9),
		second: Math.ceil(Math.random() * 9),
		value: "",
		result: "",
	}
}
```
- 이 방법을 더 많이 쓴다.
---

### this.setState(() => {})
setState에서 state를 return 해줄 수 있게 함수를 쓸 수 있다.
- state의 이전 값을 쓸 수 있다.
- 예전 state의 값으로 새로운 state값을 만들 때는 return 해주는 함수를 쓰는 게 좋다.
	```js
	this.setState((prevState) => {
		return {
			value: prevState.value + 1,
		}
	})


```js
this.setState({
	result: `정답 : ${this.state.first} X ${this.state.second} = ${this.state.value}`,
	first: Math.ceil(Math.random() * 9),
	second: Math.ceil(Math.random() * 9),
	value: "",
})
```
```js
this.setState((prevState) => {
	return {
		result: `정답 : ${prevState.first} X ${prevState.second} = ${prevState.value}`,
		first: Math.ceil(Math.random() * 9),
		second: Math.ceil(Math.random() * 9),
		value: "",
	}
})
```

