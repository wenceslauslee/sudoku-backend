const handlerUtil = require('./handler-util');
const userManager = require('./user/user-manager');

async function handle(event) {
  console.log(event);
  const resource = event.resource;
  const httpMethod = event.httpMethod;
  var response = {};

  if (resource === '/users' && httpMethod === 'GET') {
    const user = handlerUtil.getUser(event);
    const userInfo = await userManager.getUser(user);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        userInfo: userInfo
      })
    };
  } else if (resource === '/users' && httpMethod === 'PUT') {
    const user = handlerUtil.getUser(event);
    const result = await userManager.updateUser(user, JSON.parse(event.body));

    if (result === null) {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          status: 'success'
        })
      };
    } else {
      response = {
        statusCode: result.statusCode,
        body: JSON.stringify({
          message: result.message
        })
      };
    }
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
