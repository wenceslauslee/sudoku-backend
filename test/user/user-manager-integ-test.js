const chai = require('chai');
const assert = chai.assert;
const userManager = require('../../src/user/user-manager');

describe('userManager', () => {
  describe('getUser', () => {
    it('should return user', async () => {
      const response = await userManager.getUser('test-user');
      const body = JSON.parse(response.body);
      const userInfo = body.userInfo;

      assert.strictEqual(response.statusCode, 200);
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
      const response = await userManager.updateUser('test-user', updatedValues);
      const body = JSON.parse(response.body);
      const status = body.status;

      assert.strictEqual(response.statusCode, 200);
      assert.strictEqual(status, 'Success');
    });
  });

  describe('updateUser', () => {
    const input = [
      { 'key': 'givenname', 'value': '' },
      { 'key': 'email', 'value': 'abcde' },
      { 'key': 'gender', 'value': 'mfemal' },
      { 'key': 'birthdate', 'value': '2019-02-29' },
      { 'key': 'birthdate', 'value': '2019-02-281' }
    ];
    const expectedMessage = [
      'Given name is not valid.',
      'Email is not valid.',
      'Gender is not valid.',
      'Birthdate is not valid.',
      'Birthdate is not valid.'
    ];

    function testInputs(i) {
      const updatedValues = {
        givenname: 'Test User',
        email: 'wenceslauslee@yahoo.com.tw',
        gender: 'male',
        birthdate: '1990-01-01'
      };

      it(`should return '${expectedMessage[i]}' when given wrong input`, async () => {
        updatedValues[input[i]['key']] = input[i]['value'];
        const response = await userManager.updateUser('test-user', updatedValues);
        const body = JSON.parse(response.body);
        const message = body.message;

        assert.strictEqual(response.statusCode, 404);
        assert.strictEqual(message, expectedMessage[i]);
      });
    }

    for (var i = 0; i < input.length; i++) {
      testInputs(i);
    }
  });
});
