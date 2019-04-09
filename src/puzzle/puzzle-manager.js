const inputChecker = require('../util/input-checker');
const puzzleDb = require('../db/puzzle');
const puzzleDataDb = require('../db/puzzle-data');
const scrambler = require('./scrambler');
const userPuzzleDataDb = require('../db/user-puzzle-data');

async function getPuzzle(userId, difficulty) {
  try {
    const lastPuzzle = await userPuzzleDataDb.getLastPuzzle(userId);
    if (lastPuzzle !== null && lastPuzzle.completed === 0) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          message: 'Previous puzzle still in progress.'
        })
      };
    }

    if (!inputChecker.checkDifficulty(difficulty)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Get puzzle request is not valid'
        })
      };
    }

    const userPuzzleCount = lastPuzzle ? lastPuzzle.puzzleCount : 0;
    const puzzleId = await puzzleDataDb.getCount(difficulty);
    const puzzle = await puzzleDb.getPuzzle(difficulty, puzzleId);
    const scrambledPuzzle = scrambler.scramblePuzzle(puzzle);
    await userPuzzleDataDb.storePuzzle(userId, userPuzzleCount + 1, scrambledPuzzle);

    return {
      statusCode: 200,
      body: JSON.stringify({
        puzzleString: scrambledPuzzle.puzzleString
      })
    };
  } catch (err) {
    console.log(err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error'
      })
    };
  }
}

async function completePuzzle(userId, requestBody) {
  if (!inputChecker.checkBoolean(requestBody.abandon) || !inputChecker.checkString(requestBody.puzzleString)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Post puzzle completion request is not valid'
      })
    };
  }

  try {
    const lastPuzzle = await userPuzzleDataDb.getLastPuzzle(userId);

    if (!requestBody.abandon && requestBody.puzzleString !== lastPuzzle.solution) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Post puzzle completion request puzzle string is incorrect'
        })
      };
    }

    const completed = requestBody.abandon ? -1 : 1;
    await userPuzzleDataDb.completePuzzle(userId, lastPuzzle.puzzleCount, completed);

    // Record metrics and datetimes

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Success'
      })
    };
  } catch (err) {
    console.log(err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error'
      })
    };
  }
}

module.exports = {
  getPuzzle: getPuzzle,
  completePuzzle: completePuzzle
};
