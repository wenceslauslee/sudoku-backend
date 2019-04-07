const chai = require('chai');
const assert = chai.assert;
const puzzleManager = require('../../src/puzzle/puzzle-manager');

describe('puzzleManager', () => {
  describe('getPuzzle', () => {
    it('should return puzzle', async () => {
      const response = await puzzleManager.getPuzzle('test-user', 'trivial');
      const body = JSON.parse(response.body);
      const puzzleString = body.puzzleString;

      assert.strictEqual(response.statusCode, 200);
      assert.strictEqual(puzzleString.length, 81);
    });

    it('should return error if puzzle is called without completion', async () => {
      const response = await puzzleManager.getPuzzle('test-user-uncompleted', 'trivial');
      const body = JSON.parse(response.body);
      const message = body.message;

      assert.strictEqual(response.statusCode, 403);
      assert.strictEqual(message, 'Previous puzzle still in progress.');
    });

    // Mark puzzles as completed so next test run will not fail
    after(async () => {
      const completeBody = {
        abandon: false,
        puzzleString: 'some-string-for-now'
      };
      await puzzleManager.completePuzzle('test-user', completeBody);
    });
  });
});
