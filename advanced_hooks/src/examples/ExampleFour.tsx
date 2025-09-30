import { memo, useCallback, useState } from "react";

const ChildButton = memo(
  ({ label, onClick }: { label: string; onClick: () => void }) => {
    console.log("ChildButton");
    return <button onClick={onClick}>{label}</button>;
  }
);

const ExampleFour = () => {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState(false);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div
      style={{
        backgroundColor: theme ? "black" : "white",
        color: theme ? "white" : "black",
      }}
    >
      <h1>Example Four</h1>
      <p>Count: {count}</p>
      <ChildButton label="Click me" onClick={increment} />

      <button onClick={() => setTheme(!theme)}>Change Theme</button>
    </div>
  );
};

export default ExampleFour;
