import React, { Component } from "react";
import Balls from "./Balls";

const getWinNumbers = () => {
  console.log("getWinNumbers");
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  }

  timeouts = [];

  runTimeouts = () => {
    const { winNumbers } = this.state
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }

    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000)
  };

  componentDidMount() {
    this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.winBalls.length === 0) {
      //winBalls.length가 0일 때 실행하라
      this.runTimeouts();
    }
    // if (prevState.winBalls !== this.state.winBalls) {
    //   // 이전 winBalls와 현 winBalls가 다르면 실행하라
    //   this.runTimeouts();
    // }
  }

  componentWillUnmount() {
    this.timeouts.forEach((timeoutID) => clearTimeout(timeoutID));
  }

  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  }

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => <Balls key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Balls number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default Lotto;