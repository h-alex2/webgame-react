import React from "react";
import ReactDOM from "react-dom"
import Gugudan from "./Gugudan";
import WordRelayHooks from "./WordRelay-hooks";
import NumberBaseball from "./NumberBaseball-hooks";

const Collect = () => {
	return (
		<>
      <div>
        <h2>구구단</h2>
        <Gugudan />
      </div>
      <br />
      <hr />
      <div>
        <h2>끝말잇기</h2>
        <WordRelayHooks />
      </div>
      <br />
      <hr />
      <div>
        <h2>숫자야구</h2>
        <NumberBaseball />
      </div>
		</>
	)
}

ReactDOM.createRoot(document.querySelector("#root")).render(
	<Collect />
)