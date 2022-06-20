import React, { useState, useRef } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요.");
  const [result, setResult] = useState([]);
  const timeOut = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === "waiting") {
      startTime.current = new Date();
      setState("ready");
      setMessage("초록색이 되면 클릭하세요");
      timeOut.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭하세요");
      }, Math.floor(Math.random() * 1000) + 2000);
    }

    if (state === "ready") {
      clearTimeout(timeOut.current);
      setState("waiting");
      setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요");
      setResult([]);
    }

    if (state === "now") {
      endTime.current = new Date();
      setState("waiting");
      setMessage("클릭해서 시작하세요");
      setResult((prevResult) => {
        return [...prevResult, (endTime.current / 1000) - (startTime.current / 1000)];
      });
    }
  }

  const onReset = () => {
    setResult([]);
  }

  const timeAverage = () => {
    return (
      result.length === 0
        ? null
        : <>
          <div>
            평균 시간: {(result.reduce((a, b) => a + b) / result.length).toFixed(3)}s
          </div>
          <button onClick={onReset}>RESET</button>
          </>
    )
  }

  return (
    <>
      <div
        id="screen"
        className={state}
        onClick={onClickScreen}
      >
        {message}
      </div>
      {timeAverage()}
    </>
  )
}


export default ResponseCheck;