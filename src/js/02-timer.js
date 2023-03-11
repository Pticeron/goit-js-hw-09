import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.6.min.css";

// flatpickr(selector, options)
// const options = {
//     enableTime: true,
//     time_24hr: true,
//     defaultDate: new Date(),
//     minuteIncrement: 1,
//     onClose(selectedDates) {
//       console.log(selectedDates[0]);
//     },
//   };
// flatpickr("#myID", {});


const refs = {
    input: document.querySelector(`#datetime-picker`),
    button: document.querySelector(`button[data-start]`),
    days: document.querySelector(`.value[data-days]`),
    hours: document.querySelector(`.value[data-hours]`),
    minutes: document.querySelector(`.value[data-minutes]`),
    seconds: document.querySelector(`.value[data-seconds]`),
    label: document.querySelector(`.label`),
}

refs.button.disabled = true;

refs.input.addEventListener(`click`, (e) => {
    e.preventDefault();
})