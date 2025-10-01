import "./App.css";
import { AccordionExample } from "./components/AccordionExample";
import { MouseTrackerExample } from "./components/MouseTracker";
import { ExampleOne } from "./examples/ExampleOne";
import { ExampleThree } from "./examples/ExampleThree";
import { ExampleTwo } from "./examples/ExampleTwo";

function App() {
  return (
    <>
      {/* HOC Examples */}
      {/* <ExampleOne /> */}
      {/* <ExampleTwo
        name="John Doe"
        email="john.doe@example.com"
        isLoading={true}
      /> */}
      {/* <ExampleThree /> */}

      {/* Render Prop Example */}
      {/* <MouseTrackerExample /> */}

      {/* Compound Component Example */}
      {/* <AccordionExample /> */}
    </>
  );
}

export default App;
