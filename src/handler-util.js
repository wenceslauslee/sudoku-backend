const jwt = require('./auth/jwt');
const _ = require('underscore');

function getUser(event) {
  const header = event.headers;
  var authorization;

  if (header && !_.isEmpty(header)) {
    authorization = header['Authorization'];
  }

  return jwt.getUser(authorization);
}

module.exports = {
  getUser: getUser
};
