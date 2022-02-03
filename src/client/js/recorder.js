const startBtn = document.getElementById('startBtn');
const video = document.getElementById('view');

let stream = '';
let recorder = '';
let recordedData = '';
const handleDownload = () => {
  const a = document.createElement('a');
  a.href = recordedData;
  a.download = 'MyRecording.webm';
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  startBtn.innerText = 'Download Recording';
  startBtn.removeEventListener('click', handleStop);
  startBtn.addEventListener('click', handleDownload);
  recorder.stop();
  recorder.ondataavailable = (evt) => {
    recordedData = evt.data;
    video.srcObject = null;
    video.src = URL.createObjectURL(recordedData);
    video.play();
  };
};
const handleStart = () => {
  startBtn.innerText = 'Stop Recording';
  startBtn.removeEventListener('click', handleStart);
  startBtn.addEventListener('click', handleStop);
  recorder = new MediaRecorder(stream);
  recorder.start();
};

const showPreview = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  //노트북 캠과 마이크에서 data받아서 stream에 저장, 이를 video의 srcObject로 넘겨줘서 실시간으로 화면 보임
  video.srcObject = stream;
  video.play();
};
showPreview();
startBtn.addEventListener('click', handleStart);
