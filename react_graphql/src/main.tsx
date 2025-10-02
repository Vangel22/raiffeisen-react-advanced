import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "./index.css";
import App from "./App.tsx";

const trevorbladesClient = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache(),
});

const spaceXClient = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={trevorbladesClient}>
      <App />
    </ApolloProvider>
    {/* <ApolloProvider client={spaceXClient}>
      <AppTwo />
    </ApolloProvider> */}
  </StrictMode>
);
