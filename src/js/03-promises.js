import Notiflix from 'notiflix';

// let position = 0;
// let delayOutput = 0;
const form = document.querySelector('.form');

form.addEventListener('submit', onCreatePromises);

function onCreatePromises(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;

  for (let i = 0; i < amount.value; i++) {
    const position = i + 1;
    const delayOutput = delay.value + step.value * i;

    createPromise(position, delayOutput)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}

// !
// Notiflix.Notify.success;
// Notiflix.Notify.failure;
