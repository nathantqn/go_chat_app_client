import React from "react";
import "./App.css";
import Login from "./Login";

interface Room {
  id: number;
  name: string;
}

const App: React.FC = () => {
  return <Login />;
};

export default App;
