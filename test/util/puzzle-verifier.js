function verifyPuzzleStringsMatch(puzzleString, solvedPuzzleString) {
  const length = puzzleString.length;

  for (var i = 0; i < length; i++) {
    if (puzzleString[i] !== '_' && puzzleString[i] !== solvedPuzzleString[i]) {
      return false;
    }
  }

  return true;
}

module.exports = {
  verifyPuzzleStringsMatch: verifyPuzzleStringsMatch
};
