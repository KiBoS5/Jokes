import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchJoke } from "../services/api";

const JokeContext = createContext();

export const useJoke = () => useContext(JokeContext);

export const JokeProvider = ({ children }) => {
  const [joke, setJoke] = useState(null);

  const loadJoke = async () => {
    const newJoke = await fetchJoke();
    setJoke(newJoke);
  };

  const updateVoteCount = (emoji) => {
    setJoke((prevJoke) => ({
      ...prevJoke,
      votes: prevJoke.votes.map((vote) =>
        vote.label === emoji ? { ...vote, value: vote.value + 1 } : vote
      ),
    }));
  };

  useEffect(() => {
    loadJoke();
  }, []);

  return (
    <JokeContext.Provider value={{ joke, loadJoke, updateVoteCount }}>
      {children}
    </JokeContext.Provider>
  );
};