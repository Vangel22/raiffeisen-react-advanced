import { useState } from "react";

import "./App.css";
// import ExampleOne from "./examples/ExampleOne";
import ExampleTwo from "./examples/ExampleTwo";
import ExampleThree from "./examples/ExampleThree";
import ExampleFour from "./examples/ExampleFour";

function App() {
  const [show, setShow] = useState(true);

  return (
    <>
      <div>
        <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>
        {/* {show && <ExampleOne />} */}
        {/* {show && <ExampleTwo />} */}
        {show && <ExampleThree />}
        {/* {show && <ExampleFour />} */}
      </div>
    </>
  );
}

export default App;
