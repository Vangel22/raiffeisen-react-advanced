import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>{count} clicks</h1>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};
