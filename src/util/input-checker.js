const difficultyTable = {
  'trivial': 0,
  'easy': 0
};

function checkBoolean(value) {
  return value !== undefined && value !== null && typeof value === 'boolean';
}

function checkString(value) {
  return value !== undefined && value !== null && typeof value === 'string' && value.length !== 0;
}

function checkDifficulty(value) {
  const isString = checkString(value);

  return isString ? (difficultyTable[value] !== undefined) : isString;
}

module.exports = {
  checkBoolean: checkBoolean,
  checkDifficulty: checkDifficulty,
  checkString: checkString
};
