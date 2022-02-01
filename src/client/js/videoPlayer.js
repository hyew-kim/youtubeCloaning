const video = document.querySelector('video');
const playBtn = document.getElementById('play');
const muteBtn = document.getElementById('mute');
const currentime = document.getElementById('currentime');
const totalTime = document.getElementById('totalTime');
const volumeRange = document.getElementById('volume');
const timeline = document.getElementById('timeline');
const fullScreenBtn = document.getElementById('fullScreen');
const videoControls = document.getElementById('videoControls');

const handlePlayClick = function (evt) {
  if (video.paused) video.play();
  else video.pause();
  playBtn.innerText = video.paused ? 'Play' : 'Pause';
};
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
const formatTime = (value) => new Date(value * 1000).toISOString().substring(11, 19);

const handleLoadedMetadata = function () {
  const duration = Math.floor(video.duration);

  totalTime.innerText = formatTime(duration);
  currentime.innerText = formatTime(0);
  timeline.max = duration;
};
const handleTimeUpdate = function () {
  const time = Math.floor(video.currentTime);
  currentime.innerText = formatTime(time);
  timeline.value = time;
  //console.log(video.readyState);
};
const handleTimeline = function (evt) {
  const {
    target: { value },
  } = evt;
  video.currentTime = value;
};
const handleFullScreen = function () {
  const isFullScreen = document.fullscreenElement;
  if (isFullScreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = 'Enter Full Screen';
  } else {
    document.getElementById('videoContainer').requestFullscreen();
    fullScreenBtn.innerText = 'Exit Full Screen';
  }
};
let timerId = '';
const handleMousemove = function () {
  //move 없을 때만 class remove 실행
  clearTimeout(timerId);
  video.classList.add('showing');
  timerId = setTimeout(function () {
    video.classList.remove('showing');
  }, 1000 * 4);
};

playBtn.addEventListener('click', handlePlayClick);
muteBtn.addEventListener('click', handleMute);
volumeRange.addEventListener('input', handleRange);
video.addEventListener('loadedmetadata', handleLoadedMetadata);
video.addEventListener('timeupdate', handleTimeUpdate);
timeline.addEventListener('input', handleTimeline);
fullScreenBtn.addEventListener('click', handleFullScreen);
video.addEventListener('mousemove', handleMousemove);
