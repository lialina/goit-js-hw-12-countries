import './sass/main.scss';
// import fetchCountries from './js/fetchCountries.js';
import CountriesApiService from './js/api-countries.js'
import countryListItem from './country-list-item.hbs';
import countryCard from './country-card.hbs';

const refs = {
    countryInput: document.querySelector('#country-input'),
    // searchButton: document.querySelector('[data-action="search"]'),
    searchResultsList: document.querySelector('.js-countries'),
    countriesList: document.querySelector('.js-countries'),
};

const newsApiService = new CountriesApiService();

refs.countryInput.addEventListener('input', onSearch);

function onSearch(e) {
    e.preventDefault();
    newsApiService.query = e.currentTarget.value.trim();

    // if (e.currentTarget.value.length < 1) {
    //     return console.log('error');
    // }

    newsApiService.fetchCountries().then(createCountriesListMarkup);
};



const countriesList = createCountriesListMarkup(data);

refs.countriesList.insertAdjacentHTML('beforeend', countriesList(data));

// function makeMarkup(data) {
//   refs.countriesList.innerHTML = "";
 
//   if (refs.countryInput.value.length === 0) {
//     refs.countriesList.innerHTML = "";
//     return;
//   }

//   if (data.length === 1) {

//   }
// };

function createCountriesListMarkup(data) {
  return countryListItem(data);
};

// function createCountryCardMarkup(menuItems) {
//   return menuItemsTpl(menuItems);
// };





