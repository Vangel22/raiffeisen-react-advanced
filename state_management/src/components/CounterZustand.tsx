import { useCounterStore } from "../state/counter/counterStore";

export const CounterZustand = () => {
  const {
    value: count,
    status,
    error,
    increment,
    decrement,
    reset,
    incrementWithAmountAsync,
  } = useCounterStore();

  return (
    <div>
      <h1>Counter (Zustand) {count}</h1>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      <button onClick={() => incrementWithAmountAsync(50)}>
        Increment by amount
      </button>
      <button onClick={increment}>Increment</button>
      <br />
      <button onClick={decrement}>Decrement</button>
      <br />
      <button onClick={reset}>Reset</button>
    </div>
  );
};
