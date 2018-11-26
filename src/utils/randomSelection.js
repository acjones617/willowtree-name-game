/**
 * Returns a random integer.
 * @param {number} maxExclusive - the exclusive upper bound.
 * @return {number} An integer between 0 and maxExclusive, not including maxExclusive
 */
const getRandomInteger = function(maxExclusive) {
  return Math.floor(Math.random() * maxExclusive);
}

/**
 * Returns a random selection of an array.
 * @param {Array} arr - the array to select from.
 * @param {number} numToSelect - how many items of the array to randomly select from.
 * @return {Array|number} a list of the selected elements, or, the element itself if
 *    only selecting one element.
 */
const getRandomSelection = function(arr, numToSelect = 1) {
  numToSelect = Math.min(arr.length, numToSelect);
  if (numToSelect === 1) {
    return arr[getRandomInteger(arr.length)];
  }
  let randomIndex;
  let temp;
  for (let i = 0; i < numToSelect; i++) {
      randomIndex = getRandomInteger(arr.length - i);
      // swap with end
      temp = arr[randomIndex];
      arr[randomIndex] = arr[arr.length - 1 - i];
      arr[arr.length - 1 - i] = temp;
  }
  return arr.slice(arr.length - numToSelect);
}

export default getRandomSelection;
