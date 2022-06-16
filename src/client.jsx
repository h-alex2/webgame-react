import React from "react";
import ReactDOM from "react-dom"
import Gugudan from "./Gugudan";
import WordRelayHooks from "./WordRelay-hooks";

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
		</>
	)
}

ReactDOM.createRoot(document.querySelector("#root")).render(
	<Collect />
)