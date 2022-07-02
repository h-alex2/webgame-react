import React, { Component } from "react";
// import { withRouter } from "react-router";
import NumberBaseball from "./components/NumberBaseball-hooks";
import RSP from "./components/RSP-hooks"
import Lotto from "./components/Lotto-hooks";

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

export default GameMatcher;