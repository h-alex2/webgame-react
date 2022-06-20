import React, { useState, useRef, useEffect } from "react";
import useInterval from "./useInterval";

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
}

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
}

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find((v) => {
    return v[1] === imgCoord;
  })[0];
}

const RSP = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    }

    if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    }

    if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  useInterval(changeHand, isRunning ? 100 : null);

  const onClickBtn = (choice) => () => {
    if (isRunning) {
      setIsRunning(false);
    }

    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      setResult("비겼습니다")
    }

    if ([-1, 2].includes(diff)) {
      setResult("비겼습니다")
      setScore((prevState) => prevState + 1);
    }

    if ([1, -2].includes(diff)) {
      setResult("졌습니다")
      setScore((prevState) => prevState - 1);
    }

    setTimeout(() => {
      setIsRunning(true);
    }, 1000);
  }

  return (
    <>
      <div
        id="computer"
        style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}
      >
      </div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
}

export default RSP;