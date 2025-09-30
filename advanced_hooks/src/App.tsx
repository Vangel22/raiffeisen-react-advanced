import { useRef, useState } from "react";

import "./App.css";
// import ExampleOne from "./examples/ExampleOne";
import ExampleTwo from "./examples/ExampleTwo";
import ExampleThree from "./examples/ExampleThree";
import ExampleFour from "./examples/ExampleFour";
import ExampleFive from "./examples/ExampleFive";
import ExampleSix, { type ExampleSixHandle } from "./examples/ExampleSix";
import ExampleOne from "./examples/ExampleOne";

function App() {
  const [showComponent, setShowComponent] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger scroll from parent
  const handleScrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const exampleSevenRef = useRef<ExampleSixHandle>(null);

  return (
    <div>
      <button onClick={() => setShowComponent(!showComponent)}>
        {showComponent ? "Hide Component" : "Show Component"}
      </button>
      {showComponent && (
        <>
          <ExampleOne />
        </>
      )}
      {showComponent && (
        <>
          <ExampleTwo />
        </>
      )}
      {showComponent && (
        <>
          <ExampleThree />
        </>
      )}
      {showComponent && (
        <>
          <ExampleFour />
        </>
      )}
      {showComponent && (
        <>
          <button onClick={handleScrollToTop}>Scroll To Top</button>
          <ExampleFive ref={containerRef} />
        </>
      )}

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
