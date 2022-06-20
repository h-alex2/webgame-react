# Notes

## 반복문
반복문에서 성능 문제가 많이 발생한다.
- 반복문에서 컴포넌트 분리해서 많이 사용한다. (재사용성, 가독성, 성능최적화)

## props
html에서는 attributes  
react에서는 props

## push X
리액트에서는 push로 배열에 값 넣는 거 XX

```js
const array = [];
array.push(1) // bad
array === array // true : 리액트에서 변하는 걸 감지하지 못한다.

const array2 = [...array, 2] // good
array === array2 // false : 리액트에서 변하는 걸 감지함
```
- 리액트에서는 불변성의 법칙이 있다. 바뀔 거면 참조가 바뀌어야 한다.

## 구조분해
```js
const { result, value, tries } = this.state;
```
- 비구조화 할당을 이용하면 this.state.result ... 이렇게 긴 걸 result로 줄여줄 수 있다.

## this를 안쓰는 메서드는 class 밖에 뺄 수 있다.
- 다른 곳에서도 쓸 수 있기 때문에 빼는 것. class 안에 넣어도 된다.

## 옛날 state로 현재 state를 만들 때는 함수형으로 쓰기
1.

```js
  onSubmitForm = (e) => {
    e.preventDefault();
    // 성공
    if (this.state.value === this.state.answer.join("")) {
      this.setState({
        result: "홈런!",
        tries: [...this.state.tries, { try: this.state.value, result: "홈런!" }],
      })
      alert("게임을 다시 시작합니다.");
      this.setState({
        result: "",
        answer: getNumbers(),
        tries: [],
      });

      return;
    }
```
2.
```js

  onSubmitForm = (e) => {
    e.preventDefault();
    // 성공
    if (this.state.value === this.state.answer.join("")) {
      this.setState((prevState) => {
        result: "홈런!",
        tries: [...this.prevState.tries, { try: this.state.value, result: "홈런!" }],
      })
      alert("게임을 다시 시작합니다.");
      this.setState({
        result: "",
        answer: getNumbers(),
        tries: [],
      });

      return;
    }
```

## webpack 배포
- `process.env.NODE_ENV = "production";`
- mode를 "production"으로 변경

## 리렌더링
1. state 바꼈을 때
  - state가 안바껴도 setState만 호출하면 리렌더링된다.
2. props 바꼈을 떄
3. 부모 컴포넌트가 리렌더링 되면 자식도 리렌더링 된다.

## shouldComponentUpdate

## class에서는 pureComponent 함수에서는 memo
## pureComponent
- state, props 달라졌을 때 리렌더링 되는 기능
- 부모 컴포넌트가 리렌더링 되어도 자식은 리렌더링 되지 않는다.

```js
class Try extends PureComponent {
  render() {
    const { tryInfo } = this.props;

    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    )
  }
};
```

## memo
- 부모가 리렌더링 됐을 때 자식까지 리렌더링 되는 걸 막아준다.
- 대신 state, props가 바뀌면 리렌더링 된다.

- memo를 적용하면 컴포넌트 이름이 이상하게 바껴서 name.displayName = "name" 이렇게 바꿔주어야 한다.

```js
const Try = memo(({ tryInfo }) => {
  return (
    <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
    </li>
  );
});

Try.displayName = "Try";
```

## class에서도 useRef 처럼 쓰기 => creatRef
`inputRef = createRef();`  
`this.inputRef.current.focus()`

예전 방식은 함수라서 미세하게 더 조절할 수 있다는 장점이 있다.