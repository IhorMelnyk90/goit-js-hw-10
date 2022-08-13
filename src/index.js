import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
export const refs = {
    searchCountry: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
};

refs.searchCountry.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));


function onInputChange(event) {
    const inputValue = event.target.value.trim().toUpperCase();
    fetchCountries(inputValue)
        .then((data) => {
            filter(data);
        }).catch((error) => {
            console.log("error", error);
            clearList();
        })
}

function filter(array) {
    if (array.length === 1) {
        clearList();
        return createOneCountry(array[0]);
    }
    else if (array.length < 10 && array.length > 0) {
        clearList();
        createCountrysList(array);
    }
    else if (array.length > 10) {
        clearList();
        Notify.info("Too many matches found. Please enter a more specific name.");
    }
    else {
        clearList();
        Notify.failure("Oops, there is no country with that name");
    }
};

function clearList() {
    refs.countryList.innerHTML = "";
};

function createOneCountry(element) {
    const countryResault = `<li>
    <h1><img src="${element.flags.svg}" class="country-list-img">${element.name.common}</h1>
    <p>Capital: ${element.capital}</p>
    <p>Population: ${element.population}</p>
    <p>Languages: ${Object.values(element.languages)}</p></li>`;
    refs.countryList.insertAdjacentHTML('beforeend', countryResault);
};

function createCountrysList(array) {
    const markup = array.map(element =>
        `<li class="country-list-item"><img src=${element.flags.svg} class="country-list-img">${element.name.common}</li>`).join(' ');
    refs.countryList.innerHTML = markup;
};

