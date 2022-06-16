import React, { useState, useRef } from "react";

const WordRelayHooks = () => {
	const [word, setWord] = useState("알렉스");
	const [value, setValue] = useState("");
	const [result, setResult] = useState("");
	const inputRef = useRef(null);

	const onSubmitForm = (e) => {
		e.preventDefault();

		if (word[word.length - 1] === value[0]) {
			setResult("딩동댕");
			setWord(value);
			setValue("");
			inputRef.current.focus();
			return;
		}

		setResult("땡");
		setValue("");
		inputRef.current.focus();
	}

	const onChangeInput = (e) => {
		setValue(e.target.value);
	}

	return (
		<>
			<div>{word}</div>
			<form onSubmit={onSubmitForm}>
				<input
					ref={inputRef}
					value={value}
					onChange={onChangeInput}
				/>
				<button>ENTER</button>
			</form>
			<div>{result}</div>
		</>
	);
};


export default WordRelayHooks;