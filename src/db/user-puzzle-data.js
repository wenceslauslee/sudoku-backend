const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = 'sudoku-user-puzzle-data';

function storePuzzle(userId, puzzleCount, puzzle) {
  const params = {
    TableName: tableName,
    Key: {
      'userId': userId,
      'puzzleCount': puzzleCount
    },
    UpdateExpression: 'set puzzleId = :pid, difficulty = :d, metadata = :md, completed = :c',
    ExpressionAttributeValues: {
      ':pid': puzzle.id,
      ':d': puzzle.difficulty,
      ':md': {
        puzzle: puzzle.metadata
      },
      ':c': 0
    },
    ReturnValues: 'ALL_NEW'
  };

  return docClient.update(params).promise()
    .then(data => {
      console.log(`User puzzle returned is: ${JSON.stringify(data, null, 2)}`);

      return data.Attribute;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

function completePuzzle(userId, puzzleCount, completed) {
  const params = {
    TableName: tableName,
    Key: {
      'userId': userId,
      'puzzleCount': puzzleCount
    },
    UpdateExpression: 'set completed = :c',
    ExpressionAttributeValues: {
      ':c': completed
    },
    ReturnValues: 'ALL_NEW'
  };

  return docClient.update(params).promise()
    .then(data => {
      console.log(`User ${userId} completed (${completed}) puzzle ${puzzleCount}`);

      return data.Attribute;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

function getLastPuzzle(userId) {
  const params = {
    TableName: tableName,
    ProjectionExpression: 'puzzleCount, metadata, completed',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    },
    ScanIndexForward: false,
    Limit: 1
  };

  return docClient.query(params).promise()
    .then(data => {
      if (data.Items.length === 0) {
        return null;
      }
      return data.Items[0];
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

module.exports = {
  storePuzzle: storePuzzle,
  getLastPuzzle: getLastPuzzle,
  completePuzzle: completePuzzle
};
