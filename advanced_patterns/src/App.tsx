import "./App.css";
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
      <MouseTrackerExample />
    </>
  );
}

export default App;
