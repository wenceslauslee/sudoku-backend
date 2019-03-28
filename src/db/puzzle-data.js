const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = 'sudoku-puzzle-data';

function getCount(difficulty) {
  const params = {
    TableName: tableName,
    ProjectionExpression: 'puzzleCount',
    KeyConditionExpression: 'difficulty = :d',
    ExpressionAttributeValues: {
      ':d': difficulty
    }
  };

  return docClient.query(params).promise()
    .then(data => {
      if (data.Items.length === 0) {
        return 0;
      }
      return data.Items[0].puzzleCount;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

module.exports = {
  getCount: getCount
};
