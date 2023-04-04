import React, { useRef, useState, useMemo, useCallback } from "react";
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
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({ ...inputs, [name]: value });
    },
    [inputs]
  ); // 참조하는 값을 두번째 depth에 넣어줘야 그 값이 바뀔때만 함수 동작
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
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    // setUsers([...users, user]);
    // setUsers(users.concat(user));
    setUsers((users) => users.concat(user)); //파라미터에서 최신 users를 조회하기때문에 아래 배열에서 users를 빼도됨. 결과적으로 usernamerhk email이 바뀔때만 렌더링됨.
    setInputs({ username: "", email: "" });
    console.log(nextId.current); //4
    nextId.current += 1;
  }, [username, email]);
  // }, [username, email, users]);

  const onRemove = useCallback((id) => {
    setUsers((users) => users.filter((user) => user.id !== id));
  }, []);
  const onToggle = useCallback((id) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, []); /* 안에 있는 원소를 업데이트해야할때도 map 사용 */
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
