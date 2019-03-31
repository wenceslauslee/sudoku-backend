const puzzle = require('../db/puzzle');
const puzzleData = require('../db/puzzle-data');
const scrambler = require('./scrambler');
const userPuzzleData = require('../db/user-puzzle-data');

function getPuzzle(userId, difficulty) {
  return puzzleData.getCount(difficulty)
    .then(count => {
      return puzzle.getPuzzle(difficulty, count);
    })
    .then(puzzle => {
      return scrambler.scramblePuzzle(puzzle);
    })
    .then(puzzle => {
      return userPuzzleData.getMaxPuzzleCount(userId)
        .then(maxPuzzleCount => {
          return userPuzzleData.storePuzzle(userId, maxPuzzleCount + 1, puzzle);
        })
        .then(() => puzzle.puzzleString);
    });
}

module.exports = {
  getPuzzle: getPuzzle
};
