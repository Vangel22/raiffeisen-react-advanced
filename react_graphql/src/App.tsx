import "./App.css";
import { AddCountryForm } from "./components/AddCountryForm";
import { CountriesList } from "./components/CountriesList";

// import { ApolloProvider } from "@apollo/client";
// import { ApolloProvider } from "@apollo/client/react";

function App() {
  return (
    <div>
      <h1>Countries with GraphQL</h1>

      {/* <CountriesList /> */}
      <AddCountryForm />
    </div>
  );
}

export default App;
