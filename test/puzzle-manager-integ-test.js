const chai = require('chai');
const assert = chai.assert;
const puzzleManager = require('../src/puzzle-manager');

describe('puzzleManager', () => {
  describe('getPuzzle', () => {
    it('should return puzzle', async () => {
      const puzzleString = await puzzleManager.getPuzzle('trivial');

      assert.strictEqual(puzzleString.length, 81);
    });
  });
});
