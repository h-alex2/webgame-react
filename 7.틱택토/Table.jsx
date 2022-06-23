import React from "react";
import Tr from "./Tr";
import styled from "styled-components";

const TableElement = styled.table`
  border-collapse: collapse;
`

const Table = ({ tableData, dispatch }) => {
  return (
    <TableElement>
      {Array(tableData.length).fill().map((tr, i) => <Tr key={tableData + i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]}/>)}
    </TableElement>
  )
}

export default Table;