# Notes 

## null
- false, undefined, null은 jsx에서 태그 없음을 의미한다.

## react 조건문
- 삼항연산자
- &&

## setTimeout
```js
  onClickScreen = () => {
    const { state, message, result } = this.state
    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "초록색이 되면 클릭하세요",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭하세요",
        })
      }, Math.floor(Math.random() * 1000) + 2000);
    }

    if (state === "ready") {
      clearTimeout(this.timeout)
      this.setState({
        state: "waiting",
        message: "너무 성급하시군요! 초록색이 된 후에 클릭하세요",
        result: [],
      })
    }

    if (state === "now") {
      this.setState({
        state: "waiting",
        message: "클릭해서 시작하세요",
        result: [],
      })
    }
  };
```
- 지금 state가 "ready"일 때 클릭했을 때 다시 시작하기 위해 초기화가 되어야해서 state를 "waiting"으로 바꾼다. 그러고 setTimeout이 계속 실행이 되고 있는 상태가 된다.
- setTimeout을 초기화 시켜줘야 한다.
- this.timeout에 setTimeout id를 담아서 clearTimeout 해주어야한다.

## "useRef" class this를 hooks에서는 useRef로 표현한다.
1. class
```js
class ResponseCheck extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요.",
    result: [],
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state, message, result } = this.state
    if (state === "waiting") {
      this.startTime = new Date();
      this.setState({ 
        state: "ready",
        message: "초록색이 되면 클릭하세요",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭하세요",
        })
      }, Math.floor(Math.random() * 1000) + 2000);
    }
```

2. hooks
```js
  const timeOut = useRef(null);

  const onClickScreen = () => {
    if (state === "waiting") {
      startTime.current = new Date();
      setState("ready");
      setMessage("초록색이 되면 클릭하세요");
      timeOut.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭하세요");
      }, Math.floor(Math.random() * 1000) + 2000);
    }
  ...
```
- class에서는 this의 속성으로 timeout, startTime... 들을 저렇게 정의해놓고 했다면 hooks에서는 useRef를 사용한다.
- useRef는 DOM에 직접 접근할 때 쓰지만 this의 속성을 표현할 때 쓰기도 한다.
- useRef의 값은 바뀌어도 재렌더 되지 않는다.
- 값이 바뀌어도 재렌더 시키고 싶지 않으면 ref에 넣어서 사용하면 된다. (화면에 영향 주지 않아도 되는 것)
- 변하는 값을 잠깐 기록해두는 거라고 생각하면 됨
- ref는 __current__ 로 접근해야한다.

## return에서 if, for문 사용하는 방법
```js
{(() => {
  if (...) {
    ...
  }
})()}
```
- 함수를 정의해서 넣고 즉시실행함수로 만들어주면 된다.
- 복잡해서 잘 쓰지는 않는다고 함
- 제일 좋은 건 자식 컴포넌트를 사용하는 것

## return에서 배열 가능
```js
return [
  <div key="배">배</div>
  <div key="감">감</div>
  <div key="귤">귤</div>
]
```
- 이런 식으로 쓸 수 있지만 거의 쓰진 않음
- 배열을 쓰려면 key가 꼭 필요함