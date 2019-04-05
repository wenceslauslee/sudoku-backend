const chai = require('chai');
const assert = chai.assert;
const userManager = require('../../src/user/user-manager');

describe('userManager', () => {
  describe('getUser', () => {
    it('should return user', async () => {
      const userInfo = await userManager.getUser('test-user');

      assert.strictEqual(userInfo.givenname, 'Test User');
      assert.strictEqual(userInfo.email, 'wenceslauslee@yahoo.com.tw');
      assert.strictEqual(userInfo.gender, 'male');
      assert.strictEqual(userInfo.birthdate, '1990-01-01');
    });
  });

  describe('updateUser', () => {
    it('should update user without errors', async () => {
      const updatedValues = {
        givenname: 'Test User',
        email: 'wenceslauslee@yahoo.com.tw',
        gender: 'male',
        birthdate: '1990-01-01'
      };
      const result = await userManager.updateUser('test-user', updatedValues);

      assert.isNull(result);
    });
  });

  describe('updateUser', () => {
    it('should return error message if validation fails', async () => {
      const updatedValues = {
        givenname: ''
      };
      const result = await userManager.updateUser('test-user', updatedValues);

      assert.strictEqual(result.statusCode, 404);
      assert.strictEqual(result.message, 'User info is not valid');
    });
  });
});
