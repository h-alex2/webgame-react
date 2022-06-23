import React, { useState, useEffect, useReducer, useCallback } from "react";
import Table from "./Table";



const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["","",""],
    ["","",""],
    ["","",""],
  ],
  recentCell: [-1, -1],
  turnCounter: 0,
}

export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
const SET_COUNTER = "SET_COUNTER";
const RESET_GAME = "RESET_GAME";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_COUNTER:
      return {
        ...state,
        turnCounter: state.turnCounter + 1,
      }
    case SET_WINNER:
      return { //값을 직접 바꾸면 안된다.
        ...state,
        winner: action.winner,
      }
    case CLICK_CELL: {
      const tableData = [...state.tableData]; //얕은 복사
      tableData[action.row] = [...tableData[action.row]]; //얕은 복사
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell], //최근에 클릭한 좌표
      }
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        turn: "O",
        tableData: [
          ["","",""],
          ["","",""],
          ["","",""],
        ],
        recentCell: [-1, -1],
        turnCounter: 0,
      }
    }

    default:
      return state;
  }
}

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { winner, turn, tableData, recentCell, turnCounter } = state;

  const onClickTable = useCallback(() => {
    console.log("click")
    dispatch({type: SET_WINNER, winner: "O"});
  }, [])

  useEffect(() => {
    dispatch({type: SET_COUNTER})

    const [row, cell] = recentCell;
    let win = false;

    if (row < 0) {
      return;
    }

    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true; // 가로줄 검사
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2] === turn) {
      win = true; // 세로줄 검사
    }

    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true; // 대각선 검사
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true; // 대각선 검사
    }
    if (win) { // 승리
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME})
    }
    if (turnCounter === 9) {
      // 무승부
      dispatch({ type: RESET_GAME})
    }
    dispatch({ type: CHANGE_TURN });

  }, [tableData])

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  )

}

export default TicTacToe;