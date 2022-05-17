import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('input[type="text"]'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  mins: document.querySelector('span[data-minutes]'),
  secs: document.querySelector('span[data-seconds]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);

let selectedDate = 0;
let timerValue = 0;
let timerStatus = false;
let intervalId;

disadleBtn();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    disadleBtn();
  },
};

flatpickr(refs.input, options);

function disadleBtn() {
  if (selectedDate <= Date.now()) {
    refs.startBtn.disabled = true;
  } else {
    refs.startBtn.disabled = false;
  }
}

function onStartBtnClick() {
  if (!timerStatus) {
    timerStatus = true;
    timerValue = selectedDate - Date.now();

    intervalId = setInterval(() => {
      if (timerValue > 0) {
        putValues(getTimeComponents(timerValue));
        timerValue -= 1000;
      } else {
        timerStatus = false;
        clearInterval(intervalId);
      }
    }, 1000);
  }
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function getTimeComponents(time) {
  const days = pad(Math.floor((time % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)));
  const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}

function putValues({ days, hours, mins, secs }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = mins;
  refs.secs.textContent = secs;
}
