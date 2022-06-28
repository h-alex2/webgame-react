# Notes

## context API
- 부모를 거쳐서 값을 받는 게 아니라 바로 받을 수 있다.
- provider를 제공한다. 이걸로 묶어줘야지 안에 들어있는 자식들이 데이터를 주고받을 수 있다.

### createContext
- 함수
- `const TableContext = createContext(기본값 넣을 수 있다.);`

```js
  export const TableContext = createContext({
    tableData: [],
    dispatch: () => {},
  });

  return (
    <TableContext.Provider value={{ tableDate: state.tableData, dispatch }}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  )
```
- Provider로 묶어주고 value에 자식에게 전달할 값을 넣어준다.

```js
import React, { useCallback, useState, useContext } from "react";
import { TableContext } from "./MineSearch";

const Form = () => {
  const [row, setRow] = useState(10); //세로칸
  const [cell, setCell] = useState(10); //가로칸
  const [mine, setMine] = useState(20);
  const value = useContext(TableContext)

```
- Form 에서 export한 TableContext를 가져오고 useContext import, const value 만들고 값으로 TableContext 넣어준다.
- value.dispatch로 dispatch에 접근이 가능하다.

`const { dispatch } = useContext(TableContext);` 이렇게 구조분해 해도 된다.


### context API 성능최적화 어려움
### useMemo로 캐싱하기
- `<TableContext.Provider value={{ tableDate: state.tableData, dispatch }}>`
- 이렇게 적어주면 리렌더링 될 때마다 `{ tableDate: state.tableData, dispatch }` 이 객체도 새로 생긴다. -> 자식들도 매번 리렌더링 된다.
- 그래서 캐싱을 한번 해줘야한다. 보통 __useMemo__ 를 사용한다.

```js
const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => (
    {tableDate: state.tableData, dispatch}
  ), [state.tableData])

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  )
};
```
const value를 만들고 state.tableData가 바뀔 때 마다 갱신되게 만들어주기
- dispatch는 바뀌지 않는다.


- 액션은 먼저 추상적으로 만들고 그 다음 reducer에서 처리



## onContextMenu