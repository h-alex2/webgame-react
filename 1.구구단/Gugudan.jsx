import React, {useState, useRef} from "react";

const Gugudan = () => {
	const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
	const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
	const [value, setValue] = useState("");
	const [result, setResult] = useState("");

	const inputRef = useRef(null);

	const onSubmit = (e) => {
		e.preventDefault();
		if (parseInt(value) === (first * second)) {
			setResult(`Right! ${first} X ${second} = ${first * second}`);
			setFirst(Math.ceil(Math.random() * 9));
			setSecond(Math.ceil(Math.random() * 9));
			setValue(""),

			inputRef.current.focus();

			return;
		}

		setResult(`Wrong! ${first} X ${second} = ${first * second}`);
		setFirst(Math.ceil(Math.random() * 9));
		setSecond(Math.ceil(Math.random() * 9));
		setValue("");
	}

	return (
		<>
		<div>
			<div>{first} X {second} =</div>
			<form onSubmit={onSubmit}>
				<input
					ref={inputRef}
					type="number"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<button>ENTER</button>
			</form>
			<div style={{transition: "0.4s",fontSize: "50px", fontWeight: "bold"}}>{result}</div>
		</div>
		</>)
}

export default Gugudan;