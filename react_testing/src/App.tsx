import "./App.css";
import { Counter } from "./components/Counter";
import { Login } from "./components/Login";

function App() {
  return (
    <>
      <Counter />
      <div style={{ margin: "20px", backgroundColor: "red" }}>
        <Login />
      </div>
    </>
  );
}

export default App;
