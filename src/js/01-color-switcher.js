const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);
refs.stopBtn.disabled = true;

let intervalId;

function onStartBtnClick() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  clearInterval(intervalId);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
