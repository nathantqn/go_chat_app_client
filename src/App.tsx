import React from "react";
import "./App.css";
import Login from "./Login";
import { useQuery } from "@apollo/react-hooks";
import { GET_CURRENT_USER } from "./graphql/query";
import Home from "./Home";

const App: React.FC = () => {
  const { data } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-only" });
  if (data.currentUser) return <Home currentUser={data.currentUser} />;
  return <Login />;
};

export default App;
