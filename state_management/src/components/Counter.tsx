import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../state/store";
import {
  increment,
  decrement,
  reset,
  incrementWithAmountAsync,
} from "../state/counter/counterSlice";

export const Counter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelector((state: RootState) => state.counter.value);
  const status = useSelector((state: RootState) => state.counter.status);
  const error = useSelector((state: RootState) => state.counter.error);

  return (
    <div>
      <h1>Counter {count}</h1>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      <button onClick={() => dispatch(incrementWithAmountAsync(50))}>
        Increment by amount
      </button>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <br />
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <br />
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};
