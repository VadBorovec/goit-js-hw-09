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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      refs.startBtn.disabled = false;
      console.log(selectedDates[0].getTime());
      return;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    }
  },
};

const fp = flatpickr(refs.inputEl, options);

class Timer {
  constructor({ onTick }) {
    this.timerId = null;
    this.isActive = false;
    this.onTick = onTick;
  }

  start() {
    if (this.isActive) {
      return;
    }

    const selectedTime = fp.selectedDates[0].getTime();
    this.isActive = true;

    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
      const time = this.convertMs(deltaTime);
      console.log('time', time);

      this.onTick(time);
    }, 1000);
  }

  // * - Возвращает обьект со свойствами days, hours, mins, secs
  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  // * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
  addLeadingZero = value => {
    return String(value).padStart(2, '0');
  };
}

const timer = new Timer({ onTick: updateClockface });

refs.startBtn.addEventListener('click', timer.start.bind(timer));

//  * - Рисует интерфейс
function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysOutput.textContent = `${days}`;
  refs.hoursOutput.textContent = `${hours}`;
  refs.minsOutput.textContent = `${minutes}`;
  refs.secsOutput.textContent = `${seconds}`;
}
