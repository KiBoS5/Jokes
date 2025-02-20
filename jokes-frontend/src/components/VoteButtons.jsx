import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { submitVote } from "../services/api";
import { useJoke } from "../context/JokeContext";

const VoteButtons = ({ joke }) => {
  const { updateVoteCount } = useJoke();
  const [localVotes, setLocalVotes] = useState([]);

  useEffect(() => {
    setLocalVotes(joke.votes || joke.availableVotes.map((emoji) => ({ label: emoji, value: 0 })));
  }, [joke]);

  const handleVote = async (emoji) => {
    console.log(" Clicked vote button:", emoji);

    if (!emoji) {
      console.error(" Emoji not provided!");
      return;
    }

    const updatedJoke = await submitVote(joke.id, emoji);
    if (updatedJoke) {
      console.log(" Updated data from backend:", updatedJoke.votes);
      setLocalVotes(updatedJoke.votes);
      updateVoteCount(emoji);
    } else {
      console.error(" Error sending vote to the backend");
    }
  };

  return (
    <Container className="d-flex flex-wrap justify-content-center gap-3 mt-3">
      {localVotes.map(({ label, value }) => (
        <Button
          key={label}
          variant="outline-primary"
          className="emoji-btn"
          onClick={() => handleVote(label)}
        >
          {label} {value}
        </Button>
      ))}
    </Container>
  );
};

export default VoteButtons;
