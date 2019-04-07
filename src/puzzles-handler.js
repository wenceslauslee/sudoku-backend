const handlerUtil = require('./handler-util');
const puzzleManager = require('./puzzle/puzzle-manager');

async function handle(event) {
  console.log(event);
  const resource = event.resource;
  const httpMethod = event.httpMethod;
  const user = handlerUtil.getUser(event);
  var response = {};

  if (resource === '/puzzles/new/{difficulty}' && httpMethod === 'GET') {
    response = await puzzleManager.getPuzzle(user, event.pathParameters.difficulty);
  } else if (resource === '/puzzles/complete' && httpMethod === 'POST') {
    response = await puzzleManager.completePuzzle(user, JSON.parse(event.body));
  } else {
    response = {
      statusCode: 500,
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
