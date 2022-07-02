import React, { useState, useRef } from "react";
import Try from "./Number-Try"


function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }

  return array;
}

const NumberBaseball = () => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumbers);
  const [tries, setTries] = useState([]);
  const inputRef = useRef(null);

  const reStart = () => {
    setTimeout(() => {
      alert("게임을 다시 시작합니다.");
      setValue(""),
      setAnswer(getNumbers());
      setTries([])
    }, 0)
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log({answer: answer, tries: tries})
    // 성공
    if (value === answer.join("")) {
      inputRef.current.focus();
      setResult("홈런!");
      setTries((prevTries) => {
        return [...prevTries, { try: value, result: "홈런!" }];
      })
      reStart();
      return;
    }

    const answerArray = value.split("").map((v) => parseInt(v));
    let strike = 0;
    let ball = 0;

    // 실패
    if (tries.length >= 9) {
      inputRef.current.focus();
      setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(",")}`)
      reStart();
      return;
    }
    // 값이 맞는 경우
    for (let i = 0; i < 4; i += 1) {
      if (answerArray[i] === answer[i]) {
        strike += 1;
      }else if (answer.includes(answerArray[i])) {
        ball += 1;
      }
    }
    setTries((prevTries) => {
      return [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다` }];
    })
    setValue("");
    inputRef.current.focus();
  }

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputRef}
          maxLength={4}
          value={value}
          onChange={onChangeInput}
        />
        <button>ENTER</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return (
            <Try key={`${i + 1}차 시도`} tryInfo={v} />
          )
        })}
      </ul>
    </>
  );
};

export default NumberBaseball;