import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const valueMs = form.elements.delay.value;
  const select = form.elements.state.value;
  const promiseResult = createPromise(valueMs, select);

  promiseResult
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
}

const createPromise = (valueMs, select) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (select === 'fulfilled') {
        resolve(valueMs);
      } else {
        reject(valueMs);
      }
    }, valueMs);
  });
  return promise;
};
