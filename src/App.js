import React, { useRef, useState, useMemo } from "react";
import Counter from "./Counter";
import CreateUser from "./CreateUser";
import Hello from "./Hello";
import InputSample from "./InputSample";
import UserList from "./UserList";
import Wrapper from "./Wrapper";

function countActiveusers(users) {
  console.log("활성 사용자 수를 세는 중..");
  return users.filter((user) => user.active).length;
}
function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "sy",
      email: "symun@fff.com",
      active: true,
    },
    {
      id: 2,
      username: "mun",
      email: "hh@fff.com",
      active: false,
    },
    {
      id: 3,
      username: "haha",
      email: "kiki@fff.com",
      active: false,
    },
  ]);
  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    // setUsers([...users, user]);
    setUsers(users.concat(user));
    setInputs({ username: "", email: "" });
    console.log(nextId.current); //4
    nextId.current += 1;
  };

  const onRemove = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  const onToggle = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }; /* 안에 있는 원소를 업데이트해야할때도 map 사용 */
  // const count = countActiveusers(users); // 이렇게만 작성하면 input에 입력할때 계속해서 기능이 돌아감.
  const count = useMemo(() => countActiveusers(users), [users]); //users가 바뀔때에만 호출이 되고 아니면 이전것을 재사용한다.
  return (
    <>
      <Wrapper>
        <Hello name="react" color="red" isSpecial={true} />
        <Hello color="pink" />
      </Wrapper>
      <Counter />
      <br />
      <br />
      <InputSample />
      <br />
      <br />
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수 : {count}</div>
    </>
  );
}

export default App;
