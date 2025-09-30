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

const ExpensiveDisplayTwo = memo(({ value }: { value: number }) => {
  console.log("ExpensiveDisplayTwo");
  return (
    <div>
      <h2>Expensive value: {value}</h2>
    </div>
  );
});

const ExampleThree = () => {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // Store the value of the expensive calculation
  const expensiveValue = useMemo(() => {
    console.log("Expensive calculation computing...");
    return Array.from({ length: 1000000 }, (_, i) => i * count).reduce(
      (acc, curr) => acc + curr,
      0
    );
  }, [count]);

  const expensiveValueOther = useMemo(() => {
    console.log("Expensive calculation computing...");
    return Array.from({ length: 1000000 }, (_, i) => i * count).reduce(
      (acc, curr) => acc + curr,
      0
    );
  }, [other]);

  // Store the reference to the function to avoid re-rendering the component
  const handleIncrement = useCallback(() => {
    console.log("Incrementing count from child");
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Other: {other}</p>
      <ExpensiveDisplay value={expensiveValue} onIncrement={handleIncrement} />
      <ExpensiveDisplayTwo value={expensiveValueOther} />
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <button onClick={() => setOther((prev) => prev + 1)}>
        Increment Other
      </button>
    </div>
  );
};

export default ExampleThree;
