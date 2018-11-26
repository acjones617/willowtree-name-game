const constants = Object.freeze({
  POINTS_START: 1000,
  MIN_POINTS_CORRECT: 100,
  DECREASE_SCORE_TIME_MS: 200,
  DECREASE_SCORE_TIME: 5,
  DECREASE_SCORE_WRONG: 250,
  INITIAL_SCORE_STATE: Object.freeze({
    totalScore: 0,
    currentRound: 1000,
    correctGuesses: 0,
    incorrectGuesses: 0,
    averageTime: 0,
  }),
});

export default constants;