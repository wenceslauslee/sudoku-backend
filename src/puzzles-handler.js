const puzzleManager = require('./puzzle/puzzle-manager');

async function handle(event) {
  const puzzleString = await puzzleManager.getPuzzle(event.pathParameters.difficulty);
  const response = {
    statusCode: 200,
    body: {
      puzzleString: puzzleString
    }
  };

  return response;
}

module.exports = {
  handle: handle
};
