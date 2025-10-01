import { Counter } from "./components/Counter";
import { CounterZustand } from "./components/CounterZustand";
import "./App.css";

function App() {
  return (
    <div style={{ display: "flex", gap: "50px", padding: "20px" }}>
      <div>
        <h2>Redux Toolkit</h2>
        <Counter />
      </div>
      <div>
        <h2>Zustand</h2>
        <CounterZustand />
      </div>
    </div>
  );
}

export default App;
