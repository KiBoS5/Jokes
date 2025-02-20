import React from "react";
import { JokeProvider } from "./context/JokeContext.jsx";
import JokeCard from "./components/JokeCard";

function App() {
  return (
    <JokeProvider>
      <div className="container mt-5">
        <h1 className="text-center">Jokes App</h1>
        <JokeCard />
      </div>
    </JokeProvider>
  );
}

export default App;