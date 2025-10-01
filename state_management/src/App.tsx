import "./App.css";
import { useCounterStore } from "./state/counter/couterStore";

function App() {
  const { value, increment, decrement, reset, incrementWithAmountAsync } =
    useCounterStore();
  return (
    <>
      <h1>State Management</h1>

      <h1>Redux</h1>
      {/* <p>Count: {count}</p> */}
      {/* <Counter /> */}

      <h1>Zustand</h1>
      <p>Count: {value}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => incrementWithAmountAsync(50)}>
        Increment by amount
      </button>
    </>
  );
}

export default App;
