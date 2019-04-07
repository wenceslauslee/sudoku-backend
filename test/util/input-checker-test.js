const chai = require('chai');
const assert = chai.assert;
const inputChecker = require('../../src/util/input-checker');

describe('inputChecker', () => {
  describe('checkBoolean', () => {
    const input = [
      undefined, null, 'true', 0, 1, true, false
    ];
    const expectedValue = [
      false, false, false, false, false, true, true
    ];

    function testInputs(i) {
      it(`should return whether value '${input[i]}'' is a boolean`, () => {
        const result = inputChecker.checkBoolean(input[i]);

        assert.strictEqual(result, expectedValue[i]);
      });
    }

    for (var i = 0; i < input.length; i++) {
      testInputs(i);
    }
  });

  describe('checkString', () => {
    const input = [
      undefined, null, 0, 1, true, false, '', 'yes'
    ];
    const expectedValue = [
      false, false, false, false, false, false, false, true
    ];

    function testInputs(i) {
      it(`should return whether value '${input[i]}'' is a boolean`, () => {
        const result = inputChecker.checkString(input[i]);

        assert.strictEqual(result, expectedValue[i]);
      });
    }

    for (var i = 0; i < input.length; i++) {
      testInputs(i);
    }
  });

  describe('checkDifficulty', () => {
    const input = [
      undefined, null, 'super-easy', 'trivial', 'easy', 0, false
    ];
    const expectedValue = [
      false, false, false, true, true, false, false
    ];

    function testInputs(i) {
      it(`should return whether value '${input[i]}' is a boolean`, () => {
        const result = inputChecker.checkDifficulty(input[i]);

        assert.strictEqual(result, expectedValue[i]);
      });
    }

    for (var i = 0; i < input.length; i++) {
      testInputs(i);
    }
  });
});
