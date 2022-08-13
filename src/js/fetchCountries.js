import { refs } from "../index.js";
const BASE_URL = 'https://restcountries.com/v3.1/name/';
const PARAMS = 'fields=name,capital,population,flags,languages'


export const fetchCountries = (name) => {
    return fetch(`${BASE_URL}${name}?${PARAMS}`)
        .then(response => {
            if (!response.ok) {
                refs.countryList.innerHTML = '';
            }
            return response.json();
        }).catch((error) => {
            console.log("error", error);
        });
};





