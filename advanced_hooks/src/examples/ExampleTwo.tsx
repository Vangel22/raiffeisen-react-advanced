import { useReducer, useEffect } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface State {
  count: number;
  data: User[] | null;
}

type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET_DATA"; payload: User[] }
  | { type: "CLEAR_DATA" };

// const someObject = {
//     count: 0,
//     data: null
// }

// const newObject = {
//     ...someObject,
//     // count: 0,
//     // data: null,
//     count: 1
// }

function userReducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "SET_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export default function ExampleTwo() {
  const [state, dispatch] = useReducer(userReducer, { count: 0, data: null });

  useEffect(() => {
    console.log("Title effect: Setting title to count");
    document.title = `Count: ${state.count}`;

    return () => {
      console.log("Title effect: Cleaning up");
      document.title = "React App";
    };
  }, [state.count]);

  useEffect(() => {
    let mounted = true;
    console.log("Data effect: Fetching data");

    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => {
        if (mounted) {
          // localStorage.setItem("users", JSON.stringify(data));
          dispatch({ type: "SET_DATA", payload: data });
        }
      })
      .catch((error) => console.error("Error fetching data:", error));

    return () => {
      console.log("Data effect: Cleaning up");
      mounted = false;
      //   setData(null);
      //   localStorage.removeItem("users");
      // or
      // localStorage.clear();
    };
  }, []);

  return (
    <div>
      <h1>Example Two</h1>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
      <p>Data: {state.data ? JSON.stringify(state.data) : "No data"}</p>
    </div>
  );
}
