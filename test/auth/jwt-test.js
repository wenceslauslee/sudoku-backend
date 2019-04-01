const chai = require('chai');
const assert = chai.assert;
const jwt = require('../../src/auth/jwt');

describe('jwt', () => {
  describe('getUser', () => {
    const testToken = process.env.JWT_TEST_TOKEN;

    it('should return correct user when decoded', () => {
      if (testToken) {
        const user = jwt.getUser(testToken);

        assert.strictEqual(user, 'testuser');
      }
    });
  });
});
