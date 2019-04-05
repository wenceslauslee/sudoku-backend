const handlerUtil = require('./handler-util');
const puzzleManager = require('./puzzle/puzzle-manager');

async function handle(event) {
  console.log(event);
  const resource = event.resource;
  const httpMethod = event.httpMethod;
  var response = {};

  if (resource === '/puzzles/{difficulty}' && httpMethod === 'GET') {
    const user = handlerUtil.getUser(event);
    const puzzleString = await puzzleManager.getPuzzle(user, event.pathParameters.difficulty);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        puzzleString: puzzleString
      })
    };
  } else {
    response = {
      statusCode: 404,
      body: JSON.stringify({
        message: 'Unknown method!'
      })
    };
  }

  return response;
}

module.exports = {
  handle: handle
};
