import "./App.css";
import { ExampleOne } from "./examples/ExampleOne";
import { ExampleTwo } from "./examples/ExampleTwo";

function App() {
  return (
    <>
      {/* HOC Examples */}
      <ExampleOne />
      <ExampleTwo
        name="John Doe"
        email="john.doe@example.com"
        isLoading={true}
      />
    </>
  );
}

export default App;
