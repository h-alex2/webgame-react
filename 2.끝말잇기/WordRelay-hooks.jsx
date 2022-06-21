import React, { useState, useRef } from "react";

const WordRelayHooks = () => {
	const [word, setWord] = useState("알렉스");
	const [result, setResult] = useState("");
	const inputRef = useRef(null);

	const onSubmitForm = (e) => {
		e.preventDefault();

		if (word[word.length - 1] === e.target.children.word.value[0]) {
			setResult("딩동댕");
			setWord(e.target.children.word.value);
      e.target.children.word.value = "";
			inputRef.current.focus();
			return;
		}

		setResult("땡");
    e.target.children.word.value = "";
		inputRef.current.focus();
	}

	return (
		<>
			<div>{word}</div>
			<form onSubmit={onSubmitForm}>
				<input
          id="word"
					ref={inputRef}
				/>
				<button>ENTER</button>
			</form>
			<div>{result}</div>
		</>
	);
};


export default WordRelayHooks;