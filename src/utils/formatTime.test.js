import formatTime from './formatTime';

const getMilliseconds = function (minutes, seconds) {
  return ((minutes * 60) + seconds) * 1000;
}

it('rounds appropriately', () => {
  expect(formatTime(600)).toEqual("0:01");
  expect(formatTime(400)).toEqual("0:00");
})

it('handles negative time', () => {
  expect(formatTime(-400)).toEqual("0:00");
})

it('returns time in expected format', () => {
  expect(formatTime(getMilliseconds(5, 40))).toEqual("5:40");
  expect(formatTime(getMilliseconds(0, 100))).toEqual("1:40");
  expect(formatTime(getMilliseconds(1000, 14))).toEqual("1000:14");
});
