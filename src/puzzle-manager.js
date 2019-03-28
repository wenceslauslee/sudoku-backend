const puzzle = require('./db/puzzle');
const puzzleData = require('./db/puzzle-data');

function getPuzzle(difficulty) {
  return puzzleData.getCount(difficulty)
    .then(count => {
      return puzzle.getPuzzle(difficulty, count);
    });
}

module.exports = {
  getPuzzle: getPuzzle
};
