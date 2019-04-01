const _ = require('underscore');

function scramblePuzzle(puzzle) {
  const puzzleString = puzzle.puzzleString;
  const solvedPuzzleString = puzzle.solvedPuzzleString;
  const metadata = _.shuffle(_.range(1, 10));
  const rotated = Math.floor(Math.random() * 4);
  metadata.unshift(rotated);
  const metadataObject = createMetadataObject(metadata);

  return {
    id: puzzle.id,
    difficulty: puzzle.difficulty,
    metadata: metadata,
    puzzleString: rotate(puzzleString, rotated, metadataObject),
    solvedPuzzleString: rotate(solvedPuzzleString, rotated, metadataObject)
  };
}

function rotate(puzzleString, numberOfTimes, metadataObject) {
  var output = '';
  if (numberOfTimes === 0) {
    for (var i0 = 0; i0 < 9; i0++) {
      for (var j0 = 0; j0 < 9; j0++) {
        output += scramble(puzzleString[i0 * 9 + j0], metadataObject);
      }
    }
  } else if (numberOfTimes === 1) {
    for (var i1 = 8; i1 >= 0; i1--) {
      for (var j1 = 0; j1 < 9; j1++) {
        output += scramble(puzzleString[j1 * 9 + i1], metadataObject);
      }
    }
  } else if (numberOfTimes === 2) {
    for (var i2 = 8; i2 >= 0; i2--) {
      for (var j2 = 8; j2 >= 0; j2--) {
        output += scramble(puzzleString[i2 * 9 + j2], metadataObject);
      }
    }
  } else {
    for (var i3 = 0; i3 < 9; i3++) {
      for (var j3 = 8; j3 >= 0; j3--) {
        output += scramble(puzzleString[j3 * 9 + i3], metadataObject);
      }
    }
  }

  return output;
}

function scramble(p, metadataObject) {
  if (p === '_') {
    return p;
  }
  return metadataObject[p];
}

function createMetadataObject(metadata) {
  return {
    '1': metadata[1] + '',
    '2': metadata[2] + '',
    '3': metadata[3] + '',
    '4': metadata[4] + '',
    '5': metadata[5] + '',
    '6': metadata[6] + '',
    '7': metadata[7] + '',
    '8': metadata[8] + '',
    '9': metadata[9] + ''
  };
}

module.exports = {
  scramblePuzzle: scramblePuzzle,
  createMetadataObject: createMetadataObject
};
