const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = 'sudoku-user-data';

function updateUser(userId, name, email, gender, birthdate) {
  const params = {
    TableName: tableName,
    Key: {
      'id': userId
    },
    UpdateExpression: 'set givenname = :name, email = :email, gender = :gender, birthdate = :birthdate',
    ExpressionAttributeValues: {
      ':name': name,
      ':email': email,
      ':gender': gender,
      ':birthdate': birthdate
    },
    ReturnValues: 'ALL_NEW'
  };

  return docClient.update(params).promise()
    .then(data => {
      return data.Attribute;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

function getUser(userId) {
  const params = {
    TableName: tableName,
    ProjectionExpression: 'givenname, email, gender, birthdate',
    KeyConditionExpression: 'id = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    }
  };

  return docClient.query(params).promise()
    .then(data => {
      console.log(`User returned is: ${JSON.stringify(data, null, 2)}`);
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
  updateUser: updateUser,
  getUser: getUser
};
