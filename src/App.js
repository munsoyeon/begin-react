import React, {
  useRef,
  // useState,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import Counter from "./components/Counter";
import CreateUser from "./components/CreateUser";
import Hello from "./components/Hello";
import InputSample from "./components/InputSample";
import UserList from "./components/UserList";
import Wrapper from "./components/Wrapper";
import useInputs from "./components/useInputs";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는 중..");
  return users.filter((user) => user.active).length;
}
const initialState = {
  // inputs: {
  //   username: "",
  //   email: "",
  // }, useInputs.js 의 사용으로 필요없어짐
  users: [
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
  ],
};
function reducer(state, action) {
  switch (action.type) {
    // case "CHANGE_INPUT":
    //   return {
    //     ...state,
    //     inputs: {
    //       ...state.inputs,
    //       [action.name]: action.value,
    //     },
    //   }; useInputs.js 의 사용으로 필요없어짐
    case "CREATE_USER":
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      throw new Error("Unhandled action");
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form, onChange, reset] = useInputs({
    username: "",
    email: "",
  });
  const { username, email } = form; // form에서 추출
  const nextId = useRef(4);
  const { users } = state; //비구조할당으로 추출
  // const { username, email } = state.inputs; //비구조할당으로 추출. useInputs.js 의 사용으로 필요없어짐

  // const onChange = useCallback((e) => {
  //   const { name, value } = e.target;
  //   dispatch({
  //     type: "CHANGE_INPUT",
  //     name,
  //     value,
  //   });
  // }, []); useInputs.js 의 사용으로 필요없어짐
  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    nextId.current += 1;
    reset();
  }, [username, email, reset]);

  const onToggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE_USER",
      id,
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: "REMOVE_USER",
      id,
    });
  }, []);
  // const [inputs, setInputs] = useState({
  //   username: "",
  //   email: "",
  // });
  // const { username, email } = inputs;
  // const onChange = useCallback(
  //   (e) => {
  //     const { name, value } = e.target;
  //     setInputs({ ...inputs, [name]: value });
  //   },
  //   [inputs]
  // ); // 참조하는 값을 두번째 depth에 넣어줘야 그 값이 바뀔때만 함수 동작
  // const [users, setUsers] = useState([
  //   {
  //     id: 1,
  //     username: "sy",
  //     email: "symun@fff.com",
  //     active: true,
  //   },
  //   {
  //     id: 2,
  //     username: "mun",
  //     email: "hh@fff.com",
  //     active: false,
  //   },
  //   {
  //     id: 3,
  //     username: "haha",
  //     email: "kiki@fff.com",
  //     active: false,
  //   },
  // ]);
  // const nextId = useRef(4);
  // const onCreate = useCallback(() => {
  //   const user = {
  //     id: nextId.current,
  //     username,
  //     email,
  //   };
  //   // setUsers([...users, user]);
  //   // setUsers(users.concat(user));
  //   setUsers((users) => users.concat(user)); //파라미터에서 최신 users를 조회하기때문에 아래 배열에서 users를 빼도됨. 결과적으로 usernamerhk email이 바뀔때만 렌더링됨.
  //   setInputs({ username: "", email: "" });
  //   console.log(nextId.current); //4
  //   nextId.current += 1;
  // }, [username, email]);
  // // }, [username, email, users]);

  // const onRemove = useCallback((id) => {
  //   setUsers((users) => users.filter((user) => user.id !== id));
  // }, []);
  // const onToggle = useCallback((id) => {
  //   setUsers((users) =>
  //     users.map((user) =>
  //       user.id === id ? { ...user, active: !user.active } : user
  //     )
  //   );
  // }, []); /* 안에 있는 원소를 업데이트해야할때도 map 사용 */
  // const count = countActiveusers(users); // 이렇게만 작성하면 input에 입력할때 계속해서 기능이 돌아감.
  const count = useMemo(() => countActiveUsers(users), [users]); //users가 바뀔때에만 호출이 되고 아니면 이전것을 재사용한다.
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
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성 사용자 수 : {count}</div>
    </>
  );
}

export default App;
