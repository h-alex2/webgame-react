import React from "react";
import { BrowserRouter, HashRouter, Route, Link, Switch } from "react-router-dom";
import GameMatcher from "./GameMatcher";

const Games = () => {
  return (
    <BrowserRouter>
      <div>
      {/* 공통인 부분 */}
        <Link to="/game/number-baseball?query=10&hello=zerocho&bye=react">숫자야구</Link>
        &nbsp;
        <Link to="/game/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/game/lotto-generator">로또생성기</Link>
        &nbsp;
        <Link to="/game/index">게임 매쳐</Link>
      </div>
      <div>
        <Switch>
          <Route path="/" exact render={(props) => <GameMatcher {...props} />}></Route>
          <Route path="/game/:name" component={GameMatcher}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Games;
