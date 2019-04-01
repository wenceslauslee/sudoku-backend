const jwt = require('jsonwebtoken');

function getUser(authorization) {
  if (!authorization) {
    return 'api-gateway-test';
  }

  const token = authorization.substring(authorization.indexOf(' ') + 1);
  const decoded = jwt.decode(token);

  return decoded['cognito:username'];
}

module.exports = {
  getUser: getUser
};
