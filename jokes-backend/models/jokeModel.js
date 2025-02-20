const mongoose = require('mongoose');

// Joke schema definition
const jokeSchema = new mongoose.Schema({
  question: { 
    type: String, 
    required: true // The question part of the joke
  },
  answer: { 
    type: String, 
    required: true // The answer part of the joke
  },
  votes: [
    {
      value: { 
        type: Number, 
        required: true, 
        default: 0, // Votes start from 0
      },
      label: { 
        type: String, 
        required: true, // Emoji label for the vote
      }
    }
  ],
  availableVotes: { 
    type: [String], 
    required: true, 
    default: ["😂", "👍", "❤️"] // Predefined emojis for voting
  }
});

// Add a virtual 'id' field for easier access
jokeSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure that the virtual 'id' is included in JSON responses
jokeSchema.set('toJSON', {
  virtuals: true,
});

// Create and export Joke model
const Joke = mongoose.model('Joke', jokeSchema);

module.exports = Joke;