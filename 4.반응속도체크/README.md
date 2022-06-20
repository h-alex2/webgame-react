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