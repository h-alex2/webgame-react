# Notes (React Router v5)

## React router
- react-router : 뼈대
- react-router-dom

- hash router 아니면 browser router
- 제일 많이 쓰는 건 browser router

- 컴포넌트의 최상위를 browser router로 감싸야한다.

- 리액트 라우터는 눈속임이다. 페이지가 여러개 있는 게 아니라 여러개 있는 척 하는 것.
- 실제로는 페이지가 하나다.


```js
    <BrowserRouter>
    <link></link>
      <div>
        <Route path="/number-baseball" component={NumberBaseball}></Route>
        <Route path="/rock-scissors-paper" component={RSP}></Route>
        <Route path="/lotto-generator" component={Lotto}></Route>
      </div>
    </BrowserRouter>
```

- path : 만들려는 주소
- 다른페이지로 넘어가도록 만들어야한다.
- a 태그 대신 Link 사용, href 대신 to 사용

```js
const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/number-baseball">숫자야구</Link>
        &nbsp;
        <Link to="/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/lotto-generator">로또생성기</Link>
      </div>
      <div>
        <Route path="/number-baseball" component={NumberBaseball}></Route>
        <Route path="/rock-scissors-paper" component={RSP}></Route>
        <Route path="/lotto-generator" component={Lotto}></Route>
      </div>
    </BrowserRouter>
  );
};
```

- 실행했을 때 /number-baseball 페이지에서 새로고침 했을 때 뜨는 "Cannot GET /number-baseball" 오류가 페이지가 하나라는 이유 : 서버에서 접근했을 때 나는 오류
- 별도로 서버에 설정해야한다.
- 저 주소는 프론트엔드 에서만 유효한 주소

```js
  devServer: {
    historyApiFallback: true,
  }
```
- 웹팩
- Cannot GET /number-baseball을 꼼수처럼 해결할 수 있다.

- Link를 감싸고 있는 div 부분이 공통적인 레이아웃부분
- Route를 감싸는 div 부분이 바뀌는 화면이 나오는 부분

## Hash Router
- 주소에 #이 생김
- 새로고침해도 동작함
- 서버는 # 뒤 부분을 인식하지 못함. # 뒤부분은 프론트엔드의 부분(브라우저만 안다.)
- 서버는 몰라서 __검색엔진에 안뜸__ (실무에서는 검색엔진이 중요하기 때문에 해시라우터 잘 안씀)
- 검색 필요없는 관리자 페이지 이런 건 써도 상관없음
- 브라우저라우터가 실무에 더 적합하지만 셋팅할 게 더 많다.


## 동적 라우트, params, withRouter
- 라우트를 줄일 수 있는 방법

- `<Route path="/game/:name" ....>`
- `:name` 부분을 parameter라고 부른다. 줄여서 __params__
  - 동적으로 바뀐다.

```js
    <BrowserRouter>
      <div>
      {/* 공통인 부분 */}
        <Link to="/game/number-baseball">숫자야구</Link>
        &nbsp;
        <Link to="/game/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/game/lotto-generator">로또생성기</Link>
        &nbsp;
        <Link to="/game/index">게임 매쳐</Link>
      </div>
      <div>
        <Route path="/number-baseball" component={NumberBaseball}></Route>
        <Route path="/rock-scissors-paper" component={RSP}></Route>
        <Route path="/lotto-generator" component={Lotto}></Route>
        <Route path="/game/:name" component={GameMatcher}></Route>
      </div>
    </BrowserRouter>
```
to에 game/을 붙이고 뒤에 path를 적으면

```js
    <BrowserRouter>
      <div>
      {/* 공통인 부분 */}
        <Link to="/game/number-baseball">숫자야구</Link>
        &nbsp;
        <Link to="/game/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/game/lotto-generator">로또생성기</Link>
        &nbsp;
        <Link to="/game/index">게임 매쳐</Link>
      </div>
      <div>
        <Route path="/game/:name" component={GameMatcher}></Route>
      </div>
    </BrowserRouter>
```
- Route를 줄일 수 있다.
- Route는 저 게임매처에서 관리한다.

```js
import React, { Component } from "react";
import { withRouter } from "react-router";

class GameMatcher extends Component {
  render() {
    console.log(this.props)
    return (
      <div>게임매쳐</div>
    )
  }
}

export default withRouter(GameMatcher);
```
- this.props를 console로 찍으면
```
history: {length: 24, action: 'PUSH', location: {…}, createHref: ƒ, push: ƒ, …}
location: {pathname: '/game/lotto-generator', search: '', hash: '', state: undefined, key: 'g1zy66'}
match: {path: '/game/:name', url: '/game/lotto-generator', isExact: true, params: {…}}
staticContext: undefined
```
- 이렇게 뜨는데 이건 route와 연결이 되어있어서 route에서 정보가 나오는 것
- 만약 route와 연결안하고 저 정보를 쓰고싶다면 위 처럼 `withRouter`를 쓰면 된다. `withRouter(GameMatcher)`

- history : 페이지 넘나든 내역이 담겨있다.
  - 기본 브라우저의 동작과 다르기 때문에 별도의 메서드가 history안에 들어있는 것 (눈속임이기 때문에)
- match :match 안의 params에 params에 설정해둔 이름인 names와 주소 이름이 담겨있다.
  - 동적부분라우팅할 때 param 부분에 대한 정보를 가지고 있다.

```js
class GameMatcher extends Component {
  render() {
    console.log(this.props)
    if (this.props.match.params.name === "number-baseball") {
      return <NumberBaseball />
    }
    if (this.props.match.params.name === "rock-scissors-paper") {
      return <RSP />
    }
    if (this.props.match.params.name === "lotto-generator") {
      return <Lotto />
    }
      return (
      <div>
        일치하는 게임이 없습니다.
      </div>
    )
  }
}
```
- param를 이용해서 조건문으로 처리해줄 수 있다.

## history.pushState();
- 브라우저에서 제공하는 메서드
- 리액트는 저 메서드를 사용하면 안되고 this.props.history를 써야한다. 리액트 내부적으로는 저 브라우저에서 제공하는 메서드를 쓰고 있다고 한다.

## 쿼리스트링
```js
        <Link to="/game/number-baseball?query=10&hello=zerocho&bye=react">숫자야구</Link>
```
- `?query=10&hello=zerocho&bye=react`
-  & 으로 구분
- query = 10
- hello = zerocho
- bye = raect
- key = value
- 주소에 데이터를 붙여줄 수 있다.
- 주소에 데이터를 전달하는 가장 쉬운 방법
- 서버도 전달되었다는 걸 안다.
- 어떠한 카테고리에서 페이지가 넘어갈 때 페이지 정보를 줄 때 사용할 수 있다. `JavaScript?page=5`

## URLSearchParams 쿼리스트링 데이터 활용하기

- `console.log(this.props)`
```js
location:
hash: ""
key: "3189j9"
pathname: "/game/number-baseball"
search: "?query=10&hello=zerocho&bye=react"
state: undefined
[[Prototype]]: Object
```
- location - search 부분에 들어있다.
- `let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1))`
  - slice(1)로 물음표를 떼내고 `new URLSearchParams`에 넣어주기
  - `console.log(urlSearchParams.get("hello"))` 하면 zerocho 뜬다.

## props 넘기기
1. `<Route path="/game/:name" component={() => <GameMatcher props="123456" />}></Route>`
2. `<Route path="/game/:name" render={(props) => <GameMatcher props={props.abc} />}></Route>`
  - props를 자식에게 전달할 수 있다.
  - render 쓸 때는 전달 꼭 해야함 `render={(props) => <GameMatcher {...props} />}`

## 하나는 동적 라우팅이고 하나는 주소가 고정일 때 , Switch
```js
<Route path="/game/:name" ... />
<Route path="/game/number" ... />
```
- 한번에 다 나와버림
- 이 라우트중에서 첫번째로 일치하는 것만 사용하고싶다
  - Switch 사용하기
```js
<Switch>
  <Route path="/game/:name" ... />
  <Route path="/game/number" ... />
</Switch>
```
- switch안에 들어있으면 __첫번째로 일치하는 것만__ 렌더링이 된다.

## exact
- path와 정확하게 일치하는 경우에만
```js
<Route path="/" ... />
<Route exact path="/game/:name" ... />
```
  - 상위 주소 "/" 이것도 일치한다고 생각해서 `path="/game/:name"` 이걸 눌려도 둘 다 나와버린다.
  - 이럴 때는 switch로도 해결이 안됨
  - 이럴 때 exact를 사용한다.


# Notes (React Router v6)
- v5 -> v6 : 기능보다는 문법이 바뀜
- Reach Router와 합쳐져서 많이 바뀜

## npm outdated

## Switch -> Routes

## exact 없어짐

## component -> element, render 사라짐

## params 없어짐
- 없어지는 대신에 하위경로인 "GameMatcher" 안의 Route path가 알아서 /:name안에 들어간다. 꼭 상대경로로 해줘야함
- v5
```js
class GameMatcher extends Component {
  render() {
    let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1))
    console.log(urlSearchParams.get("hello"))
    if (this.props.match.params.name === "number-baseball") {
      return <NumberBaseball />
    }
    if (this.props.match.params.name === "rock-scissors-paper") {
      return <RSP />
    }
    if (this.props.match.params.name === "lotto-generator") {
      return <Lotto />
    }
      return (
      <div>
        일치하는 게임이 없습니다.
      </div>
    )
  }
}
```

-v6
```js
class GameMatcher extends Component {
  render() {
    let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1))
    return (
      <Routes>
        <Route path="number-baseball" element={<NumberBaseball />} />
        <Route path="rock-scissors-paper" element={<RSP />} />
        <Route path="lotto-generator" element={<Lotto />} />
        <Route 
          path="*" // 위 route 세개를 제외한 나머지의 경우 이 부분에 404 에러 화면
          element={<div>일치하는 게임이 없습니다.</div>}
        />
      </Routes>
    )
  }
}
```



## history.push or history.replace -> useNavigate
```js
let navigate = useNavigate();
navigate("/home");
```

## 뒤로가기 : history.goback() -> navigate(-1)
- 2페이지 전 : navigate(-2)

## codemod
- javascript 코드 버전업 됐을 때 migration하기 좋음