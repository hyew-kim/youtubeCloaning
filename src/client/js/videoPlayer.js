const video = document.querySelector('video');
const playBtn = document.getElementById('play');
const muteBtn = document.getElementById('mute');
const time = document.getElementById('time');
const volumeRange = document.getElementById('volume');

const handlePlayClick = function (evt) {
  if (video.paused) video.play();
  else video.pause();
};
const handlePlay = (evt) => (playBtn.innerText = 'Pause');
const handlePause = (evt) => (playBtn.innerText = 'Play');

let currentVolume = 0.5;
const setVolumn = (value) => {
  volumeRange.value = value;
  video.volume = value;
};
setVolumn(currentVolume);

const handleMute = function (evt) {
  video.muted = !video.muted;
  muteBtn.innerText = video.muted ? 'Unmute' : 'Mute';
  if (video.muted) currentVolume = volumeRange.value;
  volumeRange.value = video.muted ? 0 : currentVolume;
};

const handleRange = function (evt) {
  const { value } = evt.target;

  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = 'Mute';
  }
  if (value === '0') {
    video.muted = true;
    muteBtn.innerText = 'Unmute';
  }
  setVolumn(value);
};

playBtn.addEventListener('click', handlePlayClick);
muteBtn.addEventListener('click', handleMute);
video.addEventListener('play', handlePlay);
video.addEventListener('pause', handlePause);
volumeRange.addEventListener('input', handleRange);
