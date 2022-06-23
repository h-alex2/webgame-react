import React, { useCallback, memo } from "react";
import styled from "styled-components";
import { CLICK_CELL, CHANGE_TURN } from "./TicTacToe";

const TableDate = styled.td`
  border: 1px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
`

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  console.log('td rendered')
  const onClickTd = useCallback(() => {
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);

  return (
    <TableDate onClick={onClickTd}>{cellData}</TableDate>
  )
});

export default Td;