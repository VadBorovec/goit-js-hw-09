import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysOutput: document.querySelector('[data-days]'),
  hoursOutput: document.querySelector('[data-hours]'),
  minsOutput: document.querySelector('[data-minutes]'),
  secsOutput: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

// * Приймає число, форматує в рядок і додає на початок 0 якщо число менше 2-х знаків
const addZero = value => String(value).padStart(2, '0');

// * Повертає об'єкт з властивостями days, hours, mins, secs
const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

// * Малює інтерфейс
const updateClockface = ({ days, hours, minutes, seconds }) => {
  refs.daysOutput.textContent = `${days}`;
  refs.hoursOutput.textContent = `${addZero(hours)}`;
  refs.minsOutput.textContent = `${addZero(minutes)}`;
  refs.secsOutput.textContent = `${addZero(seconds)}`;
};

// * Передає об'єкт параметріd для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      refs.startBtn.disabled = false;
      console.log(selectedDates[0]);
      return;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    }
  },
};

const fp = flatpickr(refs.inputEl, options);

// * Функція запуску таймеру
const startCountdown = () => {
  const selectedTime = fp.selectedDates[0].getTime();
  let timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedTime - currentTime;
    const convertedTime = convertMs(deltaTime);
    if (deltaTime <= 0) {
      clearInterval(timerId);
      Notiflix.Notify.success('Countdown finished!');
      return;
    }
    updateClockface(convertedTime);
  }, 1000);
};

// * Запускає таймер по кліку
function onStartClick(selectedTime) {
  startCountdown(selectedTime);
  refs.startBtn.disabled = true;
}

refs.startBtn.addEventListener('click', onStartClick);

// !===========

// // * 2ий варіант - зі створенням класу

// refs.startBtn.disabled = true;

// // * Оголошує класс Timer
// class Timer {
//   constructor({ onTick }) {
//     // * Ініціалізує властивості екземпляра
//     this.timerId = null;
//     this.isActive = false;
//     this.onTick = onTick;
//   }

//   // * запускає таймер
//   start() {
//     if (this.isActive) {
//       return;
//     }

//     const selectedTime = fp.selectedDates[0].getTime();
//     this.isActive = true;

//     this.timerId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = selectedTime - currentTime;
//       const time = this.convertMs(deltaTime);
//       console.log('time', time);
//       if (deltaTime <= 0) {
//         clearInterval(this.timerId);
//         Notiflix.Notify.success('Countdown finished!');
//         return;
//       }

//       this.onTick(time);
//     }, 1000);
//   }

//   // * Повертає об'єкт з властивостями days, hours, mins, secs
//   convertMs(ms) {
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     const days = this.addZero(Math.floor(ms / day));
//     const hours = this.addZero(Math.floor((ms % day) / hour));
//     const minutes = this.addZero(Math.floor(((ms % day) % hour) / minute));
//     const seconds = this.addZero(
//       Math.floor((((ms % day) % hour) % minute) / second)
//     );

//     return { days, hours, minutes, seconds };
//   }

//   // * Приймає число, форматує в рядок і додає на початок 0 якщо число менше 2-х знаків
//   addZero = value => {
//     return String(value).padStart(2, '0');
//   };
// }

// // * Створює екземпляр класу
// const timer = new Timer({ onTick: updateClockface });

// refs.startBtn.addEventListener('click', timer.start.bind(timer));

// // * Малює інтерфейс
// function updateClockface({ days, hours, minutes, seconds }) {
//   refs.daysOutput.textContent = `${days}`;
//   refs.hoursOutput.textContent = `${hours}`;
//   refs.minsOutput.textContent = `${minutes}`;
//   refs.secsOutput.textContent = `${seconds}`;
// }
