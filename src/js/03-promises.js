import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.6.min.css";


refs = {
  form: document.querySelector(`.form`),
  firstDelay: document.querySelector(`[name="delay"]`),
  stepDelay: document.querySelector(`[name="step"]`),
  amout: document.querySelector(`[name="amount"]`),
}
// console.log(refs);


refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e)  {
    e.preventDefault();
    // const { delay, step, amount } = e.currentTarget.elements;
    const firstDelay = +refs.firstDelay.value;
    const stepValue = +refs.stepDelay.value;
    const amountValue = +refs.amout.value;

    let promiseDelay = firstDelay;
  
    // const promises = [];
  
    for (let index = 1; index <= amountValue; index++) {
      createPromise(index, promiseDelay)
      .then(({ position, delay }) => {
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      })

    .finally(() => { if(index === amountValue) refs.form.reset()})
    promiseDelay += stepValue;

  }
  };


  function createPromise(position, delay) {
      return new Promise((resolve, reject) => {
        const shouldResolve = Math.random() > 0.3;
        setTimeout(() => {
          if (shouldResolve) {
            resolve({ position, delay });
          } else {
            reject({ position, delay });
          }
        }, delay);
      });
    }

