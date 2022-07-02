import React, { Component } from "react";
// import { withRouter } from "react-router";
import NumberBaseball from "./components/NumberBaseball-hooks";
import RSP from "./components/RSP-hooks"
import Lotto from "./components/Lotto-hooks";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

class GameMatcher extends Component {
  render() {
    const location = useLocation();
    const navigate = useNavigate();
    let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1))
    return (
      <Routes>
        <Route path="number-baseball" element={<NumberBaseball />} />
        <Route path="rock-scissors-paper" element={<RSP />} />
        <Route path="lotto-generator" element={<Lotto />} />
        <Route 
          path="*" // 모든 경우에
          element={<div>일치하는 게임이 없습니다.</div>}
        />
      </Routes>
    )
  }
}

export default GameMatcher;