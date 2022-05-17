import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

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
    if (selectedDate <= Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    }
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
        putValues(convertMs(timerValue));
        timerValue -= 1000;
      } else {
        timerStatus = false;
        clearInterval(intervalId);
      }
    }, 1000);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const mins = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const secs = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, mins, secs };
}

function putValues({ days, hours, mins, secs }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = mins;
  refs.secs.textContent = secs;
}
