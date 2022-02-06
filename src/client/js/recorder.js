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
};
const handleStart = () => {
  startBtn.innerText = 'Stop Recording';
  startBtn.removeEventListener('click', handleStart);
  startBtn.addEventListener('click', handleStop);
  recorder = new MediaRecorder(stream);
  //handler 미리 만들고 녹화 시작하기!
  recorder.ondataavailable = (evt) => {
    recordedData = URL.createObjectURL(evt.data);
    //createObjectURL: 브라우저의 메모리 상에 있는 파일에 접근할 수 있는 방법
    video.srcObject = null;
    video.src = recordedData;
    video.play();
  };
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
