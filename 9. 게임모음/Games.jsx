import React from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import GameMatcher from "./GameMatcher";

const Games = () => {
  return (
    <BrowserRouter>
      <div>
      {/* 공통인 부분 */}
        <Link to="number-baseball?query=10&hello=zerocho&bye=react">숫자야구</Link>
        &nbsp;
        <Link to="rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="lotto-generator">로또생성기</Link>
        &nbsp;
        <Link to="index">게임 매쳐</Link>
      </div>
      <div>
        <Routes>
          <Route path="*" element={<GameMatcher />} />
          <Route path="/game/:name/*" element={<GameMatcher />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Games;
