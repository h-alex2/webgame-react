import React, { memo, useContext } from "react";
import Tr from "./Tr";
import { TableContext } from "./MineSearch"
import styled from "styled-components";


const TableElement = styled.table`
  border-collapse: collapse;
`


const Table = memo(() => {
  const { tableData } = useContext(TableContext);
  // console.log({tableData: tableData[0] ? "hi" : "bye"})
  return (
    <TableElement>
      {Array(tableData.length).fill().map((tr, i) =>
        <Tr rowIndex={i} />)
      }
    </TableElement>
  )
})

export default Table;
