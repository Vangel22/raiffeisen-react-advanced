// Simple component using useState and useEffect
import { useState, useEffect } from "react";

export default function ExampleOne() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("Title effect: Setting title to count");
    document.title = `Count: ${count}`;

    return () => {
      console.log("Title effect: Cleaning up");
      document.title = "React App";
    };
  }, [count]);

  // Data effect: Fetch data from API
  useEffect(() => {
    let mounted = true;
    console.log("Data effect: Fetching data");

    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => {
        if (mounted) {
          setData(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));

    return () => {
      console.log("Data effect: Cleaning up");
      mounted = false;
      setData(null);
    };
  }, []);

  return (
    <div>
      <h1>Example One</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <p>Data: {data ? JSON.stringify(data) : "No data"}</p>
    </div>
  );
}
