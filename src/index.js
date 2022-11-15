import './css/styles.css';
import Notiflix from 'notiflix';
import Debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

// const searchParams = new URLSearchParams({
//   _limit: 5,
//   _sort: 'name',
// });

// console.log(searchParams.toString()); // "_limit=5&_sort=name"

// const url = `https://jsonplaceholder.typicode.com/users?${searchParams}`;

const refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputField.addEventListener(
  'input',
  Debounce(onValueInput, DEBOUNCE_DELAY)
);

function onValueInput(e) {
  const searchQuery = e.target.value;

  fetchCountries(searchQuery)
    .then(countries => {
      for (country of countries) {
        console.log(country.capital.join(' '));
      }
      createMarkUp(country);
    })
    .catch(error =>
      Notiflix.Notify.failure(
        `${error} Oops, there is no country with that name`
      )
    );
}

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function createMarkUp(country) {
  refs.countryList.innerHTML = ``;
  refs.countryInfo.innerHTML = ``;
}

//,capital,population,flags.svg,languages
