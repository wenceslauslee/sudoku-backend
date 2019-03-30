const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();
const puzzleTableMap = {
  'trivial': 'sudoku-puzzle-trivial',
  'easy': 'sudoku-puzzle-easy',
  'medium': 'sudoku-puzzle-medium'
};

function getPuzzle(difficulty, totalPuzzleCount) {
  const id = Math.ceil(Math.random() * totalPuzzleCount);
  const params = {
    TableName: puzzleTableMap[difficulty],
    Key: {
      'id': id
    },
    UpdateExpression: 'set useCount = useCount + :inc',
    ExpressionAttributeValues: {
      ':inc': 1
    },
    ReturnValues: 'ALL_NEW'
  };

  return docClient.update(params).promise()
    .then(data => {
      console.log(`Puzzle returned is: ${JSON.stringify(data, null, 2)}`);
      return data.Attributes.puzzleString;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

module.exports = {
  getPuzzle: getPuzzle
};
