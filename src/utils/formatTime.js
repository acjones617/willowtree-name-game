const formatTime = function(timeInMs) {
  let seconds = Math.round((timeInMs) / 1000);
  let minutes = Math.floor(seconds / 60);
  return minutes.toString() + ':' + (seconds - 60*minutes).toString().padStart(2,'0');
}

export default formatTime;
