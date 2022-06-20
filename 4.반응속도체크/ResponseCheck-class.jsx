import React, { Component } from "react";

class ResponseCheck extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요.",
    result: [],
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state, message, result } = this.state
    if (state === "waiting") {
      this.startTime = new Date();
      this.setState({ 
        state: "ready",
        message: "초록색이 되면 클릭하세요",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭하세요",
        })
      }, Math.floor(Math.random() * 1000) + 2000);
    }

    if (state === "ready") {
      clearTimeout(this.timeout)
      this.setState({
        state: "waiting",
        message: "너무 성급하시군요! 초록색이 된 후에 클릭하세요",
        result: [],
      })
    }

    if (state === "now") {
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요",
          result: [...prevState.result, (this.endTime / 1000) - (this.startTime / 1000)],
        }
      })
      console.log(result)
    }
  };

  onReset = () => {
    this.setState({
      result: [],
    })
  }

  timeAverage = () => {
    const { result } = this.state

    return (
      result.length === 0
        ? null
        : <>
          <div>
            평균 시간: {(result.reduce((a, b) => a + b) / result.length).toFixed(3) }s
          </div>
          <button onClick={this.onReset}>RESET</button>
          </>
    )
  }

  render() {
    const { state, message } = this.state
    return (
      <>
        <div
          id="screen"
          className={state}
          onClick={this.onClickScreen}
        >
          {message}
        </div>
        {this.timeAverage()}
      </>
    )
  }
}

export default ResponseCheck;