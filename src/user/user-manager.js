const emailValidator = require('email-validator');
const inputChecker = require('../util/input-checker');
const moment = require('moment-timezone');
const userDataDb = require('../db/user-data');

const genderRegex = /^(male|female)$/;

function updateUser(userId, userInfo) {
  const validation = validateUserInfo(userInfo);
  if (validation) {
    return validation;
  }

  return userDataDb.updateUser(userId, userInfo.givenname, userInfo.email, userInfo.gender, userInfo.birthdate)
    .then(data => {
      return {
        statusCode: 200,
        body: JSON.stringify({
          status: 'Success'
        })
      };
    })
    .catch(err => {
      console.log(err);

      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Internal Server Error'
        })
      };
    });
}

function getUser(userId) {
  return userDataDb.getUser(userId)
    .then(userInfo => {
      if (!userInfo) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: 'User cannot be found.'
          })
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          userInfo: userInfo
        })
      };
    })
    .catch(err => {
      console.log(err);

      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Internal Server Error'
        })
      };
    });
}

function validateUserInfo(userInfo) {
  const givenname = userInfo.givenname;
  if (!inputChecker.checkString(givenname) || givenname.length > 50) {
    return format404Message('Given name is not valid.');
  }
  const email = userInfo.email;
  if (!inputChecker.checkString(email) || email.length > 100 || !emailValidator.validate(email)) {
    return format404Message('Email is not valid.');
  }
  const gender = userInfo.gender;
  if (!inputChecker.checkString(gender) || !genderRegex.test(gender)) {
    return format404Message('Gender is not valid.');
  }
  const birthdate = userInfo.birthdate;
  if (!inputChecker.checkString(birthdate) || !moment(birthdate, 'YYYY-MM-DD', true).isValid()) {
    return format404Message('Birthdate is not valid.');
  }
}

function format404Message(message) {
  return {
    statusCode: 404,
    body: JSON.stringify({
      message: message
    })
  };
}

module.exports = {
  updateUser: updateUser,
  getUser: getUser
};
