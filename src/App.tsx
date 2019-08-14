import React from "react";
import "./App.css";
import { useQuery } from "@apollo/react-hooks";
import { GET_ROOMS } from "./graphql/query";

interface Room {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ROOMS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const rooms = data.rooms as Room[];
  return (
    <>
      {rooms.map(room => (
        <div key={room.id}>{room.name}</div>
      ))}
    </>
  );
};

export default App;
