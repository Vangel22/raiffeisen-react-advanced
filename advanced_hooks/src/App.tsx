import { useState } from "react";

import "./App.css";
// import ExampleOne from "./examples/ExampleOne";
import ExampleTwo from "./examples/ExampleTwo";

function App() {
  const [show, setShow] = useState(true);

  return (
    <>
      <div>
        <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>
        {/* {show && <ExampleOne />} */}
        {show && <ExampleTwo />}
      </div>
    </>
  );
}

export default App;
