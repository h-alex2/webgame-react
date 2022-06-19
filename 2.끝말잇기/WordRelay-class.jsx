import React from "react";
import WordRelayHooks from "./WordRelay-hooks";
const { Component } = React;

class WordRelayClass extends Component {
  state = {
    word: "알렉스",
    value: "",
    result: "",
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: "딩동댕",
        word: this.state.value,
        value: "",
      });
      this.input.focus();
      return;
    }

    this.setState({
      result: "땡",
      // word: value,
      value: "",
    })
    this.input.focus();
  }

  onChangeInput = (e) => {
    this.setState({ value: e.target.value});
  };

  input;

  onRefInput = (c) => {
    this.input = c;
  }

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.onRefInput}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
          <button>ENTER</button>
        </form>
        <div>{this.state.result}</div>
        <br />
        <WordRelayHooks />
      </>
    )
  }
}

export default WordRelayClass;