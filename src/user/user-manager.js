const userData = require('../db/user-data');

function updateUser(userId, userInfo) {
  // Add more formal validation
  if (userInfo.givenname === '' || userInfo.email === '' || userInfo.gender === '' || userInfo.birthdate === '') {
    return {
      statusCode: 404,
      message: 'User info is not valid'
    };
  }
  return userData.updateUser(userId, userInfo.givenname, userInfo.email, userInfo.gender, userInfo.birthdate)
    .then(data => {
      return null;
    })
    .catch(err => {
      console.log(err);
      return {
        statusCode: 500,
        message: 'Internal Server Error'
      };
    });
}

function getUser(userId) {
  return userData.getUser(userId);
}

module.exports = {
  updateUser: updateUser,
  getUser: getUser
};
