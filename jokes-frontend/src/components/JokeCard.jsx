import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useJoke } from "../context/JokeContext";
import VoteButtons from "./VoteButtons";

const JokeCard = () => {
  const { joke, loadJoke } = useJoke();
  const [localVotes, setLocalVotes] = useState([]);

  useEffect(() => {
    if (joke) {
      setLocalVotes(joke.votes || []);
    }
  }, [joke]);

  if (!joke) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100 d-flex justify-content-center">  {/*  Centering the card */}
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="joke-card text-center">  {/*  Added text centering */}
            <Card.Body>
              <Card.Title>{joke.question}</Card.Title>
              <Card.Text>{joke.answer}</Card.Text>
              <VoteButtons joke={{ ...joke, votes: localVotes }} />
              <div className="d-flex justify-content-center mt-3">
                <Button variant="primary" className="next-joke-btn" onClick={loadJoke}>
                  Next Joke
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default JokeCard;
