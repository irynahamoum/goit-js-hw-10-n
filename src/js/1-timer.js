import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');

const display = {
  daysDisplay: document.querySelector('[data-days]'),
  hoursDisplay: document.querySelector('[data-hours]'),
  minutesDisplay: document.querySelector('[data-minutes]'),
  secondsDisplay: document.querySelector('[data-seconds]'),
};

let userSelectedDate;

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  const interval = setInterval(() => {
    const timeNow = Date.now();
    const timeDifference = userSelectedDate - timeNow;
    const formattedTime = convertMs(timeDifference);
    displayDate(formattedTime);
    console.log(timeDifference);
    if (timeDifference < 1000) {
      clearInterval(interval);
    }
  }, 1000);
});

// function countdownTime() {
//   const timeNow = Date.now();
//   const timeDifference = userSelectedDate - timeNow;
//   const formattedTime = convertMs(timeDifference);
//   console.log(formattedTime);
//   return formattedTime;
// }

const displayDate = ({ days, hours, minutes, seconds }) => {
  display.daysDisplay.textContent = String(days).padStart(2, 0);
  display.hoursDisplay.textContent = String(hours).padStart(2, 0);
  display.minutesDisplay.textContent = String(minutes).padStart(2, 0);
  display.secondsDisplay.textContent = String(seconds).padStart(2, 0);
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000));
console.log(convertMs(140000));
console.log(convertMs(24140000));

const extentions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  maxDate: new Date().fp_incr(30),
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (!selectedDates[0]) return;
    if (userSelectedDate < Date.now()) {
      startButton.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr('input#datetime-picker', extentions);
