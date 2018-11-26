import randomSelection from './randomSelection';

it('returns array of expected length', () => {
  const arrayToModify = [1,2,3,4,5,6,7];
  const arrayLength = arrayToModify.length;
  const selectionNum = 3;
  const modifiedArray = randomSelection(arrayToModify, selectionNum);
  expect(modifiedArray.length).toEqual(selectionNum);
  expect(arrayToModify.length).toEqual(arrayLength);
});

it('returns expected integer', () => {
  const array = Array(5).fill(null).map((x,i) => i);
  const biggerArray = Array(10).fill(null).map((x,i) => i);
  Math.random = () => 0.5;
  expect(randomSelection(array)).toEqual(2);
  expect(randomSelection(biggerArray)).toEqual(5);
  Math.random = () => 0.1;
  expect(randomSelection(array)).toEqual(0);
  expect(randomSelection(biggerArray)).toEqual(1);
});

it('returns expected array', () => {
  const array = Array(5).fill(null).map((x,i) => i);
  Math.random = () => 0.5;
  // array is 0,1,2,3,4. then 0,1,4,3,2, then 0,1,3,4,2, so expect [4,2]
  expect(randomSelection(array, 2)).toEqual([4, 2]);
  Math.random = () => 0.1;
  // array is now 0,1,3,4,2. then 2,1,3,4,0 then 4,1,3,2,0 so expect [2,0]
  expect(randomSelection(array, 2)).toEqual([2, 0]);
});
