const handlerUtil = require('./handler-util');
const puzzleManager = require('./puzzle/puzzle-manager');

async function handle(event) {
  console.log(event);
  const user = handlerUtil.getUser(event);
  const puzzleString = await puzzleManager.getPuzzle(user, event.pathParameters.difficulty);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      puzzleString: puzzleString
    })
  };

  return response;
}

module.exports = {
  handle: handle
};
