export const NUM_CHOICES = 5;
export const DELAY_AFTER_CORRECT = 1000;
export const DELAY_BEFORE_HINT = 5000;
export const KeyCodes = Object.freeze({
  ENTER: 13,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  H: 72,
  J: 74,
  K: 75,
  L: 76,
});
export const FilterModes = Object.freeze({
  Default: Object.freeze({
    value: 'Default',
    name: 'Include everyone',
    desc: 'Play with a pool of all current and former employees of WillowTree.',
    filterFunc: (() => true),
  }),
  Team: Object.freeze({
    value: 'Team',
    name: 'Currently employed',
    desc: 'Limit the names to current employees of WillowTree.',
    filterFunc: (employee => employee.jobTitle),
  }),
  Mat: Object.freeze({
    value: 'Mat',
    name: 'Name starts with Mat',
    desc: 'Limit to people whose name begins with "Mat".',
    filterFunc: (employee => employee.firstName.startsWith('Mat')),
  }),
});
export const ToggleModes = Object.freeze({
  Reverse: Object.freeze({
    value: 'Reverse',
    name: 'Guess name from photo',
    desc: 'Given an employee\'s photo, select the correct name.'
  }),
  Hint: Object.freeze({
    value: 'Hint',
    name: 'Easy mode',
    desc: `Faces disappear every ${(DELAY_BEFORE_HINT/1000).toString()} seconds.`
  }),
});
