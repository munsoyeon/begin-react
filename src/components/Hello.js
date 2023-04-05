import React from "react";

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      {/* {isSpecial ? <b>*</b>} : null} */}
      {/* {isSpecial ? '스페셜하다' : '스페셜하지 않다'} */}{" "}
      {/* 아닐 때의 값도 있을때 삼항연산자를 쓰는게 더 적절하다. */}
      {isSpecial && <b>*</b>}
      안녕하세요 {name}
    </div>
  );
}

Hello.defaultProps = {
  name: "이름없음",
};

export default Hello;
