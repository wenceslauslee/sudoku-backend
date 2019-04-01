const chai = require('chai');
const assert = chai.assert;
const scrambler = require('../../src/puzzle/scrambler');

describe('scrambler', () => {
  describe('scramblePuzzle', () => {
    const puzzle = {
      puzzleString: '_234567892_456789134_678912456_891235678_123467891_345789123_568912345_791234567_',
      solvedPuzzleString: '123456789234567891345678912456789123567891234678912345789123456891234567912345678'
    };

    it('should return scrambled puzzle without rotation', () => {
      var scrambledPuzzle;
      while (scrambledPuzzle === undefined || scrambledPuzzle.metadata[0] !== 0) {
        scrambledPuzzle = scrambler.scramblePuzzle(puzzle);
      }
      const expectedPuzzleString = '_234567892_456789134_678912456_891235678_123467891_345789123_568912345_791234567_';
      const expectedSolvedPuzzleString =
        '123456789234567891345678912456789123567891234678912345789123456891234567912345678';

      assert.strictEqual(scrambledPuzzle.puzzleString.length, 81);
      assert.strictEqual(scrambledPuzzle.solvedPuzzleString.length, 81);
      assert.isTrue(verifyPuzzleStringsMatch(scrambledPuzzle.puzzleString, scrambledPuzzle.solvedPuzzleString));
      assert.isTrue(testScrambledValue(expectedPuzzleString, scrambledPuzzle.puzzleString, scrambledPuzzle.metadata));
      assert.isTrue(testScrambledValue(
        expectedSolvedPuzzleString, scrambledPuzzle.solvedPuzzleString, scrambledPuzzle.metadata));
    });

    it('should return scrambled puzzle with one rotation', () => {
      var scrambledPuzzle;
      while (scrambledPuzzle === undefined || scrambledPuzzle.metadata[0] !== 1) {
        scrambledPuzzle = scrambler.scramblePuzzle(puzzle);
      }
      const expectedPuzzleString = '91234567_8912345_7789123_5667891_3455678_1234456_8912334_6789122_4567891_23456789';
      const expectedSolvedPuzzleString =
        '912345678891234567789123456678912345567891234456789123345678912234567891123456789';

      assert.strictEqual(scrambledPuzzle.puzzleString.length, 81);
      assert.strictEqual(scrambledPuzzle.solvedPuzzleString.length, 81);
      assert.isTrue(verifyPuzzleStringsMatch(scrambledPuzzle.puzzleString, scrambledPuzzle.solvedPuzzleString));
      assert.isTrue(testScrambledValue(expectedPuzzleString, scrambledPuzzle.puzzleString, scrambledPuzzle.metadata));
      assert.isTrue(testScrambledValue(
        expectedSolvedPuzzleString, scrambledPuzzle.solvedPuzzleString, scrambledPuzzle.metadata));
    });

    it('should return scrambled puzzle with two rotation', () => {
      var scrambledPuzzle;
      while (scrambledPuzzle === undefined || scrambledPuzzle.metadata[0] !== 2) {
        scrambledPuzzle = scrambler.scramblePuzzle(puzzle);
      }
      const expectedPuzzleString = '_765432197_543219865_321987543_198764321_876532198_654219876_431987654_298765432_';
      const expectedSolvedPuzzleString =
        '876543219765432198654321987543219876432198765321987654219876543198765432987654321';

      assert.strictEqual(scrambledPuzzle.puzzleString.length, 81);
      assert.strictEqual(scrambledPuzzle.solvedPuzzleString.length, 81);
      assert.isTrue(verifyPuzzleStringsMatch(scrambledPuzzle.puzzleString, scrambledPuzzle.solvedPuzzleString));
      assert.isTrue(testScrambledValue(expectedPuzzleString, scrambledPuzzle.puzzleString, scrambledPuzzle.metadata));
      assert.isTrue(testScrambledValue(
        expectedSolvedPuzzleString, scrambledPuzzle.solvedPuzzleString, scrambledPuzzle.metadata));
    });

    it('should return scrambled puzzle with three rotation', () => {
      var scrambledPuzzle;
      while (scrambledPuzzle === undefined || scrambledPuzzle.metadata[0] !== 3) {
        scrambledPuzzle = scrambler.scramblePuzzle(puzzle);
      }
      const expectedPuzzleString = '98765432_1987654_2219876_4332198_6544321_8765543_1987665_3219877_5432198_76543219';
      const expectedSolvedPuzzleString =
        '987654321198765432219876543321987654432198765543219876654321987765432198876543219';

      assert.strictEqual(scrambledPuzzle.puzzleString.length, 81);
      assert.strictEqual(scrambledPuzzle.solvedPuzzleString.length, 81);
      assert.isTrue(verifyPuzzleStringsMatch(scrambledPuzzle.puzzleString, scrambledPuzzle.solvedPuzzleString));
      assert.isTrue(testScrambledValue(expectedPuzzleString, scrambledPuzzle.puzzleString, scrambledPuzzle.metadata));
      assert.isTrue(testScrambledValue(
        expectedSolvedPuzzleString, scrambledPuzzle.solvedPuzzleString, scrambledPuzzle.metadata));
    });

    function testScrambledValue(expectedPuzzleString, actualPuzzleString, metadata) {
      const length = expectedPuzzleString.length;
      const metadataObject = scrambler.createMetadataObject(metadata);

      for (var i = 0; i < length; i++) {
        if (expectedPuzzleString[i] !== '_' && metadataObject[expectedPuzzleString[i]] !== actualPuzzleString[i]) {
          return false;
        }
      }

      return true;
    }

    function verifyPuzzleStringsMatch(puzzleString, solvedPuzzleString) {
      const length = puzzleString.length;

      for (var i = 0; i < length; i++) {
        if (puzzleString[i] !== '_' && puzzleString[i] !== solvedPuzzleString[i]) {
          return false;
        }
      }

      return true;
    }
  });
});
