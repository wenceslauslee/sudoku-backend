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
  console.log(event);
  const puzzleString = await puzzleManager.getPuzzle('simple');
  const response = {
    statusCode: 200,
    body: {
      puzzleString: puzzleString
    }
  };
  console.log(`GetPuzzle response is ${JSON.stringify(response, null, 2)}`);

  return response;
}

module.exports = {
  hello: hello,
  getPuzzle: getPuzzle
};
