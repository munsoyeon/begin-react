import React, { useEffect } from "react";

const User = React.memo(function User({ user, onRemove, onToggle }) {
  // useEffect(() => {
  //   console.log("컴포넌트가 나타남");
  //   // props -> state
  //   // REST API
  //   // D3 Video.js
  //   // setInterval, setTimeout
  //   return () => {
  //     // clearInterval, clearTimeout
  //     // 라이브러리 인스턴스 제거
  //     console.log("컴포넌트가 사라짐");
  //   };
  // }, []);
  useEffect(() => {
    console.log("user값이 설정됨");
    console.log(user);
    return () => {
      console.log("user 값이 바뀌기 전");
      console.log(user);
    };
  }, [user]);
  return (
    <div>
      <b
        style={{ color: user.active ? "green" : "black", cursor: "pointer" }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>{user.email}</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
});
function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default React.memo(
  UserList,
  (prevProps, nextProps) => nextProps.users === prevProps.users
);
