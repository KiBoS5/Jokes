const express = require('express');
const {
  fetchRandomJoke,
  submitVote,
  deleteJoke,
  updateJoke,
} = require('../controllers/jokeController');
const router = express.Router();

router.get('/joke', fetchRandomJoke);
router.post('/joke/:id/vote', submitVote);
router.delete('/joke/:id', deleteJoke);
router.put('/joke/:id', updateJoke);

module.exports = router;
