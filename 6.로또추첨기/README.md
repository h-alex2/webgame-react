# Notes 

## 반복문을 기점으로 분리 

## HOC : Higher Order Component
[고차 컴포넌트](https://ko.reactjs.org/docs/higher-order-components.html)  
- 컴포넌트를 다른 컴포넌트로 감싸는 것
- 고차 컴포넌트는 컴포넌트를 가져와 새 컴포넌트를 반환하는 함수입니다.

```js
const Ball = memo(({ number }) => {
    let background;

    if (number <= 10) {
      background = "red";
    } else if (number <= 20) {
      background = "orange";
    } else if (number <= 30) {
      background = "yellow";
    } else if (number <= 40) {
      background = "blue";
    } else {
      background = "green";
    }

    return <div className="ball" style={{background}}>{number}</div>
})
```
- 함수컴포넌트를 memo로 감싸주었다.

## setTimeout... 메모리 누수 문제
- 타이머를 쓰면 꼭 타이머를 clear 해주어야한다.
- 후에 어떤 문제가 생길 수 있으므로 clear 해주는 작업이 꼭 필요하다.
- setInterval의 경우는 반드시 정리해주어야 한다.

```js
  componentDidMount() {
    const { winNumbers } = this.state
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeout[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }

    this.timeout[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000)
  }

  componentWillUnmount() {
    this.timeout.forEach((value) => clearTimeout(value));
  }
```

## componentDidUpdate(prevProps, prevState)

```js
  runTimeouts = () => {
    const { winNumbers } = this.state
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }

    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000)
  };

  componentDidMount() {
    this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.winBalls.length === 0) {
      //winBalls.length가 0일 때 실행하라
      this.runTimeouts();
    }
    // if (prevState.winBalls !== this.state.winBalls) {
    //   // 이전 winBalls와 현 winBalls가 다르면 실행하라
    //   this.runTimeouts();
    // }
  }
```
- componentDidUpdate로 어떨 때 다시 실행해야하는지 정해줄 수 있다.
- componentDidUpdate에서는 조건문이 중요하다.
- 조건문 없으면 클날수두~

## useEffect와 componentDid.. 비교

1. class 방식
```js
  componentDidMount() {
    this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.winBalls.length === 0) {
      //winBalls.length가 0일 때 실행하라
      this.runTimeouts();
    }
    // if (prevState.winBalls !== this.state.winBalls) {
    //   // 이전 winBalls와 현 winBalls가 다르면 실행하라
    //   this.runTimeouts();
    // }
  }

  componentWillUnmount() {
    this.timeouts.forEach((timeoutID) => clearTimeout(timeoutID));
  }
```

2. useEffect 방식
```js
  useEffect(() => {
    console.log("첫번째")
    runTimeouts();
    return () => {
      timeouts.current.forEach((timeoutID) => clearTimeout(timeoutID));
    }
  }, [timeouts.current])
```
- useEffect의 두번째 인자에 배열이 빈배열일 때는 componentDidMount와 같다.
- useEffect의 두번째 인자 배열에 갑이 있을 때는 componentDidMount + componentDidUpdate의 역할과 같다.
- useEffect의 return 부분은 componentDidUnmount의 역할과 같다.

## useMemo
```js
const [winNumbers, setWinNumbers] = useState(getWinNumbers());
```
- 로또 번호가 나올 때마다 `getWinNumbers()`가 계속 실행되고 있다. 한 번만 실행되게 하기 위해서 `useMemo`를 쓸 수 있다.

```js
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
```
- useMemo도 두 번째 인자로 배열을 받는다. 배열이 바뀌지 않으면 다시 실행되지 않는다.

1. __useMemo__ : 복잡한 함수 결괏값을 기억
2. __useRef__ : 일반 값을 기억
3. __useCallback__ : 함수 자체를 기억

## useCallback
- useCallback(() => {}, )
- 함수 자체를 기억함
- 함수 컴포넌트가 재실행돼도 useCallback을 쓴 함수는 새로 재생성되지 않는다.
- useCallback 안에서 state를 쓸 때는 조심해야한다.
- console.log(state)를 넣었을 때 state 값이 바뀌어도 그 전 함수를 기억하기 때문에 후의 state값이 콘솔에 출력되지 않고 그 전 값이 출력된다.
- useCallback에서 쓰는 state는 input 배열에도 넣어주어야 한다.

- 자식 컴포넌트에 함수를 넘길 때는 useCallback을 __꼭__ 해주어야 한다. useCallback을 안쓰면 매번 새로 생성되는 데 생성될 때마다 자식한테 전달이 되면서 함수가 바뀌었다고 인식한다. 그래서 자식도 재렌더된다.


## hooks는 순서가 중요하다.
- 최상위에 위치시키기
- 실행 순서가 중요하다.
- 조건문 안에 절대 넣으면 안됨
- 함수나 반복문 안에도 안 넣는 게 좋다. (추천 안 함)

## useEffect - componentDidMount로만 쓰기

```js
useEffect(() => {
  ...
}, [])
```

## useEffect - componentDidUpdate로만 쓰기 (꼼수)

```js
const mounted = useRef(false);
useEffect(() => {
  if (!mounted.current) {
    mounted.current = true;
  } else {
    // ajax..
  }
}, [바뀌는값])
```