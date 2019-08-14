import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:8080/query"
});

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Root;
