const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

const SWITCH_DELAY = 1000;
let timerId = null;
let isStarted = false;

function onStartClick() {
  if (isStarted) {
    return;
  }

  timerId = setInterval(() => {
    getRandomHexColor();
    refs.body.style.backgroundColor = getRandomHexColor();
  }, SWITCH_DELAY);
}

function onStopClick() {
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
