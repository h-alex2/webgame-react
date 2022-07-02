import React, { memo } from "react";
import styled, { css } from "styled-components";

// class Balls extends PureComponent {
//   render() {
//     const { number } = this.props;
//     let background;

//     if (number <= 10) {
//       background = "red";
//     } else if (number <= 20) {
//       background = "orange";
//     } else if (number <= 30) {
//       background = "yellow";
//     } else if (number <= 40) {
//       background = "blue";
//     } else {
//       background = "green";
//     }

//     const Ball = styled.div`
//       background: ${background};
//       display: inline-block;
//       border: 1px solid black;
//       border-radius: 20px;
//       width: 40px;
//       height: 40px;
//       line-height: 40px;
//       font-size: 20px;
//       text-align: center;
//       margin-right: 20px;
//     `;

//     return <Ball>{number}</Ball>
//   }
// }

const Ball = styled.div`
  background-color: ${props => props.background};
  display: inline-block;
  border: 1px solid black;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  margin-right: 20px;
`;

const Balls = ({ number }) => {
  let background;

  if (number <= 10) {
    background = "red";
  } else if (number <= 20) {
    background = "orange";
  } else if (number <= 30) {
    background = "yellow";
  } else if (number <= 40) {
    background = "blue";
  } else {
    background = "green";
  }

  return (
    <Ball background={background}>{number}</Ball>
  )
}


export default Balls;