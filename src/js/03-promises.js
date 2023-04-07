import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onCreatePromises);

function onCreatePromises(evt) {
  evt.preventDefault();

  const delay = Number(evt.target.elements.delay.value);
  const step = Number(evt.target.elements.step.value);
  const amount = Number(evt.target.elements.amount.value);

  if (delay < 0 || step < 0 || amount < 0) {
    Notiflix.Notify.warning('Please enter positive numbers only.');
    return;
  }

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delayOutput = delay + step * i;

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
