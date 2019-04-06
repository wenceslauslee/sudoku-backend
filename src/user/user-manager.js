const emailValidator = require('email-validator');
const moment = require('moment-timezone');
const userData = require('../db/user-data');

const genderRegex = /^(male|female)$/;

function updateUser(userId, userInfo) {
  const validation = validateUserInfo(userInfo);
  if (validation) {
    return validation;
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

function validateUserInfo(userInfo) {
  const givenname = userInfo.givenname;
  if (!givenname || givenname === '' || givenname.length > 50) {
    return {
      statusCode: 404,
      message: 'Given name is not valid.'
    };
  }
  const email = userInfo.email;
  if (!email || email === '' || email.length > 100 || !emailValidator.validate(email)) {
    return {
      statusCode: 404,
      message: 'Email is not valid.'
    };
  }
  const gender = userInfo.gender;
  if (!gender || gender === '' || !genderRegex.test(gender)) {
    return {
      statusCode: 404,
      message: 'Gender is not valid.'
    };
  }
  const birthdate = userInfo.birthdate;
  if (!birthdate || birthdate === '' || !moment(birthdate, 'YYYY-MM-DD', true).isValid()) {
    return {
      statusCode: 404,
      message: 'Birthdate is not valid.'
    };
  }
}

module.exports = {
  updateUser: updateUser,
  getUser: getUser
};
