import { useRef, useState } from "react";

import "./App.css";
// import ExampleOne from "./examples/ExampleOne";
import ExampleTwo from "./examples/ExampleTwo";
import ExampleThree from "./examples/ExampleThree";
import ExampleFour from "./examples/ExampleFour";
import ExampleFive from "./examples/ExampleFive";
import ExampleSix, { type ExampleSixHandle } from "./examples/ExampleSix";

function App() {
  const [show, setShow] = useState(true);

  const [showComponent, setShowComponent] = useState(true);
  const exampleSevenRef = useRef<ExampleSixHandle>(null);

  return (
    <div>
      <button onClick={() => setShowComponent(!showComponent)}>
        {showComponent ? "Hide Component" : "Show Component"}
      </button>

      {showComponent && (
        <>
          <ExampleSix ref={exampleSevenRef} />

          {/* ✅ Works: exposed via useImperativeHandle */}
          <button onClick={() => exampleSevenRef.current?.focusInput()}>
            Focus Input from Parent
          </button>

          {/* ❌ Does NOT work: not exposed, TypeScript error */}
          {/* @ts-expect-error: scrollToTop not in ExampleSevenHandle */}
          <button onClick={() => exampleSevenRef.current?.scrollToTop()}>
            Scroll To Top from Parent (WILL FAIL)
          </button>
        </>
      )}
    </div>
  );
}

export default App;
