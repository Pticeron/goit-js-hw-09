import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.6.min.css";


const refs = {
    input: document.querySelector(`#datetime-picker`),
    button: document.querySelector(`button[data-start]`),
    days: document.querySelector(`.value[data-days]`),
    hours: document.querySelector(`.value[data-hours]`),
    minutes: document.querySelector(`.value[data-minutes]`),
    seconds: document.querySelector(`.value[data-seconds]`),
    label: document.querySelector(`.label`),
}

// flatpickr(selector, options)
// flatpickr("#myID", {});
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if ((new Date().getTime() - selectedDates[0].getTime()) > 0)
        { Notify.warning("Please choose a date in the future")}
        else {refs.button.disabled = false}
    },
};
flatpickr(refs.input, options);


refs.button.disabled = true;

let timerId = 0;

refs.button.addEventListener(`click`, () => {
    timerId = setInterval(onTimerStart, 1000);
});

function onTimerStart() {
    refs.button.disabled = true;
    refs.input.disabled = true;
    const selectDateMs = new Date(refs.input.value);
    const currentDateMs = Date.now();
    const deltaTimeMs = selectDateMs - currentDateMs;

    updateTimerBoard(deltaTimeMs);
    if(deltaTimeMs <= 0) {
        clearInterval(timerId);
        updateTimerBoard(0);
    }
}

function updateTimerBoard(timeMs) {
    const { days, hours, minutes, seconds } = convertMs(timeMs);
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}

function addLeadingZero(value) {
    return String(value).padStart(2, `0`);
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
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}


