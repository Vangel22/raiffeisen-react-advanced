import { useMemo, useCallback, useState, memo } from "react";

const ExpensiveDisplay = memo(
  ({ value, onIncrement }: { value: number; onIncrement: () => void }) => {
    console.log("ExpensiveDisplay");
    return (
      <div>
        <h2>Expensive value: {value}</h2>
        <button onClick={onIncrement}>Increment from child</button>
      </div>
    );
  }
);

const ExampleThree = () => {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  const expensiveValue = useMemo(() => {
    console.log("Expensive calculation computing...");
    return Array.from({ length: 1000000 }, (_, i) => i * count).reduce(
      (acc, curr) => acc + curr,
      0
    );
  }, [count]);

  const handleIncrement = useCallback(() => {
    console.log("Incrementing count from child");
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Other: {other}</p>
      <ExpensiveDisplay value={expensiveValue} onIncrement={handleIncrement} />
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <button onClick={() => setOther((prev) => prev + 1)}>
        Increment Other
      </button>
    </div>
  );
};

export default ExampleThree;
