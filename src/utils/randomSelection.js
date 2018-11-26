const getRandomInteger = function(maxExclusive) {
  return Math.floor(Math.random() * maxExclusive);
}

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
