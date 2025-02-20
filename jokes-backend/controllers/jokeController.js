const axios = require("axios");
const Joke = require("../models/jokeModel");

// Fetch a random joke from TeeHee API
const fetchRandomJoke = async (req, res) => {
  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any?safe-mode");

    const { error, safe, type, setup, delivery, joke } = response.data;

    if (error) {
      return res.status(500).json({ message: "Error fetching random joke from API" });
    }

    if (!safe) {
      return res.status(200).json({ message: "Joke is not safe" });
    }

    let question, answer;
    if (type === "twopart") {
      if (!setup || !delivery) {
        return res.status(400).json({ message: "Invalid joke structure" });
      }
      question = setup;
      answer = delivery;
    } else {
      if (!joke) {
        return res.status(400).json({ message: "Invalid joke structure" });
      }
      question = joke;
      answer = "No punchline provided";
    }

    // Create a joke object
    const jokeData = {
      question,
      answer,
      votes: [],  // Initially empty
      availableVotes: ["😂", "👍", "❤️"],
    };

    // Check if the joke already exists
    let existingJoke = await Joke.findOne({ question });

    if (!existingJoke) {
      // If the joke does not exist, create a new one
      existingJoke = new Joke(jokeData);
      await existingJoke.save();
    }

    // ✅ If the `votes` array is missing or empty, initialize it
    if (!existingJoke.votes || existingJoke.votes.length === 0) {
      existingJoke.votes = existingJoke.availableVotes.map((emoji) => ({
        label: emoji,
        value: 0,
      }));
      await existingJoke.save(); // Save the updated data to the database
    }

    res.json(existingJoke);
  } catch (error) {
    console.error("Error fetching joke:", error.message);
    res.status(500).json({ message: "Error fetching random joke" });
  }
};

// Submit a vote for a joke
const submitVote = async (req, res) => {
  const { id } = req.params;
  const { label } = req.body;

  console.log(" RECEIVED VOTE:", id, "Emoji:", label);
  
  if (!id || !label) {
    console.error(" Invalid request - Missing data!");
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const joke = await Joke.findById(id);
    if (!joke) {
      console.error(" Joke not found in the database:", id);
      return res.status(404).json({ message: "Joke not found" });
    }

    if (!joke.availableVotes.includes(label)) {
      console.error(" Invalid reaction:", label);
      return res.status(400).json({ message: "Invalid vote" });
    }

    const voteIndex = joke.votes.findIndex((vote) => vote.label === label);
    if (voteIndex === -1) {
      joke.votes.push({ label, value: 1 });
    } else {
      joke.votes[voteIndex].value += 1;
    }

    const updatedJoke = await joke.save();
    console.log(" Vote saved:", updatedJoke.votes);

    res.json(updatedJoke);
  } catch (error) {
    console.error(" Error in submitVote:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a joke
const deleteJoke = async (req, res) => {
  const { id } = req.params;
  try {
    const joke = await Joke.findByIdAndDelete(id);
    if (!joke) {
      return res.status(404).json({ message: "Joke not found" });
    }
    res.json({ message: "Joke deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting joke" });
  }
};

// Update a joke
const updateJoke = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  try {
    const updatedJoke = await Joke.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true, runValidators: true }
    );

    if (!updatedJoke) {
      return res.status(404).json({ message: "Joke not found" });
    }

    res.json(updatedJoke);
  } catch (error) {
    res.status(500).json({ message: "Error updating joke" });
  }
};

module.exports = {
  fetchRandomJoke,
  submitVote,
  deleteJoke,
  updateJoke,
};
