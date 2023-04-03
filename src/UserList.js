import React, { useEffect } from "react";

function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log("컴포넌트가 나타남");
    // props -> state
    // REST API
    // D3 Video.js
    // setInterval, setTimeout
    return () => {
      console.log("컴포넌트가 사라짐");
    };
  }, []);
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
}
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

export default UserList;
