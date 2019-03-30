const puzzleManager = require('./puzzle-manager');

async function hello(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!'
    })
  };
};

async function getPuzzle(event) {
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
  hello: hello,
  getPuzzle: getPuzzle
};
