const handlerUtil = require('./handler-util');
const userManager = require('./user/user-manager');

async function handle(event) {
  console.log(event);
  const resource = event.resource;
  const httpMethod = event.httpMethod;
  var response = {};

  if (resource === '/users' && httpMethod === 'GET') {
    const user = handlerUtil.getUser(event);
    response = await userManager.getUser(user);
  } else if (resource === '/users' && httpMethod === 'PUT') {
    const user = handlerUtil.getUser(event);
    response = await userManager.updateUser(user, JSON.parse(event.body));
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

async function confirm(event, context, callback) {
  const user = event.userName;
  await userManager.updateUser(user, JSON.parse(event.body));

  callback(null, event);
}

module.exports = {
  handle: handle,
  confirm: confirm
};
