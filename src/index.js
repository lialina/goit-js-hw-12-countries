import './sass/main.scss';
import CountriesApiService from './js/api-countries.js'
import countryListItem from './country-list-item.hbs';
import countryCard from './country-card.hbs';

import { info } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

const debounce = require('lodash.debounce');

const refs = {
    countryInput: document.querySelector('#country-input'),
    searchResultsList: document.querySelector('.js-countries'),
    countriesContainer: document.querySelector('.js-countries'),
};

const newsApiService = new CountriesApiService();

refs.countryInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.value.trim();

  showLoader();
  
  newsApiService.fetchCountries().then(data => {
    appendMarkup(data);
    removeLoader();
  });
};

function appendMarkup(data) {
  clearCountriesContainer();
  
  if (refs.countryInput.value.length === 0) {
    clearCountriesContainer();
    return;
  }

  if (data.length === 1) {
    refs.countriesContainer.insertAdjacentHTML('beforeend', countryCard(data));
  }

  if (data.length >= 2 && data.length <= 10) {
    refs.countriesContainer.insertAdjacentHTML('beforeend', countryListItem(data));
  }

  if (data.length > 10) {
    specifyAlert();
  }
}

function clearCountriesContainer() {
  refs.countriesContainer.innerHTML = '';
}


const barElement = document.querySelector('.bar');
const sphereElement = document.querySelector('.sphere');

function showLoader() {
  barElement.classList.remove('.is-hidden');
  sphereElement.classList.remove('.is-hidden');
};

function removeLoader() {
  barElement.classList.add('.is-hidden');
  sphereElement.classList.add('.is-hidden');
}

function specifyAlert() {
  info({
    text:
      "Too many matches found. Please enter the more specific query!",
    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: "Ok",
              primary: true,
              click: notice => {
                notice.close();
              }
            }
          ]
        }
      ]
    ])
  });
}